import { Reveal } from "@/components/ui/Reveal";
import { BrandWall } from "@/components/testimonials/BrandWall";
import { Reviews } from "@/components/testimonials/Reviews";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

/**
 * /testimonials — an editorial header, the "brands we've worked with" logo
 * wall, the client reviews, and the shared closing CTA. Reuses the main site's
 * light theme, nav, and footer (wired in the segment layout).
 */

function Stars() {
  return (
    <div className="flex gap-1 text-accent" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="17" height="17" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.47 5.26 5.78.62-4.32 3.9 1.2 5.72L10 14.3l-5.13 2.7 1.2-5.72L1.75 7.4l5.78-.62L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="container-x relative">
          <div className="max-w-3xl">
            <Reveal as="p" className="eyebrow flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Client stories
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display-tuned mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.05] text-ink">
                Don&apos;t take our word{" "}
                <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
                  for it.
                </span>
              </h1>
            </Reveal>
            <Reveal as="p" delay={0.16} className="mt-7 max-w-[54ch] text-lg leading-relaxed text-ink-2">
              We build systems and sites that quietly do their job long after we
              hand them over. Here are a few of the teams we&apos;ve done it for,
              and what they had to say.
            </Reveal>
            <Reveal delay={0.22} className="mt-8 flex flex-wrap items-center gap-4">
              <Stars />
              <span className="text-[0.9rem] text-ink-2">
                Rated five stars by the clients we&apos;ve partnered with.
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      <BrandWall />
      <Reviews />
      <ClosingCTA />
    </>
  );
}
