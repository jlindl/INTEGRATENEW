import Image from "next/image";
import { Reveal } from "./Reveal";
import { IMG, focusRing, label, mono, serif, wrap } from "./tokens";

const principles = [
  {
    n: "I",
    title: "A partner leads, from first call to final bill.",
    body: "Your matter is owned by a named partner who attends the meetings, signs off the advice and answers the phone. Associates do the work that should be done at associate rates, under that partner's eye.",
    note: "Partners at Halstead carry no more than twenty-five live matters each. It is written into their terms.",
  },
  {
    n: "II",
    title: "Advice you could forward to your board.",
    body: "Every piece of advice ends with a recommendation, the risk in a sentence and what we would do in your position. If you need to read it twice, we have not finished writing it.",
    note: "Our advice letters open with a summary of no more than five lines. The detail follows for those who want it.",
  },
  {
    n: "III",
    title: "The fee, in writing, before the work.",
    body: "Most of what we do is fixed fee. Where it cannot be, you get a capped estimate broken into stages, and we stop to re-agree before any stage runs over. Phone calls and short emails are never billed.",
    note: "Disputes are estimated stage by stage, because no honest firm can fix the cost of the other side's behaviour.",
  },
  {
    n: "IV",
    title: "Replies within one working day.",
    body: "Not always the full answer, but always a person: who is looking at it, and when you will hear. Urgent matters have a partner's mobile number from the first meeting.",
    note: "Measured monthly. Last year 97% of client emails received a substantive reply within one working day.",
  },
];

const fees = [
  { item: "Initial consultation", scope: "45 minutes with a partner, in person or by video", fee: "£250", fn: 2 },
  { item: "Will (single)", scope: "Advice meeting, drafting, signing appointment", fee: "£650" },
  { item: "Mirror wills (couple)", scope: "As above, for two people with aligned wishes", fee: "£1,050" },
  { item: "Lasting powers of attorney", scope: "Property & financial and health & welfare, registered", fee: "£895" },
  { item: "Grant of probate", scope: "Estates without a taxable IHT return", fee: "£2,400" },
  { item: "Settlement agreement", scope: "Advice to employee, one round of negotiation", fee: "£650" },
  { item: "Shareholders' agreement", scope: "Up to four shareholders, two rounds of comments", fee: "from £3,500" },
];

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="scroll-mt-16 bg-[#f3efe7] text-[#17130f]">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <Reveal className="max-w-4xl">
          <p className={`${label} text-[#74272a]`}>§ 03 · Approach</p>
          <h2
            id="approach-title"
            className={`${serif} mt-6 text-[clamp(2.6rem,5.4vw,4.75rem)] leading-[1] tracking-[-0.02em]`}
          >
            Four promises, <em className="italic">kept in writing.</em>
          </h2>
        </Reveal>

        <ol className="mt-16 lg:mt-24">
          {principles.map((p, i) => (
            <li key={p.n} className="border-t border-[#17130f]/15 last:border-b">
              <Reveal delay={i * 60} className="grid gap-x-10 gap-y-4 py-10 lg:grid-cols-12 lg:py-14">
                <span className={`${serif} text-[2.4rem] italic leading-none text-[#74272a] lg:col-span-1`} aria-hidden="true">
                  {p.n}
                </span>
                <div className="lg:col-span-7">
                  <h3 className={`${serif} text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.12]`}>{p.title}</h3>
                  <p className="mt-4 max-w-2xl text-[1rem] leading-[1.75] text-[#5b5348]">{p.body}</p>
                </div>
                {/* Margin note, in the manner of a sidenote */}
                <aside className="lg:col-span-3 lg:col-start-10 lg:pt-2" aria-label={`Note on promise ${p.n}`}>
                  <p className="border-l border-[#a2865a] pl-4 text-[0.84rem] italic leading-[1.6] text-[#5b5348]">
                    <span className={`${mono} mr-2 not-italic text-[0.62rem] uppercase tracking-[0.16em] text-[#74272a]`}>Note</span>
                    {p.note}
                  </p>
                </aside>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Fees */}
        <div className="mt-28 grid gap-14 lg:mt-40 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className={`${label} text-[#74272a]`}>Published fees</p>
            <h3 className={`${serif} mt-6 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.015em]`}>
              What it costs, <em className="italic">before you ask.</em>
            </h3>
            <p className="mt-6 max-w-sm text-[1rem] leading-[1.75] text-[#5b5348]">
              Our most common instructions, priced. Everything else is quoted
              in writing within two working days of our first conversation.
            </p>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden bg-[#e7e0d3] lg:block">
              <Image
                src={`${IMG}/signing.webp`}
                alt="A hand signing a document with a fountain pen beside a pair of reading glasses"
                fill
                sizes="30vw"
                className="hl-grade object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={120}>
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Fixed fees for common matters, excluding VAT and disbursements</caption>
              <thead>
                <tr className={`${mono} border-b border-[#17130f] text-[0.64rem] uppercase tracking-[0.16em] text-[#5b5348]`}>
                  <th scope="col" className="pb-4 pr-4 font-normal">Matter</th>
                  <th scope="col" className="pb-4 text-right font-normal">
                    Fixed fee, ex VAT
                  </th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.item} className="border-b border-[#17130f]/15 align-baseline">
                    <th scope="row" className="py-5 pr-4 font-normal">
                      <span className={`${serif} block text-[1.45rem] leading-tight sm:text-[1.6rem]`}>
                        {f.item}
                        {f.fn ? (
                          <a
                            href={`#fn-${f.fn}`}
                            id={`fnref-${f.fn}`}
                            aria-label={`Footnote ${f.fn}`}
                            className={`ml-1 align-super font-[family-name:var(--font-hl-mono)] text-[0.55em] text-[#74272a] ${focusRing}`}
                          >
                            {f.fn}
                          </a>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-[0.86rem] leading-snug text-[#5b5348]">{f.scope}</span>
                    </th>
                    <td className={`${serif} whitespace-nowrap py-5 text-right text-[1.45rem] sm:text-[1.6rem]`}>{f.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ol className="mt-8 space-y-3 text-[0.84rem] leading-[1.6] text-[#5b5348]" aria-label="Footnotes">
              <li id="fn-1" className="flex gap-3 scroll-mt-24">
                <span className={`${mono} text-[#74272a]`}>1</span>
                <span>
                  Fixed fees cover the work described in your engagement letter. If
                  the scope changes, we set out the new fee in writing and wait for
                  your agreement before any further work begins.{" "}
                  <a href="#fnref-1" className={`underline underline-offset-2 ${focusRing}`} aria-label="Back to reference 1">
                    Back
                  </a>
                </span>
              </li>
              <li id="fn-2" className="flex gap-3 scroll-mt-24">
                <span className={`${mono} text-[#74272a]`}>2</span>
                <span>
                  Credited in full against your first invoice if you instruct us
                  within three months.{" "}
                  <a href="#fnref-2" className={`underline underline-offset-2 ${focusRing}`} aria-label="Back to reference 2">
                    Back
                  </a>
                </span>
              </li>
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
