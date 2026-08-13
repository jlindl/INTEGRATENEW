"use client";

/**
 * ClosingCTA — the final beat. A centered, quiet-but-confident invitation:
 * the brand chevron returns above a huge display headline that scales and
 * settles into place as the section scrolls into view, then a single primary
 * CTA and two mono trust markers underneath.
 */
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/LogoMark";
import { BookCallForm } from "@/components/sections/BookCallForm";

/* Padlock — 1.5px stroke, inherits the mono row's ink-3. */
function PadlockIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="10" height="6.5" rx="1.5" />
      <path d="M5.5 7 V5 a2.5 2.5 0 0 1 5 0 V7" />
    </svg>
  );
}

export function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Headline "arrives": scales 0.94 → 1 and drifts up 30px → 0 as the
  // section travels from the bottom of the viewport to its center.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const headScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const headY = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <section
      ref={sectionRef}
      id="book-call"
      aria-labelledby="closing-cta-heading"
      className="relative overflow-hidden bg-paper py-24 md:py-44"
    >
      {/* Soft accent wash behind the composition */}
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <LogoMark className="mx-auto h-7 w-7" />
            <p className="eyebrow mt-7">Ready when you are</p>
          </Reveal>

          <motion.h2
            id="closing-cta-heading"
            style={reduce ? undefined : { scale: headScale, y: headY }}
            className="font-display-tuned mt-6 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.05] text-ink"
          >
            Your AI transformation
            <br />
            <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
              starts here.
            </span>
          </motion.h2>

          <Reveal as="p" delay={0.1} className="mx-auto mt-8 max-w-[46ch] text-lg leading-relaxed text-ink-2 md:text-xl">
            Leave your details and we&apos;ll call you back to set up a
            30-minute strategy call, mapping out exactly which AI systems will
            have the highest ROI for your business. No fluff, no pressure.
          </Reveal>

          <Reveal delay={0.18} className="mt-11">
            <BookCallForm source="Homepage — Book a call" />
          </Reveal>

          {/* Trust markers */}
          <Reveal delay={0.26} className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-mono text-[0.75rem] text-ink-3">
              <span className="flex items-center gap-2.5">
                {/* Availability pulse — accent, never green */}
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  {!reduce && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[#22c55e]"
                      animate={{ scale: [1, 2.6], opacity: [0.45, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                </span>
                Available for new projects
              </span>

              {/* Hairline dot separator */}
              <span className="h-[3px] w-[3px] rounded-full bg-line-2" aria-hidden="true" />

              <span className="flex items-center gap-2.5">
                <PadlockIcon />
                Confidential by default
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
