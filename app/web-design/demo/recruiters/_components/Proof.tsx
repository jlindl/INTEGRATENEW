import { Reveal } from "./Reveal";
import { display, kicker, mono, serif, wrap } from "./tokens";

/* Typographic wordmarks for fictional clients: each set differently, all in ink. */
const CLIENTS: { name: string; cls: string }[] = [
  { name: "hatchwork", cls: `${display} text-[1.7rem] font-extrabold tracking-[-0.06em]` },
  { name: "NORTHLANE", cls: `${mono} text-[1.05rem] font-medium tracking-[0.32em]` },
  { name: "Quillpay", cls: `${serif} text-[2rem] italic tracking-[-0.02em]` },
  { name: "FERROUS", cls: `${display} text-[1.55rem] font-black tracking-[0.04em] [transform:scaleY(1.15)]` },
  { name: "oakhaven.", cls: `${display} text-[1.6rem] font-semibold tracking-[-0.04em]` },
  { name: "Meridian Labs", cls: `${serif} text-[1.7rem] tracking-[-0.01em]` },
  { name: "fieldnote/", cls: `${mono} text-[1.15rem] font-medium tracking-[-0.02em]` },
  { name: "Brightwater", cls: `${display} text-[1.45rem] font-light tracking-[0.02em]` },
];

const QUOTES = [
  {
    q: "They told me the company, the salary and the catch on the very first call. Three years later I'm still here.",
    who: "Daniel Okafor",
    role: "Director of Engineering, placed 2022",
  },
  {
    q: "The list of people they ruled out, and why, was almost as useful as the shortlist.",
    who: "Sam Whitlock",
    role: "CTO, Quillpay, four searches",
  },
];

export function Proof() {
  return (
    <section aria-labelledby="proof-title" className="bg-[#121317] py-20 text-white sm:py-28 lg:py-32">
      <div className={wrap}>
        <h2 id="proof-title" className="sr-only">
          What clients and candidates say
        </h2>
        <p className={`${kicker} text-[#ff8a70]`}>On the record</p>

        <Reveal className="mt-8">
          <figure className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <blockquote
              className={`${display} text-[clamp(2rem,4.6vw,4.1rem)] font-bold leading-[1.02] tracking-[-0.04em] lg:col-span-10`}
            >
              <span className={`${serif} mr-1 text-[#ff5a3c]`} aria-hidden="true">&ldquo;</span>
              Every agency says they vet people. Ascend are the first whose
              shortlist <span className={`${serif} italic tracking-[-0.02em] text-[#ff8a70]`}>proved it.</span>{" "}
              We hired two of the three and would have taken the third.
            </blockquote>
            <figcaption className="flex items-center gap-4 lg:col-span-10">
              <span className="h-px w-10 bg-[#ff5a3c]" aria-hidden="true" />
              <span>
                <span className="block font-semibold">Laura Bennett</span>
                <span className={`${mono} mt-0.5 block text-[0.7rem] uppercase tracking-[0.14em] text-white/55`}>
                  COO, Hatchwork, three searches since 2021
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/12 pt-10 md:grid-cols-2 md:gap-12">
          {QUOTES.map((q, i) => (
            <Reveal key={q.who} delay={i * 100}>
              <figure>
                <blockquote className="text-[1.15rem] leading-relaxed text-white/85">&ldquo;{q.q}&rdquo;</blockquote>
                <figcaption className="mt-4">
                  <span className="text-[0.95rem] font-semibold">{q.who}</span>
                  <span className={`${mono} mt-0.5 block text-[0.66rem] uppercase tracking-[0.14em] text-white/55`}>{q.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <p className={`${mono} text-[0.7rem] uppercase tracking-[0.14em] text-white/55`}>
            Hiring with us this year
          </p>
          <ul className="mt-6 grid grid-cols-2 border-l border-t border-white/12 md:grid-cols-4">
            {CLIENTS.map((c) => (
              <li
                key={c.name}
                className="group flex h-24 items-center justify-center border-b border-r border-white/12 px-3 text-white/60 transition-colors duration-300 hover:bg-white/[0.03] hover:text-white sm:h-32"
              >
                <span className={`${c.cls} inline-block whitespace-nowrap leading-none`}>{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
