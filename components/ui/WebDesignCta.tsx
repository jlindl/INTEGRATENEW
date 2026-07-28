/**
 * WebDesignCta — the homepage's entry pill into the dark portfolio hub, styled
 * as the sub-brand's signature object so it stands apart from the flat "Book a
 * call" button: a purple light snakes around the outline (rotating conic
 * gradient revealed only as a thin border ring), the brand chevron sits inside
 * a deep near-black face, a light sheen sweeps across on hover, and a diagonal
 * arrow signals it opens the hub in a new tab.
 *
 * No client JS — the snake light and sheen are pure CSS (motion-safe), so this
 * stays a server component and works inside both the client Nav and Hero.
 */
import { LogoMark } from "@/components/ui/LogoMark";

const SNAKE =
  "conic-gradient(from 0deg, #33224d 0deg, #33224d 248deg, #a855f7 296deg, #f0abfc 316deg, #a855f7 336deg, #33224d 360deg)";

export function WebDesignCta({
  size = "sm",
  className = "",
  onClick,
  label = "Integrate Web Design",
}: {
  size?: "sm" | "lg";
  className?: string;
  onClick?: () => void;
  label?: string;
}) {
  const lg = size === "lg";
  const face = lg
    ? "px-6 py-3.5 text-[0.9375rem] gap-2.5"
    : "px-4 py-2.5 text-[0.85rem] gap-2";
  const mark = lg ? "h-[18px] w-[18px]" : "h-4 w-4";

  return (
    <a
      href="/web-design"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label="Integrate Web Design (opens in a new tab)"
      // No display utility here on purpose — the caller owns `display` (e.g.
      // `hidden lg:inline-flex`). Setting it here would collide with `hidden`
      // at equal specificity and leak the pill onto mobile.
      className={`group relative overflow-hidden rounded-full p-[1.5px] shadow-[0_0_18px_-8px_rgba(168,85,247,0.6)] transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_rgba(168,85,247,0.95)] ${className}`}
    >
      {/* Rotating purple snake light — paused under reduced motion. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[240%] -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className="block h-full w-full motion-safe:animate-wd-spin"
          style={{ background: SNAKE }}
        />
      </span>

      {/* Deep face with a faint top highlight for dimensionality. */}
      <span
        className={`relative flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#161022] to-[#0a0810] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ${face}`}
      >
        {/* Sheen — a light streak that sweeps across on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-[220%]"
        />
        <LogoMark tone="light" className={`relative shrink-0 ${mark}`} />
        <span className="relative">{label}</span>
        <svg
          aria-hidden="true"
          width={lg ? 14 : 13}
          height={lg ? 14 : 13}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative text-[#c9a8f5] transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M5 11 L11 5 M6 5 h5 v5" />
        </svg>
      </span>
    </a>
  );
}
