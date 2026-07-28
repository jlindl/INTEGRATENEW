"use client";

/**
 * Stats — the proof beat. A quiet band of four figures that tick up as the
 * band enters the viewport. Serif numerals, one accent per figure, hairline
 * dividers — results rendered as typography, not dashboard chrome.
 */
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE } from "@/lib/motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

/* ------------------------------------------------------------------ */
/*  PLACEHOLDER FIGURES — Jack: replace with real values before launch. */
/*  Every number below is illustrative only. The on-page footnote       */
/*  flags them as placeholders so nothing reads as an audited claim.    */
/* ------------------------------------------------------------------ */
const STATS: Stat[] = [
  { value: 300, suffix: "%+", label: "ROI across engagements" },
  { value: 40, suffix: "+", label: "Custom agents engineered" },
  { value: 25000, suffix: "+", label: "Man-hours reclaimed" },
  { value: 3, suffix: "wks", label: "Average deployment time" },
];

/**
 * Counts 0 → value once, when scrolled into view. Under reduced motion the
 * final value is set immediately — no ticking.
 */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  const mv = useMotionValue(0);
  const display = useTransform(mv, (v: number) =>
    Math.round(v).toLocaleString("en-US"),
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 1.6, ease: EASE });
    return () => controls.stop();
  }, [inView, reduce, mv, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function Stats() {
  return (
    <section aria-label="Results" className="bg-paper py-16 md:py-32">
      <div className="container-x">
        <h2 className="sr-only">Results</h2>

        <RevealGroup
          as="ul"
          className="hairline-t grid grid-cols-2 gap-x-6 gap-y-14 divide-line pt-12 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:pt-16"
        >
          {STATS.map(({ value, suffix, label }) => (
            <RevealItem
              key={label}
              as="li"
              className="lg:px-10 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="font-display-tuned text-[clamp(2.8rem,5vw,4.5rem)] font-medium leading-none text-ink">
                {/* Static value for screen readers; the ticking copy is decorative */}
                <span className="sr-only">
                  {`${value.toLocaleString("en-US")}${suffix}`}
                </span>
                <span aria-hidden="true" className="tabular-nums">
                  <Counter value={value} />
                  <span className="text-accent">{suffix}</span>
                </span>
              </p>
              <p className="eyebrow mt-4 max-w-[20ch] leading-[1.7]">{label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Honesty footnote — stays until real, audited figures land */}
        <Reveal as="p" delay={0.2} className="mt-12 font-mono text-[0.7rem] text-ink-3">
          * Placeholder figures, updated with audited results per engagement.
        </Reveal>
      </div>
    </section>
  );
}
