"use client";

/**
 * Loads the Google tag (a large third-party script) on the visitor's first
 * interaction: a scroll, tap, click or key press. If they do nothing, it
 * loads after 8 seconds anyway. The inline init in <GoogleAnalytics /> has
 * already set consent defaults and queued the config call in dataLayer, so
 * the page view is recorded as soon as the library arrives.
 *
 * Trade-off agreed with Jack (2026-11-10): a visit that ends within 8 seconds
 * without any interaction is not counted in GA. Vercel Analytics and
 * Integrate Analytics still count it.
 */
import { useEffect } from "react";

const EVENTS = ["scroll", "pointerdown", "keydown", "touchstart"] as const;

export function GaLoader({ src }: { src: string }) {
  useEffect(() => {
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      cleanup();
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.id = "ga4-src";
      document.head.appendChild(s);
    };
    const timer = window.setTimeout(load, 8000);
    const cleanup = () => {
      window.clearTimeout(timer);
      EVENTS.forEach((e) => window.removeEventListener(e, load));
    };
    EVENTS.forEach((e) => window.addEventListener(e, load, { passive: true, once: true }));
    return cleanup;
  }, [src]);

  return null;
}
