/**
 * WebDesignPromo — a dedicated homepage beat for Integrate Web Design. A dark
 * carbon band dropped into the light page (a preview of the "other room"), with
 * the sub-brand's atmosphere (platinum + iris blooms, faint linework), its own
 * CTAs into the hub, a compact proof strip, and a fan of three fully-designed
 * example homepages — three different styles and vibes — so the range is
 * visible at a glance. `theme-portfolio` scopes the dark eyebrow + focus styles.
 */
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { WebDesignCta } from "@/components/ui/WebDesignCta";
import { NICHES } from "@/lib/webDesignData";

/* Three truthful capability claims — the same story the hub's Craft beat tells,
   compressed to a scannable strip. */
const PROOF = [
  "Bespoke, never templated",
  "Engineered to load fast",
  "Built to convert",
];

/* Three rendered example homepages, each a distinct identity. */
const EXAMPLES = [
  {
    src: "/mockups/luxe-fashion.jpg",
    domain: "maisonvoss.com",
    alt: "Example homepage design for a luxury fashion house: dark, editorial, with gold accents",
    frame: "relative z-20 rotate-[-3deg]",
  },
  {
    src: "/mockups/fintech-saas.jpg",
    domain: "axispay.com",
    alt: "Example homepage design for a fintech platform: bright, modern, with a product dashboard",
    frame: "relative z-10 -mt-[13%] ml-auto w-[87%] rotate-[2.6deg]",
  },
  {
    src: "/mockups/wellness-retreat.jpg",
    domain: "solstice.co",
    alt: "Example homepage design for a coastal wellness retreat: warm, organic, editorial",
    frame: "relative z-0 -mt-[11%] mr-auto w-[73%] rotate-[-1.8deg]",
  },
];

/* A browser-chrome frame around one rendered homepage, so it reads as a real
   screenshot rather than a floating image. */
function SiteCard({
  src,
  domain,
  alt,
  frame,
  priority,
}: {
  src: string;
  domain: string;
  alt: string;
  frame: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-graphite bg-carbon-2 shadow-[0_44px_90px_-40px_rgba(0,0,0,0.95)] ${frame}`}
    >
      <div className="flex items-center gap-2 border-b border-graphite/80 bg-carbon-3 px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-carbon px-3 py-1 font-mono text-[0.62rem] tracking-wide text-mist-2">
          <svg width="9" height="9" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="3" y="7" width="10" height="7" rx="1.4" fill="currentColor" />
            <path d="M5.2 7V5.2a2.8 2.8 0 0 1 5.6 0V7" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          {domain}
        </span>
      </div>
      <Image
        src={src}
        width={1440}
        height={900}
        alt={alt}
        priority={priority}
        sizes="(max-width: 1024px) 88vw, 560px"
        className="h-auto w-full"
      />
    </div>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0"
    >
      <circle cx="8" cy="8" r="8" fill="rgba(168,85,247,0.16)" />
      <path
        d="M4.5 8.2 L7 10.5 L11.5 5.5"
        stroke="#c084fc"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WebDesignPromo() {
  const industries = NICHES.slice(0, 5);

  return (
    <section
      id="web-design"
      aria-labelledby="wd-promo-heading"
      className="theme-portfolio relative overflow-hidden bg-carbon py-20 text-ivory md:py-36"
    >
      {/* Atmosphere — grain, platinum + iris blooms, and a faint engineered
          grid, echoing the portfolio hub this band previews. */}
      <div
        aria-hidden="true"
        className="grain-dark pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
      />
      <div className="glow-halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="glow-iris pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgb(201_206_215/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(201_206_215/0.04)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(80%_70%_at_70%_20%,black,transparent_78%)]"
      />
      {/* Hairline top edge, so the band reads as a deliberate chapter. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-graphite-2 to-transparent"
      />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
          {/* ---- Copy + CTAs ---- */}
          <div>
            <Reveal as="p" className="eyebrow flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-iris" aria-hidden="true" />
              Integrate Web Design
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="wd-promo-heading"
                className="font-display-tuned mt-6 text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium leading-[1.05] text-ivory"
              >
                Web design that looks like it cost{" "}
                <span className="italic text-platinum [font-variation-settings:'opsz'_90,'SOFT'_50,'WONK'_0]">
                  six figures.
                </span>
              </h2>
            </Reveal>

            <Reveal as="p" delay={0.12} className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mist">
              Beyond the systems, we design bespoke, industry-specific websites,
              tuned to how your market actually buys. No templates, just the most
              convincing version of your business online.
            </Reveal>

            {/* Proof strip */}
            <Reveal delay={0.16} className="mt-8">
              <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {PROOF.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[0.95rem] text-ivory/90">
                    <Check />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center gap-4">
              <WebDesignCta size="lg" label="Explore Integrate Web Design" className="inline-flex" />
              <a
                href="/#book-call"
                className="inline-flex items-center gap-2.5 rounded-full border border-graphite-2 px-7 py-3.5 text-[0.9375rem] font-medium text-ivory transition-colors duration-300 hover:border-mist"
              >
                Book a call
              </a>
            </Reveal>

            <Reveal delay={0.26} className="mt-9 flex flex-wrap gap-2">
              {industries.map((n) => (
                <span
                  key={n.slug}
                  className="rounded-full border border-graphite px-3.5 py-1.5 font-mono text-[0.78rem] text-mist"
                >
                  {n.forLabel}
                </span>
              ))}
              <span className="rounded-full px-3.5 py-1.5 font-mono text-[0.78rem] text-halo-dim">
                + many more
              </span>
            </Reveal>
          </div>

          {/* ---- Example homepages — three different styles and vibes ---- */}
          <Reveal delay={0.1} className="relative">
            <div className="glow-iris pointer-events-none absolute -inset-12" aria-hidden="true" />
            <div className="glow-halo pointer-events-none absolute -inset-10" aria-hidden="true" />

            <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
              {/* Floating marker, echoing the demo sites' own cards. */}
              <div
                aria-hidden="true"
                className="absolute -top-4 right-2 z-30 flex items-center gap-2 rounded-full border border-graphite bg-carbon-2/90 px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist shadow-[0_12px_30px_-16px_rgba(0,0,0,0.9)] backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-iris motion-safe:animate-pulse" />
                Sample designs
              </div>

              {EXAMPLES.map((ex, i) => (
                <SiteCard key={ex.src} {...ex} priority={i === 0} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
