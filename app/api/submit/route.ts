import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getQuestion } from "@/lib/questions";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personality_code, answer } = body;

    if (!personality_code || !answer) {
      return NextResponse.json(
        { ok: false, error: "personality_code 和 answer 为必填项" },
        { status: 400 }
      );
    }

    if (answer !== "A" && answer !== "B") {
      return NextResponse.json(
        { ok: false, error: "answer 必须为 A 或 B" },
        { status: 400 }
      );
    }

    const { data: test, error: fetchError } = await supabase
      .from("tests")
      .select("*")
      .eq("personality_code", personality_code)
      .single();

    if (fetchError || !test) {
      return NextResponse.json(
        { ok: false, error: "无效的 personality_code" },
        { status: 404 }
      );
    }

    if (test.status === "completed") {
      return NextResponse.json(
        { ok: false, error: "测试已完成" },
        { status: 400 }
      );
    }

    const currentQ = test.current_question as number;

    const { error: answerError } = await supabase.from("answers").insert({
      test_id: test.id,
      question_index: currentQ,
      answer,
    });

    if (answerError) {
      if (answerError.code === "23505") {
        return NextResponse.json(
          { ok: false, error: "该题已作答，请勿重复提交" },
          { status: 409 }
        );
      }
      console.error("Submit answer error:", answerError);
      return NextResponse.json(
        { ok: false, error: "提交失败" },
        { status: 500 }
      );
    }

    const allDone = currentQ >= 20;

    if (allDone) {
      await supabase
        .from("tests")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", test.id);
    } else {
      await supabase
        .from("tests")
        .update({ current_question: currentQ + 1 })
        .eq("id", test.id);
    }

    const progress = `${currentQ}/20`;

    if (allDone) {
      return NextResponse.json({
        ok: true,
        progress,
        all_done: true,
      });
    }

    const nextQ = getQuestion(currentQ + 1)!;
    return NextResponse.json({
      ok: true,
      progress,
      next_question: {
        id: nextQ.id,
        text: nextQ.text,
        options: [nextQ.options.A, nextQ.options.B],
      },
      all_done: false,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求格式错误，需要 JSON body" },
      { status: 400 }
    );
  }
}
