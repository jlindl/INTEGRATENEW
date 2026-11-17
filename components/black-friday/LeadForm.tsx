"use client";

/**
 * The /black-friday booking form. Six short fields, one screen.
 *
 * Submits to /api/book-call, the same handler as the contact page and
 * /trades, so the lead lands in GoHighLevel with the rest. It is tagged
 * black-friday-299 (replacing the default booking tags) with the source
 * "BF page". Everything the visitor told us, plus any ad UTM tags, goes in the
 * message, which GHL saves as a note on the contact.
 *
 * Meta: the browser Lead event fires on success only if the visitor accepted
 * cookies (the pixel is not loaded otherwise), and the server sends its
 * matching copy under the same rule. Inputs are 16px so iOS doesn't zoom.
 */
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/gtag";
import { metaServerContext, metaSetUserData, metaTrack, newMetaEventId } from "@/lib/metaPixel";
import { LEAD_SOURCE, LEAD_TAG, PRICE_MONTHLY, isUkPhone, toE164 } from "@/lib/blackFriday";

const WEBSITE_OPTIONS = ["Yes and happy", "Yes but it needs work", "No"] as const;
type WebsiteAnswer = (typeof WEBSITE_OPTIONS)[number] | "";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type Fields = { name: string; business: string; does: string; phone: string; email: string };
type Status = "idle" | "submitting" | "success" | "error";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const label = "mb-1.5 block text-[0.84rem] font-medium text-ink-2";
const field =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-3/70 transition-colors duration-200 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

/* The success heading takes focus so screen readers announce it. The global
   :focus-visible ring is unlayered and beats outline-none, so it goes inline. */
const NO_OUTLINE = { outline: "none" } as const;

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[0.82rem] text-[#8a3b23]">
      {children}
    </p>
  );
}

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);

export function LeadForm() {
  const [f, setF] = useState<Fields>({ name: "", business: "", does: "", phone: "", email: "" });
  const [website, setWebsite] = useState<WebsiteAnswer>("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const utm = useRef<string[]>([]);
  const started = useRef(false);

  // Keep the ad's UTM tags so the lead note says which ad it came from.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    utm.current = UTM_KEYS.filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)}`);
    if (params.get("fbclid")) utm.current.push("from a Facebook or Instagram click");
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = (key: keyof Fields, value: string) => setF((prev) => ({ ...prev, [key]: value }));

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: "black_friday" });
  };

  const errors = {
    name: !f.name.trim() ? "Please enter your name." : "",
    business: !f.business.trim() ? "Please enter your business name." : "",
    does: !f.does.trim() ? "Please tell us what your business does." : "",
    phone: !isUkPhone(f.phone) ? "Please enter a UK phone number, like 07700 900123." : "",
    email: !isEmail(f.email.trim()) ? "Please enter a valid email." : "",
    website: !website ? "Please choose one." : "",
  };
  const valid = Object.values(errors).every((e) => !e);
  const err = (k: keyof typeof errors) => (showErrors && errors[k] ? errors[k] : "");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!valid) {
      setShowErrors(true);
      // Take the visitor to the first field that needs fixing.
      const first = (["name", "business", "does", "phone", "email"] as const).find((k) => errors[k]);
      if (first) document.getElementById(`bf-${first}`)?.focus();
      else document.getElementById("bf-website-0")?.focus();
      return;
    }
    setShowErrors(false);
    setStatus("submitting");
    setError(null);

    const name = f.name.trim().replace(/\s+/g, " ");
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ") || undefined;
    const phone = toE164(f.phone);
    const email = f.email.trim();
    const message = [
      `Black Friday offer: website, full SEO and 30 stories a month for £${PRICE_MONTHLY}/month`,
      `Business: ${f.business.trim()}`,
      `What the business does: ${f.does.trim()}`,
      `Has a website now: ${website}`,
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
          meta: metaServerContext(metaEventId),
          name,
          firstName,
          lastName,
          email,
          phone,
          company: f.business.trim(),
          businessName: f.business.trim(),
          industry: f.does.trim(),
          noWebsite: website === "No" ? true : undefined,
          primaryFocus: "Black Friday: website, SEO and stories",
          message,
          source: LEAD_SOURCE,
          tags: [LEAD_TAG],
          company_website: honeypotRef.current?.value ?? "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      track("generate_lead", { form: "black_friday", source: LEAD_SOURCE, has_website: website });
      // Browser copy of the Lead (only if cookies were accepted). The shared
      // event id stops Meta counting it twice with the server copy.
      metaSetUserData({ email, phone, firstName, lastName });
      metaTrack("Lead", { content_name: "Black Friday 299", content_category: f.does.trim() }, metaEventId);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-[1.4rem] border border-line bg-card p-6 shadow-float sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-carbon text-ivory">
          <Check className="h-5 w-5" />
        </span>
        <h3 ref={successRef} tabIndex={-1} style={NO_OUTLINE} className="mt-5 text-[1.7rem] font-semibold leading-tight tracking-[-0.03em] text-ink">
          You&apos;re in.
        </h3>
        <p className="mt-2 text-[1.05rem] leading-relaxed text-ink-2">We&apos;ll call you shortly to book your free website demo.</p>
      </div>
    );
  }

  const borderFor = (k: keyof typeof errors) => (err(k) ? "border-[#b4533a]" : "border-line");

  return (
    <form onSubmit={handleSubmit} noValidate onFocus={onStart} className="rounded-[1.4rem] border border-line bg-card p-5 shadow-float sm:p-7">
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
        <label>
          Company website
          <input ref={honeypotRef} type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bf-name" className={label}>Your name</label>
          <input id="bf-name" className={`${field} ${borderFor("name")}`} autoComplete="name" enterKeyHint="next" value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!err("name")} aria-describedby={err("name") ? "bf-name-err" : undefined} />
          {err("name") && <FieldError id="bf-name-err">{err("name")}</FieldError>}
        </div>
        <div>
          <label htmlFor="bf-business" className={label}>Business name</label>
          <input id="bf-business" className={`${field} ${borderFor("business")}`} autoComplete="organization" enterKeyHint="next" value={f.business} onChange={(e) => set("business", e.target.value)} aria-invalid={!!err("business")} aria-describedby={err("business") ? "bf-business-err" : undefined} />
          {err("business") && <FieldError id="bf-business-err">{err("business")}</FieldError>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bf-does" className={label}>What does your business do?</label>
          <input id="bf-does" className={`${field} ${borderFor("does")}`} placeholder="For example, a BBQ restaurant" enterKeyHint="next" value={f.does} onChange={(e) => set("does", e.target.value)} aria-invalid={!!err("does")} aria-describedby={err("does") ? "bf-does-err" : undefined} />
          {err("does") && <FieldError id="bf-does-err">{err("does")}</FieldError>}
        </div>
        <div>
          <label htmlFor="bf-phone" className={label}>Phone number</label>
          <input id="bf-phone" type="tel" inputMode="tel" className={`${field} ${borderFor("phone")}`} autoComplete="tel" enterKeyHint="next" value={f.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!err("phone")} aria-describedby={err("phone") ? "bf-phone-err" : undefined} />
          {err("phone") && <FieldError id="bf-phone-err">{err("phone")}</FieldError>}
        </div>
        <div>
          <label htmlFor="bf-email" className={label}>Email</label>
          <input id="bf-email" type="email" inputMode="email" className={`${field} ${borderFor("email")}`} autoComplete="email" enterKeyHint="next" value={f.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!err("email")} aria-describedby={err("email") ? "bf-email-err" : undefined} />
          {err("email") && <FieldError id="bf-email-err">{err("email")}</FieldError>}
        </div>
      </div>

      <fieldset className="mt-5" aria-describedby={err("website") ? "bf-website-err" : undefined}>
        <legend className={label}>Do you have a website right now?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {WEBSITE_OPTIONS.map((opt, i) => (
            <label
              key={opt}
              className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-xl border bg-white px-3.5 py-2.5 text-[0.92rem] font-medium leading-snug transition-[border-color,box-shadow] duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink/20 ${
                website === opt ? "border-ink text-ink shadow-[inset_0_0_0_1px_var(--color-ink)]" : `${err("website") ? "border-[#b4533a]" : "border-line"} text-ink-2 hover:border-ink/40`
              }`}
            >
              <input
                id={`bf-website-${i}`}
                type="radio"
                name="bf-website"
                value={opt}
                checked={website === opt}
                onChange={() => setWebsite(opt)}
                className="h-4 w-4 shrink-0 accent-[#1b1a16]"
              />
              {opt}
            </label>
          ))}
        </div>
        {err("website") && <FieldError id="bf-website-err">{err("website")}</FieldError>}
      </fieldset>

      {status === "error" && error ? (
        <p className="mt-5 rounded-xl border border-[#d9b4a6] bg-[#f6e9e2] px-4 py-3 text-sm text-[#8a3b23]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-6 inline-flex min-h-[3.4rem] w-full items-center justify-center gap-2.5 rounded-full bg-carbon px-7 py-4 text-base font-medium text-ivory shadow-[0_10px_30px_-12px_rgba(10,10,12,0.6)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#1c1c21] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {status === "submitting" ? "Sending…" : "Book a free website demo"}
        {status !== "submitting" && (
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        )}
      </button>
      <p className="mt-3 text-[0.8rem] leading-relaxed text-ink-3">
        We use your details to arrange your call and demo.{" "}
        <a href="/legal/privacy" className="underline underline-offset-2 hover:text-ink">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
