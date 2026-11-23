import BuildShowcase from "@/components/web-design-portal/build-showcase";
import Frame from "@/components/web-design-portal/frame";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import { SparkIcon } from "@/components/web-design-portal/icons";

export default function BuildSection() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      <Frame />

      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 py-24 sm:px-10 lg:py-36">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
              <SparkIcon className="h-4 w-4 text-neon-200" />
              What We Build
            </span>
          </Reveal>

          <RevealText
            as="h2"
            className="display display-xl mt-8 text-white"
            parts={[
              "From Landing Page",
              "\n",
              "to",
              { text: "App Store", className: "text-shine inline-block" },
            ]}
          />

          <Reveal delay={150}>
            <p className="mt-7 max-w-[56ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-balance text-white/60">
              Websites, portals and apps. Whichever one you need, you get the
              design and the plumbing from one team.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-16 lg:mt-20">
          <BuildShowcase />
        </Reveal>
      </div>
    </section>
  );
}
