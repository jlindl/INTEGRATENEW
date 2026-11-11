import { ArrowUpRight } from "@/components/web-design-portal/icons";

/**
 * A round call-to-action stamped with a ring of rotating type. Pure SVG + CSS
 * (`.spin-slow`), nothing to hydrate. The ring is decorative; the accessible
 * name comes from `label`.
 */
export default function SpinBadge({
  href,
  label,
  ring,
  external = false,
  className = "",
}: {
  href: string;
  /** Accessible name, and the text set around the ring. */
  label: string;
  /** Text repeated around the circle; defaults to the label twice. */
  ring?: string;
  /** Opens in a new tab (the destination is on another site). */
  external?: boolean;
  className?: string;
}) {
  const text = ring ?? `${label} ✦ ${label} ✦ `;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={external ? `${label} (opens in a new tab)` : label}
      className={`group relative flex h-40 w-40 items-center justify-center rounded-full bg-neon-500 text-white shadow-[0_0_70px_-8px_rgba(160,43,255,0.95)] transition-[scale,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:bg-neon-400 hover:shadow-[0_0_110px_-6px_rgba(178,93,255,1)] sm:h-48 sm:w-48 lg:h-56 lg:w-56 ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden
        className="spin-slow absolute inset-0 h-full w-full"
      >
        <defs>
          <path
            id="spin-badge-ring"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        {/* textLength stretches the string to exactly one lap (2πr ≈ 490),
            so the start and end of the loop always meet cleanly. */}
        <text
          fill="currentColor"
          fontSize="15.5"
          fontWeight="600"
          letterSpacing="2.2"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href="#spin-badge-ring" textLength="486">
            {text}
          </textPath>
        </text>
      </svg>

      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-abyss transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 sm:h-20 sm:w-20">
        <ArrowUpRight className="h-7 w-7 sm:h-8 sm:w-8" />
      </span>
    </a>
  );
}
