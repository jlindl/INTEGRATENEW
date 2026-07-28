"use client";

/**
 * Process — three phases on a vertical timeline. The signature move is the
 * rail: a hairline track whose accent overlay scales with scroll (smoothed
 * through a spring), so progress literally draws itself down the page as the
 * reader moves from audit to autonomy. Reduced motion gets the full line.
 */
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EASE, VIEWPORT } from "@/lib/motion";

type Phase = {
  tag: string;
  title: string;
  body: string;
  deliverables: string[];
};

const PHASES: Phase[] = [
  {
    tag: "PHASE 01",
    title: "Discovery & Architecture",
    body: "A deep-dive audit of your operations, mapping bottlenecks, data silos, and the automation opportunities with the highest impact.",
    deliverables: ["Ops audit", "System map", "ROI model"],
  },
  {
    tag: "PHASE 02",
    title: "Bespoke Development",
    body: "Our engineers build, test, and deploy custom logic into your existing infrastructure, with a seamless handover to your team.",
    deliverables: ["Build", "QA", "Deploy", "Handover"],
  },
  {
    tag: "PHASE 03",
    title: "Managed Maintenance",
    body: "Ongoing support, continuous optimisation, and proactive maintenance. Your systems get better every month, not just launched and left.",
    deliverables: ["Monitoring", "Tuning", "Support SLA"],
  },
];

/* Node on the rail — hairline ring that fills accent as its phase arrives */
function RailNode() {
  const reduce = useReducedMotion();
  return (
    <span
      className="absolute left-0 top-0.5 flex h-3 w-3 items-center justify-center rounded-full border border-line-2 bg-card"
      aria-hidden="true"
    >
      <motion.span
        className="h-full w-full rounded-full bg-accent"
        initial={reduce ? { scale: 1 } : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
      />
    </span>
  );
}

export function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress runs while the timeline crosses the middle band of the viewport,
  // then a spring smooths the raw scroll value so the line never jitters.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="hairline-t bg-paper-2 py-20 md:py-36"
    >
      <div className="container-x">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <Reveal as="p" className="eyebrow mb-6">
            Our Process
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="process-heading"
              className="font-display-tuned max-w-[16ch] text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.05] text-ink"
            >
              From audit to{" "}
              <em className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
                autonomy
              </em>
              .
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">
            Three phases. One accountable partner from first diagnostic to
            long-run optimisation.
          </Reveal>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Rail: hairline track + scroll-driven accent overlay */}
          <div
            className="absolute bottom-0 left-[5px] top-0 w-[2px] rounded-full bg-line"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0 origin-top rounded-full bg-accent"
              style={reduce ? undefined : { scaleY: lineProgress }}
            />
          </div>

          <ol className="list-none">
            {PHASES.map((phase) => (
              <li
                key={phase.tag}
                className="relative py-14 first:pt-0 last:pb-0 md:py-16 lg:py-20"
              >
                <div className="relative pl-12 md:pl-16">
                  <RailNode />
                  <RevealGroup className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] lg:items-start lg:gap-16">
                    <div>
                      <RevealItem as="div">
                        <p className="eyebrow mb-4">{phase.tag}</p>
                      </RevealItem>
                      <RevealItem as="div">
                        <h3 className="font-display-tuned text-2xl font-medium leading-tight text-ink md:text-3xl">
                          {phase.title}
                        </h3>
                      </RevealItem>
                      <RevealItem as="div">
                        <p className="mt-4 max-w-[46ch] leading-relaxed text-ink-2 md:text-lg">
                          {phase.body}
                        </p>
                      </RevealItem>
                    </div>

                    {/* Deliverables readout — desktop only, mono system voice */}
                    <RevealItem as="div" className="hidden lg:block lg:pt-9">
                      <ul
                        className="flex flex-col gap-2.5 font-mono text-xs tracking-wide text-ink-3"
                        aria-label={`${phase.title} deliverables`}
                      >
                        {phase.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-3">
                            <span className="h-px w-4 bg-line-2" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </RevealItem>
                  </RevealGroup>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
