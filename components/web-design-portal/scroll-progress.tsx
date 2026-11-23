"use client";

import { useEffect, useRef } from "react";

/**
 * Neon rule across the very top showing how far down the page you are.
 *
 * Writes a CSS custom property from inside a rAF rather than setting React
 * state, so scrolling never triggers a render.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.setProperty("--progress", String(Math.min(1, Math.max(0, progress))));
    };

    const onScroll = () => {
      if (frame) return; // coalesce bursts into one write per frame
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
    >
      <div
        ref={ref}
        className="scroll-progress h-full bg-gradient-to-r from-neon-600 via-neon-400 to-neon-200 shadow-[0_0_12px_rgba(160,43,255,0.9)]"
      />
    </div>
  );
}
