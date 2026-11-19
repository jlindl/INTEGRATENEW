import { Reveal } from "./Reveal";
import { focusRing, label, mono, serif, wrap } from "./tokens";

const faqs = [
  {
    q: "Is the first conversation free?",
    a: "A fifteen-minute call to work out whether we are the right firm is always free, and we will tell you honestly if we are not. A full initial consultation is 45 minutes with a partner for £250 plus VAT, credited against your first invoice if you instruct us.",
  },
  {
    q: "Will I deal with the same person throughout?",
    a: "Yes. A named partner leads your matter from the first meeting to completion, and you will have their direct line. If they are away, you will be told in advance who is covering and that person will already know your file.",
  },
  {
    q: "Do you only act for wealthy clients?",
    a: "No. Our private client work runs from straightforward wills to complex family trusts, and our commercial clients range from two-person partnerships to groups with several hundred staff. The standard of attention is the same.",
  },
  {
    q: "How quickly can you act?",
    a: "Most new clients are seen within three working days. Injunctions, urgent employment matters and deathbed wills are handled the same day: call the London or Guildford number and ask for the duty partner.",
  },
  {
    q: "Can we meet outside the office?",
    a: "Of course. We regularly meet clients at home, at their business or by video. For elderly or unwell clients making a will, a home visit within the M25 or Surrey carries no additional charge.",
  },
  {
    q: "What if something goes wrong?",
    a: "Tell the partner leading your matter first. If that does not resolve it, Eleanor Halstead reviews every complaint personally. Our full complaints procedure, and your right to refer to the Legal Ombudsman, is set out in your engagement letter.",
  },
];

/** Native disclosure widgets: accessible and fully usable without JS. */
export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-[#17130f]/10 bg-[#e7e0d3] text-[#17130f]">
      <div className={`${wrap} grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10 lg:py-40`}>
        <Reveal className="lg:col-span-4">
          <p className={`${label} text-[#74272a]`}>§ 06 · Questions</p>
          <h2
            id="faq-title"
            className={`${serif} mt-6 text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em]`}
          >
            What clients <em className="italic">ask us first.</em>
          </h2>
          <p className="mt-8 max-w-xs text-[0.95rem] leading-[1.7] text-[#5b5348]">
            Something we have not covered? Call{" "}
            <a href="tel:02079460418" className={`text-[#17130f] underline underline-offset-4 ${focusRing}`}>
              020 7946 0418
            </a>{" "}
            and ask for the duty partner. There is no charge for the first fifteen minutes.
          </p>
        </Reveal>

        <div className="border-t border-[#17130f] lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => (
            <details key={f.q} className="hl-faq group border-b border-[#17130f]/15" open={i === 0}>
              <summary
                className={`flex cursor-pointer list-none items-baseline gap-5 py-7 [&::-webkit-details-marker]:hidden ${focusRing}`}
              >
                <span className={`${mono} w-7 shrink-0 text-[0.7rem] text-[#5b5348]`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`${serif} flex-1 text-[1.5rem] leading-[1.2] transition-colors group-hover:text-[#74272a] sm:text-[1.75rem]`}>
                  {f.q}
                </span>
                <span aria-hidden="true" className="relative ml-2 h-3 w-3 shrink-0 self-center">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pl-12 text-[1rem] leading-[1.75] text-[#5b5348]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
