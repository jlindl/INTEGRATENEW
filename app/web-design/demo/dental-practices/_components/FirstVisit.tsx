"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Reveal } from "./Reveal";
import { container, display, eyebrow, focusRing } from "./ui";

type Step = {
  when: string;
  title: string;
  body: string;
  detail: string;
  visual: ReactNode;
};

function TextMock() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(160deg,#e3ebe4,#f2d6c6)] p-6">
      <div className="w-full max-w-[19rem] rounded-[2.2rem] border border-[#1c2a26]/10 bg-[#fffcf7] p-4 shadow-[0_40px_70px_-40px_rgba(28,42,38,0.6)]">
        <div className="mb-4 flex items-center gap-3 border-b border-[#1c2a26]/8 pb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2d5547] text-xs font-semibold text-[#fffcf7]">BW</span>
          <div>
            <p className="text-[0.85rem] font-semibold text-[#1c2a26]">Brightwell Dental</p>
            <p className="text-[0.7rem] text-[#55625c]">Wednesday, 4:12pm</p>
          </div>
        </div>
        <div className="space-y-2.5 text-[0.84rem] leading-snug text-[#1c2a26]">
          <p className="rounded-2xl rounded-tl-md bg-[#ece3d6] px-3.5 py-2.5">
            Hi Sam, it&rsquo;s Mia at Brightwell. See you tomorrow at 9:20 with Dr Ellery (that&rsquo;s her below).
          </p>
          <div className="relative h-16 overflow-hidden rounded-2xl sm:h-24">
            <Image src="/web-design/demo/dental-practices/dr-hannah.webp" alt="" fill sizes="300px" className="bw-grade object-cover object-[50%_18%]" />
          </div>
          <p className="rounded-2xl rounded-tl-md bg-[#ece3d6] px-3.5 py-2.5">
            Two free parking bays round the back. Need to move it? Just reply, no fuss at all.
          </p>
          <p className="ml-auto w-fit rounded-2xl rounded-tr-md bg-[#2d5547] px-3.5 py-2.5 text-[#fffcf7]">
            Thank you, see you then
          </p>
        </div>
      </div>
    </div>
  );
}

function PlanMock() {
  const rows = [
    ["Hygiene visit", "£75"],
    ["Small white filling, lower left", "£140"],
    ["Review in 6 months", "Included"],
  ];
  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(200deg,#ece3d6,#e3ebe4)] p-6">
      <div className="w-full max-w-[22rem] rounded-[1.6rem] bg-[#fffcf7] p-6 shadow-[0_40px_70px_-40px_rgba(28,42,38,0.6)]">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#55625c]">Your treatment plan</p>
        <p className={`${display} mt-1 text-[1.5rem] text-[#1c2a26]`}>Sam, in plain English</p>
        <ul className="mt-5 divide-y divide-[#1c2a26]/8 text-[0.88rem]">
          {rows.map(([a, b]) => (
            <li key={a} className="flex justify-between gap-4 py-2.5">
              <span className="text-[#1c2a26]">{a}</span>
              <span className="font-semibold text-[#1c2a26]">{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-baseline justify-between rounded-xl bg-[#e3ebe4] px-4 py-3">
          <span className="text-[0.85rem] text-[#55625c]">Total</span>
          <span className={`${display} text-[1.4rem] text-[#1c2a26]`}>£215</span>
        </div>
        <p className="mt-4 text-[0.76rem] leading-relaxed text-[#55625c]">
          Nothing booked until you say so. Take it home, sleep on it, call us with questions.
        </p>
      </div>
    </div>
  );
}

function Photo({ src, alt, pos = "50% 50%" }: { src: string; alt: string; pos?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="bw-grade object-cover"
      style={{ objectPosition: pos }}
    />
  );
}

const steps: Step[] = [
  {
    when: "The day before",
    title: "A text, not a form",
    body: "A friendly message with a photo of who you’ll meet and where to park.",
    detail:
      "Mia on reception sends a short text the afternoon before: your dentist’s name and face, parking, and a reminder you can move the appointment by simply replying. Medical history is a two-minute online form you can fill in from the sofa.",
    visual: <TextMock />,
  },
  {
    when: "When you arrive",
    title: "Straight to a quiet room",
    body: "No packed waiting room. Tea, water, and a seat by the window.",
    detail:
      "We run on time, so you won’t sit listening to anything that whirrs. You’re shown into a calm treatment room with soft light and a chair that doesn’t look like a cockpit. If you’d like a minute first, take it.",
    visual: <Photo src="/web-design/demo/dental-practices/chair.webp" alt="A soft taupe dental chair in a calm, quiet room" pos="40% 50%" />,
  },
  {
    when: "First ten minutes",
    title: "We talk before anything else",
    body: "Sitting up, eye to eye. What’s worried you, what’s happened before.",
    detail:
      "Before the chair goes back we ask what you’d like us to know. Bad experience as a child? Strong gag reflex? Just hate the sound? We’ll write it on your notes so nobody asks you twice.",
    visual: <Photo src="/web-design/demo/dental-practices/consult.webp" alt="A dentist and nurse chatting with a relaxed, smiling patient" pos="55% 50%" />,
  },
  {
    when: "The check-up",
    title: "See what we see",
    body: "An intraoral camera shows your teeth on screen as we go.",
    detail:
      "Rather than mysterious numbers called across the room, you see the same images we do, explained as we look. X-rays only if they’re actually needed, and we’ll tell you why.",
    visual: <Photo src="/web-design/demo/dental-practices/screen.webp" alt="A patient reclines while the dentist shows images of her teeth on a screen" pos="35% 50%" />,
  },
  {
    when: "Before you leave",
    title: "A written plan, no pressure",
    body: "Every option, every price, in writing. Nothing starts on day one unless you want it to.",
    detail:
      "You leave with a plan you can actually read: what we found, the options, and the cost of each. Spread it with 0% finance if that helps. Then go home and think about it. We’ll never upsell in the chair.",
    visual: <PlanMock />,
  },
];

export function FirstVisit() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const step = steps[active];

  return (
    <section id="first-visit" aria-labelledby="visit-title" className="scroll-mt-20 bg-[#f6f1ea]">
      <div className={`${container} py-24 sm:py-28 lg:py-36`}>
        <Reveal className="max-w-3xl">
          <p className={eyebrow}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#a4553a]" aria-hidden="true" />
            Your first visit, step by step
          </p>
          <h2
            id="visit-title"
            className={`${display} mt-6 text-[clamp(2.3rem,5vw,4.1rem)] font-light leading-[1.04] tracking-[-0.03em] text-[#1c2a26]`}
          >
            No surprises. Here&rsquo;s{" "}
            <em className="text-[#2d5547] [font-variation-settings:'SOFT'_100,'WONK'_1]">exactly</em> what happens.
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-[1.7] text-[#55625c]">
            Not knowing is usually the worst part. So here is the whole of a
            Brightwell first visit, from the text the day before to the moment
            you walk out.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* step list */}
          <ol className="relative hidden lg:block" aria-label="First visit steps">
            <span aria-hidden="true" className="absolute bottom-6 left-[1.2rem] top-6 w-px bg-[#1c2a26]/12" />
            <span
              aria-hidden="true"
              className="absolute left-[1.2rem] top-6 w-px bg-[#2d5547] transition-[height] duration-700 ease-out"
              style={{ height: `calc(${(active / (steps.length - 1)) * 100}% - ${(active / (steps.length - 1)) * 3}rem)` }}
            />
            {steps.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <li key={s.title} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on ? "step" : undefined}
                    aria-controls="visit-panel"
                    className={`group flex w-full items-start gap-5 rounded-2xl py-3.5 pl-0 pr-3 text-left transition-colors ${focusRing}`}
                  >
                    <span
                      className={`relative z-10 flex h-[2.4rem] w-[2.4rem] shrink-0 items-center justify-center rounded-full text-[0.85rem] font-semibold transition-all duration-500 ${
                        on
                          ? "bg-[#2d5547] text-[#fffcf7] shadow-[0_0_0_6px_rgba(45,85,71,0.12)]"
                          : done
                            ? "bg-[#2d5547] text-[#fffcf7]"
                            : "bg-[#fffcf7] text-[#55625c] ring-1 ring-[#1c2a26]/12 group-hover:ring-[#2d5547]/40"
                      }`}
                    >
                      {done ? (
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3.5 8.5l3 3 6-7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className="pt-1">
                      <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#a4553a]">{s.when}</span>
                      <span className={`${display} mt-1 block text-[1.3rem] leading-snug transition-colors sm:text-[1.45rem] ${on ? "text-[#1c2a26]" : "text-[#1c2a26]/60 group-hover:text-[#1c2a26]"}`}>
                        {s.title}
                      </span>
                      <span className={`mt-1 block text-[0.93rem] leading-relaxed text-[#55625c] ${on ? "" : "hidden sm:block sm:opacity-70"}`}>{s.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* panel */}
          <div id="visit-panel" className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 flex items-center gap-2 lg:hidden" role="group" aria-label="First visit steps">
              {steps.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active ? "step" : undefined}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  className={`flex h-11 flex-1 items-center justify-center rounded-full text-[0.9rem] font-semibold transition-colors ${focusRing} ${
                    i === active
                      ? "bg-[#2d5547] text-[#fffcf7]"
                      : i < active
                        ? "bg-[#e3ebe4] text-[#2d5547]"
                        : "bg-[#fffcf7] text-[#55625c] ring-1 ring-[#1c2a26]/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#ece3d6] sm:aspect-[4/3]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  {step.visual}
                </motion.div>
              </AnimatePresence>
              <span className="absolute left-5 top-5 z-10 hidden rounded-full bg-[#fffcf7]/85 px-3 lg:block py-1.5 text-[0.72rem] font-semibold tracking-wide text-[#1c2a26] backdrop-blur">
                Step {active + 1} of {steps.length}
              </span>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div aria-live="polite">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#a4553a] lg:hidden">{step.when}</p>
                <p className={`${display} mt-1 text-[1.6rem] leading-snug text-[#1c2a26] lg:hidden`}>{step.title}</p>
                <p className="mt-3 max-w-lg text-[1rem] leading-[1.75] text-[#1c2a26]/85 lg:mt-0">{step.detail}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  aria-label="Previous step"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#1c2a26]/15 text-[#1c2a26] transition-colors hover:bg-[#fffcf7] disabled:opacity-35 ${focusRing}`}
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M13 8H3.5M7.5 4l-4 4 4 4" /></svg>
                </button>
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                  disabled={active === steps.length - 1}
                  aria-label="Next step"
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-[#2d5547] text-[#fffcf7] transition-colors hover:bg-[#22433a] disabled:opacity-35 ${focusRing}`}
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M3 8h9.5M8.5 4l4 4-4 4" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
