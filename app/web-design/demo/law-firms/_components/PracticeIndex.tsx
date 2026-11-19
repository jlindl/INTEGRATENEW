"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { IMG, focusRing, label, mono, serif, wrap } from "./tokens";

type Area = {
  name: string;
  note: string;
  desc: string;
  img: string;
  alt: string;
  pos?: string;
};

const groups: { title: string; intro: string; areas: Area[] }[] = [
  {
    title: "Commercial",
    intro: "For companies, founders and boards",
    areas: [
      {
        name: "Corporate & M&A",
        note: "Sales, acquisitions, investment",
        desc: "Company sales and acquisitions from £2m to £150m, management buyouts, minority investment and the shareholder agreements that decide who controls what when the founders disagree.",
        img: "boardroom.webp",
        alt: "An empty boardroom with leather chairs around a long polished table",
      },
      {
        name: "Disputes & Litigation",
        note: "Contract, shareholder, professional",
        desc: "Shareholder fallouts, contract claims and professional negligence. We tell you early what a fight will cost and how likely it is to succeed, then settle it or see it through to trial.",
        img: "granite.webp",
        alt: "A figure walking out from between heavy granite columns into daylight",
      },
      {
        name: "Commercial Property",
        note: "Leases, development, finance",
        desc: "Acquisitions, development agreements, investment portfolios and the landlord and tenant work that follows. Clear reports on title, so you know what you are buying before you exchange.",
        img: "at-work.webp",
        alt: "A solicitor reviewing architectural plans at a desk in a bright office",
        pos: "30% 50%",
      },
      {
        name: "Employment",
        note: "For employers and senior executives",
        desc: "Service agreements, restrictive covenants, senior exits and tribunal defence. We advise boards and the executives across the table from them, never on the same matter.",
        img: "city-walk.webp",
        alt: "A man with a briefcase walking between two angular sculptures outside a City office building",
      },
    ],
  },
  {
    title: "Private Client",
    intro: "For individuals, families and estates",
    areas: [
      {
        name: "Wills & Estate Planning",
        note: "Wills, LPAs, succession",
        desc: "Wills that reflect how families actually live now: second marriages, business interests, property abroad. Lasting powers of attorney put in place before anyone needs them.",
        img: "guildford-door.webp",
        alt: "The black front door of a white Georgian townhouse with iron railings and window boxes",
      },
      {
        name: "Trusts & Tax",
        note: "Family trusts, IHT, gifting",
        desc: "Family trusts, inheritance tax planning and lifetime gifting, coordinated with your accountant so the legal structure and the tax position are designed together, not reconciled afterwards.",
        img: "manor.webp",
        alt: "A Cotswold stone manor house with tall chimneys behind clipped yew hedges",
      },
      {
        name: "Probate & Estates",
        note: "Administration, disputes",
        desc: "Estate administration handled with patience and a fixed fee for the grant. Where a will is challenged, our contentious probate team acts for executors and beneficiaries alike.",
        img: "library.webp",
        alt: "Rows of antique leather-bound books on dark wooden library shelves",
      },
      {
        name: "Family & Divorce",
        note: "Finances, children, pre-nups",
        desc: "Separation, financial settlements and arrangements for children, with mediation first where it is safe. Pre-nuptial agreements for clients who would rather decide things calmly in advance.",
        img: "path.webp",
        alt: "Low sunlight breaking through mist along a fenced, tree-lined path",
      },
    ],
  },
];

const all = groups.flatMap((g) => g.areas);

/**
 * The practice index. On wide screens, hovering or focusing an area
 * crossfades the framed photograph and its description; the list itself
 * stays a plain, readable index. On small screens each description sits
 * under its heading instead.
 */
export function PracticeIndex() {
  const [active, setActive] = useState(0);
  const current = all[active];

  let n = 0;

  return (
    <section
      id="practice"
      aria-labelledby="practice-title"
      className="scroll-mt-16 bg-[#e7e0d3] text-[#17130f]"
    >
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={`${label} text-[#74272a]`}>§ 02 · Practice</p>
            <h2
              id="practice-title"
              className={`${serif} mt-6 text-[clamp(2.6rem,5.4vw,4.75rem)] leading-[1] tracking-[-0.02em]`}
            >
              Eight practices. <em className="italic">One standard</em> of attention.
            </h2>
          </div>
          <p className="max-w-md text-[1rem] leading-[1.75] text-[#5b5348] lg:col-span-4 lg:col-start-9 lg:self-end">
            Half our work is commercial, half is private client, and a good
            share of clients use both. The partner who sold your company is
            two doors down from the one who will write your will.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Preview panel, wide screens only */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#17130f]">
                {all.map((a, i) => (
                  <Image
                    key={a.name}
                    src={`${IMG}/${a.img}`}
                    alt={i === active ? a.alt : ""}
                    aria-hidden={i === active ? undefined : true}
                    fill
                    sizes="40vw"
                    className={`hl-grade object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                    }`}
                    style={{ objectPosition: a.pos ?? "50% 50%" }}
                  />
                ))}
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(15,13,11,0.85)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-[#f3efe7]">
                  <p className={`${mono} text-[0.64rem] uppercase tracking-[0.18em] text-[#d9c3a0]`}>
                    {String(active + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}
                  </p>
                  <p className={`${serif} mt-3 text-[2rem] leading-[1.05]`}>{current.name}</p>
                  <p className="mt-3 text-[0.92rem] leading-[1.65] text-[#f3efe7]/80">{current.desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Index */}
          <div className="lg:col-span-7">
            {groups.map((g) => (
              <div key={g.title} className="mb-16 last:mb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[#17130f] pb-4">
                  <h3 className={`${serif} text-[1.6rem] italic`}>{g.title}</h3>
                  <span className={`${mono} text-[0.64rem] uppercase tracking-[0.16em] text-[#5b5348]`}>{g.intro}</span>
                </div>
                <ul>
                  {g.areas.map((a) => {
                    const idx = n++;
                    const on = idx === active;
                    return (
                      <li key={a.name} className="border-b border-[#17130f]/15">
                        <a
                          href="#contact"
                          onMouseEnter={() => setActive(idx)}
                          onFocus={() => setActive(idx)}
                          className={`group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 py-6 sm:grid-cols-[3.5rem_1fr_auto] lg:py-7 ${focusRing}`}
                        >
                          <span className={`${mono} text-[0.7rem] text-[#5b5348]`}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`${serif} text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.01em] transition-[color,transform] duration-500 ${
                              on ? "lg:translate-x-3 lg:text-[#74272a]" : ""
                            } group-hover:text-[#74272a]`}
                          >
                            {a.name}
                          </span>
                          <span className="col-start-2 mt-2 text-[0.84rem] text-[#5b5348] sm:col-start-3 sm:row-start-1 sm:mt-0 sm:text-right">
                            {a.note}
                          </span>
                          <span className="col-start-2 mt-3 max-w-xl text-[0.94rem] leading-[1.7] text-[#5b5348] lg:hidden sm:col-span-2">
                            {a.desc}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
