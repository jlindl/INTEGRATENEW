import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Arrow, MaterialsBoard, SeasonsPlanner, VisitForm, WalkClock } from "./_components/parts";
import "./landscapers.css";

/**
 * Tallow & Thorn: an immersive demo homepage for a landscaper.
 *
 * Concept: a walk down the garden. Scroll is the path. The signature scene
 * pins a wide panorama and walks the visitor along it, patio to pergola,
 * afternoon to dusk, with planting in the foreground moving faster.
 *
 * The business, its phone number, reviews and guarantees are all made up.
 * Photography is generated (public/media/demos/landscapers).
 */

const display = localFont({
  src: [
    { path: "../../../../assets/fonts/fraunces/fraunces-100-900.woff2", weight: "100 900", style: "normal" },
    { path: "../../../../assets/fonts/fraunces/fraunces-100-900-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-tt-display",
  display: "swap",
});
const body = localFont({
  src: "../../../../assets/fonts/figtree/figtree-300-900.woff2",
  weight: "300 900",
  variable: "--font-tt-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tallow & Thorn | Demo landscaper homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a garden design and landscaping company, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 284";
const PHONE_HREF = "tel:01632960284";
const M = "/media/demos/landscapers";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const HERO_FACTS = [
  ["16 years", "Designing and building"],
  ["140+", "Gardens finished"],
  ["Team of 9", "All our own people"],
];

const PLAN_KEY = [
  ["A", "Patio", "Porcelain, 24 m²"],
  ["B", "Planting", "Raised oak beds"],
  ["C", "Lawn", "Stepping stones"],
  ["D", "Pergola", "Oak, seats six"],
];

/* The four stations of the walk. x and y are positions on the panorama (%);
   t is the point in the walk (0 to 1) at which the station's card appears. */
const STOPS = [
  {
    n: "01",
    name: "Patio",
    spec: "Porcelain · 24 m²",
    x: 15,
    y: 51,
    t: -1,
    text: "Porcelain laid to a fall, with room for the big table and the barbecue.",
  },
  {
    n: "02",
    name: "Planting",
    spec: "Oak beds · nine kinds",
    x: 40,
    y: 46,
    t: 0.24,
    text: "Raised oak beds of grasses and perennials. Something in flower from March to November.",
  },
  {
    n: "03",
    name: "Lawn",
    spec: "Turf · stepping stones",
    x: 64,
    y: 58,
    t: 0.49,
    text: "Levelled, edged and fed. Stepping stones keep the route dry in February.",
  },
  {
    n: "04",
    name: "Pergola",
    spec: "Green oak · lit",
    x: 85.5,
    y: 44,
    t: 0.74,
    text: "Green oak, sized for the corner sofa and lit, so you stay out after dark.",
  },
];

/* Festoon lights under the pergola's front beam, and lights up the stepping stones. */
const FESTOON = Array.from({ length: 13 }, (_, i) => {
  const t = i / 12;
  return { x: 73.6 + t * 23.4, y: 22.4 - t * 2.5 + Math.sin(Math.PI * t) * 2.8 };
});
const PATH_LIGHTS = [
  [66.8, 69.2, 1],
  [70.2, 64.8, 0.88],
  [73.2, 61.5, 0.78],
  [75.4, 58.7, 0.7],
  [77.3, 56.5, 0.62],
  [79.2, 54.5, 0.56],
];

const SERVICES = [
  ["Garden design", "Scale plans, planting plans and 3D views before anything is dug.", "Plans · 3D views"],
  ["Patios and paths", "Porcelain, sandstone and clay pavers on a full mortar bed, laid to a fall.", "Full mortar bed"],
  ["Planting", "Trees, hedging, borders and pots, chosen for your soil and your patience.", "Soil tested"],
  ["Lawns", "New turf, levelling and edging, and tired lawns brought back.", "Turf · seed"],
  ["Lighting", "Low-voltage path, step and tree lighting, on a timer or your phone.", "Low voltage"],
  ["Maintenance", "Fortnightly or monthly visits from the people who planted it.", "Same team"],
];

const STEPS = [
  {
    title: "Garden visit",
    text: "We walk it with you, listen and measure up. Free, and about an hour.",
    get: "Honest advice and a budget range",
    when: "Week 0",
  },
  {
    title: "Design",
    text: "A scale plan, a planting plan and 3D views. Two rounds of changes included.",
    get: "Drawings you can picture",
    when: "Weeks 1 to 3",
  },
  {
    title: "Fixed quote",
    text: "Itemised area by area, so you can phase the work if you want to.",
    get: "One price, in writing",
    when: "Week 4",
  },
  {
    title: "Build and plant",
    text: "Our own team on site every day until it is done. Swept up each evening.",
    get: "A named site lead",
    when: "Weeks 5 to 9",
  },
  {
    title: "Handover",
    text: "We walk the finished garden together and come back in spring to check on it.",
    get: "Care guide and plant guarantee",
    when: "Then every spring",
  },
];

const PACK = [
  ["Planting plan", "Every plant named and placed"],
  ["Care calendar", "What to do, month by month"],
  ["Lighting guide", "Timers, scenes and spares"],
  ["Plant guarantee", "12 months, in writing"],
];

const PROJECTS = [
  {
    img: "scene.webp",
    alt: "A garden at dusk with path lights, stone steps and a fire bowl in a sunken seating area",
    pos: "50% 60%",
    title: "The sunken fire garden",
    brief: "Somewhere to sit out after dark.",
    rows: [
      ["Scope", "Sunken seating, steps, lighting"],
      ["Stone", "Sandstone, stone-faced walls"],
      ["On site", "Six weeks"],
    ],
  },
  {
    img: "extra.webp",
    alt: "Gloved hands lowering a sandstone slab onto a bed of mortar beside a string line",
    pos: "50% 50%",
    title: "The courtyard, mid-build",
    brief: "Replace a cracked concrete yard.",
    rows: [
      ["Scope", "32 m² of riven sandstone"],
      ["Method", "Full mortar bed, string line"],
      ["On site", "Two weeks"],
    ],
  },
  {
    img: "hero.webp",
    alt: "A green oak pergola with a corner sofa at the end of a lawn crossed by stepping stones",
    pos: "92% 30%",
    title: "The long lawn",
    brief: "A reason to walk to the far end.",
    rows: [
      ["Scope", "Pergola, stepping stones, beds"],
      ["Timber", "Green oak, pegged joints"],
      ["On site", "Five weeks"],
    ],
  },
];

const REVIEWS = [
  {
    quote:
      "We wanted somewhere to eat outside that was not a patio set on a slope. They levelled it, planted it and we have barely been indoors since May.",
    who: "Homeowner, 1930s semi",
    job: "Patio, raised beds, planting",
  },
  {
    quote:
      "The plan made the decision easy. We could see where every plant and every light was going before we had spent anything.",
    who: "Homeowner, new-build plot",
    job: "Full design and build",
  },
  {
    quote:
      "They come back every fortnight and it shows. The borders look better in year three than they did in year one.",
    who: "Homeowner, cottage garden",
    job: "Planting and maintenance",
  },
];

const VISIT = [
  ["We walk it with you", "Where the sun falls, where the water sits, what you want to keep."],
  ["We measure and photograph", "Levels, boundaries, drains and soil, so the plan is right first time."],
  ["You hear back in a week", "Ideas, a rough layout and an honest budget range."],
];

/* ------------------------------------------------------------------ */
/*  Drawn parts                                                        */
/* ------------------------------------------------------------------ */

function Mark() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" className="tt-logo-mark">
      <circle cx="16" cy="16" r="16" fill="#1d3327" />
      <path d="M16 26V12.5" stroke="#faf6ec" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 18.5c-5.2 0-7.6-2.8-7.6-7 4.6 0 7.6 2.4 7.6 7Z" fill="#faf6ec" />
      <path d="M16 15c0-4.2 2.6-7 7.4-7.6 0 5-2.6 7.6-7.4 7.6Z" fill="#e08a5f" />
      <path d="m16 23 3.4-2.2" stroke="#faf6ec" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* Deterministic pseudo-random numbers, so the planting is identical on every render. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const f1 = (n: number) => n.toFixed(1);

/** A top-down plan of the garden the walk goes through, house on the left. */
function GardenPlan() {
  const stones = Array.from({ length: 7 }, (_, i) => {
    const t = i / 6;
    return [124 + t * 108, 147 - t * 61];
  });
  const plants: [number, number, number, string][] = [
    [124, 26, 6, "#7d9a63"],
    [138, 40, 5, "#6a4c93"],
    [176, 26, 7, "#8fae6f"],
    [192, 40, 5, "#d98a9a"],
    [203, 24, 4, "#f1e9c9"],
    [122, 62, 5, "#f1e9c9"],
    [136, 80, 6, "#6a4c93"],
    [150, 66, 4.5, "#d9b76a"],
    [124, 88, 4, "#d98a9a"],
    [152, 86, 5, "#7d9a63"],
  ];
  return (
    <svg
      viewBox="0 0 320 196"
      className="tt-plan-svg"
      role="img"
      aria-label="Top-down plan of a garden: a patio by the house, raised planting beds, a lawn crossed by stepping stones and a pergola in the far corner"
    >
      <defs>
        <pattern id="tt-mow" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
          <rect width="16" height="16" fill="#b9cd96" />
          <rect width="8" height="16" fill="#abc286" />
        </pattern>
        <pattern id="tt-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="5" height="5" fill="#1d3327" />
          <rect width="1.3" height="5" fill="#44604f" />
        </pattern>
      </defs>
      {/* C: lawn fills the plot, hedge on three sides */}
      <rect x="26" y="6" width="288" height="184" rx="3" fill="url(#tt-mow)" />
      <path d="M30 9H311V187H30" className="tt-plan-hedge" />
      <path d="M30 9H311V187H30" className="tt-plan-hedge-dots" />
      {/* House, with the doors onto the patio */}
      <rect x="0" y="0" width="26" height="196" fill="url(#tt-hatch)" />
      <rect x="22.5" y="122" width="5" height="54" fill="#faf6ec" />
      {/* A: patio, table and six chairs */}
      <rect x="26" y="15" width="86" height="166" fill="#ddd6c7" />
      <path d="M26 56.5H112M26 98H112M26 139.5H112M54.7 15V181M83.3 15V181" className="tt-plan-joint" />
      <rect x="50" y="68" width="38" height="20" rx="2.5" fill="#b08d5e" />
      {[56, 69, 82].map((x) => (
        <g key={x} fill="#7c6a50">
          <circle cx={x} cy="62" r="4" />
          <circle cx={x} cy="94" r="4" />
        </g>
      ))}
      {/* B: raised oak beds and the multi-stem tree */}
      <path d="M112 15H212V52H164V100H112Z" fill="#5f7a4d" stroke="#a3764a" strokeWidth="3" strokeLinejoin="round" />
      {plants.map(([cx, cy, r, fill]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} />
      ))}
      <circle cx="156" cy="42" r="21" className="tt-plan-tree" />
      <circle cx="156" cy="42" r="2.2" fill="#1d3327" />
      {/* Stepping stones */}
      {stones.map(([x, y]) => (
        <rect
          key={x}
          x={f1(x - 6.5)}
          y={f1(y - 3.8)}
          width="13"
          height="7.6"
          rx="1.6"
          transform={`rotate(-29.5 ${f1(x)} ${f1(y)})`}
          className="tt-plan-stone"
        />
      ))}
      {/* D: pergola with the corner sofa */}
      <rect x="238" y="19" width="66" height="62" rx="1.5" fill="#e6dfcf" stroke="#a3764a" strokeWidth="2.6" />
      <path d="M249 19V81M260 19V81M271 19V81M282 19V81M293 19V81" className="tt-plan-rafter" />
      <path d="M243 24H299V36H256V76H243Z" fill="#cbbd9f" />
      <circle cx="274" cy="52" r="6.5" fill="#b3a68c" />
      {/* The route, and where you are on it */}
      <path d="M32 150H118L238 82" className="tt-plan-route" />
      <g className="tt-plan-you">
        <circle cx="32" cy="150" r="9" className="tt-plan-you-ring" />
        <circle cx="32" cy="150" r="4.5" className="tt-plan-you-dot" />
      </g>
      {/* Zone letters */}
      {(
        [
          ["A", 42, 32],
          ["B", 196, 34],
          ["C", 196, 150],
          ["D", 291, 67],
        ] as [string, number, number][]
      ).map(([letter, x, y]) => (
        <g key={letter}>
          <circle cx={x} cy={y} r="8.5" className="tt-plan-zone" />
          <text x={x} y={y + 3.4} className="tt-plan-letter">
            {letter}
          </text>
        </g>
      ))}
      {/* Scale bar */}
      <path d="M236 176H296M236 173V179M266 173V179M296 173V179" className="tt-plan-scale" />
      <text x="266" y="170" className="tt-plan-scale-text">
        0 · 2 · 4 m
      </text>
    </svg>
  );
}

/* Foreground planting for the walk: grasses, alliums and low lamps in
   silhouette, drawn once and moved faster than the garden behind. */
const CLUMPS = [
  { x: 70, h: 86, n: 17, spread: 46, plumes: 4 },
  { x: 205, h: 50, n: 10, spread: 30, plumes: 0 },
  { x: 345, h: 72, n: 14, spread: 40, plumes: 3 },
  { x: 500, h: 40, n: 8, spread: 26, plumes: 0 },
  { x: 650, h: 90, n: 19, spread: 50, plumes: 5 },
  { x: 800, h: 56, n: 11, spread: 32, plumes: 0 },
  { x: 945, h: 70, n: 14, spread: 38, plumes: 3 },
  { x: 1095, h: 44, n: 9, spread: 28, plumes: 0 },
  { x: 1225, h: 84, n: 17, spread: 46, plumes: 4 },
  { x: 1385, h: 58, n: 11, spread: 32, plumes: 2 },
  { x: 1515, h: 76, n: 15, spread: 42, plumes: 3 },
  { x: 1655, h: 46, n: 9, spread: 28, plumes: 0 },
  { x: 1775, h: 88, n: 18, spread: 44, plumes: 4 },
];
const ALLIUMS = [
  [268, 62, 6],
  [286, 48, 5],
  [570, 70, 6.5],
  [872, 58, 5.5],
  [1012, 66, 6],
  [1030, 50, 4.6],
  [1302, 60, 5.5],
  [1588, 68, 6.5],
  [1716, 54, 5],
];
const LAMPS = [140, 425, 725, 1015, 1300, 1585];

function Foreground() {
  const r = seeded(7);
  const blades: ReactNode[] = [];
  const plumes: ReactNode[] = [];
  CLUMPS.forEach((c, ci) => {
    /* Fine blades that rise from the crown, then arch outwards. */
    const count = Math.round(c.n * 2.4);
    for (let i = 0; i < count; i++) {
      const u = r() * 2 - 1;
      const lean = u * c.spread * (0.5 + r() * 0.65);
      const height = c.h * (0.42 + r() * 0.58) * (1 - Math.abs(u) * 0.2);
      const bx = c.x + u * c.spread * 0.15 + (r() - 0.5) * 3;
      const w = 0.4 + r() * 0.7;
      const tipX = bx + lean;
      const tipY = 100 - height + (Math.abs(lean) / c.spread) * height * (0.18 + r() * 0.26);
      blades.push(
        <path
          key={`b${ci}-${i}`}
          d={`M${f1(bx - w)} 101Q${f1(bx + lean * 0.06 - w)} ${f1(100 - height * 0.8)} ${f1(tipX)} ${f1(tipY)}Q${f1(bx + lean * 0.2 + w * 1.5)} ${f1(100 - height * 0.68)} ${f1(bx + w)} 101Z`}
        />,
      );
    }
    /* Seed heads on wiry stems, standing above the leaves. */
    for (let i = 0; i < c.plumes * 2; i++) {
      const lean = (r() * 2 - 1) * c.spread * 0.95;
      const height = c.h * (1 + r() * 0.24);
      const bx = c.x + (r() - 0.5) * 8;
      const cx = bx + lean * 0.2;
      const cy = 100 - height * 0.72;
      const tipX = bx + lean;
      const tipY = 100 - height + Math.abs(lean) * 0.22;
      const rot = (Math.atan2(tipY - cy, tipX - cx) * 180) / Math.PI + 90;
      plumes.push(
        <g key={`p${ci}-${i}`}>
          <path d={`M${f1(bx)} 100Q${f1(cx)} ${f1(cy)} ${f1(tipX)} ${f1(tipY)}`} className="tt-fore-stem" />
          <ellipse
            cx={f1(tipX)}
            cy={f1(tipY)}
            rx={f1(1.2 + r() * 0.7)}
            ry={f1(6 + r() * 3.5)}
            transform={`rotate(${f1(rot)} ${f1(tipX)} ${f1(tipY)})`}
          />
        </g>,
      );
    }
  });
  return (
    <svg viewBox="0 0 1820 100" className="tt-fore-svg" preserveAspectRatio="none">
      <defs>
        <radialGradient id="tt-glow">
          <stop offset="0" stopColor="#fff1c2" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#ffc46b" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffb054" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* The lamps' light sits behind the planting. */}
      {LAMPS.map((x, i) => (
        <g key={x} className="tt-lamp-light" style={{ "--i": i } as CSSProperties}>
          <circle cx={x} cy="70" r="30" fill="url(#tt-glow)" />
          <ellipse cx={x} cy="97" rx="40" ry="5" fill="#ffc46b" opacity="0.35" />
        </g>
      ))}
      <g className="tt-fore-fill">
        <path d="M0 101V94Q150 89 300 93T620 92T930 94T1240 91T1540 94T1820 92V101Z" />
        {blades}
        {plumes}
        {ALLIUMS.map(([x, h, rad]) => (
          <g key={x}>
            <path d={`M${x} 100Q${x - 3} ${100 - h * 0.5} ${x + 2} ${100 - h}`} className="tt-fore-stem" />
            <circle cx={x + 2} cy={100 - h} r={rad} className="tt-fore-allium" />
          </g>
        ))}
        {LAMPS.map((x) => (
          <g key={x}>
            <rect x={x - 1.1} y="68" width="2.2" height="33" />
            <rect x={x - 4.6} y="65" width="9.2" height="3.8" rx="1.4" />
          </g>
        ))}
      </g>
      {LAMPS.map((x, i) => (
        <rect key={x} x={x - 4} y="68.6" width="8" height="1.8" rx="0.9" className="tt-lamp-bulb" style={{ "--i": i } as CSSProperties} />
      ))}
    </svg>
  );
}

/** A leafy branch that hangs into the top of the walk. */
function Branch({ x, dir, seed }: { x: number; dir: 1 | -1; seed: number }) {
  const r = seeded(seed);
  const p0 = [x, -52];
  const p1 = [x + dir * 46, 16];
  const p2 = [x + dir * 236, 48];
  const at = (t: number) => {
    const u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
  };
  const angle = (t: number) => {
    const u = 1 - t;
    return Math.atan2(2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]), 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]));
  };
  const leaves: ReactNode[] = [];
  let side = 1;
  for (let i = 0; i < 13; i++) {
    const t = Math.min(1, 0.3 + i * 0.058);
    const [lx, ly] = at(t);
    const len = 19 + r() * 15;
    const w = len * (0.24 + r() * 0.1);
    const a = i === 12 ? angle(t) : angle(t) + side * (0.5 + r() * 0.55);
    leaves.push(
      <path
        key={i}
        d={`M0 0Q${f1(len * 0.42)} ${f1(-w)} ${f1(len)} 0Q${f1(len * 0.42)} ${f1(w)} 0 0Z`}
        transform={`translate(${f1(lx)} ${f1(ly)}) rotate(${f1((a * 180) / Math.PI)})`}
      />,
    );
    side = -side;
  }
  return (
    <g>
      <path d={`M${p0[0]} ${p0[1]}Q${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`} className="tt-branch-stem" />
      {leaves}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TallowThornPage() {
  return (
    <div className={`tt ${display.variable} ${body.variable}`}>
      {/* ---------------------------------------------------------- Header */}
      <header className="tt-header">
        <a href="#top" className="tt-logo" aria-label="Tallow and Thorn, home">
          <Mark />
          <span className="tt-logo-word">
            Tallow <i>&amp;</i> Thorn
            <small>Garden design and build</small>
          </span>
        </a>
        <nav className="tt-nav" aria-label="Main">
          <a href="#walk">The walk</a>
          <a href="#seasons">Seasons</a>
          <a href="#services">Services</a>
          <a href="#process">How it works</a>
          <a href="#gardens">Gardens</a>
        </nav>
        <a href={PHONE_HREF} className="tt-header-phone">
          <span className="tt-mono">Call the studio</span>
          {PHONE}
        </a>
        <a href="#visit" className="tt-btn tt-btn--clay tt-header-cta">
          <span>
            Book a <span className="tt-header-cta-long">garden </span>visit
          </span>
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="tt-hero" data-scrub="exit" data-loop>
          <div className="tt-wrap tt-hero-grid">
            <div className="tt-hero-copy">
              <p className="tt-mono tt-hero-kicker">
                <span className="tt-leaf" aria-hidden="true" /> Garden design · Landscaping · Planting
              </p>
              <h1 className="tt-h1">
                Gardens you will <span>actually sit in.</span>
              </h1>
              <p className="tt-hero-sub">
                Tallow &amp; Thorn design, build and plant gardens for the way you live: somewhere to eat, somewhere to
                sit and something in flower every month. One team, from first sketch to last plant.
              </p>
              <div className="tt-hero-actions">
                <a href="#visit" className="tt-btn tt-btn--clay tt-btn--lg">
                  Book a garden visit
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="tt-btn tt-btn--line tt-btn--lg">
                  Call {PHONE}
                </a>
              </div>
              <ul className="tt-hero-chips">
                <li>One team, design to planting</li>
                <li>Fixed, itemised quotes</li>
                <li>12-month plant guarantee</li>
              </ul>
              <dl className="tt-hero-facts">
                {HERO_FACTS.map(([figure, label]) => (
                  <div key={label}>
                    <dt>{figure}</dt>
                    <dd className="tt-mono">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="tt-hero-visual">
              <div className="tt-arch-frame">
                <div className="tt-arch">
                  <Image
                    src={`${M}/detail.webp`}
                    alt="A planting border of feather grasses, purple salvia and white echinacea beside a sandstone path"
                    fill
                    priority
                    sizes="(min-width: 1024px) 430px, 92vw"
                    className="tt-arch-img"
                  />
                </div>
              </div>
              <p className="tt-flower-tag">
                <span className="tt-mono">In flower now</span>
                Salvia, echinacea, sedum
              </p>

              {/* The plan every garden starts from. */}
              <aside className="tt-plan" aria-label="Sample garden plan">
                <div className="tt-plan-head">
                  <p className="tt-mono">Garden plan · sample</p>
                  <span className="tt-mono tt-plan-scale-tag">1:100</span>
                </div>
                <GardenPlan />
                <ul className="tt-plan-key">
                  {PLAN_KEY.map(([letter, zone, note]) => (
                    <li key={letter}>
                      <b>{letter}</b>
                      <span>{zone}</span>
                      <small>{note}</small>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>

          <p className="tt-hero-cue tt-mono" aria-hidden="true">
            <span className="tt-cue-stones">
              <i />
              <i />
              <i />
            </span>
            Scroll to walk the garden
          </p>
        </section>

        {/* ------------------------------------------ Signature: walk the garden */}
        <section id="walk" className="tt-walk imm-pin" data-scrub="pin" data-steps="4" style={{ "--pin": 2.5 } as CSSProperties}>
          <div className="imm-stage tt-walk-stage">
            <div className="tt-walk-view">
              <div className="tt-track">
                <div className="tt-pano">
                  <Image
                    src={`${M}/hero.webp`}
                    alt="A long garden at golden hour: a patio and dining table by the house, raised beds of grasses and flowers, a lawn crossed by stepping stones and an oak pergola with a sofa at the far end"
                    fill
                    sizes="(min-width: 900px) 2300px, 1300px"
                    className="tt-pano-img"
                  />
                </div>
              </div>
              <div className="tt-light tt-light--day" aria-hidden="true" />
              <div className="tt-light tt-light--gold" aria-hidden="true" />
              <div className="tt-light tt-light--dusk" aria-hidden="true" />

              <div className="tt-track" aria-hidden="true">
                <div className="tt-branch">
                  <svg viewBox="0 0 1600 100" className="tt-branch-svg" preserveAspectRatio="none">
                    <Branch x={380} dir={-1} seed={3} />
                    <Branch x={900} dir={1} seed={9} />
                  </svg>
                </div>
              </div>
              <div className="tt-track" aria-hidden="true">
                <div className="tt-fore">
                  <Foreground />
                </div>
              </div>

              <div className="tt-track" aria-hidden="true">
                <div className="tt-pano tt-pano--over">
                  <i className="tt-glow-pool" />
                  {FESTOON.map((b, i) => (
                    <i
                      key={`f${i}`}
                      className="tt-glow tt-glow--bulb"
                      style={{ left: `${f1(b.x)}%`, top: `${f1(b.y)}%`, "--i": i * 0.35 } as CSSProperties}
                    />
                  ))}
                  {PATH_LIGHTS.map(([x, y, s], i) => (
                    <i
                      key={`l${i}`}
                      className="tt-glow"
                      style={{ left: `${x}%`, top: `${y}%`, "--s": s, "--i": i } as CSSProperties}
                    />
                  ))}
                  {STOPS.map((s) => (
                    <div
                      key={s.n}
                      className="tt-stop"
                      style={{ left: `${s.x}%`, top: `${s.y}%`, "--t": s.t } as CSSProperties}
                    >
                      <div className="tt-stop-card">
                        <span className="tt-mono">{s.n}</span>
                        <b>{s.name}</b>
                        <small>{s.spec}</small>
                      </div>
                      <i className="tt-stop-stem" />
                      <i className="tt-stop-dot" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tt-walk-band">
              <div className="tt-wrap tt-walk-grid">
                <header className="tt-walk-head">
                  <p className="tt-mono tt-kicker">
                    The walk<span className="tt-when-on"> · scroll to stroll</span>
                  </p>
                  <h2 className="tt-h2">
                    Walk the <em>garden.</em>
                  </h2>
                </header>

                <div className="tt-walk-route">
                  <div className="tt-trail" aria-hidden="true">
                    <i className="tt-trail-fill" />
                    <span className="tt-trail-walker">
                      <i />
                    </span>
                  </div>
                  <ol className="tt-stations">
                    {STOPS.map((s) => (
                      <li key={s.n} className="tt-station">
                        <span className="tt-mono">{s.n}</span>
                        <h3>{s.name}</h3>
                        <p>{s.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="tt-walk-side">
                  <WalkClock />
                  <a href="#visit" className="tt-btn tt-btn--clay tt-walk-cta">
                    Book a garden visit
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Seasons planner */}
        <section id="seasons" className="tt-section tt-section--stone">
          <div className="tt-wrap">
            <header className="tt-head tt-head--row" data-reveal>
              <div>
                <p className="tt-mono tt-kicker">Seasons planner</p>
                <h2 className="tt-h2">
                  A garden is never <em>finished.</em>
                </h2>
              </div>
              <p className="tt-lead">
                Pick a season. This is what we are doing in our clients&rsquo; gardens then, what is in flower, and the
                best work to book.
              </p>
            </header>
            <div data-reveal style={{ "--d": "120ms" } as CSSProperties}>
              <SeasonsPlanner />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ Services */}
        <section id="services" className="tt-section tt-section--green">
          <div className="tt-wrap">
            <header className="tt-head tt-head--row" data-reveal>
              <div>
                <p className="tt-mono tt-kicker">What we do</p>
                <h2 className="tt-h2">
                  Designed, built, planted <em>and looked after.</em>
                </h2>
              </div>
              <a href="#visit" className="tt-btn tt-btn--line">
                Book a garden visit
                <Arrow />
              </a>
            </header>

            <div className="tt-services-grid">
              <div className="tt-board-wrap" data-reveal="left">
                <MaterialsBoard />
              </div>

              <div className="tt-services-col">
                <ol className="tt-services">
                  {SERVICES.map(([title, text, tag], i) => (
                    <li key={title} className="tt-service" data-reveal style={{ "--d": `${i * 70}ms` } as CSSProperties}>
                      <span className="tt-mono tt-service-n">0{i + 1}</span>
                      <div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                      <span className="tt-mono tt-service-tag">{tag}</span>
                    </li>
                  ))}
                </ol>
                <p className="tt-services-foot" data-reveal>
                  <span className="tt-mono">Not sure which you need?</span>
                  Most gardens need three or four of these. We work out which on the visit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- Process */}
        <section id="process" className="tt-section tt-section--cream">
          <div className="tt-wrap">
            <div className="tt-process-top">
              <header className="tt-head" data-reveal>
                <p className="tt-mono tt-kicker">How it works · first visit to handover</p>
                <h2 className="tt-h2">
                  Five steps down <em>the path.</em>
                </h2>
                <p className="tt-lead">
                  The same route for a courtyard or half an acre. You know the price before we dig and who is on site
                  every day.
                </p>
              </header>

              <aside className="tt-pack" aria-label="What is in the handover pack" data-reveal="right">
                <div className="tt-pack-head">
                  <p className="tt-mono">Handover pack</p>
                  <span className="tt-mono tt-pack-tab">Yours to keep</span>
                </div>
                <ul>
                  {PACK.map(([title, note]) => (
                    <li key={title}>
                      <svg viewBox="0 0 20 24" width="20" height="24" aria-hidden="true">
                        <path d="M2 1.5h10.5L18 7v15.5H2z" />
                        <path d="M12.5 1.5V7H18M5.5 12h9M5.5 15.5h9M5.5 19h5.5" />
                      </svg>
                      <b>{title}</b>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            <ol className="tt-path" data-scrub="enter">
              <li className="tt-path-line" aria-hidden="true">
                <i />
              </li>
              {STEPS.map((s, i) => (
                <li key={s.title} className="tt-step" style={{ "--i": i } as CSSProperties}>
                  <span className="tt-stone">{i + 1}</span>
                  <div className="tt-step-body">
                    <p className="tt-mono tt-step-when">{s.when}</p>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <p className="tt-step-get">
                      <span className="tt-mono">You get</span>
                      {s.get}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="tt-path-note tt-mono">Typical timings for a 60 m² garden. Yours will be on the quote.</p>
          </div>
        </section>

        {/* ------------------------------------------------------------- Projects */}
        <section id="gardens" className="tt-section tt-section--stone">
          <div className="tt-wrap">
            <header className="tt-head tt-head--row" data-reveal>
              <div>
                <p className="tt-mono tt-kicker">Recent gardens · sample projects</p>
                <h2 className="tt-h2">
                  Three gardens, <em>three briefs.</em>
                </h2>
              </div>
              <a href="#visit" className="tt-btn tt-btn--line">
                Start yours
                <Arrow />
              </a>
            </header>

            <div className="tt-projects">
              {PROJECTS.map((p, i) => (
                <article key={p.title} className="tt-project" data-reveal style={{ "--d": `${i * 100}ms` } as CSSProperties}>
                  <div className="tt-project-img">
                    <Image
                      src={`${M}/${p.img}`}
                      alt={p.alt}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 720px, 92vw" : "(min-width: 1024px) 520px, 92vw"}
                      style={{ objectPosition: p.pos }}
                    />
                    <span className="tt-mono tt-project-n">Garden 0{i + 1}</span>
                  </div>
                  <div className="tt-project-body">
                    <p className="tt-mono tt-project-brief">The brief: {p.brief}</p>
                    <h3>{p.title}</h3>
                    <dl>
                      {p.rows.map(([k, v]) => (
                        <div key={k}>
                          <dt className="tt-mono">{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- Reviews */}
        <section id="reviews" className="tt-section tt-section--cream">
          <div className="tt-wrap">
            <header className="tt-head" data-reveal>
              <p className="tt-mono tt-kicker">Sample reviews · this is a demo</p>
              <h2 className="tt-h2">
                What people say once it has <em>grown in.</em>
              </h2>
            </header>
            <ul className="tt-reviews">
              {REVIEWS.map((r, i) => (
                <li key={r.who} className="tt-review" data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties}>
                  <span className="tt-review-hole" aria-hidden="true" />
                  <span className="tt-stars" aria-label="Five stars">
                    ★★★★★
                  </span>
                  <blockquote>{r.quote}</blockquote>
                  <p className="tt-review-who">{r.who}</p>
                  <p className="tt-mono tt-review-job">{r.job}</p>
                </li>
              ))}
            </ul>
            <div className="tt-nearby" data-reveal>
              <div>
                <p className="tt-mono">See one for yourself</p>
                <p className="tt-nearby-title">
                  Ask on your visit and we will take you round a garden we built nearby.
                </p>
              </div>
              <div className="tt-nearby-actions">
                <a href="#visit" className="tt-btn tt-btn--clay">
                  Book a garden visit
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="tt-nearby-phone">
                  {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- Visit */}
        <section id="visit" className="tt-visit">
          <div className="tt-wrap tt-visit-grid">
            <div className="tt-visit-copy">
              <p className="tt-mono tt-kicker">Book a garden visit</p>
              <h2 className="tt-h1 tt-visit-title">
                Let us walk <span>yours.</span>
              </h2>
              <p className="tt-visit-sub">
                A designer comes out, walks the garden with you and listens. No charge, and no pressure to go ahead.
              </p>
              <ol className="tt-visit-steps">
                {VISIT.map(([title, text], i) => (
                  <li key={title}>
                    <span className="tt-stone tt-stone--small">{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href={PHONE_HREF} className="tt-visit-phone">
                <span className="tt-mono">Or call the studio</span>
                {PHONE}
              </a>
            </div>
            <VisitForm />
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="tt-footer">
        <div className="tt-wrap tt-footer-grid">
          <p className="tt-logo tt-logo--light">
            <Mark />
            <span className="tt-logo-word">
              Tallow <i>&amp;</i> Thorn
              <small>Garden design and build</small>
            </span>
          </p>
          <p className="tt-footer-note">
            Tallow &amp; Thorn is a fictional business. This page is a demo by Integrate Web Design, made to show the
            kind of homepage we build for landscapers and garden designers.
          </p>
          <a href="/web-design#immersive" className="tt-link">
            See the other demos
            <Arrow />
          </a>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="tt-bar">
        <a href="#visit" className="tt-btn tt-btn--clay">
          Book a garden visit
        </a>
        <a href={PHONE_HREF} className="tt-btn tt-btn--line" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
