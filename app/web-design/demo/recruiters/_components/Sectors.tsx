"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";
import { display, focusRing, grade, kicker, mono, serif, wrap } from "./tokens";

const SECTORS = [
  {
    name: "Engineering & Platform",
    note: "Backend, infrastructure, SRE and engineering leadership up to VP.",
    placed: "540",
    median: "£118k",
    img: "/web-design/demo/recruiters/sector-engineering.webp",
    alt: "An engineering lead reviewing work with two colleagues at a laptop",
    pos: "object-[50%_40%]",
  },
  {
    name: "Product & Design",
    note: "Product managers, product leaders, and staff level designers who ship.",
    placed: "310",
    median: "£104k",
    img: "/web-design/demo/recruiters/sector-product.webp",
    alt: "A product designer concentrating at his desk",
    pos: "object-[40%_40%]",
  },
  {
    name: "Data & AI",
    note: "Data platform, analytics leadership, applied ML and AI product.",
    placed: "260",
    median: "£122k",
    img: "/web-design/demo/recruiters/sector-data.webp",
    alt: "A data engineer working late at a dual monitor setup",
    pos: "object-[50%_50%]",
  },
  {
    name: "Fintech & Payments",
    note: "Regulated engineering, risk and payments people who can talk to the FCA.",
    placed: "190",
    median: "£126k",
    img: "/web-design/demo/recruiters/sector-fintech.webp",
    alt: "The Shard rising above a narrow street near London Bridge",
    pos: "object-[50%_30%]",
  },
  {
    name: "Executive & Board",
    note: "CTO, CPO and non executive appointments. Retained search only.",
    placed: "110",
    median: "£185k",
    img: "/web-design/demo/recruiters/sector-leadership.webp",
    alt: "A candidate for a chief technology officer role in a final interview",
    pos: "object-[60%_40%]",
  },
];

export function Sectors() {
  const [active, setActive] = useState(0);

  return (
    <section id="sectors" aria-labelledby="sectors-title" className="scroll-mt-16 py-20 sm:py-28 lg:py-32">
      <div className={wrap}>
        <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <p className={`${kicker} text-[#b8360d] lg:col-span-3`}>Five desks, no generalists</p>
          <h2
            id="sectors-title"
            className={`${display} text-[clamp(2.3rem,5.4vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-[#121317] lg:col-span-9`}
          >
            We only recruit for jobs we{" "}
            <span className={`${serif} italic tracking-[-0.02em]`}>could interview for.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <ul className="border-t border-[#121317] lg:col-span-7">
            {SECTORS.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.name} className="border-b border-[#ddd6c8]">
                  <a
                    href="#roles"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group grid grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-2 rounded-sm py-6 sm:gap-x-6 sm:py-7 ${focusRing}`}
                  >
                    <span className={`${mono} pt-2 text-[0.72rem] text-[#575a62]`}>0{i + 1}</span>
                    <span className="min-w-0">
                      <span
                        className={`${display} block text-[clamp(1.6rem,3.3vw,2.75rem)] font-extrabold leading-[1] tracking-[-0.04em] transition-colors duration-300 ${
                          on ? "text-[#121317]" : "text-[#121317] lg:text-[#121317]/45"
                        } group-hover:text-[#121317]`}
                      >
                        {s.name}
                      </span>
                      <span className="mt-2 block max-w-[30rem] text-[0.95rem] leading-relaxed text-[#575a62]">{s.note}</span>
                      <span className={`${mono} mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.7rem] uppercase tracking-[0.12em] text-[#575a62]`}>
                        <span>
                          <span className="text-[#121317]">{s.placed}</span> placed
                        </span>
                        <span>
                          Median base <span className="text-[#121317]">{s.median}</span>
                        </span>
                      </span>
                    </span>
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[2px] sm:h-20 sm:w-20 lg:hidden">
                      <Image src={s.img} alt="" fill sizes="80px" className={`object-cover ${s.pos} ${grade}`} />
                    </span>
                    <span
                      className={`mt-2 hidden h-10 w-10 place-items-center rounded-full border transition-colors duration-300 lg:grid ${
                        on ? "border-[#ff5a3c] bg-[#ff5a3c] text-[#121317]" : "border-[#121317]/20 text-[#121317]"
                      }`}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#ddd6c8]">
                {SECTORS.map((s, i) => (
                  <Image
                    key={s.img}
                    src={s.img}
                    alt={i === active ? s.alt : ""}
                    aria-hidden={i === active ? undefined : true}
                    fill
                    sizes="40vw"
                    className={`object-cover ${s.pos} ${grade} transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121317]/80 to-transparent p-6 pt-20 text-white">
                  <p className={`${mono} text-[0.66rem] uppercase tracking-[0.14em] text-white/70`}>
                    Desk 0{active + 1}
                  </p>
                  <p className={`${display} mt-1 text-[1.5rem] font-bold tracking-[-0.03em]`}>
                    {SECTORS[active].name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
