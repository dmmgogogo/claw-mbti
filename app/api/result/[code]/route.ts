import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getFullResult } from "@/lib/scoring";
import { Answer } from "@/lib/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const { data: test, error: testError } = await supabase
    .from("tests")
    .select("*")
    .eq("personality_code", code)
    .single();

  if (testError || !test) {
    return NextResponse.json(
      { ok: false, error: "未找到该测试记录" },
      { status: 404 }
    );
  }

  if (test.status !== "completed") {
    return NextResponse.json(
      {
        ok: false,
        error: "测试尚未完成",
        progress: `${test.current_question}/20`,
      },
      { status: 400 }
    );
  }

  if (test.mbti) {
    const { data: answers } = await supabase
      .from("answers")
      .select("*")
      .eq("test_id", test.id)
      .order("question_index");

    const result = getFullResult(answers as Answer[]);
    return NextResponse.json({
      ok: true,
      agent_name: test.agent_name,
      model_name: test.model_name,
      ...result,
      cert_url: `/cert/${code}`,
    });
  }

  const { data: answers, error: answersError } = await supabase
    .from("answers")
    .select("*")
    .eq("test_id", test.id)
    .order("question_index");

  if (answersError || !answers || answers.length < 20) {
    return NextResponse.json(
      { ok: false, error: "答题数据不完整" },
      { status: 500 }
    );
  }

  const result = getFullResult(answers as Answer[]);

  await supabase
    .from("tests")
    .update({ mbti: result.mbti })
    .eq("id", test.id);

  return NextResponse.json({
    ok: true,
    agent_name: test.agent_name,
    model_name: test.model_name,
    ...result,
    cert_url: `/cert/${code}`,
  });
}
