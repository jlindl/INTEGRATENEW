import { FinanceCalc } from "./FinanceCalc";
import { Reveal } from "./Reveal";
import { btnPrimary, container, display, eyebrow } from "./ui";

const groups: { name: string; note: string; items: [string, string, string?][] }[] = [
  {
    name: "Everyday care",
    note: "The appointments most people need",
    items: [
      ["New patient visit", "£65", "45 minutes, X-rays if needed"],
      ["Routine check-up", "£45"],
      ["Hygiene visit", "£75", "30 minutes"],
      ["Hygiene with air polish", "£95", "45 minutes, removes staining"],
      ["Emergency assessment", "£95", "Patients and non-patients"],
    ],
  },
  {
    name: "Fillings & repairs",
    note: "Fixing what needs fixing",
    items: [
      ["White filling", "from £120"],
      ["Extraction", "from £120"],
      ["Root canal, front tooth", "from £450"],
      ["Root canal, back tooth", "from £695"],
      ["Porcelain crown", "from £625"],
    ],
  },
  {
    name: "Cosmetic",
    note: "Always after a check-up",
    items: [
      ["Aligner consultation & 3D scan", "Free"],
      ["Home whitening", "£295", "Custom trays and gel"],
      ["Composite bonding", "from £220", "Per tooth"],
      ["Porcelain veneer", "from £795", "Per tooth"],
      ["Clear aligners", "from £2,450"],
    ],
  },
  {
    name: "Implants & sedation",
    note: "For bigger treatment",
    items: [
      ["Implant consultation & 3D scan", "£120", "Redeemed against treatment"],
      ["Single implant with crown", "from £2,350"],
      ["IV sedation assessment", "£60"],
      ["IV sedation, per session", "£395"],
    ],
  },
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[0.3rem] h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function Prices() {
  return (
    <section id="prices" aria-labelledby="prices-title" className="scroll-mt-20 bg-[#f6f1ea]">
      <div className={`${container} py-24 sm:py-28 lg:py-36`}>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className={`${eyebrow} justify-center`}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#a4553a]" aria-hidden="true" />
            Prices, in full
          </p>
          <h2
            id="prices-title"
            className={`${display} mt-6 text-[clamp(2.3rem,5vw,4.1rem)] font-light leading-[1.04] tracking-[-0.03em] text-[#1c2a26]`}
          >
            The price list,{" "}
            <em className="text-[#2d5547] [font-variation-settings:'SOFT'_100,'WONK'_1]">before</em> you sit in the chair.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.7] text-[#55625c]">
            No forms to fill in to see it, no &ldquo;prices on
            consultation&rdquo;. If a treatment says &ldquo;from&rdquo;, your
            written plan gives the exact figure before anything starts.
          </p>
        </Reveal>

        {/* NHS vs private */}
        <div id="nhs" className="mt-16 grid scroll-mt-28 gap-5 lg:mt-20 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-[2rem] border border-[#1c2a26]/10 bg-[#fffcf7] p-7 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h3 className={`${display} text-[1.7rem] text-[#1c2a26]`}>On the NHS</h3>
                <span className="rounded-full bg-[#e3ebe4] px-3 py-1 text-[0.75rem] font-semibold text-[#2d5547]">Children &amp; existing patients</span>
              </div>
              <ul className="mt-6 space-y-3 text-[0.97rem] leading-relaxed text-[#1c2a26]/85">
                <li className="flex gap-3 text-[#2d5547]"><Check /><span className="text-[#1c2a26]/85">Free check-ups and treatment for under-18s in registered families.</span></li>
                <li className="flex gap-3 text-[#2d5547]"><Check /><span className="text-[#1c2a26]/85">Adult NHS places are currently full. Join the waiting list and we&rsquo;ll text you when one opens.</span></li>
                <li className="flex gap-3 text-[#2d5547]"><Check /><span className="text-[#1c2a26]/85">NHS charges are set nationally in three bands. We&rsquo;ll always tell you which band applies first.</span></li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={90} className="h-full">
            <div className="h-full rounded-[2rem] bg-[#2d5547] p-7 text-[#fffcf7] sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h3 className={`${display} text-[1.7rem]`}>Privately</h3>
                <span className="rounded-full bg-[#fffcf7]/12 px-3 py-1 text-[0.75rem] font-semibold">Open to new patients</span>
              </div>
              <ul className="mt-6 space-y-3 text-[0.97rem] leading-relaxed">
                <li className="flex gap-3 text-[#f2d6c6]"><Check /><span className="text-[#fffcf7]/90">Longer appointments, so nothing feels rushed. Your first visit is 45 minutes.</span></li>
                <li className="flex gap-3 text-[#f2d6c6]"><Check /><span className="text-[#fffcf7]/90">More choice: white fillings anywhere, hygiene visits, whitening, aligners, sedation.</span></li>
                <li className="flex gap-3 text-[#f2d6c6]"><Check /><span className="text-[#fffcf7]/90">Same dentists, same standards. The difference is time and choice, not care.</span></li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* price list */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.name} delay={(gi % 2) * 90} className="h-full">
              <div className="h-full rounded-[2rem] bg-[#fffcf7] p-7 sm:p-9">
                <div className="flex items-baseline justify-between gap-4 border-b border-[#1c2a26]/10 pb-4">
                  <h3 className={`${display} text-[1.45rem] text-[#1c2a26]`}>{g.name}</h3>
                  <p className="text-right text-[0.8rem] text-[#55625c]">{g.note}</p>
                </div>
                <dl className="divide-y divide-dashed divide-[#1c2a26]/12">
                  {g.items.map(([label, price, sub]) => (
                    <div key={label} className="flex items-baseline justify-between gap-6 py-3.5">
                      <dt className="text-[0.97rem] text-[#1c2a26]">
                        {label}
                        {sub ? <span className="mt-0.5 block text-[0.8rem] text-[#55625c]">{sub}</span> : null}
                      </dt>
                      <dd className="shrink-0 text-[0.97rem] font-semibold tabular-nums text-[#1c2a26]">{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        {/* plan + finance */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-[#f2d6c6] p-7 sm:p-9">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#1c2a26]/10" />
              <div aria-hidden="true" className="absolute -right-6 -top-6 h-36 w-36 rounded-full border border-[#1c2a26]/10" />
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#7e3f28]">Brightwell Care plan</p>
                <p className={`${display} mt-4 text-[3.4rem] leading-none text-[#1c2a26]`}>
                  £16.50<span className="font-[family-name:var(--font-bw-body)] text-base text-[#1c2a26]/70"> a month</span>
                </p>
                <ul className="mt-6 space-y-2.5 text-[0.95rem] text-[#1c2a26]/85">
                  <li className="flex gap-3"><Check />Two check-ups and two hygiene visits a year</li>
                  <li className="flex gap-3"><Check />10% off any treatment</li>
                  <li className="flex gap-3"><Check />Worldwide dental emergency cover</li>
                  <li className="flex gap-3"><Check />No joining fee. Cancel any time</li>
                </ul>
              </div>
              <a href="#book" className={`${btnPrimary} mt-8 w-fit`}>Join after your first visit</a>
            </div>
          </Reveal>
          <Reveal delay={90} className="h-full">
            <FinanceCalc />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
