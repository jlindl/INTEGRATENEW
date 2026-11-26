"use client";

/**
 * TradesLeadForm — the /trades landing page's own lead form, for people
 * arriving from the Meta ads.
 *
 * One screen, four fields: business name, trade, name and phone number. No
 * email and no call to book, so the ask is as small as possible: Jack gets in
 * touch after they submit. Fields carry autocomplete hints so phones and
 * browsers can fill them in. Inputs are 16px so iOS doesn't zoom on focus.
 *
 * Submits to /api/book-call (→ GoHighLevel). The answers go in `industry` and
 * `message` (a note on the contact), `interest` adds a "Trades lead
 * generation" tag alongside the default booking tags, and any UTM tags from
 * the ad link are added to the note so you can see which ad a lead came from.
 */
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/gtag";
import { metaServerContext, metaSetUserData, metaTrack, newMetaEventId } from "@/lib/metaPixel";

const SOURCE = "Meta ads: trades landing page";
const INTEREST = "Trades lead generation";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const TRADES = [
  "Builder or extensions",
  "Roofing",
  "Kitchens and bathrooms",
  "Landscaping and fencing",
  "Electrical",
  "Plumbing and heating",
  "Windows and doors",
  "Another trade",
];

/** The number Jack calls trades leads from, so they know to pick up. */
const CALL_FROM = "07710206066";

type Contact = { business: string; trade: string; name: string; phone: string };
type Status = "idle" | "submitting" | "success" | "error";

/** Loose on format, strict on "is there actually a number here". */
const isPhone = (v: string) => (v.match(/\d/g) || []).length >= 10;

/* Step headings take focus only so screen readers announce the new step. The
   global :focus-visible ring is unlayered CSS and beats Tailwind's
   outline-none, so the ring is switched off inline. */
const NO_OUTLINE = { outline: "none" } as const;

const label = "mb-1 block text-[0.82rem] font-medium text-ink-2 sm:mb-1.5";
const field =
  "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-base sm:py-3 text-ink placeholder:text-ink-3/70 transition-colors duration-200 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

function FieldError({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-[0.8rem] text-[#8a3b23]">{children}</p>;
}

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);

export function TradesLeadForm() {
  const [contact, setContact] = useState<Contact>({ business: "", trade: "", name: "", phone: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const utm = useRef<string[]>([]);
  const started = useRef(false);

  // Keep the ad's UTM tags so the lead note says which ad it came from.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    utm.current = UTM_KEYS.filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)}`);
    if (params.get("fbclid")) utm.current.push("from a Facebook or Instagram click");
  }, []);

  // After a successful send, move focus to the thank-you heading (for screen
  // readers and keyboards) and keep the card in view on phones.
  useEffect(() => {
    if (status !== "success") return;
    headingRef.current?.focus({ preventScroll: true });
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [status]);

  const set = (key: keyof Contact, value: string) => {
    if (!started.current) {
      started.current = true;
      track("form_start", { form: "trades_lead" });
    }
    setContact((c) => ({ ...c, [key]: value }));
  };

  const valid = !!contact.business.trim() && !!contact.trade && !!contact.name.trim() && isPhone(contact.phone);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!valid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStatus("submitting");
    setError(null);

    const name = contact.name.trim().replace(/\s+/g, " ");
    const [firstName, ...rest] = name.split(" ");
    const trade = contact.trade;
    const message = [
      `Business: ${contact.business.trim()}`,
      `Trade: ${trade}`,
      utm.current.length ? `Ad: ${utm.current.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const metaEventId = newMetaEventId();

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meta: metaServerContext(metaEventId, { leadWithoutCookies: true }),
          name,
          firstName,
          lastName: rest.join(" ") || undefined,
          company: contact.business.trim(),
          phone: contact.phone.trim(),
          industry: trade,
          interest: INTEREST,
          primaryFocus: "Lead generation",
          message,
          source: SOURCE,
          company_website: honeypotRef.current?.value ?? "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      track("generate_lead", { form: "trades_lead", source: SOURCE, trade });
      // Browser copy of the Lead the ads optimise for (only if cookies were accepted).
      // The server sends it either way unless cookies were rejected; the shared
      // event id stops Meta counting it twice.
      metaSetUserData({ phone: contact.phone, firstName, lastName: rest.join(" ") });
      metaTrack("Lead", { content_name: SOURCE, content_category: trade }, metaEventId);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const firstName = contact.name.trim().split(/\s+/)[0];

  return (
    <div
      ref={cardRef}
      className="scroll-mt-4 rounded-[1.4rem] border border-line bg-card p-4 shadow-[0_40px_90px_-50px_rgba(27,26,22,0.45),0_2px_6px_-2px_rgba(27,26,22,0.06)] sm:p-7"
    >
      {status === "success" ? (
        <div role="status" aria-live="polite">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper">
            <Check className="h-5 w-5" />
          </span>
          <h3 ref={headingRef} tabIndex={-1} style={NO_OUTLINE} className="font-display-tuned mt-5 text-[1.6rem] font-medium leading-tight text-ink">
            Thanks{firstName ? `, ${firstName}` : ""}. I&apos;ll be in touch.
          </h3>
          <p className="mt-3 leading-relaxed text-ink-2">
            I&apos;ll call you on <span className="font-medium text-ink">{contact.phone.trim()}</span> from{" "}
            <span className="whitespace-nowrap font-medium text-ink">{CALL_FROM}</span>, so save it if you like.
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-3">Jack, Integrate</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot: hidden from people, filled in by bots. */}
          <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
            <label>
              Company website
              <input ref={honeypotRef} type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
          </div>

          <h3 className="font-display-tuned text-[1.3rem] font-medium leading-tight text-ink sm:text-[1.45rem]">Get more jobs booked in</h3>
          <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-3">Four quick details and I&apos;ll be in touch.</p>

          <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-3.5">
            <div>
              <label htmlFor="tl-business" className={label}>Business name</label>
              <input id="tl-business" name="organization" className={field} autoComplete="organization" enterKeyHint="next" value={contact.business} onChange={(e) => set("business", e.target.value)} />
              {showErrors && !contact.business.trim() && <FieldError>Please enter your business name.</FieldError>}
            </div>
            <div>
              <label htmlFor="tl-trade" className={label}>Trade</label>
              <select
                id="tl-trade"
                name="trade"
                className={`${field} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6a64' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 ${contact.trade ? "" : "text-ink-3"}`}
                autoComplete="off"
                value={contact.trade}
                onChange={(e) => set("trade", e.target.value)}
              >
                <option value="" disabled>
                  Choose your trade
                </option>
                {TRADES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {showErrors && !contact.trade && <FieldError>Please choose your trade.</FieldError>}
            </div>
            <div>
              <label htmlFor="tl-name" className={label}>Your name</label>
              <input id="tl-name" name="name" className={field} autoComplete="name" enterKeyHint="next" value={contact.name} onChange={(e) => set("name", e.target.value)} />
              {showErrors && !contact.name.trim() && <FieldError>Please enter your name.</FieldError>}
            </div>
            <div>
              <label htmlFor="tl-phone" className={label}>Phone number</label>
              <input id="tl-phone" name="tel" type="tel" inputMode="tel" className={field} autoComplete="tel" enterKeyHint="send" value={contact.phone} onChange={(e) => set("phone", e.target.value)} />
              {showErrors && !isPhone(contact.phone) && <FieldError>Please enter a number I can call you on.</FieldError>}
            </div>

            {status === "error" && error ? (
              <p className="rounded-xl border border-[#d9b4a6] bg-[#f6e9e2] px-4 py-3 text-sm text-[#8a3b23]" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group mt-1 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-medium text-paper transition-colors duration-300 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? "Sending…" : "Send my details"}
              {status !== "submitting" && (
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              )}
            </button>
            <p className="flex flex-wrap items-center gap-x-1.5 text-[0.78rem] leading-relaxed text-ink-3">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              No obligation. Never shared.{" "}
              <a href="/legal/privacy" className="underline underline-offset-2 hover:text-ink">Privacy Policy</a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
