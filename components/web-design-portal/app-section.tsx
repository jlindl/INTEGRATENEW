import AppPhone from "@/components/web-design-portal/app-phone";
import Frame from "@/components/web-design-portal/frame";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import { SparkIcon } from "@/components/web-design-portal/icons";

const APP_KINDS = ["Ordering & loyalty", "Client portals", "Field service"];

const FEATURES = [
  "Live order tracking, fire to door",
  "Two-tap reorder of the usual",
  "Loyalty stamps that earn free plates",
];

export default function AppSection() {
  return (
    <section
      id="apps"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      <Frame />

      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 py-24 sm:px-10 lg:py-40">
        <div className="grid items-center gap-20 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
                <SparkIcon className="h-4 w-4 text-neon-200" />
                Mobile &amp; App Design
              </span>
            </Reveal>

            <RevealText
              as="h2"
              className="display display-lg mt-8 text-white"
              parts={[
                "It Doesn’t Stop",
                "\n",
                "at the",
                { text: "Website.", className: "text-outline" },
              ]}
            />

            <Reveal delay={150}>
              <p className="mt-8 max-w-[52ch] text-[clamp(1.05rem,1.35vw,1.4rem)] leading-[1.55] text-white/65 max-lg:mx-auto">
                Plenty of businesses meet their customers in an app, not a
                browser. We build those too: ordering, loyalty, portals,
                booking. We make them look and feel like the website, so the
                whole thing reads as one company.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
                {APP_KINDS.map((kind) => (
                  <li
                    key={kind}
                    className="rounded-full border border-white/12 px-4 py-2 text-[14px] text-white/70"
                  >
                    {kind}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* The app on the handset, described. */}
            <Reveal
              delay={270}
              className="spotlight relative mt-10 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.025] p-6 text-left lg:mt-12 lg:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-white">
                  A La Parrilla
                </h3>
                <p className="label-mono text-neon-300">iOS &middot; Android</p>
              </div>
              <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.55] text-white/60">
                Order direct and skip the delivery-app fees, then watch it cook
                over live fire. Reorder a favourite in two taps, and every plate
                stamps their card toward a free one.
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 sm:gap-4">
                {FEATURES.map((feature, i) => (
                  <li
                    key={feature}
                    className="flex gap-3 border-t border-white/10 pt-3 text-[14px] leading-[1.45] text-white/80"
                  >
                    <span className="label-mono pt-1 text-neon-300">
                      0{i + 1}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <AppPhone />
        </div>
      </div>
    </section>
  );
}
