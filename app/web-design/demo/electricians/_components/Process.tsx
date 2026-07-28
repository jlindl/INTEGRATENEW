import { Reveal } from "./Reveal";
import { Eyebrow, container, display, h2Heading, sectionSub } from "./ui";

const steps = [
  {
    n: "01",
    title: "Call or send the job",
    body: "Ring us or fill in the fast quote form. Photos help, so send them if you can.",
  },
  {
    n: "02",
    title: "Fixed quote before any work",
    body: "You approve a fixed price up front. No hourly creep, no hidden extras.",
  },
  {
    n: "03",
    title: "Fixed, tested, certified",
    body: "We do the work, test every circuit and hand over the certificate before we leave.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-t border-[#232a35] scroll-mt-24">
      <div className={`${container} py-16 sm:py-20 lg:py-24`}>
        <Reveal>
          <Eyebrow>How a callout works</Eyebrow>
          <h2 className={h2Heading}>Three steps. No surprises.</h2>
          <p className={sectionSub}>
            The same routine on every job, from a single socket to a full
            rewire.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ol className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {steps.map((step) => (
              <li
                key={step.n}
                className="border-t-2 border-[#232a35] pt-6"
              >
                <p
                  aria-hidden="true"
                  className={`${display} text-4xl font-bold leading-none text-[#ffb020]`}
                >
                  {step.n}
                </p>
                <h3
                  className={`mt-4 ${display} text-xl font-semibold uppercase tracking-[0.03em] text-[#f4f7fb]`}
                >
                  {step.title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-[#93a0b1]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
