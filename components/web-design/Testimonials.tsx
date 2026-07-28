/**
 * Testimonials — social proof for the hub, drawn from the real web design
 * clients we've built for (see lib/testimonialsData / webDesignClients). Dark-
 * themed to match the room; every card links out to that client's live site, so
 * a reader can go straight from the result to the work. E-commerce-only and
 * non-web projects are excluded — this beat speaks only to web design.
 *
 * Static server component. Each card is a studio-voice *outcome* (what we built
 * + the result), not a client quote — so nothing is presented as their words.
 * Names, industries, and live links are real.
 */
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Mark } from "@/components/testimonials/marks";
import { webDesignClients, type Client } from "@/lib/testimonialsData";
import { ChapterBreak } from "./interactions/ChapterBreak";

const CLIENTS = webDesignClients();

function ClientCard({ client }: { client: Client }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${client.name}, visit the live site (opens in a new tab)`}
      className="group flex h-full flex-col rounded-[1.4rem] border border-graphite bg-carbon-2 p-8 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-1 hover:border-graphite-2"
    >
      <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-halo-dim">
        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-iris" />
        {client.tag}
      </p>
      <p className="mt-6 flex-1 text-lg leading-relaxed text-ivory">
        {client.outcome ?? client.quote}
      </p>
      <div className="mt-8 flex items-center gap-3.5 border-t border-graphite pt-6">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-graphite-2 bg-carbon text-iris-soft"
        >
          <Mark mark={client.mark} size={20} />
        </span>
        <span className="flex flex-col">
          <span className="font-medium text-ivory">{client.name}</span>
          <span className="text-[0.85rem] text-mist">{client.industry}</span>
        </span>
        <span
          aria-hidden="true"
          className="ml-auto text-mist-2 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-halo"
        >
          ↗
        </span>
      </div>
    </a>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-24 md:py-32"
    >
      <ChapterBreak index="04" />
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow text-halo-dim">
            Selected clients
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            <span
              id="testimonials-heading"
              className="mt-5 block font-display-tuned text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.06] text-ivory"
            >
              Websites that earn their keep.
            </span>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-6 md:grid-cols-2"
          staggerChildren={0.1}
        >
          {CLIENTS.map((client) => (
            <RevealItem key={client.name} as="li" className="h-full">
              <ClientCard client={client} />
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-10 text-center font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist-2">
          Every card links to the live site.
        </p>
      </div>
    </section>
  );
}
