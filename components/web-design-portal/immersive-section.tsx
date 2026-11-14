import Frame from "@/components/web-design-portal/frame";
import { SparkIcon } from "@/components/web-design-portal/icons";
import ImmersiveGrid from "@/components/web-design-portal/immersive-grid";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import { IMMERSIVE_DEMOS } from "@/lib/immersiveDemos";

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const COUNT = NUMBER_WORDS[IMMERSIVE_DEMOS.length] ?? String(IMMERSIVE_DEMOS.length);
const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Immersive homepages: scroll-driven demo homepages, one per trade, that live
 * on this site at /web-design/immersive/<slug>. The list and its wording come
 * from lib/immersiveDemos.ts, so the count in the copy cannot drift from the
 * cards beneath it.
 */
export default function ImmersiveSection() {
  return (
    <section
      id="immersive"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[12%] z-0 h-[720px] bg-[radial-gradient(55%_50%_at_50%_50%,rgba(103,11,178,0.3),transparent_72%)]"
      />
      <Frame />

      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 py-24 sm:px-10 lg:py-36">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
              <SparkIcon className="h-4 w-4 text-neon-200" />
              Immersive Homepages
            </span>
          </Reveal>

          <RevealText
            as="h2"
            className="display display-xl mt-8 text-white"
            parts={[
              "Homepages",
              "\n",
              "You",
              { text: "Scroll Through", className: "text-shine inline-block" },
            ]}
          />

          <Reveal delay={150}>
            <p className="mt-7 max-w-[64ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-balance text-white/60">
              {capitalise(COUNT)} working demos, one per trade. Each is built around a scene from the trade itself that
              plays as you scroll: a roof laid course by course, bifold doors that fold open, a thermostat you turn with
              your thumb. The businesses are made up; the pages are real and run on this site. Hover a card to watch its
              scene, or open it and scroll.
            </p>
          </Reveal>
        </div>

        {/* No Reveal round the grid: each card reveals itself (see ImmersiveGrid). */}
        <div className="mt-12 lg:mt-16">
          <ImmersiveGrid />
        </div>
      </div>
    </section>
  );
}
