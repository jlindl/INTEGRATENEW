import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display, focusRing, focusRingOnGreen } from "./ui";

const tiers = [
  {
    name: "Foundations",
    price: "£149",
    audience: "For sole traders and landlords",
    features: [
      "Bookkeeping and bank reconciliation",
      "Self assessment prepared and filed",
      "Making Tax Digital, fully handled",
      "Deadline reminders, chased for you",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "£349",
    audience: "For limited companies",
    features: [
      "Statutory accounts and corporation tax",
      "Payroll for your whole team",
      "Quarterly advisory sessions",
      "Real-time dashboard, always current",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "£749",
    audience: "CFO-level support",
    features: [
      "Board packs and rolling forecasts",
      "R&D tax claims included",
      "A named partner on call",
      "Exit and succession planning",
    ],
    featured: false,
  },
];

function Check({ onGreen }: { onGreen: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-1 h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
      fill="none"
      stroke={onGreen ? "#f4f2ec" : "#1f5c46"}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8.5l3.5 3.5L13.5 4" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-y border-[#e2ded2] bg-white"
    >
      <div className={`${container} py-20 sm:py-24 lg:py-28`}>
        <Reveal>
          <SectionHeading
            center
            eyebrow="Pricing"
            title="Fixed fees. No surprises. Ever."
            sub="One monthly fee, agreed before any work starts. If your needs change, the fee changes first and you approve it."
          />
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 md:mt-16 lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} className="h-full" delay={i * 90}>
              <div
                className={
                  tier.featured
                    ? "relative flex h-full flex-col rounded-2xl bg-[#1f5c46] p-8 text-white shadow-[0_36px_70px_-40px_rgba(31,92,70,0.6)]"
                    : "flex h-full flex-col rounded-2xl border border-[#e2ded2] bg-[#f4f2ec] p-8"
                }
              >
                {tier.featured ? (
                  <span className="absolute right-6 top-6 rounded-full bg-white/15 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white">
                    Most popular
                  </span>
                ) : null}

                <h3
                  className={`${display} text-xl font-medium tracking-tight`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    tier.featured ? "text-white/80" : "text-[#565f59]"
                  }`}
                >
                  {tier.audience}
                </p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span
                    className={`text-sm ${
                      tier.featured ? "text-white/80" : "text-[#565f59]"
                    }`}
                  >
                    from
                  </span>
                  <span
                    className={`${display} text-4xl font-medium tracking-tight`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-sm ${
                      tier.featured ? "text-white/80" : "text-[#565f59]"
                    }`}
                  >
                    /mo
                  </span>
                </p>

                <ul
                  className={`mt-6 space-y-3 border-t pt-6 text-sm leading-relaxed ${
                    tier.featured
                      ? "border-white/20 text-white/90"
                      : "border-[#e2ded2] text-[#565f59]"
                  }`}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check onGreen={tier.featured} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-1 items-end">
                  <a
                    href="#contact"
                    className={
                      tier.featured
                        ? `inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#f4f2ec] px-6 py-2.5 text-sm font-semibold text-[#15201c] transition-colors duration-200 hover:bg-white ${focusRingOnGreen}`
                        : `inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#1f5c46]/35 px-6 py-2.5 text-sm font-semibold text-[#1f5c46] transition-colors duration-200 hover:bg-[#1f5c46] hover:text-white ${focusRing}`
                    }
                  >
                    Book a consultation
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-3 text-center text-sm text-[#565f59]">
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 shrink-0"
            aria-hidden="true"
            fill="none"
            stroke="#b08d57"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8.5l3.5 3.5L13.5 4" />
          </svg>
          Every plan: 48 hr response guarantee, unlimited questions.
        </p>
      </div>
    </section>
  );
}
