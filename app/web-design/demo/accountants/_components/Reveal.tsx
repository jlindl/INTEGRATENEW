"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

/**
 * Scroll reveal that is safe by default. Content is fully visible unless
 * JavaScript runs, motion is allowed AND the element starts below the fold.
 * Only then is the hidden state applied, so nothing is lost without JS.
 * variant "rule" draws a hairline from the left instead of fading.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "rise",
}: {
  children?: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "figure" | "section";
  variant?: "rise" | "rule";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const Comp = Tag as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    const cls = variant === "rule" ? "mc-rule" : "mc-rise";
    el.classList.add(cls);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("mc-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  return (
    <Comp
      ref={ref as RefObject<HTMLDivElement>}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
