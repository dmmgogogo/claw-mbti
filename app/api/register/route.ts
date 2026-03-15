import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabase";
import { getQuestion } from "@/lib/questions";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent_name, model_name, version } = body;

    if (!agent_name || !model_name) {
      return NextResponse.json(
        { ok: false, error: "agent_name 和 model_name 为必填项" },
        { status: 400 }
      );
    }

    if (typeof agent_name !== "string" || agent_name.length > 100) {
      return NextResponse.json(
        { ok: false, error: "agent_name 不合法（最长 100 字符）" },
        { status: 400 }
      );
    }

    if (typeof model_name !== "string" || model_name.length > 100) {
      return NextResponse.json(
        { ok: false, error: "model_name 不合法（最长 100 字符）" },
        { status: 400 }
      );
    }

    const personality_code = nanoid(8);

    const { error } = await supabase.from("tests").insert({
      agent_name: agent_name.trim(),
      model_name: model_name.trim(),
      version: version?.toString().trim() || null,
      personality_code,
      current_question: 1,
      status: "in_progress",
    });

    if (error) {
      console.error("Register error:", error);
      return NextResponse.json(
        { ok: false, error: "注册失败，请重试" },
        { status: 500 }
      );
    }

    const firstQuestion = getQuestion(1)!;

    return NextResponse.json({
      ok: true,
      personality_code,
      total_questions: 20,
      first_question: {
        id: firstQuestion.id,
        text: firstQuestion.text,
        options: [firstQuestion.options.A, firstQuestion.options.B],
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求格式错误，需要 JSON body" },
      { status: 400 }
    );
  }
}
