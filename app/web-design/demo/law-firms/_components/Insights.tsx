import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display, quietLink } from "./ui";

const articles = [
  {
    tag: "Corporate",
    date: "June 2026",
    title: "Selling your company: the six-week head start",
    read: "5 min read",
  },
  {
    tag: "Private Client",
    date: "May 2026",
    title: "Why a will alone rarely protects the family home",
    read: "4 min read",
  },
  {
    tag: "Employment",
    date: "April 2026",
    title: "Settlement agreements: what senior executives miss",
    read: "6 min read",
  },
];

export function Insights() {
  return (
    <section id="insights" className="scroll-mt-24">
      <div className={`${container} py-20 sm:py-24 lg:py-28`}>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Insights"
              title="Guidance worth reading before you need it."
            />
            <a href="#insights" className={quietLink}>
              All articles
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {articles.map((article, i) => (
            <Reveal key={article.title} className="h-full" delay={(i % 3) * 80}>
              <a
                href="#insights"
                className="group flex h-full flex-col rounded-2xl border border-[#e4ddd0] bg-white p-7 transition-shadow duration-300 hover:shadow-[0_28px_60px_-40px_rgba(26,23,18,0.5)]"
              >
                <div className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                  <span className="text-[#7c2d2d]">{article.tag}</span>
                  <span className="h-1 w-1 rounded-full bg-[#9c7c4a]" aria-hidden="true" />
                  <span className="text-[#5a544a]">{article.date}</span>
                </div>
                <h3
                  className={`${display} mt-4 flex-1 text-xl font-medium leading-snug tracking-tight text-[#1a1712]`}
                >
                  {article.title}
                </h3>
                <div className="mt-6 flex items-center justify-between text-sm text-[#5a544a]">
                  <span>{article.read}</span>
                  <span
                    aria-hidden="true"
                    className="text-[#7c2d2d] transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
