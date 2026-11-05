"use client";

import { useActionState, useRef, useState } from "react";
import { saveBusiness } from "@/lib/tap/actions";
import { KIND_INFO, LINK_KINDS } from "@/lib/tap/links";
import type { BusinessLink, LinkKind, PublicBusiness, TapMode } from "@/lib/tap/types";
import { SubmitButton } from "./forms";
import { LinkIcon } from "./LinkIcon";
import { Field, Notice, inputClass, secondaryButton } from "./ui";

type Draft = Pick<BusinessLink, "kind" | "label" | "url"> & { id: string };

let tmp = 0;
const tempId = () => `new${Date.now().toString(36)}${(tmp++).toString(36)}`;

/** Shrink a logo in the browser to a 256px square so it stays small enough to store. */
async function resizeLogo(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  // "contain" so wide logos aren't cropped.
  const scale = Math.min(size / bitmap.width, size / bitmap.height);
  const w = bitmap.width * scale;
  const h = bitmap.height * scale;
  ctx.drawImage(bitmap, (size - w) / 2, (size - h) / 2, w, h);
  const webp = canvas.toDataURL("image/webp", 0.86);
  return webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/png");
}

export function BusinessEditor({ business }: { business: PublicBusiness }) {
  const [state, action] = useActionState(saveBusiness, {});
  const [links, setLinks] = useState<Draft[]>(business.links);
  const [mode, setMode] = useState<TapMode>(business.mode);
  const [redirectId, setRedirectId] = useState(business.redirectLinkId ?? "");
  const [logo, setLogo] = useState<string | null>(business.logo);
  const [logoField, setLogoField] = useState("keep");
  const [logoError, setLogoError] = useState("");
  // Controlled so a failed save never resets what was typed.
  const [name, setName] = useState(business.name);
  const [tagline, setTagline] = useState(business.tagline);
  const [contactName, setContactName] = useState(business.contactName ?? "");
  const [phone, setPhone] = useState(business.phone ?? "");
  const [consent, setConsent] = useState(Boolean(business.marketingConsent));
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (id: string, patch: Partial<Draft>) =>
    setLinks((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const move = (i: number, dir: -1 | 1) =>
    setLinks((ls) => {
      const j = i + dir;
      if (j < 0 || j >= ls.length) return ls;
      const next = [...ls];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const add = (kind: LinkKind) =>
    setLinks((ls) => [...ls, { id: tempId(), kind, label: KIND_INFO[kind].label, url: "" }]);

  const filled = links.filter((l) => l.url.trim());
  const used = new Set(links.map((l) => l.kind));

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="links" value={JSON.stringify(links.map((l) => ({ ...l, id: l.id.startsWith("new") ? undefined : l.id })))} />
      <input type="hidden" name="logo" value={logoField} />
      <input type="hidden" name="mode" value={mode} />
      <input type="hidden" name="redirectLinkId" value={redirectId.startsWith("new") ? "" : redirectId} />

      {/* Where taps go */}
      <section>
        <h2 className="text-[1.05rem] font-medium text-ink">When someone taps your plate</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["redirect", "Go straight to one link", "Best for reviews: one tap and they're writing."],
              ["page", "Open my page", "Your logo with all your links, review button first."],
            ] as const
          ).map(([value, title, note]) => (
            <button
              type="button"
              key={value}
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                mode === value ? "border-ink bg-ink text-paper" : "border-line bg-card text-ink hover:border-ink-2"
              }`}
            >
              <span className="block font-medium">{title}</span>
              <span className={`mt-1 block text-[0.84rem] ${mode === value ? "text-paper/75" : "text-ink-3"}`}>{note}</span>
            </button>
          ))}
        </div>
        {mode === "redirect" && (
          <div className="mt-4">
            <Field label="Send taps to">
              <select
                value={redirectId || filled.find((l) => l.kind === "google")?.id || filled[0]?.id || ""}
                onChange={(e) => setRedirectId(e.target.value)}
                className={inputClass}
              >
                {filled.length === 0 && <option value="">Add a link below first</option>}
                {filled.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}
      </section>

      {/* Identity */}
      <section className="space-y-4">
        <h2 className="text-[1.05rem] font-medium text-ink">Your page</h2>
        <div className="flex items-center gap-4">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="h-16 w-16 rounded-2xl border border-line bg-card object-cover" />
          ) : (
            <span className="font-display-tuned flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-line-2 text-2xl text-ink-3">
              {business.name.slice(0, 1)}
            </span>
          )}
          <div className="flex flex-wrap gap-2">
            <button type="button" className={secondaryButton} onClick={() => fileRef.current?.click()}>
              {logo ? "Change logo" : "Upload logo"}
            </button>
            {logo && (
              <button type="button" className={secondaryButton} onClick={() => { setLogo(null); setLogoField(""); }}>
                Remove
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              setLogoError("");
              if (f.size > 5 * 1024 * 1024) return setLogoError("That image is over 5MB.");
              try {
                const data = await resizeLogo(f);
                setLogo(data);
                setLogoField(data);
              } catch {
                setLogoError("Couldn't read that image. Try a PNG or JPG.");
              }
            }}
          />
        </div>
        {logoError && <Notice tone="error">{logoError}</Notice>}
        <Field label="Business name">
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} className={inputClass} />
        </Field>
        <Field label="Short line under your name" hint="Optional, e.g. “Thanks for visiting! A quick review helps us loads.”">
          <input name="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={140} className={inputClass} />
        </Field>
      </section>

      {/* Links */}
      <section>
        <h2 className="text-[1.05rem] font-medium text-ink">Links</h2>
        <div className="mt-3 space-y-3">
          {links.map((l, i) => (
            <div key={l.id} className="rounded-2xl border border-line bg-paper-2/40 p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <LinkIcon kind={l.kind} size={36} />
                <input
                  value={l.label}
                  onChange={(e) => update(l.id, { label: e.target.value })}
                  maxLength={50}
                  aria-label="Button text"
                  className={`${inputClass} min-w-0 py-2`}
                />

              </div>
              <input
                value={l.url}
                onChange={(e) => update(l.id, { url: e.target.value })}
                placeholder={KIND_INFO[l.kind].placeholder}
                inputMode="url"
                aria-label={`${KIND_INFO[l.kind].label} link`}
                className={`${inputClass} mt-2 py-2.5 text-[0.92rem]`}
              />
              <div className="mt-2 flex justify-end gap-1.5">
                <button type="button" onClick={() => move(i, -1)} aria-label="Move up" disabled={i === 0} className="h-8 w-8 rounded-full border border-line bg-card text-[0.85rem] text-ink-2 disabled:opacity-30">↑</button>
                <button type="button" onClick={() => move(i, 1)} aria-label="Move down" disabled={i === links.length - 1} className="h-8 w-8 rounded-full border border-line bg-card text-[0.85rem] text-ink-2 disabled:opacity-30">↓</button>
                <button type="button" onClick={() => setLinks((ls) => ls.filter((x) => x.id !== l.id))} className="h-8 rounded-full border border-line bg-card px-3 text-[0.8rem] text-ink-2">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="mb-2 text-[0.84rem] text-ink-3">Add a link</p>
          <div className="flex flex-wrap gap-2">
            {LINK_KINDS.filter((k) => k.kind === "custom" || !used.has(k.kind)).map((k) => (
              <button key={k.kind} type="button" onClick={() => add(k.kind)} className="inline-flex items-center gap-2 rounded-full border border-line bg-card py-1.5 pl-1.5 pr-3.5 text-[0.85rem] text-ink shadow-lift hover:border-ink-2">
                <LinkIcon kind={k.kind} size={26} />
                {k.kind === "google" ? "Google review" : k.kind === "whatsapp" ? "WhatsApp" : k.kind === "tripadvisor" ? "Tripadvisor" : k.kind === "custom" ? "Other" : k.label.replace(/^(Visit our|See our|Book) /, "")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-[1.05rem] font-medium text-ink">Your details</h2>
        <p className="-mt-2 text-[0.84rem] text-ink-3">Only Integrate sees these. Login email: {business.email}</p>
        <Field label="Contact name">
          <input name="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} required maxLength={80} autoComplete="name" className={inputClass} />
        </Field>
        <Field label="Phone number">
          <input name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete="tel" className={inputClass} />
        </Field>
        <label className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-ink-2">
          <input type="checkbox" name="marketingConsent" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0" />
          <span>Integrate can email, call or text me tips and offers. Untick to opt out.</span>
        </label>
      </section>

      <div className="sticky bottom-4 z-10 space-y-3">
        {state.error && <Notice tone="error">{state.error}</Notice>}
        {state.ok && <Notice tone="ok">{state.ok}</Notice>}
        <SubmitButton pending="Saving…">Save changes</SubmitButton>
      </div>
    </form>
  );
}
