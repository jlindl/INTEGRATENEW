import { Reveal } from "./Reveal";
import { display, kicker, mono, serif, wrap } from "./tokens";

const TERMS = [
  {
    big: "18",
    unit: "%",
    title: "Contingent search",
    body: "Of first year base salary, invoiced on the day they start. Nothing up front. For roles up to £110k.",
  },
  {
    big: "25",
    unit: "%",
    title: "Retained search",
    body: "Paid in thirds: on brief, on shortlist, on start. For leadership, confidential and hard to fill hires.",
  },
  {
    big: "6",
    unit: "mo",
    title: "Replacement guarantee",
    body: "If they leave, or it simply isn't working, we run the search again at no cost. Used four times in 2025.",
  },
];

export function Terms() {
  return (
    <section aria-labelledby="terms-title" className="border-y border-[#ddd6c8] bg-[#fbf9f4] py-20 sm:py-28">
      <div className={wrap}>
        <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <p className={`${kicker} text-[#b8360d] lg:col-span-3`}>Fees, in plain English</p>
          <h2
            id="terms-title"
            className={`${display} text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#121317] lg:col-span-9`}
          >
            The small print, <span className={`${serif} italic tracking-[-0.02em]`}>printed large.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 border-t border-[#121317] md:grid-cols-3">
          {TERMS.map((t, i) => (
            <Reveal
              key={t.title}
              delay={i * 100}
              className={`py-8 md:px-8 md:py-10 ${i === 0 ? "md:pl-0" : "border-t border-[#ddd6c8] md:border-l md:border-t-0"}`}
            >
              <p className={`${display} text-[clamp(4.5rem,9vw,8rem)] font-extrabold leading-[0.8] tracking-[-0.07em] text-[#121317]`}>
                {t.big}
                <span className="ml-1 align-top text-[0.32em] tracking-[-0.02em] text-[#b8360d]">{t.unit}</span>
              </p>
              <h3 className={`${mono} mt-6 text-[0.74rem] uppercase tracking-[0.14em] text-[#121317]`}>{t.title}</h3>
              <p className="mt-3 max-w-[22rem] text-[0.98rem] leading-relaxed text-[#575a62]">{t.body}</p>
            </Reveal>
          ))}
        </div>

        <p className={`${mono} mt-6 text-[0.72rem] leading-relaxed text-[#575a62]`}>
          No exclusivity lock ins. No unsolicited CVs, ever. Volume hiring of three or more of the same role is quoted separately.
        </p>
      </div>
    </section>
  );
}
