import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Voltedge tokens. Full literal class strings so Tailwind sees them.  */
/*   bg      #0a0c0f   graphite                                        */
/*   surface #12161b                                                   */
/*   line    #232a33                                                   */
/*   ink     #f3f5f8                                                   */
/*   sub     #9aa4b2                                                   */
/*   amber   #ffb020   Signal Amber, used sparingly                    */
/* ------------------------------------------------------------------ */

export const PHONE = "0161 496 0100";
export const TEL = "tel:+441614960100";

export const wrap = "mx-auto w-full max-w-[1320px] px-4 sm:px-8 lg:pl-20 lg:pr-12";

export const display = "font-[family-name:var(--font-ve-display)]";
export const mono = "font-[family-name:var(--font-ve-mono)]";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb020] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c0f]";

export const focusRingDark =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0c0f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffb020]";

export const btnAmber = `group inline-flex items-center justify-center gap-3 bg-[#ffb020] px-6 py-4 font-[family-name:var(--font-ve-display)] text-xl font-extrabold uppercase leading-none tracking-[0.04em] text-[#0a0c0f] transition-[background-color,box-shadow] duration-200 hover:bg-[#ffc04a] hover:shadow-[0_0_48px_rgba(255,176,32,0.35)] ${focusRing}`;

export const btnGhost = `group inline-flex items-center justify-center gap-3 border border-white/20 px-6 py-4 font-[family-name:var(--font-ve-display)] text-xl font-bold uppercase leading-none tracking-[0.04em] text-[#f3f5f8] transition-colors duration-200 hover:border-[#ffb020] hover:text-[#ffb020] ${focusRing}`;

export const h2 = `font-[family-name:var(--font-ve-display)] text-[clamp(2.6rem,6.2vw,5.4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.005em] text-[#f3f5f8]`;

export const lede = "max-w-xl text-lg leading-relaxed text-[#9aa4b2]";

/**
 * Section label styled like a circuit-schedule reference: "C3 / Services".
 * The rail on the left of the page lights each one as you pass it.
 */
export function Circuit({
  n,
  children,
  tone = "light",
}: {
  n: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`${mono} flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-[0.18em] ${
        tone === "light" ? "text-[#9aa4b2]" : "text-[#0a0c0f]/75"
      }`}
    >
      <span
        className={`inline-flex h-6 items-center px-2 ${
          tone === "light"
            ? "bg-[#ffb020] text-[#0a0c0f]"
            : "bg-[#0a0c0f] text-[#ffb020]"
        }`}
      >
        {n}
      </span>
      {children}
    </p>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center bg-[#ffb020] text-[#0a0c0f]">
        <Bolt className="h-[18px] w-[18px]" />
      </span>
      <span
        className={`${display} text-[1.7rem] font-black uppercase leading-none tracking-[0.02em] text-[#f3f5f8]`}
      >
        Voltedge
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Icons (decorative, aria-hidden)                                     */
/* ------------------------------------------------------------------ */

export function Bolt({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
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
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Star({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M10 1.6 12.6 7l5.9.8-4.3 4.1 1.1 5.9L10 15l-5.3 2.8 1.1-5.9L1.5 7.8 7.4 7 10 1.6Z" />
    </svg>
  );
}

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-0.5 text-[#ffb020]">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={className} />
      ))}
    </span>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

/** Pulsing "live" dot. The pulse is skipped for reduced motion. */
export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative inline-flex h-2.5 w-2.5 ${className}`}>
      <span className="absolute inset-0 rounded-full bg-[#3ddc84] motion-safe:animate-[ve-ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3ddc84]" />
    </span>
  );
}
