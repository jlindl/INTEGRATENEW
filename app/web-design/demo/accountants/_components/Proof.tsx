import Image from "next/image";
import { Reveal } from "./Reveal";
import { label, mono, photo, serif, wrap } from "./ui";

const cases = [
  { client: "Fieldnote Robotics", what: "R&D relief recovered across two missed years", fig: "£184,200" },
  { client: "Calloway Bakehouse", what: "Cash freed by restructuring VAT on wholesale", fig: "£38,900" },
  { client: "Brennan & Vale", what: "Due diligence closed with zero adjustments", fig: "11 days" },
];

const accreditations = [
  "ICAEW Chartered Accountants",
  "Xero Platinum Partner",
  "ATT Registered Firm",
  "Dext Elite Partner",
];

export function Proof() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="scroll-mt-20">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <Reveal>
          <p className={`${label} text-[#4f5a54]`}>
            <span className="text-[#a7834b]">06</span> &nbsp;In their words
          </p>
          <h2 id="proof-title" className="sr-only">What clients say</h2>
        </Reveal>

        <div className="mt-12 grid items-end gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="relative aspect-[4/5] max-w-[420px] overflow-hidden rounded-[2px] bg-[#d6cfbf]">
              <Image
                src="/web-design/demo/accountants/client-portrait-a.webp"
                alt="Jun Park, co-founder of Fieldnote Robotics, at a window table"
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover object-[50%_60%] [filter:grayscale(1)_contrast(1.05)]"
              />
            </div>
          </Reveal>
          <Reveal as="figure" className="lg:col-span-8 lg:pl-8" delay={120}>
            <span aria-hidden="true" className={`${serif} block text-[6rem] leading-[0.6] text-[#a7834b]`}>
              &ldquo;
            </span>
            <blockquote
              className={`${serif} mt-2 text-[clamp(1.7rem,3.3vw,2.9rem)] font-[350] leading-[1.18] tracking-[-0.012em] text-[#13201b]`}
            >
              <p>
                Six years with a high-street firm and not one conversation about
                where we were going. Meridian closed our first month in six days
                and found <em className="italic text-[#1b4a3a]">£184,000 of R&amp;D relief</em> we&rsquo;d
                left on the table.
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 border-t border-[#d6cfbf] pt-5">
              <span className="text-[1rem] text-[#13201b]">Jun Park</span>
              <span className={`${mono} text-[0.72rem] uppercase tracking-[0.12em] text-[#4f5a54]`}>
                Co-founder, Fieldnote Robotics
              </span>
            </figcaption>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-2 md:gap-8 lg:mt-32">
          <Reveal as="figure" className="border-t border-[#13201b] pt-8">
            <blockquote className={`${serif} text-[1.45rem] leading-[1.35] text-[#13201b]`}>
              <p>
                &ldquo;Our partner sat in on the Series A and answered every
                finance question before the investors finished asking it. We
                closed a fortnight early.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#d6cfbf]">
                <Image
                  src="/web-design/demo/accountants/client-portrait-b.webp"
                  alt=""
                  fill
                  sizes="48px"
                  className={`${photo} object-cover object-[62%_25%]`}
                />
              </span>
              <span>
                <span className="block text-[0.98rem] text-[#13201b]">Isla Brennan</span>
                <span className={`${mono} block text-[0.7rem] uppercase tracking-[0.12em] text-[#4f5a54]`}>
                  Founder, Brennan &amp; Vale
                </span>
              </span>
            </figcaption>
          </Reveal>
          <Reveal as="figure" className="border-t border-[#13201b] pt-8" delay={100}>
            <blockquote className={`${serif} text-[1.45rem] leading-[1.35] text-[#13201b]`}>
              <p>
                &ldquo;I used to dread January. Now my tax bill is in the
                forecast by October and I know which month it leaves the
                account.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4">
              <span
                aria-hidden="true"
                className={`${serif} flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1b4a3a] text-[1.1rem] text-[#f3f0e8]`}
              >
                MC
              </span>
              <span>
                <span className="block text-[0.98rem] text-[#13201b]">Maya Calloway</span>
                <span className={`${mono} block text-[0.7rem] uppercase tracking-[0.12em] text-[#4f5a54]`}>
                  Owner, Calloway Bakehouse
                </span>
              </span>
            </figcaption>
          </Reveal>
        </div>

        {/* Case notes, set like ledger entries */}
        <div className="mt-24 lg:mt-32">
          <Reveal>
            <p className={`${label} border-b border-[#13201b] pb-3 text-[#4f5a54]`}>Case notes, 2025/26</p>
          </Reveal>
          <ul>
            {cases.map((c, i) => (
              <Reveal
                as="li"
                key={c.client}
                delay={i * 80}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-[#d6cfbf] py-6 sm:grid-cols-[14rem_1fr_auto]"
              >
                <span className={`${serif} text-[1.25rem] text-[#13201b]`}>{c.client}</span>
                <span className="order-3 col-span-2 text-[0.96rem] text-[#4f5a54] sm:order-none sm:col-span-1">{c.what}</span>
                <span className={`${serif} text-[1.6rem] leading-none tabular-nums text-[#1b4a3a] sm:text-[2rem]`}>{c.fig}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mt-20">
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4" aria-label="Accreditations">
            {accreditations.map((a) => (
              <li key={a} className={`${mono} flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.14em] text-[#4f5a54]`}>
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[#a7834b]" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
