"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { useRef } from "react";
import { SparkIcon } from "@/components/web-design-portal/icons";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

/** Copies of the word list laid end to end. The track slides exactly one copy
 *  (half its width) and wraps, so the loop has no seam. Each list is far wider
 *  than any screen on its own, so two is enough to always cover the viewport. */
const COPIES = 2;
const SPAN = 100 / COPIES;

function Row({
  words,
  baseVelocity,
  tone,
}: {
  words: readonly string[];
  /** Resting speed in % of the track per second; the sign sets the direction. */
  baseVelocity: number;
  tone: "solid" | "outline";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "20% 0px 20% 0px" });
  const reduce = usePrefersReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Scroll speed (px/s) → how many times faster than resting the band runs.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  // The type leans into the scroll, like it has mass.
  const skewX = useTransform(smoothVelocity, [-2200, 2200], [-9, 9]);
  const x = useTransform(baseX, (v) => `${wrap(-SPAN, 0, v)}%`);

  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView || reduce) return;

    const factor = velocityFactor.get();
    // Scrolling up reverses the band; it keeps that heading once you stop.
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    // Clamp the step so a backgrounded tab does not lurch on return.
    const seconds = Math.min(delta, 64) / 1000;
    const step = direction.current * baseVelocity * seconds;
    baseX.set(baseX.get() + step + step * Math.abs(factor));
  });

  return (
    <div ref={ref} className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        style={reduce ? undefined : { x, skewX }}
        className="flex shrink-0 flex-nowrap will-change-transform"
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <span
            key={copy}
            aria-hidden={copy > 0 || undefined}
            className="flex shrink-0 items-center"
          >
            {words.map((word) => (
              <span key={word} className="flex shrink-0 items-center">
                <span
                  className={`px-[0.22em] text-[clamp(2.75rem,7.6vw,7.25rem)] font-semibold uppercase leading-[1.08] tracking-[-0.045em] ${
                    tone === "outline" ? "text-outline" : ""
                  }`}
                >
                  {word}
                </span>
                <SparkIcon
                  className={`h-[clamp(1.5rem,3.4vw,3.25rem)] w-[clamp(1.5rem,3.4vw,3.25rem)] shrink-0 ${
                    tone === "outline" ? "text-neon-400" : "text-abyss/70"
                  }`}
                />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Two bands of oversized type running against each other, tilted off the grid.
 * Both pick up speed and lean with the scroll, and both flip direction when you
 * scroll back up.
 */
export default function VelocityMarquee({
  rows,
}: {
  rows: readonly [readonly string[], readonly string[]];
}) {
  return (
    // Vertical padding is sized to hold the tilt and the band's glow: the
    // container clips, and a glow cut off mid-falloff shows as a hard line.
    <div className="relative overflow-clip py-16 lg:py-24">
      <div className="-rotate-2 scale-x-[1.06] bg-neon-500 py-1.5 text-abyss shadow-[0_0_70px_-14px_rgba(160,43,255,0.9)] lg:py-2.5">
        <Row words={rows[0]} baseVelocity={-0.9} tone="solid" />
      </div>

      <div className="mt-5 rotate-1 scale-x-[1.06] border-y border-white/10 py-1.5 lg:mt-7 lg:py-2.5">
        <Row words={rows[1]} baseVelocity={0.9} tone="outline" />
      </div>
    </div>
  );
}
