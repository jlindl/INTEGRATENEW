import CountUp from "@/components/web-design-portal/count-up";
import Frame from "@/components/web-design-portal/frame";
import LogoMarquee from "@/components/web-design-portal/logo-marquee";
import OrbSlider from "@/components/web-design-portal/orb-slider";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import ScrubText from "@/components/web-design-portal/scrub-text";
import {
  BACKEND,
  CLIENTS,
  FRONTEND,
  PRICING,
  SECTOR_BUILDS,
} from "@/components/web-design-portal/site-data";

// Counted from the data rather than typed in, so they cannot drift from what
// the page actually shows further down.
const FIGURES = [
  {
    value: CLIENTS.length,
    pad: 2,
    prefix: "",
    label: "Client sites live right now",
  },
  {
    value: SECTOR_BUILDS.filter((build) => build.status === "demo").length,
    pad: 2,
    prefix: "",
    label: "Working sector demos to click through",
  },
  {
    value: PRICING.buildFrom,
    pad: 0,
    prefix: "£",
    label: "From, as a one-off build fee",
  },
  {
    value: PRICING.monthly,
    pad: 0,
    prefix: "£",
    label: "A month, hosted and looked after",
  },
];

function FeatureColumn({
  eyebrow,
  title,
  intro,
  items,
  hollow = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: readonly { title: string; body: string }[];
  hollow?: boolean;
}) {
  return (
    <div>
      <Reveal>
        <p className="label-mono text-neon-300">{eyebrow}</p>
      </Reveal>

      <RevealText
        as="h3"
        className="display display-lg mt-5 text-white"
        parts={[{ text: title, className: hollow ? "text-outline" : "" }]}
      />

      <Reveal delay={120}>
        <p className="mt-5 max-w-[46ch] text-[clamp(1rem,1.15vw,1.2rem)] leading-[1.5] text-white/60">
          {intro}
        </p>
      </Reveal>

      <ul className="mt-9 border-t border-white/10">
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            delay={i * 70}
            className="group grid grid-cols-[2.75rem_1fr] gap-x-3 border-b border-white/10 px-1 py-5 transition-colors duration-300 hover:bg-white/[0.035]"
          >
            <span className="label-mono pt-2 text-white/35 transition-colors duration-300 group-hover:text-neon-300">
              0{i + 1}
            </span>
            <div>
              <h4 className="text-[1.25rem] font-medium tracking-[-0.02em] text-white">
                {item.title}
              </h4>
              <p className="mt-1.5 text-[15px] leading-[1.55] text-white/55">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export default function FrontBackSection() {
  return (
    <section
      id="approach"
      /* No top border here — the hero fades into flat ink, and a rule would put
         a hard seam back exactly where the fade was meant to remove it.
         `overflow-clip` (not hidden) so the sticky column below still sticks. */
      className="relative isolate overflow-clip bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-[1] opacity-[0.05] mix-blend-overlay"
      />
      <Frame />

      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 pb-24 pt-16 sm:px-10 lg:pb-36 lg:pt-20">
        {/* ------------------------------------------------ Who it is live for */}
        <Reveal>
          <p className="label-mono text-center text-white/50">
            Live now, for real businesses
          </p>
        </Reveal>

        <Reveal delay={130} className="mt-9 lg:mt-11">
          <LogoMarquee />
        </Reveal>

        {/* ------------------------------------------------------- The figures */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-24 lg:grid-cols-4 lg:gap-x-10">
          {FIGURES.map((figure, i) => (
            <Reveal
              key={figure.label}
              delay={i * 90}
              className="flex flex-col-reverse border-l border-white/12 pl-5 lg:pl-7"
            >
              <dt className="mt-3 max-w-[22ch] text-[14px] leading-[1.4] text-white/55 lg:text-[15px]">
                {figure.label}
              </dt>
              <dd className="text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">
                <CountUp
                  to={figure.value}
                  pad={figure.pad}
                  prefix={figure.prefix}
                />
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* ---------------------------------------------------- The statement */}
        <div className="mt-24 grid gap-6 lg:mt-40 lg:grid-cols-12 lg:gap-10">
          {/* Stays pinned beside the statement while it is being read. */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="label-mono text-center text-neon-300 lg:pl-3 lg:text-left">
                  (01) &mdash; Front to back
                </p>
              </Reveal>
              <Reveal direction="zoom" delay={100}>
                <OrbSlider />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8 lg:pt-10">
            <RevealText
              as="h2"
              className="display display-lg text-center text-white lg:text-left"
              parts={[
                "Designed at the Front.",
                "\n",
                {
                  text: "Engineered at the Back.",
                  className: "text-shine inline-block",
                },
              ]}
            />

            <ScrubText
              className="mt-10 text-center text-[clamp(1.5rem,3.1vw,3.1rem)] font-medium leading-[1.14] tracking-[-0.035em] text-white lg:mt-14 lg:text-left"
              accent={["backend", "same", "people", "one", "team"]}
              text="A good-looking website is only half the job. The half nobody sees is the backend. And since Integrate already builds custom software and AI systems, that part is handled by the same people, not patched together with plugins. You get the design and the plumbing from one team."
            />
          </div>
        </div>

        {/* ------------------------------------------------- What that covers */}
        <div className="mt-24 grid gap-20 lg:mt-36 lg:grid-cols-2 lg:gap-16">
          <FeatureColumn
            eyebrow="What people see"
            title="Frontend"
            intro="The part your customers meet first. Get this right and you look like the safe choice before they've read a word."
            items={FRONTEND}
          />
          <FeatureColumn
            eyebrow="What makes it work"
            title="Backend"
            intro="The part they never see. The wiring that turns a nice-looking site into something that actually runs the business."
            items={BACKEND}
            hollow
          />
        </div>
      </div>
    </section>
  );
}
