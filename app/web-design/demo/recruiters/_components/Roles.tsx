"use client";

import { useState } from "react";
import { ArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";
import { btnLine, display, focusRing, kicker, mono, serif, wrap } from "./tokens";

type Desk = "Engineering" | "Product" | "Data & AI" | "Fintech" | "Executive";

const ROLES: {
  ref: string;
  title: string;
  co: string;
  where: string;
  pay: string;
  desk: Desk;
  stage: 0 | 1 | 2 | 3;
  fresh?: boolean;
}[] = [
  { ref: "AT-2291", title: "Head of Platform Engineering", co: "Series C fintech, 280 people", where: "Hybrid, EC2", pay: "£120k to £130k", desk: "Engineering", stage: 2 },
  { ref: "AT-2304", title: "Staff Product Designer", co: "B2B SaaS, design systems lead", where: "Remote, UK", pay: "£95k to £110k", desk: "Product", stage: 0, fresh: true },
  { ref: "AT-2287", title: "VP Data & AI", co: "PE backed healthtech", where: "Hybrid, Manchester", pay: "£145k to £165k", desk: "Data & AI", stage: 3 },
  { ref: "AT-2299", title: "Engineering Manager, Payments", co: "Global marketplace", where: "Hybrid, King's Cross", pay: "£110k to £120k", desk: "Fintech", stage: 1 },
  { ref: "AT-2310", title: "Chief Technology Officer", co: "Confidential, Series B climate tech", where: "London, 3 days", pay: "£180k + equity", desk: "Executive", stage: 0, fresh: true },
  { ref: "AT-2276", title: "Senior Product Manager, Growth", co: "Consumer subscription app", where: "Hybrid, Shoreditch", pay: "£90k to £100k", desk: "Product", stage: 2 },
  { ref: "AT-2302", title: "Principal ML Engineer", co: "Insurtech scale up", where: "Remote, UK", pay: "£130k to £145k", desk: "Data & AI", stage: 1 },
  { ref: "AT-2295", title: "Lead SRE", co: "Challenger bank", where: "Hybrid, Leeds", pay: "£100k to £115k", desk: "Engineering", stage: 1 },
];

const STAGES = ["Approaching", "Interviewing", "Shortlisting", "Final stage"];
const FILTERS: ("All" | Desk)[] = ["All", "Engineering", "Product", "Data & AI", "Fintech", "Executive"];

export function Roles() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = ROLES.filter((r) => filter === "All" || r.desk === filter);

  return (
    <section id="roles" aria-labelledby="roles-title" className="scroll-mt-16 py-20 sm:py-28 lg:py-32">
      <div className={wrap}>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={`${kicker} flex items-center gap-2.5 text-[#b8360d]`}>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a3c] opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a3c]" />
              </span>
              The board, updated 09:40 today
            </p>
            <h2
              id="roles-title"
              className={`${display} mt-5 text-[clamp(2.3rem,5.4vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-[#121317]`}
            >
              23 open searches. <span className={`${serif} italic tracking-[-0.02em]`}>Eight you can see.</span>
            </h2>
          </div>
          <p className="max-w-[24rem] text-[1rem] leading-relaxed text-[#575a62]">
            Most of our work is confidential and never advertised. If nothing
            here fits, register anyway: that is how most placements start.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filter roles by desk">
          {FILTERS.map((f) => {
            const on = f === filter;
            const n = f === "All" ? ROLES.length : ROLES.filter((r) => r.desk === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-colors duration-200 ${focusRing} ${
                  on
                    ? "border-[#121317] bg-[#121317] text-white"
                    : "border-[#121317]/20 text-[#121317] hover:border-[#121317]"
                }`}
              >
                {f} <span className={`${mono} ml-1 text-[0.7rem] ${on ? "text-white/60" : "text-[#575a62]"}`}>{n}</span>
              </button>
            );
          })}
        </div>

        <div className={`${mono} mt-8 hidden grid-cols-[120px_1.6fr_1fr_1fr_170px_40px] gap-6 border-b border-[#121317] pb-3 text-[0.66rem] uppercase tracking-[0.14em] text-[#575a62] lg:grid`}>
          <span>Ref</span>
          <span>Role</span>
          <span>Where</span>
          <span>Base</span>
          <span>Stage</span>
          <span />
        </div>

        <ul className="mt-4 border-t border-[#121317] lg:mt-0 lg:border-t-0" aria-live="polite">
          {shown.map((r) => (
            <li key={r.ref} className="border-b border-[#ddd6c8]">
              <a
                href="#contact"
                className={`group relative isolate grid grid-cols-1 gap-3 rounded-sm py-6 transition-colors duration-300 lg:grid-cols-[120px_1.6fr_1fr_1fr_170px_40px] lg:items-center lg:gap-6 lg:py-5 ${focusRing}`}
              >
                <span
                  className="pointer-events-none absolute inset-y-0 -left-4 -right-4 -z-10 origin-left scale-x-0 bg-[#fbf9f4] transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none lg:-left-6 lg:-right-6"
                  aria-hidden="true"
                />
                <span className={`${mono} flex items-center gap-2 whitespace-nowrap text-[0.72rem] text-[#575a62]`}>
                  {r.ref}
                  {r.fresh ? (
                    <span className="rounded-full bg-[#ff5a3c] px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.08em] text-[#121317]">
                      New
                    </span>
                  ) : null}
                </span>
                <span className="min-w-0">
                  <span className={`${display} block text-[1.3rem] font-bold leading-tight tracking-[-0.025em] text-[#121317] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none`}>
                    {r.title}
                  </span>
                  <span className="mt-1 block text-[0.9rem] text-[#575a62]">{r.co}</span>
                </span>
                <span className="text-[0.92rem] text-[#3d4047]">{r.where}</span>
                <span className={`${mono} text-[0.85rem] text-[#121317]`}>{r.pay}</span>
                <span>
                  <span className="flex gap-1" aria-hidden="true">
                    {STAGES.map((_, i) => (
                      <span key={i} className={`h-1 flex-1 rounded-full ${i <= r.stage ? "bg-[#ff5a3c]" : "bg-[#121317]/12"}`} />
                    ))}
                  </span>
                  <span className={`${mono} mt-2 block text-[0.66rem] uppercase tracking-[0.12em] text-[#575a62]`}>
                    {STAGES[r.stage]}
                  </span>
                </span>
                <span
                  className="hidden h-10 w-10 place-items-center rounded-full border border-[#121317]/20 text-[#121317] transition-colors duration-300 group-hover:border-[#ff5a3c] group-hover:bg-[#ff5a3c] lg:grid"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a href="#contact" className={btnLine}>
            Register for confidential roles
          </a>
          <p className={`${mono} text-[0.72rem] text-[#575a62]`}>15 more searches are running under NDA.</p>
        </div>
      </div>
    </section>
  );
}
