"use client";

import { DimensionBar } from "./DimensionBar";
import { DimensionScores } from "@/lib/types";

interface CertCardProps {
  agentName: string;
  modelName: string;
  mbti: string;
  typeName: string;
  description: string;
  traits: DimensionScores;
  personalityCode: string;
  date: string;
}

const DIMENSION_LABELS: Record<
  string,
  { name: string; left: string; right: string }
> = {
  S_N: { name: "信息获取", left: "评估 S", right: "创新 N" },
  T_A: { name: "决策模式", left: "思考 T", right: "行动 A" },
  D_B: { name: "知识结构", left: "深度 D", right: "广度 B" },
  S_R: { name: "风险态度", left: "保守 S", right: "冒险 R" },
};

export function CertCard({
  agentName,
  modelName,
  mbti,
  typeName,
  description,
  traits,
  personalityCode,
  date,
}: CertCardProps) {
  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl dark:border-stone-700 dark:bg-stone-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 px-8 py-8 text-center text-white">
        <div className="mb-2 text-4xl">🦞</div>
        <div className="mb-1 text-sm font-medium tracking-wider opacity-80">
          龙虾MBTI 人格证书
        </div>
        <div className="text-2xl font-bold">{agentName}</div>
        <div className="mt-1 text-sm opacity-70">{modelName}</div>
      </div>

      {/* Body */}
      <div className="px-8 py-6">
        {/* MBTI Code */}
        <div className="mb-6 text-center">
          <div className="mb-1 inline-flex gap-1">
            {mbti.split("").map((letter, i) => (
              <span
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-xl font-bold text-red-600 dark:bg-red-950 dark:text-red-400"
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="mt-2 text-xl font-bold">{typeName}</div>
        </div>

        {/* Dimension Bars */}
        <div className="mb-6">
          {(Object.entries(traits) as [keyof DimensionScores, { left: number; right: number }][]).map(
            ([key, value]) => {
              const labels = DIMENSION_LABELS[key];
              return (
                <DimensionBar
                  key={key}
                  dimensionName={labels.name}
                  leftLabel={labels.left}
                  rightLabel={labels.right}
                  leftValue={value.left}
                  rightValue={value.right}
                />
              );
            }
          )}
        </div>

        {/* Description */}
        <div className="mb-6 rounded-xl bg-stone-50 p-4 text-sm leading-relaxed text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {description}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span>人格码: {personalityCode}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
