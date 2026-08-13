"use client";

/**
 * BookCallForm — the lead capture in the #book-call section.
 *
 * Deliberately short: contact details plus one tap saying what the call is
 * about. Everything else (industry, role, website, AI experience, 90-day
 * vision, timeline, budget) was dropped — those are questions for the call,
 * not the form, and each one cost conversions. Phone is required because the
 * lead gets called back, not emailed.
 *
 * Submits to /api/book-call (→ GoHighLevel). Light-themed to sit inside the
 * homepage closing section, with a honeypot for spam.
 */
import { useState, type FormEvent, type ReactNode } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  primaryFocus: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
  primaryFocus: "",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
/** Loose on format, strict on "is there actually a number here". */
const isPhone = (v: string) => (v.match(/\d/g) || []).length >= 7;

const field =
  "w-full rounded-xl border border-line bg-[#fcfbf7] px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-3 transition-colors duration-200 focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/25";
const groupLabel =
  "mb-3 flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3";

/* ---- icons (1.6 stroke, inherit currentColor) ---- */
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
      {children}
    </svg>
  );
}
const Icons = {
  user: <Svg><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></Svg>,
  mail: <Svg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Svg>,
  phone: <Svg><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 6a1 1 0 0 1 1-2Z" /></Svg>,
  building: <Svg><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h6" /></Svg>,
  bot: <Svg><rect x="5" y="8" width="14" height="10" rx="2.5" /><path d="M12 8V5M9 13h.01M15 13h.01" /></Svg>,
  layout: <Svg><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 9v11" /></Svg>,
  briefcase: <Svg><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" /></Svg>,
};

const FOCUS = [
  { value: "AI & Automation", icon: Icons.bot },
  { value: "Web Design", icon: Icons.layout },
  { value: "Consulting", icon: Icons.briefcase },
];

/* Field with a leading icon. */
function IconInput({
  icon,
  ...props
}: { icon: ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3">{icon}</span>
      <input {...props} className={`${field} pl-11`} />
    </div>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-xs text-[#8a3b23]">{children}</p>;
}

export function BookCallForm({ source = "Website — Book a call" }: { source?: string }) {
  const [data, setData] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const honeypot = useState("")[0];

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const valid =
    !!data.firstName.trim() &&
    !!data.lastName.trim() &&
    isEmail(data.email.trim()) &&
    isPhone(data.phone.trim());

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

    const payload = {
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      company: data.businessName.trim(),
      interest: data.primaryFocus,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      businessName: data.businessName.trim(),
      primaryFocus: data.primaryFocus,
      company_website: honeypot, // honeypot
      source,
    };

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="mx-auto max-w-xl rounded-2xl border border-line bg-[#fbfaf6] p-8 text-center shadow-[0_30px_80px_-50px_rgba(27,26,22,0.4)]"
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5L20 6" />
          </svg>
        </span>
        <h3 className="font-display-tuned mt-5 text-2xl font-medium text-ink">
          Thanks, {data.firstName || "there"} — that&apos;s in.
        </h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-2">
          We&apos;ll give you a call within one business day to talk through
          what you need and find a time that works.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-2xl rounded-2xl border border-line bg-[#fbfaf6] p-6 text-left shadow-[0_30px_80px_-50px_rgba(27,26,22,0.4)] sm:p-8"
    >
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <h3 className="font-display-tuned text-2xl font-medium text-ink">
        Tell us where to reach you.
      </h3>
      <p className="mt-2 leading-relaxed text-ink-2">
        Four details and we&apos;ll call you back within one business day.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <IconInput icon={Icons.user} aria-label="First name" autoComplete="given-name" placeholder="First Name" value={data.firstName} onChange={(e) => set("firstName", e.target.value)} />
          {showErrors && !data.firstName.trim() && <FieldError>Please enter your first name.</FieldError>}
        </div>
        <div>
          <IconInput icon={Icons.user} aria-label="Last name" autoComplete="family-name" placeholder="Last Name" value={data.lastName} onChange={(e) => set("lastName", e.target.value)} />
          {showErrors && !data.lastName.trim() && <FieldError>Please enter your last name.</FieldError>}
        </div>
        <div>
          <IconInput icon={Icons.mail} type="email" inputMode="email" aria-label="Email address" autoComplete="email" placeholder="Email Address" value={data.email} onChange={(e) => set("email", e.target.value)} />
          {showErrors && !isEmail(data.email.trim()) && <FieldError>Please enter a valid email.</FieldError>}
        </div>
        <div>
          <IconInput icon={Icons.phone} type="tel" inputMode="tel" aria-label="Phone number" autoComplete="tel" placeholder="Phone Number" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
          {showErrors && !isPhone(data.phone.trim()) && <FieldError>Please enter a number we can call you on.</FieldError>}
        </div>
        <div className="sm:col-span-2">
          <IconInput icon={Icons.building} aria-label="Business name" autoComplete="organization" placeholder="Business Name (optional)" value={data.businessName} onChange={(e) => set("businessName", e.target.value)} />
        </div>
      </div>

      <div className="mt-7">
        <p className={groupLabel}>
          What&apos;s it about?
          <span className="ml-auto font-mono text-[0.68rem] tracking-[0.12em] text-ink-3">Optional</span>
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {FOCUS.map((f) => {
            const selected = data.primaryFocus === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={selected}
                onClick={() => set("primaryFocus", selected ? "" : f.value)}
                className={`flex items-center justify-center gap-3 rounded-xl border px-5 py-4 text-center text-[0.95rem] font-medium transition-colors duration-200 ${
                  selected
                    ? "border-ink bg-ink/[0.05] text-ink"
                    : "border-line text-ink-2 hover:border-ink/40"
                }`}
              >
                <span className={selected ? "text-ink" : "text-ink-3"}>{f.icon}</span>
                {f.value}
              </button>
            );
          })}
        </div>
      </div>

      {status === "error" && error ? (
        <p className="mt-6 rounded-xl border border-[#d9b4a6] bg-[#f6e9e2] px-4 py-3 text-sm text-[#8a3b23]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-medium text-paper transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request a call back"}
        {status !== "submitting" && (
          <span aria-hidden="true" className="inline-block transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
            →
          </span>
        )}
      </button>
      <p className="mt-4 text-[0.8rem] text-ink-3">
        We&apos;ll never share your details.
      </p>
    </form>
  );
}
