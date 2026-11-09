import type { ReactNode } from "react";
import { LogoMark } from "@/components/ui/LogoMark";

/**
 * Shared building blocks for the /tap pages, in the site's light theme.
 *
 * Design notes: the plate (see <Plate>) is the one bold element; everything
 * else stays quiet. Labels are sentence case, buttons are at least 44px tall
 * for thumbs, and there is one primary action per screen.
 */

export const SITE = "https://www.integrate-tech.co.uk";

export const inputClass =
  "w-full rounded-xl border border-line bg-card px-4 py-3 text-[1rem] text-ink shadow-hairline outline-none transition-colors placeholder:text-ink-3/80 hover:border-line-2 focus:border-ink-2 focus-visible:ring-2 focus-visible:ring-accent/25";

export const primaryButton =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.98rem] font-medium text-paper shadow-float transition-[background-color,transform] duration-200 hover:bg-accent-deep active:translate-y-px disabled:cursor-progress disabled:opacity-70";

export const secondaryButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-[0.9rem] font-medium text-ink shadow-lift transition-[border-color,transform] duration-200 hover:border-ink-2 active:translate-y-px";

/** Small round icon button (reorder, remove). 44px hit area. */
export const iconButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink-2 transition-colors hover:border-ink-2 hover:text-ink disabled:pointer-events-none disabled:opacity-30";

export function TapShell({
  children,
  width = "narrow",
  right,
}: {
  children: ReactNode;
  width?: "narrow" | "wide";
  right?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[100svh] flex-col px-5 pb-8 pt-6 sm:pt-10">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className={`relative mx-auto flex w-full flex-1 flex-col ${width === "wide" ? "max-w-[60rem]" : "max-w-[30rem]"}`}>
        <header className="flex min-h-11 items-center justify-between gap-3">
          <a href="/tap" className="inline-flex min-h-11 items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80" aria-label="Integrate Tap home">
            <LogoMark className="h-7 w-7" />
            <span className="font-display-tuned text-lg font-medium text-ink">Integrate</span>
            <span className="rounded-full border border-line bg-card px-2.5 py-0.5 text-[0.75rem] font-medium text-ink-2">Tap</span>
          </a>
          {right}
        </header>
        <div className="mt-9 flex-1 sm:mt-12">{children}</div>
        <TapFooter />
      </div>
    </section>
  );
}

/** Every Tap page links back to the main site: to the Integrate Tap page
    (/review-plates), not the agency homepage. */
export function TapFooter() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.8rem] text-ink-3">
      <a href={`${SITE}/review-plates`} className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-ink">
        <LogoMark className="h-4 w-4" />
        Integrate Tap is made by Integrate
      </a>
      <a href={`${SITE}/contact`} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
        Need help? Contact us
      </a>
    </footer>
  );
}

export function PageTitle({ kicker, title, intro }: { kicker?: ReactNode; title: ReactNode; intro?: ReactNode }) {
  return (
    <div>
      {kicker && <p className="mb-2 text-[0.9rem] font-medium text-ink-3">{kicker}</p>}
      <h1 className="font-display-tuned text-balance text-[clamp(1.85rem,7vw,2.5rem)] font-medium leading-[1.08] text-ink">
        {title}
      </h1>
      {intro && <p className="mt-3 max-w-[42ch] text-pretty text-[1rem] leading-relaxed text-ink-2">{intro}</p>}
    </div>
  );
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-[1.08rem] font-semibold text-ink">{children}</h2>
      {hint && <p className="mt-1 text-[0.86rem] leading-relaxed text-ink-3">{hint}</p>}
    </div>
  );
}

export function Field({
  label,
  hint,
  optional,
  children,
}: {
  label: string;
  hint?: ReactNode;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-3 text-[0.9rem] font-medium text-ink">
        {label}
        {optional && <span className="text-[0.8rem] font-normal text-ink-3">Optional</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[0.82rem] leading-relaxed text-ink-3">{hint}</span>}
    </label>
  );
}

const NOTICE_ICON = {
  error: <path d="M12 8v5m0 3h.01M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />,
  ok: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  info: <path d="M12 16v-4m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
};

export function Notice({ tone, children }: { tone: "error" | "ok" | "info"; children: ReactNode }) {
  const styles = {
    error: "border-[#e7b4ac] bg-[#fbeeec] text-[#8a2e22]",
    ok: "border-[#b5d9bf] bg-[#edf7f0] text-[#22603a]",
    info: "border-line bg-card text-ink-2",
  }[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`flex gap-3 rounded-xl border px-4 py-3 text-[0.92rem] leading-relaxed ${styles}`}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-[0.2rem] shrink-0">
        {NOTICE_ICON[tone]}
      </svg>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[1.25rem] border border-line bg-card p-5 shadow-lift sm:p-7 ${className}`}>{children}</div>;
}

/* ---------------------------------------------------------------- plate -- */

function NfcMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className={className}>
      <path d="M6.5 8.5a5 5 0 0 1 0 7" />
      <path d="M10 6a8.5 8.5 0 0 1 0 12" />
      <path d="M13.5 3.5a12 12 0 0 1 0 17" />
    </svg>
  );
}

/**
 * The physical plate, drawn as the page's one bold element: dark ink, a
 * platinum engraved code and the NFC mark. `ping` plays a single tap ripple on
 * load (skipped when reduced motion is on).
 */
export function Plate({
  code,
  caption,
  size = "lg",
  muted = false,
  ping = false,
}: {
  code?: string;
  caption?: string;
  size?: "lg" | "sm";
  muted?: boolean;
  ping?: boolean;
}) {
  if (size === "sm") {
    return (
      <span
        className={`relative flex h-11 w-[4.25rem] shrink-0 flex-col justify-between overflow-hidden rounded-[0.6rem] bg-ink px-2 py-1.5 shadow-lift ring-1 ring-black/20 ${muted ? "opacity-45 grayscale" : ""}`}
        aria-hidden="true"
      >
        <span className="silver-sheen absolute inset-x-0 top-0 h-px opacity-70" />
        <NfcMark className="h-3 w-3 text-silver-hi" />
        <span className="text-platinum font-mono text-[0.62rem] font-medium tracking-[0.12em]">{code}</span>
      </span>
    );
  }
  return (
    <div className="relative inline-flex">
      {ping && !muted && <span className="tap-ping pointer-events-none absolute inset-0 rounded-[1.35rem]" aria-hidden="true" />}
      <div
        className={`relative flex h-[8.75rem] w-[14rem] flex-col justify-between overflow-hidden rounded-[1.35rem] bg-ink p-5 shadow-float ring-1 ring-black/25 ${muted ? "opacity-50 grayscale" : ""}`}
        role="img"
        aria-label={code ? `Plate ${code}` : "Your Integrate review plate"}
      >
        {/* Machined top edge and a soft sheen, like the logo's metal limb. */}
        <span className="silver-sheen absolute inset-x-0 top-0 h-px opacity-80" aria-hidden="true" />
        <span className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/[0.06] blur-2xl" aria-hidden="true" />
        <div className="flex items-start justify-between">
          <NfcMark className="h-7 w-7 text-silver-hi" />
          <LogoMark className="h-5 w-5 opacity-90" tone="light" />
        </div>
        <div>
          {caption && <p className="text-[0.72rem] text-silver-hi/80">{caption}</p>}
          {code ? (
            <p className="text-platinum mt-0.5 font-mono text-[1.35rem] font-medium tracking-[0.18em]">{code}</p>
          ) : (
            <p className="text-platinum mt-0.5 text-[1.05rem] font-medium">Hold your phone here</p>
          )}
        </div>
      </div>
    </div>
  );
}
