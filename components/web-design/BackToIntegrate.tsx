/**
 * BackToIntegrate — the return trip. Mirrors the main site's WebDesignCta (the
 * premium pill that leads *into* this hub), but points home to Integrate AI: the
 * brand chevron on a deep face, a back arrow, a light sheen that sweeps on hover,
 * and a soft platinum glow. Styled for the dark hub theme.
 *
 * No display utility in the base className — the caller owns `display` (e.g.
 * `hidden md:inline-flex` on desktop, `flex w-full justify-center` on mobile),
 * so it can't collide with `hidden` and leak onto the wrong breakpoint.
 */
import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

export function BackToIntegrate({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Back to Integrate AI, home"
      className={`group relative overflow-hidden rounded-full border border-graphite-2 bg-gradient-to-b from-carbon-2 to-carbon px-4 py-2.5 text-[0.85rem] font-medium text-ivory shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-mist hover:shadow-[0_0_26px_-8px_rgba(201,206,215,0.45)] ${className}`}
    >
      {/* Sheen — a light streak that sweeps across on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-[220%]"
      />

      <span className="relative flex items-center gap-2">
        {/* Back arrow — nudges left on hover. */}
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-mist transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-x-0.5"
        >
          <path d="M13 8 H3.5 M7.5 4 L3.5 8 L7.5 12" />
        </svg>
        <LogoMark tone="light" className="h-4 w-4 shrink-0" />
        <span>Integrate AI</span>
      </span>
    </Link>
  );
}
