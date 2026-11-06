import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { BookCallForm } from "@/components/sections/BookCallForm";
import { AdVideo } from "@/components/trades/AdVideo";
import { LogoMark } from "@/components/ui/LogoMark";
import { Reveal } from "@/components/ui/Reveal";
import { LEGAL_DOCS } from "@/lib/legalData";

/**
 * /trades — the landing page for the Integrate Meta ads aimed at UK trades.
 *
 * Built like /book: no nav and no links out, so a visitor from the ad either
 * watches the video or fills in the form. It is noindex because it repeats
 * the lead generation service page and only exists for paid traffic.
 *
 * The video: drop the file at public/videos/trades.mp4 (and optionally a
 * poster frame at public/videos/trades-poster.jpg). The page checks for them
 * at build time, so the video block only appears once the file is there.
 */

const VIDEO_FILE = "videos/trades.mp4";
const POSTER_FILE = "videos/trades-poster.jpg";
const inPublic = (file: string) => fs.existsSync(path.join(process.cwd(), "public", file));

export const metadata: Metadata = {
  title: "More of the right jobs, booked in for you",
  description:
    "Local Facebook and Instagram ads, an AI WhatsApp agent that replies in moments and qualified jobs booked into your diary. Built for UK tradespeople.",
  alternates: { canonical: "/trades" },
  robots: { index: false, follow: true },
};

const STEPS = [
  { title: "Local ads", text: "Facebook and Instagram ads shown only to people in your service area, built around the jobs you want more of." },
  { title: "Instant reply on WhatsApp", text: "Within moments, an AI agent messages every new lead, day or night, even when you're up a ladder." },
  { title: "Poor fits filtered out", text: "It asks about budget, location, timing and the job itself, using the questions you agree on." },
  { title: "Booked into your diary", text: "Good leads pick a free slot in your calendar, so you turn up to quotes instead of chasing people who went cold." },
];

const SIGNS = [
  "Enquiries come from postcodes you actually cover.",
  "Most leads get a reply within minutes, even when you're on a job.",
  "You can see how many leads became booked quotes, not just how many came in.",
];

const FAQS = [
  { q: "Do I need a website for this to work?", a: "No. A good website helps people who look you up afterwards, but it isn't needed to start getting leads." },
  { q: "Will the AI agent pretend to be me?", a: "It replies in your business's name and tone, asks the questions you agree on, and hands over to you for anything it shouldn't answer." },
  { q: "How quickly can it be set up?", a: "It depends on your trade, area and calendar. The quickest way to a clear answer is a short call where we look at what you want more of." },
];

const eyebrow = "font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3";
const italic = "italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]";

function CtaButton() {
  return (
    <a
      href="#book"
      className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-medium text-paper transition-colors duration-300 hover:bg-accent"
    >
      Get a call back
      <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

export default function TradesPage() {
  const hasVideo = inPublic(VIDEO_FILE);
  const poster = inPublic(POSTER_FILE) ? `/${POSTER_FILE}` : undefined;

  return (
    <main id="main" className="relative overflow-hidden px-5 pb-16 pt-12 sm:pt-16">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-3xl">
        {/* Hero */}
        <Reveal className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="font-display-tuned text-xl font-medium text-ink">Integrate</span>
          </span>

          <p className={`${eyebrow} mt-8`}>For UK tradespeople</p>
          <h1 className="font-display-tuned mt-4 max-w-[18ch] text-[clamp(2.1rem,7.5vw,3.6rem)] font-medium leading-[1.06] text-ink">
            More of the right jobs, <span className={italic}>booked in for you.</span>
          </h1>
          <p className="mt-5 max-w-[50ch] text-[1.05rem] leading-relaxed text-ink-2">
            You don&apos;t need more clicks. You need more of the right enquiries,
            answered quickly, from people in the area you actually cover.
          </p>
          {!hasVideo && (
            <div className="mt-8">
              <CtaButton />
            </div>
          )}
        </Reveal>

        {/* Video */}
        {hasVideo && (
          <Reveal delay={0.1} className="mx-auto mt-10 max-w-md sm:max-w-none">
            <AdVideo src={`/${VIDEO_FILE}`} poster={poster} />
            <div className="mt-7 text-center">
              <CtaButton />
            </div>
          </Reveal>
        )}

        {/* How it works */}
        <section aria-labelledby="how" className="mt-20">
          <Reveal>
            <p className={eyebrow}>How it works</p>
            <h2 id="how" className="font-display-tuned mt-3 text-[clamp(1.6rem,5vw,2.3rem)] font-medium leading-tight text-ink">
              Ads, a fast reply and a <span className={italic}>booked quote.</span>
            </h2>
          </Reveal>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={0.05 * i} className="rounded-2xl border border-line bg-[#fbfaf6] p-6">
                <span className="font-display-tuned flex h-8 w-8 items-center justify-center rounded-full border border-line text-[0.95rem] text-ink">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[1.02rem] font-medium text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* What good looks like */}
        <section aria-labelledby="signs" className="mt-16">
          <Reveal>
            <h2 id="signs" className="font-display-tuned text-[clamp(1.4rem,4.5vw,1.9rem)] font-medium text-ink">
              How you&apos;ll know it&apos;s working
            </h2>
            <ul className="mt-5 space-y-3">
              {SIGNS.map((s) => (
                <li key={s} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-ink" aria-hidden="true">
                    <path d="M4 12.5l5 5L20 6" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Form */}
        <section id="book" aria-labelledby="book-title" className="mt-20 scroll-mt-8">
          <Reveal className="text-center">
            <h2 id="book-title" className="font-display-tuned text-[clamp(1.7rem,5.5vw,2.5rem)] font-medium leading-tight text-ink">
              Get a <span className={italic}>call back.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[46ch] leading-relaxed text-ink-2">
              A short call, no pressure. We&apos;ll look at the jobs you want more
              of and whether this is a good fit for your area.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <BookCallForm source="Meta ads: trades landing page" />
          </Reveal>
        </section>

        {/* FAQs */}
        <section aria-labelledby="faqs" className="mt-16">
          <Reveal>
            <h2 id="faqs" className="font-display-tuned text-[clamp(1.4rem,4.5vw,1.9rem)] font-medium text-ink">
              Questions
            </h2>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[1rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="text-ink-3 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 leading-relaxed text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className="mt-14 border-t border-line pt-7 text-center">
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5">
            {LEGAL_DOCS.map((doc) => (
              <a key={doc.slug} href={`/legal/${doc.slug}`} className="inline-block py-2.5 text-[0.75rem] text-ink-3 transition-colors duration-300 hover:text-ink sm:py-1">
                {doc.label}
              </a>
            ))}
          </nav>
          <p className="mt-3 font-mono text-[0.7rem] text-ink-3">© 2026 Integrate AI Solutions Limited</p>
        </footer>
      </div>
    </main>
  );
}
