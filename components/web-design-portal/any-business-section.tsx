import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import VelocityMarquee from "@/components/web-design-portal/velocity-marquee";
import { ANY_BUSINESS } from "@/components/web-design-portal/site-data";
import { ArrowRight, SparkIcon } from "@/components/web-design-portal/icons";

/**
 * The range, stated as a wall of moving type: every line of work listed on the
 * live portal runs past in two bands.
 */
export default function AnyBusinessSection() {
  return (
    <section className="relative isolate overflow-clip border-t border-white/[0.06] bg-abyss">
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />

      <div className="relative z-20 pt-24 lg:pt-36">
        <div className="mx-auto flex w-full max-w-[1420px] flex-col items-center px-6 text-center sm:px-10">
          <Reveal>
            <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
              <SparkIcon className="h-4 w-4 text-neon-200" />
              Any Business
            </span>
          </Reveal>

          <RevealText
            as="h2"
            stagger={45}
            className="display display-lg mt-8 max-w-[22ch] text-white"
            parts={[
              "If Your Customers Are Online, We’ll Build the Website That",
              { text: "Wins Them.", className: "text-shine inline-block" },
            ]}
          />

          <Reveal delay={150}>
            <p className="mt-7 max-w-[60ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-balance text-white/60">
              We build websites and mobile apps for pretty much any business,
              shaped around how your customers actually decide and buy. Tell us
              how you win work, and we&rsquo;ll build the thing that does it.
            </p>
          </Reveal>
        </div>

        <div className="mt-6 lg:mt-10">
          <VelocityMarquee rows={ANY_BUSINESS} />
        </div>

        <Reveal className="mx-auto flex w-full max-w-[1420px] flex-col items-center gap-3 px-6 pb-24 text-center sm:flex-row sm:justify-center sm:gap-5 sm:px-10 lg:pb-32">
          <p className="text-[clamp(1.05rem,1.4vw,1.4rem)] text-white/70">
            Don&rsquo;t see your line of work? That&rsquo;s the point.
          </p>
          <a
            href="#contact"
            className="underline-grow group inline-flex items-center gap-2 text-[clamp(1.05rem,1.4vw,1.4rem)] font-medium text-neon-300 transition-colors hover:text-neon-200"
          >
            Tell us what you do
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
