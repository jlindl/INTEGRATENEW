"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * The user's reduced-motion preference, safe to branch on while rendering.
 *
 * The server snapshot is always `false`, and the client reuses that snapshot
 * for its first (hydrating) render before switching to the real value — so
 * markup that depends on this never mismatches the server HTML.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
