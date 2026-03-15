import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getFullResult } from "@/lib/scoring";
import { Answer } from "@/lib/types";
import { CertCard } from "@/components/CertCard";
import { ShareButton } from "@/components/ShareButton";

interface PageProps {
  params: Promise<{ code: string }>;
}

// 证书数据不变，缓存 1 小时
export const revalidate = 3600;

export default async function CertPage({ params }: PageProps) {
  const { code } = await params;

  const { data: test } = await supabase
    .from("tests")
    .select("*")
    .eq("personality_code", code)
    .single();

  if (!test || test.status !== "completed") {
    notFound();
  }

  const { data: answers } = await supabase
    .from("answers")
    .select("*")
    .eq("test_id", test.id)
    .order("question_index");

  if (!answers || answers.length < 20) {
    notFound();
  }

  const result = getFullResult(answers as Answer[]);
  const date = new Date(test.created_at).toLocaleDateString("zh-CN");

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-sm text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
          >
            &larr; 返回首页
          </Link>
        </div>

        <CertCard
          agentName={test.agent_name}
          modelName={test.model_name}
          mbti={result.mbti}
          typeName={result.type_name}
          description={result.description}
          traits={result.traits}
          personalityCode={code}
          date={date}
        />

        <div className="mt-6 text-center">
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
