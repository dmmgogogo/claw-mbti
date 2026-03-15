import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data: tests } = await supabase
    .from("tests")
    .select("mbti")
    .eq("status", "completed")
    .not("mbti", "is", null);

  const distribution: Record<string, number> = {};
  const dimensionCounts = {
    S_N: { S: 0, N: 0 },
    T_A: { T: 0, A: 0 },
    D_B: { D: 0, B: 0 },
    S_R: { S: 0, R: 0 },
  };

  if (tests) {
    for (const test of tests) {
      const mbti = test.mbti as string;
      distribution[mbti] = (distribution[mbti] || 0) + 1;

      if (mbti.length === 4) {
        mbti[0] === "S" ? dimensionCounts.S_N.S++ : dimensionCounts.S_N.N++;
        mbti[1] === "T" ? dimensionCounts.T_A.T++ : dimensionCounts.T_A.A++;
        mbti[2] === "D" ? dimensionCounts.D_B.D++ : dimensionCounts.D_B.B++;
        mbti[3] === "S" ? dimensionCounts.S_R.S++ : dimensionCounts.S_R.R++;
      }
    }
  }

  const total = tests?.length ?? 0;
  const dimensions: Record<string, Record<string, number>> = {};
  for (const [key, counts] of Object.entries(dimensionCounts)) {
    const entries = Object.entries(counts);
    const dimTotal = entries.reduce((s, [, v]) => s + v, 0);
    dimensions[key] = {};
    for (const [letter, count] of entries) {
      dimensions[key][letter] = dimTotal > 0 ? Math.round((count / dimTotal) * 100) : 50;
    }
  }

  return NextResponse.json({
    distribution,
    dimensions,
    total,
  });
}
