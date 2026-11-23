"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { label, mono, photo, serif, wrap } from "./ui";

const steps = [
  {
    day: "Day 1",
    t: "Bank feeds locked",
    d: "Every account, card and payment platform reconciled to the penny. Anything we can’t match lands in one short list for you, not forty emails.",
  },
  {
    day: "Day 2",
    t: "Sales and purchase ledgers cleared",
    d: "Debtors chased on your behalf if you want us to. Supplier bills coded, approved and scheduled for your next payment run.",
  },
  {
    day: "Day 3",
    t: "Payroll and accruals posted",
    d: "Wages, pensions, holiday accruals, prepayments and deferred income. The unglamorous entries that make a margin real.",
  },
  {
    day: "Day 4",
    t: "VAT and tax provisions checked",
    d: "VAT return prepared and reviewed by a second accountant. Corporation tax provision updated, so year-end is never a surprise.",
  },
  {
    day: "Day 6",
    t: "Management accounts issued",
    d: "Profit and loss, balance sheet, cash runway and a 13-week forecast, with a one-page note in plain English on what moved.",
  },
  {
    day: "Day 8",
    t: "Your partner call",
    d: "Thirty minutes with your partner. What the numbers say, what we would do next, and anything you want to test before you commit.",
  },
];

export function MonthEnd() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(steps.length);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 72%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    setReady(true);
    setActive(Math.floor(scrollYProgress.get() * steps.length + 0.15));
  }, [reduce, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setActive(Math.floor(v * steps.length + 0.15));
  });

  return (
    <section
      id="month-end"
      aria-labelledby="month-end-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#0f2b22] text-[#f3f0e8]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(0deg,transparent_0,transparent_47px,#f3f0e8_47px,#f3f0e8_48px)]"
      />
      <div className={`${wrap} relative grid gap-16 py-24 sm:py-32 lg:grid-cols-12 lg:gap-8 lg:py-40`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className={`${label} text-[#f3f0e8]/70`}>
              <span className="text-[#d6b97f]">03</span> &nbsp;The monthly close
            </p>
            <h2
              id="month-end-title"
              className={`${serif} mt-8 text-[clamp(2.4rem,5vw,4.4rem)] font-[350] leading-[1] tracking-[-0.02em]`}
            >
              The same eight days, <em className="italic text-[#d6b97f]">every month.</em>
            </h2>
            <p className="mt-7 max-w-[30rem] text-[1.05rem] leading-[1.7] text-[#f3f0e8]/80">
              Most firms see your books once a year. We close them every month,
              on a timetable you can set your board meeting by. Scroll the
              calendar to see what happens, and when.
            </p>
            <figure className="relative mt-12 hidden aspect-[16/10] overflow-hidden rounded-[2px] lg:block">
              <Image
                src="/web-design/demo/accountants/partner-meeting.webp"
                alt="A Meridian partner talking a founder through her management accounts"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className={`${photo} object-cover object-[60%_40%]`}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[#0f2b22]/20 mix-blend-multiply" />
            </figure>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol ref={listRef} className="relative">
            <div aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-[#f3f0e8]/15" />
            {ready ? (
              <motion.div
                aria-hidden="true"
                style={{ scaleY: progress }}
                className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-[#d6b97f]"
              />
            ) : (
              <div aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-[#d6b97f]/60" />
            )}
            {steps.map((s, i) => {
              const on = i < active;
              return (
                <li key={s.t} className="relative grid grid-cols-[15px_1fr] gap-x-7 pb-14 last:pb-0 sm:gap-x-10">
                  <span
                    aria-hidden="true"
                    className={`relative z-10 mt-[0.4rem] h-[15px] w-[15px] rounded-full border transition-[background-color,border-color,box-shadow] duration-500 ${
                      on
                        ? "border-[#d6b97f] bg-[#d6b97f] shadow-[0_0_0_6px_rgba(214,185,127,0.14)]"
                        : "border-[#f3f0e8]/35 bg-[#0f2b22]"
                    }`}
                  />
                  <div className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-50"}`}>
                    <p className={`${mono} text-[0.78rem] uppercase tracking-[0.14em] text-[#d6b97f]`}>
                      {s.day}
                    </p>
                    <h3 className={`${serif} mt-2 text-[1.7rem] leading-[1.15] sm:text-[2rem]`}>{s.t}</h3>
                    <p className="mt-3 max-w-[32rem] text-[1rem] leading-[1.7] text-[#f3f0e8]/75">{s.d}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className={`${mono} mt-14 border-t border-[#f3f0e8]/20 pt-5 text-[0.75rem] uppercase tracking-[0.14em] text-[#f3f0e8]/70`}>
            Median close across our clients, 2025/26: 6.2 working days
          </p>
        </div>
      </div>
    </section>
  );
}
