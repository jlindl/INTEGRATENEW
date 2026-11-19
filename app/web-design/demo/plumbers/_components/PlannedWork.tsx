import Image from "next/image";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";
import { btnInk, display, focusRing, h2, kicker, mono, wrap } from "./theme";

const STEPS = [
  { n: "01", t: "Free survey", d: "45 minutes at a time that suits you. We measure, photograph and listen." },
  { n: "02", t: "Fixed quote in 48 hours", d: "Itemised, in writing, with the start and finish dates on it." },
  { n: "03", t: "We keep the dates", d: "A daily photo update if you are at work. One named lead on site throughout." },
];

export function PlannedWork() {
  return (
    <section aria-labelledby="planned-title" className="overflow-hidden bg-white py-20 sm:py-28">
      <div className={`${wrap} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
        {/* Collage */}
        <div className="relative self-start lg:col-span-6">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] sm:aspect-[5/5] lg:aspect-[4/5]">
              <Image
                src="/web-design/demo/plumbers/bathroom-tiling.webp"
                alt="A Northline fitter in gloves setting a large white wall tile in a bathroom being refitted"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[35%_50%]"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="absolute -bottom-10 right-3 w-[min(340px,calc(100%-1.5rem))] sm:right-6 lg:-right-8">
            <figure className="rounded-[24px] bg-[#0b1a28] p-5 text-white shadow-[0_30px_60px_-30px_rgba(11,26,40,0.7)] sm:p-6">
              <figcaption className={`${mono} text-[0.75rem] uppercase tracking-[0.14em] text-[#1ed3b0]`}>
                Recent job, Headingley LS6
              </figcaption>
              <p className={`${display} mt-2 text-[1.2rem] font-bold leading-tight sm:text-[1.35rem]`}>Family bathroom refit</p>
              <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-[#22405a] pt-4">
                {[
                  ["11", "working days"],
                  ["£8,940", "fixed price"],
                  ["£0", "extras"],
                ].map(([v, k]) => (
                  <div key={k}>
                    <dt className="sr-only">{k}</dt>
                    <dd className={`${display} text-[1.15rem] font-extrabold tracking-[-0.02em] sm:text-[1.3rem]`}>{v}</dd>
                    <dd className="mt-0.5 text-[0.72rem] leading-tight text-[#b9c8d3]">{k}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="pt-6 lg:col-span-6 lg:pt-10">
          <p className={kicker}>Planned work</p>
          <h2 id="planned-title" className={`${h2} mt-5 text-[#0b1a28]`}>
            For the jobs you have been putting off.
          </h2>
          <p className="mt-6 max-w-lg text-[1.08rem] leading-relaxed text-[#33475a]">
            New bathrooms, boiler swaps and full heating systems. Judge us the way you should judge any trade: did they
            turn up when they said, and did they leave the place cleaner than they found it?
          </p>

          <ol className="mt-10 border-t border-[#d8e1e3]">
            {STEPS.map((st, i) => (
              <li key={st.n}>
                <Reveal delay={i * 80} className="grid grid-cols-[56px_1fr] gap-4 border-b border-[#d8e1e3] py-6 sm:grid-cols-[80px_1fr]">
                  <span className={`${mono} pt-1 text-[0.9rem] text-[#0a7a66]`}>{st.n}</span>
                  <div>
                    <h3 className={`${display} text-[1.3rem] font-bold tracking-[-0.02em] text-[#0b1a28]`}>{st.t}</h3>
                    <p className="mt-1.5 leading-relaxed text-[#4b5d6b]">{st.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-6 rounded-[24px] bg-[#f3f6f5] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className={`${display} text-[1.15rem] font-bold text-[#0b1a28]`}>Boiler on its last legs?</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-[#4b5d6b]">
                New combi from £2,195, fitted in a day, with a 10-year warranty.
              </p>
            </div>
            <a href="#book" className={`${btnInk} ${focusRing} shrink-0`}>
              Book a free survey <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
