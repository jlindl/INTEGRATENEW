import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display, quietLink } from "./ui";

const articles = [
  {
    date: "02 July 2026",
    tag: "Tax planning",
    title: "The 2026/27 dividend versus salary question, answered",
  },
  {
    date: "18 June 2026",
    tag: "Making Tax Digital",
    title: "MTD for landlords: what changes in April",
  },
  {
    date: "29 May 2026",
    tag: "R&D relief",
    title: "R&D claims after the merger: what still qualifies",
  },
];

export function Insights() {
  return (
    <section id="insights" className="scroll-mt-24">
      <div className={`${container} py-20 sm:py-24`}>
        <Reveal>
          <SectionHeading
            eyebrow="Insights"
            title="Notes from the ledger."
            sub="Short, practical reads from the team. Written for owners, not for other accountants."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {articles.map((article, i) => (
            <Reveal key={article.title} className="h-full" delay={i * 90}>
              <article className="flex h-full flex-col rounded-xl border border-[#e2ded2] bg-white p-6 transition-shadow duration-200 hover:shadow-[0_20px_45px_-30px_rgba(21,32,28,0.35)] sm:p-7">
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#565f59]">
                  <span>{article.date}</span>
                  <span className="text-[#b08d57]" aria-hidden="true">
                    ·
                  </span>
                  <span>{article.tag}</span>
                </p>
                <h3
                  className={`${display} mt-4 text-xl font-medium leading-snug tracking-tight text-[#15201c]`}
                >
                  {article.title}
                </h3>
                <div className="mt-5 flex flex-1 items-end">
                  <a href="#insights" className={quietLink}>
                    Read the note
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
