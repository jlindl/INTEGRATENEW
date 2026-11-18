/**
 * The three systems, each built around one real-looking product object: the
 * assistant's inbox, an ad that becomes a booked visit, and a demo site. Every
 * object is labelled as an example (lib/film/content.ts honesty rules).
 *
 * The old "SYS.01" codes are gone: a label should say something true about
 * the content, so each system is introduced by the job it does instead.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { MEDIA, SYSTEM } from "@/lib/film/content";
import { Em, ExampleNote, Eyebrow, Icon, Status, TextLink, Tick, WhatsAppGlyph, h2 } from "./ui";

const plain = (s: string) => s.replace(/\*/g, "");

/** What each system is for, in the visitor's words. */
const ROLE = ["Answers every enquiry", "Brings in new ones", "Turns lookers into bookings"];

const floatCard = "max-w-[78vw] rounded-2xl border border-white/10 bg-carbon-3 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.85)]";

function Inbox() {
  const box = SYSTEM.inbox;
  return (
    <div className="relative px-1 pb-10 pt-8 sm:px-6">
      <div role="img" aria-label="Example inbox: five enquiries from WhatsApp, website chat and the website form, two booked, two being qualified and one handed to the owner." className="overflow-hidden rounded-2xl bg-card text-ink shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="text-[0.9375rem] font-semibold">{box.title}</span>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">{box.note}</span>
        </div>
        <ul className="divide-y divide-line">
          {box.rows.map((r) => (
            <li key={r.who} className="flex items-center gap-3 px-4 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-ink-2">
                {r.via === "WhatsApp" ? <WhatsAppGlyph className="h-4 w-4" /> : <Icon name={r.via === "Website form" ? "form" : "chat"} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.875rem] font-semibold">{r.who}</span>
                <span className="block text-[0.75rem] text-ink-2">{r.via}</span>
              </span>
              <Status state={r.state} />
            </li>
          ))}
        </ul>
      </div>
      <div className={`${floatCard} absolute -right-1 top-0 w-[14.5rem] p-3 sm:right-0`} aria-hidden="true">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mist">{box.live.kind}</p>
        <p className="mt-0.5 text-[0.875rem] text-ivory">{box.live.text}</p>
      </div>
      <div className={`${floatCard} absolute -left-1 bottom-0 w-[14.5rem] p-3 sm:left-0`} aria-hidden="true">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mist">{box.handover.kind}</p>
        <p className="mt-0.5 text-[0.875rem] text-ivory">{box.handover.text}</p>
      </div>
    </div>
  );
}

function AdFlow() {
  const ad = SYSTEM.ad;
  return (
    <div role="img" aria-label="Example: a local ad leads to a short form, a WhatsApp follow-up to Sam, and a visit booked into the calendar." className="relative grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] items-start gap-3 sm:gap-4">
      <div className="overflow-hidden rounded-2xl bg-card text-ink shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-2 px-3 pt-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-carbon text-[0.75rem] font-semibold text-ivory">Y</span>
          <span>
            <span className="block text-[0.8125rem] font-semibold leading-tight">{ad.page}</span>
            <span className="block text-[0.6875rem] text-ink-3">{ad.sponsored}</span>
          </span>
        </div>
        <p className="px-3 py-2 text-[0.8125rem] leading-snug">{ad.copy}</p>
        <div className="relative aspect-[16/10]">
          <Image src={MEDIA.adPhoto.src} alt="" fill sizes="(min-width: 1024px) 15rem, 45vw" className="object-cover" />
        </div>
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <span className="truncate text-[0.8125rem] font-semibold">{ad.headline}</span>
          <span className="shrink-0 whitespace-nowrap rounded-md bg-ink/[0.07] px-2.5 py-1 text-[0.75rem] font-semibold">{ad.cta}</span>
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        <div className="rounded-2xl bg-card p-3 text-ink shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
          <p className="text-[0.8125rem] font-semibold">Instant form</p>
          <dl className="mt-2 grid gap-1.5">
            {ad.form.map(([k, v]) => (
              <div key={k} className="rounded-lg bg-paper-2 px-2.5 py-1.5">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-2">{k}</dt>
                <dd className="text-[0.8125rem] font-semibold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={`${floatCard} p-3`}>
          <p className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mist">
            <WhatsAppGlyph className="h-3.5 w-3.5" />
            WhatsApp, straight after
          </p>
          <p className="mt-1 text-[0.8125rem] leading-snug text-ivory">{ad.follow}</p>
        </div>
      </div>
      <div className="col-span-2 -mt-1 flex justify-end">
        <Status state={ad.booked} tone="dark" />
      </div>
    </div>
  );
}

function SiteFrame() {
  const site = SYSTEM.site;
  return (
    <div className="relative pb-8 pt-8">
      <a href={site.href} className="group block overflow-hidden rounded-2xl bg-card shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
        <span className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="ml-2 rounded-full bg-white px-2.5 py-0.5 font-mono text-[0.6875rem] text-ink-3">{site.label}</span>
        </span>
        <span className="relative block aspect-[16/10]">
          <Image src={site.src} alt="Integrate's demo website for a plumber, shown on a desktop screen" fill sizes="(min-width: 1024px) 34rem, 92vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none" />
        </span>
      </a>
      <div className={`${floatCard} absolute -right-1 top-0 flex items-center gap-2.5 py-2.5 pl-2.5 pr-4 sm:right-4`} aria-hidden="true">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-ivory">
          <Icon name="form" />
        </span>
        <span>
          <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mist">{site.toast.kind}</span>
          <span className="block text-[0.875rem] text-ivory">{site.toast.text}</span>
        </span>
      </div>
      <ul className="absolute bottom-0 left-3 flex flex-wrap gap-2" aria-label="What the site does">
        {site.tags.map((t) => (
          <li key={t} className="flex items-center gap-1.5 rounded-full bg-ivory px-3 py-1.5 text-[0.75rem] font-semibold text-carbon">
            <Tick className="h-3 w-3" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

const OBJECTS: ReactNode[] = [<Inbox key="i" />, <AdFlow key="a" />, <SiteFrame key="s" />];
const NOTES = [SYSTEM.inbox.note, SYSTEM.ad.note, "Integrate demo build"];

export function Systems() {
  return (
    <section id="services" data-tone="dark" aria-labelledby="systems-title" className="scroll-mt-16 bg-carbon py-20 text-ivory sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="max-w-[46rem]">
          <Eyebrow tone="dark">What we build</Eyebrow>
          <h2 id="systems-title" className={h2}>
            <Em text={SYSTEM.title} />
          </h2>
        </div>

        <ol className="mt-12 grid gap-14 lg:mt-16 lg:gap-24">
          {SYSTEM.stations.map((s, n) => (
            <li key={s.href} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={`min-w-0 ${n % 2 ? "" : "lg:order-2"}`}>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-halo">{ROLE[n]}</p>
                <h3 className="mt-4 text-[min(clamp(1.6rem,4.6vw,2.25rem),9vw)] font-bold leading-[1.05] tracking-[-0.035em]">{plain(s.name)}</h3>
                <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-mist">{s.body}</p>
                <ul className="mt-5 hidden flex-wrap gap-2 sm:flex" aria-label="Works with">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full border border-graphite-2 px-3 py-1.5 text-[0.8125rem] text-ivory/90">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1">
                  <TextLink href={s.href} tone="dark">
                    {s.linkLabel}
                  </TextLink>
                  {s.more.map((m) => (
                    <a key={m.href} href={m.href} className="inline-flex min-h-11 items-center text-[0.9375rem] text-mist underline decoration-graphite-2 underline-offset-[5px] transition-colors hover:text-ivory">
                      {m.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="min-w-0">
                {OBJECTS[n]}
                <ExampleNote tone="dark">{NOTES[n]}</ExampleNote>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
