import Image from "next/image";
import { ArrowRight } from "./icons";
import { btnLine, btnPrimary, display, grade, kicker, mono, serif, wrap } from "./tokens";

const STATS = [
  { v: "11", u: " days", k: "Median brief to shortlist" },
  { v: "92", u: "%", k: "Of our offers accepted" },
  { v: "96", u: "%", k: "Still in post after a year" },
  { v: "1,400", u: "+", k: "Placements since 2014" },
];

const PLACED = [
  ["CTO", "Hatchwork", "38 days"],
  ["Head of Data", "Northlane Health", "29 days"],
  ["Staff Engineer, Payments", "Quillpay", "17 days"],
  ["VP Product", "Fieldnote", "44 days"],
  ["Principal Designer", "Oakhaven Bank", "21 days"],
  ["Director of Engineering", "Ferrous", "33 days"],
  ["Lead ML Engineer", "Brightwater Energy", "26 days"],
  ["Chief Product Officer", "Meridian Labs", "52 days"],
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className={`${wrap} pt-8 sm:pt-12 lg:pt-14`}>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-[#ddd6c8] pb-4">
          <p className={`${kicker} text-[#121317]`}>Executive &amp; technology search</p>
          <p className={`${kicker} text-[#575a62]`}>
            Shoreditch, London <span className="mx-2 text-[#ff5a3c]">/</span> Since 2014
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14">
          <div className="lg:col-span-7 lg:pr-4">
            <h1
              id="hero-title"
              className={`${display} text-[16.5vw] sm:text-[clamp(3.4rem,10.2vw,8.9rem)] font-extrabold leading-[0.86] tracking-[-0.055em] text-[#121317]`}
            >
              <span className="at-rise block" style={{ animationDelay: "0ms" }}>We send</span>
              <span className="at-rise block" style={{ animationDelay: "90ms" }}>three CVs.</span>
              <span
                className={`at-rise mt-2 block ${serif} text-[1.02em] italic leading-[0.95] tracking-[-0.03em] text-[#b8360d]`}
                style={{ animationDelay: "180ms" }}
              >
                Not thirty.
              </span>
            </h1>

            <p className="at-rise mt-8 max-w-[34rem] text-[1.12rem] leading-[1.6] text-[#3d4047] sm:text-[1.2rem]" style={{ animationDelay: "280ms" }}>
              Ascend is a small search firm for technology, product and data
              leadership. We approach two hundred people so you meet three, and
              we put a date on the shortlist before we take the brief.
            </p>

            <div className="at-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
              <a href="#hiring" className={btnPrimary}>
                I&rsquo;m hiring <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#looking" className={btnLine}>
                I&rsquo;m looking for a role
              </a>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="at-rise relative ml-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[2px] bg-[#ddd6c8]" style={{ animationDelay: "120ms" }}>
              <Image
                src="/web-design/demo/recruiters/hero.webp"
                alt="An Ascend consultant talking a hiring manager through a shortlist in the Shoreditch office"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={`object-cover object-[50%_30%] ${grade}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121317]/45 via-transparent to-transparent" aria-hidden="true" />
              <p className={`${mono} absolute right-4 top-4 rounded-full bg-[#f3efe7]/90 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-[#121317]`}>
                Shortlist review, Thu 10:30
              </p>
            </div>

            {/* Dossier card: a live search, told as numbers */}
            <div
              className="at-rise relative z-10 -mt-24 ml-4 mr-4 rounded-[4px] border border-[#121317]/10 bg-[#fbf9f4] p-5 shadow-[0_30px_60px_-30px_rgba(18,19,23,0.45)] sm:ml-10 sm:mr-auto sm:max-w-[360px] lg:absolute lg:-left-16 lg:bottom-10 lg:m-0"
              style={{ animationDelay: "420ms" }}
            >
              <div className="flex items-center justify-between">
                <p className={`${kicker} text-[#b8360d]`}>Live search</p>
                <p className={`${mono} text-[0.68rem] text-[#575a62]`}>AT-2291</p>
              </div>
              <p className={`${display} mt-3 text-[1.2rem] font-bold leading-tight tracking-[-0.02em] text-[#121317]`}>
                Head of Platform Engineering
              </p>
              <p className="mt-1 text-[0.85rem] text-[#575a62]">Series C fintech, £125k + equity, hybrid EC2</p>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#ddd6c8] pt-4">
                {[
                  ["212", "approached"],
                  ["14", "interviewed"],
                  ["3", "presented"],
                ].map(([n, l], i) => (
                  <div key={l}>
                    <p className={`${display} text-[1.5rem] font-extrabold tracking-[-0.03em] ${i === 2 ? "text-[#b8360d]" : "text-[#121317]"}`}>{n}</p>
                    <p className={`${mono} text-[0.6rem] uppercase tracking-[0.1em] text-[#575a62]`}>{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[0.72rem] text-[#575a62]">
                  <span>Day 9 of 14</span>
                  <span>Shortlist due Fri</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#121317]/10">
                  <div className="at-bar h-full w-[64%] rounded-full bg-[#ff5a3c]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 border-t border-[#121317] lg:mt-20 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.k}
              className={`flex flex-col-reverse gap-1 py-6 pr-4 ${i % 2 === 1 ? "pl-4 lg:pl-6" : "lg:pl-6"} ${i > 0 ? "lg:border-l lg:border-[#ddd6c8]" : "lg:pl-0"} ${i % 2 === 1 ? "border-l border-[#ddd6c8]" : ""} ${i > 1 ? "border-t border-[#ddd6c8] lg:border-t-0" : ""}`}
            >
              <dt className="text-[0.85rem] leading-snug text-[#575a62]">{s.k}</dt>
              <dd className={`${display} text-[clamp(2.2rem,4.4vw,3.6rem)] font-extrabold leading-none tracking-[-0.045em] text-[#121317]`}>
                {s.v}
                <span className={`text-[#b8360d] ${s.u.length > 2 ? "text-[0.5em] tracking-[-0.02em]" : ""}`}>{s.u}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Recently placed ticker */}
      <div className="mt-4 overflow-hidden bg-[#121317] py-4 text-white" role="region" aria-label="Recent placements">
        <div className="at-marquee flex w-max gap-0">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1 ? true : undefined}>
              {PLACED.map(([role, co, t]) => (
                <li key={role + dup} className="flex items-center gap-3 whitespace-nowrap px-6">
                  <span className="h-1.5 w-1.5 rounded-[1px] bg-[#ff5a3c]" aria-hidden="true" />
                  <span className={`${mono} text-[0.68rem] uppercase tracking-[0.14em] text-white/55`}>Placed</span>
                  <span className="text-[0.95rem] font-semibold">{role}</span>
                  <span className="text-[0.95rem] text-white/60">at {co}</span>
                  <span className={`${mono} text-[0.7rem] text-[#ff8a70]`}>{t}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
