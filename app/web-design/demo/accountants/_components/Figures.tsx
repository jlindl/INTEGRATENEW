import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { label, serif, wrap } from "./ui";

const figures = [
  { node: <CountUp to={3.2} decimals={1} prefix="£" suffix="m" />, k: "Tax legitimately saved for clients in the 2025/26 year" },
  { node: <CountUp to={6} suffix=" days" />, k: "Median month-end close, from bank feeds to issued accounts" },
  { node: <CountUp to={48} suffix=" hr" />, k: "Longest you will wait for a considered answer, in writing" },
  { node: <CountUp to={97} suffix="%" />, k: "Clients who renewed with us last year. Most of the rest sold up" },
];

export function Figures() {
  return (
    <section aria-label="Meridian in figures" className="border-y border-[#d6cfbf] bg-[#ebe6d9]">
      <div className={`${wrap}`}>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((f, i) => (
            <Reveal
              key={f.k}
              delay={i * 90}
              className={`py-9 sm:py-11 lg:px-8 ${i > 0 ? "border-t border-[#d6cfbf] sm:border-t-0" : ""} ${
                i % 2 === 1 ? "sm:border-l sm:pl-8" : ""
              } ${i === 2 ? "sm:border-t lg:border-t-0 lg:border-l" : ""} ${i === 3 ? "sm:border-t lg:border-t-0" : ""} ${
                i === 0 ? "lg:pl-0" : ""
              } border-[#d6cfbf]`}
            >
              <dt className="sr-only">{f.k}</dt>
              <dd>
                <span className={`${serif} block text-[clamp(2.6rem,4.2vw,3.6rem)] font-[350] leading-none tracking-[-0.02em] text-[#13201b]`}>
                  {f.node}
                </span>
                <span aria-hidden="true" className={`${label} mt-5 block max-w-[17rem] text-[0.66rem] leading-[1.7] text-[#4f5a54]`}>
                  {f.k}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
