import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { AdVideo } from "@/components/trades/AdVideo";
import { StickyCta } from "@/components/trades/StickyCta";
import { TradesLeadForm } from "@/components/trades/TradesLeadForm";
import { WhatsAppDemo } from "@/components/trades/WhatsAppDemo";
import { LogoMark } from "@/components/ui/LogoMark";
import { Reveal } from "@/components/ui/Reveal";
import { LEGAL_DOCS } from "@/lib/legalData";

/**
 * /trades — the landing page for the Integrate Meta ads aimed at UK trades and
 * construction firms.
 *
 * Built to convert paid traffic: no nav and no links out except the legal
 * footer. The VSL and the page's own three-step form (TradesLeadForm) sit
 * side by side at the top; everything below answers the questions people have
 * before they hand over a number, with calls to action back to the form. It is
 * noindex because it repeats the lead generation service page.
 *
 * Copy is drawn from the lead generation hub (lib/serviceHubs.ts) and the VSL.
 * Don't add numbers or testimonials here unless they are real and approved.
 *
 * The video is public/Integrate_VSL.mp4 (16:9), with a poster frame at
 * public/Integrate_VSL-poster.jpg. The page checks for them at build time.
 */

const VIDEO_FILE = "Integrate_VSL.mp4";
const POSTER_FILE = "Integrate_VSL-poster.jpg";
const inPublic = (file: string) => fs.existsSync(path.join(process.cwd(), "public", file));

export const metadata: Metadata = {
  title: "A diary full of jobs worth quoting | Integrate",
  description:
    "Local Facebook and Instagram ads, an AI agent that answers every enquiry on WhatsApp in seconds, and qualified jobs booked into your diary. For UK trades and construction firms.",
  alternates: { canonical: "/trades" },
  robots: { index: false, follow: true },
};

const PROMISES = [
  "Leads from your own ads, never shared",
  "A WhatsApp reply in seconds, day or night",
  "Only the postcodes you cover",
  "Nothing spent until we agree a plan",
];

const SOURCES = [
  { name: "Referrals", note: "The best work there is, but you can't turn it up when it's quiet." },
  { name: "Repeat customers", note: "Only when they happen to need you again." },
  { name: "Shared lead sites", note: "The same enquiry sold to three to five firms, so it's a race on price." },
  { name: "Ads you run yourself", note: "Hit and miss, and the leads go cold while you're on a job." },
];

const NOT_WANTED = ["£80 call-outs", "Price shoppers", "Out of area", "Tyre-kickers"];

const STEPS = [
  { title: "Local ads", text: "Facebook and Instagram ads shown only to people in your service area, built around the jobs you want more of." },
  { title: "Instant lead form", text: "Interested people enquire without leaving the app, so every lead arrives with a name, number, postcode and job type." },
  { title: "AI follow-up on WhatsApp", text: "Within seconds, an AI agent messages the lead, asks about budget, location, timing and the job itself, and filters out poor fits." },
  { title: "Booked into your diary", text: "Qualified leads pick a free slot in your calendar, so you turn up to quotes instead of chasing people who went cold." },
];

const COMPARE = [
  { row: "Who else gets the enquiry", them: "Three to five other firms", us: "Nobody. It comes from your own ads." },
  { row: "Which jobs come in", them: "Whatever turns up", us: "Ads built around the jobs you want more of" },
  { row: "First reply", them: "Whenever you get off the ladder", us: "Within seconds on WhatsApp, day or night" },
  { row: "What reaches you", them: "Every enquiry, good or bad", us: "Leads checked for budget, area and timing" },
  { row: "What you do next", them: "Chase them", us: "Turn up to a booked visit" },
];

const CALL = [
  { title: "Your area and your work", text: "Which jobs you want more of, which you'd rather not do, and the postcodes you cover." },
  { title: "How it would run for you", text: "What the ads would say, the questions the WhatsApp agent would ask, and how bookings land in your diary." },
  { title: "A straight answer", text: "Whether it's a good fit for your trade and area. If it isn't, we'll say so." },
];

const FIT = [
  "You're a UK trade or construction firm with a set area you cover.",
  "You want more higher-value jobs, not just more enquiries.",
  "You've got room in the diary for more work, or will soon.",
];

const FAQS = [
  { q: "Are the leads shared with other firms?", a: "No. They come from ads run for your business, so every enquiry is yours." },
  { q: "Do I need a website for this to work?", a: "No. The ads send people to an instant form inside Facebook or Instagram. A good website helps people who look you up afterwards, but it isn't needed to start." },
  { q: "Will the AI agent pretend to be me?", a: "It replies in your business's name and tone, asks the qualifying questions you agree on, and hands over to you for anything it shouldn't answer." },
  { q: "Does it use my WhatsApp number?", a: "It runs on a WhatsApp Business number set up for your business, so customers see your business name. You can step in and take over any conversation." },
  { q: "Can it book into my existing calendar?", a: "Yes. It books into the calendar you already use, and only into the times you make available." },
  { q: "How much should I spend on ads?", a: "It depends on your area, your trade and the jobs you want. We talk it through on the call, and nothing is spent until we've agreed a plan." },
  { q: "How quickly can it be set up?", a: "It depends on your trade, area and calendar. The quickest way to a clear answer is the free call, where we look at what you want more of." },
];

const eyebrow = "font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3";
const italic = "italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]";
const h2 = "font-display-tuned mt-3 text-[clamp(1.9rem,5.5vw,3rem)] font-medium leading-[1.05] text-ink";

const Tick = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden="true">
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);

function CtaButton({ label = "Book my free call" }: { label?: string }) {
  return (
    <a
      href="#get-started"
      className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-medium text-paper transition-colors duration-300 hover:bg-accent-deep"
    >
      {label}
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
    <main id="main" className="relative overflow-x-clip">
      <div className="glow-accent pointer-events-none absolute inset-x-0 top-0 h-[60rem]" aria-hidden="true" />

      {/* Header: logo and one way forward */}
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7">
        <span className="inline-flex items-center gap-2.5">
          <LogoMark className="h-7 w-7" />
          <span className="font-display-tuned text-lg font-medium text-ink">Integrate</span>
        </span>
        <a
          href="#get-started"
          className="inline-flex min-h-10 items-center rounded-full border border-line-2 bg-card/70 px-4 text-[0.88rem] font-medium text-ink transition-colors hover:border-ink"
        >
          Free 20-min call
        </a>
      </header>

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative mx-auto max-w-6xl px-5 pb-14 pt-10 sm:px-8 sm:pt-14 lg:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <Reveal>
              <p className={eyebrow}>For UK trades and construction firms</p>
              <h1 id="hero-title" className="font-display-tuned mt-4 text-[clamp(2.4rem,8vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.01em] text-ink">
                A diary full of jobs <br />
                <span className={italic}>worth quoting.</span>
              </h1>
              <p className="mt-5 max-w-[52ch] text-[1.06rem] leading-relaxed text-ink-2 sm:text-[1.12rem]">
                We run local Facebook and Instagram ads for your business, answer every enquiry on
                WhatsApp within seconds, and book the good ones straight into your calendar.
              </p>
              {/* The promise the Meta ads make, repeated here so the page matches the ad. */}
              <p className="mt-5 flex max-w-[52ch] items-start gap-2.5 rounded-2xl border border-line bg-card/70 px-4 py-3 text-[0.98rem] leading-snug text-ink-2">
                <Tick className="mt-0.5 text-[#2f9e6b]" />
                <span>
                  <strong className="font-medium text-ink">10 booked quotes in your first 30 days.</strong> If we
                  miss, we keep working without charging our fee until you have them.
                </span>
              </p>
            </Reveal>
  
            <Reveal delay={0.08} className="mt-9 lg:mt-10">
              {hasVideo ? (
                <>
                  <AdVideo src={`/${VIDEO_FILE}`} poster={poster} />
                  <p className="mt-3 flex items-center gap-2 text-[0.85rem] text-ink-3">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                    How it works, in under two minutes
                  </p>
                </>
              ) : (
                <ul className="space-y-3">
                  {PROMISES.map((p) => (
                    <li key={p} className="flex gap-3 text-[1rem] text-ink-2">
                      <Tick className="mt-0.5 text-ink" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>

          {/* On desktop the form starts level with the headline and stays in
              view while the visitor scrolls past the video. */}
          <Reveal delay={0.16} className="lg:sticky lg:top-6">
            <div id="get-started" className="scroll-mt-6">
              <TradesLeadForm />
            </div>
          </Reveal>
        </div>

        {/* Promises */}
        <Reveal delay={0.1}>
          <ul className="mt-10 grid gap-x-8 gap-y-3 border-t border-line pt-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[0.93rem] leading-snug text-ink-2">
                <Tick className="mt-px text-ink" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* The problem */}
      <section aria-labelledby="problem" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <p className={eyebrow}>The problem</p>
            <h2 id="problem" className={h2}>
              Where the work <span className={italic}>comes from now.</span>
            </h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-ink-2">
              Most trades don&apos;t need more clicks. They need more of the right enquiries,
              answered quickly, from people in the area they actually cover.
            </p>
          </Reveal>
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {SOURCES.map((s, i) => (
                <Reveal as="li" key={s.name} delay={0.05 * i} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <span className="text-[1.02rem] font-medium text-ink">{s.name}</span>
                  <span className="leading-relaxed text-ink-2">{s.note}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.1}>
              <p className="mt-8 text-[1.02rem] font-medium text-ink">And it&apos;s not always the work you want:</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {NOT_WANTED.map((n) => (
                  <li key={n} className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[0.9rem] text-ink-2">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#b4533a" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>How it works</p>
          <h2 id="how" className={h2}>
            Ads, a fast reply and a <span className={italic}>booked quote.</span>
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.06 * i} className="relative rounded-2xl border border-line bg-card p-5 sm:p-6">
              <span className="font-mono text-[0.72rem] tracking-[0.14em] text-ink-3">0{i + 1}</span>
              <h3 className="mt-3 text-[1.08rem] font-medium text-ink sm:mt-6">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* While you sleep */}
      <section aria-labelledby="sleep" className="px-3 py-8 sm:px-5">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-carbon px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(91,95,240,0.22),transparent)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-5xl">
            <WhatsAppDemo />
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section aria-labelledby="compare" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>The difference</p>
          <h2 id="compare" className={h2}>
            Shared leads vs. <span className={italic}>your own.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-card">
            <div className="grid grid-cols-2 border-b border-line sm:grid-cols-[1fr_1fr_1.2fr]">
              <span className="hidden sm:block" />
              <span className="px-4 py-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-3 sm:px-6">Shared lead sites</span>
              <span className="border-l border-line bg-ink px-4 py-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper sm:px-6">With Integrate</span>
            </div>
            <dl>
              {COMPARE.map((c, i) => (
                <div key={c.row} className={`grid grid-cols-2 sm:grid-cols-[1fr_1fr_1.2fr] ${i ? "border-t border-line" : ""}`}>
                  <dt className="col-span-2 px-4 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3 sm:col-span-1 sm:px-6 sm:py-5 sm:font-sans sm:text-[0.95rem] sm:font-medium sm:normal-case sm:leading-snug sm:tracking-normal sm:text-ink">
                    {c.row}
                  </dt>
                  <dd className="px-4 pb-4 pt-1.5 text-[0.93rem] leading-snug text-ink-3 sm:px-6 sm:py-5">{c.them}</dd>
                  <dd className="flex gap-2 border-l border-line bg-ink/[0.03] px-4 pb-4 pt-1.5 text-[0.93rem] font-medium leading-snug text-ink sm:px-6 sm:py-5">
                    <Tick className="mt-px hidden text-[#2f9e6b] sm:block" />
                    {c.us}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* The call */}
      <section aria-labelledby="call" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className={eyebrow}>The free call</p>
              <h2 id="call" className={h2}>
                Twenty minutes, <span className={italic}>no pressure.</span>
              </h2>
            </Reveal>
            <ol className="mt-9 space-y-6">
              {CALL.map((c, i) => (
                <Reveal as="li" key={c.title} delay={0.06 * i} className="flex gap-4">
                  <span className="font-display-tuned flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-2 text-[0.98rem] text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-medium text-ink">{c.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-2">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={0.1} className="self-start rounded-2xl border border-line bg-card p-6 sm:p-8">
            <h3 className="font-display-tuned text-[1.45rem] font-medium text-ink">It&apos;s a good fit if…</h3>
            <ul className="mt-5 space-y-4">
              {FIT.map((f) => (
                <li key={f} className="flex gap-3 leading-relaxed text-ink-2">
                  <Tick className="mt-1 text-[#2f9e6b]" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <CtaButton />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section aria-labelledby="faqs" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal className="self-start lg:sticky lg:top-8">
            <p className={eyebrow}>Questions</p>
            <h2 id="faqs" className={h2}>
              Before you <span className={italic}>book.</span>
            </h2>
            <p className="mt-5 max-w-[40ch] leading-relaxed text-ink-2">
              Anything else, ask us on the call. It&apos;s free, and there&apos;s no obligation.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="divide-y divide-line border-y border-line">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-1">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[1.02rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-3 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 pr-10 leading-relaxed text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing call to action */}
      <section id="final-cta" aria-labelledby="final" className="px-3 pb-8 pt-4 sm:px-5">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-carbon px-6 py-16 text-center sm:py-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(91,95,240,0.25),transparent)]"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 id="final" className="font-display-tuned mx-auto max-w-[18ch] text-[clamp(2rem,6vw,3.4rem)] font-medium leading-[1.04] text-ivory">
              More of the right jobs, <span className="whitespace-nowrap italic text-[#a5a8f6]">booked in for you.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[44ch] leading-relaxed text-mist">
              Three quick questions and we&apos;ll call you within one business day.
            </p>
            <a
              href="#get-started"
              className="group mt-8 inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-ivory px-7 py-4 text-base font-medium text-carbon transition-colors duration-300 hover:bg-white"
            >
              Book my free call
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-5 pb-28 pt-8 text-center sm:px-8 lg:pb-12">
        <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5">
          {LEGAL_DOCS.map((doc) => (
            <a key={doc.slug} href={`/legal/${doc.slug}`} className="inline-block py-2.5 text-[0.75rem] text-ink-3 transition-colors duration-300 hover:text-ink sm:py-1">
              {doc.label}
            </a>
          ))}
        </nav>
        <p className="mt-3 font-mono text-[0.7rem] text-ink-3">© 2026 Integrate AI Solutions Limited</p>
      </footer>

      <StickyCta />
    </main>
  );
}
