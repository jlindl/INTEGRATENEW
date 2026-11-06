import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { BookCallForm } from "@/components/sections/BookCallForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LinkIcon } from "@/components/tap/LinkIcon";
import { TapDemo } from "@/components/review-plates/TapDemo";
import { ORG_ID } from "@/lib/schema";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import type { LinkKind } from "@/lib/tap/types";

/**
 * /review-plates: the public, indexable page for Integrate Tap. Every hosted
 * business page (/b/SLUG) and every Tap page footer links here. The Tap tool
 * itself (/tap, /t, /b) is noindex and blocked in robots.txt, so this is the
 * page that can rank.
 *
 * Copy sticks to what the product does today (spec/tap-plates.md): no
 * invented stats, prices, ratings or customers. The CTA is the same call-back
 * form as /contact, sent with the interest "Review plates" so plate enquiries
 * get their own tag in GHL alongside the usual booking tag.
 */

const PATH = "/review-plates";
const TITLE = "NFC Google review plates for UK businesses | Integrate";
const DESCRIPTION =
  "NFC review plates for UK businesses. Customers tap with their phone and land on your Google reviews. Set up in a minute, no app needed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "Integrate Tap: Google reviews, one tap away",
    description: DESCRIPTION,
    url: PATH,
    siteName: "Integrate",
    locale: "en_GB",
  },
};

/* 07765 977085 in international WhatsApp format, same number as /contact. */
const WHATSAPP_HREF =
  "https://wa.me/447765977085?text=" +
  encodeURIComponent("Hi Integrate, I'd like review plates for my business.");

/* ------------------------------------------------------------- content -- */

const STEPS: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Tap the plate",
    body: "Hold your phone near the plate and setup opens by itself. There's no app to download and no code to type.",
    icon: <NfcIcon />,
  },
  {
    title: "Add your details",
    body: "Your business name, your Google review link and a password. That's it: the plate is now yours.",
    icon: <FormIcon />,
  },
  {
    title: "Choose where taps go",
    body: "Straight to your Google review form, or to your own page with your review button first and your other links underneath.",
    icon: <SplitIcon />,
  },
  {
    title: "Change it any time",
    body: "Log in from any phone to update your links or switch modes. The plate itself never needs reprogramming.",
    icon: <RefreshIcon />,
  },
];

/* Every link type the dashboard supports (lib/tap/links.ts), with page-friendly names. */
const LINK_TYPES: { kind: LinkKind; label: string }[] = [
  { kind: "google", label: "Google reviews" },
  { kind: "tripadvisor", label: "Tripadvisor" },
  { kind: "instagram", label: "Instagram" },
  { kind: "tiktok", label: "TikTok" },
  { kind: "facebook", label: "Facebook" },
  { kind: "whatsapp", label: "WhatsApp" },
  { kind: "website", label: "Website" },
  { kind: "booking", label: "Booking link" },
  { kind: "menu", label: "Menu" },
  { kind: "custom", label: "Any other link" },
];

const AUDIENCES: { title: string; body: string; links: string[]; icon: ReactNode }[] = [
  {
    title: "Cafés and restaurants",
    body: "By the till or on each table, so people can tap while they wait for the bill.",
    links: ["Google reviews", "Menu", "Instagram"],
    icon: <CupIcon />,
  },
  {
    title: "Salons and barbers",
    body: "On the front desk or at each chair, ready for a review on the way out.",
    links: ["Google reviews", "Booking link", "Instagram"],
    icon: <ScissorsIcon />,
  },
  {
    title: "Trades",
    body: "Keep one in the van. When the job is finished, hold it out and the customer taps.",
    links: ["Google reviews", "WhatsApp", "Website"],
    icon: <VanIcon />,
  },
  {
    title: "Shops, gyms and B&Bs",
    body: "At the counter, on reception or by the door, wherever customers pause for a moment.",
    links: ["Google reviews", "Tripadvisor", "Website"],
    icon: <ShopIcon />,
  },
];

const DETAILS: { title: string; body: string }[] = [
  {
    title: "No app for anyone",
    body: "Customers just hold their phone near the plate. You manage everything from a web page on your phone.",
  },
  {
    title: "Nothing to charge",
    body: "The chip inside is powered by the phone that taps it, so there's no battery, no cable and no wifi to set up.",
  },
  {
    title: "Change links any time",
    body: "Swap your review link, add a menu or switch modes in your dashboard. The plate keeps working the whole time.",
  },
  {
    title: "See how often it's tapped",
    body: "Every plate counts its taps, so you can see this week's number and the total so far.",
  },
  {
    title: "Several plates, one account",
    body: "Put one on every table, till or van. Name each plate, like Front desk, and see the taps for each.",
  },
  {
    title: "Lost a plate?",
    body: "Tell us and we'll switch it off, so it stops working. Your other plates carry on as normal.",
  },
];

/* Rendered on the page and in the FAQPage JSON-LD, so the two always match. */
const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an NFC review plate?",
    a: "A small plate with an NFC chip inside, the same technology phones use for contactless payments. When a customer holds their phone near it, a link opens. With Integrate Tap, that link takes them to your Google reviews or to your own page of links.",
  },
  {
    q: "Do my customers need an app?",
    a: "No. iPhones from the XS onwards and most Android phones read NFC without an app. The screen just needs to be on and unlocked.",
  },
  {
    q: "How long does setup take?",
    a: "About a minute. Tap the plate with your own phone and setup opens. Add your business name and Google review link, create a login, and the plate is live.",
  },
  {
    q: "Where do I find my Google review link?",
    a: "Search for your business on Google. On your Business Profile, tap Ask for reviews (sometimes called Share review form) and copy the link. You can paste it in during setup or add it later from your dashboard.",
  },
  {
    q: "Can I change where the plate goes later?",
    a: "Yes, as often as you like. Log in to change your links, or switch between going straight to your reviews and opening your own page. The plate itself never needs reprogramming.",
  },
  {
    q: "Can I have more than one plate?",
    a: "Yes. Tap each new plate with your phone while you're logged in and it joins the same account. You can give each plate a name and see its taps.",
  },
  {
    q: "Is it OK to ask customers for Google reviews?",
    a: "Yes. Google lets businesses ask their customers for reviews. Just don't offer anything in return, and ask every customer rather than only the ones you expect to be happy.",
  },
];

/* ---------------------------------------------------------- structured -- */

function pageGraph() {
  const url = absoluteUrl(PATH);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Integrate Tap NFC review plates",
        serviceType: "NFC review plates",
        description:
          "NFC review plates for UK businesses. A customer taps the plate with their phone and lands on the business's Google review form or its own page of links. The business sets it up from a phone in about a minute and can change where taps go at any time.",
        url,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "United Kingdom" },
        audience: { "@type": "BusinessAudience", audienceType: "Small and local businesses" },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Review plates", item: url },
        ],
      },
    ],
  };
}

/* ---------------------------------------------------------------- page -- */

export default function ReviewPlatesPage() {
  return (
    <>
      <JsonLd data={pageGraph()} />
      <Nav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <TapModes />
        <WhoItsFor />
        <Details />
        <Faq />
        <GetPlates />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------ sections -- */

const accentWord = "italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Reveal as="p" className="eyebrow flex items-center gap-3">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </Reveal>
  );
}

function Hero() {
  return (
    <section aria-labelledby="review-plates-heading" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow>NFC review plates</Eyebrow>
          <Reveal delay={0.08}>
            <h1
              id="review-plates-heading"
              className="font-display-tuned mt-6 text-[clamp(2.5rem,6.2vw,5.1rem)] font-medium leading-[1.03] text-ink"
            >
              Google reviews,{" "}
              <br />
              <span className={accentWord}>one tap away.</span>
            </h1>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-7 max-w-[48ch] text-lg leading-relaxed text-ink-2 md:text-xl">
            Integrate Tap review plates sit on your counter, your desk or in
            your van. A customer holds their phone near one and your Google
            review form opens. No app, no QR code to line up, nothing to type.
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#get-plates" variant="primary">
              Get review plates
            </MagneticButton>
            <MagneticButton href="#how-it-works" variant="secondary">
              See how it works
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.32} className="mt-10 border-t border-line pt-6">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.75rem] text-ink-3">
              {["Works with iPhone and Android", "Set up in a minute", "Change it any time"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 16 16"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-accent"
                  >
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <TapDemo />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="hairline-t bg-paper-2 py-20 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <Reveal delay={0.08}>
            <h2
              id="how-heading"
              className="font-display-tuned mt-6 text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.05] text-ink"
            >
              Set up in a minute. <span className={accentWord}>Change it whenever.</span>
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">
            Each plate carries its own permanent link. Where that link sends
            people is up to you, and you can change it from your phone.
          </Reveal>
        </div>

        <RevealGroup as="ol" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <RevealItem as="li" key={step.title} className="flex flex-col rounded-2xl bg-card p-7 hairline shadow-lift">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-tint text-accent-deep">
                  {step.icon}
                </span>
              </div>
              <h3 className="font-display-tuned mt-8 text-2xl font-medium leading-tight text-ink">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-2">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function TapModes() {
  return (
    <section aria-labelledby="modes-heading" className="py-20 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <Eyebrow>Where a tap goes</Eyebrow>
          <Reveal delay={0.08}>
            <h2
              id="modes-heading"
              className="font-display-tuned mt-6 text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.05] text-ink"
            >
              Straight to reviews, or <span className={accentWord}>your own page.</span>
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">
            Pick one in your dashboard and switch whenever you like. Every
            plate on your account follows the same choice.
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
          <RevealItem className="flex flex-col rounded-3xl bg-card p-6 hairline shadow-lift md:p-8">
            <div className="flex min-h-64 items-center justify-center rounded-2xl bg-paper-2 px-4 py-6 hairline">
              <ReviewFormSketch />
            </div>
            <p className="eyebrow mt-8">Option one</p>
            <h3 className="font-display-tuned mt-3 text-[1.75rem] font-medium leading-tight text-ink">
              Straight to your Google reviews
            </h3>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-ink-2">
              Every tap opens your Google review form, ready for a star rating
              and a few words. It&apos;s how a plate works when a review link
              is all you add.
            </p>
          </RevealItem>

          <RevealItem className="flex flex-col rounded-3xl bg-card p-6 hairline shadow-lift md:p-8">
            <div className="flex min-h-64 items-center justify-center rounded-2xl bg-paper-2 px-4 py-6 hairline sm:px-6">
              <ul className="flex max-w-[26rem] flex-wrap justify-center gap-2" aria-label="Links your page can show">
                {LINK_TYPES.map((l) => (
                  <li
                    key={l.kind}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-card py-1 pl-1 pr-3.5 shadow-hairline"
                  >
                    <LinkIcon kind={l.kind} size={28} />
                    <span className="text-[0.8rem] font-medium text-ink">{l.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="eyebrow mt-8">Option two</p>
            <h3 className="font-display-tuned mt-3 text-[1.75rem] font-medium leading-tight text-ink">
              Your own page of links
            </h3>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-ink-2">
              Your logo and a short line, with the review button first and
              biggest. Underneath goes anything else you want people to find,
              from Instagram to your booking link.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section aria-labelledby="who-heading" className="hairline-t bg-paper-2 py-20 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <Eyebrow>Who it&apos;s for</Eyebrow>
          <Reveal delay={0.08}>
            <h2
              id="who-heading"
              className="font-display-tuned mt-6 text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.05] text-ink"
            >
              For local businesses where <span className={accentWord}>reviews win work.</span>
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-2">
            If new customers read your Google reviews before they visit, call
            or book, a plate makes it easy for every customer to leave one
            while they&apos;re still with you.
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a) => (
            <RevealItem as="li" key={a.title} className="flex flex-col rounded-2xl bg-card p-7 hairline shadow-lift">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-tint text-accent-deep">
                {a.icon}
              </span>
              <h3 className="font-display-tuned mt-6 text-[1.4rem] font-medium leading-tight text-ink">{a.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-2">{a.body}</p>
              <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-3">Popular links</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {a.links.map((l) => (
                  <li key={l} className="hairline whitespace-nowrap rounded-full bg-paper px-3 py-1 font-mono text-[0.74rem] text-ink-2">
                    {l}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Details() {
  return (
    <section aria-labelledby="details-heading" className="py-20 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>The details</Eyebrow>
              <Reveal delay={0.08}>
                <h2
                  id="details-heading"
                  className="font-display-tuned mt-6 text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.05] text-ink"
                >
                  Simple for you.{" "}
                  <br />
                  <span className={accentWord}>Simpler for customers.</span>
                </h2>
              </Reveal>
              <Reveal as="p" delay={0.16} className="mt-6 max-w-[38ch] text-lg leading-relaxed text-ink-2">
                Everything runs from a web page on your phone, and the plate
                itself just sits there and works.
              </Reveal>
            </div>
          </div>

          <RevealGroup as="ul" className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8" staggerChildren={0.08}>
            {DETAILS.map((d) => (
              <RevealItem as="li" key={d.title} className="hairline-t py-8">
                <h3 className="font-display-tuned text-[1.45rem] font-medium leading-tight text-ink">{d.title}</h3>
                <p className="mt-3 max-w-[40ch] leading-relaxed text-ink-2">{d.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="hairline-t bg-paper-2 py-20 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <Reveal delay={0.08}>
              <h2
                id="faq-heading"
                className="font-display-tuned mt-6 text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.05] text-ink"
              >
                Good questions, <span className={accentWord}>straight answers.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="hairline-t lg:col-span-8">
            {FAQS.map((f) => (
              <details key={f.q} className="group hairline-b">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display-tuned text-[1.3rem] font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-accent-deep md:text-[1.45rem]">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-card text-ink-2 transition-colors duration-300 group-hover:border-line-2"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-7 pr-12 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GetPlates() {
  return (
    <section id="get-plates" aria-labelledby="get-plates-heading" className="relative overflow-hidden py-20 md:py-32">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Phones read intro, form, then WhatsApp; desktop puts the form in its
          own column beside the other two. */}
      <div className="container-x relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-9">
        <div className="lg:col-start-1 lg:row-start-1">
          <Eyebrow>Get review plates</Eyebrow>
          <Reveal delay={0.08}>
            <h2
              id="get-plates-heading"
              className="font-display-tuned mt-6 text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.05] text-ink"
            >
              Get plates for <span className={accentWord}>your business.</span>
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-2">
            Leave your details and we&apos;ll call you back within one business
            day to talk through how many plates you need and where they&apos;ll
            go. Prefer to message? WhatsApp is the quickest way to reach us.
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <BookCallForm source="Review plates page" interest="Review plates" />
        </Reveal>

        <Reveal delay={0.22} className="flex flex-col gap-4 lg:col-start-1 lg:row-start-2">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-2xl border border-line bg-card p-6 shadow-lift transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-float"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-deep">
              <WhatsAppIcon />
            </span>
            <span className="min-w-0">
              <span className="eyebrow block">WhatsApp us</span>
              <span className="mt-1.5 block text-lg font-medium text-ink transition-colors duration-300 group-hover:text-accent-deep">
                07765 977085
              </span>
              <span className="mt-1 block text-[0.9rem] text-ink-3">Fastest way to get a reply.</span>
            </span>
            <span
              aria-hidden="true"
              className="ml-auto self-center text-ink-3 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:text-accent"
            >
              →
            </span>
          </a>
          <p className="px-1 text-[0.95rem] leading-relaxed text-ink-2">
            Already have a plate?{" "}
            <a
              href="/tap"
              className="font-medium text-ink underline decoration-line-2 underline-offset-4 transition-colors duration-300 hover:decoration-ink"
            >
              Set it up or log in
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- sketches -- */

/** A plain review-form sketch: business, a star rating and a few lines. */
function ReviewFormSketch() {
  return (
    <div className="w-[15.5rem] rounded-2xl border border-line bg-card p-5 shadow-float" aria-hidden="true">
      <div className="flex items-center gap-3">
        <LinkIcon kind="google" size={36} />
        <div className="min-w-0">
          <p className="text-[0.85rem] font-medium leading-tight text-ink">Your business</p>
          <p className="mt-0.5 text-[0.72rem] text-ink-3">Rate your visit</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1.5 text-ink">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 3.6l2.6 5.3 5.8.84-4.2 4.1 1 5.8L12 16.9l-5.2 2.74 1-5.8-4.2-4.1 5.8-.84z" />
          </svg>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <span className="block h-2 w-full rounded-full bg-paper-3" />
        <span className="block h-2 w-4/5 rounded-full bg-paper-3" />
        <span className="block h-2 w-3/5 rounded-full bg-paper-3" />
      </div>
      <div className="mt-5 flex justify-end">
        <span className="rounded-full bg-ink px-4 py-1.5 text-[0.72rem] font-medium text-paper">Post</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- icons -- */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function NfcIcon() {
  return (
    <Icon>
      <path d="M6.5 8.5a5 5 0 0 1 0 7" />
      <path d="M10 6a8.5 8.5 0 0 1 0 12" />
      <path d="M13.5 3.5a12 12 0 0 1 0 17" />
    </Icon>
  );
}

function FormIcon() {
  return (
    <Icon>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2.5" />
      <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" />
    </Icon>
  );
}

function SplitIcon() {
  return (
    <Icon>
      <path d="M3.5 12h5l4-5.5h6M12.5 17.5h6M8.5 12l4 5.5" />
      <path d="M16.5 4l2.5 2.5-2.5 2.5M16.5 15l2.5 2.5-2.5 2.5" />
    </Icon>
  );
}

function RefreshIcon() {
  return (
    <Icon>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.5 4v3.5H16" />
    </Icon>
  );
}

function CupIcon() {
  return (
    <Icon>
      <path d="M4.5 9.5h11v4.5a4.5 4.5 0 0 1-4.5 4.5H9a4.5 4.5 0 0 1-4.5-4.5z" />
      <path d="M15.5 10.5H17a2.5 2.5 0 0 1 0 5h-1.5" />
      <path d="M8 3.5c0 1 1 1.5 1 2.5M11.5 3.5c0 1 1 1.5 1 2.5" />
      <path d="M4 21h13" />
    </Icon>
  );
}

function ScissorsIcon() {
  return (
    <Icon>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="6" cy="17" r="2.5" />
      <path d="M8.2 8.3L20 18M8.2 15.7L20 6" />
    </Icon>
  );
}

function VanIcon() {
  return (
    <Icon>
      <path d="M2.5 6.5h11v10h-11z" />
      <path d="M13.5 9.5h4l3 3.5v3.5h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </Icon>
  );
}

function ShopIcon() {
  return (
    <Icon>
      <path d="M4.5 10.5v9.5h15v-9.5" />
      <path d="M3 10.5L4.6 4.5h14.8l1.6 6" />
      <path d="M3 10.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M10 20v-4.5h4V20" />
    </Icon>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path
        d="M12 2.5a9.5 9.5 0 00-8.13 14.4L2.5 21.5l4.7-1.34A9.5 9.5 0 1012 2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
