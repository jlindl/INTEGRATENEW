"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Frame from "@/components/web-design-portal/frame";
import Magnetic from "@/components/web-design-portal/magnetic";
import PlumeField from "@/components/web-design-portal/plume-field";
import RevealText from "@/components/web-design-portal/reveal-text";
import { ArrowRight, SparkIcon } from "@/components/web-design-portal/icons";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

/** ms the intro curtain (see layout.tsx) holds the stage before the hero moves. */
const INTRO = 640;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  // 0 with the hero filling the viewport, 1 once it has scrolled fully away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Leaving the hero: the field swells toward you while the type sinks back,
  // shrinks and dims — the page pushes through it rather than sliding past.
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.24]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 230]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const hudOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-svh flex-col overflow-clip bg-abyss"
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { scale: fieldScale }}
        className="absolute inset-0 z-0"
      >
        {/* Painted immediately; the shader canvas crossfades over it once live. */}
        <div className="plume-fallback absolute inset-0" />
        <PlumeField />
      </motion.div>

      <div aria-hidden className="dot-grid absolute inset-0 z-[2]" />
      {/* Grain kept very light — the field is meant to read as silk, and heavy
          wdp-grain fights that. */}
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-[3] opacity-[0.03] mix-blend-overlay"
      />
      {/* Darkens the middle band so the headline keeps contrast whatever the
          plume happens to be doing behind it. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[4] bg-[radial-gradient(56%_46%_at_50%_48%,rgba(5,2,8,0.5)_0%,transparent_82%)]"
      />
      {/* Belt-and-braces fade into the next section, covering the CSS fallback
          and any driver that renders the canvas slightly differently. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-b from-transparent to-abyss"
      />

      <Frame />

      <motion.div
        style={
          reduce
            ? undefined
            : { y: contentY, scale: contentScale, opacity: contentOpacity }
        }
        className="relative z-20 mx-auto flex w-full max-w-[1420px] flex-1 flex-col items-center justify-center px-6 pb-28 pt-24 text-center sm:px-10 lg:pt-28"
      >
        {/* Bloom sitting behind the last line of the headline. */}
        <div
          aria-hidden
          className="halo-breathe pointer-events-none absolute left-1/2 top-[56%] -z-10 h-[36svh] w-[min(900px,72vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(160,43,255,0.34),transparent_72%)] blur-[56px]"
        />

        <a
          href="#work"
          className="badge-glow rise relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm transition-colors hover:bg-white/[0.09]"
          style={{ animationDelay: `${INTRO}ms` }}
        >
          <SparkIcon className="h-4 w-4 text-neon-200" />
          Integrate Web Design
        </a>

        {/* The live portal's own headline, word for word. */}
        <RevealText
          as="h1"
          trigger="load"
          delay={INTRO + 100}
          stagger={75}
          className="display display-hero mt-6 text-white lg:mt-7"
          parts={[
            "Web",
            // A hairline ampersand against the heavy caps either side of it.
            { text: "&", className: "font-light text-neon-300" },
            "Mobile",
            "\n",
            "Apps, Built",
            "\n",
            "to",
            { text: "Perform.", className: "text-shine inline-block" },
          ]}
        />

        <p
          className="hero-sub rise mt-6 max-w-[52ch] text-balance text-white/65 lg:mt-7"
          style={{ animationDelay: `${INTRO + 560}ms` }}
        >
          We build websites and mobile apps that look sharp and pull their
          weight. Everything below is live — client sites and working demos.
          Click into any of it.
        </p>

        <div
          className="rise mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: `${INTRO + 680}ms` }}
        >
          <Magnetic>
            <a
              href="#work"
              className="sheen group inline-flex items-center gap-3.5 rounded-full bg-gradient-to-b from-white to-neon-50/70 py-2.5 pl-7 pr-2.5 text-[16px] font-medium text-abyss shadow-[0_0_46px_-6px_rgba(160,43,255,0.85)] transition-shadow duration-300 hover:shadow-[0_0_70px_-4px_rgba(160,43,255,1)]"
            >
              Explore the Work
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-abyss text-white transition-transform duration-300 group-hover:rotate-90">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </Magnetic>

          <Magnetic strength={0.22}>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.08] px-7 py-4 text-[16px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm transition-colors duration-200 hover:border-neon-400/60 hover:bg-white/[0.14]"
            >
              Book a Call
            </a>
          </Magnetic>
        </div>
      </motion.div>

      {/* Footer rail of the hero: status on the left, scroll cue on the right. */}
      <motion.div
        style={reduce ? undefined : { opacity: hudOpacity }}
        className="absolute inset-x-0 bottom-0 z-20"
      >
        <div className="mx-auto flex w-full max-w-[1420px] items-end justify-center px-6 pb-7 sm:justify-between sm:px-10 sm:pl-14 sm:pr-14">
          <p
            className="rise label-mono flex items-center gap-3 pb-1 text-white/75"
            style={{ animationDelay: `${INTRO + 840}ms` }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-neon-400 opacity-70" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-neon-300 shadow-[0_0_12px_2px_rgba(160,43,255,0.9)]" />
            </span>
            Taking new projects
          </p>

          <a
            href="#approach"
            aria-label="Scroll to the next section"
            className="rise hidden flex-col items-center gap-3 sm:flex"
            style={{ animationDelay: `${INTRO + 940}ms` }}
          >
            <span className="label-mono text-white/55">Scroll</span>
            <span className="scroll-cue-line" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
