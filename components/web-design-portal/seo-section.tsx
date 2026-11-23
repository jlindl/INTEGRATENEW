import Frame from "@/components/web-design-portal/frame";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import { SEO } from "@/components/web-design-portal/site-data";
import { SparkIcon } from "@/components/web-design-portal/icons";

/**
 * SEO: how every build is set up to be found. The points live in
 * site-data.ts (`SEO`) so the wording sits with the rest of the page's facts.
 */
export default function SeoSection() {
  return (
    <section
      id="seo"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[30%] z-0 h-[560px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(103,11,178,0.22),transparent_72%)]"
      />
      <Frame />

      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 py-24 sm:px-10 lg:py-36">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
              <SparkIcon className="h-4 w-4 text-neon-200" />
              SEO
            </span>
          </Reveal>

          <RevealText
            as="h2"
            className="display display-xl mt-8 text-white"
            parts={[
              "Built to Be",
              "\n",
              { text: "Found on Google", className: "text-shine inline-block" },
            ]}
          />

          <Reveal delay={150}>
            <p className="mt-7 max-w-[58ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-balance text-white/60">
              A great-looking site does nothing if nobody finds it. Every build
              is set up so search engines understand it from day one, and so
              the people searching for what you do land on your pages, not a
              competitor&rsquo;s.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {SEO.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 90}
              className="group flex flex-col bg-abyss p-7 transition-colors duration-300 hover:bg-white/[0.035] lg:p-9"
            >
              <span className="label-mono text-white/35 transition-colors duration-300 group-hover:text-neon-300">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-[1.35rem] font-medium tracking-[-0.02em] text-white">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-white/55">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
