import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display, quietLink } from "./ui";

const groups = [
  {
    title: "Founders & startups",
    points: [
      "SEIS and EIS assurance when you raise",
      "R&D tax claims prepared and defended",
      "Board packs your investors actually read",
    ],
    link: "Talk to us about your raise",
  },
  {
    title: "Established firms",
    points: [
      "Audit-ready accounts, filed early",
      "Tax planning across the whole year, not just April",
      "Payroll that runs without a hitch",
    ],
    link: "See how we take over cleanly",
  },
  {
    title: "Sole traders & landlords",
    points: [
      "Self assessment without the January panic",
      "Making Tax Digital, set up and handled",
      "Property portfolios structured properly",
    ],
    link: "Get your January back",
  },
];

export function WhoWeHelp() {
  return (
    <section id="who" className="scroll-mt-24">
      <div className={`${container} py-20 sm:py-24 lg:py-28`}>
        <Reveal>
          <SectionHeading
            eyebrow="Who we help"
            title="Wherever you are, we’ve done this before."
            sub="More than three hundred businesses trust Meridian with their numbers. Most arrive at one of these three doors."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {groups.map((group, i) => (
            <Reveal key={group.title} className="h-full" delay={i * 90}>
              <div className="flex h-full flex-col border-t border-[#e2ded2] pt-6">
                <h3
                  className={`${display} text-2xl font-medium tracking-tight text-[#15201c]`}
                >
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-[#565f59]"
                    >
                      <span
                        className="mt-[0.62rem] h-1 w-1 shrink-0 rounded-full bg-[#15201c]/35"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`${quietLink} mt-6`}>
                  {group.link}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
