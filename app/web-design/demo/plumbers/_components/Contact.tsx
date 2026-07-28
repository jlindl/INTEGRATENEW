import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";
import { Reveal } from "./Reveal";
import {
  btnPrimary,
  container,
  displayFont,
  EMAIL,
  eyebrowLight,
  focusLight,
  h2Light,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "./theme";

const inputClass =
  "w-full rounded-xl border border-[#dde8ee] bg-[#f6f9fb] px-4 py-3 text-[0.95rem] text-[#12212e] placeholder:text-[#7c93a6] transition-colors focus:border-[#23c1a6] focus:outline-none focus:ring-2 focus:ring-[#23c1a6]/40";

const labelClass = "mb-1.5 block text-sm font-semibold text-[#12212e]";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 bg-[#f6f9fb] py-20 sm:py-28">
      <div className={container}>
        <div className="max-w-2xl">
          <p className={eyebrowLight}>Book an engineer</p>
          <h2 id="contact-heading" className={`${h2Light} mt-3`}>
            Tell us what&rsquo;s gone wrong. We&rsquo;ll take it from there.
          </h2>
          <p className="mt-4 leading-relaxed text-[#4e6274]">
            Fill this in and we call you back within 30 minutes during opening hours. If water is coming through a
            ceiling right now, skip the form and ring the emergency line.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <Reveal>
            <form
              action="#"
              className="rounded-2xl border border-[#dde8ee] bg-white p-6 shadow-[0_24px_50px_-34px_rgba(2,12,22,0.4)] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nl-name" className={labelClass}>
                    Your name
                  </label>
                  <input
                    id="nl-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Jamie Fletcher"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="nl-postcode" className={labelClass}>
                    Postcode
                  </label>
                  <input
                    id="nl-postcode"
                    name="postcode"
                    type="text"
                    autoComplete="postal-code"
                    placeholder="e.g. LS5 3AL"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="nl-phone" className={labelClass}>
                    Phone number
                  </label>
                  <input
                    id="nl-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Best number for a call back"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="nl-problem" className={labelClass}>
                    What&rsquo;s the problem?
                  </label>
                  <select id="nl-problem" name="problem" defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Choose the closest match
                    </option>
                    <option value="emergency">Emergency, leak or burst pipe</option>
                    <option value="boiler-service">Boiler service or repair</option>
                    <option value="new-boiler">New boiler quote</option>
                    <option value="bathroom">Bathroom project</option>
                    <option value="general">General plumbing</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
              </div>
              <button type="submit" className={`${btnPrimary} mt-6 w-full ${focusLight}`}>
                Request a call back
              </button>
              <p className="mt-4 text-center text-sm text-[#4e6274]">
                We reply within 30 minutes, Monday to Saturday. Out of hours, the emergency line is faster.
              </p>
            </form>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col gap-6">
              <div className="flex-1 rounded-2xl border border-[#dde8ee] bg-white p-6 sm:p-8">
                <h3 className={`${displayFont} text-lg font-bold text-[#12212e]`}>Get hold of us</h3>
                <ul className="mt-5 space-y-5">
                  <li className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e6f8f3] text-[#0d6e5d]">
                      <ClockIcon className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="font-semibold text-[#12212e]">Opening hours</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-[#4e6274]">
                        Monday to Saturday, 7am to 7pm.
                        <br />
                        Emergencies, 24 hours a day.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e6f8f3] text-[#0d6e5d]">
                      <PhoneIcon className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="font-semibold text-[#12212e]">Phone</p>
                      <a
                        href={PHONE_HREF}
                        className={`mt-0.5 inline-block rounded-md text-sm font-semibold text-[#0d6e5d] hover:text-[#094f42] ${focusLight}`}
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e6f8f3] text-[#0d6e5d]">
                      <MailIcon className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="font-semibold text-[#12212e]">Email</p>
                      <a
                        href={`mailto:${EMAIL}`}
                        className={`mt-0.5 inline-block break-all rounded-md text-sm font-semibold text-[#0d6e5d] hover:text-[#094f42] ${focusLight}`}
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e6f8f3] text-[#0d6e5d]">
                      <PinIcon className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="font-semibold text-[#12212e]">Workshop</p>
                      <address className="mt-0.5 text-sm not-italic leading-relaxed text-[#4e6274]">
                        Unit 4, Kirkstall Yard
                        <br />
                        Leeds LS5 3BW
                      </address>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-[#0c1420] p-6 sm:p-7">
                <p className={`${displayFont} font-bold text-[#eef5fb]`}>Emergency right now?</p>
                <p className="mt-1 text-sm leading-relaxed text-[#8ba3ba]">
                  Turn off the stopcock if you can, then call. We answer around the clock.
                </p>
                <a
                  href={PHONE_HREF}
                  className={`mt-4 inline-flex items-center gap-2 rounded-xl bg-[#23c1a6] px-5 py-3 text-[0.95rem] font-bold text-[#08110f] transition-colors hover:bg-[#31d6b9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23c1a6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1420]`}
                >
                  <PhoneIcon className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
