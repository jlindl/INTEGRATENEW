/**
 * BrandWall — "brands we've worked with", rendered as typographic logo lockups
 * (a geometric mark + a wordmark in one of three voices) rather than image
 * assets. Each lockup is a link out to that client's live site. Monochrome
 * ink-3 at rest, resolving to full ink on hover, so the whole row reads as a
 * restrained, credible logo wall. Static server component; the entrance
 * stagger comes from the shared Reveal primitives.
 */
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Mark } from "@/components/testimonials/marks";
import { CLIENTS, type Client } from "@/lib/testimonialsData";

/* Wordmark voices — the trick that makes text logos look like distinct real
   brands instead of one repeated label. */
const VOICE: Record<Client["voice"], string> = {
  sans: "font-semibold tracking-tight text-[1.35rem]",
  serif: "font-display-tuned font-medium tracking-tight text-[1.45rem]",
  mono: "font-mono uppercase tracking-[0.16em] text-[1.02rem]",
};

function BrandLockup({ client }: { client: Client }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-3 px-5 py-4 text-ink-3 transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] hover:text-ink"
      aria-label={`${client.name}, ${client.industry} — visit website (opens in a new tab)`}
    >
      <Mark
        mark={client.mark}
        className="shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5"
      />
      <span className={`whitespace-nowrap leading-none ${VOICE[client.voice]}`}>
        {client.name}
      </span>
      {/* External-link cue, revealed on hover */}
      <span
        aria-hidden="true"
        className="-ml-1 translate-y-0.5 text-[0.8rem] opacity-0 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100"
      >
        ↗
      </span>
    </a>
  );
}

export function BrandWall() {
  return (
    <section aria-labelledby="brands-heading" className="hairline-t bg-paper-2 py-20 md:py-28">
      <div className="container-x">
        <div className="text-center">
          <Reveal as="p" className="eyebrow">
            Brands we&apos;ve worked with
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="brands-heading"
              className="font-display-tuned mx-auto mt-5 max-w-[20ch] text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.08] text-ink"
            >
              Teams that trusted us to{" "}
              <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
                build it right.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Logo wall — a centered, framed logo cloud. Flowing (rather than a
            rigid grid) so any number of clients wraps into balanced, centered
            rows with no orphan cells. */}
        <RevealGroup
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 rounded-2xl border border-line bg-card px-5 py-6 sm:gap-x-10 md:mt-16 md:px-8"
          staggerChildren={0.07}
        >
          {CLIENTS.map((client) => (
            <RevealItem key={client.name}>
              <BrandLockup client={client} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="p" delay={0.2} className="mt-10 text-center font-mono text-[0.7rem] text-ink-3">
          Every logo links to the live site we built.
        </Reveal>
      </div>
    </section>
  );
}
