import { ArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";
import {
  container,
  displayFont,
  focusRing,
  monoKicker,
  monoStack,
} from "./tokens";

const SECTORS = [
  {
    n: "01",
    name: "Engineering & Platform",
    note: "Backend, infra, SRE and engineering leadership up to VP",
    placements: "540+ placements",
  },
  {
    n: "02",
    name: "Product & Design",
    note: "PMs, product leaders, staff-level designers and heads of design",
    placements: "310+ placements",
  },
  {
    n: "03",
    name: "Data, AI & Machine Learning",
    note: "Data platform, analytics leadership, applied ML and AI product",
    placements: "260+ placements",
  },
  {
    n: "04",
    name: "Commercial & Go-to-market",
    note: "Sales, marketing and partnerships leadership for scale-ups",
    placements: "190+ placements",
  },
  {
    n: "05",
    name: "Executive & Board",
    note: "C-suite, NED and first senior hires for funded founders",
    placements: "120+ searches",
  },
];

export function Sectors() {
  return (
    <section id="sectors" className="scroll-mt-24 py-16 sm:py-24">
      <div className={container}>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${monoKicker} text-[#c43a10]`}>Where we search</p>
              <h2
                className={`${displayFont} mt-4 text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06] tracking-tight text-[#16181d]`}
              >
                Deep in five markets. Dabbling in none.
              </h2>
            </div>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-[#5c5f68]">
              Every consultant recruits one market only, so they know the
              people worth calling before your brief lands.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 lg:mt-12">
          <ul className="border-t border-[#e7e2d8]">
            {SECTORS.map((sector) => (
              <li key={sector.n} className="border-b border-[#e7e2d8]">
                <a
                  href="#contact"
                  className={`group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 rounded-sm py-5 transition-colors duration-200 sm:grid-cols-[3rem_1fr_auto_auto] sm:gap-x-8 sm:py-6 ${focusRing}`}
                >
                  <span
                    className={`${monoStack} text-[0.7rem] text-[#c43a10]`}
                  >
                    {sector.n}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`${displayFont} block text-xl font-bold tracking-tight text-[#16181d] transition-transform duration-300 group-hover:translate-x-1.5 sm:text-2xl`}
                    >
                      {sector.name}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#5c5f68]">
                      {sector.note}
                    </span>
                  </span>
                  <span
                    className={`${monoStack} hidden self-center text-[0.68rem] uppercase tracking-[0.14em] text-[#5c5f68] sm:block`}
                  >
                    {sector.placements}
                  </span>
                  <span
                    className="grid h-9 w-9 place-items-center self-center rounded-full border border-[#16181d]/15 text-[#16181d] transition-colors duration-200 group-hover:border-[#ff5a3c] group-hover:bg-[#ff5a3c]"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
