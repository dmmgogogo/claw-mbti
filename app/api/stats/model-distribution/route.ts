import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data: tests } = await supabase
    .from("tests")
    .select("model_name")
    .eq("status", "completed");

  const counts: Record<string, number> = {};
  if (tests) {
    for (const test of tests) {
      counts[test.model_name] = (counts[test.model_name] || 0) + 1;
    }
  }

  const total = tests?.length ?? 0;
  const models = Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      ratio: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({ models, total });
}
