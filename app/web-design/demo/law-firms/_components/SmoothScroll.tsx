"use client";

import { useEffect } from "react";

/**
 * Weighted, unhurried scrolling for pointer users. Skipped entirely for
 * reduced motion and touch devices, where native scrolling is better.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let destroyed = false;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const instance = new Lenis({ lerp: 0.09, anchors: { offset: -64 } });
      lenis = instance;
      const tick = (t: number) => {
        instance.raf(t);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
