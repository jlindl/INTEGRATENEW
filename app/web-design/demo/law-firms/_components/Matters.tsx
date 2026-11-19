import { Reveal } from "./Reveal";
import { label, mono, serif, wrap } from "./tokens";

const matters = [
  { year: "2026", area: "Corporate", text: "Advised the founding shareholders on the £38m sale of a Surrey precision engineering group to a US trade buyer." },
  { year: "2026", area: "Disputes", text: "Secured a seven-figure settlement for a minority shareholder excluded from a family hospitality business, three weeks before trial." },
  { year: "2026", area: "Private Client", text: "Restructured the trusts of a third-generation farming family following the April 2026 changes to agricultural property relief." },
  { year: "2025", area: "Property", text: "Acted on the acquisition and pre-let of a 42,000 sq ft logistics site near Farnborough for a regional investor." },
  { year: "2025", area: "Probate", text: "Defended an executor against a contested will claim worth £6.2m, dismissed at the first hearing with costs." },
];

const voices = [
  {
    quote: "Eleanor has looked after three generations of our family. She has never once made us feel like a file.",
    who: "Private client, Guildford",
  },
  {
    quote: "James gave us a number on day one and the final bill matched it to the pound. In twenty years of selling businesses, that is a first.",
    who: "Serial founder, London",
  },
];

/** A ledger of recent instructions, anonymised as a real firm would. */
export function Matters() {
  return (
    <section aria-labelledby="matters-title" className="bg-[#f3efe7] text-[#17130f]">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className={`${label} text-[#74272a]`}>§ 05 · Recent instructions</p>
            <h2
              id="matters-title"
              className={`${serif} mt-6 text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em]`}
            >
              The work, <em className="italic">described plainly.</em>
            </h2>
            <p className="mt-6 max-w-sm text-[1rem] leading-[1.75] text-[#5b5348]">
              Client names stay with us. The outcomes we are allowed to share.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="border-t border-[#17130f]">
              {matters.map((m, i) => (
                <li key={m.text} className="border-b border-[#17130f]/15">
                  <Reveal delay={i * 60} className="grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-2 py-7 sm:grid-cols-[4.5rem_9rem_1fr]">
                    <span className={`${mono} text-[0.72rem] text-[#5b5348]`}>{m.year}</span>
                    <span className={`${mono} text-[0.66rem] uppercase tracking-[0.16em] text-[#74272a] sm:pt-0.5`}>{m.area}</span>
                    <p className={`${serif} col-span-2 text-[1.35rem] leading-[1.3] sm:col-span-1 sm:text-[1.5rem]`}>{m.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <div className="mt-20 grid gap-12 sm:grid-cols-2">
              {voices.map((v, i) => (
                <Reveal key={v.who} delay={i * 120}>
                  <figure>
                    <blockquote className={`${serif} text-[1.6rem] italic leading-[1.25]`}>
                      <p>&ldquo;{v.quote}&rdquo;</p>
                    </blockquote>
                    <figcaption className={`${mono} mt-5 text-[0.64rem] uppercase tracking-[0.16em] text-[#5b5348]`}>
                      {v.who}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
