import FaqList from "@/components/web-design-portal/faq-list";
import Frame from "@/components/web-design-portal/frame";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import { CONTACT } from "@/components/web-design-portal/site-data";
import { ArrowUpRight, SparkIcon } from "@/components/web-design-portal/icons";

export default function FaqSection() {
  return (
    <section
      id="faq"
      /* `overflow-clip`, not hidden — the heading column is `position: sticky`. */
      className="relative isolate overflow-clip border-t border-white/[0.06] bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      <Frame />

      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 py-24 sm:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
                <SparkIcon className="h-4 w-4 text-neon-200" />
                FAQ
              </span>
            </Reveal>

            <RevealText
              as="h2"
              className="display display-lg mt-8 text-white"
              parts={[
                "Frequently",
                "\n",
                "Asked",
                "\n",
                { text: "Questions", className: "text-shine inline-block" },
              ]}
            />

            <Reveal delay={150}>
              <p className="mt-7 max-w-[40ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-white/60">
                Something else on your mind? WhatsApp is the fastest way to
                reach us.
              </p>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-grow group mt-5 inline-flex items-center gap-2 text-[clamp(1.05rem,1.4vw,1.4rem)] font-medium text-neon-300 transition-colors hover:text-neon-200"
              >
                WhatsApp {CONTACT.whatsappDisplay}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <FaqList />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
