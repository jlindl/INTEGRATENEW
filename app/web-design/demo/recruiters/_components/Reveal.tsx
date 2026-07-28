"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Transition delay in ms, applied only while animating in. */
  delay?: number;
};

/**
 * Progressive scroll-reveal. Content is rendered fully visible; only after
 * mount, and only when the user allows motion AND the element is still below
 * the fold, is it armed (hidden) and revealed by an IntersectionObserver.
 * With JS off, or reduced motion on, nothing is ever hidden.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    /* Anything already in (or near) the viewport stays put. */
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setPhase("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    phase === "shown" && delay > 0
      ? { transitionDelay: `${delay}ms` }
      : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={`${className} transition-[opacity,transform] duration-700 ease-out ${
        phase === "hidden"
          ? "translate-y-6 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
