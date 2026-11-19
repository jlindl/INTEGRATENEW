import Image from "next/image";
import { Arrow } from "./Arrow";
import { btnGhost, btnPrimary, label, mono, photo, serif, wrap } from "./ui";

const closeRows = [
  { task: "Bank feeds reconciled", detail: "412 txns", day: "D1" },
  { task: "Payroll and pensions", detail: "18 staff", day: "D3" },
  { task: "VAT return prepared", detail: "£21,406.18", day: "D4" },
  { task: "Management accounts", detail: "Issued", day: "D6" },
];

function Tick() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#1b4a3a]" aria-hidden="true" fill="none">
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      <path className="mc-tick" d="M4.8 8.3l2.1 2.1 4.3-4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Swiss column rules, barely there */}
      <div aria-hidden="true" className={`${wrap} pointer-events-none absolute inset-0 hidden lg:block`}>
        <div className="grid h-full grid-cols-12 gap-x-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-l border-[#13201b]/[0.045]" />
          ))}
        </div>
      </div>

      <div className={`${wrap} relative grid gap-y-14 pb-20 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-x-8 lg:pb-28 lg:pt-20`}>
        <div className="lg:col-span-7 lg:pr-6">
          <p className={`${label} mc-fade flex flex-wrap items-center gap-x-3 gap-y-1 text-[#4f5a54]`}>
            <span className="inline-block h-px w-8 bg-[#a7834b]" aria-hidden="true" />
            Chartered accountants
            <span aria-hidden="true">/</span>
            Clerkenwell, London
          </p>

          <h1
            id="hero-title"
            className={`${serif} mt-8 text-[clamp(3.1rem,8.2vw,7.6rem)] font-[350] leading-[0.94] tracking-[-0.025em] text-[#13201b]`}
          >
            <span className="mc-line block" style={{ ["--d" as string]: "0ms" }}>Accounts kept</span>
            <span className="mc-line block" style={{ ["--d" as string]: "90ms" }}>
              with <em className="font-[300] italic text-[#1b4a3a]">quiet</em>
            </span>
            <span className="mc-line block" style={{ ["--d" as string]: "180ms" }}>precision.</span>
          </h1>

          <div className="mc-fade mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-14" style={{ ["--d" as string]: "320ms" }}>
            <p className="max-w-[34rem] text-[1.08rem] leading-[1.65] text-[#4f5a54] sm:text-[1.15rem]">
              We look after the books, tax and payroll of founder-led companies
              from £250k to £25m turnover. One fixed monthly fee, agreed up
              front, and a named partner who picks up the phone.
            </p>
          </div>

          <div className="mc-fade mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "420ms" }}>
            <a href="#contact" className={btnPrimary}>
              Book a 30 minute call
              <Arrow />
            </a>
            <a href="#fees" className={btnGhost}>
              Price your fee
            </a>
          </div>

          <dl className="mc-fade mt-14 grid max-w-[34rem] grid-cols-3 border-t border-[#d6cfbf] pt-5" style={{ ["--d" as string]: "520ms" }}>
            {[
              ["Est.", "2011"],
              ["Clients", "300+"],
              ["Partners", "Four"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className={`${label} text-[#4f5a54]`}>{k}</dt>
                <dd className={`${serif} mt-1.5 text-[1.5rem] leading-none text-[#13201b]`}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-5">
          <figure className="mc-curtain relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#d6cfbf] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/web-design/demo/accountants/hero-advisor.webp"
              alt="Helen Achterberg, senior partner, reviewing a client's year-end file at the Meridian studio"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={`${photo} object-cover object-[64%_50%]`}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0f2b22]/35 via-transparent to-transparent" />
            <figcaption className={`${label} absolute right-4 top-4 rounded-full bg-[#f3f0e8]/90 px-3 py-1.5 text-[0.62rem] text-[#13201b] backdrop-blur`}>
              Helen Achterberg, Senior Partner
            </figcaption>
          </figure>

          {/* The close, ticked off row by row */}
          <div
            className="mc-card relative z-10 -mt-24 ml-4 mr-4 rounded-[3px] border border-[#d6cfbf] bg-[#fbfaf6] p-5 shadow-[0_40px_80px_-40px_rgba(15,43,34,0.45)] sm:ml-auto sm:mr-6 sm:max-w-[360px] lg:absolute lg:-left-20 lg:bottom-10 lg:mx-0 lg:mt-0 lg:w-[340px]"
            role="group"
            aria-label="Example month-end close for a client, completed on working day six"
          >
            <div className="flex items-baseline justify-between border-b border-[#d6cfbf] pb-3">
              <p className={`${serif} text-[1.05rem] text-[#13201b]`}>Northlight Studio Ltd</p>
              <p className={`${label} text-[0.6rem] text-[#4f5a54]`}>March close</p>
            </div>
            <ul className="divide-y divide-dashed divide-[#d6cfbf]">
              {closeRows.map((r, i) => (
                <li
                  key={r.task}
                  className="mc-row grid grid-cols-[auto_1fr_auto] items-center gap-3 py-2.5 text-[0.84rem]"
                  style={{ ["--i" as string]: i }}
                >
                  <Tick />
                  <span className="text-[#13201b]">{r.task}</span>
                  <span className={`${mono} text-[0.74rem] tabular-nums text-[#4f5a54]`}>{r.detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between border-t border-[#13201b] pt-3">
              <span className={`${label} text-[0.6rem] text-[#4f5a54]`}>Closed on</span>
              <span className={`${mono} text-[0.8rem] text-[#1b4a3a]`}>Working day 6</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
