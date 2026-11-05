"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { FormState } from "@/lib/tap/actions";
import { claimPlate, findPlate, login } from "@/lib/tap/actions";
import { adminLoginAction, generatePlates } from "@/lib/tap/admin-actions";
import { Field, Notice, inputClass, primaryButton } from "./ui";

export function SubmitButton({ children, pending: pendingLabel }: { children: React.ReactNode; pending?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={primaryButton}>
      {pending ? (pendingLabel ?? "Working…") : children}
    </button>
  );
}

function StateNotice({ state }: { state: FormState }) {
  if (state.error) return <Notice tone="error">{state.error}</Notice>;
  if (state.ok) return <Notice tone="ok">{state.ok}</Notice>;
  return null;
}

/* ---------------------------------------------------------- find plate -- */

export function FindPlateForm() {
  const [state, action] = useActionState(findPlate, {});
  return (
    <form action={action} className="space-y-4">
      <Field label="Plate code" hint="The 6-character code on the card in your box.">
        <input
          name="code"
          required
          autoComplete="off"
          autoCapitalize="characters"
          placeholder="K7QM3X"
          defaultValue={state.values?.code}
          className={`${inputClass} font-mono uppercase tracking-[0.2em]`}
        />
      </Field>
      <StateNotice state={state} />
      <SubmitButton>Set up my plate</SubmitButton>
    </form>
  );
}

/* --------------------------------------------------------------- claim -- */

export function ClaimForm({
  code,
  signedInAs,
  presetSetupCode,
}: {
  code: string;
  signedInAs: string | null;
  presetSetupCode?: string;
}) {
  const [state, action] = useActionState(claimPlate, {});
  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="code" value={code} />

      <Field label="Setup code" hint="Printed on the card that came with your plate, e.g. H4TR-9WQP.">
        <input
          name="setupCode"
          required
          defaultValue={state.values?.setupCode ?? presetSetupCode}
          autoComplete="off"
          autoCapitalize="characters"
          placeholder="XXXX-XXXX"
          className={`${inputClass} font-mono uppercase tracking-[0.2em]`}
        />
      </Field>

      {signedInAs ? (
        <Field label="Name this plate" hint="So you can tell your plates apart, e.g. Front desk, Table 4.">
          <input name="label" placeholder="Front desk" maxLength={40} defaultValue={state.values?.label} className={inputClass} />
        </Field>
      ) : (
        <>
          <Field label="Business name">
            <input name="businessName" required maxLength={80} defaultValue={state.values?.businessName} autoComplete="organization" className={inputClass} />
          </Field>
          <Field
            label="Your Google review link"
            hint={
              <>
                In Google, search your business, open your Business Profile and tap{" "}
                <b className="font-medium text-ink-2">Ask for reviews</b> (or Share review form), then copy the
                link. You can add Instagram, your website and more after this.
              </>
            }
          >
            <input name="googleUrl" inputMode="url" defaultValue={state.values?.googleUrl} placeholder="https://g.page/r/…/review" className={inputClass} />
          </Field>
          <Field label="Your name">
            <input name="contactName" required maxLength={80} autoComplete="name" defaultValue={state.values?.contactName} className={inputClass} />
          </Field>
          <Field label="Email" hint="You'll use this to log in and change your plate.">
            <input name="email" type="email" required autoComplete="email" defaultValue={state.values?.email} className={inputClass} />
          </Field>
          <Field label="Phone number">
            <input name="phone" type="tel" required autoComplete="tel" placeholder="07700 900123" defaultValue={state.values?.phone} className={inputClass} />
          </Field>
          <Field label="Create a password" hint="At least 8 characters.">
            <input name="password" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
          </Field>
          <input type="hidden" name="label" value="Plate 1" />
          <label className="flex items-start gap-3 rounded-xl border border-line bg-paper-2/40 p-4 text-[0.88rem] leading-relaxed text-ink-2">
            <input type="checkbox" name="marketingConsent" defaultChecked={state.values?.marketingConsent === "on"} className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-ink)]" />
            <span>
              Yes, Integrate can email, call or text me tips and offers to help my business get more reviews and
              customers. I can opt out any time. See our{" "}
              <a href="/legal/privacy" target="_blank" className="underline">privacy policy</a>.
            </span>
          </label>
        </>
      )}

      <StateNotice state={state} />
      <SubmitButton pending="Setting up…">{signedInAs ? "Add plate to my account" : "Activate my plate"}</SubmitButton>
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
        <input name="email" type="email" required autoComplete="email" defaultValue={state.values?.email} className={inputClass} />
      </Field>
      <Field label="Password">
        <input name="password" type="password" required autoComplete="current-password" className={inputClass} />
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
        <input name="password" type="password" required autoComplete="current-password" className={inputClass} />
      </Field>
      <StateNotice state={state} />
      <SubmitButton>Log in</SubmitButton>
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
        <input name="count" type="number" min={1} max={500} defaultValue={50} required className={inputClass} />
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
