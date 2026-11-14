/**
 * WebDesignCta — the entry button into the web design portal. A black pill
 * with a line of the portal's purple travelling round its edge at an even
 * pace, and a soft glow that travels with it, so it stands apart from the
 * flat "Book a call" button.
 *
 * How it is drawn: the pill's outline is an SVG rounded rectangle, and the
 * line is a dash on that outline whose offset is animated (wd-run in
 * globals.css). A dozen faint dashes of different lengths share one leading
 * end, so they add up to a line that brightens from a long soft tail to a
 * near-white head. A thicker, blurred copy sits behind the black face and
 * spills past the edge as the glow. Because the dash follows the outline itself, it keeps one speed along
 * the straights and round the ends, whatever the button's width.
 *
 * No client JS — the motion is CSS and only runs when the visitor allows
 * motion (the line holds still at the top left otherwise), so this stays a
 * server component and works inside client navs too.
 */
import type { CSSProperties } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";

/* The portal's purple (neon-500) and its pale tints. */
const PURPLE = "#a02bff";
const PALE = "#c98fff";
const HEAD = "#f3e2ff";

/* The tail, in hundredths of the way round: longest first. Each dash is
   faint; where they overlap they add up, so the line brightens toward its
   head in steps too small to see. */
const TAIL = [36, 31, 26.5, 22.5, 19, 16, 13.3, 11, 9, 7.2, 5.6, 4.2];

/**
 * One dash on the pill's outline, `len` hundredths of the way round, with its
 * leading end at the head of the line. Every dash runs on the same clock.
 */
function Dash({
  len,
  r,
  stroke,
  width,
  opacity,
}: {
  len: number;
  r: number;
  stroke: string;
  width: number;
  opacity?: number;
}) {
  return (
    <rect
      width="100%"
      height="100%"
      rx={r}
      fill="none"
      pathLength={100}
      stroke={stroke}
      strokeWidth={width}
      strokeOpacity={opacity}
      strokeDasharray={`${len} ${100 - len}`}
      className="motion-safe:animate-wd-run"
      style={{ "--wd-from": len, "--wd-to": len - 100, strokeDashoffset: len } as CSSProperties}
    />
  );
}

/* An SVG laid over the pill, inset by half the line's width so a 1.5px stroke
   sits exactly on the pill's outer edge. */
const OVERLAY =
  "pointer-events-none absolute left-[0.75px] top-[0.75px] h-[calc(100%-1.5px)] w-[calc(100%-1.5px)] overflow-visible";

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
  /* The height is fixed in px so the outline's corner radius can match it. */
  const height = lg ? 52 : 40;
  const r = height / 2 - 0.75;
  const face = lg ? "h-[52px] px-6 text-[0.9375rem] gap-2.5" : "h-[40px] px-4 text-[0.85rem] gap-2";
  /* A wider button has further to go, so give the lap a little longer. */
  const pace = lg ? "[&_rect]:[animation-duration:4.4s]" : "";

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
      className={`group relative isolate rounded-full transition-transform duration-200 active:scale-[0.97] ${pace} ${className}`}
    >
      {/* The glow: the same line, thicker and blurred, behind the face. */}
      <svg
        aria-hidden="true"
        className={`${OVERLAY} opacity-85 blur-[7px] transition-opacity duration-300 group-hover:opacity-100`}
      >
        <Dash len={32} r={r} stroke={PURPLE} width={5} opacity={0.5} />
        <Dash len={20} r={r} stroke={PURPLE} width={6} opacity={0.7} />
        <Dash len={11} r={r} stroke={PURPLE} width={8} />
        <Dash len={4} r={r} stroke={PALE} width={8} />
      </svg>
      {/* A wider bloom that comes up on hover. */}
      <svg
        aria-hidden="true"
        className={`${OVERLAY} opacity-0 blur-[16px] transition-opacity duration-300 group-hover:opacity-100`}
      >
        <Dash len={34} r={r} stroke={PURPLE} width={12} />
      </svg>

      {/* Black face. */}
      <span
        className={`relative flex w-full items-center justify-center overflow-hidden rounded-full bg-black font-medium whitespace-nowrap text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] ${face}`}
      >
        {/* Sheen — a streak of the purple that sweeps across on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-[#c98fff]/25 to-transparent transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-[220%]"
        />
        <BrandLogo variant="mark" tone="light" height={lg ? 17 : 15} alt="" className="relative shrink-0" />
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
          className="relative text-[#c98fff] transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M5 11 L11 5 M6 5 h5 v5" />
        </svg>
      </span>

      {/* The line: a faint ring all the way round, then the travelling line,
          a fading tail up to a near-white head. */}
      <svg aria-hidden="true" className={OVERLAY}>
        <rect width="100%" height="100%" rx={r} fill="none" stroke={PURPLE} strokeOpacity={0.32} strokeWidth={1.5} />
        {TAIL.map((len, i) => (
          <Dash key={len} len={len} r={r} stroke={i < 8 ? PURPLE : PALE} width={1.5} opacity={0.18} />
        ))}
        <Dash len={3.2} r={r} stroke={PALE} width={1.5} opacity={0.55} />
        <Dash len={1.8} r={r} stroke={HEAD} width={1.5} opacity={0.9} />
      </svg>
    </a>
  );
}
