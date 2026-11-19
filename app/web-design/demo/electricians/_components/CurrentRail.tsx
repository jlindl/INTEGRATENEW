"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "triage", n: "C1" },
  { id: "services", n: "C2" },
  { id: "callout", n: "C3" },
  { id: "team", n: "C4" },
  { id: "reviews", n: "C5" },
  { id: "areas", n: "C6" },
  { id: "quote", n: "C7" },
];

/**
 * The signature: a live conductor down the left edge of the page (desktop)
 * that charges as you scroll, lighting each "circuit" as you reach it.
 * On small screens it collapses to a 2px charge bar along the top edge.
 * Purely decorative and only rendered once JS has measured the page.
 */
export function CurrentRail() {
  const rail = useRef<HTMLDivElement | null>(null);
  const bar = useRef<HTMLDivElement | null>(null);
  const [marks, setMarks] = useState<{ n: string; id: string; p: number }[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setMarks(
        sections
          .map((s) => {
            const el = document.getElementById(s.id);
            if (!el) return null;
            const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45;
            return { ...s, p: Math.min(1, Math.max(0, top / max)) };
          })
          .filter((m): m is { n: string; id: string; p: number } => m !== null),
      );
    };
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      rail.current?.style.setProperty("--ve-rail", p.toFixed(4));
      bar.current?.style.setProperty("--ve-rail", p.toFixed(4));
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    const t = window.setTimeout(measure, 1200); // after fonts and images settle
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (marks.length === 0) return null;

  return (
    <>
      {/* Mobile and tablet: charge bar */}
      <div ref={bar} aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] lg:hidden">
        <div
          className="h-full origin-left bg-[#ffb020] shadow-[0_0_8px_rgba(255,176,32,.8)]"
          style={{ transform: "scaleX(var(--ve-rail, 0))" }}
        />
      </div>

      {/* Desktop: conductor rail */}
      <div
        ref={rail}
        aria-hidden="true"
        className="pointer-events-none fixed bottom-16 left-7 top-32 z-30 hidden w-8 lg:block"
      >
        <div className="absolute bottom-0 left-[3px] top-0 w-px bg-white/12" />
        <div
          className="absolute left-[2px] top-0 h-full w-[3px] origin-top bg-[#ffb020] shadow-[0_0_10px_rgba(255,176,32,.7)]"
          style={{ transform: "scaleY(var(--ve-rail, 0))" }}
        />
        <div
          className="absolute left-[3.5px] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff3d6] shadow-[0_0_8px_3px_rgba(255,176,32,.9),0_0_24px_8px_rgba(255,176,32,.35)]"
          style={{ top: "calc(var(--ve-rail, 0) * 100%)" }}
        />
        {marks.map((m) => {
          const lit = progress >= m.p - 0.002;
          return (
            <div key={m.id} className="absolute left-0 flex -translate-y-1/2 items-center gap-2" style={{ top: `${m.p * 100}%` }}>
              <span
                className={`h-[7px] w-[7px] border transition-colors duration-300 ${
                  lit ? "border-[#ffb020] bg-[#ffb020]" : "border-white/30 bg-[#0a0c0f]"
                }`}
              />
              <span
                className={`font-[family-name:var(--font-ve-mono)] text-[0.6rem] tracking-[0.1em] transition-colors duration-300 ${
                  lit ? "text-[#ffb020]" : "text-white/35"
                }`}
              >
                {m.n}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
