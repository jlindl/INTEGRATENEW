import { CheckMark } from "./icons";
import { Reveal } from "./Reveal";
import {
  container,
  displayFont,
  monoKicker,
  monoStack,
  pillGhost,
  pillPrimary,
} from "./tokens";

const EMPLOYER_POINTS = [
  "Retained and contingent search, priced up front",
  "Every candidate pre-vetted across five stages before you meet them",
  "A replacement guarantee on every placement, no small print",
];

const CANDIDATE_POINTS = [
  "No CV spray. Your profile goes only where you say it can",
  "Salary benchmarked against live market data before you interview",
  "Coaching through offer, counter-offer and notice",
];

export function TwoDoors() {
  return (
    <section className="py-16 sm:py-24" aria-label="Employers and candidates">
      <div className={container}>
        <Reveal>
          <p className={`${monoKicker} text-[#c43a10]`}>Two front doors</p>
          <h2
            className={`${displayFont} mt-4 max-w-2xl text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06] tracking-tight text-[#16181d]`}
          >
            Hiring or moving, you get the same straight answers.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {/* Employers: the ink panel */}
          <Reveal>
            <article
              id="hire"
              className="flex h-full scroll-mt-24 flex-col rounded-2xl bg-[#16181d] p-7 text-white sm:p-10"
            >
              <p className={`${monoKicker} text-[#ff5a3c]`}>For employers</p>
              <h3
                className={`${displayFont} mt-4 text-3xl font-bold tracking-tight sm:text-4xl`}
              >
                Hire better, faster.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-white/65">
                One consultant owns your search end to end. You see a calibrated
                longlist by day three and an interview-ready shortlist by day
                eleven, on average.
              </p>
              <ul className="mt-7 space-y-3.5">
                {EMPLOYER_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#ff5a3c] text-[#16181d]"
                      aria-hidden="true"
                    >
                      <CheckMark className="h-3 w-3" />
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-white/85">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-4 pt-1 lg:mt-auto lg:pt-9">
                <a href="#contact" className={pillPrimary}>
                  Submit a vacancy
                </a>
                <span className={`${monoStack} text-[0.68rem] uppercase tracking-[0.14em] text-white/45`}>
                  Reply within one working day
                </span>
              </div>
            </article>
          </Reveal>

          {/* Candidates: the paper panel */}
          <Reveal delay={120}>
            <article
              id="candidates"
              className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-[#e7e2d8] bg-white p-7 sm:p-10"
            >
              <p className={`${monoKicker} text-[#c43a10]`}>For candidates</p>
              <h3
                className={`${displayFont} mt-4 text-3xl font-bold tracking-tight text-[#16181d] sm:text-4xl`}
              >
                Roles that actually fit.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-[#5c5f68]">
                We represent a small number of senior people at a time, so when
                we call about a role, it is because you are genuinely right for
                it.
              </p>
              <ul className="mt-7 space-y-3.5">
                {CANDIDATE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#16181d] text-white"
                      aria-hidden="true"
                    >
                      <CheckMark className="h-3 w-3" />
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-[#16181d]/85">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-4 pt-1 lg:mt-auto lg:pt-9">
                <a href="#contact" className={pillGhost}>
                  Register your CV
                </a>
                <a
                  href="#roles"
                  className="text-sm font-semibold text-[#c43a10] underline-offset-4 transition-colors duration-200 hover:text-[#16181d] hover:underline"
                >
                  Browse live roles
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
