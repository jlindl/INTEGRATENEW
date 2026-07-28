"use client";

/**
 * KineticHeading — a once-on-load headline reveal: each word rises out of a mask
 * and resolves from a soft blur into focus, staggered. Runs on mount only (never
 * re-fires on scroll). The visible words are aria-hidden and the wrapper carries
 * an aria-label, so assistive tech reads the whole phrase, not fragments.
 * Reduced motion → the text is simply present, no motion.
 *
 * `accentFrom` turns the words from that index onward into the typographic
 * centrepiece: each gets `accentClass` (the platinum sheen treatment) with a
 * per-word animation delay, so the sheen sweeps across the phrase word by word
 * right after it has risen into place.
 */
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function KineticHeading({
  text,
  className = "",
  delay = 0,
  accentFrom,
  accentClass = "wd-sheen-word",
}: {
  text: string;
  className?: string;
  delay?: number;
  accentFrom?: number;
  accentClass?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => {
        const accent = accentFrom !== undefined && i >= accentFrom;
        return (
          <span key={i} aria-hidden="true">
            <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
              <motion.span
                className={`inline-block ${accent ? accentClass : ""}`}
                style={
                  accent
                    ? { animationDelay: `${delay + 0.95 + i * 0.09}s` }
                    : undefined
                }
                initial={
                  reduce
                    ? { y: 0, opacity: 1, filter: "blur(0px)" }
                    : { y: "115%", opacity: 0, filter: "blur(6px)" }
                }
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.08 }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
}
