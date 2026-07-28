"use client";

/**
 * ChapterBreak — the transition between the page's chapters. Replaces a static
 * `border-t` with a hairline that draws itself across the screen as the
 * section scrolls into view, a small mono chapter index, and a giant stroked
 * ghost numeral behind the section header (type as texture, editorial-style).
 *
 * Decorative only (aria-hidden) — each section keeps its own semantics. All
 * motion is transform/opacity, fires once, and collapses to the finished state
 * under reduced motion.
 */
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function ChapterBreak({
  index,
  ghost = true,
}: {
  /** Two-digit chapter index, e.g. "02". */
  index: string;
  /** Render the giant background numeral (skip where it would crowd content). */
  ghost?: boolean;
}) {
  const reduce = useReducedMotion();
  const viewport = { once: true, margin: "-6% 0px" } as const;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
      {/* The divider draws itself across the full bleed. */}
      <motion.div
        className="h-px w-full origin-left bg-graphite"
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 1.2, ease: EASE }}
      />

      {/* Chapter index, sitting in the section's top padding. */}
      <div className="container-x">
        <motion.p
          className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-mist-2"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          {index}
        </motion.p>
      </div>

      {/* Ghost numeral — huge, stroked, whisper-faint, drifting into place. */}
      {ghost && (
        <motion.span
          className="wd-ghost-numeral font-display-tuned absolute right-[3%] top-8 -z-10 select-none text-[clamp(7rem,15vw,12.5rem)] font-medium leading-none"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
        >
          {index}
        </motion.span>
      )}
    </div>
  );
}
