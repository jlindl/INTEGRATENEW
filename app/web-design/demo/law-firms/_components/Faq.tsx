"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display, focusRing } from "./ui";

const faqs = [
  {
    q: "How are your fees worked out?",
    a: "We agree a fixed fee or a clear estimate in writing before any work begins. If the matter changes, we tell you and re-agree the fee before we carry on — you will never open a surprise invoice.",
  },
  {
    q: "Will I deal with the same solicitor throughout?",
    a: "Yes. A named solicitor owns your matter from the first meeting to completion. You will have their direct line and email, and they will know your file when you call.",
  },
  {
    q: "How quickly can I be seen?",
    a: "We offer an initial consultation within a few working days, and urgent matters sooner. Evening and video appointments are available if the working day doesn't suit.",
  },
  {
    q: "Do you act for both businesses and individuals?",
    a: "We do. Roughly half our work is commercial — companies, property and disputes — and half is private client, from wills and probate to family matters. Many clients come to us for both.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-label="Common questions"
      className="scroll-mt-24 border-y border-[#e4ddd0] bg-white"
    >
      <div
        className={`${container} grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28`}
      >
        <Reveal>
          <SectionHeading
            eyebrow="Common questions"
            title="The things clients ask first."
            sub="Can't see your question? A short call will usually answer it."
          />
        </Reveal>

        <Reveal delay={80}>
          <ul className="divide-y divide-[#e4ddd0] border-y border-[#e4ddd0]">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between gap-6 py-5 text-left ${focusRing}`}
                  >
                    <span
                      className={`${display} text-lg font-medium tracking-tight text-[#1a1712]`}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e4ddd0] text-[#7c2d2d] transition-transform duration-300 ${isOpen ? "rotate-45 bg-[#7c2d2d] text-white" : ""}`}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      >
                        <path d="M8 3v10 M3 8h10" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 text-[0.95rem] leading-relaxed text-[#5a544a]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
