import { Reveal } from "./Reveal";
import { container, display, focusRingOnGreen } from "./ui";

const input = `mt-2 w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 ${focusRingOnGreen}`;

const label =
  "block text-xs font-semibold uppercase tracking-[0.14em] text-white/85";

export function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className={`${container} pb-20 sm:pb-24 lg:pb-28`}>
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-[#1f5c46] px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <h2
                  className={`${display} text-[clamp(2rem,4.5vw,3.1rem)] font-medium leading-[1.08] tracking-tight text-white`}
                >
                  Let&rsquo;s get your numbers working.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">
                  First consultation free, no obligation. Bring your last set
                  of accounts and we will show you what we would do
                  differently.
                </p>
                <ul className="mt-9 space-y-4">
                  <li>
                    <a
                      href="tel:+442079460480"
                      className={`inline-flex items-center gap-3 rounded-sm text-lg font-medium text-white transition-colors duration-200 hover:text-white/80 ${focusRingOnGreen}`}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4 shrink-0 text-white/70"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 3h4l1.5 4L7 8.5a11 11 0 004.5 4.5L13 11.5l4 1.5v4a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 012.5 4.5 1.5 1.5 0 014 3z" />
                      </svg>
                      020 7946 0480
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@meridian.cpa"
                      className={`inline-flex items-center gap-3 rounded-sm text-lg font-medium text-white transition-colors duration-200 hover:text-white/80 ${focusRingOnGreen}`}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4 shrink-0 text-white/70"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
                        <path d="M3 5.5l7 5.5 7-5.5" />
                      </svg>
                      hello@meridian.cpa
                    </a>
                  </li>
                </ul>
              </div>

              <form action="#" className="grid content-start gap-5">
                <div>
                  <label htmlFor="mc-name" className={label}>
                    Your name
                  </label>
                  <input
                    id="mc-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Alex Whitfield"
                    className={input}
                  />
                </div>
                <div>
                  <label htmlFor="mc-email" className={label}>
                    Work email
                  </label>
                  <input
                    id="mc-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@yourcompany.co.uk"
                    className={input}
                  />
                </div>
                <button
                  type="submit"
                  className={`inline-flex min-h-12 items-center justify-center rounded-full bg-[#f4f2ec] px-7 py-2.5 text-sm font-semibold text-[#15201c] transition-colors duration-200 hover:bg-white ${focusRingOnGreen}`}
                >
                  Book a consultation
                </button>
                <p className="text-xs leading-relaxed text-white/75">
                  We reply within 48 hours, usually much sooner.
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
