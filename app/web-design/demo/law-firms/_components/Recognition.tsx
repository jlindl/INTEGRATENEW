import { mono, serif, wrap } from "./tokens";

const marks = [
  { big: "Top tier", what: "Private Client, South East", who: "Independent Guide to the Profession, 2026" },
  { big: "Leading firm", what: "Corporate M&A, Surrey & Thames Valley", who: "The Counsel Review, 2026" },
  { big: "Team of the Year", what: "Contentious Trusts & Probate", who: "Southern Law Awards, 2025" },
  { big: "98%", what: "of clients would instruct us again", who: "Independent client survey, 2026" },
];

/** Accolades set as quiet typographic marks rather than badges. */
export function Recognition() {
  return (
    <section aria-label="Recognition" className="border-b border-[#17130f]/10 bg-[#f3efe7]">
      <div className={wrap}>
        <ul className="grid grid-cols-1 divide-y divide-[#17130f]/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {marks.map((m, i) => (
            <li
              key={m.big}
              className={`flex flex-col gap-2 py-7 sm:py-10 sm:pr-8 ${i % 2 === 1 ? "sm:border-l sm:border-[#17130f]/10 sm:pl-8" : ""} ${i === 2 ? "lg:border-l lg:border-[#17130f]/10 lg:pl-8" : ""} ${i > 1 ? "sm:border-t sm:border-[#17130f]/10 lg:border-t-0" : ""}`}
            >
              <span className={`${serif} text-[2rem] leading-none text-[#17130f]`}>
                <em className="italic">{m.big}</em>
              </span>
              <span className="text-[0.88rem] leading-snug text-[#17130f]">{m.what}</span>
              <span className={`${mono} text-[0.64rem] uppercase tracking-[0.16em] text-[#5b5348]`}>{m.who}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
