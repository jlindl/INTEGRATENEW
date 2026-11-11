import CountUp from "@/components/web-design-portal/count-up";
import Frame from "@/components/web-design-portal/frame";
import Magnetic from "@/components/web-design-portal/magnetic";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import { PRICING } from "@/components/web-design-portal/site-data";
import { ArrowRight, CheckIcon, SparkIcon } from "@/components/web-design-portal/icons";

// Sized so "£200" plus its "From" tag always fits inside half the container.
const NUMERAL =
  "text-[clamp(5rem,12.5vw,11.5rem)] font-semibold leading-[0.78] tracking-[-0.07em]";

function Included({
  items,
  tone,
}: {
  items: readonly string[];
  tone: "neon" | "ink";
}) {
  return (
    <ul className="mt-8 space-y-3.5 border-t border-current/15 pt-7">
      {items.map((item) => (
        <li key={item} className="flex gap-3.5 text-[16px] leading-[1.45] lg:text-[17px]">
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
              tone === "neon" ? "bg-white text-neon-600" : "bg-neon-500 text-white"
            }`}
          >
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          <span className={tone === "neon" ? "text-white/90" : "text-white/75"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The prices, at the size they deserve. Both figures come from the published
 * pricing page via `PRICING`; nothing here is rounded or estimated.
 */
export default function PricingSection() {
  return (
    <section
      id="pricing"
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
              Pricing
            </span>
          </Reveal>

          <RevealText
            as="h2"
            className="display display-xl mt-8 text-white"
            parts={[
              "Honest Pricing,",
              "\n",
              { text: "No Surprises.", className: "text-shine inline-block" },
            ]}
          />

          <Reveal delay={150}>
            <p className="mt-7 max-w-[60ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-balance text-white/60">
              Most businesses don&rsquo;t need a five-figure website. They need
              one that looks the part, works on every phone, and stays
              looked-after. Here&rsquo;s exactly what that costs.
            </p>
          </Reveal>
        </div>

        {/* -------------------------------------------------- The two figures */}
        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-2 lg:gap-6">
          <Reveal
            direction="left"
            className="relative isolate overflow-hidden rounded-[28px] border border-neon-300/50 bg-gradient-to-br from-neon-500 via-neon-600 to-neon-800 p-7 text-white shadow-[0_0_120px_-30px_rgba(160,43,255,0.95)] sm:p-10 lg:rounded-[40px] lg:p-12"
          >
            <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-70" />
            <p className="label-mono text-white/80">The one-off build</p>
            <p className="mt-8 flex items-start gap-3">
              <span className="label-mono mt-3 rounded-full border border-white/40 px-2.5 py-1.5 text-[10px]">
                From
              </span>
              <span className={NUMERAL}>
                <CountUp to={PRICING.buildFrom} prefix="£" />
              </span>
            </p>
            <p className="mt-5 text-[clamp(1.15rem,1.6vw,1.6rem)] font-medium tracking-[-0.02em]">
              One-off build fee
            </p>
            <Included items={PRICING.build} tone="neon" />
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="relative isolate overflow-hidden rounded-[28px] border border-white/12 bg-abyss-raised p-7 text-white sm:p-10 lg:rounded-[40px] lg:p-12"
          >
            <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-50" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(160,43,255,0.4),transparent_72%)] blur-2xl"
            />
            <p className="label-mono text-neon-300">Then, every month</p>
            <p className="mt-8 flex items-end gap-2">
              <span className={`${NUMERAL} text-shine`}>
                <CountUp to={PRICING.monthly} prefix="£" />
              </span>
              <span className="pb-[0.35em] text-[clamp(1.25rem,2.2vw,2.2rem)] font-medium tracking-[-0.03em] text-white/60">
                / month
              </span>
            </p>
            <p className="mt-5 text-[clamp(1.15rem,1.6vw,1.6rem)] font-medium tracking-[-0.02em]">
              Hosted and looked after
            </p>
            <Included items={PRICING.care} tone="ink" />
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-[86ch] text-center text-[14px] leading-[1.6] text-white/50 lg:mt-10 lg:text-[15px]">
            {PRICING.finePrint}
          </p>
        </Reveal>

        {/* ---------------------------------------------------- Bigger builds */}
        <div className="mt-24 lg:mt-36">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <Reveal>
                <p className="label-mono text-neon-300">Bigger builds</p>
              </Reveal>
              <RevealText
                as="h3"
                className="display display-lg mt-5 text-white"
                parts={[
                  "Need More Than",
                  "\n",
                  "a",
                  { text: "Website?", className: "text-outline" },
                ]}
              />
            </div>
            <Reveal delay={120}>
              <p className="max-w-[58ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-white/60">
                Anything with real functionality we quote per project, but it
                works the same way: a fair one-off fee, then a monthly plan to
                keep it running. These start higher than a standard website.
              </p>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
            {PRICING.bigger.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 110}
                className="spotlight lift group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-neon-400/45 hover:bg-white/[0.04] lg:p-9"
              >
                <span className="label-mono text-white/35 transition-colors duration-300 group-hover:text-neon-300">
                  0{i + 1}
                </span>
                <h4 className="mt-6 text-[1.5rem] font-semibold tracking-[-0.03em] text-white lg:text-[1.75rem]">
                  {item.title}
                </h4>
                <p className="mt-3 text-[16px] leading-[1.55] text-white/60">
                  {item.body}
                </p>
                <div className="mt-auto pt-8">
                  <span className="label-mono inline-flex rounded-full border border-neon-400/40 bg-neon-500/10 px-3.5 py-2.5 text-[10px] text-neon-200">
                    Quoted per project
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 flex flex-col items-center gap-6 text-center lg:mt-16 lg:flex-row lg:justify-between lg:text-left">
            <p className="max-w-[62ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-white/65">
              Not sure which of these you need? That&rsquo;s what the call is
              for. Tell us what you&rsquo;re trying to do and we&rsquo;ll give
              you a clear number.
            </p>
            <Magnetic>
              <a
                href="#contact"
                className="sheen group inline-flex items-center gap-3.5 rounded-full bg-gradient-to-b from-white to-neon-50/70 py-2.5 pl-7 pr-2.5 text-[16px] font-medium text-abyss shadow-[0_0_46px_-6px_rgba(160,43,255,0.85)] transition-shadow duration-300 hover:shadow-[0_0_70px_-4px_rgba(160,43,255,1)]"
              >
                Book a Call
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-abyss text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
