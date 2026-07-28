import { Reveal } from "./Reveal";
import { container, display, focusRingOnDark } from "./ui";

const field =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/45 focus-visible:border-white/50 focus-visible:outline-none";

export function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-24 bg-[#1a1712] text-white">
      <div
        className={`${container} grid gap-14 py-20 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:py-28`}
      >
        <Reveal>
          <p className="flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a25f]" aria-hidden="true" />
            Request a consultation
          </p>
          <h2
            className={`${display} mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-tight`}
          >
            Tell us what&rsquo;s on your mind.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
            A first conversation is confidential and without obligation. We will
            tell you honestly whether we can help, what it is likely to involve,
            and what it will cost — before you commit to anything.
          </p>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                Call
              </dt>
              <dd className="mt-1">
                <a
                  href="tel:+442079460112"
                  className={`rounded-sm text-lg font-medium text-white transition-colors hover:text-[#e6b877] ${focusRingOnDark}`}
                >
                  020 7946 0112
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href="mailto:hello@halsteadlaw.com"
                  className={`rounded-sm text-white/85 transition-colors hover:text-white ${focusRingOnDark}`}
                >
                  hello@halsteadlaw.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                Offices
              </dt>
              <dd className="mt-1 text-white/85">
                88 Bedford Row, London WC1R 4LL
                <br />
                2 Quarry Street, Guildford GU1 3UA
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:p-8">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-medium text-white/70">Full name</span>
                  <input type="text" placeholder="Jane Doe" className={`mt-1.5 ${field}`} />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-white/70">Phone</span>
                  <input type="tel" placeholder="07700 900000" className={`mt-1.5 ${field}`} />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-medium text-white/70">Email</span>
                <input type="email" placeholder="jane@company.com" className={`mt-1.5 ${field}`} />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-white/70">How can we help?</span>
                <textarea
                  rows={4}
                  placeholder="A few lines about your matter…"
                  className={`mt-1.5 resize-none ${field}`}
                />
              </label>
              <button
                type="button"
                className={`inline-flex min-h-11 items-center justify-center rounded-full bg-[#7c2d2d] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#8f3636] ${focusRingOnDark}`}
              >
                Request a call back
              </button>
              <p className="text-center text-[0.72rem] text-white/45">
                Your enquiry is confidential and covered by legal privilege.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
