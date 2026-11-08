"use client";

/**
 * TradesLeadForm — the /trades landing page's own lead form, for people
 * arriving from the Meta ads.
 *
 * Three short steps: two one-tap questions (trade, typical job value), then
 * contact details. The taps get people moving before we ask for a number, and
 * the answers give the call-back some context. Inputs are 16px so iOS doesn't
 * zoom on focus.
 *
 * Submits to /api/book-call (→ GoHighLevel). The answers go in `industry` and
 * `message` (a note on the contact), `interest` adds a "Trades lead
 * generation" tag alongside the default booking tags, and any UTM tags from
 * the ad link are added to the note so you can see which ad a lead came from.
 */
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/gtag";
import { metaTrack } from "@/lib/metaPixel";

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

const JOB_VALUES = ["Under £1,000", "£1,000 to £5,000", "£5,000 to £20,000", "Over £20,000"];

const STEPS = [
  { title: "What trade are you in?", hint: "Tap one to start. It takes about 30 seconds." },
  { title: "What's a typical job worth?", hint: "Roughly. It helps us plan the ads around the work you want more of." },
  { title: "Where should we call you?", hint: "We'll ring within one business day for a free 20-minute chat." },
];

type Contact = { name: string; phone: string; email: string; area: string };
type Status = "idle" | "submitting" | "success" | "error";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
/** Loose on format, strict on "is there actually a number here". */
const isPhone = (v: string) => (v.match(/\d/g) || []).length >= 10;

/* Step headings take focus only so screen readers announce the new step. The
   global :focus-visible ring is unlayered CSS and beats Tailwind's
   outline-none, so the ring is switched off inline. */
const NO_OUTLINE = { outline: "none" } as const;

const label = "mb-1.5 block text-[0.82rem] font-medium text-ink-2";
const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-ink-3/70 transition-colors duration-200 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

function Choice({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group flex min-h-[3.25rem] w-full items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-[0.9rem] font-medium leading-snug sm:gap-3 sm:px-4 sm:text-[0.95rem] transition-[border-color,background-color,box-shadow] duration-200 ${
        selected
          ? "border-ink bg-ink/[0.04] text-ink shadow-[inset_0_0_0_1px_var(--color-ink)]"
          : "border-line bg-white text-ink-2 hover:border-ink/40 hover:text-ink"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? "border-ink" : "border-line-2 group-hover:border-ink/50"
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-ink" />}
      </span>
      {children}
    </button>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-[0.8rem] text-[#8a3b23]">{children}</p>;
}

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);

export function TradesLeadForm() {
  const [step, setStep] = useState(0);
  const [trade, setTrade] = useState("");
  const [jobValue, setJobValue] = useState("");
  const [contact, setContact] = useState<Contact>({ name: "", phone: "", email: "", area: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const utm = useRef<string[]>([]);
  const interacted = useRef(false);
  const started = useRef(false);

  // Keep the ad's UTM tags so the lead note says which ad it came from.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    utm.current = UTM_KEYS.filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)}`);
    if (params.get("fbclid")) utm.current.push("from a Facebook or Instagram click");
  }, []);

  // After the visitor moves between steps, put focus on the new step's heading
  // (for screen readers and keyboards) and keep the card in view on phones.
  useEffect(() => {
    if (!interacted.current) return;
    headingRef.current?.focus({ preventScroll: true });
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, status]);

  const go = (next: number) => {
    interacted.current = true;
    setStep(next);
    track("trades_form_step", { step: next + 1 });
  };

  const choose = (setter: (v: string) => void, value: string, next: number) => {
    setter(value);
    if (!started.current) {
      started.current = true;
      track("form_start", { form: "trades_lead" });
    }
    // A beat so the tick is seen before the step changes.
    window.setTimeout(() => go(next), 220);
  };

  const set = (key: keyof Contact, value: string) => setContact((c) => ({ ...c, [key]: value }));

  const valid = !!contact.name.trim() && isPhone(contact.phone) && isEmail(contact.email.trim());

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
    const message = [
      `Trade: ${trade || "not given"}`,
      `Typical job value: ${jobValue || "not given"}`,
      `Area covered: ${contact.area.trim() || "not given"}`,
      utm.current.length ? `Ad: ${utm.current.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          firstName,
          lastName: rest.join(" ") || undefined,
          email: contact.email.trim(),
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
      track("generate_lead", { form: "trades_lead", source: SOURCE, trade, job_value: jobValue });
      // The conversion the Meta ads optimise for (only sent if cookies were accepted).
      metaTrack("Lead", { content_name: SOURCE, content_category: trade || "not given" });
      interacted.current = true;
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
      className="scroll-mt-4 rounded-[1.4rem] border border-line bg-card p-5 shadow-[0_40px_90px_-50px_rgba(27,26,22,0.45),0_2px_6px_-2px_rgba(27,26,22,0.06)] sm:p-7"
    >
      {status === "success" ? (
        <div role="status" aria-live="polite">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper">
            <Check className="h-5 w-5" />
          </span>
          <h3 ref={headingRef} tabIndex={-1} style={NO_OUTLINE} className="font-display-tuned mt-5 text-[1.6rem] font-medium leading-tight text-ink">
            Thanks{firstName ? `, ${firstName}` : ""}. You&apos;re booked in for a call back.
          </h3>
          <p className="mt-3 leading-relaxed text-ink-2">
            We&apos;ll ring you on <span className="font-medium text-ink">{contact.phone.trim()}</span> within one business day.
          </p>
          <p className="mt-7 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-3">What happens next</p>
          <ol className="mt-3 space-y-3">
            {[
              "We call you for a free 20-minute chat.",
              "We look at your area and the jobs you want more of.",
              "If it's a good fit, we agree a plan together. Nothing is spent before that.",
            ].map((t, i) => (
              <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-2">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line font-mono text-[0.72rem] text-ink">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
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

          <div className="flex items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2f9e6b]" aria-hidden="true" />
              Free 20-minute call
            </p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-3" aria-live="polite">
              Step {step + 1} of 3
            </p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5" aria-hidden="true">
            {STEPS.map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-ink" : "bg-line"}`} />
            ))}
          </div>

          <h3 ref={headingRef} tabIndex={-1} style={NO_OUTLINE} className="font-display-tuned mt-6 text-[1.55rem] font-medium leading-tight text-ink">
            {STEPS[step].title}
          </h3>
          <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-3">{STEPS[step].hint}</p>

          {step === 0 && (
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {TRADES.map((t) => (
                <Choice key={t} selected={trade === t} onClick={() => choose(setTrade, t, 1)}>
                  {t}
                </Choice>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="mt-5 grid gap-2.5">
              {JOB_VALUES.map((v) => (
                <Choice key={v} selected={jobValue === v} onClick={() => choose(setJobValue, v, 2)}>
                  {v}
                </Choice>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="mt-5 grid gap-4">
              <div>
                <label htmlFor="tl-name" className={label}>Your name</label>
                <input id="tl-name" className={field} autoComplete="name" enterKeyHint="next" value={contact.name} onChange={(e) => set("name", e.target.value)} />
                {showErrors && !contact.name.trim() && <FieldError>Please enter your name.</FieldError>}
              </div>
              <div>
                <label htmlFor="tl-phone" className={label}>Mobile number</label>
                <input id="tl-phone" type="tel" inputMode="tel" className={field} autoComplete="tel" enterKeyHint="next" value={contact.phone} onChange={(e) => set("phone", e.target.value)} />
                {showErrors && !isPhone(contact.phone) && <FieldError>Please enter a number we can call you on.</FieldError>}
              </div>
              <div>
                <label htmlFor="tl-email" className={label}>Email</label>
                <input id="tl-email" type="email" inputMode="email" className={field} autoComplete="email" enterKeyHint="next" value={contact.email} onChange={(e) => set("email", e.target.value)} />
                {showErrors && !isEmail(contact.email.trim()) && <FieldError>Please enter a valid email.</FieldError>}
              </div>
              <div>
                <label htmlFor="tl-area" className={label}>
                  Town or postcode you cover <span className="font-normal text-ink-3">(optional)</span>
                </label>
                <input id="tl-area" className={field} autoComplete="address-level2" enterKeyHint="send" value={contact.area} onChange={(e) => set("area", e.target.value)} />
              </div>

              {status === "error" && error ? (
                <p className="rounded-xl border border-[#d9b4a6] bg-[#f6e9e2] px-4 py-3 text-sm text-[#8a3b23]" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-1 inline-flex min-h-[3.4rem] w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-medium text-paper transition-colors duration-300 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "Sending…" : "Book my free call"}
                {status !== "submitting" && (
                  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                )}
              </button>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between gap-4">
            {step > 0 ? (
              <button type="button" onClick={() => go(step - 1)} className="inline-flex min-h-10 items-center gap-1.5 text-[0.88rem] text-ink-3 transition-colors hover:text-ink">
                <span aria-hidden="true">←</span> Back
              </button>
            ) : (
              <span />
            )}
            <p className="flex items-center gap-1.5 text-[0.78rem] text-ink-3">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              No obligation. Never shared.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
