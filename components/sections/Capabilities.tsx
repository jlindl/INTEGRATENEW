/**
 * Capabilities — the "what we build" beat. Carries the #case-studies anchor the
 * hero's "See What We Build" CTA points at. Diagram-free: a sticky editorial
 * header on the left, and the three system layers as a typographic ledger on
 * the right (title, description, capability chips), divided by hairlines.
 *
 * Static server component — the Reveal primitives are the only client islands,
 * so it adds no scroll-time cost.
 */
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Capability = {
  tag: string;
  title: string;
  body: string;
  items: string[];
};

const CAPABILITIES: Capability[] = [
  {
    tag: "SYS.01",
    title: "Workflow Automation",
    body: "Custom workflows that reclaim thousands of hours, engineered around how your business actually operates.",
    items: ["Lead routing", "Automated invoicing", "Data enrichment", "Follow-up sequences"],
  },
  {
    tag: "SYS.02",
    title: "Bespoke AI Agents",
    body: "Agents custom-trained on your SOPs and playbooks, then scaled indefinitely across your operation.",
    items: ["SOP-trained", "Runs 24/7", "Multi-step tasks", "Clean human handoff"],
  },
  {
    tag: "SYS.03",
    title: "System Integration",
    body: "We bridge your entire tech stack so data flows to the right place without manual intervention.",
    items: ["CRM sync", "API bridges", "Webhooks", "Unified data pipelines"],
  },
];

export function Capabilities() {
  return (
    <section
      id="case-studies"
      aria-labelledby="capabilities-heading"
      className="relative bg-paper py-20 md:py-36"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- Sticky editorial header ---- */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal as="p" className="eyebrow flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Capabilities
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  id="capabilities-heading"
                  className="font-display-tuned mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.05] text-ink"
                >
                  Bespoke systems.
                  <br />
                  <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
                    Infinite scale.
                  </span>
                </h2>
              </Reveal>
              <Reveal as="p" delay={0.16} className="mt-7 max-w-[38ch] text-lg leading-relaxed text-ink-2">
                Three system layers, engineered to your operation and built to
                scale without adding headcount.
              </Reveal>
            </div>
          </div>

          {/* ---- Capability ledger ---- */}
          <RevealGroup className="hairline-t lg:col-span-8" staggerChildren={0.12}>
            {CAPABILITIES.map((cap) => (
              <RevealItem
                as="div"
                key={cap.tag}
                className="group relative hairline-b"
              >
                {/* subtle hover wash */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-5 inset-y-0 -z-10 rounded-2xl bg-accent-tint opacity-0 transition-opacity duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:opacity-50"
                />

                <div className="py-9 md:py-11">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-3 transition-colors duration-500 group-hover:text-accent">
                    {cap.tag}
                  </p>

                  <div className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
                    <div>
                      <h3 className="font-display-tuned text-2xl font-medium leading-tight text-ink md:text-[1.75rem]">
                        {cap.title}
                      </h3>
                      <p className="mt-3 max-w-[44ch] leading-relaxed text-ink-2">
                        {cap.body}
                      </p>
                    </div>

                    <ul className="flex flex-wrap gap-2 md:justify-end md:self-center">
                      {cap.items.map((item) => (
                        <li
                          key={item}
                          className="hairline rounded-full bg-card px-3.5 py-1.5 font-mono text-[0.8rem] text-ink-2 transition-colors duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:border-line-2"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
