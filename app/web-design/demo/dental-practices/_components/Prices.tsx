import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display, focusRingOnTeal } from "./ui";

const priceList = [
  { name: "New patient exam & scan", price: "£39" },
  { name: "Routine check-up", price: "£29" },
  { name: "Hygienist visit", price: "£59" },
  { name: "White filling", price: "from £120" },
  { name: "Teeth whitening (home kit)", price: "£290" },
  { name: "Invisalign", price: "from £1,995" },
  { name: "Dental implant", price: "from £2,400" },
  { name: "Emergency appointment", price: "£65" },
];

export function Prices() {
  return (
    <section id="prices" className="scroll-mt-24">
      <div className={`${container} py-20 sm:py-24 lg:py-28`}>
        <Reveal>
          <SectionHeading
            center
            eyebrow="Prices"
            title="No hidden costs. Ever."
            sub="Every price is listed before you sit in the chair, and we'll always talk you through the options — including doing nothing — before anything goes ahead."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[1.3fr_1fr] lg:gap-8">
          <Reveal>
            <div className="rounded-2xl border border-[#dceeeb] bg-white p-6 sm:p-8">
              <ul className="divide-y divide-[#dceeeb]">
                {priceList.map((row) => (
                  <li
                    key={row.name}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <span className="text-[0.95rem] text-[#13201f]">
                      {row.name}
                    </span>
                    <span className="shrink-0 font-semibold text-[#0f9c91]">
                      {row.price}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-3 rounded-xl bg-[#f4faf9] px-4 py-3 text-sm text-[#4f6360]">
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                  fill="none"
                  stroke="#12b3a6"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 8.5l3.5 3.5L13.5 4" />
                </svg>
                Spread the cost of any treatment over £300 with 0% finance.
              </p>
            </div>
          </Reveal>

          {/* Membership plan — featured teal card */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-2xl bg-[#12b3a6] p-8 text-white shadow-[0_36px_70px_-40px_rgba(15,156,145,0.7)]">
              <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em]">
                Most popular
              </span>
              <h3 className={`${display} mt-5 text-2xl font-bold tracking-tight`}>
                Brightwell Care Plan
              </h3>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className={`${display} text-4xl font-bold tracking-tight`}>
                  £18
                </span>
                <span className="text-sm text-white/80">/month</span>
              </p>
              <ul className="mt-6 space-y-3 border-t border-white/20 pt-6 text-sm text-white/90">
                {[
                  "Two check-ups and two hygiene visits a year",
                  "20% off all further treatment",
                  "Worldwide dental emergency cover",
                  "Children covered free on a parent's plan",
                ].map((f) => (
                  <li key={f} className="flex gap-3">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-1 h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 8.5l3.5 3.5L13.5 4" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-1 items-end">
                <a
                  href="#book"
                  className={`inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0f9c91] transition-colors duration-200 hover:bg-[#eafaf8] ${focusRingOnTeal}`}
                >
                  Join the plan
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
