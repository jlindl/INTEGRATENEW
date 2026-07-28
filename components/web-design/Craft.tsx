/**
 * Craft — the "we don't just design it, we build it" beat. Two panels: the
 * front-of-house craft (design, motion, performance) and the engine room
 * (commerce, integrations, automation). The backend list leans on Integrate's
 * core competence — the same team that wires bespoke AI systems wires your
 * site's backend, rather than bolting on an off-the-shelf plugin.
 */
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ChapterBreak } from "./interactions/ChapterBreak";

type Capability = { title: string; note: string };

const FRONTEND: Capability[] = [
  {
    title: "Custom, responsive design",
    note: "Layouts built by hand, never a template, and right on every screen size.",
  },
  {
    title: "Motion & interaction",
    note: "Just enough animation to guide the eye, never the kind that makes a page feel heavy.",
  },
  {
    title: "Core Web Vitals",
    note: "Built to load quickly. A fast site keeps people around; a slow one loses them before they start.",
  },
  {
    title: "Accessible by default",
    note: "Semantic, keyboard-friendly and WCAG-minded from the very first line.",
  },
  {
    title: "Editable content",
    note: "A clean CMS so your team can update copy and images without a developer.",
  },
  {
    title: "SEO-ready markup",
    note: "Clean structure, metadata and schema that search engines actually reward.",
  },
];

const BACKEND: Capability[] = [
  {
    title: "Shopify & commerce",
    note: "Custom storefronts, headless Shopify and checkout flows tuned to convert.",
  },
  {
    title: "Payments & subscriptions",
    note: "Stripe, recurring billing, invoicing and secure, compliant checkout.",
  },
  {
    title: "Bookings & scheduling",
    note: "Real-time availability, calendars and automated confirmations end to end.",
  },
  {
    title: "CRM & automation",
    note: "Leads routed straight into your CRM, with follow-up handled automatically.",
  },
  {
    title: "Custom APIs & integrations",
    note: "Connect the tools you already run into one system that talks to itself.",
  },
  {
    title: "Portals, databases & auth",
    note: "Accounts, client dashboards and admin tools built on solid foundations.",
  },
];

function Panel({
  label,
  heading,
  blurb,
  items,
}: {
  label: string;
  heading: string;
  blurb: string;
  items: Capability[];
}) {
  return (
    <div className="rounded-[1.6rem] border border-graphite bg-carbon-2 p-8 md:p-10">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display-tuned text-2xl font-medium text-ivory">{heading}</h3>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-halo-dim">
          {label}
        </span>
      </div>
      <p className="mt-3 max-w-[46ch] leading-relaxed text-mist">{blurb}</p>

      <RevealGroup as="ul" className="mt-8 flex flex-col divide-y divide-graphite" staggerChildren={0.06}>
        {items.map((it) => (
          <RevealItem key={it.title} as="li" className="flex gap-4 py-4 first:pt-0">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-iris"
            />
            <div>
              <p className="font-medium text-ivory">{it.title}</p>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-mist">{it.note}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export function Craft() {
  return (
    <section
      id="craft"
      aria-labelledby="craft-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="glow-halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <ChapterBreak index="03" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow text-halo-dim">
            Front to back
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            <span
              id="craft-heading"
              className="mt-5 block font-display-tuned text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.06] text-ivory"
            >
              Designed at the front.{" "}
              <span className="italic text-platinum [font-variation-settings:'opsz'_90,'SOFT'_50,'WONK'_0]">
                Engineered at the back.
              </span>
            </span>
          </Reveal>
          <Reveal as="p" delay={0.12} className="mt-6 max-w-[60ch] text-lg leading-relaxed text-mist">
            A good-looking website is only half the job. The half nobody sees is
            the backend. And since Integrate already builds custom software and AI
            systems, that part is handled by the same people, not patched together
            with plugins. You get the design and the plumbing from one team.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Panel
            label="Frontend"
            heading="What people see"
            blurb="The part your customers meet first. Get this right and you look like the safe choice before they've read a word."
            items={FRONTEND}
          />
          <Panel
            label="Backend"
            heading="What makes it work"
            blurb="The part they never see. The wiring that turns a nice-looking site into something that actually runs the business."
            items={BACKEND}
          />
        </div>
      </div>
    </section>
  );
}
