"use client";

/**
 * WorkflowAutomation — deep-dive beat #1. A tonal paper-2 band: editorial
 * copy on the left, and on the right a "connected system" diagram — a single
 * horizontal spine running first touch → final result, with a signal that
 * travels end to end on a loop. It literally draws the sentence: one connected
 * system, no handoffs. The panel parallax-drifts slightly slower than the copy
 * and levels out (1.5deg → 0) as it enters.
 *
 * Perf: the only looping animation is the signal's `x`/`opacity` (both
 * GPU-composited) and it's gated to when the panel is on-screen. Reduced
 * motion drops every animation and shows the system fully connected.
 */
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const FEATURES = [
  {
    label: "Real-time CRM sync & enrichment",
    support:
      "Every record complete, current, and deduplicated, without a human touching it.",
  },
  {
    label: "AI-powered lead triage & routing",
    support:
      "Inbound leads scored, segmented, and routed to the right owner in seconds.",
  },
  {
    label: "Automated invoicing & payment follow-up",
    support:
      "Billing runs itself, and overdue payments are chased politely and persistently.",
  },
] as const;

/* The connected spine: first touch → final result, evenly spaced. */
const NODES = [
  { label: "First touch", note: "form · call · inbound" },
  { label: "Enriched", note: "data completed" },
  { label: "Actioned", note: "CRM · billing · comms" },
  { label: "Final result", note: "outcome delivered" },
] as const;

/* Nodes sit at the centre of four equal columns → 12.5% … 87.5%. The spine
   and the travelling signal both run between those two outer node centres. */
const SPINE_START = 0.125;
const SPINE_SPAN = 0.75;

export function WorkflowAutomation() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const panelInView = useInView(panelRef);

  // Measure the track so the signal can travel with a GPU-composited transform
  // (translateX in px) rather than an expensive animated `left`.
  const [trackW, setTrackW] = useState(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => setTrackW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll drive: panel drifts slower than the copy and levels out on entry.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const panelRotate = useTransform(scrollYProgress, [0, 0.45], [1.5, 0]);

  const animateSignal = panelInView && !reduce;

  return (
    <section
      ref={sectionRef}
      id="automation"
      aria-label="Intelligent workflow automation"
      className="hairline-t hairline-b relative bg-paper-2"
    >
      <div className="container-x py-20 md:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[45fr_55fr] lg:gap-20">
          {/* ------------------------------------------------ copy column */}
          <div>
            <Reveal>
              <p className="eyebrow mb-7 flex items-center gap-3">
                <span
                  className="inline-block h-1.5 w-1.5 bg-accent"
                  aria-hidden="true"
                />
                Deep dive / 01
              </p>
            </Reveal>

            <Reveal as="h2" delay={0.08}>
              <span className="font-display-tuned block max-w-[16ch] text-[clamp(2.2rem,4.8vw,3.75rem)] font-medium leading-[1.05] text-ink">
                Intelligent{" "}
                <em className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
                  workflow
                </em>{" "}
                automation.
              </span>
            </Reveal>

            <Reveal as="p" delay={0.16} className="mt-7 max-w-[52ch] text-lg leading-relaxed text-ink-2">
              End-to-end automation that eliminates manual bottlenecks. One
              connected system from first touch to final result.
            </Reveal>

            <RevealGroup as="ul" className="mt-12" delayChildren={0.2}>
              {FEATURES.map((feature) => (
                <RevealItem as="li" key={feature.label} className="hairline-t">
                  <div className="flex items-start gap-4 py-5">
                    <span
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-[0.9375rem] font-semibold text-ink">
                        {feature.label}
                      </h3>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">
                        {feature.support}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* ---------------------------------------------- visual column */}
          {/* Decorative connected-system diagram — hidden from AT. */}
          <motion.div
            ref={panelRef}
            aria-hidden="true"
            style={reduce ? undefined : { y: panelY, rotate: panelRotate }}
            className="relative"
          >
            <div className="glow-accent absolute -inset-x-10 -inset-y-14" />

            <Reveal delay={0.12} y={36}>
              <div className="hairline relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl bg-card shadow-float">
                {/* window chrome */}
                <div className="hairline-b flex items-center gap-3 px-5 py-3.5 sm:px-6">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-line-2" />
                    <span className="h-2 w-2 rounded-full bg-line" />
                    <span className="h-2 w-2 rounded-full bg-line" />
                  </span>
                  <span className="font-mono text-xs text-ink-3">
                    system / connected-ops
                  </span>
                  <span className="ml-auto flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {animateSignal && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-accent"
                          animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )}
                    </span>
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] text-accent">
                      LIVE
                    </span>
                  </span>
                </div>

                {/* connected-system body */}
                <div className="px-6 py-11 sm:px-9 sm:py-14">
                  <p className="mb-10 font-mono text-[0.625rem] tracking-[0.16em] text-ink-3">
                    END TO END · ONE CONNECTED SYSTEM
                  </p>

                  <div ref={trackRef} className="relative">
                    {/* base spine */}
                    <span
                      className="absolute top-[7px] h-px bg-line-2"
                      style={{ left: "12.5%", right: "12.5%" }}
                    />
                    {/* subtle always-on accent tint — the connection is live */}
                    <span
                      className="absolute top-[7px] h-px opacity-50"
                      style={{
                        left: "12.5%",
                        right: "12.5%",
                        background:
                          "linear-gradient(to right, transparent, var(--color-accent), transparent)",
                      }}
                    />

                    {/* travelling signal — one packet, first touch → result */}
                    <motion.span
                      className="pointer-events-none absolute top-[7px] z-10"
                      style={{ left: `${SPINE_START * 100}%` }}
                      animate={
                        animateSignal
                          ? { x: [0, trackW * SPINE_SPAN], opacity: [0, 1, 1, 0] }
                          : { x: 0, opacity: 0 }
                      }
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.18, 0.82, 1],
                      }}
                    >
                      <span className="block h-3 w-3 -ml-1.5 -mt-1.5 rounded-full bg-accent shadow-[0_0_0_5px_var(--color-accent-tint)]" />
                    </motion.span>

                    {/* nodes */}
                    <ol className="relative grid grid-cols-4">
                      {NODES.map((node, i) => {
                        const endpoint = i === 0 || i === NODES.length - 1;
                        return (
                          <li
                            key={node.label}
                            className="flex flex-col items-center px-1.5 text-center"
                          >
                            <span
                              className={`relative z-0 flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                                endpoint
                                  ? "bg-accent"
                                  : "border border-line-2 bg-card"
                              }`}
                            >
                              {endpoint && (
                                <span className="h-1 w-1 rounded-full bg-card" />
                              )}
                            </span>
                            <span className="mt-4 text-[0.82rem] font-semibold leading-tight text-ink">
                              {node.label}
                            </span>
                            <span className="mt-1 font-mono text-[0.625rem] leading-tight text-ink-3">
                              {node.note}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  {/* footer readout */}
                  <div className="hairline-t mt-11 flex items-center justify-between pt-5 font-mono text-[0.6875rem] text-ink-3">
                    <span>first touch → final result</span>
                    <span className="flex items-center gap-2 text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      0 handoffs
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
