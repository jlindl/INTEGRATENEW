import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display, quietLink } from "./ui";

type Area = { title: string; body: string; icon: string };

/* Single-path glyphs, stroked in oxblood. */
const ICONS: Record<string, string> = {
  corporate: "M3 20h18 M6 20V9l6-4 6 4v11 M10 20v-5h4v5",
  property: "M4 11 12 5l8 6 M6 10v10h12V10 M10 20v-6h4v6",
  dispute: "M12 3v18 M5 7h14 M5 7 3 13h4L5 7Z M19 7l-2 6h4l-2-6Z",
  private: "M12 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z M5 20c0-3.5 3-6 7-6s7 2.5 7 6",
  employment: "M4 8h16v11H4Z M9 8V6a3 3 0 0 1 6 0v2 M4 13h16",
  family: "M8 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z M16 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z M3 19c0-3 2.2-5 5-5 M21 19c0-3-2.2-5-5-5 M12 21v-4",
};

const areas: Area[] = [
  {
    title: "Corporate & Commercial",
    body: "Acquisitions, sales, shareholder agreements and the day-to-day contracts that keep a business moving.",
    icon: "corporate",
  },
  {
    title: "Commercial Property",
    body: "Freehold and leasehold transactions, development, and landlord and tenant matters handled end to end.",
    icon: "property",
  },
  {
    title: "Dispute Resolution",
    body: "Commercial disputes settled commercially where possible, and argued firmly in court where it isn't.",
    icon: "dispute",
  },
  {
    title: "Wills, Trusts & Probate",
    body: "Estate planning, trusts and probate managed with discretion and a genuinely human touch.",
    icon: "private",
  },
  {
    title: "Employment",
    body: "Advice for employers and senior individuals — contracts, exits, settlement agreements and tribunals.",
    icon: "employment",
  },
  {
    title: "Family",
    body: "Divorce, finances and children matters, led with clarity and care at a difficult time.",
    icon: "family",
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="scroll-mt-24">
      <div className={`${container} py-20 sm:py-24 lg:py-28`}>
        <Reveal>
          <SectionHeading
            eyebrow="Expertise"
            title="Whatever the matter, a senior hand on it."
            sub="Six practice areas, one standard of attention. You are never passed down to the most junior person in the room."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {areas.map((area, i) => (
            <Reveal key={area.title} className="h-full" delay={(i % 3) * 80}>
              <article className="group flex h-full flex-col rounded-2xl border border-[#e4ddd0] bg-white p-7 transition-shadow duration-300 hover:shadow-[0_28px_60px_-40px_rgba(26,23,18,0.5)]">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7c2d2d]/8"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5.5 w-5.5"
                    fill="none"
                    stroke="#7c2d2d"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[area.icon].split(" M").map((seg, j) => (
                      <path key={j} d={j === 0 ? seg : `M${seg}`} />
                    ))}
                  </svg>
                </span>
                <h3
                  className={`${display} mt-5 text-xl font-medium tracking-tight text-[#1a1712]`}
                >
                  {area.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-[#5a544a]">
                  {area.body}
                </p>
                <a href="#contact" className={`${quietLink} mt-5`}>
                  Discuss this
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
