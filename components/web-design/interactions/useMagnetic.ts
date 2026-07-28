"use client";

/**
 * useMagnetic — a reusable "leans toward the cursor" primitive. Attach `ref` to
 * the element, feed `x`/`y` (spring MotionValues) into a motion.* `style`, and
 * wire `onMouseMove`/`onMouseLeave`. Reduced motion → the springs never move.
 *
 * `strength` is the fraction of the cursor's offset-from-centre the element
 * follows (0.3 ≈ a gentle lean). The spring settles it back on leave.
 */
import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 22, mass: 0.6 });

  function onMouseMove(e: MouseEvent<T>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return { ref, x, y, onMouseMove, onMouseLeave, reduce };
}
