"use client";

/**
 * "How much paint?": a rough guide for the walls of one room, two coats.
 * The rule of thumb is stated on the page: one litre covers about twelve
 * square metres, per coat. Doors and windows are not taken off.
 */
import { useState, type CSSProperties } from "react";
import { Arrow } from "./art";

const COVER = 12;
const COATS = 2;

type Key = "l" | "w" | "h";
type Dim = { key: Key; label: string; min: number; max: number; step: number };

const DIMS: Dim[] = [
  { key: "l", label: "Length", min: 2, max: 7, step: 0.5 },
  { key: "w", label: "Width", min: 2, max: 6, step: 0.5 },
  { key: "h", label: "Ceiling height", min: 2.1, max: 3.6, step: 0.1 },
];

const m = (n: number) => `${n.toFixed(1)} m`;

export function PaintCalc() {
  const [dims, setDims] = useState<Record<Key, number>>({ l: 4.5, w: 3.5, h: 2.4 });
  const [ceiling, setCeiling] = useState(false);

  function bump(d: Dim, dir: 1 | -1) {
    setDims((cur) => {
      const next = Math.round((cur[d.key] + dir * d.step) * 10) / 10;
      return { ...cur, [d.key]: Math.min(d.max, Math.max(d.min, next)) };
    });
  }

  const walls = 2 * (dims.l + dims.w) * dims.h;
  const area = walls + (ceiling ? dims.l * dims.w : 0);
  const litres = (area * COATS) / COVER;
  const buy = Math.ceil(litres / 2.5) * 2.5;
  const fives = Math.floor(buy / 5);
  const small = buy % 5 === 0 ? 0 : 1;
  const tins = [fives ? `${fives} × 5 L` : "", small ? "1 × 2.5 L" : ""].filter(Boolean).join(" and ");

  return (
    <div className="hc-calc">
      {/* The room, drawn to scale as the numbers change. */}
      <div
        className="hc-plan"
        aria-hidden="true"
        style={{ "--hc-l": dims.l, "--hc-w": dims.w, "--hc-h": dims.h } as CSSProperties}
      >
        <p className="hc-mono hc-plan-title">
          <span>Plan</span>
          <span>{(dims.l * dims.w).toFixed(1)} m² floor</span>
        </p>
        <div className="hc-plan-stage">
          <div className="hc-plan-room">
            <span className="hc-mono hc-plan-dim hc-plan-dim--l">{m(dims.l)}</span>
            <span className="hc-mono hc-plan-dim hc-plan-dim--w">{m(dims.w)}</span>
            <i className="hc-plan-door" />
            <i className="hc-plan-window" />
          </div>
        </div>
        <p className="hc-mono hc-plan-title">
          <span>Long wall</span>
          <span>{walls.toFixed(1)} m² of wall in all</span>
        </p>
        <div className="hc-elev">
          <div className="hc-elev-wall">
            <span className="hc-mono hc-plan-dim hc-plan-dim--w">{m(dims.h)}</span>
            <i className="hc-elev-door" />
            <i className="hc-elev-person" />
          </div>
        </div>
      </div>

      <div className="hc-calc-panel">
        <div className="hc-steps">
          {DIMS.map((d) => (
            <div key={d.key} className="hc-step-row">
              <span className="hc-step-label">{d.label}</span>
              <div className="hc-stepper">
                <button
                  type="button"
                  aria-label={`Decrease ${d.label.toLowerCase()}`}
                  disabled={dims[d.key] <= d.min}
                  onClick={() => bump(d, -1)}
                >
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <output className="hc-stepper-value">{m(dims[d.key])}</output>
                <button
                  type="button"
                  aria-label={`Increase ${d.label.toLowerCase()}`}
                  disabled={dims[d.key] >= d.max}
                  onClick={() => bump(d, 1)}
                >
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            role="switch"
            aria-checked={ceiling}
            className="hc-switch"
            onClick={() => setCeiling((c) => !c)}
          >
            <span className="hc-switch-track" aria-hidden="true">
              <i />
            </span>
            Include the ceiling
          </button>
        </div>

        <div className="hc-result" aria-live="polite">
          <p className="hc-mono hc-result-kicker">Rough guide · two coats</p>
          <p className="hc-result-litres">
            <b>{litres.toFixed(1)}</b> litres
          </p>
          <p className="hc-result-line">
            Enough to cover {area.toFixed(1)} m² of {ceiling ? "wall and ceiling" : "wall"} twice. Buy {buy % 1 === 0 ? buy : buy.toFixed(1)} L:{" "}
            {tins}.
          </p>
          <div className="hc-tins" aria-hidden="true">
            {Array.from({ length: fives }, (_, i) => (
              <span key={`f${i}`} className="hc-tin">
                <b>5 L</b>
              </span>
            ))}
            {small ? (
              <span className="hc-tin hc-tin--small">
                <b>2.5</b>
              </span>
            ) : null}
          </div>
        </div>

        <div className="hc-calc-foot">
          <p className="hc-calc-rule">
            Rule of thumb: one litre covers about 12 square metres, per coat. Doors and windows are not taken off, which
            leaves a little spare. Bare plaster and big colour changes need more.
          </p>
          <a href="#quote" className="hc-btn hc-btn--cobalt">
            Quote this room
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}
