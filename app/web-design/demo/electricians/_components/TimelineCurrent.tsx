"use client";

import { useEffect, useRef } from "react";

/**
 * The "current" running down the call-out timeline. It charges as the
 * timeline passes the middle of the viewport. Without JS, or with reduced
 * motion, the line is simply drawn in full.
 */
export function TimelineCurrent() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      el.style.setProperty("--ve-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-4 left-[17px] top-4 w-[2px] bg-white/10 sm:left-[23px]"
    >
      <div
        className="absolute inset-x-0 top-0 h-full origin-top bg-[#ffb020] shadow-[0_0_12px_rgba(255,176,32,.7)]"
        style={{ transform: "scaleY(var(--ve-p, 1))" }}
      />
      <div
        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff3d6] shadow-[0_0_10px_3px_rgba(255,176,32,.9),0_0_28px_8px_rgba(255,176,32,.35)]"
        style={{ top: "calc(var(--ve-p, 1) * 100%)" }}
      />
    </div>
  );
}
