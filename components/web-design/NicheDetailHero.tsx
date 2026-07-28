/**
 * NicheDetailHero — the top of a niche detail page. A breadcrumb back to the
 * grid, the industry title + positioning, and a large showcase of the website
 * design (mockup now, real screenshot later via `niche.cover`).
 */
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { categoryLabel, type Niche } from "@/lib/webDesignData";
import { NicheMockup } from "./NicheMockup";

export function NicheDetailHero({ niche }: { niche: Niche }) {
  return (
    <section aria-labelledby="niche-heading" className="relative overflow-hidden pt-32 md:pt-40">
      <div className="glow-halo pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative">
        <Reveal className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist-2">
          <Link href="/web-design#work" className="transition-colors hover:text-ivory">
            All work
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-halo-dim">{categoryLabel(niche.category)}</span>
        </Reveal>

        <Reveal as="h1" delay={0.05}>
          <span
            id="niche-heading"
            className="mt-6 block font-display-tuned text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.03] tracking-tight text-ivory"
          >
            {niche.forLabel}
          </span>
        </Reveal>

        <Reveal as="p" delay={0.1} className="mt-6 max-w-[58ch] text-lg leading-relaxed text-mist md:text-xl">
          {niche.positioning}
        </Reveal>

        {/* Meta line */}
        <Reveal delay={0.16} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.75rem] text-mist-2">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{ background: niche.palette.accent }}
            />
            Accent: {niche.accentName}
          </span>
          <span className="hidden h-3 w-px bg-graphite-2 sm:block" aria-hidden="true" />
          <span>Industry: {niche.name}</span>
          {niche.featured && (
            <>
              <span className="hidden h-3 w-px bg-graphite-2 sm:block" aria-hidden="true" />
              <span className="text-halo">Flagship build</span>
            </>
          )}
        </Reveal>

        {/* Live demo — the real, working site this case study describes */}
        {niche.demo && (
          <Reveal delay={0.22} className="mt-9">
            <Link
              href={niche.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="group inline-flex items-center gap-3 rounded-full bg-ivory px-7 py-3.5 text-[0.95rem] font-medium text-carbon transition-colors duration-300 hover:bg-iris-soft"
            >
              Visit the live demo
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path d="M4 12 L12 4 M6 4 h6 v6" />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </Link>
          </Reveal>
        )}
      </div>

      {/* Showcase */}
      <div className="container-x relative mt-14 md:mt-20">
        <Reveal as="figure" delay={0.1}>
          <div className="relative rounded-[1.6rem] border border-graphite bg-carbon-2 p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] md:p-3">
            {/* soft platinum halo behind the frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 -z-10 opacity-70"
              style={{ background: "radial-gradient(50% 40% at 50% 30%, rgba(201,206,215,0.12), transparent 70%)" }}
            />
            {niche.cover ? (
              <Image
                src={niche.cover.src}
                width={niche.cover.width}
                height={niche.cover.height}
                alt={`${niche.name} website design`}
                placeholder={niche.cover.blurDataURL ? "blur" : "empty"}
                blurDataURL={niche.cover.blurDataURL}
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="h-auto w-full rounded-[1.1rem]"
              />
            ) : (
              <NicheMockup niche={niche} className="rounded-[1.1rem]!" watermark />
            )}
          </div>
          <figcaption className="mt-4 text-center font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist-2">
            {niche.cover
              ? "A snapshot of the live site · open the full working demo above"
              : niche.demo
                ? "Representative mockup · the full working site is one click away above"
                : "Representative mockup · final build ships with real, optimised screenshots"}
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
