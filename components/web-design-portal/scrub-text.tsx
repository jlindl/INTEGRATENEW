"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

/** Compare words without their punctuation, so "weeks," still matches "weeks". */
const bare = (word: string) => word.replace(/[^\p{L}\p{N}-]/gu, "").toLowerCase();

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={accent ? "text-neon-300" : undefined}
    >
      {children}
    </motion.span>
  );
}

/**
 * A statement that is read by scrolling: every word starts as a ghost and lights
 * up in order as the paragraph travels up the viewport. Scroll back and it
 * unlights — the position of the page is the position in the sentence.
 */
export default function ScrubText({
  text,
  accent = [],
  className,
}: {
  text: string;
  /** Words (case/punctuation-insensitive) that light up in neon. */
  accent?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = usePrefersReducedMotion();

  // Starts as the top of the paragraph enters the lower part of the screen,
  // finishes as its end reaches the middle.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.86", "end 0.52"],
  });

  const words = text.split(/\s+/).filter(Boolean);
  const accents = new Set(accent.map(bare));

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const isAccent = accents.has(bare(word));

        if (reduce) {
          return (
            <span key={i} className={isAccent ? "text-neon-300" : undefined}>
              {word}{" "}
            </span>
          );
        }

        // Each word fades over a window slightly wider than its own slot, so
        // neighbours overlap and the light reads as a sweep, not a typewriter.
        const start = i / words.length;
        const end = Math.min(1, (i + 2.4) / words.length);

        return (
          <span key={i}>
            <Word progress={scrollYProgress} range={[start, end]} accent={isAccent}>
              {word}
            </Word>{" "}
          </span>
        );
      })}
    </p>
  );
}
