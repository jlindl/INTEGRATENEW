"use client";

/**
 * Clearline's interactive parts: the survey slot card in the hero, the
 * opening readout in the signature scene, the window and door style picker,
 * the old/new comfort diagrams and the survey form. Everything else on the
 * page is static HTML styled by window-door-installers.css.
 */
import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero: the survey slot card                                         */
/* ------------------------------------------------------------------ */

const SLOTS = [
  { id: "tue", day: "Tue", time: "08:30" },
  { id: "thu", day: "Thu", time: "13:00" },
  { id: "sat", day: "Sat", time: "10:00" },
];

export function SurveyCard() {
  const [picked, setPicked] = useState("thu");
  const slot = SLOTS.find((s) => s.id === picked) ?? SLOTS[0];
  return (
    <aside className="cw-book" aria-label="Free survey slots">
      <div className="cw-book-head">
        <p className="cw-mono">Free survey · this week</p>
        <span className="cw-book-live">
          <i aria-hidden="true" />3 slots left
        </span>
      </div>
      <div className="cw-book-slots" role="group" aria-label="Choose a survey slot">
        {SLOTS.map((s) => (
          <button
            key={s.id}
            type="button"
            className="cw-slot"
            aria-pressed={s.id === picked}
            onClick={() => setPicked(s.id)}
          >
            <span className="cw-mono">{s.day}</span>
            <b>{s.time}</b>
          </button>
        ))}
      </div>
      <dl className="cw-book-rows">
        <div>
          <dt>Surveyor</dt>
          <dd>Measures every opening</dd>
        </div>
        <div>
          <dt>Takes</dt>
          <dd>About 45 minutes</dd>
        </div>
        <div>
          <dt>You get</dt>
          <dd>One fixed, written price</dd>
        </div>
      </dl>
      <a href="#survey" className="cw-btn cw-btn--anth cw-btn--full">
        Hold {slot.day} {slot.time}
        <Arrow />
      </a>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Signature scene: the clear opening, in metres, as the doors fold   */
/* ------------------------------------------------------------------ */

const FOLD_DEG = 84;
const LEAF_M = 0.9;

export function OpeningReadout() {
  const ref = useRef<HTMLSpanElement>(null);
  useScrub(ref, (p) => {
    const el = ref.current;
    if (!el) return;
    /* The same two eased fold fractions the stylesheet derives from --p. */
    const fold = (start: number) => {
      const f = Math.min(1, Math.max(0, (p - start) / 0.58));
      return f * f * (3 - 2 * f);
    };
    const gap = (e: number) => 2 * LEAF_M * (1 - Math.cos((e * FOLD_DEG * Math.PI) / 180));
    const left = fold(0.06);
    const right = fold(0.14);
    el.textContent = (gap(left) + gap(right)).toFixed(2);
    const host = el.closest<HTMLElement>(".cw-open");
    if (host) host.dataset.state = left + right <= 0 ? "closed" : left + right >= 1.999 ? "open" : "folding";
  });
  return (
    <span ref={ref} className="cw-dim-n">
      3.22
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Style picker                                                       */
/* ------------------------------------------------------------------ */

type Kind = "casement" | "sash" | "tilt" | "door";

const STYLES: {
  id: Kind;
  name: string;
  short: string;
  tag: string;
  noun: string;
  blurb: string;
  modes: string[];
  specs: [string, string][];
  note: string;
}[] = [
  {
    id: "casement",
    name: "Casement window",
    short: "Casement",
    tag: "The everyday window",
    noun: "window",
    blurb: "Hinged at the side and opening outward. Simple, tight when shut, and right for most rooms in most houses.",
    modes: ["Shut", "Swing open"],
    specs: [
      ["Opens", "Outward, side or top hung"],
      ["Suits", "Kitchens, bedrooms, most houses"],
      ["Glazing", "Double or triple glazed units"],
      ["Locking", "Multi-point, key-locking handle"],
      ["Frames", "uPVC, aluminium or timber"],
    ],
    note: "Upstairs, ask for restrictors. The window still opens wide for cleaning, but not by accident.",
  },
  {
    id: "sash",
    name: "Sliding sash",
    short: "Sash",
    tag: "For period fronts",
    noun: "window",
    blurb: "Two sashes that slide past each other, with the proportions and glazing bars of the originals and none of the rattle.",
    modes: ["Shut", "Slide up"],
    specs: [
      ["Opens", "Both sashes slide, and tilt in to clean"],
      ["Suits", "Period houses and conservation streets"],
      ["Details", "Horns and glazing bars to match"],
      ["Balances", "Spring balances, or cords and weights"],
      ["Frames", "Timber or timber-look uPVC"],
    ],
    note: "In a conservation area, timber is usually the safe choice. We check what your street allows at the survey.",
  },
  {
    id: "tilt",
    name: "Tilt-and-turn",
    short: "Tilt-and-turn",
    tag: "One handle, two ways",
    noun: "window",
    blurb: "Tilts in at the top for air with the window still secure, or turns in like a door so you can clean both faces from inside.",
    modes: ["Shut", "Tilt", "Turn"],
    specs: [
      ["Opens", "Tilts in at the top, or turns inward"],
      ["Suits", "Upper floors, flats and large panes"],
      ["Cleaning", "Both faces, from inside the room"],
      ["Locking", "One handle, locks all round"],
      ["Frames", "Aluminium or uPVC"],
    ],
    note: "It opens into the room, so allow for blinds, curtains and whatever lives on the sill.",
  },
  {
    id: "door",
    name: "Composite front door",
    short: "Front door",
    tag: "The one everybody sees",
    noun: "door",
    blurb: "A solid core under a hard-wearing skin, hung in a new frame with a glazed side panel. Heavy, warm and quiet to shut.",
    modes: ["Shut", "Open"],
    specs: [
      ["Build", "Solid core, hard-wearing skin"],
      ["Locking", "Multi-point, hooks and deadbolt"],
      ["Glass", "Clear, obscure or patterned panels"],
      ["Furniture", "Bar handles, knockers, letterplates"],
      ["Threshold", "Low threshold available"],
    ],
    note: "The colour can differ inside and out: white in the hall, and whatever you like facing the street.",
  },
];

const FRAMES = [
  { id: "anthracite", name: "Anthracite", f: "#2b3238", e: "#181c20", l: "#48535b" },
  { id: "white", name: "White", f: "#f6f4ee", e: "#c9c5b9", l: "#ffffff" },
  { id: "sage", name: "Sage green", f: "#8ea587", e: "#6c8366", l: "#a6ba9f" },
  { id: "black", name: "Black", f: "#17191b", e: "#050606", l: "#30343a" },
];

/** One CSS-drawn product. Every size is in em, so a thumbnail is the same drawing at a smaller font-size. */
function Unit({ kind, mode = 0 }: { kind: Kind; mode?: number }) {
  if (kind === "casement")
    return (
      <span className="cw-u cw-u--casement" data-mode={mode}>
        <span className="cw-u-frame">
          <span className="cw-u-hole">
            <span className="cw-u-cell">
              <span className="cw-u-sash cw-u-swing">
                <span className="cw-u-glass" />
                <span className="cw-u-lever" />
              </span>
            </span>
            <span className="cw-u-cell">
              <span className="cw-u-sash cw-u-sash--fixed">
                <span className="cw-u-glass" />
              </span>
            </span>
          </span>
        </span>
        <span className="cw-u-sill" />
      </span>
    );
  if (kind === "sash")
    return (
      <span className="cw-u cw-u--sash" data-mode={mode}>
        <span className="cw-u-frame">
          <span className="cw-u-hole">
            <span className="cw-u-cell cw-u-cell--clip">
              <span className="cw-u-sash cw-u-sash--top">
                <span className="cw-u-glass cw-u-glass--bar" />
              </span>
              <span className="cw-u-sash cw-u-sash--bot">
                <span className="cw-u-glass cw-u-glass--bar" />
                <span className="cw-u-lift" />
                <span className="cw-u-lift" />
              </span>
            </span>
          </span>
        </span>
        <span className="cw-u-sill" />
      </span>
    );
  if (kind === "tilt")
    return (
      <span className="cw-u cw-u--tilt" data-mode={mode}>
        <span className="cw-u-frame">
          <span className="cw-u-hole">
            <span className="cw-u-cell">
              <span className="cw-u-turn">
                <span className="cw-u-sash cw-u-tilt">
                  <span className="cw-u-glass" />
                  <span className="cw-u-lever" />
                </span>
              </span>
            </span>
          </span>
        </span>
        <span className="cw-u-sill" />
      </span>
    );
  return (
    <span className="cw-u cw-u--door" data-mode={mode}>
      <span className="cw-u-frame">
        <span className="cw-u-hole">
          <span className="cw-u-cell">
            <span className="cw-u-slab">
              <span className="cw-u-bar" />
              <span className="cw-u-cyl" />
            </span>
          </span>
          <span className="cw-u-cell">
            <span className="cw-u-sash cw-u-sash--fixed">
              <span className="cw-u-glass" />
            </span>
          </span>
        </span>
      </span>
      <span className="cw-u-sill cw-u-sill--step" />
    </span>
  );
}

export function StylePicker() {
  const [kind, setKind] = useState<Kind>("casement");
  const [frame, setFrame] = useState("anthracite");
  const [mode, setMode] = useState(0);
  const style = STYLES.find((s) => s.id === kind) ?? STYLES[0];
  const colour = FRAMES.find((f) => f.id === frame) ?? FRAMES[0];
  const vars = { "--f": colour.f, "--fe": colour.e, "--fl": colour.l } as CSSProperties;

  return (
    <div className="cw-picker" style={vars}>
      <div className="cw-viewer">
        <div className="cw-tabs" role="group" aria-label="Window and door styles">
          {STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              className="cw-tab"
              aria-pressed={s.id === kind}
              onClick={() => {
                setKind(s.id);
                setMode(0);
              }}
            >
              <span className="cw-tab-thumb" aria-hidden="true">
                <Unit kind={s.id} />
              </span>
              <span className="cw-tab-name">{s.short}</span>
            </button>
          ))}
        </div>

        <div className="cw-wall" data-kind={kind}>
          <span className="cw-mono cw-wall-chip">Shown in {colour.name.toLowerCase()}</span>
          <button
            key={kind}
            type="button"
            className="cw-wall-btn"
            onClick={() => setMode((m) => (m + 1) % style.modes.length)}
            aria-label={`${style.name}, currently: ${style.modes[mode].toLowerCase()}. Press to operate it.`}
          >
            <Unit kind={kind} mode={mode} />
          </button>
          <span className="cw-mono cw-wall-hint" aria-hidden="true">
            Tap: {style.modes[(mode + 1) % style.modes.length].toLowerCase()}
          </span>
        </div>

        <div className="cw-ctl">
          <div className="cw-ctl-group" role="group" aria-label={`Operate the ${style.noun}`}>
            <span className="cw-mono">Operate</span>
            <div className="cw-seg">
              {style.modes.map((m, i) => (
                <button key={m} type="button" aria-pressed={mode === i} onClick={() => setMode(i)}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="cw-ctl-group" role="group" aria-label="Frame colour">
            <span className="cw-mono">Frame</span>
            <div className="cw-swatches">
              {FRAMES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="cw-swatch"
                  aria-pressed={f.id === frame}
                  aria-label={f.name}
                  title={f.name}
                  style={{ "--sw": f.f } as CSSProperties}
                  onClick={() => setFrame(f.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="cw-style" aria-live="polite">
        <p className="cw-mono cw-kicker">
          Style {STYLES.indexOf(style) + 1} of {STYLES.length} · {style.tag}
        </p>
        <h3 className="cw-style-name">{style.name}</h3>
        <p className="cw-style-blurb">{style.blurb}</p>
        <dl className="cw-rows cw-rows--spec">
          {style.specs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div>
            <dt>Shown</dt>
            <dd>
              <i className="cw-rows-sw" aria-hidden="true" />
              {colour.name}, {style.modes[mode].toLowerCase()}
            </dd>
          </div>
        </dl>
        <p className="cw-style-note">
          <span className="cw-mono">Worth knowing</span>
          {style.note}
        </p>
        <div className="cw-style-foot">
          <a href="#survey" className="cw-btn cw-btn--sun">
            Price this style
            <Arrow />
          </a>
          <p>Measured and priced at your free survey.</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comfort: three small diagrams, old frame against new               */
/* ------------------------------------------------------------------ */

type Era = "old" | "new";

const COMFORT = [
  {
    id: "draught",
    title: "Draughts",
    line: "Where the cold gets in.",
    body: "A draught is air getting past a worn seal or a frame that has dropped. A new sash closes onto two continuous gaskets, and the frame is sealed to the wall.",
    old: "Worn seal, gap round the frame",
    fresh: "Two gaskets, sealed to the brickwork",
  },
  {
    id: "noise",
    title: "Noise",
    line: "Why the road sounds closer.",
    body: "Sound comes through thin glass and through gaps. Two panes of different thickness with a sealed space between them take the edge off a busy road.",
    old: "One thin pane, loose in its frame",
    fresh: "Sealed unit, two thicknesses of glass",
  },
  {
    id: "lock",
    title: "Security",
    line: "What a burglar leans on.",
    body: "Most forced doors are levered at the lock side. A multi-point lock throws hooks and a deadbolt into the frame with one turn of the key.",
    old: "A single latch, halfway up",
    fresh: "Hooks top and bottom, deadbolt between",
  },
];

function ComfortDiagram({ id }: { id: string }) {
  if (id === "draught")
    return (
      <svg viewBox="0 0 300 170" className="cw-cd" aria-hidden="true">
        <rect x="0" y="0" width="150" height="170" className="cw-cd-out" />
        <rect x="150" y="0" width="150" height="170" className="cw-cd-in" />
        <rect x="118" y="0" width="64" height="61" className="cw-cd-blk" />
        <rect x="124" y="71" width="52" height="99" className="cw-cd-blk cw-cd-blk--2" />
        <rect x="145" y="84" width="10" height="86" className="cw-cd-pane" />
        <path d="M8 34C48 34 84 66 116 66" className="cw-cd-air" />
        <path d="M8 66H116" className="cw-cd-air" />
        <path d="M8 98C48 98 84 66 116 66" className="cw-cd-air" />
        <g className="cw-cd-old">
          <path d="M118 66H182" className="cw-cd-air" />
          <path d="M184 66C216 66 252 38 292 38" className="cw-cd-air" />
          <path d="M184 66H292" className="cw-cd-air" />
          <path d="M184 66C216 66 252 94 292 94" className="cw-cd-air" />
        </g>
        <g className="cw-cd-new">
          <circle cx="134" cy="66" r="4.5" className="cw-cd-seal" />
          <circle cx="166" cy="66" r="4.5" className="cw-cd-seal" />
          <text x="150" y="33" textAnchor="middle" className="cw-cd-text cw-cd-text--inv">
            2 gaskets
          </text>
          <text x="241" y="70" textAnchor="middle" className="cw-cd-text">
            Still air
          </text>
        </g>
        <text x="10" y="158" className="cw-cd-text">
          Outside
        </text>
        <text x="290" y="158" textAnchor="end" className="cw-cd-text">
          Inside
        </text>
      </svg>
    );
  if (id === "noise")
    return (
      <svg viewBox="0 0 300 170" className="cw-cd" aria-hidden="true">
        <rect x="0" y="0" width="150" height="170" className="cw-cd-out" />
        <rect x="150" y="0" width="150" height="170" className="cw-cd-in" />
        <circle cx="26" cy="80" r="6" className="cw-cd-src" />
        <path d="M48.1 62.8A28 28 0 0 1 48.1 97.2" className="cw-cd-wave" style={{ "--w": 0 } as CSSProperties} />
        <path d="M65.4 49.2A50 50 0 0 1 65.4 110.8" className="cw-cd-wave" style={{ "--w": 1 } as CSSProperties} />
        <path d="M82.7 35.6A72 72 0 0 1 82.7 124.4" className="cw-cd-wave" style={{ "--w": 2 } as CSSProperties} />
        <path d="M100.1 22.1A94 94 0 0 1 100.1 137.9" className="cw-cd-wave" style={{ "--w": 3 } as CSSProperties} />
        <g className="cw-cd-old">
          <rect x="147" y="6" width="5" height="132" className="cw-cd-pane" />
          <path d="M173.6 61.5A30 30 0 0 1 173.6 98.5" className="cw-cd-wave" style={{ "--w": 4 } as CSSProperties} />
          <path d="M193.3 46.1A55 55 0 0 1 193.3 113.9" className="cw-cd-wave" style={{ "--w": 5 } as CSSProperties} />
          <path d="M213 30.7A80 80 0 0 1 213 129.3" className="cw-cd-wave" style={{ "--w": 6 } as CSSProperties} />
        </g>
        <g className="cw-cd-new">
          <rect x="136" y="6" width="8" height="132" className="cw-cd-pane" />
          <rect x="157" y="6" width="5" height="132" className="cw-cd-pane" />
          <rect x="144" y="6" width="13" height="7" className="cw-cd-seal" />
          <rect x="144" y="131" width="13" height="7" className="cw-cd-seal" />
          <path d="M187.6 64.5A26 26 0 0 1 187.6 95.5" className="cw-cd-wave cw-cd-wave--faint" />
          <text x="246" y="84" textAnchor="middle" className="cw-cd-text">
            A murmur
          </text>
        </g>
        <text x="10" y="158" className="cw-cd-text">
          Road
        </text>
        <text x="290" y="158" textAnchor="end" className="cw-cd-text">
          Front room
        </text>
      </svg>
    );
  return (
    <svg viewBox="0 0 300 170" className="cw-cd" aria-hidden="true">
      <rect x="0" y="0" width="300" height="170" className="cw-cd-in" />
      <rect x="62" y="0" width="92" height="170" className="cw-cd-blk cw-cd-blk--2" />
      <rect x="146" y="0" width="8" height="170" className="cw-cd-strip" />
      <rect x="160" y="0" width="26" height="170" className="cw-cd-blk" />
      <rect x="84" y="78" width="40" height="7" rx="3.5" className="cw-cd-steel" />
      <circle cx="118" cy="100" r="6.5" className="cw-cd-steel" />
      <g className="cw-cd-old">
        <rect x="154" y="77" width="13" height="9" className="cw-cd-latch" />
        <path d="M190 81H206" className="cw-cd-lead" />
        <text x="212" y="85" className="cw-cd-text">
          One latch
        </text>
      </g>
      <g className="cw-cd-new">
        <rect x="154" y="22" width="20" height="10" className="cw-cd-seal cw-cd-bolt" style={{ "--w": 0 } as CSSProperties} />
        <rect x="154" y="76" width="24" height="12" className="cw-cd-seal cw-cd-bolt" style={{ "--w": 1 } as CSSProperties} />
        <rect x="154" y="134" width="20" height="10" className="cw-cd-seal cw-cd-bolt" style={{ "--w": 2 } as CSSProperties} />
        <path d="M190 27H206M190 82H206M190 139H206" className="cw-cd-lead" />
        <text x="212" y="31" className="cw-cd-text">
          Hook
        </text>
        <text x="212" y="86" className="cw-cd-text">
          Deadbolt
        </text>
        <text x="212" y="143" className="cw-cd-text">
          Hook
        </text>
      </g>
      <text x="10" y="158" className="cw-cd-text">
        Door
      </text>
      <text x="290" y="158" textAnchor="end" className="cw-cd-text">
        Frame
      </text>
    </svg>
  );
}

export function ComfortBoard() {
  const [era, setEra] = useState<Era>("new");
  return (
    <div className="cw-comfort" data-era={era}>
      <div className="cw-era" role="group" aria-label="Compare an old frame with a new one">
        <span className="cw-mono">Show me</span>
        <div className="cw-seg cw-seg--light">
          <button type="button" aria-pressed={era === "old"} onClick={() => setEra("old")}>
            A tired old frame
          </button>
          <button type="button" aria-pressed={era === "new"} onClick={() => setEra("new")}>
            A new Clearline one
          </button>
        </div>
      </div>
      <ul className="cw-comfort-cards">
        {COMFORT.map((c, i) => (
          <li key={c.id} className="cw-comfort-card">
            <div className="cw-comfort-fig">
              <ComfortDiagram id={c.id} />
              <span className="cw-mono cw-comfort-era">{era === "old" ? "Old frame" : "New frame"}</span>
            </div>
            <div className="cw-comfort-body">
              <p className="cw-mono cw-kicker">
                0{i + 1} · {c.title}
              </p>
              <h3>{c.line}</h3>
              <p>{c.body}</p>
              <dl className="cw-versus">
                <div data-on={era === "old"}>
                  <dt>Old</dt>
                  <dd>{c.old}</dd>
                </div>
                <div data-on={era === "new"}>
                  <dt>New</dt>
                  <dd>{c.fresh}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Survey form (a demo: nothing is sent)                              */
/* ------------------------------------------------------------------ */

const TIMES = [
  { id: "weekday", label: "Weekday" },
  { id: "evening", label: "Evening" },
  { id: "saturday", label: "Saturday" },
];

export function SurveyForm() {
  const [sent, setSent] = useState(false);
  const [when, setWhen] = useState("weekday");
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <div className="cw-form cw-form--done" role="status">
        <p className="cw-mono cw-form-kicker">This is a demo</p>
        <p className="cw-form-done-title">That is where a real survey request would land.</p>
        <p>This page is a demo by Integrate Web Design, so nothing was sent and no details were kept.</p>
      </div>
    );
  return (
    <form className="cw-form" onSubmit={onSubmit}>
      <div className="cw-form-head">
        <p className="cw-mono cw-form-kicker">Free survey request</p>
        <span className="cw-mono cw-form-step">Takes a minute</span>
      </div>
      <label className="cw-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Sam Taylor" required />
      </label>
      <label className="cw-field">
        <span>Phone</span>
        <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900123" required />
      </label>
      <label className="cw-field">
        <span>What do you need?</span>
        <select name="need" defaultValue="windows">
          <option value="windows">New windows</option>
          <option value="bifolds">Bifold or sliding doors</option>
          <option value="door">A front or back door</option>
          <option value="all">A bit of everything</option>
        </select>
      </label>
      <fieldset className="cw-field cw-field--set">
        <legend>Best time for the survey</legend>
        <div className="cw-times">
          {TIMES.map((t) => (
            <label key={t.id} className="cw-time">
              <input type="radio" name="when" value={t.id} checked={when === t.id} onChange={() => setWhen(t.id)} />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="cw-btn cw-btn--sun cw-btn--full cw-btn--lg">
        Request my free survey
        <Arrow />
      </button>
      <p className="cw-form-note">Demo form. Nothing is sent or stored.</p>
    </form>
  );
}
