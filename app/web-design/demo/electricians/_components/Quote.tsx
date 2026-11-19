"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { Arrow, Check, Circuit, PHONE, TEL, display, focusRing, h2, mono, wrap } from "./ui";

const jobs = ["Fault or no power", "Consumer unit", "Rewire", "EV charger", "EICR / landlord", "Sockets or lighting", "Something else"];
const timings = ["As soon as possible", "Within two weeks", "I'm flexible"];

const field = `mt-2 w-full border border-white/15 bg-[#0a0c0f] px-4 py-3.5 text-base text-[#f3f5f8] placeholder:text-[#6f7988] transition-colors hover:border-white/30 focus-visible:border-[#ffb020] ${focusRing}`;
const label = `${mono} block text-[0.7rem] uppercase tracking-[0.16em] text-[#9aa4b2]`;

export function Quote() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setName(String(data.get("name") || "").split(" ")[0]);
    setSent(true);
  }

  return (
    <section id="quote" aria-labelledby="quote-title" className="scroll-mt-20 border-t border-white/10 bg-[#0d1014] py-20 sm:py-28">
      <div className={wrap}>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <Circuit n="C7">Fixed price</Circuit>
            <h2 id="quote-title" className={`${h2} mt-6`}>
              Not an emergency?
              <br />
              <span className="text-[#ffb020]">Price by 5pm.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#9aa4b2]">
              Tell us the job and an electrician, not a salesperson, rings you
              back with a fixed price the same working day. Photos help, and
              we&rsquo;ll ask for them by text.
            </p>
            <ul className="mt-8 grid gap-3 text-[#f3f5f8]">
              {["Fixed price, not an estimate", "No deposit for jobs under £1,000", "Free survey for rewires and boards"].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#ffb020]" />
                  {t}
                </li>
              ))}
            </ul>

            <figure className="mt-12 hidden lg:block">
              <div className="relative aspect-[16/9] overflow-hidden border border-white/10">
                <Image
                  src="/web-design/demo/electricians/terrace.webp"
                  alt="A row of red-brick Victorian terraced cottages with white sash windows"
                  fill
                  sizes="38vw"
                  className="object-cover brightness-[.85] saturate-[.55] contrast-[1.05]"
                />
              </div>
              <figcaption className={`${mono} mt-3 text-[0.68rem] uppercase leading-relaxed tracking-[0.12em] text-[#9aa4b2]`}>
                Most of our work: Victorian terraces and 1930s semis whose wiring has seen a few owners.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100}>
            {sent ? (
              <div role="status" className="flex h-full min-h-[420px] flex-col justify-center border border-[#ffb020]/50 bg-[#0a0c0f] p-8 sm:p-12">
                <span className="grid h-14 w-14 place-items-center bg-[#ffb020] text-[#0a0c0f]">
                  <Check className="h-7 w-7" />
                </span>
                <p className={`${display} mt-8 text-[clamp(2.2rem,4vw,3.4rem)] font-black uppercase leading-[0.92] text-[#f3f5f8]`}>
                  Got it{name ? `, ${name}` : ""}.
                  <br />
                  <span className="text-[#ffb020]">We'll ring you today.</span>
                </p>
                <p className="mt-5 max-w-md text-[#9aa4b2]">
                  This is a demo, so nothing was sent. On the real site an
                  electrician would call back within the working day. If it
                  can&rsquo;t wait, ring{" "}
                  <a href={TEL} className={`font-semibold text-[#f3f5f8] underline decoration-[#ffb020] underline-offset-4 ${focusRing}`}>
                    {PHONE}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} action="#" className="border border-white/10 bg-[#0a0c0f] p-6 sm:p-10">
                <fieldset>
                  <legend className={label}>What&rsquo;s the job?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {jobs.map((j, i) => (
                      <label
                        key={j}
                        className={`cursor-pointer border border-white/15 px-3.5 py-2.5 text-[0.95rem] text-[#dfe4ea] transition-colors hover:border-white/40 has-[:checked]:border-[#ffb020] has-[:checked]:bg-[#ffb020] has-[:checked]:text-[#0a0c0f] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#ffb020] has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-[#0a0c0f]`}
                      >
                        <input type="radio" name="job" value={j} defaultChecked={i === 0} className="sr-only" />
                        {j}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ve-name" className={label}>Your name</label>
                    <input id="ve-name" name="name" required autoComplete="name" placeholder="Jamie Carter" className={field} />
                  </div>
                  <div>
                    <label htmlFor="ve-phone" className={label}>Phone</label>
                    <input id="ve-phone" name="phone" type="tel" required autoComplete="tel" placeholder="07700 900123" className={field} />
                  </div>
                  <div>
                    <label htmlFor="ve-postcode" className={label}>Postcode</label>
                    <input id="ve-postcode" name="postcode" required autoComplete="postal-code" placeholder="SK4 2AB" className={`${field} uppercase`} />
                  </div>
                  <div>
                    <label htmlFor="ve-when" className={label}>When</label>
                    <select id="ve-when" name="when" className={field} defaultValue={timings[0]}>
                      {timings.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="ve-details" className={label}>
                      A few details <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      id="ve-details"
                      name="details"
                      rows={4}
                      placeholder="e.g. 3-bed semi, old fuse box with a wooden back, want an EV charger on the drive too."
                      className={`${field} resize-y`}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-sm text-[#9aa4b2]">
                    No power or a burning smell? Don&rsquo;t fill this in.{" "}
                    <a href={TEL} className={`font-semibold text-[#ffb020] ${focusRing}`}>
                      Call {PHONE}
                    </a>
                  </p>
                  <button
                    type="submit"
                    className={`group inline-flex items-center justify-center gap-3 bg-[#ffb020] px-7 py-4 ${display} text-xl font-extrabold uppercase tracking-[0.04em] text-[#0a0c0f] transition-[background-color,box-shadow] hover:bg-[#ffc04a] hover:shadow-[0_0_48px_rgba(255,176,32,.35)] ${focusRing}`}
                  >
                    Get my price
                    <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
