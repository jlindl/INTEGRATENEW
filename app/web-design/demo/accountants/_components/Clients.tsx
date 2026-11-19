import Image from "next/image";
import { Reveal } from "./Reveal";
import { label, mono, photo, serif, wrap } from "./ui";

const sectors = [
  {
    img: "/web-design/demo/accountants/founder-studio.webp",
    alt: "A founder packing orders for her online clothing label",
    pos: "object-[50%_40%]",
    sector: "Product brands",
    t: "Direct-to-consumer and wholesale",
    d: "Stock valuations, Shopify and Amazon payouts reconciled to the order, landed costs that include the freight.",
    stat: "41",
    statK: "brands on our books",
  },
  {
    img: "/web-design/demo/accountants/founder-bakery.webp",
    alt: "A bakery owner holding a fresh sourdough loaf behind her counter",
    pos: "object-[38%_45%]",
    sector: "Hospitality",
    t: "Bakeries, restaurants and bars",
    d: "Tronc schemes, weekly payroll, site-by-site margins and a sensible VAT position on everything you sell.",
    stat: "63",
    statK: "sites across London",
  },
  {
    img: "/web-design/demo/accountants/founder-roastery.webp",
    alt: "Freshly roasted coffee beans pouring from a drum roaster",
    pos: "object-[40%_50%]",
    sector: "Makers",
    t: "Roasters, workshops and small manufacturers",
    d: "Job costing, capital allowances on kit, and the cash planning that comes with buying raw materials months ahead.",
    stat: "£1.1m",
    statK: "capital allowances claimed",
  },
  {
    img: "/web-design/demo/accountants/founder-robotics.webp",
    alt: "A robotics team testing a prototype in their workshop",
    pos: "object-[45%_50%]",
    sector: "Venture-backed",
    t: "Software and deep tech, seed to Series B",
    d: "R&D relief, EMI option schemes, investor reporting and a data room that survives due diligence.",
    stat: "£9.4m",
    statK: "R&D relief claimed since 2019",
  },
];

export function Clients() {
  return (
    <section id="clients" aria-labelledby="clients-title" className="scroll-mt-20">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className={`${label} text-[#4f5a54]`}>
              <span className="text-[#a7834b]">04</span> &nbsp;Who we work with
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={80}>
            <h2
              id="clients-title"
              className={`${serif} text-[clamp(2.4rem,5vw,4.4rem)] font-[350] leading-[1] tracking-[-0.02em] text-[#13201b]`}
            >
              Founder-led companies, <em className="italic text-[#1b4a3a]">£250k to £25m</em> turnover.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <Reveal as="li" key={s.sector} delay={i * 100} className={i % 2 === 1 ? "lg:mt-20" : ""}>
              <article className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[#d6cfbf] sm:aspect-[3/4]">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                    className={`${photo} ${s.pos} object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]`}
                  />
                  <span className={`${label} absolute left-3 top-3 rounded-full bg-[#f3f0e8]/92 px-3 py-1.5 text-[0.6rem] text-[#13201b]`}>
                    {s.sector}
                  </span>
                </div>
                <h3 className={`${serif} mt-6 text-[1.5rem] leading-[1.15] text-[#13201b]`}>{s.t}</h3>
                <p className="mt-3 text-[0.96rem] leading-[1.7] text-[#4f5a54]">{s.d}</p>
                <p className="mt-5 flex items-baseline gap-3 border-t border-[#d6cfbf] pt-4">
                  <span className={`${serif} text-[1.6rem] leading-none text-[#1b4a3a]`}>{s.stat}</span>
                  <span className={`${mono} text-[0.7rem] uppercase tracking-[0.12em] text-[#4f5a54]`}>{s.statK}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
