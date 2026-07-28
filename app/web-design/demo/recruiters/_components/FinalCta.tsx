import { Reveal } from "./Reveal";
import {
  container,
  displayFont,
  focusRingDark,
  monoKicker,
  monoStack,
  pillGhostDark,
  pillPrimary,
} from "./tokens";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24 bg-[#16181d] py-16 text-white sm:py-24">
      <div className={container}>
        <Reveal>
          <p className={`${monoKicker} text-[#ff5a3c]`}>Start a conversation</p>
          <h2
            className={`${displayFont} mt-4 max-w-3xl text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.04] tracking-tight`}
          >
            Tell us who you need. We will tell you exactly how we would find
            them.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-7 sm:p-9">
              <h3 className={`${displayFont} text-2xl font-bold tracking-tight`}>
                Hiring
              </h3>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/65">
                Send the role, or half an idea of it. A sector consultant will
                come back within one working day with a timeline and a fee, in
                writing.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-7">
                <a
                  href="mailto:hire@ascendtalent.com?subject=Vacancy%20brief"
                  className={pillPrimary}
                >
                  Submit a vacancy
                </a>
                <a
                  href="tel:+442079460958"
                  className={`${monoStack} rounded-sm text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white ${focusRingDark}`}
                >
                  020 7946 0958
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-7 sm:p-9">
              <h3 className={`${displayFont} text-2xl font-bold tracking-tight`}>
                Moving
              </h3>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/65">
                Send a CV or a LinkedIn profile, confidentially. If we cannot
                help, we will say so straight away rather than sit on it.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-7">
                <a
                  href="mailto:careers@ascendtalent.com?subject=Registering%20my%20CV"
                  className={pillGhostDark}
                >
                  Register your CV
                </a>
                <span className={`${monoStack} text-[0.68rem] uppercase tracking-[0.14em] text-white/45`}>
                  Never shared without consent
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
