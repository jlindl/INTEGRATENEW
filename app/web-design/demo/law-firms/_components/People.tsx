import Image from "next/image";
import { Reveal } from "./Reveal";
import { IMG, focusRingLight, label, mono, serif, wrap } from "./tokens";

const partners = [
  {
    name: "Eleanor Halstead",
    role: "Senior Partner",
    focus: "Trusts, estate planning and family wealth",
    aside: "Margaret's daughter. Joined in 1996 after ten years at the Chancery Bar. Still keeps the Quarry Street office.",
    tel: "020 7946 0401",
    img: "eleanor-halstead.webp",
    pos: "50% 25%",
  },
  {
    name: "James Okafor",
    role: "Partner, Head of Corporate",
    focus: "Company sales, buyouts and investment",
    aside: "Trained in the City, left for a firm where clients have his mobile. Has advised on more than 140 founder exits.",
    tel: "020 7946 0402",
    img: "james.webp",
    pos: "50% 20%",
  },
  {
    name: "Grace Liang",
    role: "Partner, Disputes",
    focus: "Shareholder and commercial litigation",
    aside: "Former solicitor-advocate with rights of audience in the higher courts. Settles more than she fights, by design.",
    tel: "020 7946 0403",
    img: "grace.webp",
    pos: "50% 25%",
  },
  {
    name: "Sofia Marchetti",
    role: "Partner, Family",
    focus: "Divorce, finances and pre-nuptial agreements",
    aside: "Trained mediator and collaborative lawyer. Believes most family cases are won in the first meeting, not the last.",
    tel: "01632 960 215",
    img: "sofia.webp",
    pos: "50% 20%",
  },
];

export function People() {
  return (
    <section id="people" aria-labelledby="people-title" className="scroll-mt-16 bg-[#0f0d0b] text-[#f3efe7]">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className={`${label} text-[#d9c3a0]`}>§ 04 · People</p>
            <h2
              id="people-title"
              className={`${serif} mt-6 text-[clamp(2.6rem,5.4vw,4.75rem)] leading-[1] tracking-[-0.02em]`}
            >
              You will know exactly <em className="italic text-[#d9c3a0]">who is acting for you.</em>
            </h2>
          </div>
          <p className="max-w-md text-[1rem] leading-[1.75] text-[#f3efe7]/70 lg:col-span-4 lg:col-start-9 lg:self-end">
            Nine partners, twenty-two solicitors and a support team who have,
            on average, been with us for eleven years. These are four of the
            people you are most likely to meet first.
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {partners.map((p, i) => (
            <li key={p.name}>
              <Reveal delay={i * 90}>
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#1d1915]">
                    <Image
                      src={`${IMG}/${p.img}`}
                      alt={`Portrait of ${p.name}, ${p.role}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="hl-portrait object-cover transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.03]"
                      style={{ objectPosition: p.pos }}
                    />
                    <span className={`${mono} absolute left-4 top-4 text-[0.62rem] uppercase tracking-[0.18em] text-[#f3efe7]/75`}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className={`${serif} mt-6 text-[1.9rem] leading-none`}>{p.name}</h3>
                  <p className={`${mono} mt-3 text-[0.64rem] uppercase tracking-[0.16em] text-[#d9c3a0]`}>{p.role}</p>
                  <p className="mt-3 text-[0.92rem] text-[#f3efe7]">{p.focus}</p>
                  <p className="mt-3 text-[0.86rem] leading-[1.65] text-[#f3efe7]/65">{p.aside}</p>
                  <a
                    href={`tel:${p.tel.replace(/\s/g, "")}`}
                    className={`mt-5 inline-flex items-center gap-2 border-b border-[#f3efe7]/25 pb-1 text-[0.84rem] text-[#f3efe7]/85 transition-colors hover:border-[#d9c3a0] hover:text-[#f3efe7] ${focusRingLight}`}
                  >
                    <span className={`${mono} text-[0.6rem] uppercase tracking-[0.16em] text-[#f3efe7]/55`}>Direct</span>
                    {p.tel}
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
