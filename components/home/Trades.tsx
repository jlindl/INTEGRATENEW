/**
 * Who it is for: the three trades with their own pages, then the wider list.
 * The photographs are generated stand-ins for each trade's materials
 * (lib/film/content.ts): atmosphere only, never shown as anyone's work. Type
 * sits below each picture, never over it.
 */
import Image from "next/image";
import { TRADES } from "@/lib/film/content";
import { Em, Eyebrow, TextLink, h2 } from "./ui";

export function Trades() {
  return (
    <section id="trades" data-tone="light" aria-labelledby="trades-title" className="bg-paper py-20 text-ink sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 id="trades-title" className={h2}>
              <Em text={TRADES.title} />
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.0625rem] leading-relaxed text-ink-2 lg:pb-1">
            Each system is set up around the jobs you want more of and the questions your customers ask before they book.
          </p>
        </div>

        <ul tabIndex={0} aria-label="Trades" className="home-rail relative mt-10 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 lg:mt-14">
          {TRADES.cuts.map((c) => (
            <li key={c.name} className="flex w-[82%] shrink-0 flex-col overflow-hidden rounded-[1.4rem] border border-line bg-card shadow-lift sm:w-[60%] md:w-auto">
              <div className="relative aspect-[16/10] bg-paper-2">
                <Image src={c.wide} alt="" fill sizes="(min-width: 768px) 33vw, 92vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-[1.375rem] font-bold tracking-[-0.03em]">{c.name}</h3>
                <p className="mt-2 text-[1rem] leading-relaxed text-ink-2">{c.line}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Typical ${c.name.toLowerCase()} jobs`}>
                  {c.jobs.map((j) => (
                    <li key={j} className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[0.8125rem] text-ink-2">
                      {j}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <TextLink href={c.href}>Websites for {c.name.toLowerCase()}</TextLink>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-4 rounded-[1.4rem] border border-line bg-card p-5 shadow-lift sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-3">{TRADES.alsoLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TRADES.also.map((t) => (
                <li key={t} className="rounded-full border border-line-2 px-3 py-1.5 text-[0.9375rem] font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <TextLink href={TRADES.alsoHref} className="shrink-0">
            {TRADES.alsoLink}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
