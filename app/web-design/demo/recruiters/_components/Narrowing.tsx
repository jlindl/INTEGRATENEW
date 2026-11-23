"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { display, kicker, mono, serif, wrap } from "./tokens";

const TOTAL = 212;

const STAGES = [
  {
    count: 212,
    label: "Mapped and approached",
    day: "Days 1 to 4",
    body: "We map every credible person in the market, not just the ones with an open profile. For a platform lead in London that is usually around two hundred names, approached one by one, by a person.",
  },
  {
    count: 64,
    label: "Spoke to us properly",
    day: "Days 3 to 7",
    body: "A real thirty minute conversation about the role and their situation. Most say no, and that is useful: it tells you exactly how the market sees your offer before you have met anyone.",
  },
  {
    count: 14,
    label: "Interviewed in depth",
    day: "Days 6 to 10",
    body: "Ninety minutes with a consultant who has hired for this role themselves. Referencing starts here, quietly, with people who have worked alongside them.",
  },
  {
    count: 3,
    label: "On your desk",
    day: "Day 11, on average",
    body: "Three people, each with a written case for and against, salary and notice confirmed. You hire one, or you tell us why not and we go again at no extra cost.",
  },
];

/* Deterministic shuffle so the survivors are scattered, not clustered. */
function ranks(n: number) {
  const order = Array.from({ length: n }, (_, i) => i);
  let seed = 11;
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const rank = new Array<number>(n);
  order.forEach((dot, r) => (rank[dot] = r));
  return rank;
}

export function Narrowing() {
  /* Server render shows the payoff (stage 3) so the story reads without JS. */
  const [stage, setStage] = useState(3);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const rank = useMemo(() => ranks(TOTAL), []);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;
    if (els[0].getBoundingClientRect().top > window.innerHeight * 0.5) setStage(0);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStage(Number((e.target as HTMLElement).dataset.stage));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = STAGES[stage];

  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="relative scroll-mt-16 bg-[#121317] text-white"
    >
      <div className={`${wrap} pt-20 sm:pt-28 lg:pt-32`}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <p className={`${kicker} text-[#ff8a70] lg:col-span-3`}>The method</p>
          <div className="lg:col-span-9">
            <h2
              id="method-title"
              className={`${display} text-[clamp(2.3rem,5.6vw,4.9rem)] font-extrabold leading-[0.95] tracking-[-0.045em]`}
            >
              Two hundred conversations, so you only need{" "}
              <span className={`${serif} italic tracking-[-0.02em] text-[#ff8a70]`}>three.</span>
            </h2>
            <p className="mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-white/65">
              Most agencies send you the first thirty people who apply. This is
              what we do instead, on a real search we closed last month.
            </p>
          </div>
        </div>
      </div>

      <div className={`${wrap} relative grid grid-cols-1 lg:mt-10 lg:grid-cols-12 lg:gap-8`}>
        {/* Sticky visual: the field narrows as you read */}
        <div className="sticky top-16 z-10 -mx-4 bg-[#121317] px-4 pb-4 pt-6 sm:-mx-8 sm:px-8 lg:order-2 lg:col-span-6 lg:col-start-7 lg:mx-0 lg:h-[calc(100dvh-72px)] lg:self-start lg:px-0 lg:pb-0 lg:pt-0 lg:top-[72px]">
          <div className="flex h-full flex-col justify-center">
            <div className="flex items-end justify-between gap-4 border-b border-white/12 pb-3 lg:pb-5">
              <div aria-live="polite" aria-atomic="true">
                <p className={`${display} text-[clamp(3rem,8vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.06em] tabular-nums`}>
                  {current.count}
                </p>
                <p className={`${mono} mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-white/60`}>
                  {current.label}
                </p>
              </div>
              <p className={`${mono} text-right text-[0.68rem] uppercase tracking-[0.14em] text-[#ff8a70]`}>
                AT-2291
                <br />
                <span className="text-white/50">{current.day}</span>
              </p>
            </div>

            <div
              className="mt-4 grid grid-cols-[repeat(24,minmax(0,1fr))] gap-[4px] sm:gap-1.5 lg:mt-8 lg:grid-cols-[repeat(20,minmax(0,1fr))] lg:gap-[14px]"
              aria-hidden="true"
            >
              {rank.map((r, i) => {
                const alive = r < current.count;
                const chosen = r < 3;
                return (
                  <span
                    key={i}
                    className={`aspect-square rounded-full transition-[background-color,transform,opacity] duration-700 ease-out motion-reduce:transition-none ${
                      alive
                        ? chosen && stage === 3
                          ? "scale-[1.6] bg-[#ff5a3c] opacity-100 shadow-[0_0_0_3px_rgba(255,90,60,0.25)]"
                          : "bg-white opacity-90"
                        : "scale-[0.55] bg-white opacity-[0.13]"
                    }`}
                    style={{ transitionDelay: `${(r % 40) * 8}ms` }}
                  />
                );
              })}
            </div>

            <ol className="mt-4 hidden grid-cols-4 gap-2 lg:mt-8 lg:grid" aria-hidden="true">
              {STAGES.map((s, i) => (
                <li key={s.label}>
                  <span className={`block h-[2px] transition-colors duration-500 ${i <= stage ? "bg-[#ff5a3c]" : "bg-white/15"}`} />
                  <span className={`${mono} mt-2 block text-[0.62rem] uppercase tracking-[0.1em] ${i === stage ? "text-white" : "text-white/40"}`}>
                    {s.count}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Steps */}
        <ol className="relative lg:order-1 lg:col-span-5">
          {STAGES.map((s, i) => (
            <li
              key={s.label}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-stage={i}
              className="flex min-h-[52vh] flex-col justify-center border-t border-white/12 py-12 first:border-t-0 lg:min-h-[80vh]"
            >
              <p className={`${mono} text-[0.7rem] uppercase tracking-[0.14em] text-[#ff8a70]`}>
                Stage {i + 1} <span className="text-white/40">/ {s.day}</span>
              </p>
              <h3 className={`${display} mt-4 text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-none tracking-[-0.04em]`}>
                <span className="tabular-nums">{s.count}</span>{" "}
                <span className="text-white/55">{s.label.toLowerCase()}</span>
              </h3>
              <p className="mt-5 max-w-[30rem] text-[1.02rem] leading-relaxed text-white/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="h-16 lg:h-24" aria-hidden="true" />
    </section>
  );
}
