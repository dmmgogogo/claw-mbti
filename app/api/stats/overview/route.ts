import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { count: totalTests } = await supabase
    .from("tests")
    .select("*", { count: "exact", head: true });

  const { count: completedTests } = await supabase
    .from("tests")
    .select("*", { count: "exact", head: true })
    .eq("status", "completed");

  const total = totalTests ?? 0;
  const completed = completedTests ?? 0;
  const completionRate = total > 0 ? Math.round((completed / total) * 1000) / 10 : 0;

  const { data: completedRows } = await supabase
    .from("tests")
    .select("created_at, completed_at")
    .eq("status", "completed")
    .not("completed_at", "is", null);

  let avgDuration = 0;
  if (completedRows && completedRows.length > 0) {
    const totalDuration = completedRows.reduce((sum, row) => {
      const start = new Date(row.created_at).getTime();
      const end = new Date(row.completed_at).getTime();
      return sum + (end - start) / 1000;
    }, 0);
    avgDuration = Math.round(totalDuration / completedRows.length);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: todayTests } = await supabase
    .from("tests")
    .select("*", { count: "exact", head: true })
    .gte("created_at", today.toISOString());

  return NextResponse.json({
    total_tests: total,
    completed,
    completion_rate: completionRate,
    avg_duration: avgDuration,
    today_tests: todayTests ?? 0,
  });
}
