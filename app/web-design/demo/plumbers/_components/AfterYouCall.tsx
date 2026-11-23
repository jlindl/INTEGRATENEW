"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PhoneIcon } from "./icons";
import s from "./nl.module.css";
import { display, focusRingDark, h2, kickerDark, mono, PHONE_DISPLAY, PHONE_HREF, wrap } from "./theme";

const STEPS = [
  {
    t: "0:00",
    title: "A person picks up",
    body: "Not a call centre and not a menu. Jo or Amir in our Kirkstall office, usually inside 30 seconds, any hour of the day.",
  },
  {
    t: "0:01",
    title: "We help you stop the water",
    body: "While we talk, we walk you to your stopcock and get the water off. If it is near sockets or lights, we will tell you what to switch off at the consumer unit.",
    extra: [
      "Most homes: under the kitchen sink.",
      "Older terraces: often at the cellar head or under the stairs.",
      "Turn it clockwise until it stops. Then open a cold tap to drain the pipes.",
    ],
  },
  {
    t: "0:04",
    title: "An engineer is on the way",
    body: "You get a text with their name, photo and van registration, plus a live arrival time you can track.",
  },
  {
    t: "1:30",
    title: "A fixed price, before any work",
    body: "They find the cause, explain it in plain English and give you one price. Say no and you pay nothing. There is no call-out fee.",
  },
  {
    t: "2:40",
    title: "Fixed, tested and tidied",
    body: "Dust sheets down, shoe covers on. Pipes pressure tested, everything dried off, and the floor hoovered before we go.",
  },
  {
    t: "+1 day",
    title: "Photos, invoice and a guarantee",
    body: "An emailed report with before and after photos (handy for insurers) and a 12-month guarantee on the repair.",
  },
];

/**
 * Signature interaction: a pipe that fills with water as you scroll through
 * what happens after you call. Without JS, or with reduced motion, the pipe
 * is simply full and every step is lit.
 */
export function AfterYouCall() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [fill, setFill] = useState(1);
  const [reached, setReached] = useState(STEPS.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      if (!track) return;
      const r = track.getBoundingClientRect();
      const line = window.innerHeight * 0.62;
      const p = Math.min(1, Math.max(0, (line - r.top) / r.height));
      setFill(p);
      const level = r.top + p * r.height;
      let n = 0;
      stepRefs.current.forEach((el) => {
        if (el && el.getBoundingClientRect().top + 14 <= level + 1) n += 1;
      });
      setReached(n);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const pct = Math.round(fill * 100);

  return (
    <section
      id="after-you-call"
      aria-labelledby="ayc-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#0b1a28] text-white"
    >
      <div className={`${wrap} grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12`}>
        {/* Left: sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className={kickerDark}>If water is coming through right now</p>
            <h2 id="ayc-title" className={`${h2} mt-5 text-white`}>
              What happens after you call.
            </h2>
            <p className="mt-6 max-w-md text-[1.08rem] leading-relaxed text-[#b9c8d3]">
              Panic is normal. This is the exact routine our team runs on every emergency, so you know what is coming at
              each step.
            </p>

            <div className="mt-9 flex items-end gap-5">
              <div className="relative h-[220px] w-[170px] shrink-0 overflow-hidden rounded-[22px] sm:h-[260px] sm:w-[200px]">
                <Image
                  src="/web-design/demo/plumbers/radiator-hand.webp"
                  alt="A hand turning a white thermostatic valve on a radiator"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <div aria-hidden="true" className="pb-1">
                <p className={`${mono} text-[0.78rem] uppercase tracking-[0.14em] text-[#7f95a6]`}>Water level</p>
                <p className={`${display} text-[3.4rem] font-extrabold leading-none tracking-[-0.04em] text-[#1ed3b0] tabular-nums sm:text-[4.2rem]`}>
                  {pct}%
                </p>
                <p className="mt-2 max-w-[11rem] text-[0.85rem] leading-snug text-[#b9c8d3]">
                  Most callers are dry within three hours of picking up the phone.
                </p>
              </div>
            </div>

            <a
              href={PHONE_HREF}
              className={`${focusRingDark} mt-9 inline-flex items-center gap-3 rounded-full bg-[#1ed3b0] px-6 py-4 font-bold text-[#0b1a28] transition-colors hover:bg-[#46e0c2]`}
            >
              <PhoneIcon className="h-5 w-5" />
              Call now <span className={mono}>{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        {/* Right: the pipe timeline */}
        <div className="relative lg:col-span-7">
          <div ref={trackRef} className="relative">
            {/* Pipe */}
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[19px] top-2 w-[14px] -translate-x-1/2 overflow-hidden rounded-full bg-[#12263a] ring-1 ring-inset ring-[#22405a] sm:left-[27px]"
            >
              <div
                className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#1ed3b0] to-[#0fa98c]"
                style={{ height: `${pct}%` }}
              >
                <div className="absolute inset-x-0 bottom-0 h-3 overflow-hidden">
                  <div className={`${s.wave} flex h-full w-[200%]`}>
                    <svg viewBox="0 0 28 12" preserveAspectRatio="none" className="h-full w-1/2">
                      <path d="M0 6 Q7 0 14 6 T28 6 V12 H0Z" fill="#7cf0d9" opacity="0.7" />
                    </svg>
                    <svg viewBox="0 0 28 12" preserveAspectRatio="none" className="h-full w-1/2">
                      <path d="M0 6 Q7 0 14 6 T28 6 V12 H0Z" fill="#7cf0d9" opacity="0.7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <ol className="relative space-y-4">
              {STEPS.map((st, i) => {
                const on = i < reached;
                return (
                  <li
                    key={st.t}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="relative grid grid-cols-[38px_1fr] gap-4 sm:grid-cols-[54px_1fr] sm:gap-6"
                  >
                    <span
                      aria-hidden="true"
                      className={`relative z-10 mt-5 grid h-[38px] w-[38px] place-items-center rounded-full border-2 transition-colors duration-500 sm:h-[54px] sm:w-[54px] ${
                        on ? "border-[#1ed3b0] bg-[#1ed3b0] text-[#0b1a28]" : "border-[#22405a] bg-[#0b1a28] text-[#7f95a6]"
                      }`}
                    >
                      <span className={`${mono} text-[0.72rem] font-medium sm:text-[0.8rem]`}>{i + 1}</span>
                    </span>
                    <div
                      className={`rounded-[22px] border p-5 transition-[background-color,border-color] duration-500 sm:p-7 ${
                        on ? "border-[#24506a] bg-[#12263a]" : "border-[#17304a] bg-transparent"
                      }`}
                    >
                      <p className={`${mono} text-[0.82rem] text-[#1ed3b0]`}>
                        {st.t.startsWith("+") ? st.t : `${st.t} after you call`}
                      </p>
                      <h3 className={`${display} mt-2 text-[1.35rem] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[1.6rem]`}>
                        {st.title}
                      </h3>
                      <p className="mt-3 max-w-[36rem] leading-relaxed text-[#b9c8d3]">{st.body}</p>
                      {st.extra && (
                        <ul className="mt-5 grid gap-2 rounded-2xl bg-[#0b1a28] p-4 text-[0.95rem] text-[#dbe5ec]">
                          <li className={`${mono} text-[0.75rem] uppercase tracking-[0.14em] text-[#7f95a6]`}>
                            Where is my stopcock?
                          </li>
                          {st.extra.map((x) => (
                            <li key={x} className="flex gap-3">
                              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1ed3b0]" aria-hidden="true" />
                              {x}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
