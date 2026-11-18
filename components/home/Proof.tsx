/**
 * Client work: real screenshots of real, live client sites, each opening the
 * site. On phones and tablets it is a swipeable row (scrollable sections suit
 * showcase content, layout.md › Visual hierarchy); on desktop a full grid, so
 * nothing is hidden.
 */
import Image from "next/image";
import { PROOF } from "@/lib/film/content";
import { Arrow, Em, Eyebrow, External, h2 } from "./ui";

export function Proof() {
  return (
    <section id="case-studies" data-tone="dark" aria-labelledby="proof-title" className="scroll-mt-16 bg-carbon py-20 text-ivory sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div>
            <Eyebrow tone="dark">Client work</Eyebrow>
            <h2 id="proof-title" className={h2}>
              <Em text={PROOF.title} />
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.0625rem] leading-relaxed text-mist lg:pb-1">{PROOF.body}</p>
        </div>

        <ul tabIndex={0} aria-label="Client sites" className="home-rail relative mt-10 flex gap-4 overflow-x-auto pb-2 lg:mt-14 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0">
          {PROOF.clients.map((c) => (
            <li key={c.name} className="w-[78%] shrink-0 sm:w-[44%] lg:w-auto">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block">
                <span className="block overflow-hidden rounded-xl bg-card shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/5">
                  <span className="flex items-center gap-1.5 border-b border-line bg-paper px-2.5 py-2" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-line-2" />
                    <span className="h-1.5 w-1.5 rounded-full bg-line-2" />
                    <span className="h-1.5 w-1.5 rounded-full bg-line-2" />
                    <span className="ml-1.5 truncate font-mono text-[0.6875rem] text-ink-3">{c.host}</span>
                  </span>
                  <span className="relative block aspect-[16/10]">
                    <Image src={c.img} alt={`The ${c.name} website`} fill sizes="(min-width: 1024px) 18rem, (min-width: 640px) 44vw, 78vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
                  </span>
                </span>
                <span className="mt-3 flex items-center gap-1.5 text-[1.0625rem] font-semibold">
                  {c.name}
                  <External className="text-mist transition-colors group-hover:text-ivory" />
                  <span className="sr-only">(opens the live site in a new tab)</span>
                </span>
                <span className="block text-[0.875rem] text-mist">
                  {c.industry} · {c.built}
                </span>
              </a>
            </li>
          ))}
          <li className="w-[78%] shrink-0 sm:w-[44%] lg:w-auto">
            <a
              href={PROOF.allHref}
              className="group flex aspect-[16/10] h-auto w-full flex-col justify-between rounded-xl border border-graphite-2 p-5 transition-colors hover:border-halo/60 lg:aspect-auto lg:h-[calc(100%-3.75rem)]"
            >
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-halo">More work</span>
              <span className="flex items-center gap-2 text-[1.25rem] font-semibold">
                {PROOF.allLabel}
                <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
