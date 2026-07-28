/**
 * DigitalExperiences — deep-dive beat #2, reframed as a free-audit invitation.
 * Copy + CTA on the right, an illustrative "audit summary" card on the left
 * showing the kind of opportunities a call surfaces. Static server component
 * (Reveal primitives + MagneticButton are the only client islands), so it adds
 * no scroll-time cost.
 */
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Illustrative example of what an audit surfaces — clearly labelled "example". */
const OPPORTUNITIES: { system: string; action: "Automate" | "Streamline" }[] = [
  { system: "CRM & pipeline", action: "Automate" },
  { system: "Lead follow-up", action: "Automate" },
  { system: "Quotes & invoicing", action: "Automate" },
  { system: "Reporting", action: "Streamline" },
  { system: "Client onboarding", action: "Streamline" },
];

const REASSURANCE = [
  "We learn how your current systems work",
  "We pinpoint the highest-ROI automations",
  "You leave with a clear, no-obligation plan",
];

function MagnifierIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5 L14 14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-deep"
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
    </span>
  );
}

export function DigitalExperiences() {
  return (
    <section
      id="audit"
      aria-labelledby="audit-heading"
      className="relative overflow-hidden bg-paper py-20 md:py-36"
    >
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[9fr_11fr] lg:gap-24">
        {/* ---- Illustrative audit card (left column on lg) ---- */}
        <Reveal delay={0.1} className="lg:order-1">
          <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
            <div className="glow-accent absolute -inset-[10%]" aria-hidden="true" />
            <div className="hairline relative overflow-hidden rounded-2xl bg-card shadow-float">
              {/* chrome */}
              <div className="hairline-b flex items-center gap-3 px-5 py-3.5 sm:px-6">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-line-2" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                </span>
                <span className="font-mono text-xs text-ink-3">audit / your-stack</span>
                <span className="ml-auto text-ink-3">
                  <MagnifierIcon />
                </span>
              </div>

              {/* opportunities */}
              <ul className="divide-y divide-line px-5 sm:px-6">
                {OPPORTUNITIES.map((o) => {
                  const automate = o.action === "Automate";
                  return (
                    <li
                      key={o.system}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${automate ? "bg-accent" : "bg-line-2"}`}
                          aria-hidden="true"
                        />
                        <span className="text-[0.95rem] text-ink">{o.system}</span>
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] ${
                          automate
                            ? "bg-accent-tint text-accent-deep"
                            : "hairline text-ink-3"
                        }`}
                      >
                        {o.action}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* footer */}
              <div className="hairline-t flex items-center justify-between px-5 py-4 sm:px-6">
                <span className="flex items-center gap-2 font-mono text-[0.6875rem] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  5 opportunities identified
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-3">
                  example
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---- Copy + CTA (right column on lg) ---- */}
        <div className="lg:order-2">
          <Reveal>
            <p className="eyebrow">Free audit call</p>
            <h2
              id="audit-heading"
              className="font-display-tuned mt-6 max-w-[15ch] text-[clamp(2.1rem,4.4vw,3.4rem)] font-medium leading-[1.05] text-ink"
            >
              Not sure what can be{" "}
              <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
                automated
              </span>
              ?
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">
              Book a free audit call. We&apos;ll learn how your business runs,
              then show you exactly what we can streamline, automate, and speed
              up. No pitch, no pressure, just a clear plan.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            {/* TODO(Jack): swap this mailto for your booking link (Cal.com / Calendly). */}
            <MagneticButton
              href="mailto:hello@integrate.agency?subject=Free%20Audit%20Call"
              variant="primary"
            >
              Book a free audit call
            </MagneticButton>
            <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-3">
              30 minutes · no obligation
            </span>
          </Reveal>

          <RevealGroup as="ul" className="mt-11 flex flex-col gap-4" delayChildren={0.1}>
            {REASSURANCE.map((r) => (
              <RevealItem as="li" key={r} className="flex items-start gap-3.5">
                <CheckIcon />
                <span className="text-[0.95rem] leading-relaxed text-ink-2">{r}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
