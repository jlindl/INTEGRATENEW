"use client";

/**
 * Services — three disciplines told as three full-width scroll chapters,
 * deliberately not a card grid. Each chapter pairs an enormous outlined
 * index numeral (parallaxing slower than the content) with an editorial
 * content column; the sides alternate so the page zigzags downward.
 */
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { WebDesignCta } from "@/components/ui/WebDesignCta";

type Chapter = {
  index: string;
  title: string;
  body: string;
  items: string[];
  /** Web Design chapter carries the signature pill into the portfolio hub. */
  cta?: string;
};

const CHAPTERS: Chapter[] = [
  {
    index: "01",
    title: "Lead Generation",
    body: "Pipelines that fill themselves. Multi-channel outbound run by AI agents that qualify, book, and follow up around the clock.",
    items: ["Cold Email", "WhatsApp & SMS", "AI Sales Agents", "Follow-up Sequences"],
  },
  {
    index: "02",
    title: "Process Automation",
    body: "The operational drag, deleted. Your systems talk to each other, invoices chase themselves, and every lead is triaged the moment it lands.",
    items: ["CRM Sync", "Automated Invoicing", "AI-Driven Triage", "Data Enrichment"],
  },
  {
    index: "03",
    title: "Web Design",
    body: "Premium frontend married to robust full-stack architecture. Interfaces built to convert and infrastructure built to last.",
    items: ["Premium Frontend", "Full-Stack Architecture", "Headless CMS", "Performance Engineering"],
    cta: "See Integrate Web Design",
  },
];

function ServiceChapter({ chapter, flip }: { chapter: Chapter; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Chapter-local scroll drive: the numeral glides slower than the content,
  // drifting 60px → -60px as the chapter traverses the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const numeralY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Ink fills the numeral from the bottom up, paced to the numeral's OWN travel
  // through the viewport: empty when its top first appears at the bottom edge,
  // solid by the time it reaches the centre of the screen, so you watch it fill
  // as you scroll.
  //
  // Perf: the fill is a `clip-path` inset over a *statically rasterised* solid
  // ink glyph. Clipping a cached layer is cheap to update every scroll frame —
  // the earlier version rebuilt a gradient through `background-clip: text` each
  // frame, which forced a main-thread re-raster of the glyph and caused the
  // scroll jank.
  const numeralRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: fillRaw } = useScroll({
    target: numeralRef,
    offset: ["start end", "center center"],
  });
  const fillClip = useTransform(
    fillRaw,
    (v) => `inset(${((1 - Math.min(1, Math.max(0, v))) * 100).toFixed(2)}% 0% 0% 0%)`,
  );

  return (
    <div ref={ref} className="hairline-t">
      <div className="container-x grid items-center gap-x-10 gap-y-8 py-14 md:min-h-[70vh] md:gap-y-10 md:py-24 lg:grid-cols-12">
        {/* Giant index numeral — a hollow outline that ink fills from the
            bottom up as it rises through the viewport. Two stacked glyphs: a
            stroked "ghost" outline, and a solid-ink copy revealed by a rising
            clip-path (ink stroke matches, so the filled part has no halo seam).
            Pure ornament; the mono "/ NN" label in the content carries meaning. */}
        <div
          className={
            flip
              ? "lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:justify-self-end"
              : "lg:col-span-5 lg:col-start-1 lg:row-start-1"
          }
        >
          {/* Untransformed wrapper is the scroll-measured target (parallax on a
              child would feed back into its own measured position). */}
          <div ref={numeralRef} className="inline-block">
            <motion.div
              style={reduce ? undefined : { y: numeralY }}
              className="relative inline-block"
              aria-hidden="true"
            >
              {/* Resting outline */}
              <span className="block select-none font-display-tuned text-[clamp(6rem,18vw,15rem)] font-medium leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-line-2)]">
                {chapter.index}
              </span>
              {/* Solid-ink copy, revealed bottom-up by a clip inset. Reduced
                  motion: no clip → shown in its final filled state. */}
              <motion.span
                style={
                  reduce
                    ? undefined
                    : { clipPath: fillClip, WebkitClipPath: fillClip, willChange: "clip-path" }
                }
                className="pointer-events-none absolute inset-0 block select-none font-display-tuned text-[clamp(6rem,18vw,15rem)] font-medium leading-none text-ink [-webkit-text-stroke:1.5px_var(--color-ink)]"
              >
                {chapter.index}
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* Content column */}
        <div
          className={
            flip
              ? "lg:col-span-6 lg:col-start-1 lg:row-start-1"
              : "lg:col-span-6 lg:col-start-7 lg:row-start-1"
          }
        >
          <Reveal>
            <p className="eyebrow mb-5">/ {chapter.index}</p>
            <h3 className="font-display-tuned text-[clamp(1.9rem,3.5vw,3rem)] font-medium leading-[1.05] text-ink">
              {chapter.title}
            </h3>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-ink-2">
              {chapter.body}
            </p>
          </Reveal>

          <RevealGroup as="ul" className="mt-10">
            {chapter.items.map((item, i) => (
              <RevealItem
                as="li"
                key={item}
                className="group flex items-baseline gap-5 py-4 hairline-b"
              >
                <span className="w-7 shrink-0 font-mono text-xs text-ink-3">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span className="font-medium text-ink transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="-translate-x-1 text-accent opacity-0 transition-all duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0 group-hover:opacity-100"
                >
                  →
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Web Design chapter closes with the signature pill into the hub. */}
          {chapter.cta && (
            <Reveal delay={0.05} className="mt-10">
              <WebDesignCta size="lg" label={chapter.cta} className="inline-flex" />
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading">
      {/* Section header beat */}
      <div className="container-x pt-24 pb-16 md:pt-40 md:pb-24">
        <Reveal>
          <p className="eyebrow mb-6">What we do</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            id="services-heading"
            className="font-display-tuned max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.05] text-ink"
          >
            Three disciplines. One{" "}
            <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
              growth engine.
            </span>
          </h2>
        </Reveal>
      </div>

      {/* Three chapters — number side alternates left / right / left */}
      {CHAPTERS.map((chapter, i) => (
        <ServiceChapter key={chapter.index} chapter={chapter} flip={i % 2 === 1} />
      ))}
    </section>
  );
}
