/**
 * Fenwick & Rowe's line drawings. Plain SVG with no state, so the page
 * (server) and the project picker (client) can both use them.
 *
 * The big elevation is traced over the finished photograph
 * (public/media/demos/builders/hero.webp, 2000 x 1131), so the two register
 * exactly when the photo wipes in over the drawing.
 */
import type { CSSProperties } from "react";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Rear elevation, 1:50. Existing house in thin line, new work bold.  */
/* ------------------------------------------------------------------ */

const EXISTING = [
  /* roof, hip and eaves */
  "M0 100 L90 88 H1075 L1510 243",
  "M0 246 H1514 V262 H0",
  /* chimney */
  "M513 88 V10 H655 V88 M503 10 H665",
  /* gable end and rainwater pipes, down to the new roof */
  "M1480 262 V452 M455 262 V452 M1447 262 V452",
  /* first floor windows */
  "M167 272 H410 V420 H167 Z M250 272 V420 M330 272 V420 M330 322 H410 M158 426 H418",
  "M638 268 H858 V424 H638 Z M778 268 V424 M638 322 H778 M630 430 H866",
  "M1140 270 H1345 V410 H1140 Z M1208 270 V410 M1208 318 H1345 M1132 416 H1353",
  /* ground */
  "M0 988 H2000",
  /* fences and the neighbour */
  "M0 640 H247 M165 640 V988 M1757 628 H2000 M1905 628 V988 M1800 378 L2000 246 M1832 392 V628",
];

/** The old back of the house: drawn first, then struck out by the new work. */
const REMOVED = [
  "M1480 452 V988 M455 452 V988 M1447 452 V988",
  "M560 988 V668 H700 V988 M560 742 H700",
  "M880 610 H1250 V850 H880 Z M1003 610 V850 M1127 610 V850 M870 858 H1260",
];

const LANTERN_SHAPE = "M580 440 L815 372 H1195 L1425 440 H1433 V448 H572 V440 Z";

const PANES = [
  [410, 590],
  [618, 790],
  [818, 990],
  [1018, 1190],
  [1218, 1390],
  [1418, 1595],
]
  .map(([a, b]) => `M${a} 565 H${b} V960 H${a} Z`)
  .join(" ");

const COURSES = [
  ...Array.from({ length: 11 }, (_, r) => `M261 ${505 + r * 44} H371 M1634 ${505 + r * 44} H1741`),
  "M261 492 H1741 M261 516 H1741",
].join(" ");

/** [path, thin?] in the order the extension is drawn: ground up. */
const PROPOSED: [string, boolean][] = [
  ["M120 988 H1880", false],
  ["M247 988 V468 M1755 988 V468", false],
  ["M385 985 V540 H1620 V985", false],
  ["M603 985 V540 M803 985 V540 M1003 985 V540 M1205 985 V540 M1405 985 V540", false],
  ["M240 468 V452 H1762 V468 Z", false],
  ["M580 440 L815 372 H1195 L1425 440 M572 448 H1433 V440 H572 Z", false],
  ["M805 440 L820 372 M1012 440 V372 M1212 440 L1192 372", true],
  [PANES, true],
  [COURSES, true],
  ["M300 615 H322 V650 H300 Z M1680 615 H1702 V650 H1680 Z", true],
];

export function ElevationLines() {
  return (
    <svg className="fr-lines" viewBox="0 0 2000 1131" aria-hidden="true" focusable="false">
      <g>
        {EXISTING.map((d, n) => (
          <path key={d} d={d} pathLength={1} className="fr-ln fr-ln--ex" style={i(n)} />
        ))}
      </g>
      <g>
        {REMOVED.map((d, n) => (
          <path key={d} d={d} pathLength={1} className="fr-ln fr-ln--ex fr-ln--gone" style={i(n + 6)} />
        ))}
      </g>
      {/* Glass: the lantern hides what is behind it, the door panes take a tint. */}
      <path d={LANTERN_SHAPE} className="fr-glass fr-glass--solid" style={i(5)} />
      <path d={PANES} className="fr-glass" style={i(7)} />
      <g>
        {PROPOSED.map(([d, thin], n) => (
          <path key={d} d={d} pathLength={1} className={`fr-ln fr-ln--pr${thin ? " fr-ln--thin" : ""}`} style={i(n)} />
        ))}
      </g>
    </svg>
  );
}

const DIMENSIONS = [
  /* overall width */
  "M247 1062 H1755 M247 1006 V1084 M1755 1006 V1084 M233 1076 L261 1048 M1741 1076 L1769 1048",
  /* height, ground to roof */
  "M1840 452 V988 M1790 452 H1862 M1790 988 H1862 M1826 466 L1854 438 M1826 1002 L1854 974",
  /* roof level datum */
  "M120 452 H232 M205 452 l-14 -24 h28 Z",
  /* finished floor level datum */
  "M205 988 l-14 -24 h28 Z",
];

export function ElevationDims() {
  return (
    <svg className="fr-dims" viewBox="0 0 2000 1131" aria-hidden="true" focusable="false">
      {DIMENSIONS.map((d, n) => (
        <path key={d} d={d} pathLength={1} className="fr-dim" style={i(n)} />
      ))}
      <path d="M1012 366 V312" pathLength={1} className="fr-dim fr-dim--lead" style={i(4)} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Ground floor plan for the hero's plan card                         */
/* ------------------------------------------------------------------ */

export function PlanDrawing() {
  return (
    <svg className="fr-plan-svg" viewBox="0 0 300 232" aria-hidden="true" focusable="false">
      {/* existing rear wall, with the knock-through shown dashed */}
      <path className="fr-pl-ex" d="M8 34 H292 M8 44 H70 M230 44 H292" />
      <path className="fr-pl-dash" d="M70 44 H230" />
      {/* new walls */}
      <path className="fr-pl-new" d="M34 44 V186 H70 M230 186 H266 V44" />
      {/* bifold doors, folded */}
      <path
        className="fr-pl-door"
        d="M70 186 l13.3 -9 13.3 9 13.3 -9 13.4 9 13.3 -9 13.4 9 13.3 -9 13.3 9 13.4 -9 13.3 9 13.4 -9 13.3 9"
      />
      {/* roof lantern over */}
      <path className="fr-pl-dash" d="M100 80 H200 V134 H100 Z M100 80 L200 134 M200 80 L100 134" />
      {/* island and table */}
      <rect className="fr-pl-fit" x="50" y="62" width="28" height="78" />
      <rect className="fr-pl-fit" x="212" y="96" width="34" height="62" rx="3" />
      {/* dimensions */}
      <path className="fr-pl-dim" d="M34 212 H266 M34 203 V221 M266 203 V221 M29 217 l10 -10 M261 217 l10 -10" />
      <path className="fr-pl-dim" d="M284 44 V186 M275 44 H293 M275 186 H293 M279 49 l10 -10 M279 191 l10 -10" />
      <g className="fr-pl-t">
        <rect x="126" y="204" width="48" height="16" className="fr-pl-tbg" />
        <text x="150" y="216" textAnchor="middle">
          6.0 m
        </text>
        <rect x="276" y="92" width="16" height="46" className="fr-pl-tbg" />
        <text x="288" y="115" textAnchor="middle" transform="rotate(-90 288 115)">
          4.0 m
        </text>
        <text x="12" y="26">EXISTING HOUSE</text>
        <text x="150" y="70" textAnchor="middle">
          LANTERN OVER
        </text>
        <text x="150" y="162" textAnchor="middle">
          KITCHEN-DINER
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Small drawings for the project picker                              */
/* ------------------------------------------------------------------ */

export type MiniKind = "rear" | "side" | "loft" | "reno";

export function MiniDrawing({ kind }: { kind: MiniKind }) {
  return (
    <svg className="fr-mini" viewBox="0 0 360 220" aria-hidden="true" focusable="false">
      {kind === "rear" && (
        <>
          <rect className="fr-mi-fill" x="96" y="126" width="228" height="72" />
          <path className="fr-mi-ex" d="M52 198 V78 H300 V124 M40 78 L92 30 H262 L312 78 Z M222 30 V14 H244 V30" />
          <path className="fr-mi-ex" d="M80 92 h44 v30 h-44 Z M102 92 v30 M256 90 h36 v24 h-36 Z M274 90 v24" />
          <path className="fr-mi-new" d="M96 198 V126 M324 198 V126 M90 126 H330" />
          <path className="fr-mi-new" d="M170 126 L192 110 H228 L250 126" />
          <path className="fr-mi-thin" d="M120 198 V144 H300 V198 M150 144 V198 M180 144 V198 M210 144 V198 M240 144 V198 M270 144 V198 M210 110 V126" />
          <path className="fr-mi-dim" d="M96 211 H324 M96 205 V217 M324 205 V217" />
        </>
      )}
      {kind === "side" && (
        <>
          <polygon className="fr-mi-fill" points="196,124 300,144 300,198 196,198" />
          <path className="fr-mi-ex" d="M60 198 V34 M300 34 V144 M50 34 H310 M56 96 H196 V124" />
          <path className="fr-mi-ex" d="M98 50 h44 v30 h-44 Z M120 50 v30 M222 52 h50 v38 h-50 Z M247 52 v38 M104 116 h48 v40 h-48 Z M128 116 v40" />
          <path className="fr-mi-ex" d="M300 160 H344" />
          <path className="fr-mi-new" d="M196 124 L300 144 V198 M196 124 V198" />
          <path className="fr-mi-thin" d="M222 129 v-7 M248 134 v-7 M274 139 v-7 M210 198 V154 H288 V198 M249 154 V198" />
          <path className="fr-mi-dim" d="M196 211 H300 M196 205 V217 M300 205 V217" />
        </>
      )}
      {kind === "loft" && (
        <>
          <rect className="fr-mi-fill" x="98" y="54" width="72" height="38" />
          <rect className="fr-mi-fill" x="240" y="148" width="68" height="50" />
          <path className="fr-mi-ex" d="M46 198 V98 H222 V198 M36 98 L70 40 H198 L232 98 Z" />
          <path className="fr-mi-ex" d="M66 114 h40 v28 h-40 Z M162 114 h40 v28 h-40 Z M66 158 h40 v26 h-40 Z M162 158 h40 v26 h-40 Z M120 198 V152 H148 V198" />
          <path className="fr-mi-ex" d="M222 132 H326 V198 M218 132 H330" />
          <path className="fr-mi-new" d="M98 92 V54 H170 V92 M92 54 H176 M240 198 V148 H308 V198" />
          <path className="fr-mi-thin" d="M110 62 h48 v20 h-48 Z M134 62 v20 M254 158 h40 v24 h-40 Z M274 158 v24" />
        </>
      )}
      {kind === "reno" && (
        <>
          <polygon className="fr-mi-fill" points="70,198 70,88 180,26 290,88 290,198" />
          <path className="fr-mi-new" d="M70 198 V88 L180 26 L290 88 V198" />
          <path className="fr-mi-thin" d="M70 144 H290 M70 88 H290 M170 144 V198 M200 88 V144" />
          {(
            [
              [120, 172, "1"],
              [232, 172, "2"],
              [134, 117, "3"],
              [246, 117, "4"],
              [180, 62, "5"],
            ] as const
          ).map(([x, y, n]) => (
            <g key={n} className="fr-mi-mark">
              <circle cx={x} cy={y} r="10" />
              <text x={x} y={y + 3.5} textAnchor="middle">
                {n}
              </text>
            </g>
          ))}
        </>
      )}
      <path className="fr-mi-ground" d="M16 198 H344" />
    </svg>
  );
}
