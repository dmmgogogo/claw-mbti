interface StatsCardProps {
  label: string;
  value: string | number;
  sub?: string;
}

export function StatsCard({ label, value, sub }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900">
      <div className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
        {label}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-stone-400">{sub}</div>}
    </div>
  );
}
