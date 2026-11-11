"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { STUDIO } from "@/components/web-design-portal/site-data";
import { BoltIcon, LayersIcon, TargetIcon } from "@/components/web-design-portal/icons";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

type Tone = "ink" | "neon" | "paper";

/** Presentation for each principle, in the order they appear in `STUDIO`. */
const LOOK: {
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  tone: Tone;
}[] = [
  { Icon: TargetIcon, tone: "ink" },
  { Icon: BoltIcon, tone: "neon" },
  { Icon: LayersIcon, tone: "paper" },
];

/** Each card is a different slab of the palette, so the stack reads as three
 *  distinct sheets landing on one another rather than one card repeating. */
const TONES: Record<
  Tone,
  { card: string; number: string; body: string; chip: string; grid: string }
> = {
  ink: {
    card: "border-white/12 bg-abyss-raised text-white",
    number: "text-outline [--outline-fill:var(--color-abyss-raised)]",
    body: "text-white/65",
    chip: "border-white/12 bg-white/[0.05] text-white",
    grid: "opacity-50",
  },
  neon: {
    card: "border-neon-300/50 bg-gradient-to-br from-neon-500 via-neon-600 to-neon-800 text-white",
    number: "text-white/25",
    body: "text-white/85",
    chip: "border-white/30 bg-white/15 text-white",
    grid: "opacity-70",
  },
  paper: {
    card: "border-white bg-neon-50 text-abyss",
    number: "text-neon-500",
    body: "text-abyss/70",
    chip: "border-abyss/15 bg-abyss text-white",
    grid: "opacity-0",
  },
};

/** px each successive card sits lower than the one beneath it. */
const STEP = 26;

function Card({
  index,
  progress,
  reduce,
}: {
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const { title, body } = STUDIO[index];
  const { Icon, tone } = LOOK[index % LOOK.length];
  const styles = TONES[tone];
  const behind = STUDIO.length - 1 - index; // cards that will land on this one

  // From the moment this card pins, it shrinks a little for every card still
  // to come, and dims — so it settles back into the stack as it is covered.
  const from = index / STUDIO.length;
  const scale = useTransform(progress, [from, 1], [1, 1 - behind * 0.055]);
  const shade = useTransform(progress, [from, 1], [0, behind * 0.3]);

  return (
    <li
      className={reduce ? "" : "sticky"}
      style={reduce ? undefined : { top: `calc(15svh + ${index * STEP}px)` }}
    >
      <motion.article
        style={reduce ? undefined : { scale }}
        className={`relative isolate flex min-h-[min(62svh,560px)] origin-top flex-col justify-between overflow-hidden rounded-[28px] border p-7 shadow-[0_-24px_80px_-30px_rgba(0,0,0,0.9)] sm:p-10 lg:rounded-[40px] lg:p-14 ${styles.card}`}
      >
        <div
          aria-hidden
          className={`dot-grid absolute inset-0 -z-10 ${styles.grid}`}
        />

        <div className="flex items-start justify-between gap-6">
          <span
            aria-hidden
            className={`text-[clamp(4.5rem,13vw,12rem)] font-semibold leading-[0.78] tracking-[-0.06em] ${styles.number}`}
          >
            0{index + 1}
          </span>
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border lg:h-[72px] lg:w-[72px] lg:rounded-3xl ${styles.chip}`}
          >
            <Icon className="h-6 w-6 lg:h-8 lg:w-8" />
          </span>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-14">
          <h3 className="display text-[clamp(2rem,4.6vw,4.5rem)]">{title}</h3>
          <p
            className={`max-w-[44ch] text-[clamp(1.05rem,1.4vw,1.4rem)] leading-[1.5] ${styles.body}`}
          >
            {body}
          </p>
        </div>

        {/* Darkens as later cards stack on top. */}
        {!reduce && (
          <motion.div
            aria-hidden
            style={{ opacity: shade }}
            className="pointer-events-none absolute inset-0 bg-abyss"
          />
        )}
      </motion.article>
    </li>
  );
}

/**
 * How the studio works, as sheets that stack. Each one pins near the top of
 * the screen and the next slides up over it; the ones underneath recede.
 */
export default function StudioStack() {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 15%", "end 85%"],
  });

  return (
    <ul
      ref={ref}
      // The bottom padding holds the finished stack on screen for a beat
      // before the whole thing scrolls away.
      className={`relative flex flex-col ${reduce ? "gap-6" : "gap-[14svh] pb-[12svh]"}`}
    >
      {STUDIO.map((principle, i) => (
        <Card
          key={principle.title}
          index={i}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}
    </ul>
  );
}
