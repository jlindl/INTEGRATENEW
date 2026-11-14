"use client";

/**
 * Tideline's interactive parts: the live readout under the tide scene, the
 * "laid" counter on the tile wall, the "behind the tiles" cutaway and the
 * survey form. Everything else on the page is static HTML styled by
 * bathroom-fitters.css.
 */
import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";

const two = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/*  Tide readout: "Tide 64% · Day 06 / 10 · Tank and tile"              */
/* ------------------------------------------------------------------ */

const TIDE_STAGES = ["Strip out", "First fix", "Tank and tile", "Second fix"];
const STAGE_START = [1, 3, 5, 8];
const STAGE_DAYS = [2, 2, 3, 3];

export function TideReadout() {
  const ref = useRef<HTMLParagraphElement>(null);
  useScrub(ref, (p) => {
    const el = ref.current;
    if (!el) return;
    const level = Math.min(1, p / 0.9);
    const s = Math.min(3, Math.floor(p * 4));
    const day = Math.min(10, STAGE_START[s] + Math.floor((p * 4 - s) * STAGE_DAYS[s]));
    const set = (key: string, text: string) => {
      const node = el.querySelector(`[data-tide="${key}"]`);
      if (node && node.textContent !== text) node.textContent = text;
    };
    set("pct", String(Math.round(level * 100)));
    set("day", two(day));
    set("stage", p >= 0.96 ? "Handed over" : TIDE_STAGES[s]);
  });
  return (
    <p ref={ref} className="tb-readout tb-mono">
      <span>
        <i className="tb-readout-mark" />
        Tide <b data-tide="pct">100</b>%
      </span>
      <span>
        Day <b data-tide="day">10</b> / 10
      </span>
      <span className="tb-readout-stage" data-tide="stage">
        Handed over
      </span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Tile wall counter                                                  */
/* ------------------------------------------------------------------ */

export function LaidCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  useScrub(ref, (p) => {
    const num = ref.current?.querySelector("b");
    if (num) num.textContent = String(Math.round(Math.min(1, p * 1.06) * 100));
  });
  return (
    <span ref={ref} className="tb-mono tb-lay-chip tb-lay-chip--count">
      Wall laid <b>100</b>%
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Behind the tiles: the five layers nobody sees                      */
/* ------------------------------------------------------------------ */

const LAYERS = [
  {
    id: "studs",
    name: "Studwork",
    short: "Studs",
    what: "The timber frame behind everything. We check every stud for rot and plumb, add noggins where the screen, basin and rails will hang, and stiffen the floor deck.",
    why: "Tile does not forgive movement. A wall that flexes will crack its grout lines inside a year.",
    spec: ["Treated timber", "Noggins at every fixing", "Deck screwed, not nailed"],
  },
  {
    id: "board",
    name: "Backer board",
    short: "Board",
    what: "Cement-based board, screwed to the studs in place of plasterboard. It does not swell, soften or feed mould when it gets damp.",
    why: "Plasterboard behind a shower is the most common reason a bathroom fails. Wet, it turns to paste.",
    spec: ["12 mm cement board", "Stainless screws", "Joints taped and filled"],
  },
  {
    id: "tank",
    name: "Tanking membrane",
    short: "Tanking",
    what: "One continuous waterproof coat across the walls and floor, with banded corners and a collar round every pipe. Two coats, then a flood test.",
    why: "Tile and grout are not waterproof. This is the layer that actually keeps the water in the room.",
    spec: ["Two full coats", "Corners banded", "Flood tested for 24 hours"],
  },
  {
    id: "adhesive",
    name: "Adhesive",
    short: "Adhesive",
    what: "Flexible cement adhesive, combed with a notched trowel so every tile beds down solid, with no hollow spots behind it.",
    why: "A hollow tile cracks under a dropped bottle and holds water behind it. A full bed stops both.",
    spec: ["Flexible, cement based", "Full bed, no dabs", "Coverage checked as we go"],
  },
  {
    id: "tile",
    name: "Tile and grout",
    short: "Tile",
    what: "The part you see. Set out from a laser line so the cuts are balanced, then grouted and sealed at every change of plane.",
    why: "By now the room is already watertight. The tile only has to look right and wear well, and it does.",
    spec: ["Set out from a laser line", "Stain-resistant grout", "Silicone at every junction"],
  },
];

export function Cutaway() {
  const [active, setActive] = useState(2);
  const layer = LAYERS[active];
  const step = (by: number) => setActive((a) => (a + by + LAYERS.length) % LAYERS.length);

  return (
    <div className="tb-cut">
      <div className="tb-cut-board">
        <p className="tb-mono tb-cut-caption">
          <span>Section A-A · wall and floor</span>
          <span>Not to scale</span>
        </p>

        {/* The model is a picture for the eye and the finger; the numbered
            keys below it are the real controls. */}
        <div className="tb-cut-scene" aria-hidden="true">
          <div className="tb-cut-rig">
            <span className="tb-cut-shadow" />
            {LAYERS.map((l, i) => (
              <div
                key={l.id}
                className={`tb-ply tb-ply--${l.id}`}
                data-on={i === active}
                data-front={i > active}
                style={{ "--i": i } as CSSProperties}
                onClick={() => setActive(i)}
              >
                <span className="tb-ply-wall">
                  <span className="tb-ply-n">{i + 1}</span>
                </span>
                <span className="tb-ply-edge" />
                <span className="tb-ply-floor" />
              </div>
            ))}
          </div>
        </div>

        <ol className="tb-cut-keys">
          {LAYERS.map((l, i) => (
            <li key={l.id}>
              <button
                type="button"
                className={`tb-cut-key tb-cut-key--${l.id}`}
                aria-pressed={i === active}
                aria-label={`Layer ${i + 1}: ${l.name}`}
                onClick={() => setActive(i)}
              >
                <b className="tb-mono">{two(i + 1)}</b>
                <i className="tb-cut-swatch" aria-hidden="true" />
                <span>{l.short}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="tb-cut-panel" aria-live="polite">
        <div key={layer.id} className="tb-cut-body">
          <p className="tb-mono tb-cut-kicker">
            Layer {two(active + 1)} of {two(LAYERS.length)} · {active === LAYERS.length - 1 ? "the part you see" : "hidden for good"}
          </p>
          <h3 className="tb-cut-title">{layer.name}</h3>
          <p className="tb-mono tb-cut-sub">What it is</p>
          <p className="tb-cut-text">{layer.what}</p>
          <p className="tb-mono tb-cut-sub">Why it matters</p>
          <p className="tb-cut-text">{layer.why}</p>
          <ul className="tb-tags">
            {layer.spec.map((s) => (
              <li key={s} className="tb-tag">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* The same build-up as a strip, room side to wall side. */}
        <div className="tb-strata" aria-hidden="true">
          <p className="tb-mono">
            <span>Room side</span>
            <span>Build-up</span>
            <span>Wall side</span>
          </p>
          <div className="tb-strata-bar">
            {[...LAYERS].reverse().map((l) => (
              <i key={l.id} className={`tb-strata-seg tb-strata-seg--${l.id}`} data-on={l.id === layer.id} />
            ))}
          </div>
        </div>
        <div className="tb-cut-foot">
          <div className="tb-cut-nav">
            <button type="button" className="tb-round" onClick={() => step(-1)} aria-label="Previous layer">
              <Arrow flip />
            </button>
            <button type="button" className="tb-round" onClick={() => step(1)} aria-label="Next layer">
              <Arrow />
            </button>
            <span className="tb-mono tb-cut-count">
              {two(active + 1)} / {two(LAYERS.length)}
            </span>
          </div>
          <a href="#survey" className="tb-btn tb-btn--brass">
            Book a survey
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Survey form (a demo: nothing is sent)                              */
/* ------------------------------------------------------------------ */

const ROOM_CHOICES = ["Wet room", "Full refit", "En-suite", "Accessible"];

export function SurveyForm() {
  const [sent, setSent] = useState(false);
  const [room, setRoom] = useState(ROOM_CHOICES[0]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent)
    return (
      <div className="tb-form tb-form--done" role="status">
        <p className="tb-mono tb-form-kicker">This is a demo</p>
        <p className="tb-form-done-title">That is where your survey would be booked.</p>
        <p>
          Tideline Bathrooms is a made-up business and this page is a demo by Integrate Web Design. Nothing was sent
          and no details were kept.
        </p>
        <button type="button" className="tb-link" onClick={() => setSent(false)}>
          Back to the form
        </button>
      </div>
    );

  return (
    <form className="tb-form" onSubmit={onSubmit}>
      <p className="tb-mono tb-form-kicker">Free survey · fixed quote in three working days</p>
      <div className="tb-field-row">
        <label className="tb-field">
          <span>Your name</span>
          <input type="text" name="name" autoComplete="name" placeholder="Alex Morgan" required />
        </label>
        <label className="tb-field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900 123" required />
        </label>
      </div>
      <fieldset className="tb-field tb-choices">
        <legend>Which room is it?</legend>
        <div className="tb-choice-row">
          {ROOM_CHOICES.map((c) => (
            <label key={c} className="tb-choice">
              <input type="radio" name="room" value={c} checked={room === c} onChange={() => setRoom(c)} />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="tb-field">
        <span>Best time for a visit</span>
        <select name="when" defaultValue="weekday-am">
          <option value="weekday-am">Weekday morning</option>
          <option value="weekday-pm">Weekday afternoon</option>
          <option value="evening">After six</option>
          <option value="saturday">Saturday morning</option>
        </select>
      </label>
      <button type="submit" className="tb-btn tb-btn--brass tb-btn--full">
        Book my survey
        <Arrow />
      </button>
      <p className="tb-form-note">Demo form. Nothing is sent anywhere.</p>
    </form>
  );
}

export function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="none"
      aria-hidden="true"
      className="tb-arrow"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
