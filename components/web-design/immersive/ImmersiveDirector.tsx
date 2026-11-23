"use client";

/**
 * The scroll engine every immersive demo shares. Renders nothing.
 *
 * A demo is complete without it: its HTML and CSS are the finished page.
 * After first paint this loads GSAP, ScrollTrigger and Lenis, marks the demo
 * root with data-imm="on", and from then on writes each [data-scrub]
 * element's scroll progress to it as the CSS custom property --p (0 to 1).
 * The demo's CSS does the drawing; this only supplies the numbers.
 *
 * It never starts under prefers-reduced-motion, so those visitors keep the
 * static cut. See README.md in this folder for the full contract.
 */
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Where a scrub starts and ends, by preset. */
const RANGES: Record<string, [string, string]> = {
  /* While the element travels through the screen. */
  through: ["top bottom", "bottom top"],
  /* A tall section with a sticky stage inside it. */
  pin: ["top top", "bottom bottom"],
  /* As the element arrives and settles. */
  enter: ["top 92%", "top 30%"],
  /* As the element leaves the top of the screen (a hero). */
  exit: ["top top", "bottom top"],
};

export function ImmersiveDirector() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-imm-root]");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dead = false;
    let teardown = () => {};

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (dead) return;
      gsap.registerPlugin(ScrollTrigger);

      const eases: Record<string, (n: number) => number> = {
        linear: (n) => n,
        inout: gsap.parseEase("power2.inOut"),
        out: gsap.parseEase("power3.out"),
        soft: gsap.parseEase("sine.inOut"),
      };

      root.setAttribute("data-imm", "on");

      /* Smooth wheel scrolling; touch keeps the phone's native scroll. */
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const triggers: { kill: () => void }[] = [];
      const scrubs = Array.from(root.querySelectorAll<HTMLElement>("[data-scrub]"));

      for (const el of scrubs) {
        const [s, e] = RANGES[el.dataset.scrub || "through"] ?? RANGES.through;
        const ease = eases[el.dataset.ease || "linear"] ?? eases.linear;
        const steps = Number(el.dataset.steps || 0);
        let last = "";
        let lastStep = -1;
        const apply = (raw: number) => {
          const p = ease(clamp01(raw));
          const value = p.toFixed(3);
          if (value !== last) {
            last = value;
            /* Custom properties inherit, so only write on a real change. */
            el.style.setProperty("--p", value);
            el.dispatchEvent(new CustomEvent("imm:p", { detail: p }));
          }
          if (steps) {
            const step = Math.min(steps - 1, Math.floor(clamp01(raw) * steps));
            if (step !== lastStep) {
              lastStep = step;
              el.dataset.step = String(step);
            }
          }
        };
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: el.dataset.start || s,
            end: el.dataset.end || e,
            onUpdate: (self) => apply(self.progress),
            onRefresh: (self) => apply(self.progress),
          }),
        );
        /* One beat per task, so the main thread is never held for long. */
        await new Promise((r) => setTimeout(r, 0));
        if (dead) return;
      }

      /* One-shot reveals for supporting content. */
      const reveal = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-in");
            reveal.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      root.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

      /* Looping details only animate while their section is on screen. */
      const live = new IntersectionObserver((entries) => {
        for (const entry of entries) entry.target.toggleAttribute("data-live", entry.isIntersecting);
      });
      root.querySelectorAll("[data-loop]").forEach((el) => live.observe(el));

      document.fonts?.ready.then(() => !dead && ScrollTrigger.refresh());

      teardown = () => {
        reveal.disconnect();
        live.disconnect();
        triggers.forEach((t) => t.kill());
        gsap.ticker.remove(tick);
        lenis.destroy();
        root.removeAttribute("data-imm");
      };
    };

    const idle = "requestIdleCallback" in window;
    const handle = idle
      ? window.requestIdleCallback(() => void start(), { timeout: 1500 })
      : window.setTimeout(start, 250);

    return () => {
      dead = true;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      teardown();
    };
  }, [pathname]);

  return null;
}
