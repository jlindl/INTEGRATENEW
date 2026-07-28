/**
 * AnyNiche — the "the wall is a sample, not a menu" beat. The grid above shows a
 * curated handful; this section makes the real promise explicit: a bespoke
 * website for any business in any niche. A wide, quiet marquee of industries
 * (the ones we already have cases for highlighted) carries the breadth without
 * a wall of text.
 */
import { Reveal } from "@/components/ui/Reveal";
import { NICHES } from "@/lib/webDesignData";
import { ChapterBreak } from "./interactions/ChapterBreak";

/* Industries we've built cases for read as "known" (highlighted); the rest are
   illustrative breadth — kept in code, not the niche data, because they don't
   have their own pages yet. */
const BUILT = NICHES.map((n) => n.name);
const MORE = [
  "Roofers",
  "Landscapers",
  "Gyms & Studios",
  "Hair & Beauty",
  "Estate Agents",
  "Architects",
  "Consultants",
  "Physiotherapists",
  "Opticians",
  "Veterinary",
  "Cafés & Bars",
  "Removals",
  "Cleaning Services",
  "HVAC",
  "Solar Installers",
  "Driving Schools",
  "Wedding Venues",
  "Coaches",
  "Ecommerce Brands",
  "SaaS Startups",
];

const INDUSTRIES: { label: string; built: boolean }[] = [
  ...BUILT.map((label) => ({ label, built: true })),
  ...MORE.map((label) => ({ label, built: false })),
];

/* One seamless marquee row. `dir` flips travel direction so two stacked rows
   drift apart. Duplicated content so the loop has no visible seam. */
function MarqueeRow({
  items,
  dir = "left",
}: {
  items: { label: string; built: boolean }[];
  dir?: "left" | "right";
}) {
  return (
    <div className="mask-fade-x flex overflow-hidden py-3" aria-hidden="true">
      <div
        className={`flex shrink-0 items-center gap-8 pr-8 ${
          dir === "left" ? "animate-marquee-slow" : "animate-marquee-slow-reverse"
        }`}
      >
        {[...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span
              className={`font-display-tuned text-lg ${
                it.built ? "text-ivory" : "text-mist"
              }`}
            >
              {it.label}
            </span>
            <span
              className={`h-1 w-1 rounded-full ${it.built ? "bg-iris" : "bg-halo-dim"}`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function AnyNiche() {
  /* Split the list across two rows so the band feels dense but readable. */
  const half = Math.ceil(INDUSTRIES.length / 2);
  const rowA = INDUSTRIES.slice(0, half);
  const rowB = INDUSTRIES.slice(half);

  return (
    <section
      id="any-niche"
      aria-labelledby="any-niche-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* whisper of the sub-brand violet behind the statement */}
      <div className="glow-iris pointer-events-none absolute inset-0" aria-hidden="true" />
      <ChapterBreak index="02" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal as="p" className="eyebrow text-halo-dim">
            Any business
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            <span
              id="any-niche-heading"
              className="mt-5 block font-display-tuned text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.06] text-ivory"
            >
              If your customers are online, we&apos;ll build the website that{" "}
              <span className="text-platinum">wins them.</span>
            </span>
          </Reveal>
          <Reveal as="p" delay={0.12} className="mx-auto mt-6 max-w-[58ch] text-lg leading-relaxed text-mist">
            The grid above is just a sample, and the range is the point. We
            build websites and mobile apps for pretty much any business, shaped
            around how your customers actually decide and buy. Tell us how you
            win work, and we&apos;ll build the thing that does it.
          </Reveal>
        </div>
      </div>

      {/* Industry marquee — two rows drifting apart. */}
      <div className="relative mt-16 flex flex-col gap-1 border-y border-graphite py-6 md:mt-20">
        <MarqueeRow items={rowA} dir="left" />
        <MarqueeRow items={rowB} dir="right" />
      </div>

      <div className="container-x relative">
        <Reveal as="p" delay={0.06} className="mx-auto mt-14 max-w-2xl text-center text-sm text-mist-2">
          Don&apos;t see your line of work? That&apos;s the point.{" "}
          <a
            href="#contact"
            className="text-mist underline decoration-graphite-2 underline-offset-4 transition-colors hover:text-ivory"
          >
            Tell us what you do.
          </a>
        </Reveal>
      </div>
    </section>
  );
}
