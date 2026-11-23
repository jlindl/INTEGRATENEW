import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import type { CSSProperties, ReactNode } from "react";
import { CookieSettingsLink } from "@/components/analytics/CookieBanner";
import { LeadForm } from "@/components/black-friday/LeadForm";
import { OfferGate } from "@/components/black-friday/OfferGate";
import { RevealObserver } from "@/components/black-friday/RevealObserver";
import { Countdown, TopBar } from "@/components/black-friday/TopBar";
import { BrowserFrame, HeroVisual, IMG, LocalCard, Phone, Story } from "@/components/black-friday/Visuals";
import { JsonLd } from "@/components/seo/JsonLd";
import { StickyCta } from "@/components/trades/StickyCta";
import { LogoMark } from "@/components/ui/LogoMark";
import {
  AGENCY,
  DEADLINE_ISO,
  DEADLINE_MS,
  EXAMPLE,
  INCLUDED,
  PAGE_PATH,
  PRICE_MONTHLY,
  PRICE_VALID_UNTIL,
  SPOTS_REMAINING,
  TOTAL_SPOTS,
  WAS_PRICE,
  offerState,
  spotsLabel,
  type OfferState,
} from "@/lib/blackFriday";
import { LEGAL_DOCS } from "@/lib/legalData";
import { ORG_ID, organizationGraph } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import "./black-friday.css";

/**
 * /black-friday: the Black Friday 2026 offer page.
 *
 * Every fact comes from lib/blackFriday.ts. The page is rendered on the
 * server for every request, so whether the offer is live is decided by
 * server time, not the visitor's clock. After 23:59 on 30 November 2026
 * (London), or once SPOTS_REMAINING is 0, it shows the ended state instead:
 * no price, countdown, spots or form. If the deadline passes while the page
 * is open, OfferGate makes the same switch in the browser.
 *
 * Copy rules: British English, no em dashes, no exclamation marks, and
 * nothing that isn't true. No testimonials, ratings, client counts or results.
 */

export const dynamic = "force-dynamic";

/* Headlines are Instrument Sans with one accent phrase in Fraunces italic,
   the same 15 kB subset the homepage loads. */
const frauncesItalic = localFont({
  src: "../../assets/fonts/fraunces/fraunces-film-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-fraunces-film-italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/* Indexing is only allowed on the production deployment, as on the homepage. */
const isProduction = process.env.VERCEL_ENV === "production";

const TITLE = `Black Friday: Website, SEO + 30 Stories for £${PRICE_MONTHLY}/month | Integrate`;
const DESCRIPTION = `A custom website, full SEO and 30 ready-to-post stories a month for £${PRICE_MONTHLY}, all in. No contract and no upfront build fee. See a free demo of your new site first.`;
const ENDED_TITLE = "Our Black Friday offer has ended | Integrate";
const ENDED_DESCRIPTION = "Our Black Friday offer has ended. Book a free call to see what we can do for you.";

export async function generateMetadata(): Promise<Metadata> {
  const live = offerState(Date.now()) === "live";
  const title = live ? TITLE : ENDED_TITLE;
  const description = live ? DESCRIPTION : ENDED_DESCRIPTION;
  return {
    title,
    description,
    alternates: { canonical: PAGE_PATH },
    openGraph: { title, description, url: PAGE_PATH, type: "website", siteName: "Integrate", locale: "en_GB" },
    twitter: { card: "summary_large_image", title, description },
    robots: isProduction ? undefined : { index: false, follow: false },
  };
}

/** Offer structured data, only while the offer is live. */
function offerGraph() {
  const url = absoluteUrl(PAGE_PATH);
  const org = organizationGraph()["@graph"];
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...org,
      {
        "@type": "Offer",
        "@id": `${url}#offer`,
        name: "Black Friday: website, full SEO and 30 stories a month",
        description: DESCRIPTION,
        url,
        price: PRICE_MONTHLY.toFixed(2),
        priceCurrency: "GBP",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: PRICE_MONTHLY.toFixed(2),
          priceCurrency: "GBP",
          unitCode: "MON",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
        priceValidUntil: PRICE_VALID_UNTIL,
        validThrough: DEADLINE_ISO,
        availability: "https://schema.org/LimitedAvailability",
        inventoryLevel: { "@type": "QuantitativeValue", value: SPOTS_REMAINING },
        eligibleRegion: { "@type": "Country", name: "United Kingdom" },
        seller: { "@id": ORG_ID },
        itemOffered: {
          "@type": "Service",
          name: "Custom website, full SEO and 30 social media stories a month",
          serviceType: "Web design, SEO and social media content",
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "Country", name: "United Kingdom" },
        },
      },
    ],
  };
}

/* ------------------------------------------------------------------ Copy */

const STEPS: { n: string; lines: string[] }[] = [
  { n: "01", lines: ["Book a free call."] },
  { n: "02", lines: ["We build a demo of your new website and show it to you."] },
  { n: "03", lines: [`Love it? Go live for £${PRICE_MONTHLY} a month.`, "Don't? You owe nothing."] },
];

const FAQS = [
  {
    q: "What's the catch?",
    a: "There isn't one. There's no contract, you can cancel anytime, and you see the demo before you pay anything.",
  },
  {
    q: "What happens if I cancel?",
    a: "The site comes down, or you can buy it outright for £995. Under our client agreement, Integrate owns the site while you're subscribed.",
  },
  {
    q: "How long until my site is live?",
    a: "Your site goes live 14 days from sign-off.",
  },
  // TODO(VAT): "Is VAT included?" is waiting for Jack to confirm. Show
  // nothing about VAT on the page until then, then add the answer here.
  {
    q: "What kind of businesses is this for?",
    a: "Any UK business that wants a proper website and a steady social presence.",
  },
];

const REASSURE = ["You see the demo before you pay anything.", "No contract. Cancel anytime.", "No upfront build fee."];

/* ---------------------------------------------------------------- Styles */

const eyebrow = "font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3";
const h2 = "mt-3 text-balance text-[clamp(2rem,5.6vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.05em] text-ink";
const wrap = "mx-auto max-w-6xl px-5 sm:px-8";

const Tick = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden="true">
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);

/** A block that eases in as it scrolls into view (see RevealObserver). */
function R({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: "div" | "li" | "figure";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`bf-reveal ${className}`} style={delay ? ({ "--bf-d": `${delay}s` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}

function CtaButton({ tone = "dark", id, className = "" }: { tone?: "dark" | "silver"; id?: string; className?: string }) {
  const look =
    tone === "dark"
      ? "bg-carbon text-ivory shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_14px_34px_-14px_rgba(10,10,12,0.7)]"
      : "bf-btn--silver";
  return (
    <a
      id={id}
      href="#book"
      className={`bf-btn group inline-flex min-h-[3.4rem] items-center justify-center gap-2.5 rounded-full px-7 py-4 text-base font-semibold transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${look} ${className}`}
    >
      Book a free website demo
      <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

/** "Usually £1,000/mo", only when WAS_PRICE is set. */
function WasPrice({ className = "" }: { className?: string }) {
  if (!WAS_PRICE) return null;
  return (
    <p className={`font-mono text-[0.82rem] text-mist ${className}`}>
      Usually <s className="bf-strike">{WAS_PRICE}</s>
    </p>
  );
}

function PriceBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.4rem] bg-carbon p-5 text-ivory shadow-[0_1px_0_rgba(255,255,255,0.07)_inset,0_2px_4px_rgba(10,10,12,0.1),0_24px_50px_-20px_rgba(10,10,12,0.55)] sm:p-6 ${className}`}
    >
      <span className="silver-sheen absolute inset-x-0 top-0 h-px opacity-60" aria-hidden="true" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-halo">Black Friday price</p>
        <WasPrice />
      </div>
      <p className="mt-2 flex items-baseline gap-1.5 font-mono">
        <span className="text-[clamp(2.9rem,10vw,3.75rem)] font-medium leading-none tracking-[-0.06em]">£{PRICE_MONTHLY}</span>
        <span className="text-[1rem] text-mist">/month</span>
      </p>
      <p className="mt-3 text-[1rem] font-medium">No contract. Cancel anytime.</p>
      <p className="mt-0.5 text-[0.88rem] text-mist">All in. No upfront build fee.</p>
    </div>
  );
}

function Header({ live }: { live: boolean }) {
  return (
    <header className={`${wrap} flex items-center justify-between pt-5 sm:pt-7`}>
      <Link href="/" prefetch={false} className="inline-flex min-h-11 items-center gap-2.5">
        <LogoMark className="h-7 w-7" />
        <span className="text-lg font-semibold tracking-[-0.03em] text-ink">Integrate</span>
      </Link>
      {live ? (
        <a
          href="#book"
          className="inline-flex min-h-10 items-center rounded-full border border-line-2 bg-card/70 px-4 text-[0.88rem] font-medium text-ink transition-colors hover:border-ink"
        >
          Free website demo
        </a>
      ) : null}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className={`${wrap} pb-28 pt-8 text-center lg:pb-12`}>
      <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5">
        {LEGAL_DOCS.map((doc) => (
          <a key={doc.slug} href={`/legal/${doc.slug}`} className="inline-block py-2.5 text-[0.78rem] text-ink-3 transition-colors duration-300 hover:text-ink sm:py-1">
            {doc.label}
          </a>
        ))}
        <CookieSettingsLink className="inline-block py-2.5 text-[0.78rem] text-ink-3 transition-colors duration-300 hover:text-ink sm:py-1" />
      </nav>
      <p className="mt-3 font-mono text-[0.7rem] text-ink-3">© 2026 Integrate AI Solutions Limited</p>
    </footer>
  );
}

/* -------------------------------------------------------------- Sections */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className={`${wrap} pb-16 pt-8 sm:pt-12 lg:pb-24 lg:pt-14`}>
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <div>
          <p className={eyebrow}>Black Friday offer</p>
          <h1 id="hero-title" className="mt-4 text-balance text-[clamp(2.4rem,7.6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
            A new website, full SEO and <span className="bf-em sm:whitespace-nowrap">30 stories a month.</span>
          </h1>
          <PriceBlock className="mt-7 max-w-[30rem]" />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <CtaButton id="hero-cta" />
            <a
              href="#included"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 text-[0.98rem] font-medium text-ink underline decoration-line-2 underline-offset-[6px] transition-colors hover:decoration-ink sm:justify-start"
            >
              See what&apos;s included
            </a>
          </div>
          <p className="mt-5 max-w-[46ch] text-[0.98rem] leading-relaxed text-ink-2">
            Free website demo: we build a demo of your new site and show it to you on a call, before you pay anything.
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

const CARDS: { title: string; bullets: readonly string[]; agency: string; unit: string; wide?: boolean; visual: ReactNode }[] = [
  {
    title: "Website",
    bullets: INCLUDED.website,
    agency: AGENCY.website,
    unit: "upfront",
    visual: (
      <div className="absolute inset-x-5 top-6 sm:inset-x-6 sm:top-7">
        <BrowserFrame sizes="(min-width: 768px) 22rem, 90vw" />
      </div>
    ),
  },
  {
    title: "Full SEO",
    bullets: INCLUDED.seo,
    agency: AGENCY.seo,
    unit: "a month",
    visual: (
      <div className="absolute inset-0 grid place-items-center p-4">
        <LocalCard className="w-full max-w-[16rem]" />
      </div>
    ),
  },
  {
    title: "30 stories a month",
    bullets: INCLUDED.stories,
    agency: AGENCY.social,
    unit: "a month",
    wide: true,
    visual: (
      <div className="absolute inset-0 flex items-center justify-center gap-2.5 px-6">
        {IMG.stories.map((src, i) => (
          <Story key={src} src={src} n={i + 1} className={`relative w-[30%] max-w-[7.5rem] ${i === 1 ? "-translate-y-2" : "translate-y-2"}`} />
        ))}
      </div>
    ),
  },
];

function Included() {
  return (
    <section id="included" aria-labelledby="included-title" className={`${wrap} scroll-mt-20 py-16 lg:scroll-mt-6 lg:py-24`}>
      <R className="max-w-2xl">
        <p className={eyebrow}>What you get</p>
        <h2 id="included-title" className={h2}>
          Three things done for you, <span className="bf-em">one price.</span>
        </h2>
        <p className="mt-5 max-w-[50ch] leading-relaxed text-ink-2">
          All three for £{PRICE_MONTHLY} a month, all in. The examples are our work for {EXAMPLE.name}.
        </p>
      </R>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <R
            key={c.title}
            delay={0.06 * i}
            className={`${c.wide ? "md:col-span-2 lg:col-span-1" : ""} flex flex-col rounded-[1.4rem] border border-line bg-card p-2.5 shadow-lift transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-float motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
          >
            <div className={`relative overflow-hidden rounded-[1.05rem] bg-paper-2 ${c.wide ? "aspect-[5/4] md:aspect-[5/2] lg:aspect-[5/4]" : "aspect-[5/4]"}`}>
              {c.visual}
            </div>
            <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
              <h3 className="text-[1.4rem] font-bold tracking-[-0.035em] text-ink">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.97rem] leading-snug text-ink-2">
                    <Tick className="mt-px text-ink" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
                  <p className="font-mono text-[0.8rem] text-ink-3">
                    Agencies: <s className="bf-strike">{c.agency}</s> {c.unit}
                  </p>
                  <p className="rounded-full bg-carbon px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ivory">Included</p>
                </div>
              </div>
            </div>
          </R>
        ))}
      </div>
    </section>
  );
}

const COMPARE_ROWS = [
  { item: "Website", agency: AGENCY.website, unit: "upfront" },
  { item: "SEO", agency: AGENCY.seo, unit: "a month" },
  { item: "30 stories", agency: AGENCY.social, unit: "a month" },
];

function Compare() {
  const cell = "px-3 py-4 align-top sm:px-6 sm:py-5";
  const dark = "bg-carbon text-ivory";
  return (
    <section id="compare" aria-labelledby="compare-title" className={`${wrap} py-16 lg:py-24`}>
      <R className="max-w-2xl">
        <p className={eyebrow}>The comparison</p>
        <h2 id="compare-title" className={h2}>
          What it costs at <span className="bf-em">a typical agency.</span>
        </h2>
      </R>
      <R delay={0.08}>
        <div className="mt-10 overflow-hidden rounded-[1.4rem] border border-line bg-card shadow-lift">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">Typical UK agency prices compared with the Integrate Black Friday offer</caption>
            <colgroup>
              <col className="w-[29%] sm:w-[34%]" />
              <col className="w-[36%] sm:w-[33%]" />
              <col className="w-[35%] sm:w-[33%]" />
            </colgroup>
            <thead>
              <tr>
                <td className={cell} />
                <th scope="col" className={`${cell} font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-ink-3 sm:text-[0.7rem]`}>
                  Typical UK agency
                </th>
                <th scope="col" className={`${cell} ${dark} font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-halo sm:text-[0.7rem]`}>
                  Integrate
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((r) => (
                <tr key={r.item} className="border-t border-line">
                  <th scope="row" className={`${cell} text-[0.95rem] font-semibold leading-snug text-ink sm:text-[1.02rem]`}>
                    {r.item}
                  </th>
                  <td className={`${cell} text-[0.92rem] leading-snug text-ink-3 sm:text-[0.98rem]`}>
                    <s className="bf-strike font-mono">{r.agency}</s> <span className="whitespace-nowrap">{r.unit}</span>
                  </td>
                  <td className={`${cell} ${dark} border-t border-graphite text-[0.92rem] font-medium sm:text-[0.98rem]`}>
                    <span className="inline-flex items-center gap-2">
                      <Tick className="text-halo" />
                      Included
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink">
                <th scope="row" className={`${cell} text-[0.95rem] font-bold text-ink sm:text-[1.02rem]`}>
                  Total
                </th>
                <td className={`${cell} text-[0.88rem] leading-snug text-ink-3 sm:text-[0.98rem]`}>
                  <s className="bf-strike font-mono">{AGENCY.upfrontTotal}</s> upfront
                  <span className="block">
                    plus <s className="bf-strike font-mono">{AGENCY.monthlyTotal}</s> a month
                  </span>
                </td>
                <td className={`${cell} ${dark} border-t-2 border-graphite`}>
                  <span className="block font-mono text-[1.15rem] font-medium sm:text-[1.25rem]">
                    £{PRICE_MONTHLY}{" "}
                    <span className="block text-[0.8rem] font-normal text-mist sm:inline sm:text-[0.9rem]">a month</span>
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.85rem] text-halo sm:text-[0.95rem]">£0 upfront</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-4 max-w-[70ch] text-[0.8rem] leading-relaxed text-ink-3">Source: {AGENCY.source}</p>
      </R>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className={`${wrap} py-16 lg:py-20`}>
      <R className="max-w-2xl">
        <p className={eyebrow}>How it works</p>
        <h2 id="how-title" className={h2}>
          See it first, <span className="bf-em">then decide.</span>
        </h2>
      </R>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <R
            as="li"
            key={s.n}
            delay={0.06 * i}
            className="rounded-[1.4rem] border border-line bg-card p-6 shadow-lift transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-float motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
          >
            <span className="font-mono text-[0.72rem] tracking-[0.14em] text-ink-3">{s.n}</span>
            {s.lines.map((line, j) => (
              <p key={line} className={`text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-ink ${j === 0 ? "mt-5 sm:mt-8" : "mt-1 text-ink-2"}`}>
                {line}
              </p>
            ))}
          </R>
        ))}
      </ol>
    </section>
  );
}

function Reassure({ className = "" }: { className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {REASSURE.map((r) => (
        <li key={r} className="flex gap-3 leading-relaxed text-ink-2">
          <Tick className="mt-1 text-ink" />
          {r}
        </li>
      ))}
    </ul>
  );
}

function Book() {
  return (
    <section id="book" aria-labelledby="book-title" className={`${wrap} scroll-mt-16 py-16 lg:scroll-mt-4 lg:py-20`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="lg:pt-4">
          <p className={eyebrow}>Free website demo</p>
          <h2 id="book-title" className={h2}>
            Book your free <span className="bf-em">website demo.</span>
          </h2>
          <p className="mt-5 max-w-[44ch] leading-relaxed text-ink-2">
            Tell us about your business. We&apos;ll call you to book a time, then show you a demo of your new site on the call.
          </p>
          <Reassure className="mt-7 hidden lg:block" />
          <p className="mt-7 hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3 lg:block">
            {spotsLabel()} · Ends Cyber Monday 30.11
          </p>
        </div>
        <div>
          <LeadForm />
          <Reassure className="mt-7 lg:hidden" />
        </div>
      </div>
    </section>
  );
}

function Example() {
  const caption = "mt-5 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist";
  return (
    <section id="example" aria-labelledby="example-title" className="px-3 py-8 sm:px-5">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-carbon px-5 py-14 text-ivory sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
            <R>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-halo">Example of our work</p>
              <h2 id="example-title" className="mt-3 text-balance text-[clamp(2rem,5.6vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.05em]">
                {EXAMPLE.name}, <span className="bf-em">Birmingham.</span>
              </h2>
            </R>
            <R delay={0.06}>
              <p className="max-w-[46ch] leading-relaxed text-mist">
                A {EXAMPLE.kind}. Their website, SEO and stories are all done by Integrate.
              </p>
              <a
                href={EXAMPLE.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-medium text-ivory underline decoration-graphite-2 underline-offset-[6px] transition-colors hover:decoration-halo"
              >
                Visit {EXAMPLE.domain}
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </R>
          </div>

          <div className="mt-12 grid items-end gap-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10">
            <R as="figure">
              <Phone className="relative mx-auto w-[12.5rem]" sizes="12.5rem" />
              <figcaption className={caption}>The website</figcaption>
            </R>
            <R as="figure" delay={0.06}>
              <LocalCard className="mx-auto w-full max-w-[19rem]" />
              <figcaption className={caption}>The map listing</figcaption>
            </R>
            <R as="figure" delay={0.12} className="sm:col-span-2 lg:col-span-1">
              <div className="mx-auto flex max-w-[22rem] items-end justify-center gap-2.5">
                {IMG.stories.map((src, i) => (
                  <Story key={src} src={src} n={i + 1} className={`relative w-[31%] ${i === 1 ? "-translate-y-3" : ""}`} />
                ))}
              </div>
              <figcaption className={caption}>The stories</figcaption>
            </R>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={`${wrap} py-16 lg:py-24`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <R className="self-start lg:sticky lg:top-8">
          <p className={eyebrow}>Questions</p>
          <h2 id="faq-title" className={h2}>
            Before you <span className="bf-em">book.</span>
          </h2>
          <p className="mt-5 max-w-[40ch] leading-relaxed text-ink-2">Anything else, ask us on the call. It&apos;s free.</p>
        </R>
        <R delay={0.08}>
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[1.04rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-3 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 pr-10 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </R>
      </div>
    </section>
  );
}

function FinalBand() {
  const spots = SPOTS_REMAINING === 1 ? "Only 1 spot." : `Only ${SPOTS_REMAINING} spots.`;
  return (
    <section id="final-cta" aria-labelledby="final-title" className="px-3 pb-8 pt-4 sm:px-5">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-carbon px-6 py-16 text-center text-ivory sm:py-20">
        <R>
          <h2 id="final-title" className="mx-auto max-w-[16ch] text-balance text-[clamp(2.2rem,6.6vw,4.2rem)] font-bold leading-[0.96] tracking-[-0.05em]">
            {spots} <span className="bf-em">Ends Cyber Monday.</span>
          </h2>
          <div className="mt-8 flex flex-col items-center">
            <WasPrice />
            <p className="mt-1 flex items-baseline gap-1.5 font-mono">
              <span className="text-[clamp(2.9rem,9vw,3.6rem)] font-medium leading-none tracking-[-0.06em]">£{PRICE_MONTHLY}</span>
              <span className="text-mist">/month</span>
            </p>
            <p className="mt-3 font-medium">No contract. Cancel anytime.</p>
          </div>
          <CtaButton tone="silver" className="mt-8" />
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist">
            Ends in <Countdown />
          </p>
        </R>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Pages */

function LivePage() {
  return (
    <>
      <JsonLd data={offerGraph()} />
      <TopBar />
      <Header live />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <Included />
        <Compare />
        <HowItWorks />
        <Book />
        <Example />
        <Faq />
        <FinalBand />
      </main>
      <SiteFooter />
      <RevealObserver />
      <StickyCta
        href="#book"
        label="Book a free website demo"
        note={`· £${PRICE_MONTHLY}/mo`}
        watch={["hero-cta", "book", "final-cta"]}
        buttonClassName="bg-carbon text-ivory"
        noteClassName="text-ivory/60"
      />
    </>
  );
}

/** Shown after the deadline or once every spot has gone. No price, countdown, spots or form. */
function EndedPage({ state }: { state: Exclude<OfferState, "live"> }) {
  return (
    <>
      <Header live={false} />
      <main id="main" className={`${wrap} pb-16 pt-16 sm:pt-24 lg:pb-24`}>
        <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-line bg-card px-6 py-12 text-center shadow-lift sm:px-12 sm:py-16">
          <p className={eyebrow}>Black Friday</p>
          <h1 className="mt-4 text-balance text-[clamp(2.1rem,6vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.05em] text-ink">
            {state === "sold-out" ? (
              <>
                All {TOTAL_SPOTS} spots <span className="bf-em">have gone.</span>
              </>
            ) : (
              <>
                Our Black Friday offer <span className="bf-em">has ended.</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-[40ch] text-[1.06rem] leading-relaxed text-ink-2">
            Book a free call to see what we can do for you.
          </p>
          <Link
            href="/contact#book"
            className="bf-btn group mt-8 inline-flex min-h-[3.4rem] items-center justify-center gap-2.5 rounded-full bg-carbon px-7 py-4 text-base font-semibold text-ivory transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
          >
            Book a free call
            <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export default function BlackFridayPage() {
  // Server time decides the state. OfferGate keeps counting from it.
  const now = Date.now();
  const state = offerState(now);

  return (
    <div className={frauncesItalic.variable}>
      {state === "live" ? (
        <OfferGate serverNow={now} deadline={DEADLINE_MS} ended={<EndedPage state="ended" />}>
          <LivePage />
        </OfferGate>
      ) : (
        <EndedPage state={state} />
      )}
    </div>
  );
}
