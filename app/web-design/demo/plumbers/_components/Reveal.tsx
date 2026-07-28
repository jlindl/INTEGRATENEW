"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Gentle scroll-reveal. Progressive enhancement only:
 * - Server render + JS off: content is fully visible (state starts "idle").
 * - prefers-reduced-motion: no animation, content stays visible.
 * - Elements already in the viewport at mount are never hidden (no flicker).
 * - Only elements below the fold get hidden after mount, then transition in
 *   when the IntersectionObserver fires.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Anything at or above the fold stays visible; only animate what the
    // visitor has not seen yet.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${className} transition-[opacity,transform] duration-700 ease-out ${
        state === "hidden" ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
