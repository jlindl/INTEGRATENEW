"use client";

/**
 * Scroll reveals for /black-friday without a motion library, the way the
 * homepage film does it: the page renders finished, and this adds `bf-js` to
 * <html> so blocks marked `.bf-reveal` start hidden and ease in (CSS in
 * black-friday.css) as they scroll into view.
 *
 * Framer Motion (the shared <Reveal>) cost this page ~43 kB of JavaScript
 * before the headline could paint, which took it under a 90 Lighthouse
 * mobile score. With JavaScript off or reduced motion on, nothing is hidden.
 */
import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".bf-reveal:not(.is-in)"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    // Anything already on screen shows straight away, so nothing flashes.
    const fold = window.innerHeight;
    for (const el of els) {
      if (el.getBoundingClientRect().top < fold) el.classList.add("is-in");
      else io.observe(el);
    }
    document.documentElement.classList.add("bf-js");
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("bf-js");
    };
  }, []);

  return null;
}
