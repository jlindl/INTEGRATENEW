"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "./Arrow";
import { btnPrimary, focusRing, label, serif } from "./ui";

const field = `mt-2 block w-full rounded-none border-0 border-b border-[#13201b]/30 bg-transparent px-0 py-3 text-[1.05rem] text-[#13201b] placeholder:text-[#4f5a54]/70 transition-colors focus:border-[#1b4a3a] ${focusRing}`;

const needs = ["Switching accountant", "Bookkeeping and tax", "Management accounts", "R&D relief", "Fractional FD", "Something else"];

export function ContactForm() {
  const [sent, setSent] = useState<string | null>(null);
  const [need, setNeed] = useState(needs[0]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") || "").trim();
    setSent(name.split(" ")[0] || "there");
  }

  if (sent) {
    return (
      <div role="status" className="border-t border-[#13201b] pt-10">
        <p className={`${serif} text-[2.2rem] leading-[1.1] text-[#13201b]`}>
          Thank you, {sent}.
        </p>
        <p className="mt-4 max-w-[30rem] text-[1.02rem] leading-[1.7] text-[#4f5a54]">
          A partner will reply within one working day with two or three times
          for a call. If it&rsquo;s urgent, ring 020 7946 0480 and ask for the
          duty partner.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-8 sm:grid-cols-2" aria-label="Book a call">
      <div>
        <label htmlFor="mc-name" className={`${label} text-[#4f5a54]`}>Your name</label>
        <input id="mc-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="mc-company" className={`${label} text-[#4f5a54]`}>Company</label>
        <input id="mc-company" name="company" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="mc-email" className={`${label} text-[#4f5a54]`}>Email</label>
        <input id="mc-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="mc-phone" className={`${label} text-[#4f5a54]`}>Phone, optional</label>
        <input id="mc-phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className={`${label} text-[#4f5a54]`}>What can we help with?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {needs.map((n) => (
            <label key={n} className="relative">
              <input
                type="radio"
                name="need"
                value={n}
                checked={need === n}
                onChange={() => setNeed(n)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-10 cursor-pointer items-center rounded-full border border-[#13201b]/20 px-4 text-[0.88rem] text-[#13201b] transition-colors duration-300 hover:border-[#13201b]/50 peer-checked:border-[#1b4a3a] peer-checked:bg-[#1b4a3a] peer-checked:text-[#f3f0e8] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#1b4a3a]">
                {n}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <label htmlFor="mc-msg" className={`${label} text-[#4f5a54]`}>Anything we should know</label>
        <textarea
          id="mc-msg"
          name="message"
          rows={3}
          placeholder="Year-end date, current accountant, what is keeping you up at night."
          className={`${field} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[22rem] text-[0.85rem] leading-[1.55] text-[#4f5a54]">
          We reply within one working day. Your details are used only to
          arrange the call.
        </p>
        <button type="submit" className={btnPrimary}>
          Request a call
          <Arrow />
        </button>
      </div>
    </form>
  );
}
