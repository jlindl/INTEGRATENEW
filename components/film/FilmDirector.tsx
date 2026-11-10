"use client";

/**
 * The film director. Renders nothing.
 *
 * The page is complete without it: every beat's HTML and CSS is its finished
 * state. Once the first paint is out, this loads GSAP, ScrollTrigger and Lenis
 * with a dynamic import, adds `film-on` to <html>, and from then on feeds each
 * [data-film] section a scroll progress as CSS custom properties. The CSS
 * does the drawing; this file only decides the timing and the easing.
 *
 * Under prefers-reduced-motion it never starts, so the visitor keeps the
 * designed static cut.
 */
import { useEffect } from "react";
import { scribblePath } from "@/lib/film/scribble";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
/** Progress of `p` through the window [a, b], clamped. */
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export function FilmDirector() {
  useEffect(() => {
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

      const root = document.documentElement;
      const inOut = gsap.parseEase("power3.inOut");
      const soft = gsap.parseEase("sine.inOut");
      const out = gsap.parseEase("expo.out");
      const q = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel);
      /* Custom properties inherit, so every write restyles the whole section.
         Only write when the value has actually changed. */
      const last = new WeakMap<HTMLElement, Record<string, string>>();
      const set = (el: HTMLElement, name: string, v: number) => {
        const value = v.toFixed(3);
        let seen = last.get(el);
        if (!seen) last.set(el, (seen = {}));
        if (seen[name] === value) return;
        seen[name] = value;
        el.style.setProperty(name, value);
      };

      root.classList.add("film-on");

      /* Smooth scroll: wheel only. Touch keeps the phone's native scroll. */
      const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -72 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const triggers: { kill: () => void }[] = [];
      const scrub = (
        el: Element,
        startAt: string,
        endAt: string,
        fn: (p: number) => void,
      ) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: startAt,
            end: endAt,
            onUpdate: (self) => fn(self.progress),
            onRefresh: (self) => fn(self.progress),
          }),
        );
      };

      /* Each beat is wired up in its own task, so the main thread is never
         held for long while the visitor is trying to scroll or tap. */
      const steps: (() => void)[] = [];

      steps.push(() => {
        /* 01 hero: the frame eases back as the visitor leaves it. */
        const hero = q("[data-film=hero]");
        if (hero) scrub(hero, "top top", "bottom top", (p) => set(hero, "--p", p));
      });

      steps.push(() => {
        /* 02 noise: the clock runs from 07:00 and each message lands on the
           line at its time. Pinned on desktop; on phones it plays as the
           list passes through the screen. */
        const noise = q("[data-film=noise]");
        const day = noise?.querySelector<HTMLElement>("[data-day]");
        if (noise && day) {
          const items = Array.from(noise.querySelectorAll<HTMLElement>(".film-day-item"));
          const clock = noise.querySelector<HTMLElement>("[data-clock]");
          const tally = noise.querySelector<HTMLElement>("[data-tally]");
          const n = items.length;
          const toMin = (hhmm: string) => {
            const [h, m] = hhmm.split(":").map(Number);
            return h * 60 + m;
          };
          /* Key frames for the clock: 07:00, each card's own time as it
             lands, then 18:30 at the end of the day. */
          const keys: [number, number][] = [
            [0, toMin("07:00")],
            ...items.map((el, i): [number, number] => [i + 0.35, toMin(el.dataset.time || "07:00")]),
            [n, toMin("18:30")],
          ];
          const clockAt = (k: number) => {
            for (let j = 1; j < keys.length; j++) {
              const [k1, m1] = keys[j];
              const [k0, m0] = keys[j - 1];
              if (k <= k1) return m0 + ((m1 - m0) * (k - k0)) / (k1 - k0 || 1);
            }
            return keys[keys.length - 1][1];
          };
          let lastMin = -1;
          let lastCount = -1;
          const apply = (p: number) => {
            const t = span(p, 0.04, 0.9);
            set(noise, "--t", t);
            const mins = Math.round(clockAt(t * n));
            if (clock && mins !== lastMin) {
              lastMin = mins;
              clock.textContent = `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
            }
            /* Counts only the cards actually on screen. */
            const count = Math.max(0, Math.min(n, Math.floor(t * n + 0.69)));
            if (tally && count !== lastCount) {
              lastCount = count;
              tally.textContent = String(count).padStart(2, "0");
            }
          };
          if (window.matchMedia("(min-width: 1024px)").matches) scrub(noise, "top top", "bottom bottom", apply);
          else scrub(day, "top 85%", "bottom 60%", apply);
        }
      });

      steps.push(() => {
        /* 03 the turn: gather, open the chevron, lay out the order. */
        const turn = q("[data-film=turn]");
        if (turn) {
          const tangle = turn.querySelector<SVGPathElement>("[data-turn-tangle]");
          let lastAmp = -1;
          let lastTone = "";
          /* Measured once per refresh, never inside the scroll handler. */
          let s0 = 3;
          let sMax = 400;
          const measureTurn = () => {
            s0 = window.matchMedia("(min-width: 768px)").matches ? 3 : 2;
            sMax = (Math.hypot(window.innerWidth, window.innerHeight) / 2 / 4.05) * 1.2;
          };
          measureTurn();
          ScrollTrigger.addEventListener("refreshInit", measureTurn);
          triggers.push({ kill: () => ScrollTrigger.removeEventListener("refreshInit", measureTurn) });
          scrub(turn, "top top", "bottom bottom", (p) => {
            const g = inOut(span(p, 0, 0.42));
            const door = inOut(span(p, 0.3, 0.86));
            set(turn, "--g", g);
            set(turn, "--s", s0 * Math.pow(sMax / s0, door));
            set(turn, "--door", door);
            set(turn, "--o", out(span(p, 0.74, 0.96)));
            const amp = Math.round((1 - g) * 100) / 100;
            if (tangle && amp !== lastAmp) {
              tangle.setAttribute("d", scribblePath(amp));
              lastAmp = amp;
            }
            const tone = door > 0.8 ? "light" : "dark";
            if (tone !== lastTone) {
              turn.dataset.tone = tone;
              lastTone = tone;
              window.dispatchEvent(new Event("film:tone"));
            }
          });
        }
      });

      steps.push(() => {
        /* 04 the system: the spine draws down through the stations. */
        const system = q("[data-film=system]");
        if (system) scrub(system, "top 75%", "bottom 65%", (p) => set(system, "--draw", p));
      });

      steps.push(() => {
        /* 05 trades: the line opens into a window, three match cuts, and the
           window closes back to the line. All inside one pinned stage. */
        const cuts = q("[data-film=cuts]");
        if (cuts) {
          let lastTone = "";
          scrub(cuts, "top top", "bottom bottom", (p) => {
            const open = p > 0.9 ? 1 - inOut(span(p, 0.9, 1)) : inOut(span(p, 0.03, 0.17));
            set(cuts, "--open", open);
            set(cuts, "--c1", inOut(span(p, 0.34, 0.5)));
            set(cuts, "--c2", inOut(span(p, 0.62, 0.78)));
            const tone = open > 0.86 ? "dark" : "light";
            if (tone !== lastTone) {
              cuts.dataset.tone = tone;
              lastTone = tone;
              window.dispatchEvent(new Event("film:tone"));
            }
          });
        }
      });

      steps.push(() => {
        /* 06 proof: on a desktop the filmstrip travels sideways as you scroll. */
        const proof = q("[data-film=proof]");
        if (proof) {
          const strip = proof.querySelector<HTMLElement>("[data-strip]");
          const wide = window.matchMedia("(hover: hover) and (min-width: 1024px)");
          const measure = () => {
            if (!strip || !strip.parentElement) return;
            const shift = wide.matches ? Math.max(0, strip.scrollWidth - strip.parentElement.clientWidth) : 0;
            proof.style.setProperty("--shift", `${shift}px`);
          };
          measure();
          ScrollTrigger.addEventListener("refreshInit", measure);
          triggers.push({ kill: () => ScrollTrigger.removeEventListener("refreshInit", measure) });
          scrub(proof, "top bottom", "bottom top", (p) => {
            set(proof, "--travel", soft(span(p, 0.22, 0.74)));
            set(proof, "--draw", soft(span(p, 0.1, 0.6)));
          });
        }
      });

      steps.push(() => {
        /* 07 process: the rail fills and each phase lights as it is reached. */
        const process = q("[data-film=process]");
        if (process) {
          const phases = Array.from(process.querySelectorAll<HTMLElement>("[data-phase]"));
          const rail = process.querySelector<HTMLElement>(".film-phases");
          if (rail)
            scrub(rail, "top 70%", "bottom 55%", (p) => {
              set(process, "--draw", p);
              phases.forEach((el, i) => el.classList.toggle("is-on", p >= i / phases.length + 0.02));
            });
        }
      });

      steps.push(() => {
        /* 08 payoff: the line arrives and frames the form. */
        const payoff = q("[data-film=payoff]");
        if (payoff)
          scrub(payoff, "top 75%", "top 5%", (p) => {
            set(payoff, "--draw", inOut(p));
            set(payoff, "--p", p);
          });
      });

      /* One-shot reveals for supporting content (never for buttons). */
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

      /* Looping details (chip pulses, the flow runner) only animate while
         their beat is on screen. */
      const live = new IntersectionObserver((entries) => {
        for (const e of entries) e.target.toggleAttribute("data-live", e.isIntersecting);
      });
      document.querySelectorAll("[data-film=noise], [data-film=turn], [data-film=system]").forEach((el) => live.observe(el));

      for (const step of steps) {
        step();
        await new Promise((r) => setTimeout(r, 0));
        if (dead) return;
      }

      document.fonts?.ready.then(() => !dead && ScrollTrigger.refresh());

      teardown = () => {
        io.disconnect();
        live.disconnect();
        triggers.forEach((t) => t.kill());
        gsap.ticker.remove(tick);
        lenis.destroy();
        root.classList.remove("film-on");
      };
    };

    /* After first paint and once the browser is idle, so the hero never waits
       on any of this. */
    const ric = "requestIdleCallback" in window; // not in older Safari
    const handle = ric
      ? window.requestIdleCallback(() => void start(), { timeout: 1800 })
      : window.setTimeout(start, 300);

    return () => {
      dead = true;
      if (ric) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      teardown();
    };
  }, []);

  return null;
}
