"use client";

/**
 * Slatewell's interactive parts: the course counter in the signature scene,
 * the "find the fault" roof, and the quote form. Everything else on the page
 * is static HTML styled by roofers.css.
 */
import { useRef, useState, type FormEvent } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";

/* ------------------------------------------------------------------ */
/*  Course counter: "COURSE 07 / 09" as the roof goes on                */
/* ------------------------------------------------------------------ */

export function CourseCounter({ total }: { total: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const two = (n: number) => String(n).padStart(2, "0");
  useScrub(ref, (p) => {
    const n = Math.max(0, Math.min(total, Math.floor(p * 1.15 * total)));
    const num = ref.current?.querySelector("b");
    if (num) num.textContent = two(n);
  });
  return (
    <p ref={ref} className="rf-counter" aria-hidden="true">
      Course <b>{two(total)}</b> / {two(total)}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Find the fault                                                     */
/* ------------------------------------------------------------------ */

const FAULTS = [
  {
    id: "ridge",
    label: "Ridge",
    x: 62,
    y: 15,
    title: "Loose or missing ridge tiles",
    signs: ["Tiles rocking in high wind", "Mortar crumbs in the gutter", "Daylight in the loft along the top"],
    fix: "We lift the ridge, re-bed it and fix it mechanically, so the next storm does not take it off.",
    job: "Usually a day",
  },
  {
    id: "chimney",
    label: "Chimney",
    x: 76,
    y: 24,
    title: "Failed flashing round the chimney",
    signs: ["A brown stain on the chimney breast", "Damp that comes and goes with the rain", "Lead lifting away from the brick"],
    fix: "We cut new lead into the brickwork, step it properly and dress it tight to the slate.",
    job: "Half a day to a day",
  },
  {
    id: "valley",
    label: "Valley",
    x: 36,
    y: 40,
    title: "A leaking valley",
    signs: ["A drip where two roofs meet", "Moss and debris sat in the valley", "Wet insulation in one line"],
    fix: "We strip the valley back, renew the lead or GRP liner and re-cut the slates either side.",
    job: "One to two days",
  },
  {
    id: "gutter",
    label: "Gutter",
    x: 50,
    y: 53,
    title: "Blocked or sagging gutters",
    signs: ["Water sheeting down the wall", "Green streaks on the brick", "Joints dripping long after rain"],
    fix: "We clear, re-fall and re-bracket the run, and replace any length that has had its day.",
    job: "A morning",
  },
  {
    id: "flat",
    label: "Flat roof",
    x: 87,
    y: 68,
    title: "A tired flat roof",
    signs: ["Ponding that never dries", "Blisters or cracks in the felt", "A stain on the ceiling below"],
    fix: "We take it back to the deck, insulate, and lay a single-ply membrane with new edge trims.",
    job: "Two to three days",
  },
];

export function RoofFinder() {
  const [active, setActive] = useState("chimney");
  const fault = FAULTS.find((f) => f.id === active) ?? FAULTS[0];
  return (
    <div className="rf-finder">
      <div className="rf-house">
        <svg viewBox="0 0 600 380" className="rf-house-svg" aria-hidden="true">
          {/* walls */}
          <rect x="110" y="192" width="430" height="160" className="rf-wall" />
          <rect x="470" y="270" width="118" height="82" className="rf-wall" />
          {/* flat roof */}
          <rect x="462" y="262" width="134" height="10" rx="2" className="rf-flat" />
          {/* main slope */}
          <polygon points="86,192 226,70 522,70 566,192" className="rf-slope" />
          {/* front gable and its valleys */}
          <polygon points="150,192 232,112 314,192" className="rf-slope rf-slope--2" />
          <path d="M232 112 L226 70 M232 112 L314 192 M232 112 L150 192" className="rf-line" />
          {/* slate courses */}
          {[92, 114, 136, 158, 180].map((y) => (
            <path key={y} d={`M${226 - (y - 70) * 1.148} ${y} H${522 + (y - 70) * 0.36}`} className="rf-course-line" />
          ))}
          {/* ridge, chimney, gutter */}
          <path d="M222 70 H526" className="rf-ridge-line" />
          <rect x="430" y="34" width="44" height="64" className="rf-chimney" />
          <rect x="424" y="28" width="56" height="8" className="rf-chimney-cap" />
          <path d="M80 194 H572" className="rf-gutter" />
          {/* windows and door */}
          <rect x="150" y="230" width="60" height="70" className="rf-window" />
          <rect x="250" y="230" width="60" height="70" className="rf-window" />
          <rect x="356" y="262" width="52" height="90" className="rf-door" />
          <rect x="496" y="290" width="66" height="44" className="rf-window" />
          <path d="M60 352 H600" className="rf-ground" />
        </svg>
        {FAULTS.map((f, i) => (
          <button
            key={f.id}
            type="button"
            className="rf-spot"
            style={{ left: `${f.x}%`, top: `${f.y}%` }}
            aria-pressed={f.id === active}
            onClick={() => setActive(f.id)}
          >
            <span className="rf-spot-n">{i + 1}</span>
            <span className="rf-spot-label">{f.label}</span>
          </button>
        ))}
      </div>

      <div className="rf-fault" aria-live="polite">
        <p className="rf-mono rf-fault-kicker">
          Fault {FAULTS.indexOf(fault) + 1} of {FAULTS.length} · {fault.label}
        </p>
        <h3 className="rf-fault-title">{fault.title}</h3>
        <p className="rf-mono rf-fault-sub">What you will notice</p>
        <ul className="rf-fault-signs">
          {fault.signs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="rf-mono rf-fault-sub">What we do</p>
        <p className="rf-fault-fix">{fault.fix}</p>
        <div className="rf-fault-foot">
          <span className="rf-tag">{fault.job}</span>
          <a href="#quote" className="rf-link">
            Get this looked at
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Quote form (a demo: nothing is sent)                               */
/* ------------------------------------------------------------------ */

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <div className="rf-form rf-form--done" role="status">
        <p className="rf-mono">Demo site</p>
        <p className="rf-form-done-title">That is where a real enquiry would land.</p>
        <p>This is a demo by Integrate Web Design, so nothing was sent and no details were kept.</p>
      </div>
    );
  return (
    <form className="rf-form" onSubmit={onSubmit}>
      <p className="rf-mono rf-form-kicker">Free roof report · no obligation</p>
      <label className="rf-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Sam Taylor" required />
      </label>
      <div className="rf-field-row">
        <label className="rf-field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900123" required />
        </label>
        <label className="rf-field">
          <span>Postcode</span>
          <input type="text" name="postcode" autoComplete="postal-code" placeholder="AB1 2CD" />
        </label>
      </div>
      <label className="rf-field">
        <span>What is the roof doing?</span>
        <select name="issue" defaultValue="leak">
          <option value="leak">It is leaking</option>
          <option value="storm">Storm damage</option>
          <option value="new">I want a new roof</option>
          <option value="flat">Flat roof problem</option>
          <option value="check">Just want it checked</option>
        </select>
      </label>
      <button type="submit" className="rf-btn rf-btn--orange rf-btn--full">
        Get my roof report
        <Arrow />
      </button>
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
