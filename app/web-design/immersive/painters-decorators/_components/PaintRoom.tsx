"use client";

/**
 * "Try it on the wall": the room in the signature scene.
 *
 * Scroll rolls three colours on in turn (the coats read --p from the pinned
 * section, in CSS). Tapping a paint chip rolls that colour on directly; the
 * pick holds until the visitor scrolls on, then the scroll takes over again.
 */
import { useRef, useState, type CSSProperties } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";
import { Arrow, RollerH, rolledEdge } from "./art";
import { COATS, PAINTS } from "./paints";

type Pick = { id: string; n: number; under: string | null; off: boolean };

const EDGES = [rolledEdge(21), rolledEdge(34), rolledEdge(55)];
const PICK_EDGE = rolledEdge(89);
const LAST = COATS.length - 1;

const vars = (v: Record<string, string | number>) => v as CSSProperties;
const paintOf = (id: string | null | undefined) => PAINTS.find((p) => p.id === id);

export function PaintRoom() {
  const root = useRef<HTMLDivElement>(null);
  /* Finished by default: with no scroll engine the last coat is on the wall. */
  const [step, setStep] = useState(LAST);
  const [pick, setPick] = useState<Pick | null>(null);
  const live = useRef({ step: LAST, p: 1, pickAt: -1 });

  useScrub(root, (p) => {
    const s = live.current;
    s.p = p;
    /* State only changes when the coat does: three times in the whole scene. */
    const next = Math.min(LAST, Math.floor(p * COATS.length));
    if (next !== s.step) {
      s.step = next;
      setStep(next);
    }
    if (s.pickAt >= 0 && Math.abs(p - s.pickAt) > 0.05) {
      s.pickAt = -1;
      setPick((cur) => (cur ? { ...cur, off: true } : cur));
    }
  });

  const picked = pick && !pick.off ? paintOf(pick.id) : undefined;
  const current = picked ?? COATS[step];
  const under = pick && !pick.off ? paintOf(pick.under) : undefined;

  function choose(id: string) {
    live.current.pickAt = live.current.p;
    setPick((cur) => ({ id, n: (cur?.n ?? 0) + 1, under: cur && !cur.off ? cur.id : null, off: false }));
  }

  return (
    <div
      ref={root}
      className="hc-roomwrap"
      data-picked={picked ? "" : undefined}
      style={vars({ "--hc-now": current.hex, "--hc-now-on": current.on })}
    >
      <div className="hc-room-top" aria-hidden="true">
        <span className="hc-mono">Sitting room · 4.2 × 3.6 m · north light</span>
        <span className="hc-pips">
          {COATS.map((c, i) => (
            <i key={c.id} style={vars({ "--i": i, "--hc-c": c.hex })} />
          ))}
        </span>
      </div>

      <div className="hc-room" aria-hidden="true">
        <div className="hc-wall">
          <div className="hc-wall-old" />
          {COATS.map((c, i) => (
            <div key={c.id} className="hc-coat hc-coat--scroll" style={vars({ "--i": i, "--hc-c": c.hex })}>
              <div className="hc-coat-fill" style={{ clipPath: EDGES[i] }} />
            </div>
          ))}
          {under && <div className="hc-coat hc-coat--under" style={vars({ "--hc-c": under.hex })} />}
          {pick && (
            <div
              key={pick.n}
              className="hc-coat hc-coat--pick"
              data-off={pick.off || undefined}
              style={vars({ "--hc-c": paintOf(pick.id)?.hex ?? "transparent" })}
            >
              <div className="hc-coat-fill" style={{ clipPath: PICK_EDGE }} />
            </div>
          )}
        </div>

        <RoomArt />

        <div className="hc-rollers">
          {COATS.map((c, i) => (
            <div key={c.id} className="hc-rollwrap hc-rollwrap--scroll" style={vars({ "--i": i, "--hc-c": c.hex })}>
              <RollerH className="hc-roller" />
            </div>
          ))}
          {pick && !pick.off && (
            <div
              key={pick.n}
              className="hc-rollwrap hc-rollwrap--pick"
              style={vars({ "--hc-c": paintOf(pick.id)?.hex ?? "transparent" })}
            >
              <RollerH className="hc-roller" />
            </div>
          )}
        </div>

      </div>

      <div className="hc-chipcard" aria-live="polite">
        <div className="hc-chipcard-swatch">
          <span className="hc-mono">{current.code}</span>
          <span className="hc-mono hc-chipcard-coat">{picked ? "Your pick" : `Coat ${step + 1} of ${COATS.length}`}</span>
        </div>
        <div className="hc-chipcard-body">
          <p className="hc-chipcard-name">{current.name}</p>
          <p className="hc-chipcard-note">{current.note}</p>
          <p className="hc-chipcard-foot">
            <span className="hc-mono">{current.finish}</span>
            <a href="#quote" className="hc-link">
              Quote this colour
              <Arrow />
            </a>
          </p>
        </div>
      </div>

      <div className="hc-picker">
        <p className="hc-mono hc-picker-label">Or tap a chip to try your own</p>
        <div className="hc-chips" role="group" aria-label="Paint colours to try on the wall">
          {PAINTS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="hc-chip"
              aria-pressed={current.id === p.id}
              aria-label={`${p.name}, ${p.code}`}
              title={`${p.name}, ${p.code}`}
              style={vars({ "--hc-c": p.hex })}
              onClick={() => choose(p.id)}
            >
              <i aria-hidden="true" />
              <span aria-hidden="true">{p.code.replace("HC ", "")}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* The room itself: everything that is not paint. Drawn once and left alone. */
function RoomArt() {
  return (
    <svg className="hc-room-art" viewBox="0 0 800 560" focusable="false">
      <defs>
        <linearGradient id="hc-day" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="hc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bcd9ea" />
          <stop offset="1" stopColor="#eef5ee" />
        </linearGradient>
        <clipPath id="hc-glass">
          <rect x="70" y="118" width="160" height="224" />
        </clipPath>
      </defs>

      {/* ceiling line, frieze and daylight across the wall */}
      <rect x="0" y="0" width="800" height="64" fill="#f4eee3" />
      <rect x="0" y="0" width="800" height="15" fill="#e5ded0" />
      <rect x="0" y="15" width="800" height="3" fill="#000" fillOpacity="0.07" />
      <rect x="0" y="74" width="800" height="324" fill="url(#hc-day)" />

      {/* picture rail */}
      <rect x="0" y="62" width="800" height="12" fill="#fcf9f2" />
      <rect x="0" y="62" width="800" height="2" fill="#000" fillOpacity="0.07" />
      <rect x="0" y="74" width="800" height="5" fill="#000" fillOpacity="0.13" />

      {/* sash window */}
      <rect x="56" y="104" width="188" height="252" rx="3" fill="#fcf9f2" stroke="#1d1b1a" strokeOpacity="0.2" strokeWidth="2" />
      <rect x="70" y="118" width="160" height="224" fill="url(#hc-sky)" />
      <g clipPath="url(#hc-glass)">
        <circle cx="92" cy="338" r="48" fill="#86ad84" />
        <circle cx="158" cy="352" r="56" fill="#5f8f6c" />
        <circle cx="224" cy="332" r="42" fill="#7fa77f" />
        <path d="M70 118 L150 118 L96 342 L70 342 Z" fill="#fff" fillOpacity="0.22" />
      </g>
      <rect x="70" y="224" width="160" height="12" fill="#fcf9f2" />
      <rect x="70" y="236" width="160" height="3" fill="#000" fillOpacity="0.1" />
      <rect x="147" y="118" width="6" height="224" fill="#fcf9f2" />
      <rect x="70" y="118" width="160" height="224" fill="none" stroke="#1d1b1a" strokeOpacity="0.16" strokeWidth="1.5" />
      <rect x="46" y="354" width="208" height="12" rx="2" fill="#fcf9f2" stroke="#1d1b1a" strokeOpacity="0.16" strokeWidth="1.5" />
      <rect x="52" y="366" width="196" height="5" fill="#000" fillOpacity="0.13" />

      {/* framed print */}
      <rect x="416" y="150" width="86" height="106" fill="#fcf9f2" stroke="#1d1b1a" strokeWidth="4" />
      <rect x="420" y="258" width="82" height="4" fill="#000" fillOpacity="0.14" />
      <circle cx="446" cy="192" r="15" fill="#2c4bd8" />
      <path d="M432 236 Q459 196 486 236 Z" fill="#e2a33b" />
      <rect x="466" y="170" width="20" height="20" fill="#e9c9b8" />

      {/* skirting and floor */}
      <rect x="0" y="398" width="800" height="34" fill="#fcf9f2" />
      <rect x="0" y="398" width="800" height="3" fill="#000" fillOpacity="0.08" />
      <rect x="0" y="408" width="800" height="1.5" fill="#000" fillOpacity="0.12" />
      <rect x="0" y="432" width="800" height="128" fill="#c79f72" />
      <rect x="0" y="432" width="800" height="7" fill="#000" fillOpacity="0.16" />
      <path d="M0 458 H800 M0 488 H800 M0 524 H800" stroke="#1d1b1a" strokeOpacity="0.16" strokeWidth="1.5" />
      <path
        d="M120 439 V458 M410 439 V458 M690 439 V458 M250 458 V488 M560 458 V488 M90 488 V524 M380 488 V524 M650 488 V524 M210 524 V560 M520 524 V560"
        stroke="#1d1b1a"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      <path d="M40 432 L262 432 L420 560 L70 560 Z" fill="#fff" fillOpacity="0.14" />

      {/* floor lamp */}
      <rect x="290" y="242" width="4" height="226" fill="#1d1b1a" />
      <ellipse cx="292" cy="469" rx="22" ry="5" fill="#1d1b1a" />
      <path d="M266 244 L318 244 L308 196 L276 196 Z" fill="#f8efdc" stroke="#1d1b1a" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* sofa */}
      <ellipse cx="457" cy="474" rx="152" ry="8" fill="#000" fillOpacity="0.2" />
      <rect x="338" y="456" width="8" height="18" fill="#1d1b1a" />
      <rect x="568" y="456" width="8" height="18" fill="#1d1b1a" />
      <rect x="336" y="318" width="242" height="118" rx="20" fill="#d8cebd" />
      <rect x="362" y="336" width="95" height="74" rx="13" fill="#e1d8c9" />
      <rect x="459" y="336" width="95" height="74" rx="13" fill="#e1d8c9" />
      <rect x="322" y="356" width="42" height="106" rx="17" fill="#cbbfac" />
      <rect x="550" y="356" width="42" height="106" rx="17" fill="#cbbfac" />
      <rect x="360" y="404" width="194" height="40" rx="10" fill="#e8e0d2" />
      <path d="M457 406 V442" stroke="#1d1b1a" strokeOpacity="0.14" strokeWidth="1.5" />
      <rect x="332" y="438" width="250" height="24" rx="8" fill="#c2b5a1" />
      <rect x="372" y="362" width="52" height="46" rx="9" fill="#2c4bd8" transform="rotate(-8 398 385)" />
      <rect x="498" y="366" width="46" height="42" rx="9" fill="#f7f2ea" transform="rotate(7 521 387)" />
      <path d="M506 372 L538 402 M514 368 L544 396" stroke="#1f4a3d" strokeWidth="3" transform="rotate(7 521 387)" />

      {/* dust sheet, tray, parked roller and tin: all in the colour on the wall */}
      <path d="M560 560 L598 472 L656 458 L800 452 L800 560 Z" fill="#f1eadc" />
      <path d="M640 462 L612 560 M720 456 L744 560" stroke="#1d1b1a" strokeOpacity="0.09" strokeWidth="2" />
      <rect x="606" y="490" width="118" height="40" rx="6" fill="#2a2623" />
      <rect x="613" y="496" width="56" height="28" rx="3" className="hc-now-fill" />
      <path d="M680 498 V522 M690 498 V522 M700 498 V522 M710 498 V522" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" />
      <path d="M716 486 L742 474" stroke="#bfc3c8" strokeWidth="5" strokeLinecap="round" />
      <path d="M742 474 L770 462" stroke="#1d1b1a" strokeWidth="11" strokeLinecap="round" />
      <rect x="648" y="474" width="74" height="24" rx="12" className="hc-now-fill" />
      <rect x="648" y="486" width="74" height="12" rx="6" fill="#000" fillOpacity="0.16" />
      <rect x="742" y="508" width="50" height="44" fill="#c5c8cc" />
      <rect x="748" y="512" width="6" height="36" fill="#fff" fillOpacity="0.5" />
      <ellipse cx="767" cy="552" rx="25" ry="5" fill="#c5c8cc" />
      <ellipse cx="767" cy="508" rx="25" ry="6" className="hc-now-fill" stroke="#8f949a" strokeWidth="2" />
      <path d="M752 511 q0 16 4 16 q4 0 3 -16 Z" className="hc-now-fill" />
    </svg>
  );
}
