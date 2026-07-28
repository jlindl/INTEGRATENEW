/**
 * StudioNote — the hub's #studio ("About") beat. A short, confident statement
 * that positions Web Design as a room inside Integrate, plus a few principles.
 * Static server component with Reveal entrances.
 */
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ChapterBreak } from "./interactions/ChapterBreak";

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "Start from how the business wins",
    body: "Every layout begins with how that particular company actually gets customers. The polish comes after, once the structure is doing its job.",
  },
  {
    title: "Let the work carry the page",
    body: "Fast-loading, image-led pages with room to breathe. We keep the interface quiet so the design itself is the thing you notice.",
  },
  {
    title: "Part of Integrate",
    body: "The same team that builds custom AI systems for growing B2B companies, now designing the websites that sit in front of them.",
  },
];

export function StudioNote() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="relative py-24 md:py-32"
    >
      <ChapterBreak index="05" />
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <div>
            <Reveal as="p" className="eyebrow text-halo-dim">
              The studio
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              <span
                id="studio-heading"
                className="mt-4 block font-display-tuned text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-ivory"
              >
                A website should look like it was made for your business,
                because it was.
              </span>
            </Reveal>
          </div>

          <RevealGroup className="flex flex-col divide-y divide-graphite" staggerChildren={0.1}>
            {PRINCIPLES.map((pr) => (
              <RevealItem key={pr.title} as="div" className="py-6 first:pt-0">
                <h3 className="text-lg font-medium text-ivory">{pr.title}</h3>
                <p className="mt-2 max-w-[54ch] leading-relaxed text-mist">{pr.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
