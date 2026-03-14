interface DimensionBarProps {
  leftLabel: string;
  rightLabel: string;
  leftValue: number;
  rightValue: number;
  dimensionName: string;
}

export function DimensionBar({
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  dimensionName,
}: DimensionBarProps) {
  const total = leftValue + rightValue;
  const leftPercent = total > 0 ? Math.round((leftValue / total) * 100) : 50;

  return (
    <div className="mb-4">
      <div className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
        {dimensionName}
      </div>
      <div className="mb-1.5 flex items-center justify-between text-sm font-medium">
        <span className="text-red-600 dark:text-red-400">
          {leftLabel} {leftPercent}%
        </span>
        <span className="text-stone-500 dark:text-stone-400">
          {rightLabel} {100 - leftPercent}%
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-700"
          style={{ width: `${leftPercent}%` }}
        />
      </div>
    </div>
  );
}
