/**
 * Hero: the promise on the left, the product on the right. The phone is the
 * page's one signature element: a missed call that plays out, message by
 * message, into a booked visit. It is labelled as an example conversation.
 *
 * Everything is in the HTML and painted before any script loads. The play-in
 * is CSS (app/home.css) and reduced motion shows the finished conversation.
 */
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { CONTACT, HERO, MEDIA } from "@/lib/film/content";
import { Em, ExampleNote, Eyebrow, PrimaryButton, Status, Tick, WhatsAppGlyph, Icon } from "./ui";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function HeroPhone() {
  const p = HERO.phone;
  const c = HERO.cards;
  return (
    <div className="relative mx-auto w-full max-w-[24rem] pb-6 pt-10 sm:max-w-[30rem] lg:max-w-none lg:py-6">
      {/* Floating cards: what the system did around the conversation. */}
      <div className="home-float absolute left-0 top-0 z-20 sm:left-2 lg:left-auto lg:-right-4 lg:top-[7%]" style={d(0.5)} aria-hidden="true">
        <div className="flex max-w-[78vw] items-center gap-2.5 rounded-2xl border border-white/10 bg-carbon-3/90 py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-ivory">
            <Icon name="call" />
          </span>
          <span>
            <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mist">{c.missed.kind}</span>
            <span className="block text-[0.875rem] font-medium text-ivory">{c.missed.text}</span>
          </span>
        </div>
      </div>

      <div className="home-float absolute left-0 top-[44%] z-20 hidden sm:block lg:-left-10" style={d(1.4)} aria-hidden="true">
        <div className="w-[11.5rem] rounded-2xl border border-white/10 bg-carbon-3/90 p-3.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mist">{c.checks.title}</p>
          <ul className="mt-2 grid gap-1.5">
            {c.checks.items.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[0.8125rem] text-ivory">
                <Tick className="h-3.5 w-3.5 text-[#4cc38a]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The phone. One description for screen readers; the parts inside are presentational. */}
      <div
        role="img"
        aria-label="Example conversation: a missed call at 07:48 is answered on WhatsApp by the business's AI assistant, which asks about the job and books a survey visit for Thursday at 9am."
        className="relative mx-auto w-[min(16.25rem,78vw)] rounded-[2.75rem] bg-[#1c1c21] p-[0.55rem] shadow-[0_1px_0_1px_rgba(255,255,255,0.07)_inset,0_40px_90px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)] sm:w-[18rem] lg:w-[18.5rem]"
      >
        <div className="overflow-hidden rounded-[2.25rem] bg-[#f4f2ec] text-ink">
          <div className="relative flex h-9 items-center justify-between px-6 pt-1 text-[0.75rem] font-semibold">
            <span>09:41</span>
            <span className="absolute left-1/2 top-2 h-[1.35rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-black" />
            <span className="flex gap-1">
              <span className="h-2.5 w-4 rounded-[3px] border border-ink/70" />
            </span>
          </div>
          <div className="flex items-center gap-2.5 border-b border-ink/[0.08] px-4 pb-2.5 pt-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-carbon text-[0.8125rem] font-semibold text-ivory">Y</span>
            <span>
              <span className="block text-[0.875rem] font-semibold leading-tight">{p.business}</span>
              <span className="block text-[0.6875rem] text-[#17633f]">{p.status}</span>
            </span>
          </div>

          <ol className="home-thread flex flex-col gap-1.5 px-3 pb-3 pt-3 sm:min-h-[25.5rem]">
            <li style={i(0)} className="mx-auto mb-1 rounded-full bg-ink/[0.07] px-2.5 py-1 font-mono text-[0.6875rem] text-ink-2">
              {p.pill}
            </li>
            {p.thread.map((m, n) =>
              "photo" in m ? (
                <li key={n} style={i(n + 1)} className="ml-auto overflow-hidden rounded-2xl rounded-br-md bg-carbon p-1">
                  <Image src={MEDIA.jobPhoto.src} alt="" width={240} height={300} sizes="7rem" className="h-[6.5rem] w-[5.25rem] rounded-xl object-cover" />
                </li>
              ) : (
                <li
                  key={n}
                  style={i(n + 1)}
                  className={`max-w-[82%] rounded-2xl px-3 py-2 text-[0.8125rem] leading-snug ${
                    m.from === "us" ? "mr-auto rounded-bl-md bg-white text-ink shadow-[0_1px_1px_rgba(27,26,22,0.06)]" : "ml-auto rounded-br-md bg-carbon text-ivory"
                  }`}
                >
                  {m.text}
                </li>
              ),
            )}
            <li style={i(p.thread.length + 1)} className="mx-auto mt-1">
              <Status state={p.booked} />
            </li>
          </ol>
          <div className="mx-3 mb-3 flex h-9 items-center rounded-full bg-white px-3.5 text-[0.8125rem] text-ink-3">Message</div>
        </div>
      </div>
      <div className="home-float relative z-20 mx-auto -mt-6 w-fit sm:absolute sm:bottom-0 sm:right-2 sm:mt-0 lg:-right-2 lg:bottom-[6%]" style={d(3.6)} aria-hidden="true">
        <div className="flex max-w-[78vw] items-center gap-3 rounded-2xl bg-ivory p-2.5 pr-4 text-ink shadow-[0_24px_50px_-18px_rgba(0,0,0,0.85)]">
          <span className="flex h-11 w-11 flex-col items-center justify-center rounded-xl bg-carbon text-ivory">
            <span className="text-[0.75rem] font-semibold leading-none">{c.calendar.day}</span>
            <span className="mt-0.5 font-mono text-[0.6875rem] leading-none">{c.calendar.time}</span>
          </span>
          <span>
            <span className="block text-[0.9375rem] font-semibold leading-tight">{c.calendar.text}</span>
            <span className="block text-[0.75rem] text-ink-2">{c.calendar.by}</span>
          </span>
        </div>
      </div>

      <div className="text-center">
        <ExampleNote tone="dark">{p.note}</ExampleNote>
      </div>
    </div>
  );
}

export function Hero({ announcement }: { announcement?: ReactNode }) {
  return (
    <section data-tone="dark" aria-labelledby="hero-title" className="relative overflow-hidden bg-carbon text-ivory">
      {/* A soft studio light behind the phone, so it sits in the frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_42%_at_76%_52%,rgb(201_206_215/0.11),transparent_70%)] max-lg:bg-[radial-gradient(80%_32%_at_50%_80%,rgb(201_206_215/0.1),transparent_70%)]"
      />
      <div className="container-x relative grid grid-cols-1 items-center gap-8 pb-14 pt-24 sm:pt-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6 lg:pb-20 lg:pt-32">
        <div className="min-w-0">
          {announcement}
          <Eyebrow tone="dark">{HERO.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="mt-4 text-[min(clamp(2.65rem,11.4vw,5.6rem),13vw)] font-bold leading-[0.94] tracking-[-0.05em]">
            {/* Inline lines with breaks, not blocks: Chrome measures the whole
                headline as one element for Largest Contentful Paint. */}
            {HERO.h1.map((line, n) => (
              <span key={line}>
                <Em text={line} />
                {n < HERO.h1.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-mist sm:text-[1.1875rem]">{HERO.sub}</p>
          <div id="hero-actions" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrimaryButton href="#book-call">{CONTACT.bookLabel}</PrimaryButton>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-[1.0625rem] font-semibold text-ivory underline decoration-graphite-2 underline-offset-[6px] transition-colors hover:decoration-halo"
            >
              <WhatsAppGlyph />
              WhatsApp us
              <span className="sr-only">(opens WhatsApp)</span>
            </a>
          </div>
          <ul className="mt-9 grid gap-x-6 gap-y-3 border-t border-graphite pt-6 text-[0.9375rem] text-ivory/90 sm:grid-cols-3">
            {HERO.facts.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Tick className="mt-0.5 h-4 w-4 text-halo" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <HeroPhone />
      </div>
    </section>
  );
}
