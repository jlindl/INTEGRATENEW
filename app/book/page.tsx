import { BookCallForm } from "@/components/sections/BookCallForm";
import { LogoMark } from "@/components/ui/LogoMark";
import { Reveal } from "@/components/ui/Reveal";
import { LEGAL_DOCS } from "@/lib/legalData";

/**
 * /book — the destination for the "Book a call" row on /links.
 *
 * A single-purpose landing page: mark, one line of context, the form. There's
 * deliberately no nav and no links out beyond a back arrow to /links, so
 * someone who came from a social bio finishes the form instead of being
 * dropped into the middle of the marketing site.
 */
export default function BookPage() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-14 sm:pt-20">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-2xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="font-display-tuned text-xl font-medium text-ink">
              Integrate
            </span>
          </span>

          <h1 className="font-display-tuned mt-7 text-[clamp(1.9rem,7vw,2.75rem)] font-medium leading-[1.1] text-ink">
            Book a{" "}
            <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
              strategy call.
            </span>
          </h1>

          <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-relaxed text-ink-2">
            Thirty minutes, no pressure. We&apos;ll map out which AI systems
            would have the highest ROI for your business.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <BookCallForm source="Book a call page" />
        </Reveal>

        <Reveal delay={0.2} className="mt-12 border-t border-line pt-7 text-center">
          <a
            href="/links"
            className="group inline-flex items-center gap-2 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3 transition-colors duration-300 hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back
          </a>

          <nav aria-label="Legal" className="mt-3 flex flex-wrap justify-center gap-x-5">
            {LEGAL_DOCS.map((doc) => (
              <a
                key={doc.slug}
                href={`/legal/${doc.slug}`}
                className="inline-block py-2.5 text-[0.75rem] text-ink-3 transition-colors duration-300 hover:text-ink sm:py-1"
              >
                {doc.label}
              </a>
            ))}
          </nav>
          <p className="mt-3 font-mono text-[0.7rem] text-ink-3">
            © 2026 Integrate AI Solutions Limited
          </p>
        </Reveal>
      </div>
    </section>
  );
}
