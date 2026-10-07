import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICE_HUBS, postsForHub } from "@/lib/serviceHubs";

export const metadata: Metadata = {
  title: "Services | Integrate",
  description:
    "Lead generation, Facebook ads, AI WhatsApp and website assistants, websites and AI automation for trades and local businesses across the UK.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Services
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display-tuned mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.05] text-ink">
              What Integrate does for trades and local businesses
            </h1>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-7 max-w-[54ch] text-lg leading-relaxed text-ink-2">
            Each service works on its own or as part of one system: find the right local customers, reply instantly, and book the work.
          </Reveal>
        </div>
        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_HUBS.map((hub) => (
            <li key={hub.id}>
              <Link
                href={`/services/${hub.id}`}
                className="group flex h-full flex-col rounded-2xl bg-card p-7 hairline shadow-lift transition-all duration-500 hover:-translate-y-1 hover:shadow-float md:p-8"
              >
                <h2 className="font-display-tuned text-2xl font-medium text-ink">{hub.name}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-ink-2">{hub.description}</p>
                <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-3">
                  {postsForHub(hub).length} guides
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
