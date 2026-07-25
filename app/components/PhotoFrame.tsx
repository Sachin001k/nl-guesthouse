const VARIANTS = {
  maroon: "from-maroon/25 via-maroon/10 to-transparent",
  gold: "from-gold/30 via-gold/10 to-transparent",
  teal: "from-teal/25 via-teal/10 to-transparent",
} as const;

/**
 * Placeholder for real photography. Once you have photos of the hall,
 * guest rooms, or events, drop them in `public/images/` and replace
 * this component's usage with:
 *
 *   <Image src="/images/hall-exterior.jpg" alt="..." fill className="object-cover" />
 *
 * (wrapped in a `relative` container, same as this component's root div).
 */
export default function PhotoFrame({
  label,
  variant = "maroon",
  className = "",
}: {
  label: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-paper-deep border border-gold/30 ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${VARIANTS[variant]}`} />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15]"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <pattern
          id={`weave-${label.replace(/\s+/g, "-")}`}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 20 Q10 0 20 20 T40 20"
            stroke="var(--color-maroon-deep)"
            strokeWidth="1"
            fill="none"
          />
        </pattern>
        <rect
          width="200"
          height="200"
          fill={`url(#weave-${label.replace(/\s+/g, "-")})`}
        />
      </svg>
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="text-xs tracking-wide text-ink/50 font-medium">
          {label}
        </span>
      </div>
    </div>
  );
}
