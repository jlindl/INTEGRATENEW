"use client";

import { useEffect, type RefObject } from "react";

/**
 * Calls `fn` with the scroll progress (0 to 1) of the nearest [data-scrub]
 * ancestor of `ref`, every time the director updates it. For the few things
 * CSS cannot do from --p alone, such as changing a number on screen.
 *
 * Write to the DOM inside `fn` (textContent, attributes) rather than calling
 * setState, so a scroll never re-renders React.
 */
export function useScrub(ref: RefObject<HTMLElement | null>, fn: (p: number) => void) {
  useEffect(() => {
    const host = ref.current?.closest<HTMLElement>("[data-scrub]");
    if (!host) return;
    const onP = (e: Event) => fn((e as CustomEvent<number>).detail);
    host.addEventListener("imm:p", onP);
    return () => host.removeEventListener("imm:p", onP);
    // `fn` is expected to be stable for the life of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
