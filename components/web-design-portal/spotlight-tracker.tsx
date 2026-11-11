"use client";

import { useEffect } from "react";

/**
 * Feeds pointer coordinates to every `.spotlight` element on the page.
 *
 * One delegated listener for the whole document rather than a handler per card,
 * coalesced into a single write per frame. Skipped entirely on coarse pointers,
 * where there is no hover to track.
 */
export default function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let pending: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const event = pending;
      pending = null;
      if (!event) return;

      const target = event.target as Element | null;
      const card = target?.closest?.(".spotlight") as HTMLElement | null;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      pending = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
