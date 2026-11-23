"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { IMG, btnInk, focusRingLight, label, mono, serif, wrap } from "./tokens";

const offices = [
  {
    city: "London",
    lines: ["4 Furnival Yard", "London EC4A 1HL"],
    tel: "020 7946 0418",
    img: "london-door.webp",
    alt: "A carved stone doorway with a dark wooden door on a London street",
  },
  {
    city: "Guildford",
    lines: ["31 Quarry Street", "Guildford GU1 3UY"],
    tel: "01632 960 214",
    img: "guildford-door.webp",
    alt: "The black front door of a white Georgian townhouse with iron railings",
  },
];

const field =
  "peer w-full border-0 border-b border-[#17130f]/30 bg-transparent px-0 pb-3 pt-2 text-[1rem] text-[#17130f] placeholder:text-[#5b5348]/60 transition-colors focus:border-[#74272a] focus:outline-none focus:ring-0";
const fieldLabel = `${mono} block text-[0.64rem] uppercase tracking-[0.16em] text-[#5b5348]`;

export function Consultation() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 bg-[#0f0d0b] text-[#f3efe7]">
      <div className={`${wrap} grid gap-16 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10 lg:py-40`}>
        <div className="lg:col-span-5">
          <p className={`${label} text-[#d9c3a0]`}>§ 08 · Consultation</p>
          <h2
            id="contact-title"
            className={`${serif} mt-6 text-[clamp(2.6rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em]`}
          >
            Tell us what has happened. <em className="italic text-[#d9c3a0]">We will tell you honestly</em> whether we can help.
          </h2>
          <p className="mt-8 max-w-md text-[1rem] leading-[1.75] text-[#f3efe7]/70">
            Every enquiry is read by a partner, in confidence, and answered
            within one working day. If we are not the right firm, we will say
            so and suggest one that is.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {offices.map((o) => (
              <div key={o.city}>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1d1915]">
                  <Image src={`${IMG}/${o.img}`} alt={o.alt} fill sizes="(min-width: 1024px) 18vw, 50vw" className="hl-grade object-cover" />
                </div>
                <h3 className={`${serif} mt-5 text-[1.6rem] leading-none`}>{o.city}</h3>
                <address className="mt-3 text-[0.9rem] not-italic leading-[1.6] text-[#f3efe7]/70">
                  {o.lines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>
                <a
                  href={`tel:${o.tel.replace(/\s/g, "")}`}
                  className={`mt-3 inline-block border-b border-[#f3efe7]/25 pb-0.5 text-[0.9rem] hover:border-[#d9c3a0] ${focusRingLight}`}
                >
                  {o.tel}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="bg-[#f3efe7] p-7 text-[#17130f] sm:p-12">
            {sent ? (
              <div role="status" className="flex min-h-[28rem] flex-col justify-center">
                <p className={`${label} text-[#74272a]`}>Received</p>
                <p className={`${serif} mt-5 text-[2.4rem] leading-[1.05]`}>
                  Thank you. <em className="italic">A partner will reply by the end of the next working day.</em>
                </p>
                <p className="mt-5 max-w-sm text-[0.95rem] leading-[1.7] text-[#5b5348]">
                  If it cannot wait, call 020 7946 0418 and ask for the duty partner.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} aria-describedby="form-note" className="grid gap-8">
                <div className="flex items-baseline justify-between gap-4">
                  <p className={`${serif} text-[1.9rem] leading-none`}>Request a consultation</p>
                  <span className={`${mono} hidden text-[0.62rem] uppercase tracking-[0.16em] text-[#5b5348] sm:inline`}>Confidential</span>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="hl-name" className={fieldLabel}>Full name</label>
                    <input id="hl-name" name="name" required autoComplete="name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="hl-phone" className={fieldLabel}>Telephone</label>
                    <input id="hl-phone" name="phone" type="tel" autoComplete="tel" className={field} />
                  </div>
                </div>

                <div>
                  <label htmlFor="hl-email" className={fieldLabel}>Email</label>
                  <input id="hl-email" name="email" type="email" required autoComplete="email" className={field} />
                </div>

                <fieldset>
                  <legend className={fieldLabel}>This is about</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["My business", "Me or my family", "Not sure yet"].map((opt, i) => (
                      <label key={opt} className="cursor-pointer">
                        <input type="radio" name="about" value={opt} defaultChecked={i === 0} className="peer sr-only" />
                        <span className="inline-flex min-h-11 items-center border border-[#17130f]/25 px-4 text-[0.86rem] transition-colors peer-checked:border-[#17130f] peer-checked:bg-[#17130f] peer-checked:text-[#f3efe7] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#74272a] hover:border-[#17130f]">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="hl-msg" className={fieldLabel}>In a few lines, what has happened?</label>
                  <textarea id="hl-msg" name="message" rows={4} className={`${field} resize-none`} />
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <p id="form-note" className="max-w-[17rem] text-[0.8rem] leading-[1.55] text-[#5b5348]">
                    Please do not include confidential detail yet. Nothing you send creates a solicitor and client relationship.
                  </p>
                  <button type="submit" className={`${btnInk} shrink-0 cursor-pointer`}>
                    Send in confidence
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </button>
                </div>
              </form>
            )}
          </div>
          <p className="mt-6 text-[0.84rem] text-[#f3efe7]/60">
            Prefer to talk?{" "}
            <a href="tel:02079460418" className={`text-[#f3efe7] underline underline-offset-4 ${focusRingLight}`}>
              020 7946 0418
            </a>
            , weekdays 8.30am to 6.30pm.
          </p>
        </div>
      </div>
    </section>
  );
}
