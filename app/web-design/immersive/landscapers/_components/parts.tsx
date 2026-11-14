"use client";

/**
 * Tallow & Thorn's interactive parts: the clock in the signature scene, the
 * seasons planner, the materials board and the garden visit form. Everything
 * else on the page is static HTML styled by landscapers.css.
 */
import { useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  The walk's clock: afternoon to dusk as the visitor strolls          */
/* ------------------------------------------------------------------ */

export function WalkClock() {
  const ref = useRef<HTMLParagraphElement>(null);
  useScrub(ref, (p) => {
    const el = ref.current;
    if (!el) return;
    /* 16:20 at the patio doors, 21:40 under the pergola. */
    const mins = Math.round((16 * 60 + 20 + p * 320) / 5) * 5;
    const time = el.querySelector("[data-time]");
    const light = el.querySelector("[data-light]");
    if (time) time.textContent = `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
    if (light) light.textContent = p < 0.3 ? "Afternoon" : p < 0.7 ? "Golden hour" : "Dusk";
  });
  return (
    <p ref={ref} className="tt-clock" aria-hidden="true">
      <span className="tt-sun">
        <i />
      </span>
      <span className="tt-clock-read">
        <b data-time>19:10</b>
        <span data-light>Golden hour</span>
      </span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Seasons planner                                                    */
/* ------------------------------------------------------------------ */

type Season = {
  id: string;
  name: string;
  months: string;
  span: string;
  accent: string;
  title: string;
  lead: string;
  jobs: string[];
  palette: [string, string][];
  book: string;
  visits: string;
  cta: string;
};

const SEASONS: Season[] = [
  {
    id: "spring",
    name: "Spring",
    months: "Mar · Apr · May",
    span: "March to May",
    accent: "#6f8f3f",
    title: "Wake it up.",
    lead: "The busiest twelve weeks of our year. Everything done now shows by June.",
    jobs: [
      "Cut back grasses and perennials before new growth",
      "Feed, scarify and overseed tired lawns",
      "Mulch every border with 50 mm of compost",
      "Plant out the summer scheme once frosts pass",
      "Wash down paving and re-point any open joints",
    ],
    palette: [
      ["#6d2a4a", "Tulip"],
      ["#f1dc86", "Narcissus"],
      ["#b7c84a", "Euphorbia"],
      ["#7fa6d6", "Forget-me-not"],
      ["#8fb35a", "New beech"],
      ["#f3cfd3", "Blossom"],
    ],
    book: "Planting schemes and lawn renovation",
    visits: "Weekly",
    cta: "Plan my spring",
  },
  {
    id: "summer",
    name: "Summer",
    months: "Jun · Jul · Aug",
    span: "June to August",
    accent: "#c8693f",
    title: "Keep it going.",
    lead: "Dry ground and long days. This is when patios, paths and pergolas go in.",
    jobs: [
      "Mow and edge lawns weekly or fortnightly",
      "Deadhead and stake so borders keep flowering",
      "Water new planting until it has rooted in",
      "Trim hedges once nesting has finished",
      "Build patios, paths and pergolas in the dry",
    ],
    palette: [
      ["#5b3f8f", "Salvia"],
      ["#f4efe2", "Echinacea"],
      ["#9a7fc0", "Allium"],
      ["#d9b76a", "Feather grass"],
      ["#e59aa0", "Rose"],
      ["#8a86c6", "Lavender"],
    ],
    book: "Patios, paths and pergolas",
    visits: "Fortnightly",
    cta: "Plan my summer",
  },
  {
    id: "autumn",
    name: "Autumn",
    months: "Sep · Oct · Nov",
    span: "September to November",
    accent: "#a6542a",
    title: "Plant for next year.",
    lead: "Warm, damp soil is the best start a plant can get. Most of our planting happens now.",
    jobs: [
      "Plant bulbs for spring: tulips, alliums, narcissus",
      "Plant trees, hedging and shrubs while soil is warm",
      "Lay new turf and repair worn patches",
      "Lift and divide crowded perennials",
      "Clear leaves from lawns, gravel and gutters",
    ],
    palette: [
      ["#b0636a", "Sedum"],
      ["#9c2f2a", "Acer"],
      ["#e0a030", "Rudbeckia"],
      ["#a9784a", "Miscanthus"],
      ["#6f58a8", "Aster"],
      ["#b56a35", "Beech hedge"],
    ],
    book: "Trees, hedging and new turf",
    visits: "Fortnightly",
    cta: "Plan my autumn",
  },
  {
    id: "winter",
    name: "Winter",
    months: "Dec · Jan · Feb",
    span: "December to February",
    accent: "#5c7480",
    title: "Draw the plans.",
    lead: "The garden rests and the drawing board does not. Design now and we can build in spring.",
    jobs: [
      "Survey, design and planting plans drawn up",
      "Prune fruit trees, roses and wisteria",
      "Plant bare-root hedging and trees",
      "Clean and oil timber, check every fixing",
      "Leave seed heads standing for frost and birds",
    ],
    palette: [
      ["#b23a32", "Dogwood"],
      ["#d9c7cf", "Hellebore"],
      ["#23402f", "Yew"],
      ["#cdbf9f", "Seed heads"],
      ["#f6f5ee", "Snowdrop"],
      ["#d8d4c8", "Birch bark"],
    ],
    book: "Design, so the build starts in spring",
    visits: "Monthly",
    cta: "Plan my winter",
  },
];

function SeasonIcon({ id }: { id: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="tt-season-icon">
      {id === "spring" && (
        <g {...common}>
          <path d="M12 21v-9" />
          <path d="M12 13c-4.5 0-7-2.6-7-6.5 4.4 0 7 2.4 7 6.5Z" />
          <path d="M12 10.5c0-3.6 2.3-6 6.5-6.5 0 4.4-2.4 6.5-6.5 6.5Z" />
        </g>
      )}
      {id === "summer" && (
        <g {...common}>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
        </g>
      )}
      {id === "autumn" && (
        <g {...common}>
          <path d="M5 19c0-8 4.5-14 14-14 0 9.5-6 14-14 14Z" />
          <path d="M5 19 14 10M9.5 14.5V10M9.5 14.5H14" />
        </g>
      )}
      {id === "winter" && (
        <g {...common}>
          <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
          <path d="M9.6 4.6 12 7l2.4-2.4M9.6 19.4 12 17l2.4 2.4" />
        </g>
      )}
    </svg>
  );
}

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/** A year ring: twelve months round a dial, the season's quarter picked out. */
function YearRing({ index, name }: { index: number; name: string }) {
  const r = 39;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 120 120" className="tt-ring" aria-hidden="true">
      <circle cx="60" cy="60" r={r} className="tt-ring-track" />
      <circle
        cx="60"
        cy="60"
        r={r}
        className="tt-ring-arc"
        strokeDasharray={`${(c / 4 - 3).toFixed(2)} ${((c * 3) / 4 + 3).toFixed(2)}`}
        style={{ "--tt-turn": `${index * 90 - 30}deg` } as CSSProperties}
      />
      {MONTHS.map((m, i) => {
        const a = ((i * 30 + 15 - 90) * Math.PI) / 180;
        const on = Math.floor(((i + 10) % 12) / 3) === index;
        return (
          <text
            key={i}
            x={(60 + Math.cos(a) * 53).toFixed(2)}
            y={(60 + Math.sin(a) * 53 + 2.6).toFixed(2)}
            className={on ? "tt-ring-month tt-ring-month--on" : "tt-ring-month"}
          >
            {m}
          </text>
        );
      })}
      <text x="60" y="57" className="tt-ring-label">
        {name}
      </text>
      <text x="60" y="69" className="tt-ring-sub">
        in the garden
      </text>
    </svg>
  );
}

export function SeasonsPlanner() {
  const [active, setActive] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const season = SEASONS[active];

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    const move = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!move) return;
    e.preventDefault();
    const next = (active + move + SEASONS.length) % SEASONS.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="tt-seasons" style={{ "--tt-acc": season.accent } as CSSProperties}>
      <div className="tt-season-tabs" role="tablist" aria-label="Choose a season">
        {SEASONS.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tt-tab-${s.id}`}
            className="tt-season-tab"
            aria-selected={i === active}
            aria-controls="tt-season-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
          >
            <SeasonIcon id={s.id} />
            <span className="tt-season-name">{s.name}</span>
            <span className="tt-mono tt-season-months">{s.months}</span>
          </button>
        ))}
      </div>

      <div className="tt-season-panel" role="tabpanel" id="tt-season-panel" aria-labelledby={`tt-tab-${season.id}`}>
        <div className="tt-season-main" key={season.id}>
          <p className="tt-mono tt-season-kicker">
            <i /> In the garden · {season.span}
          </p>
          <h3 className="tt-season-title">{season.title}</h3>
          <p className="tt-season-lead">{season.lead}</p>
          <ul className="tt-checks">
            {season.jobs.map((job, i) => (
              <li key={job} style={{ "--i": i } as CSSProperties}>
                <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                  <circle cx="10" cy="10" r="10" />
                  <path d="m5.8 10.4 2.8 2.8 5.6-6" />
                </svg>
                {job}
              </li>
            ))}
          </ul>
        </div>

        <div className="tt-season-side">
          <div className="tt-season-dial">
            <YearRing index={active} name={season.name} />
            <dl className="tt-season-facts">
              <div>
                <dt className="tt-mono">Our visits</dt>
                <dd>{season.visits}</dd>
              </div>
              <div>
                <dt className="tt-mono">Good time to book</dt>
                <dd>{season.book}</dd>
              </div>
            </dl>
          </div>
          <div className="tt-palette">
            <p className="tt-mono">Planting palette · {season.name.toLowerCase()}</p>
            <ul key={season.id}>
              {season.palette.map(([colour, plant], i) => (
                <li key={plant} style={{ "--i": i } as CSSProperties}>
                  <span className="tt-chip" style={{ background: colour }} />
                  {plant}
                </li>
              ))}
            </ul>
          </div>
          <a href="#visit" className="tt-btn tt-btn--clay tt-btn--full">
            {season.cta}
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Materials board                                                    */
/* ------------------------------------------------------------------ */

const MATERIALS = [
  {
    id: "porcelain",
    name: "Porcelain",
    spec: "20 mm · large format",
    where: "Patios and terraces straight off the house.",
    wears: "Does not stain or fade and wipes clean, so it suits where you eat.",
    pairs: "Oak, corten and soft grasses",
  },
  {
    id: "sandstone",
    name: "Sandstone",
    spec: "Riven · hand-cut edges",
    where: "Paths, steps and cottage terraces.",
    wears: "Mellows with weather. We seal it once so it stays warm, not green.",
    pairs: "Brick, gravel and lavender",
  },
  {
    id: "oak",
    name: "Oak sleepers",
    spec: "Green oak · 200 x 100 mm",
    where: "Raised beds, steps and retaining edges.",
    wears: "Silvers within two summers and lasts for decades in the ground.",
    pairs: "Porcelain and tall grasses",
  },
  {
    id: "corten",
    name: "Corten steel",
    spec: "3 mm weathering steel",
    where: "Edging, planters, water bowls and fire bowls.",
    wears: "Rusts to a stable orange coat in a few months, then stops.",
    pairs: "Gravel and dark foliage",
  },
  {
    id: "gravel",
    name: "Gravel",
    spec: "10 mm · on a stabilising grid",
    where: "Side paths, drives and dry planting.",
    wears: "Drains freely, so no puddles. Wants a rake twice a year.",
    pairs: "Corten edging and thyme",
  },
];

export function MaterialsBoard() {
  const [active, setActive] = useState("porcelain");
  const material = MATERIALS.find((m) => m.id === active) ?? MATERIALS[0];
  const index = MATERIALS.indexOf(material);
  return (
    <div className="tt-board">
      <div className="tt-board-head">
        <p className="tt-mono">Materials board</p>
        <span className="tt-mono tt-board-no">Tap a sample</span>
      </div>
      <div className="tt-board-tray">
        {MATERIALS.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className={`tt-sw tt-sw--${m.id}`}
            aria-pressed={m.id === active}
            aria-label={`${m.name}: show details`}
            onClick={() => setActive(m.id)}
          >
            <span className="tt-sw-face" aria-hidden="true" />
            <span className="tt-sw-tag tt-mono" aria-hidden="true">
              <b>{String.fromCharCode(65 + i)}</b> {m.name}
            </span>
          </button>
        ))}
      </div>
      <div className="tt-board-note" aria-live="polite" key={material.id}>
        <div className="tt-board-note-head">
          <h3>{material.name}</h3>
          <span className="tt-mono">
            {String.fromCharCode(65 + index)} · {material.spec}
          </span>
        </div>
        <dl>
          <div>
            <dt className="tt-mono">Used for</dt>
            <dd>{material.where}</dd>
          </div>
          <div>
            <dt className="tt-mono">Wears</dt>
            <dd>{material.wears}</dd>
          </div>
          <div>
            <dt className="tt-mono">Pairs with</dt>
            <dd>{material.pairs}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Garden visit form (a demo: nothing is sent)                        */
/* ------------------------------------------------------------------ */

export function VisitForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <div className="tt-form tt-form--done" role="status">
        <p className="tt-mono tt-form-kicker">This is a demo</p>
        <p className="tt-form-done-title">That is where a real enquiry would land.</p>
        <p>Tallow &amp; Thorn is a made-up business, so nothing was sent and no details were kept.</p>
      </div>
    );
  return (
    <form className="tt-form" onSubmit={onSubmit}>
      <p className="tt-mono tt-form-kicker">Garden visit · free, about an hour</p>
      <label className="tt-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Sam Taylor" required />
      </label>
      <div className="tt-field-row">
        <label className="tt-field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900123" required />
        </label>
        <label className="tt-field">
          <span>Village or area</span>
          <input type="text" name="area" placeholder="Where is the garden?" />
        </label>
      </div>
      <label className="tt-field">
        <span>What are you thinking of?</span>
        <select name="project" defaultValue="design">
          <option value="design">A whole new garden</option>
          <option value="patio">A patio or paths</option>
          <option value="planting">Planting and borders</option>
          <option value="lawn">A better lawn</option>
          <option value="lighting">Garden lighting</option>
          <option value="care">Regular maintenance</option>
        </select>
      </label>
      <button type="submit" className="tt-btn tt-btn--clay tt-btn--full tt-btn--lg">
        Book my garden visit
        <Arrow />
      </button>
      <p className="tt-form-note">No charge and no hard sell. We reply within one working day.</p>
    </form>
  );
}
