/**
 * Reviews — the testimonials proper. One client is promoted to a large
 * featured pull-quote (with the brand chevron as the quote mark); the rest sit
 * in a card grid. Every card and the featured quote link out to that client's
 * live site (new tab), so a reader can go straight from the words to the work.
 * Light main-site theme, static server component, staggered reveals.
 */
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/LogoMark";
import { Mark } from "@/components/testimonials/marks";
import { CLIENTS, type Client } from "@/lib/testimonialsData";

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-1 text-accent ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.47 5.26 5.78.62-4.32 3.9 1.2 5.72L10 14.3l-5.13 2.7 1.2-5.72L1.75 7.4l5.78-.62L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/* Brand mark in a bordered chip — the review's "avatar", tied to the logo wall. */
function BrandAvatar({ client }: { client: Client }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-2 bg-paper-2 text-ink-2"
    >
      <Mark mark={client.mark} size={22} />
    </span>
  );
}

function Attribution({ client }: { client: Client }) {
  return (
    <span className="flex flex-col">
      <span className="font-medium text-ink">{client.name}</span>
      <span className="text-[0.85rem] text-ink-3">{client.industry}</span>
    </span>
  );
}

function ReviewCard({ client }: { client: Client }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-[1.4rem] border border-line bg-card p-7 shadow-lift transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-float md:p-8"
      aria-label={`Read more about our work with ${client.name} (opens in a new tab)`}
    >
      <div className="flex items-center justify-between">
        <Stars />
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-3">
          {client.tag}
        </span>
      </div>
      <blockquote className="mt-6 flex-1 leading-relaxed text-ink-2">
        &ldquo;{client.quote}&rdquo;
      </blockquote>
      <div className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
        <BrandAvatar client={client} />
        <Attribution client={client} />
        {/* External-link cue */}
        <span
          aria-hidden="true"
          className="ml-auto text-ink-3 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        >
          ↗
        </span>
      </div>
    </a>
  );
}

export function Reviews() {
  const featured = CLIENTS.find((c) => c.featured) ?? CLIENTS[0];
  const rest = CLIENTS.filter((c) => c !== featured);

  return (
    <section aria-labelledby="reviews-heading" className="bg-paper py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            In their words
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="reviews-heading"
              className="font-display-tuned mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.06] text-ink"
            >
              The results speak,{" "}
              <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
                so do our clients.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Featured pull-quote — links to the featured client's live site. */}
        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${featured.name} (opens in a new tab)`}
            className="group relative block overflow-hidden rounded-[1.75rem] border border-line bg-card p-8 shadow-lift transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-float md:p-14"
          >
            <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <LogoMark className="h-8 w-8" />
              <blockquote className="font-display-tuned mt-7 max-w-[24ch] text-[clamp(1.5rem,3.2vw,2.4rem)] font-medium leading-[1.2] text-ink md:max-w-[30ch]">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
                <BrandAvatar client={featured} />
                <Attribution client={featured} />
                <span className="ml-auto flex items-center gap-3">
                  <Stars />
                  <span className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-3">
                    {featured.tag}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </span>
                </span>
              </figcaption>
            </div>
          </a>
        </Reveal>

        {/* The rest */}
        <RevealGroup
          className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-2 lg:grid-cols-3"
          staggerChildren={0.09}
        >
          {rest.map((client) => (
            <RevealItem key={client.name} className="h-full">
              <ReviewCard client={client} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="p" delay={0.2} className="mt-12 font-mono text-[0.7rem] text-ink-3">
          * Placeholder quotes on real projects — replaced with each client&apos;s own words before launch. Every card links to the live site.
        </Reveal>
      </div>
    </section>
  );
}
