/**
 * Integrations — the "plays well with everything" beat. A tonal paper-2 band
 * with two counter-scrolling wordmark marquees. The marquee motion is pure
 * CSS (animate-marquee-slow, paused under prefers-reduced-motion by
 * globals.css); only the header gets a framer entrance, so this file stays a
 * server component.
 *
 * Each half of a track repeats the list three times so the loop stays full
 * on wide viewports — semantically only the first copy of row one is exposed;
 * every other copy (and all of row two, which repeats the message) is
 * aria-hidden.
 */
import { Reveal } from "@/components/ui/Reveal";

const ROW_ONE = [
  "GoHighLevel",
  "Gmail",
  "WhatsApp",
  "HubSpot",
  "Monday.com",
  "n8n",
  "Google Cloud",
] as const;

const ROW_TWO = [
  "Slack",
  "Salesforce",
  "Zapier",
  "OpenAI",
  "Notion",
  "Stripe",
] as const;

/* Repeats per half-track. The -50% keyframe needs two identical halves;
   tripling the list inside each half keeps the loop gapless on ultrawides. */
const REPEATS_PER_HALF = 3;

function Chip({ name }: { name: string }) {
  return (
    <li className="hairline flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full bg-card px-6 py-3 text-[0.95rem] font-medium text-ink-2">
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
        aria-hidden="true"
      />
      {name}
    </li>
  );
}

function ChipList({
  tools,
  hidden,
}: {
  tools: readonly string[];
  hidden?: boolean;
}) {
  return (
    // pr-3 mirrors gap-3 so spacing stays uniform across the copy seam
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-3 pr-3"
    >
      {tools.map((name) => (
        <Chip key={name} name={name} />
      ))}
    </ul>
  );
}

function MarqueeRow({
  tools,
  reverse = false,
  ariaHidden = false,
}: {
  tools: readonly string[];
  reverse?: boolean;
  ariaHidden?: boolean;
}) {
  const copies = Array.from({ length: REPEATS_PER_HALF * 2 });
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="mask-fade-x overflow-hidden"
    >
      <div
        className={`flex w-max animate-marquee-slow ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {copies.map((_, i) => (
          <ChipList key={i} tools={tools} hidden={ariaHidden || i > 0} />
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section
      id="integrations"
      aria-labelledby="integrations-heading"
      className="hairline-t hairline-b bg-paper-2 py-16 md:py-28"
    >
      {/* Header */}
      <div className="container-x text-center">
        <Reveal as="p" className="eyebrow">
          Plays well with everything
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            id="integrations-heading"
            className="font-display-tuned mt-5 text-[clamp(2.4rem,5.2vw,4rem)] font-medium leading-[1.05] text-ink"
          >
            Infinite{" "}
            <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
              integrations.
            </span>
          </h2>
        </Reveal>
        <Reveal
          as="p"
          delay={0.16}
          className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2"
        >
          If your stack can send or receive data, we can automate it.
        </Reveal>
      </div>

      {/* Full-bleed counter-scrolling wordmark strips */}
      <div className="mt-14 flex flex-col gap-4 md:mt-16">
        <MarqueeRow tools={ROW_ONE} />
        {/* Second strip repeats the message semantically — hidden from AT */}
        <MarqueeRow tools={ROW_TWO} reverse ariaHidden />
      </div>
    </section>
  );
}
