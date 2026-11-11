import Frame from "@/components/web-design-portal/frame";
import IsoLattice from "@/components/web-design-portal/iso-lattice";
import Parallax from "@/components/web-design-portal/parallax";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import StudioStack from "@/components/web-design-portal/studio-stack";
import { SparkIcon } from "@/components/web-design-portal/icons";

export default function StudioSection() {
  return (
    <section
      id="studio"
      /* `overflow-clip`, not hidden — the cards below are `position: sticky`. */
      className="relative isolate overflow-clip border-t border-white/[0.06] bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      <Frame />

      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 pb-16 pt-24 sm:px-10 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
          {/* The lattice lags the page as it passes, so it sits behind the type. */}
          <Parallax distance={110}>
            <Reveal direction="zoom">
              <IsoLattice />
            </Reveal>
          </Parallax>

          <div className="text-center lg:text-left">
            <Reveal>
              <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
                <SparkIcon className="h-4 w-4 text-neon-200" />
                The Studio
              </span>
            </Reveal>

            <RevealText
              as="h2"
              stagger={40}
              className="display display-lg mt-8 text-white"
              parts={[
                "A Website Should Look Like It Was Made for Your Business,",
                { text: "Because It Was.", className: "text-shine inline-block" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <StudioStack />
        </div>
      </div>
    </section>
  );
}
