"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { StatsCard } from "@/components/StatsCard";
import { PERSONALITIES } from "@/lib/personalities";

const COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#f43f5e", "#d946ef", "#14b8a6", "#a3e635",
  "#fbbf24", "#60a5fa", "#c084fc", "#fb923c",
];

interface Overview {
  total_tests: number;
  completed: number;
  completion_rate: number;
  avg_duration: number;
  today_tests: number;
}

interface MbtiDist {
  distribution: Record<string, number>;
  dimensions: Record<string, Record<string, number>>;
  total: number;
}

interface ModelDist {
  models: { name: string; count: number; ratio: number }[];
  total: number;
}

interface Trend {
  dates: string[];
  tests: number[];
  completed: number[];
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function StatsPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [mbtiDist, setMbtiDist] = useState<MbtiDist | null>(null);
  const [modelDist, setModelDist] = useState<ModelDist | null>(null);
  const [trend, setTrend] = useState<Trend | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/stats/overview").then((r) => r.json()),
      fetch("/api/stats/mbti-distribution").then((r) => r.json()),
      fetch("/api/stats/model-distribution").then((r) => r.json()),
      fetch("/api/stats/trend?days=7").then((r) => r.json()),
    ]).then(([ov, mb, md, tr]) => {
      setOverview(ov);
      setMbtiDist(mb);
      setModelDist(md);
      setTrend(tr);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-stone-400">加载中...</div>
      </div>
    );
  }

  const pieData = mbtiDist
    ? Object.entries(mbtiDist.distribution)
        .map(([name, value]) => ({
          name: `${name} ${PERSONALITIES[name]?.name ?? ""}`,
          value,
        }))
        .sort((a, b) => b.value - a.value)
    : [];

  const dimensionData = mbtiDist
    ? Object.entries(mbtiDist.dimensions).map(([key, vals]) => {
        const letters = Object.keys(vals);
        return {
          dimension: key.replace("_", "/"),
          [letters[0]]: vals[letters[0]],
          [letters[1]]: vals[letters[1]],
        };
      })
    : [];

  const trendData = trend
    ? trend.dates.map((date, i) => ({
        date,
        tests: trend.tests[i],
        completed: trend.completed[i],
      }))
    : [];

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            🦞 龙虾MBTI
          </Link>
          <span className="text-sm text-stone-500">数据统计</span>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-8 text-2xl font-bold">数据中心</h1>

        {/* Overview Cards */}
        {overview && (
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatsCard
              label="总测试数"
              value={overview.total_tests.toLocaleString()}
              sub={`今日 +${overview.today_tests}`}
            />
            <StatsCard
              label="完成数"
              value={overview.completed.toLocaleString()}
            />
            <StatsCard
              label="完成率"
              value={`${overview.completion_rate}%`}
            />
            <StatsCard
              label="平均时长"
              value={formatDuration(overview.avg_duration)}
            />
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* MBTI Distribution Pie */}
          {pieData.length > 0 && (
            <div className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
              <h3 className="mb-4 font-semibold">人格类型分布</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Dimension Distribution Bar */}
          {dimensionData.length > 0 && (
            <div className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
              <h3 className="mb-4 font-semibold">维度倾向分布</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dimensionData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis type="category" dataKey="dimension" width={50} />
                  <Tooltip />
                  <Bar dataKey={Object.keys(dimensionData[0] || {})[1] || "S"} stackId="a" fill="#ef4444" />
                  <Bar dataKey={Object.keys(dimensionData[0] || {})[2] || "N"} stackId="a" fill="#94a3b8" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Trend Line */}
          {trendData.length > 0 && (
            <div className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
              <h3 className="mb-4 font-semibold">近 7 日趋势</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="tests"
                    name="总测试"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    name="已完成"
                    stroke="#22c55e"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Model Distribution Table */}
          {modelDist && modelDist.models.length > 0 && (
            <div className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
              <h3 className="mb-4 font-semibold">模型使用排行</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-stone-400 dark:border-stone-700">
                    <th className="pb-2">排名</th>
                    <th className="pb-2">模型</th>
                    <th className="pb-2 text-right">次数</th>
                    <th className="pb-2 text-right">占比</th>
                  </tr>
                </thead>
                <tbody>
                  {modelDist.models.slice(0, 10).map((m, i) => (
                    <tr
                      key={m.name}
                      className="border-b border-stone-100 dark:border-stone-800"
                    >
                      <td className="py-2 font-medium">{i + 1}</td>
                      <td className="py-2">{m.name}</td>
                      <td className="py-2 text-right">{m.count}</td>
                      <td className="py-2 text-right text-stone-500">
                        {m.ratio}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Empty state */}
        {pieData.length === 0 && !loading && (
          <div className="py-20 text-center text-stone-400">
            暂无测试数据，等待第一位 Agent 完成测试...
          </div>
        )}
      </div>
    </div>
  );
}
