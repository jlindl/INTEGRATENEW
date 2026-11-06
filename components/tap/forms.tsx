"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import type { FormState } from "@/lib/tap/actions";
import { claimPlate, findPlate, login } from "@/lib/tap/actions";
import { adminLoginAction, generatePlates } from "@/lib/tap/admin-actions";
import { Field, Notice, SectionTitle, inputClass, primaryButton } from "./ui";

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className="animate-spin motion-reduce:hidden">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SubmitButton({ children, pending: pendingLabel }: { children: React.ReactNode; pending?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={primaryButton} aria-live="polite">
      {pending && <Spinner />}
      {pending ? (pendingLabel ?? "Working…") : children}
    </button>
  );
}

function StateNotice({ state }: { state: FormState }) {
  if (state.error) return <Notice tone="error">{state.error}</Notice>;
  if (state.ok) return <Notice tone="ok">{state.ok}</Notice>;
  return null;
}

/** Password input with a show/hide toggle; typing on a phone is error-prone. */
function PasswordInput({ name, autoComplete, minLength }: { name: string; autoComplete: string; minLength?: number }) {
  const [shown, setShown] = useState(false);
  return (
    <span className="relative block">
      <input
        name={name}
        type={shown ? "text" : "password"}
        required
        minLength={minLength}
        autoComplete={autoComplete}
        autoCapitalize="off"
        spellCheck={false}
        className={`${inputClass} pr-20`}
      />
      <button
        type="button"
        onClick={() => setShown((s) => !s)}
        aria-pressed={shown}
        className="absolute inset-y-1 right-1 rounded-lg px-3 text-[0.85rem] font-medium text-ink-2 hover:text-ink"
      >
        {shown ? "Hide" : "Show"}
      </button>
    </span>
  );
}

/* ---------------------------------------------------------- find plate -- */

export function FindPlateForm() {
  const [state, action] = useActionState(findPlate, {});
  return (
    <form action={action} className="space-y-4">
      <Field label="Plate code" hint="6 letters and numbers, for example K7QM3X. Not sure what yours is? Just tap the plate.">
        <input
          name="code"
          required
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={8}
          placeholder="K7QM3X"
          defaultValue={state.values?.code}
          className={`${inputClass} font-mono text-[1.1rem] uppercase tracking-[0.2em]`}
        />
      </Field>
      <StateNotice state={state} />
      <SubmitButton pending="Finding your plate…">Find my plate</SubmitButton>
    </form>
  );
}

/* --------------------------------------------------------------- claim -- */

export function ClaimForm({ code, signedInAs }: { code: string; signedInAs: string | null }) {
  const [state, action] = useActionState(claimPlate, {});
  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="code" value={code} />

      {signedInAs ? (
        <Field label="Name this plate" optional hint="So you can tell your plates apart, for example Front desk or Table 4.">
          <input name="label" placeholder="Front desk" maxLength={40} defaultValue={state.values?.label} className={inputClass} />
        </Field>
      ) : (
        <>
          <section className="space-y-5">
            <SectionTitle>Your business</SectionTitle>
            <Field label="Business name">
              <input name="businessName" required maxLength={80} defaultValue={state.values?.businessName} autoComplete="organization" className={inputClass} />
            </Field>
            <div>
              <Field label="Google review link" optional hint="Paste it now, or add it later from your dashboard.">
                <input
                  name="googleUrl"
                  inputMode="url"
                  autoCapitalize="off"
                  spellCheck={false}
                  defaultValue={state.values?.googleUrl}
                  placeholder="https://g.page/r/…/review"
                  className={inputClass}
                />
              </Field>
              <details className="group mt-2 rounded-xl border border-line bg-paper-2/40 text-[0.86rem] text-ink-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                  Where do I find my review link?
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="transition-transform group-open:rotate-180">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <ol className="list-decimal space-y-1.5 px-4 pb-4 pl-8 leading-relaxed">
                  <li>Search your business name on Google.</li>
                  <li>On your Business Profile, tap <b className="font-medium text-ink">Ask for reviews</b> (sometimes called Share review form).</li>
                  <li>Copy the link and paste it here.</li>
                </ol>
              </details>
            </div>
          </section>

          <section className="space-y-5">
            <SectionTitle hint="You'll use your email and password to change where your plate goes.">Your account</SectionTitle>
            <Field label="Your name">
              <input name="contactName" required maxLength={80} autoComplete="name" defaultValue={state.values?.contactName} className={inputClass} />
            </Field>
            <Field label="Email">
              <input name="email" type="email" required autoComplete="email" autoCapitalize="off" spellCheck={false} defaultValue={state.values?.email} className={inputClass} />
            </Field>
            <Field label="Phone number">
              <input name="phone" type="tel" required autoComplete="tel" placeholder="07700 900123" defaultValue={state.values?.phone} className={inputClass} />
            </Field>
            <Field label="Create a password" hint="At least 8 characters.">
              <PasswordInput name="password" autoComplete="new-password" minLength={8} />
            </Field>
            <input type="hidden" name="label" value="Plate 1" />
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-paper-2/40 p-4 text-[0.88rem] leading-relaxed text-ink-2">
              <input type="checkbox" name="marketingConsent" defaultChecked={state.values?.marketingConsent === "on"} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-ink)]" />
              <span>
                Integrate can email, call or text me tips and offers to help my business get more reviews and
                customers. I can opt out any time. See our{" "}
                <a href="/legal/privacy" target="_blank" className="underline underline-offset-2">privacy policy</a>.
              </span>
            </label>
          </section>
        </>
      )}

      <div className="space-y-3">
        <StateNotice state={state} />
        <SubmitButton pending="Activating…">{signedInAs ? "Add plate to my account" : "Activate my plate"}</SubmitButton>
      </div>
    </form>
  );
}

/* --------------------------------------------------------------- login -- */

export function LoginForm({ next }: { next?: string }) {
  const [state, action] = useActionState(login, {});
  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="next" value={next ?? ""} />
      <Field label="Email">
        <input name="email" type="email" required autoComplete="email" autoCapitalize="off" spellCheck={false} defaultValue={state.values?.email} className={inputClass} />
      </Field>
      <Field label="Password">
        <PasswordInput name="password" autoComplete="current-password" />
      </Field>
      <StateNotice state={state} />
      <SubmitButton pending="Logging in…">Log in</SubmitButton>
    </form>
  );
}

/* --------------------------------------------------------------- admin -- */

export function AdminLoginForm() {
  const [state, action] = useActionState(adminLoginAction, {});
  return (
    <form action={action} className="space-y-5">
      <Field label="Admin password">
        <PasswordInput name="password" autoComplete="current-password" />
      </Field>
      <StateNotice state={state} />
      <SubmitButton pending="Logging in…">Log in</SubmitButton>
    </form>
  );
}

export function GenerateForm() {
  const [state, action] = useActionState(generatePlates, {});
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-[1fr_8rem_auto] sm:items-end">
      <Field label="Batch name">
        <input name="batch" required placeholder="Amazon Nov 2026" maxLength={60} className={inputClass} />
      </Field>
      <Field label="How many">
        <input name="count" type="number" inputMode="numeric" min={1} max={500} defaultValue={50} required className={inputClass} />
      </Field>
      <div className="sm:w-44">
        <SubmitButton pending="Creating…">Create plates</SubmitButton>
      </div>
      {(state.error || state.ok) && (
        <div className="sm:col-span-3">
          <StateNotice state={state} />
        </div>
      )}
    </form>
  );
}
