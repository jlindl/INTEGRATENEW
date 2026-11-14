"use client";

/**
 * "Measure up": three taps (shape, rough size, what is staying) that end in a
 * plan sketch, a rough idea of the job and the way to book a design visit.
 * The figures are a made-up firm's rule of thumb, and say so.
 */
import { useEffect, useState } from "react";
import { Arrow, Tick } from "./bits";
import { board } from "./board";

type Shape = "galley" | "l" | "u" | "island";
type Size = "small" | "medium" | "large";
type Keep = "nothing" | "appliances" | "layout" | "units";

const SHAPES: { id: Shape; label: string; note: string }[] = [
  { id: "galley", label: "Galley", note: "Two facing runs" },
  { id: "l", label: "L-shape", note: "Two walls" },
  { id: "u", label: "U-shape", note: "Three walls" },
  { id: "island", label: "Island", note: "L-shape and island" },
];

const SIZES: { id: Size; label: string; note: string; w: string; h: string; units: [number, number]; days: number }[] = [
  { id: "small", label: "Small", note: "Under 8 m²", w: "3.0 m", h: "2.4 m", units: [6, 9], days: 5 },
  { id: "medium", label: "Medium", note: "8 to 14 m²", w: "3.8 m", h: "3.0 m", units: [10, 14], days: 7 },
  { id: "large", label: "Large", note: "Over 14 m²", w: "4.8 m", h: "3.8 m", units: [15, 20], days: 9 },
];

const KEEPS: { id: Keep; label: string; note: string; short: string; fresh: string; kept: string; jobs: string[] }[] = [
  {
    id: "nothing",
    label: "Nothing",
    note: "Strip it all out",
    short: "nothing staying",
    fresh: "Cabinets, worktops, appliances, plumbing and electrics",
    kept: "Nothing",
    jobs: [
      "Full strip-out and disposal",
      "Plumbing and electrics moved to suit the new layout",
      "Walls made good before a cabinet goes in",
      "Cabinets, worktops and appliances fitted and tested",
    ],
  },
  {
    id: "appliances",
    label: "Appliances",
    note: "We fit round them",
    short: "appliances staying",
    fresh: "Cabinets, worktops, plumbing and electrics",
    kept: "Your appliances",
    jobs: [
      "Full strip-out, your appliances stored safely",
      "Plumbing and electrics moved to suit the new layout",
      "Cabinets built to your appliance sizes",
      "Appliances refitted, connected and tested",
    ],
  },
  {
    id: "layout",
    label: "The layout",
    note: "Sink and cooker stay put",
    short: "layout staying",
    fresh: "Cabinets, worktops and appliances",
    kept: "Sink and cooker positions",
    jobs: [
      "Strip-out, with the sink and cooker points left where they are",
      "No pipes or cables moved, so less making good",
      "New cabinets on the same footprint",
      "Worktops templated once the cabinets are in",
    ],
  },
  {
    id: "units",
    label: "The cabinets",
    note: "New doors and worktops",
    short: "cabinets staying",
    fresh: "Doors, drawer fronts, worktops and handles",
    kept: "Cabinets and layout",
    jobs: [
      "Cabinets checked, levelled and kept",
      "Doors and drawer fronts made to measure",
      "New worktops templated and fitted",
      "New handles, hinges and soft-close runners",
    ],
  },
];

function estimate(shape: Shape, size: Size, keep: Keep) {
  const s = SIZES.find((x) => x.id === size) ?? SIZES[1];
  let [lo, hi] = s.units;
  if (shape === "island") {
    lo += 2;
    hi += 3;
  }
  if (shape === "u") {
    lo += 1;
    hi += 1;
  }
  if (keep === "units") {
    return { units: `${lo} to ${hi}, all kept`, days: size === "large" ? "3 to 5" : "2 to 4" };
  }
  const days = s.days + (shape === "island" || shape === "u" ? 1 : 0) + (keep === "layout" ? 0 : 2);
  return { units: `${lo} to ${hi} new cabinets`, days: `${days} to ${days + 2}` };
}

/* ------------------------------------------------------------------ */
/*  Plan sketch                                                        */
/* ------------------------------------------------------------------ */

const ROOM: Record<Size, [number, number]> = {
  small: [150, 104],
  medium: [188, 128],
  large: [228, 152],
};

function Plan({ shape, size, keep }: { shape: Shape; size: Size; keep: Keep }) {
  const [W, H] = ROOM[size];
  const s = SIZES.find((x) => x.id === size) ?? SIZES[1];
  const x = (300 - W) / 2 + 6;
  const y = (210 - H) / 2 + 8;
  const d = 22;
  const gx = x + W * 0.62;
  const show = (...shapes: Shape[]) => (shapes.includes(shape) ? "mk-plan-run is-on" : "mk-plan-run");
  const keptUnits = keep === "units";
  const keptApps = keep === "appliances" || keep === "units";

  return (
    <svg
      viewBox="0 0 300 210"
      className="mk-plan-svg"
      data-units={keptUnits ? "kept" : "new"}
      data-apps={keptApps ? "kept" : "new"}
      role="img"
      aria-label={`Plan sketch of a ${s.label.toLowerCase()} ${SHAPES.find((p) => p.id === shape)?.label ?? ""} kitchen, about ${s.w} by ${s.h}`}
    >
      {/* dimensions */}
      <g className="mk-plan-dim">
        <path d={`M${x} ${y - 13} H${x + W} M${x} ${y - 17} v8 M${x + W} ${y - 17} v8`} />
        <text x={x + W / 2} y={y - 18} textAnchor="middle">
          {s.w}
        </text>
        <path d={`M${x - 13} ${y} V${y + H} M${x - 17} ${y} h8 M${x - 17} ${y + H} h8`} />
        <text x={x - 18} y={y + H / 2} textAnchor="middle" transform={`rotate(-90 ${x - 18} ${y + H / 2})`}>
          {s.h}
        </text>
      </g>

      {/* floor */}
      <rect x={x} y={y} width={W} height={H} className="mk-plan-floor" />

      {/* runs of cabinets */}
      <rect x={x} y={y} width={W} height={d} className="mk-plan-run is-on" />
      <rect x={x} y={y + H - d} width={W * 0.56} height={d} className={show("galley")} />
      <rect x={x} y={y + d} width={d} height={H - d} className={show("l", "u", "island")} />
      <rect x={x + W - d} y={y + d} width={d} height={H - d} className={show("u")} />
      <rect x={x + W * 0.3} y={y + H * 0.46} width={W * 0.46} height={d * 1.15} rx="1.5" className={show("island")} />

      {/* sink, hob, fridge */}
      <g className="mk-plan-app">
        <rect x={x + W * 0.24} y={y + 5} width={24} height={d - 10} rx="3" />
        <circle cx={x + W * 0.24 + 12} cy={y + 3.2} r="1.6" />
        <rect x={x + W * 0.56} y={y + 4} width={22} height={d - 8} rx="2" />
        <circle cx={x + W * 0.56 + 6.5} cy={y + d / 2} r="2.6" />
        <circle cx={x + W * 0.56 + 15.5} cy={y + d / 2} r="2.6" />
        <path d={`M${x + W - d + 3} ${y + 4} h${d - 6} v${d - 8} h-${d - 6} z m0 0 l${d - 6} ${d - 8}`} />
      </g>

      {/* walls, window, door */}
      <path d={`M${gx} ${y + H} H${x} V${y} H${x + W} V${y + H} H${gx + 30}`} className="mk-plan-wall" />
      <path d={`M${x + W * 0.18} ${y} h${W * 0.3}`} className="mk-plan-window" />
      <path d={`M${gx} ${y + H} A30 30 0 0 1 ${gx + 30} ${y + H - 30} V${y + H}`} className="mk-plan-door" />
    </svg>
  );
}

function ShapeIcon({ shape }: { shape: Shape }) {
  return (
    <svg viewBox="0 0 40 30" width="40" height="30" className="mk-opt-icon" aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="27" rx="1" className="mk-opt-room" />
      <rect x="1.5" y="1.5" width="37" height="7" className="mk-opt-run" />
      {shape === "galley" && <rect x="1.5" y="21.5" width="22" height="7" className="mk-opt-run" />}
      {shape !== "galley" && <rect x="1.5" y="8.5" width="7" height="20" className="mk-opt-run" />}
      {shape === "u" && <rect x="31.5" y="8.5" width="7" height="20" className="mk-opt-run" />}
      {shape === "island" && <rect x="15" y="15" width="16" height="7" rx="0.8" className="mk-opt-run" />}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  The helper                                                         */
/* ------------------------------------------------------------------ */

export function MeasureUp() {
  const [shape, setShape] = useState<Shape>("l");
  const [size, setSize] = useState<Size>("medium");
  const [keep, setKeep] = useState<Keep>("nothing");

  const shapeInfo = SHAPES.find((s) => s.id === shape) ?? SHAPES[1];
  const sizeInfo = SIZES.find((s) => s.id === size) ?? SIZES[1];
  const keepInfo = KEEPS.find((k) => k.id === keep) ?? KEEPS[0];
  const est = estimate(shape, size, keep);

  useEffect(() => {
    board.set({ room: `${shapeInfo.label}, ${sizeInfo.label.toLowerCase()}, ${keepInfo.short}` });
  }, [shapeInfo, sizeInfo, keepInfo]);

  return (
    <div className="mk-measure">
      {/* The questions and the sketch rise in. The summary holds the button, so it never fades. */}
      <div className="mk-qs" data-reveal="">
        <div className="mk-q" role="group" aria-labelledby="mk-q1">
          <p className="mk-q-head">
            <span className="mk-mono">Tap 1</span>
            <span id="mk-q1" className="mk-q-title">
              What shape is the kitchen?
            </span>
          </p>
          <div className="mk-opts mk-opts--4">
            {SHAPES.map((o) => (
              <button
                key={o.id}
                type="button"
                className="mk-opt mk-opt--icon"
                aria-pressed={o.id === shape}
                onClick={() => setShape(o.id)}
              >
                <ShapeIcon shape={o.id} />
                <b>{o.label}</b>
                <small>{o.note}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="mk-q" role="group" aria-labelledby="mk-q2">
          <p className="mk-q-head">
            <span className="mk-mono">Tap 2</span>
            <span id="mk-q2" className="mk-q-title">
              Roughly how big?
            </span>
          </p>
          <div className="mk-opts mk-opts--3">
            {SIZES.map((o, i) => (
              <button
                key={o.id}
                type="button"
                className="mk-opt mk-opt--size"
                aria-pressed={o.id === size}
                onClick={() => setSize(o.id)}
              >
                <span className="mk-opt-bar" aria-hidden="true">
                  <i style={{ width: `${46 + i * 27}%` }} />
                </span>
                <b>{o.label}</b>
                <small>{o.note}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="mk-q" role="group" aria-labelledby="mk-q3">
          <p className="mk-q-head">
            <span className="mk-mono">Tap 3</span>
            <span id="mk-q3" className="mk-q-title">
              What is staying?
            </span>
          </p>
          <div className="mk-opts mk-opts--4 mk-opts--list">
            {KEEPS.map((o) => (
              <button
                key={o.id}
                type="button"
                className="mk-opt"
                aria-pressed={o.id === keep}
                onClick={() => setKeep(o.id)}
              >
                <b>{o.label}</b>
                <small>{o.note}</small>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mk-plan" data-reveal="">
        <p className="mk-mono mk-plan-cap">
          <span>Plan sketch · not to scale</span>
          <span className="mk-plan-key">
            <i className="mk-plan-key-new" /> New
            <i className="mk-plan-key-kept" /> Kept
          </span>
        </p>
        <Plan shape={shape} size={size} keep={keep} />
      </div>

      <div className="mk-result" aria-live="polite">
        <div className="mk-result-main">
          <p className="mk-mono mk-result-kicker">Your kitchen, roughly</p>
          <p className="mk-result-title">
            {sizeInfo.label} {shapeInfo.label.toLowerCase()} kitchen, <em>{keepInfo.short}.</em>
          </p>

          <dl className="mk-result-rows">
            <div>
              <dt>Cabinets</dt>
              <dd>{est.units}</dd>
            </div>
            <div>
              <dt>On site</dt>
              <dd>{est.days} working days</dd>
            </div>
            <div>
              <dt>New</dt>
              <dd>{keepInfo.fresh}</dd>
            </div>
            <div>
              <dt>Kept</dt>
              <dd>{keepInfo.kept}</dd>
            </div>
          </dl>
        </div>

        <div className="mk-result-side">
          <p className="mk-mono mk-result-kicker">What the job involves</p>
          <ul className="mk-result-jobs">
            {keepInfo.jobs.map((job) => (
              <li key={job}>
                <span className="mk-tick mk-tick--on">
                  <Tick />
                </span>
                {job}
              </li>
            ))}
          </ul>

          <div className="mk-result-foot">
            <a href="#visit" className="mk-btn mk-btn--brass">
              Book a design visit
              <Arrow />
            </a>
            <p>A rough guide from kitchens like this one. The design visit sets the real figures.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
