"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

const LETTERS = "INTEGRATE".split("");

// The gradient is clipped to each letter individually. Clipping it once on the
// parent does not survive the letters being transformed — browsers paint the
// parent's `background-clip: text` from the untransformed glyph positions.
const INK =
  "inline-block bg-gradient-to-b from-neon-300/60 via-neon-500/25 to-transparent bg-clip-text text-transparent";

function Letter({
  char,
  index,
  progress,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
}) {
  // Letters are released left to right: each has its own slice of the scroll.
  // The last one lands by ~0.76 — the wordmark bleeds off the bottom of the
  // page, so the scroll never quite reaches 1.
  const start = (index / LETTERS.length) * 0.4;
  const y = useTransform(progress, [start, start + 0.4], ["105%", "0%"]);

  return (
    <motion.span style={{ y }} className={INK}>
      {char}
    </motion.span>
  );
}

/**
 * The oversized wordmark that closes the page. Its letters climb out of the
 * bottom edge one by one as the footer scrolls into view, so the last thing
 * the scroll does is spell the name.
 */
export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none relative z-10 -mb-[2vw] select-none overflow-hidden px-6 pt-6 sm:px-10"
    >
      <p className="mx-auto flex max-w-[1420px] justify-center text-[19vw] font-semibold leading-[0.78] tracking-[-0.05em] min-[1500px]:text-[285px]">
        {LETTERS.map((char, i) =>
          reduce ? (
            <span key={i} className={INK}>
              {char}
            </span>
          ) : (
            <Letter key={i} char={char} index={i} progress={scrollYProgress} />
          ),
        )}
      </p>
    </div>
  );
}
