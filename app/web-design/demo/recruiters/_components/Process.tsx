import { Reveal } from "./Reveal";
import { container, displayFont, monoKicker, monoStack } from "./tokens";

const STEPS = [
  {
    day: "Day 0",
    title: "Brief & benchmark",
    body: "A working session on the role, the team and the real bar. You leave with a scorecard and live salary data for the market you are hiring in.",
  },
  {
    day: "Day 3",
    title: "Calibration longlist",
    body: "Ten to twelve profiles to react to. Thirty minutes of your feedback here saves weeks of interviewing the wrong shape of person.",
  },
  {
    day: "Day 11",
    title: "The shortlist",
    body: "Four or five interview-ready candidates. Vetted across five stages, briefed on your company and available on dates that suit your panel.",
  },
  {
    day: "Day 30",
    title: "Offer, managed",
    body: "We handle benchmarking, counter-offers and notice periods. That is why 92% of the offers our clients make get accepted.",
  },
];

export function Process() {
  return (
    <section className="bg-[#16181d] py-16 text-white sm:py-24">
      <div className={container}>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${monoKicker} text-[#ff5a3c]`}>How a search runs</p>
              <h2
                className={`${displayFont} mt-4 max-w-xl text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06] tracking-tight`}
              >
                A search with a clock on it.
              </h2>
            </div>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              Averages across the last 200 searches. You see the same timeline,
              with dates, in your kickoff pack.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.day} delay={i * 90}>
              <div className="border-t border-white/15 pt-6">
                <p className={`${monoStack} text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#ff5a3c]`}>
                  {step.day}
                </p>
                <h3
                  className={`${displayFont} mt-3 text-xl font-bold tracking-tight`}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 lg:mt-16">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.04] px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="max-w-2xl text-[0.95rem] leading-relaxed text-white/80">
              <span className={`${displayFont} font-bold text-white`}>
                The guarantee:
              </span>{" "}
              if a placement leaves inside their guarantee period, we re-run the
              search free. In eleven years, we have honoured it 31 times out of
              1,400 placements.
            </p>
            <p className={`${monoStack} shrink-0 text-[0.68rem] uppercase tracking-[0.14em] text-white/45`}>
              Written into every terms
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
