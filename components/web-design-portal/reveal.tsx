"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right" | "zoom";

/**
 * Releases its children when they scroll into view. One observer per element,
 * disconnected on first reveal — nothing keeps running after the fact.
 *
 * The displacement itself lives in CSS (`[data-reveal]` in globals.css); this
 * only flips `data-shown`.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anything already on screen at mount (or above the fold) shows immediately.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal={direction}
      data-shown={shown || undefined}
      className={className}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
