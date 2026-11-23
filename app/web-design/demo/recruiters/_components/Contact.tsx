"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "./icons";
import { btnPrimary, display, focusRing, grade, kicker, mono, serif, wrap } from "./tokens";

type Side = "hiring" | "looking";

const FIELDS: Record<Side, { name: string; label: string; type?: string; auto?: string; placeholder: string }[]> = {
  hiring: [
    { name: "name", label: "Your name", auto: "name", placeholder: "Laura Bennett" },
    { name: "company", label: "Company", auto: "organization", placeholder: "Hatchwork" },
    { name: "role", label: "The role you're hiring", placeholder: "Head of Platform Engineering" },
    { name: "email", label: "Work email", type: "email", auto: "email", placeholder: "laura@hatchwork.co.uk" },
  ],
  looking: [
    { name: "name", label: "Your name", auto: "name", placeholder: "Daniel Okafor" },
    { name: "current", label: "What you do now", placeholder: "Engineering Manager, fintech" },
    { name: "email", label: "Personal email", type: "email", auto: "email", placeholder: "daniel@example.com" },
    { name: "notes", label: "What would make you move?", placeholder: "Scope, a hybrid week, a real equity story" },
  ],
};

export function Contact() {
  const [side, setSide] = useState<Side>("hiring");
  const [sent, setSent] = useState(false);
  const id = useId();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 border-t border-[#ddd6c8] bg-[#fbf9f4]">
      <div className={`${wrap} grid grid-cols-1 gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12 lg:py-32`}>
        <div className="lg:col-span-7">
          <p className={`${kicker} text-[#b8360d]`}>Start here</p>
          <h2
            id="contact-title"
            className={`${display} mt-5 text-[clamp(2.5rem,6vw,5.4rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-[#121317]`}
          >
            Brief us before you <span className={`${serif} italic tracking-[-0.02em] text-[#b8360d]`}>write the advert.</span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-[#575a62]">
            Twenty minutes on the phone, and we&rsquo;ll tell you honestly whether
            the role, the salary and the timeline add up. If we&rsquo;re not the
            right firm, we&rsquo;ll say who is.
          </p>

          {sent ? (
            <div className="mt-10 rounded-[4px] border border-[#121317] bg-white p-8" role="status">
              <p className={`${kicker} text-[#b8360d]`}>Received</p>
              <p className={`${display} mt-3 text-[1.8rem] font-extrabold leading-tight tracking-[-0.03em] text-[#121317]`}>
                Thank you. {side === "hiring" ? "Priya" : "Tom"} will call you before the end of the next working day.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className={`${mono} mt-6 rounded-sm text-[0.78rem] text-[#575a62] underline underline-offset-4 ${focusRing}`}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} action="#contact" className="mt-10" aria-describedby={`${id}-note`}>
              <fieldset>
                <legend className={`${mono} text-[0.7rem] uppercase tracking-[0.14em] text-[#575a62]`}>I&rsquo;m</legend>
                <div className="mt-3 inline-flex rounded-full border border-[#121317]/20 p-1">
                  {(["hiring", "looking"] as const).map((s) => (
                    <label
                      key={s}
                      className={`relative cursor-pointer rounded-full px-5 py-2.5 text-[0.9rem] font-semibold transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#b8360d] ${
                        side === s ? "bg-[#121317] text-white" : "text-[#121317] hover:bg-[#121317]/[0.05]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="side"
                        value={s}
                        checked={side === s}
                        onChange={() => setSide(s)}
                        className="sr-only"
                      />
                      {s === "hiring" ? "Hiring" : "Looking"}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                {FIELDS[side].map((f) => (
                  <div key={side + f.name}>
                    <label htmlFor={`${id}-${f.name}`} className="block text-[0.85rem] font-semibold text-[#121317]">
                      {f.label}
                    </label>
                    <input
                      id={`${id}-${f.name}`}
                      name={f.name}
                      type={f.type ?? "text"}
                      autoComplete={f.auto ?? "off"}
                      required={f.name !== "notes"}
                      placeholder={f.placeholder}
                      className="mt-2 w-full border-0 border-b border-[#121317]/30 bg-transparent px-0 py-2.5 text-[1.05rem] text-[#121317] placeholder:text-[#121317]/35 focus:border-[#ff5a3c] focus:outline-none focus-visible:outline-none! focus:ring-0"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button type="submit" className={btnPrimary}>
                  {side === "hiring" ? "Send the brief" : "Register confidentially"} <ArrowRight className="h-4 w-4" />
                </button>
                <p id={`${id}-note`} className={`${mono} text-[0.72rem] leading-relaxed text-[#575a62]`}>
                  No newsletters. No lists. One call from a named consultant.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="lg:col-span-5" aria-label="Office details">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#ddd6c8] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <Image
              src="/web-design/demo/recruiters/london.webp"
              alt="A rainy morning on a City street looking towards St Paul's Cathedral"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className={`object-cover object-[50%_40%] ${grade}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121317]/85 via-[#121317]/10 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className={`${mono} text-[0.66rem] uppercase tracking-[0.14em] text-[#ff8a70]`}>The office</p>
              <address className="mt-3 not-italic">
                <span className={`${display} block text-[1.5rem] font-bold leading-tight tracking-[-0.03em]`}>
                  14 Rivington Street
                  <br />
                  London EC2A 3DU
                </span>
                <span className="mt-5 grid grid-cols-1 gap-2 text-[0.95rem] sm:grid-cols-2">
                  <a href="tel:02079460321" className={`rounded-sm text-white hover:text-[#ff8a70] ${focusRing}`}>
                    020 7946 0321
                  </a>
                  <a href="mailto:briefs@ascendtalent.co.uk" className={`rounded-sm text-white hover:text-[#ff8a70] ${focusRing}`}>
                    briefs@ascendtalent.co.uk
                  </a>
                </span>
              </address>
              <p className={`${mono} mt-5 text-[0.68rem] text-white/60`}>Mon to Fri, 8am to 6:30pm. Three minutes from Old Street.</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
