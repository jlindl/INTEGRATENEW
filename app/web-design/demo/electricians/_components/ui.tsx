import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Voltedge design tokens (class-string constants so Tailwind can see  */
/* every utility as a full literal in source)                          */
/* ------------------------------------------------------------------ */

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const display = "font-[family-name:var(--font-ve-display)]";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb020] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1116]";

export const focusRingOnAmber =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12151b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffb020]";

export const btnPrimary = `inline-flex items-center justify-center gap-2 rounded-lg bg-[#ffb020] px-6 py-3.5 text-center font-[family-name:var(--font-ve-display)] text-lg font-semibold uppercase leading-none tracking-[0.08em] text-[#12151b] shadow-[0_0_40px_rgba(255,176,32,0.18)] transition-colors duration-200 hover:bg-[#ffc24d] ${focusRing}`;

export const btnSecondary = `inline-flex items-center justify-center gap-2 rounded-lg border border-[#232a35] bg-[#161b23] px-6 py-3.5 text-center font-[family-name:var(--font-ve-display)] text-lg font-semibold uppercase leading-none tracking-[0.08em] text-[#f4f7fb] transition-colors duration-200 hover:border-[#3a4454] hover:bg-[#1c2330] ${focusRing}`;

export const h2Heading = `mt-4 font-[family-name:var(--font-ve-display)] text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.98] tracking-[0.01em] text-[#f4f7fb]`;

export const sectionSub = "mt-4 max-w-2xl text-lg leading-relaxed text-[#93a0b1]";

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  tone = "amber",
}: {
  children: ReactNode;
  tone?: "amber" | "dark";
}) {
  return (
    <p
      className={`${display} flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.22em] ${
        tone === "amber" ? "text-[#ffb020]" : "text-[#12151b]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-6 ${tone === "amber" ? "bg-[#ffb020]/60" : "bg-[#12151b]/50"}`}
      />
      {children}
    </p>
  );
}

/**
 * The one signature texture: a thin 45-degree hazard-stripe divider.
 * Used exactly twice on the page, always quiet.
 */
export function HazardStripe({
  tone = "amber",
  className = "",
}: {
  tone?: "amber" | "dark";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`h-1.5 w-full ${
        tone === "amber"
          ? "opacity-25 [background-image:repeating-linear-gradient(45deg,#ffb020_0px,#ffb020_10px,transparent_10px,transparent_22px)]"
          : "opacity-20 [background-image:repeating-linear-gradient(45deg,#12151b_0px,#12151b_10px,transparent_10px,transparent_22px)]"
      } ${className}`}
    />
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Bolt className="h-5 w-5 text-[#ffb020]" />
      <span
        className={`${display} text-2xl font-bold uppercase leading-none tracking-[0.06em] text-[#f4f7fb]`}
      >
        Volt<span className="text-[#ffb020]">edge</span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Inline SVG icons (all hand-drawn, all decorative)                   */
/* ------------------------------------------------------------------ */

export function Bolt({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M13.4 2 4.6 13.6h5.8L9.2 22l8.9-11.6h-5.8L13.4 2Z" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function Star({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M10 1.6 12.6 7l5.9.8-4.3 4.1 1.1 5.9L10 15l-5.3 2.8 1.1-5.9L1.5 7.8 7.4 7 10 1.6Z" />
    </svg>
  );
}

export function Stars({
  starClassName = "h-4 w-4",
}: {
  starClassName?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-0.5 text-[#ffb020]"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={starClassName} />
      ))}
    </span>
  );
}

export function ShieldCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3l7 2.8v5.4c0 4.5-2.9 8-7 9.8-4.1-1.8-7-5.3-7-9.8V5.8L12 3Z" />
      <path d="m9 11.8 2.1 2.1L15.2 9.7" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}
