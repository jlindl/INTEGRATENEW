"use client";

/**
 * BookCallForm — the lead capture in the #book-call section, as a five-step
 * "Getting Started" wizard. Collects, in order:
 *   1. Your details      — first name, last name, work email, phone
 *   2. Your business     — business name, industry/niche, role/title, website
 *   3. What we help with — primary focus, current bottleneck
 *   4. AI experience     — experience level, 90-day vision
 *   5. Final details     — implementation timeline, estimated monthly budget
 *
 * Submits the full payload to /api/book-call (→ GoHighLevel). Light-themed to
 * sit inside the homepage closing section; each step animates, only step one is
 * required, and the flow ends on a confirmation. Keyboard-friendly with a
 * honeypot for spam.
 */
import { useState, type ReactNode, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  role: string;
  website: string;
  noWebsite: boolean;
  primaryFocus: string;
  bottleneck: string;
  aiExperience: string;
  vision: string;
  timeline: string;
  budget: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
  industry: "",
  role: "",
  website: "",
  noWebsite: false,
  primaryFocus: "",
  bottleneck: "",
  aiExperience: "",
  vision: "",
  timeline: "",
  budget: "",
};

const TOTAL_STEPS = 5;
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const field =
  "w-full rounded-xl border border-line bg-[#fcfbf7] px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-3 transition-colors duration-200 focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/25";
const groupLabel =
  "mb-3 flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3";

/* ---- icons (1.6 stroke, inherit currentColor) ---- */
const ic = "h-[18px] w-[18px]";
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ic} aria-hidden="true">
      {children}
    </svg>
  );
}
const Icons = {
  user: <Svg><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></Svg>,
  mail: <Svg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Svg>,
  phone: <Svg><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 6a1 1 0 0 1 1-2Z" /></Svg>,
  building: <Svg><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h6" /></Svg>,
  target: <Svg><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.4" /></Svg>,
  briefcase: <Svg><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" /></Svg>,
  globe: <Svg><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4a13 13 0 0 1 0 16A13 13 0 0 1 12 4Z" /></Svg>,
  bot: <Svg><rect x="5" y="8" width="14" height="10" rx="2.5" /><path d="M12 8V5M9 13h.01M15 13h.01" /></Svg>,
  layout: <Svg><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 9v11" /></Svg>,
  clock: <Svg><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 2" /></Svg>,
  dollar: <Svg><path d="M12 4v16M8.5 8a3 3 0 0 1 3-2.5h1A2.5 2.5 0 0 1 12.5 11h-1A2.5 2.5 0 0 0 11 16h1a3 3 0 0 0 3-2.5" /></Svg>,
};

const FOCUS = [
  { value: "AI & Automation", icon: Icons.bot },
  { value: "Web Design", icon: Icons.layout },
  { value: "Consulting", icon: Icons.briefcase },
];
const EXPERIENCE = ["Using it daily", "Tried it a bit", "Never used it"];
const TIMELINE = ["ASAP", "Within 30 Days", "1-3 Months", "Just Exploring"];
const BUDGET = [
  "Under $2,000 / mo",
  "$2,000 – $5,000 / mo",
  "$5,000 – $10,000 / mo",
  "$10,000+ / mo",
  "Not sure yet",
];

const NEXT_LABEL: Record<number, string> = {
  1: "Continue",
  2: "Continue",
  3: "Next step",
  4: "Almost there",
  5: "Finish and find a time",
};

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

/* Single-select card used for focus / experience / timeline. */
function OptionCard({
  selected,
  onClick,
  icon,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center justify-center gap-3 rounded-xl border px-5 py-4 text-center text-[0.95rem] font-medium transition-colors duration-200 ${
        selected
          ? "border-ink bg-ink/[0.05] text-ink"
          : "border-line text-ink-2 hover:border-ink/40"
      }`}
    >
      {icon && <span className={selected ? "text-ink" : "text-ink-3"}>{icon}</span>}
      {children}
    </button>
  );
}

export function BookCallForm({ source = "Website — Book a call" }: { source?: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const honeypot = useState("")[0];

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  // Only step one gates progress; everything after is optional.
  const step1Valid = !!data.firstName.trim() && !!data.lastName.trim() && isEmail(data.email.trim());

  async function submit() {
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);

    const name = `${data.firstName} ${data.lastName}`.trim();
    const payload = {
      // Standard fields the API/GHL already understands.
      name,
      email: data.email.trim(),
      phone: data.phone.trim(),
      company: data.businessName.trim(),
      interest: data.primaryFocus,
      message: [data.bottleneck.trim(), data.vision.trim()].filter(Boolean).join("\n\n"),
      // Granular fields — forwarded to the GHL webhook for mapping.
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      businessName: data.businessName.trim(),
      industry: data.industry.trim(),
      role: data.role.trim(),
      website: data.noWebsite ? "" : data.website.trim(),
      noWebsite: data.noWebsite,
      primaryFocus: data.primaryFocus,
      bottleneck: data.bottleneck.trim(),
      aiExperience: data.aiExperience,
      vision: data.vision.trim(),
      timeline: data.timeline,
      budget: data.budget,
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

  function goNext() {
    if (step === 1 && !step1Valid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else submit();
  }

  function goBack() {
    setShowErrors(false);
    setStep((s) => Math.max(1, s - 1));
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
          We&apos;ve got your details and we&apos;ll be in touch within one
          business day to lock in a time for your strategy call.
        </p>
      </div>
    );
  }

  const transition = { duration: reduce ? 0 : 0.4, ease: EASE };

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        goNext();
      }}
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

      {/* Progress */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full rounded-full bg-ink"
            initial={false}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={transition}
          />
        </div>
        <span className="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">
          Getting Started · Step {step}/{TOTAL_STEPS}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
          transition={transition}
        >
          {/* ---- Step 1: your details ---- */}
          {step === 1 && (
            <div>
              <h3 className="font-display-tuned text-2xl font-medium text-ink">Nice to meet you. What&apos;s your name?</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <IconInput icon={Icons.user} aria-label="First name" autoComplete="given-name" placeholder="First Name" value={data.firstName} onChange={(e) => set("firstName", e.target.value)} />
                  {showErrors && !data.firstName.trim() && <FieldError>Please enter your first name.</FieldError>}
                </div>
                <div>
                  <IconInput icon={Icons.user} aria-label="Last name" autoComplete="family-name" placeholder="Last Name" value={data.lastName} onChange={(e) => set("lastName", e.target.value)} />
                  {showErrors && !data.lastName.trim() && <FieldError>Please enter your last name.</FieldError>}
                </div>
                <div className="sm:col-span-2">
                  <IconInput icon={Icons.mail} type="email" aria-label="Work email address" autoComplete="email" placeholder="Work Email Address" value={data.email} onChange={(e) => set("email", e.target.value)} />
                  {showErrors && !isEmail(data.email.trim()) && <FieldError>Please enter a valid email.</FieldError>}
                </div>
                <div className="sm:col-span-2">
                  <IconInput icon={Icons.phone} type="tel" aria-label="Phone number" autoComplete="tel" placeholder="Phone Number" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* ---- Step 2: your business ---- */}
          {step === 2 && (
            <div>
              <h3 className="font-display-tuned text-2xl font-medium text-ink">Tell us a bit about your business.</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <IconInput icon={Icons.building} aria-label="Business name" autoComplete="organization" placeholder="Business Name" value={data.businessName} onChange={(e) => set("businessName", e.target.value)} />
                <IconInput icon={Icons.target} aria-label="Industry or niche" placeholder="Industry / Niche" value={data.industry} onChange={(e) => set("industry", e.target.value)} />
                <IconInput icon={Icons.briefcase} aria-label="Your role or title" autoComplete="organization-title" placeholder="Your Role / Title" value={data.role} onChange={(e) => set("role", e.target.value)} />
                <div>
                  <IconInput icon={Icons.globe} type="url" aria-label="Website URL" autoComplete="url" placeholder="Website URL" value={data.website} onChange={(e) => set("website", e.target.value)} disabled={data.noWebsite} />
                  <label className="mt-2.5 flex cursor-pointer items-center gap-2.5 text-sm text-ink-2">
                    <input type="checkbox" checked={data.noWebsite} onChange={(e) => set("noWebsite", e.target.checked)} className="h-4 w-4 rounded border-line text-ink accent-ink" />
                    We don&apos;t have a website yet
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ---- Step 3: what we help with ---- */}
          {step === 3 && (
            <div>
              <h3 className="font-display-tuned text-2xl font-medium text-ink">What can we help you with?</h3>
              <div className="mt-6">
                <p className={groupLabel}>Primary focus</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {FOCUS.map((f) => (
                    <OptionCard key={f.value} icon={f.icon} selected={data.primaryFocus === f.value} onClick={() => set("primaryFocus", f.value)}>
                      {f.value}
                    </OptionCard>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <p className={groupLabel}>Current bottleneck</p>
                <textarea rows={4} aria-label="Current bottleneck" placeholder="What is the biggest operational or technical bottleneck holding back your growth right now?" value={data.bottleneck} onChange={(e) => set("bottleneck", e.target.value)} className={`resize-none ${field}`} />
              </div>
            </div>
          )}

          {/* ---- Step 4: AI experience ---- */}
          {step === 4 && (
            <div>
              <h3 className="font-display-tuned text-2xl font-medium text-ink">Where are you with AI?</h3>
              <div className="mt-6">
                <p className={groupLabel}><span className="text-ink-3">{Icons.bot}</span> AI experience level</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {EXPERIENCE.map((x) => (
                    <OptionCard key={x} selected={data.aiExperience === x} onClick={() => set("aiExperience", x)}>
                      {x}
                    </OptionCard>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <p className={groupLabel}>90-day vision</p>
                <textarea rows={4} aria-label="90-day vision" placeholder="If this project worked perfectly, what would success look like in 90 days? (Time saved, revenue gained, workflows shifted)" value={data.vision} onChange={(e) => set("vision", e.target.value)} className={`resize-none ${field}`} />
              </div>
            </div>
          )}

          {/* ---- Step 5: final details ---- */}
          {step === 5 && (
            <div>
              <h3 className="font-display-tuned text-2xl font-medium text-ink">Final details.</h3>
              <div className="mt-6">
                <p className={groupLabel}><span className="text-ink-3">{Icons.clock}</span> Implementation timeline</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {TIMELINE.map((t) => (
                    <OptionCard key={t} selected={data.timeline === t} onClick={() => set("timeline", t)}>
                      {t}
                    </OptionCard>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <p className={groupLabel}>
                  <span className="text-ink-3">{Icons.dollar}</span> Estimated monthly budget
                  <span className="ml-auto font-mono text-[0.68rem] tracking-[0.12em] text-ink-3">Optional</span>
                </p>
                <select aria-label="Estimated monthly budget" value={data.budget} onChange={(e) => set("budget", e.target.value)} className={field}>
                  <option value="">Select a range</option>
                  {BUDGET.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {status === "error" && error ? (
        <p className="mt-6 rounded-xl border border-[#d9b4a6] bg-[#f6e9e2] px-4 py-3 text-sm text-[#8a3b23]" role="alert">
          {error}
        </p>
      ) : null}

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
        {step > 1 ? (
          <button type="button" onClick={goBack} className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-3 transition-colors duration-200 hover:text-ink">
            <span aria-hidden="true">←</span> Back
          </button>
        ) : (
          <span />
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-base font-medium text-paper transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : NEXT_LABEL[step]}
          {status !== "submitting" && (
            <span aria-hidden="true" className="inline-block transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
              {step === TOTAL_STEPS ? "✓" : "→"}
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-xs text-[#8a3b23]">{children}</p>;
}
