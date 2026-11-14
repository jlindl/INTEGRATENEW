"use client";

/**
 * Fenwick & Rowe's interactive parts: the programme readout in the signature
 * scene's title block, the "what are you building?" project picker, and the
 * site visit form. Everything else is static HTML styled by builders.css.
 */
import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";
import { Arrow, MiniDrawing, type MiniKind } from "./drawings";

/* ------------------------------------------------------------------ */
/*  Title block readout: week and status follow the build              */
/* ------------------------------------------------------------------ */

const WEEKS = 12;
const two = (n: number) => String(n).padStart(2, "0");

function statusAt(p: number) {
  if (p < 0.17) return "For approval";
  if (p < 0.97) return "On site";
  return "Handed over";
}

export function BuildReadout() {
  const ref = useRef<HTMLDivElement>(null);
  useScrub(ref, (p) => {
    const host = ref.current;
    if (!host) return;
    const week = host.querySelector("[data-week]");
    const status = host.querySelector("[data-status]");
    if (week) week.textContent = two(Math.round(p * WEEKS));
    if (status) status.textContent = statusAt(p);
  });
  return (
    <div ref={ref} className="fr-stb-live">
      <div>
        <span>Programme</span>
        Wk <b data-week>{two(WEEKS)}</b> / {two(WEEKS)}
      </div>
      <div>
        <span>Status</span>
        <b data-status>Handed over</b>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Project picker                                                     */
/* ------------------------------------------------------------------ */

type Stage = [name: string, weight: number, kind: "pre" | "site" | "end"];

type Project = {
  id: MiniKind;
  sheet: string;
  tab: string;
  title: string;
  blurb: string;
  key: string;
  involved: string[];
  handle: [who: string, what: string][];
  stages: Stage[];
  onSite: string;
};

const PROJECTS: Project[] = [
  {
    id: "rear",
    sheet: "A-101",
    tab: "Rear extension",
    title: "Single-storey rear extension",
    blurb: "A new room across the back of the house. Usually a kitchen-diner that opens on to the garden.",
    key: "House in thin line. New extension in brick.",
    involved: [
      "Foundations and a new insulated floor slab",
      "Brick and block walls matched to the house",
      "Flat or pitched roof, often with a lantern",
      "Steel beam and knock-through to the old room",
      "Wide doors, electrics, plaster and floor",
    ],
    handle: [
      ["Drawings", "Measured survey and full plans"],
      ["Planning", "Often permitted development. We check, and apply if needed"],
      ["Building control", "Application, inspections, completion certificate"],
      ["Structural engineer", "Beam and foundation calculations"],
      ["Every trade", "Groundworks to decoration, on one programme"],
    ],
    stages: [
      ["Design", 3, "pre"],
      ["Approvals", 4, "pre"],
      ["Groundworks", 2, "site"],
      ["Shell and roof", 4, "site"],
      ["Fit-out", 4, "site"],
      ["Handover", 1, "end"],
    ],
    onSite: "Typically 10 to 14 weeks on site",
  },
  {
    id: "side",
    sheet: "A-102",
    tab: "Side return",
    title: "Side return extension",
    blurb: "The narrow alley beside a terrace kitchen, filled in to make one wide, bright room.",
    key: "Terrace in thin line. New infill in brick.",
    involved: [
      "Foundations along the boundary",
      "New side wall, built off your side of the line",
      "Glazed or part-glazed roof to keep the light",
      "Steel frame so the old side wall can come out",
      "Kitchen space made good, floor to ceiling",
    ],
    handle: [
      ["Drawings", "Measured survey and full plans"],
      ["Planning", "Often permitted development. We check, and apply if needed"],
      ["Party wall", "Notices served and a surveyor arranged"],
      ["Building control", "Application, inspections, completion certificate"],
      ["Structural engineer", "Steel frame and foundation calculations"],
    ],
    stages: [
      ["Design", 3, "pre"],
      ["Approvals and notices", 5, "pre"],
      ["Groundworks", 2, "site"],
      ["Shell and roof", 3, "site"],
      ["Fit-out", 4, "site"],
      ["Handover", 1, "end"],
    ],
    onSite: "Typically 10 to 12 weeks on site",
  },
  {
    id: "loft",
    sheet: "A-103",
    tab: "Loft or garage conversion",
    title: "Loft or garage conversion",
    blurb: "A bedroom in the roof, or a proper room where the car never goes. Space you already own.",
    key: "House in thin line. Dormer and infill in brick.",
    involved: [
      "New floor structure, steels and stairs for a loft",
      "Dormer or rooflights, insulated to current standards",
      "Garage door infilled in matching brick",
      "Fire doors, escape windows and alarms as required",
      "Electrics, heating, plaster and decoration",
    ],
    handle: [
      ["Drawings", "Survey, plans and sections"],
      ["Planning", "Many are permitted development. We confirm before work starts"],
      ["Building control", "Application, inspections, completion certificate"],
      ["Structural engineer", "Floor, steel and roof calculations"],
      ["Every trade", "Carpenters to decorators, on one programme"],
    ],
    stages: [
      ["Design", 2, "pre"],
      ["Approvals", 3, "pre"],
      ["Structure", 3, "site"],
      ["Weathertight", 2, "site"],
      ["Fit-out", 4, "site"],
      ["Handover", 1, "end"],
    ],
    onSite: "Typically 4 to 10 weeks on site",
  },
  {
    id: "reno",
    sheet: "A-104",
    tab: "Full renovation",
    title: "Full renovation",
    blurb: "A tired house taken back to the brick and put right, room by room, in the right order.",
    key: "1 Kitchen. 2 Living. 3 Bedrooms. 4 Bathroom. 5 Roof.",
    involved: [
      "Strip-out and structural alterations",
      "Rewire, new heating and plumbing throughout",
      "Insulation, plastering and new floors",
      "Kitchen and bathrooms fitted",
      "Decoration, snagging and a proper handover",
    ],
    handle: [
      ["Drawings", "Layouts and a room-by-room specification"],
      ["Schedule of works", "Itemised, so you can see what every part covers"],
      ["Building control", "For structure, electrics, heating and drainage"],
      ["Structural engineer", "For any wall that is coming out"],
      ["Every trade", "One programme, one site manager"],
    ],
    stages: [
      ["Survey and design", 3, "pre"],
      ["Strip-out", 2, "site"],
      ["Structure", 3, "site"],
      ["First fix", 3, "site"],
      ["Second fix", 4, "site"],
      ["Decoration and handover", 2, "end"],
    ],
    onSite: "Typically 4 to 6 months, depending on the house",
  },
];

export function ProjectPicker() {
  const [active, setActive] = useState<MiniKind>("rear");
  const project = PROJECTS.find((p) => p.id === active) ?? PROJECTS[0];

  return (
    <div className="fr-picker">
      <div className="fr-tabs" role="group" aria-label="Project type">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="fr-tab"
            aria-pressed={p.id === active}
            onClick={() => setActive(p.id)}
          >
            <span className="fr-mono fr-tab-no">{p.sheet}</span>
            <span className="fr-tab-name">{p.tab}</span>
          </button>
        ))}
      </div>

      <div className="fr-sheet" aria-live="polite">
        <div key={project.id} className="fr-sheet-body">
          <div className="fr-sheet-draw">
            <div className="fr-sheet-fig">
              <MiniDrawing kind={project.id} />
              <span className="fr-mono fr-sheet-scale">Not to scale</span>
            </div>
            <p className="fr-mono fr-sheet-key">{project.key}</p>
            <h3 className="fr-sheet-title">{project.title}</h3>
            <p className="fr-sheet-blurb">{project.blurb}</p>
          </div>

          <div className="fr-sheet-col">
            <p className="fr-mono fr-sheet-label">What is involved</p>
            <ol className="fr-involved">
              {project.involved.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>

          <div className="fr-sheet-col">
            <p className="fr-mono fr-sheet-label">We handle for you</p>
            <ul className="fr-handle">
              {project.handle.map(([who, what]) => (
                <li key={who}>
                  <b>{who}</b>
                  <span>{what}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fr-stages">
            <div className="fr-stages-head">
              <p className="fr-mono fr-sheet-label">Typical stages</p>
              <p className="fr-mono fr-stages-note">{project.onSite}</p>
            </div>
            <div className="fr-stagebar" aria-hidden="true">
              {project.stages.map(([name, weight, kind], n) => (
                <span
                  key={name}
                  className={`fr-seg fr-seg--${kind}`}
                  style={{ flexGrow: weight, "--i": n } as CSSProperties}
                >
                  {n + 1}
                </span>
              ))}
            </div>
            <ol className="fr-stagekey">
              {project.stages.map(([name, , kind]) => (
                <li key={name} className={`fr-key fr-key--${kind}`}>
                  {name}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="fr-sheet-foot">
          <dl className="fr-sheet-tb">
            <div>
              <dt>Sheet</dt>
              <dd>{project.sheet}</dd>
            </div>
            <div>
              <dt>Project type</dt>
              <dd>{project.tab}</dd>
            </div>
            <div className="fr-sheet-tb-x">
              <dt>Status</dt>
              <dd>Typical. Yours is drawn for your house</dd>
            </div>
          </dl>
          <a href="#visit" className="fr-btn fr-btn--brick">
            Book a site visit
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Site visit form (a demo: nothing is sent)                          */
/* ------------------------------------------------------------------ */

export function VisitForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <div className="fr-form fr-form--done" role="status">
        <p className="fr-mono fr-form-kicker">This is a demo</p>
        <p className="fr-form-done-title">That is where a real enquiry would land.</p>
        <p>
          Fenwick &amp; Rowe is a made-up builder and this page is a demo by Integrate Web Design. Nothing was sent and
          no details were kept.
        </p>
      </div>
    );
  return (
    <form className="fr-form" onSubmit={onSubmit}>
      <div className="fr-form-head">
        <p className="fr-mono fr-form-kicker">Site visit request</p>
        <p className="fr-mono">Form SV-01</p>
      </div>
      <label className="fr-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Sam Taylor" required />
      </label>
      <label className="fr-field">
        <span>Phone</span>
        <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900123" required />
      </label>
      <div className="fr-field-row">
        <label className="fr-field">
          <span>What are you building?</span>
          <select name="project" defaultValue="rear">
            <option value="rear">Rear extension</option>
            <option value="side">Side return</option>
            <option value="loft">Loft conversion</option>
            <option value="garage">Garage conversion</option>
            <option value="reno">Full renovation</option>
            <option value="other">Something else</option>
          </select>
        </label>
        <label className="fr-field">
          <span>Best time to visit</span>
          <select name="when" defaultValue="day">
            <option value="day">Weekday, daytime</option>
            <option value="eve">Weekday, after five</option>
            <option value="sat">Saturday morning</option>
          </select>
        </label>
      </div>
      <button type="submit" className="fr-btn fr-btn--brick fr-btn--full">
        Request a site visit
        <Arrow />
      </button>
      <p className="fr-form-note">Free visit. Written quote within ten working days.</p>
    </form>
  );
}
