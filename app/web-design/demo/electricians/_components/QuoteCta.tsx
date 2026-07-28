import Image from "next/image";
import { Reveal } from "./Reveal";
import {
  Eyebrow,
  ShieldCheck,
  btnPrimary,
  container,
  focusRing,
  h2Heading,
  sectionSub,
} from "./ui";

const field =
  "mt-1.5 w-full rounded-md border border-[#232a35] bg-[#0e1116] px-3.5 py-3 text-base text-[#f4f7fb] placeholder:text-[#93a0b1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb020] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1116]";

const fieldLabel = "block text-sm font-medium text-[#f4f7fb]";

export function QuoteCta() {
  return (
    <section
      id="quote"
      className="relative overflow-hidden border-t border-[#232a35] scroll-mt-24"
    >
      {/* Pylons at dusk, held far back behind a dark overlay */}
      <Image
        src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=60"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#0e1116] via-[#0e1116]/75 to-[#0e1116]"
      />

      <div
        className={`relative ${container} grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24`}
      >
        <Reveal>
          <Eyebrow>Fast quote</Eyebrow>
          <h2 className={h2Heading}>Tell us the job. We price it today.</h2>
          <p className={sectionSub}>
            Send the form and we ring you back within one working hour with a
            fixed price.
          </p>

          <form
            action="#"
            className="mt-8 grid gap-4 rounded-lg border border-[#232a35] bg-[#161b23] p-6 sm:grid-cols-2 sm:p-8"
          >
            <div>
              <label htmlFor="ve-name" className={fieldLabel}>
                Full name
              </label>
              <input
                type="text"
                id="ve-name"
                name="name"
                autoComplete="name"
                placeholder="Jamie Carter"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="ve-phone" className={fieldLabel}>
                Contact number
              </label>
              <input
                type="tel"
                id="ve-phone"
                name="phone"
                autoComplete="tel"
                placeholder="07700 900000"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="ve-postcode" className={fieldLabel}>
                Postcode
              </label>
              <input
                type="text"
                id="ve-postcode"
                name="postcode"
                autoComplete="postal-code"
                placeholder="M4 5FE"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="ve-job" className={fieldLabel}>
                Job type
              </label>
              <select id="ve-job" name="job" className={field} defaultValue="">
                <option value="" disabled>
                  Choose a job type
                </option>
                <option value="emergency">Emergency fault</option>
                <option value="rewire">Full or partial rewire</option>
                <option value="ev">EV charger install</option>
                <option value="board">Fuse board or EICR</option>
                <option value="other">Something else</option>
              </select>
            </div>
            <button type="submit" className={`sm:col-span-2 ${btnPrimary} w-full`}>
              Send my quote request
            </button>
            <p className="text-sm text-[#93a0b1] sm:col-span-2">
              No obligation. Prefer to talk?{" "}
              <a
                href="tel:01614960100"
                className={`rounded-sm px-0.5 font-semibold text-[#f4f7fb] transition-colors hover:text-[#ffb020] ${focusRing}`}
              >
                Call 0161 496 0100
              </a>
              , open 24/7.
            </p>
          </form>
        </Reveal>

        <Reveal delay={100}>
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[#232a35]">
              <Image
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=75"
                alt="Voltedge engineer in workwear standing with arms crossed"
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 85vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-[#93a0b1]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb020]" />
              Certified, DBS-checked engineers. No subcontractors.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
