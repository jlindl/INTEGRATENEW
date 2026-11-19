import Image from "next/image";
import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";
import { focusRing, label, mono, photo, serif, wrap } from "./ui";

const notes = [
  {
    date: "4 Nov 2026",
    read: "7 min",
    topic: "Tax planning",
    t: "Salary or dividends in 2026/27: the split, worked through for three real directors",
  },
  {
    date: "21 Oct 2026",
    read: "5 min",
    topic: "Making Tax Digital",
    t: "MTD for income tax, six months in. What we’re seeing, and what to fix before April",
  },
  {
    date: "2 Oct 2026",
    read: "9 min",
    topic: "R&D relief",
    t: "Who still qualifies under the merged scheme, and the three claims we turned down",
  },
];

export function Insights() {
  return (
    <section id="insights" aria-labelledby="insights-title" className="scroll-mt-20 border-t border-[#d6cfbf]">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <Reveal>
            <p className={`${label} text-[#4f5a54]`}>
              <span className="text-[#a7834b]">07</span> &nbsp;Notes from the firm
            </p>
            <h2
              id="insights-title"
              className={`${serif} mt-8 text-[clamp(2.4rem,5vw,4.4rem)] font-[350] leading-[1] tracking-[-0.02em] text-[#13201b]`}
            >
              Written by partners, <em className="italic text-[#1b4a3a]">not marketers.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <a href="#insights" className={`group inline-flex items-center gap-2 rounded-sm border-b border-[#13201b] pb-1 text-[0.95rem] text-[#13201b] ${focusRing}`}>
              All notes, monthly by email
              <Arrow />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <a href="#insights" className={`group block rounded-[2px] ${focusRing}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[#d6cfbf]">
                <Image
                  src="/web-design/demo/accountants/founder-ceramics.webp"
                  alt="A potter's hands shaping a vase on the wheel"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={`${photo} object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]`}
                />
              </div>
              <p className={`${mono} mt-6 text-[0.72rem] uppercase tracking-[0.12em] text-[#4f5a54]`}>
                Guide &nbsp;/&nbsp; 12 min
              </p>
              <h3 className={`${serif} mt-3 text-[1.9rem] leading-[1.12] text-[#13201b] decoration-[#a7834b] decoration-1 underline-offset-[6px] group-hover:underline`}>
                The founder&rsquo;s year-end: a calm checklist for the six weeks before your accounting date
              </h3>
            </a>
          </Reveal>

          <ul className="border-t border-[#13201b] lg:col-span-7 lg:col-start-6 lg:pl-8">
            {notes.map((n, i) => (
              <Reveal as="li" key={n.t} delay={i * 90} className="border-b border-[#d6cfbf]">
                <a href="#insights" className={`group grid gap-3 rounded-sm py-8 sm:grid-cols-[9rem_1fr_auto] sm:gap-8 ${focusRing}`}>
                  <span className={`${mono} text-[0.72rem] uppercase leading-[1.8] tracking-[0.12em] text-[#4f5a54]`}>
                    {n.date}
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> &nbsp;/&nbsp; </span>
                    {n.topic}
                  </span>
                  <span className={`${serif} text-[1.4rem] leading-[1.25] text-[#13201b] decoration-[#a7834b] decoration-1 underline-offset-[5px] group-hover:underline`}>
                    {n.t}
                  </span>
                  <span className={`${mono} text-[0.72rem] text-[#4f5a54] sm:pt-2`}>{n.read}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
