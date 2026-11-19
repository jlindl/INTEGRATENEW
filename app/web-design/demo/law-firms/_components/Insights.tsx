import Image from "next/image";
import { Reveal } from "./Reveal";
import { IMG, focusRing, label, linkUnderline, mono, serif, wrap } from "./tokens";

const posts = [
  {
    cat: "Private Client",
    date: "3 November 2026",
    read: "8 min read",
    title: "Farms, family companies and the new relief cap: what we are advising this winter",
    dek: "Seven months on, the £1m allowance has changed the arithmetic for most family businesses. Eleanor Halstead sets out four decisions worth making before the year end.",
    img: "manor.webp",
    alt: "A Cotswold stone manor house with tall chimneys behind clipped yew hedges",
  },
  {
    cat: "Corporate",
    date: "21 October 2026",
    read: "5 min read",
    title: "Selling to a trade buyer: the warranty that costs founders most",
    dek: "Why the accounts warranty deserves more of your attention than the price.",
    img: "paternoster.webp",
    alt: "Paternoster Square in the City of London seen from above",
  },
  {
    cat: "Property",
    date: "30 September 2026",
    read: "6 min read",
    title: "Development agreements: five clauses we always rewrite",
    dek: "From long-stop dates to overage, the drafting that decides who carries the risk.",
    img: "at-work.webp",
    alt: "A solicitor reviewing plans at a desk",
  },
];

export function Insights() {
  const [lead, ...rest] = posts;
  return (
    <section id="insights" aria-labelledby="insights-title" className="scroll-mt-16 bg-[#f3efe7] text-[#17130f]">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={`${label} text-[#74272a]`}>§ 07 · Insights</p>
            <h2
              id="insights-title"
              className={`${serif} mt-6 text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em]`}
            >
              Notes from <em className="italic">the partners&rsquo; desks.</em>
            </h2>
          </div>
          <a href="#insights" className={`${linkUnderline} text-[#17130f] ${focusRing}`}>
            All insights <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <article className="group">
              <a href="#insights" className={`block ${focusRing}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e7e0d3]">
                  <Image
                    src={`${IMG}/${lead.img}`}
                    alt={lead.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="hl-grade object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <p className={`${mono} mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[0.64rem] uppercase tracking-[0.16em] text-[#5b5348]`}>
                  <span className="text-[#74272a]">{lead.cat}</span>
                  <span>{lead.date}</span>
                  <span>{lead.read}</span>
                </p>
                <h3 className={`${serif} mt-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] decoration-1 underline-offset-[6px] group-hover:underline`}>
                  {lead.title}
                </h3>
                <p className="mt-4 max-w-xl text-[1rem] leading-[1.75] text-[#5b5348]">{lead.dek}</p>
              </a>
            </article>
          </Reveal>

          <div className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
            {rest.map((p, i) => (
              <Reveal key={p.title} delay={(i + 1) * 100}>
                <article className="group border-t border-[#17130f]/15 pt-8">
                  <a href="#insights" className={`grid grid-cols-[1fr_6.5rem] gap-5 ${focusRing}`}>
                    <div>
                      <p className={`${mono} flex flex-wrap gap-x-3 text-[0.62rem] uppercase tracking-[0.16em] text-[#5b5348]`}>
                        <span className="text-[#74272a]">{p.cat}</span>
                        <span>{p.read}</span>
                      </p>
                      <h3 className={`${serif} mt-3 text-[1.5rem] leading-[1.15] decoration-1 underline-offset-4 group-hover:underline`}>
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[0.9rem] leading-[1.65] text-[#5b5348]">{p.dek}</p>
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#e7e0d3]">
                      <Image src={`${IMG}/${p.img}`} alt={p.alt} fill sizes="120px" className="hl-grade object-cover" />
                    </div>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
