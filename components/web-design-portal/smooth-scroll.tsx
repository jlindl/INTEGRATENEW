"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Inertial scrolling for the whole document.
 *
 * Lenis is ticked from Motion's frame loop rather than its own rAF, so the
 * scroll position and every scroll-linked transform on the page are computed in
 * the same frame — two separate loops leave pinned scenes a frame behind the
 * scroll and they visibly shudder.
 *
 * Touch scrolling is left native (the default), and Lenis already drops to 1:1
 * scrolling under prefers-reduced-motion.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    const tick = ({ timestamp }: { timestamp: number }) => {
      ref.current?.lenis?.raf(timestamp);
    };

    frame.update(tick, true);
    return () => cancelFrame(tick);
  }, []);

  return (
    <ReactLenis
      root
      ref={ref}
      options={{
        autoRaf: false,
        lerp: 0.085,
        wheelMultiplier: 0.95,
        // In-page links glide to their section instead of jumping.
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
