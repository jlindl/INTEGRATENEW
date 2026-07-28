import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/web-design/interactions/MagneticLink";
import { ContactBand } from "@/components/web-design/ContactBand";

/**
 * Pricing — a clear, honest breakdown of what a website costs: a from-£200
 * one-off build fee plus a flat £30/month that covers hosting and up to 30
 * minutes of edits. Apps, portals and integrated/complex builds are quoted per
 * project. Lives inside the (hub) group, so it inherits the dark nav + footer.
 */
export const metadata: Metadata = {
  title: "Pricing | Integrate Web Design",
  description:
    "Websites from a £200 build fee plus £30/month. Hosting and up to 30 minutes of edits included. Apps, portals and integrated systems are quoted per project.",
};

function Check() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-halo/15 text-halo"
    >
      <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
    </span>
  );
}

const buildIncludes = [
  "A design built around how your business actually sells",
  "Works properly on phones, and loads quickly",
  "A hand with the words and layout so it reads well from day one",
  "Set up, launched, and handed over ready to go",
];

const monthlyIncludes = [
  "Fast, secure hosting, with SSL, backups and updates included",
  "Up to 30 minutes of edits every month",
  "Small changes done for you: new hours, prices, photos, text",
  "Someone on hand when something needs updating",
];

type Tier = { title: string; blurb: string; icon: React.ReactNode };

const TIERS: Tier[] = [
  {
    title: "Mobile apps",
    blurb:
      "Native iOS & Android or installable web apps for ordering, loyalty, booking and live tracking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M10.5 18.5h3" />
      </svg>
    ),
  },
  {
    title: "Client portals",
    blurb:
      "Secure logins, dashboards, documents and payments for your customers or your team.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M8 4v5" />
      </svg>
    ),
  },
  {
    title: "Integrated systems & complex sites",
    blurb:
      "Bookings, CRMs, stock, payments and automations wired together into one place.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M8 7.5 10.5 16M16 7.5 13.5 16M8.5 6h7" />
      </svg>
    ),
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="pricing-heading" className="relative overflow-hidden pt-24 md:pt-28">
        <div className="glow-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <Reveal as="p" className="eyebrow text-halo-dim">
              Pricing
            </Reveal>
            <Reveal as="h1" delay={0.05}>
              <span
                id="pricing-heading"
                className="mt-6 block font-display-tuned text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.03] tracking-tight text-ivory"
              >
                Honest pricing, no surprises.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 max-w-[56ch] text-lg leading-relaxed text-mist md:text-xl">
              Most businesses don&apos;t need a five-figure website. They need one
              that looks the part, works on every phone, and stays looked-after.
              Here&apos;s exactly what that costs.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Standard plan */}
      <section className="relative py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.8rem] border border-graphite bg-carbon-2/60 p-8 md:p-12">
              <div className="glow-halo pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

              <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
                {/* Price */}
                <div>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-halo-dim">
                    The standard website
                  </p>
                  <div className="mt-5 flex items-end gap-3">
                    <span className="font-display-tuned text-[3.4rem] font-medium leading-none text-ivory">
                      £200
                    </span>
                    <span className="pb-1.5 text-mist">
                      from, one-off <span className="text-mist-2">build fee</span>
                    </span>
                  </div>
                  <div className="mt-4 inline-flex items-baseline gap-2 rounded-full border border-graphite-2 px-4 py-2">
                    <span className="text-xl font-semibold text-halo">£30</span>
                    <span className="text-[0.9rem] text-mist">/ month thereafter</span>
                  </div>

                  <p className="mt-6 max-w-[42ch] leading-relaxed text-mist">
                    A website built around your business, then hosted and looked
                    after for a flat monthly fee. No big bill upfront, and no
                    surprise invoices later.
                  </p>

                  <MagneticLink
                    href="/#book-call"
                    className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-halo px-7 py-3.5 text-base font-semibold text-carbon transition-colors duration-300 hover:bg-ivory"
                  >
                    Book a call
                    <span aria-hidden="true" className="transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                      →
                    </span>
                  </MagneticLink>
                </div>

                {/* What's included */}
                <div className="grid gap-8 sm:grid-cols-2 lg:border-l lg:border-graphite lg:pl-14">
                  <div>
                    <p className="text-[0.95rem] font-semibold text-ivory">
                      The one-off build
                      <span className="ml-2 font-mono text-[0.7rem] font-normal uppercase tracking-[0.12em] text-mist-2">
                        from £200
                      </span>
                    </p>
                    <ul className="mt-4 flex flex-col gap-3.5">
                      {buildIncludes.map((f) => (
                        <li key={f} className="flex gap-3 text-[0.92rem] leading-snug text-mist">
                          <Check />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-ivory">
                      Then £30 / month
                      <span className="ml-2 font-mono text-[0.7rem] font-normal uppercase tracking-[0.12em] text-halo-dim">
                        includes
                      </span>
                    </p>
                    <ul className="mt-4 flex flex-col gap-3.5">
                      {monthlyIncludes.map((f) => (
                        <li key={f} className="flex gap-3 text-[0.92rem] leading-snug text-mist">
                          <Check />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal as="p" delay={0.08} className="mx-auto mt-6 max-w-[62ch] text-center text-sm leading-relaxed text-mist-2">
            The £200 is a starting point; the exact build fee depends on how many
            pages and features you need. Anything beyond the 30 monthly minutes is
            always quoted up front, so there are never surprise charges.
          </Reveal>
        </div>
      </section>

      {/* Beyond the standard build */}
      <section aria-labelledby="beyond-heading" className="relative py-16 md:py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <Reveal as="p" className="eyebrow text-halo-dim">
              Bigger builds
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              <span
                id="beyond-heading"
                className="mt-4 block font-display-tuned text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.06] text-ivory"
              >
                Need more than a website?
              </span>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-5 max-w-[54ch] text-lg leading-relaxed text-mist">
              Anything with real functionality we quote per project, but it works
              the same way: a fair one-off fee, then a monthly plan to keep it
              running. These start higher than a standard website.
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal key={t.title} delay={0.08 * i}>
                <div className="flex h-full flex-col rounded-2xl border border-graphite bg-carbon-2/50 p-7 transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] hover:border-graphite-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-graphite bg-carbon text-halo">
                    <span className="h-5 w-5">{t.icon}</span>
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ivory">{t.title}</h3>
                  <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-mist">{t.blurb}</p>
                  <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist-2">
                    Quoted per project
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="p" delay={0.1} className="mt-8 max-w-[62ch] text-sm leading-relaxed text-mist-2">
            Not sure which of these you need? That&apos;s what the call is for. Tell
            us what you&apos;re trying to do and we&apos;ll give you a clear number.
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
