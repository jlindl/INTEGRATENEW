"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";
import { CheckIcon, PhoneIcon } from "./icons";
import { btnInk, display, EMAIL, focusRing, focusRingDark, h2, kicker, mono, narrow, PHONE_DISPLAY, PHONE_HREF, wrap } from "./theme";

const JOBS = ["Emergency", "Repair", "Boiler or heating", "Bathroom", "Drains", "Something else"];
const WHEN = ["As soon as possible", "This week", "I'm flexible"];

const field =
  "block w-full rounded-2xl border border-[#cdd8da] bg-white px-4 py-3.5 text-[1rem] text-[#0b1a28] placeholder:text-[#6b7c88] transition-colors hover:border-[#9fb0b6]";

export function Booking() {
  const id = useId();
  const [job, setJob] = useState("Repair");
  const [when, setWhen] = useState(WHEN[0]);
  const [sent, setSent] = useState<string | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSent(String(data.get("name") || "").split(" ")[0] || "there");
  }

  const chip = (on: boolean) =>
    `${focusRing} cursor-pointer rounded-full border px-4 py-2.5 text-[0.92rem] font-semibold transition-colors ${
      on ? "border-[#0b1a28] bg-[#0b1a28] text-white" : "border-[#cdd8da] bg-white text-[#0b1a28] hover:border-[#0b1a28]"
    }`;

  return (
    <section id="book" aria-labelledby="book-title" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
        {/* Side panel */}
        <aside className="lg:col-span-5">
          <p className={kicker}>Book or ask</p>
          <h2 id="book-title" className={`${h2} mt-5 text-[#0b1a28]`}>
            Tell us what is going on.
          </h2>
          <p className="mt-6 max-w-md text-[1.08rem] leading-relaxed text-[#33475a]">
            We reply within 15 minutes between 7am and 8pm, with a time slot or a price. Outside those hours, the phone is
            always quicker.
          </p>

          <div className="relative mt-10 overflow-hidden rounded-[28px] bg-[#0b1a28] text-white">
            <div className="relative h-[180px]">
              <Image
                src="/web-design/demo/plumbers/kitchen-tap.webp"
                alt="A matt black kitchen mixer tap running into a black sink"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-[50%_45%] opacity-80"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1a28] to-transparent" />
            </div>
            <div className="relative -mt-10 p-6 sm:p-8">
              <p className={`${narrow} text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#1ed3b0]`}>24/7 line</p>
              <a
                href={PHONE_HREF}
                className={`${focusRingDark} ${mono} mt-2 inline-flex items-center gap-3 rounded text-[1.7rem] font-medium text-white hover:text-[#1ed3b0] sm:text-[2rem]`}
              >
                <PhoneIcon className="h-6 w-6 text-[#1ed3b0]" />
                {PHONE_DISPLAY}
              </a>
              <dl className="mt-6 grid gap-4 border-t border-[#22405a] pt-6 text-[0.95rem]">
                <div>
                  <dt className="text-[#9fb3c3]">Email</dt>
                  <dd className="mt-1 break-words">
                    <a href={`mailto:${EMAIL}`} className={`${focusRingDark} rounded underline decoration-[#1ed3b0] underline-offset-4`}>
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[#9fb3c3]">Office</dt>
                  <dd className="mt-1">Unit 4, Abbey Road Works, Kirkstall, Leeds LS5 3HP</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-7">
          <div className="rounded-[30px] bg-[#f3f6f5] p-5 ring-1 ring-[#d8e1e3] sm:p-9">
            {sent ? (
              <div role="status" className="py-10 text-center sm:py-16">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#1ed3b0] text-[#0b1a28]">
                  <CheckIcon className="h-8 w-8" />
                </span>
                <p className={`${display} mt-6 text-[1.9rem] font-extrabold tracking-[-0.03em] text-[#0b1a28]`}>
                  Thanks, {sent}. That is with Jo now.
                </p>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-[#33475a]">
                  Expect a text within 15 minutes with a time slot or a fixed price. If anything gets worse in the meantime, ring{" "}
                  <a href={PHONE_HREF} className={`${focusRing} rounded font-bold text-[#0a7a66] underline underline-offset-4`}>
                    {PHONE_DISPLAY}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSent(null)}
                  className={`${focusRing} mt-8 rounded-full px-5 py-2.5 font-bold text-[#0b1a28] underline underline-offset-4`}
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-7">
                <fieldset>
                  <legend className="text-[1rem] font-bold text-[#0b1a28]">What kind of job is it?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {JOBS.map((j) => (
                      <label key={j} className={chip(job === j)}>
                        <input
                          type="radio"
                          name="job"
                          value={j}
                          checked={job === j}
                          onChange={() => setJob(j)}
                          className="sr-only"
                        />
                        {j}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {job === "Emergency" && (
                  <div role="note" className="flex flex-col gap-4 rounded-2xl bg-[#0b1a28] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                    <p className="leading-snug">
                      <strong className="block">Water coming through right now?</strong>
                      <span className="text-[#b9c8d3]">Calling is faster. We will still text back if you send this.</span>
                    </p>
                    <a
                      href={PHONE_HREF}
                      className={`${focusRingDark} inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#1ed3b0] px-5 py-3 font-bold text-[#0b1a28]`}
                    >
                      <PhoneIcon className="h-4 w-4" /> Call now
                    </a>
                  </div>
                )}

                <fieldset>
                  <legend className="text-[1rem] font-bold text-[#0b1a28]">When would suit?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {WHEN.map((w) => (
                      <label key={w} className={chip(when === w)}>
                        <input
                          type="radio"
                          name="when"
                          value={w}
                          checked={when === w}
                          onChange={() => setWhen(w)}
                          className="sr-only"
                        />
                        {w}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}-name`} className="text-[0.95rem] font-bold text-[#0b1a28]">
                      Your name
                    </label>
                    <input id={`${id}-name`} name="name" required autoComplete="name" className={`${field} ${focusRing} mt-2`} />
                  </div>
                  <div>
                    <label htmlFor={`${id}-tel`} className="text-[0.95rem] font-bold text-[#0b1a28]">
                      Mobile number
                    </label>
                    <input
                      id={`${id}-tel`}
                      name="tel"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      className={`${field} ${focusRing} mt-2`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${id}-pc`} className="text-[0.95rem] font-bold text-[#0b1a28]">
                      Postcode
                    </label>
                    <input
                      id={`${id}-pc`}
                      name="postcode"
                      required
                      autoComplete="postal-code"
                      className={`${field} ${focusRing} ${mono} mt-2 uppercase sm:max-w-[220px]`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${id}-msg`} className="text-[0.95rem] font-bold text-[#0b1a28]">
                      What is happening? <span className="font-normal text-[#4b5d6b]">(optional)</span>
                    </label>
                    <textarea
                      id={`${id}-msg`}
                      name="message"
                      rows={4}
                      placeholder="e.g. Boiler showing F28, no hot water since this morning."
                      className={`${field} ${focusRing} mt-2 resize-y`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-[#d8e1e3] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.88rem] text-[#4b5d6b]">No spam, no sales calls. We only use this to reply.</p>
                  <button type="submit" className={`${btnInk} ${focusRing}`}>
                    Send request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
