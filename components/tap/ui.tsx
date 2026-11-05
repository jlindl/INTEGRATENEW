import type { ReactNode } from "react";
import { LogoMark } from "@/components/ui/LogoMark";

/** Shared building blocks for the /tap pages, in the site's light theme. */

export const inputClass =
  "w-full rounded-xl border border-line bg-card px-4 py-3 text-[1rem] text-ink shadow-hairline outline-none transition-colors placeholder:text-ink-3 focus:border-ink-2";

export const primaryButton =
  "inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-[0.98rem] font-medium text-paper shadow-float transition-colors hover:bg-accent disabled:opacity-60";

export const secondaryButton =
  "inline-flex items-center justify-center rounded-full border border-line bg-card px-5 py-2.5 text-[0.9rem] font-medium text-ink shadow-lift transition-colors hover:border-ink-2";

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
    <section className="relative min-h-[100svh] px-5 pb-16 pt-8 sm:pt-12">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className={`relative mx-auto w-full ${width === "wide" ? "max-w-[56rem]" : "max-w-[30rem]"}`}>
        <header className="flex items-center justify-between">
          <a href="/tap" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <LogoMark className="h-7 w-7" />
            <span className="font-display-tuned text-lg font-medium text-ink">Integrate</span>
            <span className="rounded-full border border-line bg-card px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-2">
              Tap
            </span>
          </a>
          {right}
        </header>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function PageTitle({ eyebrow, title, intro }: { eyebrow?: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <div>
      {eyebrow && (
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-3">{eyebrow}</p>
      )}
      <h1 className="font-display-tuned mt-2 text-[clamp(1.7rem,6.5vw,2.3rem)] font-medium leading-[1.12] text-ink">
        {title}
      </h1>
      {intro && <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-2">{intro}</p>}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.88rem] font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[0.8rem] leading-relaxed text-ink-3">{hint}</span>}
    </label>
  );
}

export function Notice({ tone, children }: { tone: "error" | "ok" | "info"; children: ReactNode }) {
  const styles = {
    error: "border-[#e7b4ac] bg-[#fbeeec] text-[#8a2e22]",
    ok: "border-[#b5d9bf] bg-[#edf7f0] text-[#22603a]",
    info: "border-line bg-card text-ink-2",
  }[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-[0.9rem] leading-relaxed ${styles}`}>
      {children}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-card p-5 shadow-lift sm:p-6 ${className}`}>{children}</div>;
}
