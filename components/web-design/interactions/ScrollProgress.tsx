"use client";

/**
 * ScrollProgress — a thin accent bar pinned to the top that fills with page
 * scroll. A portfolio-grade detail most agency sites skip. Scroll-linked, not
 * autonomous, so it's kept under reduced motion (just without the spring easing).
 */
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 240, damping: 40, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-iris to-iris-soft"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
