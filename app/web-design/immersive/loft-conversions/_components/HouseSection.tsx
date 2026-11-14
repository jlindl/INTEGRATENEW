/**
 * The house in section for the "Go up" scene: ground floor, first floor,
 * loft and pitched roof. A server component, pure SVG.
 *
 * Two layers. The line drawing only changes with the scene's step (the room
 * that is lit). The effects layer (stars, rooflight glow, warm fill and the
 * marker climbing the stairs) is driven by --p in loft-conversions.css.
 *
 * Drawing units: 600 wide, 1100 tall. Floors at y = 1050, 760 and 470.
 */
import type { CSSProperties } from "react";

const STEPS = 12;
const GOING = 260 / STEPS;
const RISE = 290 / STEPS;
const n = (v: number) => v.toFixed(2);

/** A flight of twelve steps rising to the right from (x, y), closed underneath. */
function flight(x: number, y: number) {
  let d = `M${x} ${y}`;
  for (let i = 0; i < STEPS; i++) d += ` v${n(-RISE)} h${n(GOING)}`;
  return `${d} v16 L${x + 24} ${y} Z`;
}

/** Balusters from every other tread up to the handrail. */
function balusters(x: number, y: number) {
  const out: string[] = [];
  for (let i = 1; i <= STEPS; i += 2) {
    const bx = x + (i - 0.5) * GOING;
    const tread = y - i * RISE;
    const rail = y - 74 - (bx - x) * (290 / 260);
    out.push(`M${n(bx)} ${n(tread)} V${n(rail)}`);
  }
  return out.join(" ");
}

const STARS: [number, number, number][] = [
  [34, 28, 1.5], [88, 62, 1.1], [142, 22, 1.3], [196, 84, 1], [238, 40, 1.7], [292, 18, 1.1],
  [332, 66, 1.3], [378, 30, 1], [424, 92, 1.4], [458, 44, 1.1], [552, 26, 1.3], [578, 96, 1],
  [60, 118, 1.1], [118, 146, 1.4], [176, 128, 0.9], [244, 132, 1.1], [356, 118, 1.2], [410, 150, 1],
  [472, 134, 1.5], [536, 150, 1.1], [26, 186, 1.3], [92, 214, 1], [150, 196, 1.2], [20, 268, 1.1],
  [84, 292, 1.4], [40, 352, 1], [118, 262, 0.9], [30, 420, 1.2], [456, 206, 1.1], [520, 222, 1.4],
  [574, 198, 1], [498, 286, 1.1], [566, 302, 1.3], [540, 366, 1], [580, 410, 1.2], [486, 170, 0.9],
];

/* The room the loft becomes: knee walls, slopes and a flat collar ceiling. */
const ROOM = "118,470 118,415 247.2,265.25 352.8,265.25 482,415 482,470";

export function HouseSection() {
  return (
    <>
      <svg className="ul-house-base" viewBox="0 0 600 1100" aria-hidden="true">
        <defs>
          <linearGradient id="ul-g-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#080b1d" />
            <stop offset="0.45" stopColor="#161b3b" />
            <stop offset="1" stopColor="#2c305f" />
          </linearGradient>
          <linearGradient id="ul-g-room" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffc56b" stopOpacity="0.2" />
            <stop offset="1" stopColor="#ffc56b" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="ul-g-lamp">
            <stop offset="0" stopColor="#ffc56b" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffc56b" stopOpacity="0" />
          </radialGradient>
          <pattern id="ul-p-earth" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#9fc3e8" strokeOpacity="0.16" strokeWidth="1.5" />
          </pattern>
        </defs>

        {/* sky, then the ground it stands on */}
        <rect width="600" height="1050" fill="url(#ul-g-sky)" />
        <rect y="1050" width="600" height="50" fill="#080b1d" />
        <rect y="1050" width="600" height="50" fill="url(#ul-p-earth)" />

        {/* the street: a lamp and the doorstep */}
        <circle cx="46" cy="894" r="34" fill="url(#ul-g-lamp)" />
        <path d="M26 1050 V900 q0 -12 12 -12 h4" className="ul-ln ul-ln--dim" />
        <rect x="38" y="884" width="14" height="7" rx="2" fill="#ffc56b" />
        <rect x="52" y="1041" width="18" height="9" fill="#3b3f73" />
        <path d="M0 1050 H70 M530 1050 H600" className="ul-ln" />

        {/* the garden */}
        <path d="M590 1050 V930" className="ul-ln ul-ln--dim" />
        <circle cx="590" cy="906" r="30" className="ul-leaf" />

        {/* rooms: the lit floor follows the scene's step */}
        <rect x="84" y="776" width="432" height="274" fill="url(#ul-g-room)" className="ul-room ul-room--g" />
        <rect x="84" y="486" width="432" height="274" fill="url(#ul-g-room)" className="ul-room ul-room--1" />

        {/* walls, with openings for the door, windows and garden doors */}
        <g className="ul-wall">
          <rect x="70" y="448" width="14" height="112" />
          <rect x="70" y="690" width="14" height="260" />
          <rect x="516" y="448" width="14" height="112" />
          <rect x="516" y="690" width="14" height="190" />
        </g>
        <path d="M77 560 V690 M523 560 V690 M523 880 V1050" className="ul-glass" />
        <path d="M62 690 h30 M508 690 h30 M508 880 h30" className="ul-ln" />
        <rect x="73" y="952" width="8" height="98" rx="1.5" className="ul-door" />

        {/* floors */}
        <g className="ul-wall">
          <rect x="70" y="470" width="460" height="16" />
          <rect x="70" y="760" width="460" height="16" />
        </g>
        <rect x="70" y="1050" width="460" height="12" fill="#262a55" />
        <rect x="62" y="1062" width="30" height="18" fill="#262a55" />
        <rect x="508" y="1062" width="30" height="18" fill="#262a55" />
        {/* stairwells */}
        <rect x="246" y="471" width="114" height="14" fill="#0a0d20" />
        <rect x="246" y="761" width="114" height="14" fill="#0a0d20" />

        {/* chimney, then the roof over it */}
        <path d="M318 142 h32 v98 l-32 -38 Z" className="ul-wall" />
        <path d="M323 142 v-13 h8 v13 M337 142 v-13 h8 v13" className="ul-ln" />
        <polygon points="300,204 71,470 529,470" fill="#080b1d" />
        <polygon points="50,470 300,180 550,470 529,470 300,204 71,470" className="ul-wall" />
        <path d="M46 468 L300 173 L554 468" className="ul-tiles" />
        {/* rooflights, unlit */}
        <path d="M195 298.7 L139 363.7 M405 298.7 L461 363.7" className="ul-rooflight" />

        {/* the loft as it is now: insulation, a tank, boxes, one bare bulb */}
        <path
          d="M82 466 l7 -9 l7 9 l7 -9 l7 9 M490 466 l7 -9 l7 9 l7 -9 l7 9"
          className="ul-ln ul-ln--dim"
        />
        <polygon points={ROOM} className="ul-ln ul-ln--dash" />
        <g className="ul-ln ul-ln--dim">
          <rect x="150" y="424" width="62" height="46" rx="3" />
          <path d="M150 436 h62 M212 448 h22 v22" />
          <rect x="372" y="438" width="40" height="32" />
          <rect x="414" y="448" width="30" height="22" />
          <rect x="380" y="414" width="28" height="24" />
          <path d="M372 452 h40 M380 424 h28" />
          <path d="M300 265 V300" />
        </g>
        <circle cx="300" cy="306" r="5" fill="#ffc56b" fillOpacity="0.5" />

        {/* the stair you have */}
        <path d={flight(100, 1050)} className="ul-stair" />
        <path d="M100 1050 V974 M360 760 V684 M100 976 L360 686" className="ul-ln" />

        {/* ground floor: sofa, lamp, picture */}
        <circle cx="384" cy="948" r="38" fill="url(#ul-g-lamp)" />
        <path d="M384 1050 V962" className="ul-ln" />
        <path d="M372 962 h24 l-5 -22 h-14 Z" fill="#ffc56b" fillOpacity="0.85" />
        <g className="ul-furn">
          <rect x="408" y="986" width="96" height="42" rx="12" />
          <rect x="400" y="1012" width="112" height="26" rx="9" />
          <path d="M408 1038 v12 M504 1038 v12" />
          <rect x="430" y="896" width="52" height="38" rx="2" />
        </g>
        <path d="M438 926 l12 -14 l9 9 l8 -7 l8 12" className="ul-ln ul-ln--dim" />

        {/* first floor: bed, lamp, picture */}
        <circle cx="386" cy="716" r="30" fill="url(#ul-g-lamp)" />
        <g className="ul-furn">
          <rect x="378" y="732" width="18" height="28" rx="2" />
          <rect x="404" y="738" width="104" height="22" rx="3" />
          <rect x="400" y="720" width="108" height="20" rx="7" />
          <rect x="500" y="690" width="9" height="70" rx="3" />
          <rect x="470" y="710" width="28" height="12" rx="6" />
          <rect x="426" y="610" width="44" height="34" rx="2" />
        </g>
        <path d="M380 732 h14 l-3 -14 h-8 Z" fill="#ffc56b" fillOpacity="0.85" />

        {/* the new stair, over the old one */}
        <path d={flight(100, 760)} className="ul-stair ul-stair--new" />
        <path d={`M100 760 V684 M360 470 V394 M100 686 L360 396 ${balusters(100, 760)}`} className="ul-ln ul-ln--new" />

        {/* finished floor levels */}
        <g className="ul-level">
          <path d="M534 470 h22 M534 760 h22 M534 1050 h22" />
          <path d="M545 470 l-5 -8 h10 Z M545 760 l-5 -8 h10 Z M545 1050 l-5 -8 h10 Z" />
        </g>
      </svg>

      <svg className="ul-house-fx" viewBox="0 0 600 1100" aria-hidden="true">
        <defs>
          <radialGradient id="ul-g-warm" cx="0.5" cy="0.62" r="0.62">
            <stop offset="0" stopColor="#ffc56b" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffc56b" stopOpacity="0.22" />
          </radialGradient>
          <radialGradient id="ul-g-bloom">
            <stop offset="0" stopColor="#ffc56b" stopOpacity="0.34" />
            <stop offset="1" stopColor="#ffc56b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ul-g-beam-l" x1="167" y1="331" x2="106" y2="278" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffc56b" stopOpacity="0.34" />
            <stop offset="1" stopColor="#ffc56b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ul-g-beam-r" x1="433" y1="331" x2="494" y2="278" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffc56b" stopOpacity="0.34" />
            <stop offset="1" stopColor="#ffc56b" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="ul-fx-stars">
          {STARS.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} className="ul-star" style={{ "--i": i } as CSSProperties} />
          ))}
          <path d="M498 58 A24 24 0 1 0 528 96 A19 19 0 1 1 498 58 Z" className="ul-moon" />
        </g>

        <g className="ul-fx-fill">
          <ellipse cx="300" cy="380" rx="300" ry="210" fill="url(#ul-g-bloom)" />
          <polygon points={ROOM} fill="url(#ul-g-warm)" />
        </g>

        <g className="ul-fx-lights">
          <polygon points="195,298.7 139,363.7 78,312 138,244" fill="url(#ul-g-beam-l)" />
          <polygon points="405,298.7 461,363.7 522,312 462,244" fill="url(#ul-g-beam-r)" />
          <path d="M195 298.7 L139 363.7 M405 298.7 L461 363.7" className="ul-rooflight ul-rooflight--lit" />
        </g>

        <g className="ul-climber">
          <circle cy="-13" r="16" fill="url(#ul-g-lamp)" />
          <circle cy="-13" r="6" fill="#ffc56b" />
          <circle cy="-13" r="2.2" fill="#151a36" />
        </g>
      </svg>
    </>
  );
}
