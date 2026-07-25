const CARD_STYLES = [
  "border-maroon/30 text-maroon-deep",
  "border-gold/50 text-gold",
  "border-teal/40 text-teal",
  "border-maroon/30 text-maroon-deep",
];

export default function StatsCards({
  stats,
}: {
  stats: { label: string; value: number }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`border bg-paper px-5 py-6 text-center ${CARD_STYLES[i % CARD_STYLES.length]}`}
        >
          <p className="font-display text-4xl font-semibold">{stat.value}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
