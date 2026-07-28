"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Transition delay in ms, for gentle staggering. */
  delay?: number;
};

/**
 * Scroll-reveal wrapper. Content is fully visible by default, so with JS
 * off, with reduced motion, or before hydration nothing is ever hidden.
 * Only when the component mounts, motion is allowed, AND the element is
 * still below the fold does it opt in to a one-off fade-and-rise.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window.IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen? Leave it alone so nothing visibly flashes.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setPhase("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPhase("shown");
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${className} transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        phase === "hidden"
          ? "translate-y-6 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
