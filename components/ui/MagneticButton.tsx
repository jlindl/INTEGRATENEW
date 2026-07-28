"use client";

/**
 * Cursor-aware CTA. The button leans gently toward the pointer while hovered
 * and settles back with a spring on leave. Purely decorative — falls back to
 * a plain anchor for keyboard users and reduced motion.
 */
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 22, mass: 0.6 });

  function onMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Lean at most ~5px toward the cursor
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.9375rem] font-medium transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-accent"
      : "bg-transparent text-ink shadow-[inset_0_0_0_1px_var(--color-line-2)] hover:shadow-[inset_0_0_0_1px_var(--color-ink)]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      {/* Arrow nudges right on hover */}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
      >
        →
      </span>
    </motion.a>
  );
}
