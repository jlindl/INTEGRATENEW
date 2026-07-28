/**
 * NicheDetailContent — the write-up beneath the showcase: the brief, the
 * audience, why the layout works, illustrative design intents, and a
 * section-by-section breakdown with one "close-up" crop of the mockup.
 */
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Niche } from "@/lib/webDesignData";
import { DemoPreview } from "./DemoPreview";

function Block({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <h2 className="eyebrow text-halo-dim">{label}</h2>
      <p className="mt-3 leading-relaxed text-mist">{children}</p>
    </div>
  );
}

export function NicheDetailContent({ niche }: { niche: Niche }) {
  return (
    <div className="container-x py-24 md:py-32">
      {/* Brief / audience / rationale */}
      <RevealGroup className="grid gap-10 border-b border-graphite pb-16 md:grid-cols-3 md:gap-12">
        <RevealItem><Block label="The brief">{niche.brief}</Block></RevealItem>
        <RevealItem><Block label="The audience">{niche.audience}</Block></RevealItem>
        <RevealItem><Block label="Why it works">{niche.rationale}</Block></RevealItem>
      </RevealGroup>

      {/* Illustrative design intents */}
      <Reveal className="mt-16">
        <p className="eyebrow text-halo-dim">Design intent</p>
      </Reveal>
      <RevealGroup className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-graphite bg-graphite sm:grid-cols-3" staggerChildren={0.08}>
        {niche.metrics.map((m) => (
          <RevealItem key={m.label} as="div" className="bg-carbon-2 p-7">
            <div className="font-display-tuned text-[clamp(1.8rem,3vw,2.4rem)] font-medium text-halo">
              {m.value}
            </div>
            <div className="mt-2 text-sm leading-snug text-mist">{m.label}</div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Section-by-section */}
      <div className="mt-20 grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-halo-dim">In detail</p>
          <h2 className="mt-4 font-display-tuned text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-tight text-ivory">
            How the page is put together.
          </h2>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-mist">
            Each section earns its place. Below, the decisions that make this a{" "}
            {niche.name.toLowerCase()} website and not a generic template.
          </p>
        </Reveal>

        <RevealGroup className="flex flex-col divide-y divide-graphite" staggerChildren={0.09}>
          {niche.sections.map((s, i) => (
            <RevealItem key={s.title} as="div" className="flex gap-5 py-6 first:pt-0">
              <span className="font-mono text-[0.8rem] text-halo-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-medium text-ivory">{s.title}</h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-mist">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Section close-up — the live demo embedded (or a mock crop if none). */}
      <Reveal as="figure" className="mt-20">
        <DemoPreview niche={niche} />
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist-2">
          <span>{niche.demo ? "The live demo, above the fold" : "Above the fold, close up"}</span>
          <span>
            {niche.demo
              ? "Live embed · open the full working site above"
              : "Responsive & mobile layouts delivered with the final build"}
          </span>
        </figcaption>
      </Reveal>
    </div>
  );
}
