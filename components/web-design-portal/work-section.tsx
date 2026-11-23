import Frame from "@/components/web-design-portal/frame";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import WorkGrid from "@/components/web-design-portal/work-grid";
import { SparkIcon } from "@/components/web-design-portal/icons";

/** Live client sites, laid out as a grid like the working demos below it. */
export default function WorkSection() {
  return (
    <section
      id="work"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[12%] z-0 h-[640px] bg-[radial-gradient(55%_50%_at_50%_50%,rgba(103,11,178,0.26),transparent_72%)]"
      />
      <Frame />

      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 py-24 sm:px-10 lg:py-36">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
              <SparkIcon className="h-4 w-4 text-neon-200" />
              Client Work
            </span>
          </Reveal>

          <RevealText
            as="h2"
            className="display display-xl mt-8 text-white"
            parts={[
              "Live Now, for",
              "\n",
              { text: "Real Businesses", className: "text-shine inline-block" },
            ]}
          />

          <Reveal delay={150}>
            <p className="mt-7 max-w-[60ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-balance text-white/60">
              Sites we have built for UK businesses, from oral care and
              streetwear to insurance, hospitality and joinery. Each one opens
              the live site.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16">
          <WorkGrid />
        </div>
      </div>
    </section>
  );
}
