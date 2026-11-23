"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

/**
 * A figure that counts up to its value the first time it scrolls into view.
 *
 * The real value is what gets server-rendered, so the number is correct with
 * JavaScript off, under reduced motion, and to anything reading the markup.
 * The count is written straight to the text node — no re-render per frame.
 */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  pad = 0,
  duration = 1.7,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Zero-pad to this many digits, e.g. 2 → "06". */
  pad?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = usePrefersReducedMotion();

  const format = (value: number) =>
    `${prefix}${String(Math.round(value)).padStart(pad, "0")}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = `${prefix}${String(Math.round(value)).padStart(pad, "0")}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, reduce, to, duration, prefix, suffix, pad]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {format(to)}
    </span>
  );
}
