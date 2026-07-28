"use client";

/**
 * Scroll-reveal primitives. All sections use these (or raw framer-motion with
 * the shared tokens from lib/motion) so reveals feel identical everywhere.
 * Honors prefers-reduced-motion automatically via framer-motion's hook.
 */
import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before animating (for choreographed sequences). */
  delay?: number;
  /** Rise distance in px. Defaults to 28. */
  y?: number;
  className?: string;
  /** Render as a different element for semantics (e.g. "li", "h2"). */
  as?: "div" | "li" | "h1" | "h2" | "h3" | "p" | "span" | "section" | "figure";
};

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Container that staggers its <RevealItem> children on entry. */
export function RevealGroup({
  children,
  className,
  staggerChildren = 0.09,
  delayChildren = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren } },
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span" | "figure";
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      variants={{
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
