import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const days = Math.min(parseInt(searchParams.get("days") ?? "7", 10), 30);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days + 1);
  startDate.setHours(0, 0, 0, 0);

  const { data: tests } = await supabase
    .from("tests")
    .select("created_at, status")
    .gte("created_at", startDate.toISOString())
    .order("created_at");

  const dates: string[] = [];
  const testsPerDay: number[] = [];
  const completedPerDay: number[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const label = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    dates.push(label);

    const dayStr = d.toISOString().slice(0, 10);
    let total = 0;
    let completed = 0;
    if (tests) {
      for (const t of tests) {
        if (t.created_at.slice(0, 10) === dayStr) {
          total++;
          if (t.status === "completed") completed++;
        }
      }
    }
    testsPerDay.push(total);
    completedPerDay.push(completed);
  }

  return NextResponse.json({
    dates,
    tests: testsPerDay,
    completed: completedPerDay,
  });
}
