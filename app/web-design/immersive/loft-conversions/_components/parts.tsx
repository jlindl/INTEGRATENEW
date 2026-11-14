"use client";

/**
 * Upstairs Loft Co.'s interactive parts: the height readout in the "Go up"
 * scene, the head-height checker in the hero, the "which loft is yours?"
 * picker and the survey form. Everything else on the page is static HTML
 * styled by loft-conversions.css.
 */
import { useRef, useState, type FormEvent } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";

/** The arrow on every call to action points up and to the right. */
export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M4.2 11.8 11.6 4.4M5.4 4.2h6.4v6.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Height readout: metres above the front door as the visitor climbs   */
/* ------------------------------------------------------------------ */

const LOFT_LEVEL = 5.4;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function HeightReadout() {
  const ref = useRef<HTMLSpanElement>(null);
  useScrub(ref, (p) => {
    /* Same timings as the marker in loft-conversions.css: old stair, then new. */
    const first = clamp01(p / 0.32);
    const second = clamp01((p - 0.39) / 0.27);
    if (ref.current) ref.current.textContent = `+${(((first + second) * LOFT_LEVEL) / 2).toFixed(1)} m`;
  });
  return (
    <span ref={ref} className="ul-lift-height">
      +{LOFT_LEVEL.toFixed(1)} m
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Head-height checker                                                */
/* ------------------------------------------------------------------ */

const VERDICTS = [
  { max: 2.1, level: "tight", title: "Tight.", text: "It can still work with a dormer or a lowered ceiling below." },
  { max: 2.3, level: "close", title: "Borderline.", text: "Often workable. A survey settles it." },
  { max: 2.7, level: "good", title: "Good height.", text: "Should convert well, subject to survey." },
  { max: 9, level: "good", title: "Plenty of height.", text: "Room to stand across most of the floor." },
];

export function HeadroomCard() {
  const [height, setHeight] = useState(2.4);
  const verdict = VERDICTS.find((v) => height < v.max) ?? VERDICTS[VERDICTS.length - 1];
  /* 30 drawing units to the metre; the loft floor is at y = 104. */
  const apex = 104 - height * 30;
  const guide = 104 - 2.2 * 30;
  return (
    <aside className="ul-head-card" data-level={verdict.level} aria-label="Head-height checker">
      <svg viewBox="0 0 240 118" className="ul-head-svg" aria-hidden="true">
        {/* joists */}
        <path d="M14 104 H226" className="ul-head-floor" />
        <path d="M30 104 v8 M62 104 v8 M94 104 v8 M126 104 v8 M158 104 v8 M190 104 v8 M222 104 v8" className="ul-head-joist" />
        {/* the 2.2 m rule of thumb */}
        <path d={`M34 ${guide} H206`} className="ul-head-guide" />
        <text x="208" y={guide - 5} textAnchor="end" className="ul-head-text">
          2.2 m
        </text>
        {/* the roof, as tall as the slider says */}
        <path d={`M20 104 L120 ${apex} L220 104`} className="ul-head-roof" />
        {/* someone 1.75 m tall, for scale */}
        <g className="ul-head-person">
          <circle cx="78" cy="56" r="4.5" />
          <path d="M78 61 V84 M78 84 l-6 20 M78 84 l6 20 M69 68 h18" />
        </g>
        {/* the measurement itself */}
        <path d={`M120 104 V${apex + 3}`} className="ul-head-dim" />
        <path d={`M116 ${apex + 9} L120 ${apex + 3} L124 ${apex + 9} M116 98 L120 104 L124 98`} className="ul-head-dim" />
      </svg>
      <div className="ul-head-top">
        <p className="ul-mono">Head-height check</p>
        <output className="ul-head-read" htmlFor="ul-headroom">
          {height.toFixed(2)} m
        </output>
      </div>
      <label className="ul-head-slider" htmlFor="ul-headroom">
        <span>Joist to ridge in your loft</span>
        <input
          id="ul-headroom"
          type="range"
          min={1.8}
          max={3}
          step={0.05}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          aria-valuetext={`${height.toFixed(2)} metres`}
        />
      </label>
      <p className="ul-head-verdict" aria-live="polite">
        <b>{verdict.title}</b> {verdict.text}
      </p>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Which loft is yours?                                               */
/* ------------------------------------------------------------------ */

type LoftId = "rooflight" | "dormer" | "hip" | "mansard";

const LOFTS: {
  id: LoftId;
  name: string;
  title: string;
  tag: string;
  view: string;
  adds: string;
  suits: string;
  planning: string;
  plan: 0 | 1 | 2;
  site: string;
  space: number;
}[] = [
  {
    id: "rooflight",
    name: "Rooflight",
    title: "Rooflight conversion",
    tag: "Least building work",
    view: "Side view",
    adds: "A bedroom or study inside the roof you already have. Rooflights go into the slope and the roof line stays as it is.",
    suits: "Houses with good height at the ridge, around 2.2 m or more.",
    planning:
      "Usually no planning application is needed. Flats and conservation areas differ, so check with your council.",
    plan: 0,
    site: "Usually 4 to 6 weeks",
    space: 2,
  },
  {
    id: "dormer",
    name: "Dormer",
    title: "Dormer conversion",
    tag: "Most popular",
    view: "Side view",
    adds: "Full head height across the back of the house. Usually a double bedroom and an en-suite.",
    suits: "Most terraced and semi-detached houses.",
    planning:
      "Often no application is needed for a rear dormer within the size limits. One facing the street usually needs permission. Check with your council.",
    plan: 1,
    site: "Usually 6 to 8 weeks",
    space: 4,
  },
  {
    id: "hip",
    name: "Hip-to-gable",
    title: "Hip-to-gable conversion",
    tag: "For hipped roofs",
    view: "Front view",
    adds: "The sloping side of the roof is built up into a straight gable wall. That makes room for the stair, and it is often paired with a rear dormer.",
    suits: "Semi-detached and end-of-terrace houses with a hipped roof.",
    planning: "Often no application is needed within the size limits. Check with your council before drawings start.",
    plan: 1,
    site: "Usually 7 to 9 weeks",
    space: 4,
  },
  {
    id: "mansard",
    name: "Mansard",
    title: "Mansard conversion",
    tag: "Most space",
    view: "Side view",
    adds: "The roof is rebuilt with near-upright sides and a flat top, at the back or on both sides. Close to a full extra storey.",
    suits: "Terraced houses where every bit of space counts.",
    planning: "Usually needs planning permission. We prepare and submit the application for you.",
    plan: 2,
    site: "Usually 8 to 12 weeks",
    space: 5,
  },
];

const PLAN_LABEL = ["Usually no application", "Often no application", "Usually needs an application"];

/** Small roof silhouettes for the picker buttons. */
function RoofIcon({ id }: { id: LoftId }) {
  return (
    <svg viewBox="0 0 40 30" width="40" height="30" className="ul-tab-icon" aria-hidden="true">
      <path d="M7 16 V27 H33 V16" className="ul-ico-wall" />
      {id === "rooflight" && (
        <>
          <path d="M4 17 L20 4 L36 17" className="ul-ico-roof" />
          <path d="M24 9.5 L29 13.5" className="ul-ico-new" />
        </>
      )}
      {id === "dormer" && (
        <>
          <path d="M4 17 L20 4 L36 17" className="ul-ico-roof" />
          <path d="M23 6.5 H32 V13.5" className="ul-ico-new" />
        </>
      )}
      {id === "hip" && (
        <>
          <path d="M4 17 H36 M4 4 H22 L36 17" className="ul-ico-roof" />
          <path d="M22 4 H33 V17" className="ul-ico-new" />
        </>
      )}
      {id === "mansard" && (
        <>
          <path d="M4 17 H36" className="ul-ico-roof" />
          <path d="M7 17 L10 5 H30 L33 17" className="ul-ico-new" />
        </>
      )}
    </svg>
  );
}

/** The large drawing: the house as it is (dashed roof) and what is built (amber). */
function RoofDrawing({ id }: { id: LoftId }) {
  const front = id === "hip";
  /* How far across the floor a person can stand upright. */
  const stand: Record<LoftId, [number, number]> = {
    rooflight: [139, 261],
    dormer: [139, 298],
    hip: [96, 304],
    mansard: [108, 292],
  };
  const [sx, ex] = stand[id];
  return (
    <svg viewBox="0 0 400 262" className="ul-draw-svg" aria-hidden="true">
      {/* ground */}
      <path d="M16 236 H384" className="ul-d-ground" />
      {front && (
        <>
          {/* the neighbour's half of the pair */}
          <path d="M16 130 H96 M16 44 H96" className="ul-d-faint" />
          <rect x="34" y="150" width="34" height="26" className="ul-d-faint" />
          <rect x="34" y="196" width="34" height="26" className="ul-d-faint" />
        </>
      )}
      {/* the house */}
      <rect x="96" y="130" width="208" height="106" className="ul-d-wall" />
      {front ? (
        <>
          <rect x="120" y="150" width="38" height="28" className="ul-d-win" />
          <rect x="240" y="150" width="38" height="28" className="ul-d-win" />
          <rect x="120" y="196" width="38" height="28" className="ul-d-win" />
          <rect x="236" y="190" width="28" height="46" className="ul-d-win" />
          <path d="M96 44 V130" className="ul-d-faint" />
        </>
      ) : (
        <>
          <path d="M96 183 H304" className="ul-d-faint" />
          <path d="M96 150 V172 M96 198 V222 M304 150 V172 M304 196 V236" className="ul-d-glass" />
        </>
      )}

      {/* standing room under the new roof */}
      <g key={`${id}-stand`} className="ul-d-stand">
        <rect x={sx} y="88.5" width={ex - sx} height="41.5" />
      </g>
      <g className="ul-d-person">
        <circle cx="200" cy="97" r="3.6" />
        <path d="M200 101 V116 M200 116 l-4.5 14 M200 116 l4.5 14 M193 106 h14" />
      </g>

      {/* the roof you have now */}
      {front ? (
        <>
          <path d="M82 130 H318 M96 44 H214" className="ul-d-roof" />
          <path d="M214 44 L318 130" className={id === "hip" ? "ul-d-roof ul-d-roof--old" : "ul-d-roof"} />
        </>
      ) : (
        <>
          <path d="M82 130 H318" className="ul-d-roof" />
          <path
            d="M82 130 L200 44"
            className={id === "mansard" ? "ul-d-roof ul-d-roof--old" : "ul-d-roof"}
          />
          <path
            d="M200 44 L318 130"
            className={id === "rooflight" ? "ul-d-roof" : "ul-d-roof ul-d-roof--old"}
          />
        </>
      )}

      {/* what is built */}
      <g key={id} className="ul-d-new">
        {id === "rooflight" && (
          <>
            <path d="M229.5 65.5 L259 87" pathLength={1} className="ul-d-pane" />
            <path d="M164.6 69.8 L138.6 88.7" pathLength={1} className="ul-d-pane" />
          </>
        )}
        {id === "dormer" && (
          <>
            <polygon points="222,60 298,60 298,115.4" className="ul-d-fill" />
            <path d="M222 60 H298 V115.4" pathLength={1} className="ul-d-line" />
            <path d="M298 72 V104" pathLength={1} className="ul-d-pane" />
            <path d="M298 115.4 L318 130" className="ul-d-roof" />
          </>
        )}
        {id === "hip" && (
          <>
            <polygon points="214,44 304,44 304,130 318,130" className="ul-d-fill" />
            <path d="M214 44 H304 V130" pathLength={1} className="ul-d-line" />
          </>
        )}
        {id === "mansard" && (
          <>
            <polygon points="200,44 118,50 96,130 82,130" className="ul-d-fill" />
            <polygon points="200,44 282,50 304,130 318,130" className="ul-d-fill" />
            <path d="M96 130 L118 50 H282 L304 130" pathLength={1} className="ul-d-line" />
            <path d="M103 104 L110 78 M297 104 L290 78" pathLength={1} className="ul-d-pane" />
          </>
        )}
      </g>

      <text x="96" y="254" className="ul-d-text">
        {front ? "Party wall" : "Front"}
      </text>
      <text x="304" y="254" textAnchor="end" className="ul-d-text">
        {front ? "Side" : "Back"}
      </text>
    </svg>
  );
}

export function LoftPicker() {
  const [active, setActive] = useState<LoftId>("dormer");
  const index = Math.max(
    0,
    LOFTS.findIndex((l) => l.id === active),
  );
  const loft = LOFTS[index];
  return (
    <div className="ul-picker">
      <div className="ul-tabs" role="group" aria-label="Type of loft conversion">
        {LOFTS.map((l) => (
          <button
            key={l.id}
            type="button"
            className="ul-tab"
            aria-pressed={l.id === active}
            onClick={() => setActive(l.id)}
          >
            <RoofIcon id={l.id} />
            <span className="ul-tab-name">{l.name}</span>
            <span className="ul-mono ul-tab-tag">{l.tag}</span>
          </button>
        ))}
      </div>

      <div className="ul-picker-main">
        <div className="ul-draw">
          <div className="ul-draw-head">
            <span className="ul-mono">{loft.view}</span>
            <span className="ul-mono ul-draw-n">
              0{index + 1} / 0{LOFTS.length}
            </span>
          </div>
          <RoofDrawing id={loft.id} />
          <div className="ul-draw-foot">
            <ul className="ul-legend">
              <li>
                <i className="ul-legend-old" /> Roof you have now
              </li>
              <li>
                <i className="ul-legend-new" /> What we build
              </li>
              <li>
                <i className="ul-legend-stand" /> Standing room
              </li>
            </ul>
            <p className="ul-space">
              <span className="ul-mono">Full-height floor space</span>
              <span className="ul-pips" role="img" aria-label={`${loft.space} out of 5, compared with the other types`}>
                {[1, 2, 3, 4, 5].map((pip) => (
                  <i key={pip} data-on={pip <= loft.space} />
                ))}
              </span>
            </p>
          </div>
        </div>

        <div className="ul-info" aria-live="polite">
          <p className="ul-mono ul-info-kicker">{loft.tag}</p>
          <h3 className="ul-info-title">{loft.title}</h3>
          <dl className="ul-info-rows">
            <div>
              <dt className="ul-mono">What it adds</dt>
              <dd>{loft.adds}</dd>
            </div>
            <div>
              <dt className="ul-mono">Suits</dt>
              <dd>{loft.suits}</dd>
            </div>
            <div>
              <dt className="ul-mono">Planning</dt>
              <dd>
                <span className="ul-plan" data-level={loft.plan}>
                  <span className="ul-plan-bars" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <b>{PLAN_LABEL[loft.plan]}</b>
                </span>
                {loft.planning}
              </dd>
            </div>
            <div>
              <dt className="ul-mono">On site</dt>
              <dd>{loft.site}, once drawings and approvals are done.</dd>
            </div>
          </dl>
          <div className="ul-info-foot">
            <a href="#survey" className="ul-btn ul-btn--night">
              Check my loft
              <Arrow />
            </a>
            <p className="ul-info-note">Rules vary by council and by house. We check yours before anything is drawn.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Survey form (a demo: nothing is sent)                              */
/* ------------------------------------------------------------------ */

const WANTS = ["Bedroom", "Bedroom and en-suite", "Home office", "Not sure yet"];

export function SurveyForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <div className="ul-form ul-form--done" role="status">
        <p className="ul-mono ul-form-kicker">This is a demo</p>
        <p className="ul-form-done-title">That is where a real booking would land.</p>
        <p>
          Upstairs Loft Co. is a fictional business and this page is a demo by Integrate Web Design, so nothing was sent
          and no details were kept.
        </p>
      </div>
    );
  return (
    <form className="ul-form" onSubmit={onSubmit}>
      <p className="ul-mono ul-form-kicker">Free loft survey · about an hour</p>
      <label className="ul-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Alex Morgan" required />
      </label>
      <div className="ul-field-row">
        <label className="ul-field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900123" required />
        </label>
        <label className="ul-field">
          <span>Your house</span>
          <select name="house" defaultValue="terraced">
            <option value="terraced">Terraced</option>
            <option value="semi">Semi-detached</option>
            <option value="detached">Detached</option>
            <option value="bungalow">Bungalow</option>
            <option value="unsure">Not sure</option>
          </select>
        </label>
      </div>
      <fieldset className="ul-want">
        <legend>What do you want up there?</legend>
        <div className="ul-want-row">
          {WANTS.map((w, i) => (
            <label key={w} className="ul-want-pill">
              <input type="radio" name="want" value={w} defaultChecked={i === 1} />
              <span>{w}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="ul-btn ul-btn--night ul-btn--lg ul-btn--full">
        Book my loft survey
        <Arrow />
      </button>
    </form>
  );
}
