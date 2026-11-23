"use client";

/**
 * Harrow & Pike's interactive parts: the caliper readout in the signature
 * scene, the timber and finish selector, and the commission form. Everything
 * else on the page is static HTML styled by joiners.css.
 */
import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";

/* ------------------------------------------------------------------ */
/*  Caliper readout: the gap at the shoulder, closing to 000.0 mm       */
/* ------------------------------------------------------------------ */

const OPEN_MM = 184;

export function GapReadout() {
  const ref = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLElement>(null);
  const word = useRef<HTMLElement>(null);
  useScrub(ref, (p) => {
    /* Mirrors the CSS: the boards close over the first 60% of the pin. */
    const a = Math.min(1, p / 0.6);
    const gap = (1 - a) * (1 - a) * OPEN_MM;
    const state = p < 0.6 ? "Closing" : p < 0.76 ? "Seating" : "Flush";
    if (num.current) num.current.textContent = gap.toFixed(1).padStart(5, "0");
    if (word.current && word.current.textContent !== state) {
      word.current.textContent = state;
      ref.current?.setAttribute("data-state", state.toLowerCase());
    }
  });
  return (
    <div ref={ref} className="hp-caliper" data-state="flush" aria-hidden="true">
      <span className="hp-caliper-label">Gap at the shoulder</span>
      <span className="hp-caliper-lcd">
        <b ref={num}>000.0</b>
        <small>mm</small>
      </span>
      <span className="hp-caliper-state">
        <i />
        <em ref={word}>Flush</em>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timber and finish selector                                         */
/* ------------------------------------------------------------------ */

type TimberId = "oak" | "walnut" | "ash" | "tulip";
type FinishId = "oiled" | "lacquered" | "painted";
type Rating = 0 | 1 | 2;

interface Timber {
  id: TimberId;
  name: string;
  short: string;
  trait: string;
  blurb: string;
  wears: string;
  hardness: number;
  /** Staircases, fitted furniture, doors and windows, one-off furniture. */
  suits: [Rating, Rating, Rating, Rating];
  /** A straight answer for each of those four uses. */
  verdicts: [string, string, string, string];
  finishes: FinishId[];
  /** Why a finish is off the list, said plainly. */
  why?: string;
}

const USES = ["Staircases", "Fitted furniture", "Doors and windows", "One-off furniture"];
const USE_SHORT = ["A staircase", "Fitted furniture", "Doors, windows", "Furniture"];
const RATING = ["Not for this", "Good", "Ideal"];

const TIMBERS: Timber[] = [
  {
    id: "oak",
    name: "European oak",
    short: "Oak",
    trait: "Hard, golden, honest",
    blurb: "The one we reach for most. Hard, stable and full of character, with a grain you can read from across the room.",
    wears: "Takes knocks without complaint and ambers gently over the years. Marks sand out.",
    hardness: 4,
    suits: [2, 2, 2, 2],
    verdicts: [
      "Treads, strings and handrail, all in the one timber.",
      "Shelves that will not sag and doors that stay flat.",
      "It has been used for both for centuries.",
      "Tables, benches and anything that gets leaned on.",
    ],
    finishes: ["oiled", "lacquered", "painted"],
  },
  {
    id: "walnut",
    name: "Black walnut",
    short: "Walnut",
    trait: "Dark, fine, calm",
    blurb: "Chocolate brown with a fine, even grain. Best where it is seen and touched: handrails, drawer fronts, table tops.",
    wears: "A little softer than oak, so it picks up the odd dent. It lightens slightly in strong sun, which most people like.",
    hardness: 3,
    suits: [1, 2, 1, 2],
    verdicts: [
      "Handrails and newel caps, yes. It is too soft for treads.",
      "Drawer fronts, desks and open shelving.",
      "Fine for an internal door. Not for outside.",
      "This is what walnut is for.",
    ],
    finishes: ["oiled", "lacquered"],
    why: "We do not paint walnut. It would be a waste of a good board.",
  },
  {
    id: "ash",
    name: "English ash",
    short: "Ash",
    trait: "Pale, springy, bold",
    blurb: "Pale and tough with a bold, open grain. It bends well, so it is our first choice for curved handrails and chairs.",
    wears: "Shrugs off daily wear. Stays pale under lacquer and turns honey under oil. Keep it indoors.",
    hardness: 4,
    suits: [2, 1, 1, 2],
    verdicts: [
      "And the best choice there is for a curved handrail.",
      "The bold grain suits plain, modern cabinets.",
      "Indoors only. It does not like the weather.",
      "Chairs, stools and table legs.",
    ],
    finishes: ["oiled", "lacquered", "painted"],
  },
  {
    id: "tulip",
    name: "Tulipwood",
    short: "Tulipwood",
    trait: "Smooth, stable, made for paint",
    blurb: "Close-grained and very stable, so paint sits on it like glass. It is what we build painted wardrobes, alcoves and panelling from.",
    wears: "Softer than oak. A hard knock will dent it, and a dab of paint puts it right. Fine for painted strings and spindles, never for treads.",
    hardness: 2,
    suits: [1, 2, 1, 0],
    verdicts: [
      "Painted strings and spindles, yes. Never for treads.",
      "Our first choice for painted wardrobes and alcoves.",
      "Painted internal doors and panelling.",
      "Too soft for a table top. We would steer you to oak.",
    ],
    finishes: ["painted"],
    why: "Tulipwood is streaked green and purple under the surface, so we only supply it painted.",
  },
];

const FINISHES: { id: FinishId; name: string; how: string; note: string; upkeep: string }[] = [
  {
    id: "oiled",
    name: "Oiled",
    how: "Hardwax oil, rubbed in by hand",
    note: "Low sheen. It feels like wood, not plastic, and scratches blend in.",
    upkeep: "A fresh coat every two to three years",
  },
  {
    id: "lacquered",
    name: "Lacquered",
    how: "Three coats, sprayed in the workshop",
    note: "A harder, wipe-clean coat with more shine. Good for kitchens and busy halls.",
    upkeep: "Wipe clean. Refinish after ten years or so",
  },
  {
    id: "painted",
    name: "Painted",
    how: "Primed, undercoated and sprayed",
    note: "A flat, even colour, sprayed in the workshop and touched in by hand once fitted.",
    upkeep: "Touch up chips as they happen",
  },
];

const PAINTS = [
  { id: "green", name: "Workshop green", hex: "#2f4a3c" },
  { id: "bone", name: "Bone white", hex: "#e8e1d2" },
  { id: "slate", name: "Slate blue", hex: "#5b6b74" },
  { id: "soot", name: "Soot black", hex: "#2a2725" },
];

export function TimberSelector() {
  const [timberId, setTimberId] = useState<TimberId>("oak");
  const [finishId, setFinishId] = useState<FinishId>("oiled");
  const [paintId, setPaintId] = useState("green");
  const [use, setUse] = useState(0);

  const timber = TIMBERS.find((t) => t.id === timberId) ?? TIMBERS[0];
  const finish = FINISHES.find((f) => f.id === finishId) ?? FINISHES[0];
  const paint = PAINTS.find((c) => c.id === paintId) ?? PAINTS[0];
  const painted = finish.id === "painted";
  const index = TIMBERS.indexOf(timber);
  const behind = TIMBERS.filter((t) => t.id !== timber.id).slice(0, 2);
  const title = `${timber.name}, ${finish.name.toLowerCase()}`;

  function pickTimber(next: Timber) {
    setTimberId(next.id);
    /* A finish this timber does not take falls back to one it does. */
    if (!next.finishes.includes(finishId)) setFinishId(next.finishes[0]);
  }

  return (
    <div className="hp-ts">
      <div className="hp-ts-pick">
        {/* The sample board on the bench. On a phone it stays in view while the choices scroll under it. */}
        <div className="hp-ts-bench" data-reveal="left">
          <div className="hp-ts-rack" aria-hidden="true">
            {behind.map((t, i) => (
              <span key={t.id} className={`hp-ts-spare hp-ts-spare--${i + 1} hp-wood hp-wood--${t.id}`} />
            ))}
          </div>
          <div
            className="hp-sample"
            data-finish={finish.id}
            role="img"
            aria-label={`Sample board: ${title}${painted ? `, ${paint.name.toLowerCase()}` : ""}`}
          >
            {TIMBERS.map((t) => (
              <span key={t.id} className={`hp-sample-wood hp-wood hp-wood--${t.id}`} data-on={t.id === timber.id} />
            ))}
            <span
              className="hp-sample-paint"
              data-on={painted}
              data-grain={timber.id === "oak" || timber.id === "ash"}
              style={{ backgroundColor: paint.hex }}
            />
            <span className="hp-sample-sheen hp-sample-sheen--oil" />
            <span className="hp-sample-sheen hp-sample-sheen--lacquer" />
            <span key={`${timber.id}-${finish.id}-${paint.id}`} className="hp-sample-glint" />
            <span className="hp-sample-hole" />
            <span className="hp-sample-tag">
              <b>H&amp;P</b>
              {timber.short} · {finish.name}
            </span>
          </div>
          <p className="hp-ts-dim">
            <span>Sample board</span>
            <span>300 × 200 × 22 mm</span>
          </p>
          <p className="hp-ts-post">
            <span className="hp-mono">Yours to keep</span>
            We leave the sample boards you pick with your drawing, so you can live with them for a week.
          </p>
        </div>

        {/* The choices. */}
        <div className="hp-ts-controls" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
          <fieldset className="hp-ts-set">
            <legend>
              <span>01</span> Timber
            </legend>
            <div className="hp-ts-timbers">
              {TIMBERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="hp-ts-timber"
                  aria-pressed={t.id === timber.id}
                  onClick={() => pickTimber(t)}
                >
                  <span className={`hp-ts-chip hp-wood hp-wood--${t.id}`} aria-hidden="true" />
                  <span className="hp-ts-timber-name">{t.short}</span>
                  <span className="hp-ts-timber-trait">{t.trait}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="hp-ts-set">
            <legend>
              <span>02</span> Finish
            </legend>
            <div className="hp-ts-finishes">
              {FINISHES.map((f) => {
                const available = timber.finishes.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    className="hp-ts-finish"
                    aria-pressed={f.id === finish.id}
                    disabled={!available}
                    onClick={() => setFinishId(f.id)}
                  >
                    {f.name}
                  </button>
                );
              })}
            </div>
            <p className="hp-ts-how">
              <b>{finish.how}.</b>
              {timber.why ? ` ${timber.why}` : ""}
            </p>
          </fieldset>

          <fieldset className="hp-ts-set" disabled={!painted} data-off={!painted}>
            <legend>
              <span>03</span> Colour
            </legend>
            <div className="hp-ts-paints">
              {PAINTS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="hp-ts-paint"
                  aria-pressed={painted && c.id === paint.id}
                  aria-label={c.name}
                  title={c.name}
                  style={{ "--sw": c.hex } as CSSProperties}
                  onClick={() => setPaintId(c.id)}
                />
              ))}
              <span className="hp-ts-paint-name">{painted ? paint.name : "Painted finishes only"}</span>
            </div>
          </fieldset>

          <fieldset className="hp-ts-set">
            <legend>
              <span>04</span> Going into
            </legend>
            <div className="hp-ts-uses">
              {USE_SHORT.map((label, i) => (
                <button key={label} type="button" className="hp-ts-use" aria-pressed={i === use} onClick={() => setUse(i)}>
                  {label}
                </button>
              ))}
            </div>
            <p className="hp-ts-verdict" data-rating={timber.suits[use]} aria-live="polite">
              <b>{RATING[timber.suits[use]]}.</b> {timber.verdicts[use]}
            </p>
          </fieldset>
        </div>
      </div>

      {/* What that choice means in a house. */}
      <div className="hp-ts-panel" aria-live="polite">
        <p className="hp-mono hp-ts-count">
          Sample {String(index + 1).padStart(2, "0")} of {String(TIMBERS.length).padStart(2, "0")}
        </p>
        <h3 className="hp-ts-title">
          {timber.name}, <span>{painted ? `painted ${paint.name.toLowerCase()}` : finish.name.toLowerCase()}</span>
        </h3>
        <p className="hp-ts-blurb">{timber.blurb}</p>

        <p className="hp-mono hp-ts-sub">Where it suits</p>
        <ul className="hp-ts-suits">
          {USES.map((name, i) => (
            <li key={name} data-rating={timber.suits[i]} data-picked={i === use}>
              <span>{name}</span>
              <span className="hp-ts-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="hp-ts-rating">{RATING[timber.suits[i]]}</span>
            </li>
          ))}
        </ul>

        <p className="hp-mono hp-ts-sub">How it wears</p>
        <p className="hp-ts-wears">
          {timber.wears} {finish.note}
        </p>

        <dl className="hp-ts-data">
          <div>
            <dt>Hardness</dt>
            <dd>
              <span className="hp-ts-pips" role="img" aria-label={`${timber.hardness} out of 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <i key={n} data-on={n <= timber.hardness} />
                ))}
              </span>
            </dd>
          </div>
          <div>
            <dt>Upkeep</dt>
            <dd>{finish.upkeep}</dd>
          </div>
        </dl>

        <a href="#commission" className="hp-btn hp-btn--green hp-btn--full">
          Start a commission in {timber.short.toLowerCase()}
          <Arrow />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Commission form (a demo: nothing is sent)                          */
/* ------------------------------------------------------------------ */

export function CommissionForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <div className="hp-form hp-form--done" role="status">
        <p className="hp-mono hp-form-kicker">This is a demo</p>
        <p className="hp-form-done-title">That is where a real commission would begin.</p>
        <p>
          Harrow &amp; Pike is a made-up workshop and this page is a demo by Integrate Web Design, so nothing was sent
          and no details were kept.
        </p>
      </div>
    );
  return (
    <form className="hp-form" onSubmit={onSubmit}>
      <div className="hp-form-head">
        <p className="hp-mono hp-form-kicker">Commission sheet</p>
        <p className="hp-mono hp-form-no">No. 0413</p>
      </div>
      <label className="hp-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Sam Taylor" required />
      </label>
      <label className="hp-field">
        <span>Phone</span>
        <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900123" required />
      </label>
      <label className="hp-field">
        <span>What should we make?</span>
        <select name="piece" defaultValue="staircase">
          <option value="staircase">A staircase</option>
          <option value="fitted">Fitted wardrobes or alcoves</option>
          <option value="doors">Doors or windows</option>
          <option value="furniture">A piece of furniture</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <button type="submit" className="hp-btn hp-btn--green hp-btn--lg hp-btn--full">
        Start my commission
        <Arrow />
      </button>
      <p className="hp-form-note">Free measure and drawing. No obligation.</p>
    </form>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
