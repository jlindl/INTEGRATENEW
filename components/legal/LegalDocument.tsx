/**
 * LegalDocument — renders one legal/regulatory document (from lib/legalData) as
 * a clean, readable editorial page in the light main-site theme. Static server
 * component. A "related documents" footer cross-links the other policies.
 */
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LEGAL_DOCS, type LegalBlock, type LegalDoc } from "@/lib/legalData";

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "ul") {
    return (
      <ul className="my-4 flex flex-col gap-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 leading-relaxed text-ink-2">
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="my-4 leading-relaxed text-ink-2">{block.text}</p>;
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const others = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);

  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative">
        {/* Header */}
        <Reveal className="max-w-[70ch]">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Legal
          </p>
          <h1 className="font-display-tuned mt-6 text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.06] text-ink">
            {doc.title}
          </h1>
          <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-3">
            Last updated {doc.updated}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink-2">{doc.intro}</p>
        </Reveal>

        {/* Body */}
        <div className="mt-12 max-w-[70ch] hairline-t pt-10">
          {doc.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="font-display-tuned text-[clamp(1.35rem,2.4vw,1.7rem)] font-medium leading-tight text-ink">
                {section.heading}
              </h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
        </div>

        {/* Related documents */}
        <div className="mt-6 max-w-[70ch] hairline-t pt-8">
          <p className="eyebrow mb-4">More policies</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {others.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/legal/${d.slug}`}
                  className="group inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:text-accent"
                >
                  {d.label}
                  <span
                    aria-hidden="true"
                    className="text-ink-3 transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
