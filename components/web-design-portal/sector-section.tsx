import Frame from "@/components/web-design-portal/frame";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import SectorGrid from "@/components/web-design-portal/sector-grid";
import { SECTOR_BUILDS } from "@/components/web-design-portal/site-data";
import { SparkIcon } from "@/components/web-design-portal/icons";

const DEMOS = SECTOR_BUILDS.filter((build) => build.status === "demo").length;
const CLIENT_BUILDS = SECTOR_BUILDS.length - DEMOS;

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];
const word = (n: number) => NUMBER_WORDS[n] ?? String(n);
const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Built as one string rather than text interleaved with {expressions}: with
// the counts inline, the compiler dropped the space after an expression
// whenever the text that followed wrapped a line and held an HTML entity
// ("Sevenare working demos…"). The counts come from the data, so this
// sentence cannot fall out of step with the cards beneath it.
const SUMMARY =
  `${capitalise(word(SECTOR_BUILDS.length))} builds across trades, professional services, health, hospitality and clothing. ` +
  `${capitalise(word(DEMOS))} ${DEMOS === 1 ? "is a working demo" : "are working demos"} we built to show what we’d make for that sector, ` +
  `${word(CLIENT_BUILDS)} ${CLIENT_BUILDS === 1 ? "is a client’s live store" : "are clients’ live sites"}, and every card says which. Open any of them.`;

export default function SectorSection() {
  return (
    <section
      id="sectors"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] z-0 h-[640px] bg-[radial-gradient(55%_50%_at_50%_50%,rgba(103,11,178,0.26),transparent_72%)]"
      />
      <Frame />

      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 py-24 sm:px-10 lg:py-36">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
              <SparkIcon className="h-4 w-4 text-neon-200" />
              Browse by Sector
            </span>
          </Reveal>

          <RevealText
            as="h2"
            className="display display-xl mt-8 text-white"
            parts={[
              "The Websites",
              "\n",
              "We Build,",
              { text: "by Sector", className: "text-shine inline-block" },
            ]}
          />

          <Reveal delay={150}>
            <p className="mt-7 max-w-[62ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-balance text-white/60">
              {SUMMARY}
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-12 lg:mt-16">
          <SectorGrid />
        </Reveal>
      </div>
    </section>
  );
}
