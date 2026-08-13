"use client";

/**
 * ContactForm — name / email / company / message, styled in the main light
 * theme. Submits to /api/book-call, which forwards the lead to GoHighLevel
 * (inbound webhook, or the Contacts API) tagged `webprospect` so contact-page
 * enquiries are separable from the homepage "Book a call" wizard.
 *
 * If delivery fails we fall back to a mailto: compose so an enquiry is never
 * silently lost.
 */
import { useState, type FormEvent } from "react";

const SALES_EMAIL = "sales@integrate.co.uk";
const LEAD_TAG = "webprospect";
const SOURCE = "Website — Contact form";

type Status = "idle" | "submitting" | "sent" | "error";

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  textarea,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  textarea?: boolean;
  placeholder?: string;
}) {
  const base =
    "mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 text-ink placeholder:text-ink-3/70 transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";
  return (
    <label className="block">
      <span className="text-[0.8rem] font-medium tracking-wide text-ink-2">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          placeholder={placeholder}
          className={`${base} resize-y`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={base}
        />
      )}
    </label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [mailtoHref, setMailtoHref] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const data = new FormData(e.currentTarget);

    // Honeypot — real people leave this hidden field empty.
    if (data.get("company_url")) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Prepared up front so the error state can offer it immediately.
    const subject = `Project enquiry${name ? ` from ${name}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");
    setMailtoHref(
      `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );

    setStatus("submitting");
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          source: SOURCE,
          tags: [LEAD_TAG],
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error("delivery failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-card p-8 shadow-lift">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-tint text-accent-deep">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10.5 L8 14.5 L16 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-display-tuned text-2xl font-medium text-ink">
          Thanks — your message is with us.
        </h3>
        <p className="max-w-[42ch] leading-relaxed text-ink-2">
          We&apos;ve got your details and we&apos;ll reply within one business
          day. Prefer something faster? Message us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 text-[0.9rem] font-medium text-accent-deep underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-paper-2/40 p-6 shadow-lift md:p-8"
    >
      {/* Honeypot — visually hidden, ignored by humans, catches bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Company URL
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" placeholder="Jane Doe" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@company.com"
        />
      </div>
      <div className="mt-5">
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          placeholder="Company name (optional)"
        />
      </div>
      <div className="mt-5">
        <Field
          label="How can we help?"
          name="message"
          required
          textarea
          placeholder="Tell us a little about your project, timeline, and what you're trying to achieve."
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-[#d9b4a6] bg-[#f6e9e2] px-4 py-3 text-sm leading-relaxed text-[#8a3b23]"
        >
          Something went wrong sending your message. Please try again, or{" "}
          <a href={mailtoHref} className="font-medium underline underline-offset-4">
            email us directly
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-base font-semibold text-paper transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        {status !== "submitting" && <span aria-hidden="true">→</span>}
      </button>
      <p className="mt-4 text-[0.8rem] text-ink-3">
        We&apos;ll never share your details. Replies within one business day.
      </p>
    </form>
  );
}
