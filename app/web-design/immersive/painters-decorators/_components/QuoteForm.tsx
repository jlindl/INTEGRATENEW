"use client";

/** The quote form. A demo: nothing is sent anywhere. */
import { useState, type CSSProperties, type FormEvent } from "react";
import { Arrow } from "./art";
import { PAINTS } from "./paints";

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [colour, setColour] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent)
    return (
      <div className="hc-form hc-form--done" role="status">
        <p className="hc-mono hc-form-kicker">This is a demo</p>
        <p className="hc-form-done-title">That is where a real enquiry would land.</p>
        <p>
          Hue &amp; Cry is a made-up business and this page is a demo by Integrate Web Design, so nothing was sent and
          no details were kept.
        </p>
      </div>
    );

  return (
    <form className="hc-form" onSubmit={onSubmit}>
      <p className="hc-mono hc-form-kicker">
        <span>Quote request</span>
        <span>No. HC 0204</span>
      </p>
      <label className="hc-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Sam Taylor" required />
      </label>
      <div className="hc-field-row">
        <label className="hc-field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900123" required />
        </label>
        <label className="hc-field">
          <span>What needs painting?</span>
          <select name="job" defaultValue="rooms">
            <option value="rooms">A room or two</option>
            <option value="house">The whole house</option>
            <option value="outside">The outside</option>
            <option value="paper">Wallpapering</option>
            <option value="wood">Woodwork or a kitchen respray</option>
          </select>
        </label>
      </div>
      <div className="hc-field">
        <span id="hc-colour-label">A colour in mind? Optional</span>
        <div className="hc-form-chips" role="group" aria-labelledby="hc-colour-label">
          {PAINTS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="hc-form-chip"
              aria-pressed={colour === p.id}
              aria-label={`${p.name}, ${p.code}`}
              title={`${p.name}, ${p.code}`}
              style={{ "--hc-c": p.hex } as CSSProperties}
              onClick={() => setColour((c) => (c === p.id ? "" : p.id))}
            />
          ))}
          <span className="hc-mono hc-form-chip-name">
            {PAINTS.find((p) => p.id === colour)?.name ?? "Not sure yet"}
          </span>
        </div>
        <input type="hidden" name="colour" value={colour} />
      </div>
      <button type="submit" className="hc-btn hc-btn--cobalt hc-btn--full hc-btn--lg">
        Get my quote
        <Arrow />
      </button>
      <p className="hc-form-small">Fixed price in writing. No charge for the visit.</p>
    </form>
  );
}
