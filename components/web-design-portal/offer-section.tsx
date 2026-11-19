import CountUp from "@/components/web-design-portal/count-up";
import Frame from "@/components/web-design-portal/frame";
import Magnetic from "@/components/web-design-portal/magnetic";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import { OFFER } from "@/components/web-design-portal/site-data";
import { ArrowRight, CheckIcon, SparkIcon } from "@/components/web-design-portal/icons";

/**
 * The current offer: one monthly figure covering website, SEO and social
 * story creatives. Everything shown comes from `OFFER` in site-data.ts.
 */
export default function OfferSection() {
  return (
    <section
      id="offer"
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
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-neon-400 opacity-70" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-neon-300" />
              </span>
              Current Offer
            </span>
          </Reveal>

          <RevealText
            as="h2"
            className="display display-xl mt-8 text-white"
            parts={[
              "Website, SEO",
              "\n",
              "and Socials.",
              { text: "One Price.", className: "text-shine inline-block" },
            ]}
          />

          <Reveal delay={150}>
            <p className="mt-7 max-w-[58ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-balance text-white/60">
              Everything a business needs to get found and look busy online,
              rolled into one monthly figure. No juggling a web designer, an SEO
              agency and someone to make your content.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
          {/* ------------------------------------------------------ The price */}
          <Reveal
            direction="left"
            className="relative isolate overflow-hidden rounded-[28px] border border-neon-300/50 bg-gradient-to-br from-neon-500 via-neon-600 to-neon-800 p-7 text-white shadow-[0_0_120px_-30px_rgba(160,43,255,0.95)] sm:p-10 lg:rounded-[40px] lg:p-12"
          >
            <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-70" />
            <p className="label-mono text-white/80">Everything included</p>
            <p className="mt-8 flex items-end gap-2">
              <span className="text-[clamp(5rem,12.5vw,11.5rem)] font-semibold leading-[0.78] tracking-[-0.07em]">
                <CountUp to={OFFER.monthly} prefix="£" />
              </span>
              <span className="pb-[0.2em] text-[clamp(1.25rem,2.2vw,2.2rem)] font-medium tracking-[-0.03em] text-white/75">
                / month
              </span>
            </p>

            <ul className="mt-10 space-y-5 border-t border-white/20 pt-8">
              {OFFER.included.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-neon-600">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[clamp(1.15rem,1.5vw,1.45rem)] font-medium tracking-[-0.02em]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[15px] leading-[1.55] text-white/80 lg:text-[16px]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* -------------------------------------------------------- Why now */}
          <Reveal
            direction="right"
            delay={120}
            className="relative isolate flex flex-col overflow-hidden rounded-[28px] border border-white/12 bg-abyss-raised p-7 text-white sm:p-10 lg:rounded-[40px] lg:p-12"
          >
            <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-50" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(160,43,255,0.4),transparent_72%)] blur-2xl"
            />
            <p className="label-mono text-neon-300">Why start now</p>
            <h3 className="mt-6 text-[clamp(1.8rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Every month you wait is a month a competitor gets the call.
            </h3>

            <ul className="mt-8 space-y-5 border-t border-white/10 pt-8">
              {OFFER.whyNow.map((line, i) => (
                <li key={line} className="grid grid-cols-[2.25rem_1fr] gap-x-2">
                  <span className="label-mono pt-1 text-neon-300">0{i + 1}</span>
                  <p className="text-[16px] leading-[1.55] text-white/70">{line}</p>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <Magnetic>
                <a
                  href="#contact"
                  className="sheen group inline-flex items-center gap-3.5 rounded-full bg-gradient-to-b from-white to-neon-50/70 py-2.5 pl-7 pr-2.5 text-[16px] font-medium text-abyss shadow-[0_0_46px_-6px_rgba(160,43,255,0.85)] transition-shadow duration-300 hover:shadow-[0_0_70px_-4px_rgba(160,43,255,1)]"
                >
                  <SparkIcon className="h-4 w-4 text-neon-600" />
                  Claim the £{OFFER.monthly} offer
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-abyss text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-[80ch] text-center text-[14px] leading-[1.6] text-white/50 lg:mt-10 lg:text-[15px]">
            Need an app, a client portal or a system wired into your other
            tools? Those are quoted per project. Tell us what you need on the call.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
