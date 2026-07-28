/**
 * ContactBand — the closing "Want this for your business?" beat. Shared by the
 * hub (as the #contact section) and every niche detail page. The primary action
 * routes back into the main Integrate site's book-a-call flow, keeping the two
 * experiences one connected building.
 */
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/LogoMark";
import { MagneticLink } from "./interactions/MagneticLink";
import { ChapterBreak } from "./interactions/ChapterBreak";

export function ContactBand({ nicheName }: { nicheName?: string }) {
  const heading = nicheName
    ? `Want a website like this for your ${nicheName.toLowerCase()} business?`
    : "Want this for your business?";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div className="glow-halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="glow-iris pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Closing chapter: divider only — the centered lockup owns the space. */}
      <ChapterBreak index="06" ghost={false} />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <LogoMark tone="light" className="mx-auto h-7 w-7" />
            <p className="eyebrow mt-7 text-halo-dim">Let&apos;s build yours</p>
          </Reveal>

          <Reveal as="h2" delay={0.06}>
            <span
              id="contact-heading"
              className="mt-6 block font-display-tuned text-[clamp(2.1rem,5vw,3.6rem)] font-medium leading-[1.06] text-ivory"
            >
              {heading}
            </span>
          </Reveal>

          <Reveal as="p" delay={0.12} className="mx-auto mt-7 max-w-[52ch] text-lg leading-relaxed text-mist">
            Tell us about your business and how you win customers. We&apos;ll
            design a site built to sell the way you actually sell.
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticLink
              href="/#book-call"
              className="group inline-flex items-center gap-2.5 rounded-full bg-halo px-8 py-4 text-base font-semibold text-carbon transition-colors duration-300 hover:bg-ivory"
            >
              Book a strategy call
              <span aria-hidden="true" className="transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                →
              </span>
            </MagneticLink>
            <MagneticLink
              href="/web-design#work"
              className="inline-flex items-center gap-2.5 rounded-full border border-graphite-2 px-8 py-4 text-base font-medium text-ivory transition-colors duration-300 hover:border-mist"
            >
              See more of our work
            </MagneticLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
