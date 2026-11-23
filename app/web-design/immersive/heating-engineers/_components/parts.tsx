"use client";

/**
 * Emberline's interactive parts: the thermostat in the signature scene, the
 * boiler symptom checker, the care plan with its service report, and the
 * booking form. Everything else on the page is static HTML styled by
 * heating-engineers.css.
 */
import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";

const PHONE = "01632 960 284";
const PHONE_HREF = "tel:01632960284";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Every figure on the page is set in the mono face, including those inside a sentence. */
function withNums(text: string): ReactNode[] {
  return text.split(/(\d+(?:\.\d+)?)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="eh-num">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The round arrow chip that ends every primary button. */
export function Go() {
  return (
    <span className="eh-arrow">
      <Arrow />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  The thermostat: 12 to 21 degrees as the scene is scrolled          */
/* ------------------------------------------------------------------ */

const TICKS = 37; // 12 to 21 in quarter degrees
const STOPS = [
  [207, 227, 245],
  [255, 179, 71],
  [255, 122, 47],
] as const;

/** Ice to amber to ember, so the lit part of the scale reads cold to hot. */
function tickColour(t: number) {
  const seg = t < 0.5 ? 0 : 1;
  const k = seg === 0 ? t / 0.5 : (t - 0.5) / 0.5;
  const a = STOPS[seg];
  const b = STOPS[seg + 1];
  const mix = (i: number) => Math.round(a[i] + (b[i] - a[i]) * k);
  return `rgb(${mix(0)} ${mix(1)} ${mix(2)})`;
}

export function Thermostat() {
  const ref = useRef<HTMLDivElement>(null);
  const cells = useRef<Record<string, Element | null>>({});

  useScrub(ref, (p) => {
    const root = ref.current;
    if (!root) return;
    const write = (key: string, text: string) => {
      const el = (cells.current[key] ??= root.querySelector(`[data-eh="${key}"]`));
      if (el && el.textContent !== text) el.textContent = text;
    };
    const dp = clamp01((p - 0.1) / 0.8);
    const [whole, tenth] = (12 + 9 * dp).toFixed(1).split(".");
    write("whole", whole);
    write("tenth", `.${tenth}°`);
    write("state", p < 0.1 ? "Calling for heat" : p < 0.9 ? "Boiler firing" : "Holding steady");
    write("boiler", p < 0.1 ? "Standby" : p < 0.9 ? "Firing" : "Holding");
    write("flow", `${Math.round(18 + 44 * clamp01((p - 0.1) / 0.45))}°`);
    write("bar", `${(0.6 + 0.8 * clamp01(p / 0.3)).toFixed(1)} bar`);
  });

  return (
    <div ref={ref} className="eh-dial-wrap" aria-hidden="true">
      <div className="eh-dial">
        <span className="eh-dial-halo" />
        <span className="eh-dial-disc" />
        <svg viewBox="0 0 400 400" className="eh-dial-scale">
          <circle cx="200" cy="200" r="160" pathLength={100} transform="rotate(135 200 200)" className="eh-dial-track" />
          <circle cx="200" cy="200" r="160" pathLength={100} transform="rotate(135 200 200)" className="eh-dial-arc" />
          {Array.from({ length: TICKS }, (_, i) => {
            const major = i % 4 === 0;
            return (
              <line
                key={i}
                x1="200"
                y1={major ? 11 : 16}
                x2="200"
                y2="33"
                transform={`rotate(${-135 + i * 7.5} 200 200)`}
                className={major ? "eh-tick eh-tick--major" : "eh-tick"}
                style={{ "--i": i, "--c": tickColour(i / (TICKS - 1)) } as CSSProperties}
              />
            );
          })}
          <text x="127" y="340" textAnchor="middle" className="eh-dial-num">
            12°
          </text>
          <text x="200" y="372" textAnchor="middle" className="eh-dial-num">
            °C
          </text>
          <text x="273" y="340" textAnchor="middle" className="eh-dial-num eh-dial-num--hot">
            21°
          </text>
        </svg>
        <div className="eh-dial-knob">
          <div className="eh-dial-turn">
            <span className="eh-dial-pointer" />
          </div>
        </div>
        <div className="eh-dial-face">
          <span className="eh-dial-label">House</span>
          <p className="eh-dial-read">
            <b data-eh="whole">21</b>
            <i data-eh="tenth">.0°</i>
          </p>
          <span className="eh-dial-state" data-eh="state">
            Holding steady
          </span>
        </div>
      </div>
      <p className="eh-status">
        <span className="eh-chip eh-chip--navy">
          Boiler <b data-eh="boiler">Holding</b>
        </span>
        <span className="eh-chip eh-chip--navy">
          Flow <b data-eh="flow">62°</b>
        </span>
        <span className="eh-chip eh-chip--navy">
          Pressure <b data-eh="bar">1.4 bar</b>
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Boiler symptom checker                                             */
/* ------------------------------------------------------------------ */

type Level = 1 | 2 | 3;

const URGENCY: Record<Level, [string, string]> = {
  1: ["Low", "No rush"],
  2: ["Soon", "Book this week"],
  3: ["Urgent", "Call today"],
};

const SYMPTOMS: {
  id: string;
  label: string;
  hint: string;
  level: Level;
  suspect: string;
  parts: string[];
  hot: [number, number];
  cause: string;
  steps: string[];
  mean: string;
  visit: string;
}[] = [
  {
    id: "hot-water",
    label: "No hot water",
    hint: "Taps run cold, heating may still work",
    level: 3,
    suspect: "Diverter valve",
    parts: ["diverter"],
    hot: [108, 198],
    cause:
      "On a combi, the diverter valve that switches between the radiators and the taps has usually stuck. A failed sensor or low pressure can do the same.",
    steps: [
      "Test the valve, the sensors and the pressure",
      "Fit a new diverter or cartridge from the van",
      "Run every tap hot, then check the heating still fires",
    ],
    mean: "Check the gauge reads between 1 and 1.5 bar. If it does, leave the rest to us.",
    visit: "About an hour",
  },
  {
    id: "pressure",
    label: "Pressure keeps dropping",
    hint: "You keep having to top it up",
    level: 2,
    suspect: "Expansion vessel",
    parts: ["vessel", "gauge"],
    hot: [159, 198],
    cause:
      "Water is leaving the system somewhere: a weeping radiator valve, a tired pressure relief valve, or an expansion vessel that has lost its charge.",
    steps: [
      "Pressure test the system and trace the loss",
      "Recharge or replace the vessel, reseat the relief valve",
      "Refill to between 1 and 1.5 bar and check it holds",
    ],
    mean: "You can top it up with the filling loop, but note how often. That tells us a lot.",
    visit: "One to two hours",
  },
  {
    id: "noise",
    label: "Banging or whistling",
    hint: "Kettle noises from the boiler or pipes",
    level: 2,
    suspect: "Heat exchanger",
    parts: ["exchanger"],
    hot: [106, 85],
    cause:
      "It is called kettling. Limescale or sludge on the heat exchanger makes the water boil in spots. Trapped air or a struggling pump can sound similar.",
    steps: [
      "Check the flow rate and the pump",
      "Flush the system and clean the exchanger",
      "Add inhibitor and fit a magnetic filter if there is none",
    ],
    mean: "It is usually safe to run, but it is costing you gas. Do not leave it for months.",
    visit: "Half a day with a flush",
  },
  {
    id: "cold-top",
    label: "Radiators cold at the top",
    hint: "Warm at the bottom, cold up top",
    level: 1,
    suspect: "Air in the radiator",
    parts: ["bleed", "air"],
    hot: [290, 193],
    cause:
      "Air has collected at the top of the radiator and the hot water cannot reach it. Cold at the bottom instead points to sludge.",
    steps: [
      "Bleed and balance every radiator",
      "Find out where the air is getting in",
      "Top the pressure back up and check each room",
    ],
    mean: "Bleed it with a radiator key and a cloth. If the air keeps coming back, book a visit.",
    visit: "About an hour",
  },
  {
    id: "old",
    label: "Boiler over ten years old",
    hint: "Still working, for now",
    level: 1,
    suspect: "The whole boiler",
    parts: ["boiler"],
    hot: [106, 133],
    cause:
      "Nothing has to be wrong. Older boilers burn more gas for the same heat, and parts get harder to find each winter.",
    steps: [
      "Service it and tell you straight how long it has left",
      "Price a like-for-like swap and an upgrade, in writing",
      "Fit the new boiler in a day in most homes",
    ],
    mean: "Keep servicing it every year. We will tell you when it is time, not before.",
    visit: "A day to replace",
  },
];

export function SymptomChecker() {
  const [active, setActive] = useState(SYMPTOMS[0].id);
  const index = Math.max(
    0,
    SYMPTOMS.findIndex((s) => s.id === active),
  );
  const s = SYMPTOMS[index];
  const on = (part: string) => s.parts.includes(part);
  const [urgency, action] = URGENCY[s.level];

  return (
    <div className="eh-check">
      <div className="eh-sym-list" role="group" aria-label="Choose a symptom">
        {SYMPTOMS.map((item, i) => (
          <button key={item.id} type="button" className="eh-sym" aria-pressed={item.id === active} onClick={() => setActive(item.id)}>
            <span className="eh-sym-n">{i + 1}</span>
            <span>
              {item.label}
              <small>{item.hint}</small>
              <span className="eh-mono eh-sym-tag" data-level={item.level}>
                {URGENCY[item.level][0]} · {URGENCY[item.level][1]}
              </span>
            </span>
            <span className="eh-sym-go" aria-hidden="true">
              <Arrow />
            </span>
          </button>
        ))}
      </div>

      <div className="eh-dx">
        <div className="eh-dx-fig" aria-hidden="true">
          <p className="eh-mono eh-dx-where">Where we look first</p>
          <svg viewBox="0 0 360 330" className="eh-dx-svg">
            {/* flue and casing */}
            <path d="M92 26 V12 H120 V26" className="eh-part-line" />
            <rect x="24" y="26" width="164" height="214" rx="14" className="eh-part" data-on={on("boiler")} />
            {/* heat exchanger and burner */}
            <path d="M48 58 H164 V76 H48 V94 H164 V112 H48" className="eh-part" data-on={on("exchanger")} />
            <path d="M64 148 q6 -17 12 0 M90 148 q6 -17 12 0 M116 148 q6 -17 12 0 M142 148 q6 -17 12 0" className="eh-flame" />
            <path d="M56 154 H156" className="eh-part-line" />
            {/* pump, diverter valve, expansion vessel */}
            <circle cx="60" cy="198" r="17" className="eh-part" />
            <path d="M54 189 L69 198 L54 207 Z" className="eh-part-line" />
            <path d="M92 183 L108 198 L92 213 Z M124 183 L108 198 L124 213 Z" className="eh-part" data-on={on("diverter")} />
            <rect x="144" y="170" width="30" height="56" rx="14" className="eh-part" data-on={on("vessel")} />
            {/* pipes and pressure gauge */}
            <path d="M60 240 V308 H238 M108 240 V290 H238 M160 240 V258" className="eh-part-line" />
            <circle cx="160" cy="272" r="14" className="eh-part eh-part--solid" data-on={on("gauge")} />
            <path d="M160 272 L168 264" className="eh-part-line" />
            {/* radiator and bleed valve */}
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={i} x={242 + i * 17} y="176" width="11" height="138" rx="5.5" className="eh-part" />
            ))}
            <rect x="236" y="170" width="108" height="46" rx="10" className="eh-air" data-on={on("air")} />
            <circle cx="350" cy="184" r="5" className="eh-part eh-part--solid" data-on={on("bleed")} />
            <circle key={s.id} cx={s.hot[0]} cy={s.hot[1]} r="28" className="eh-hot" />
          </svg>
          <p className="eh-mono eh-dx-suspect">
            Likely culprit <b>{s.suspect}</b>
          </p>
        </div>

        <div className="eh-dx-body">
          <div className="eh-dx-top">
            <p className="eh-mono">
              Symptom {index + 1} of {SYMPTOMS.length}
            </p>
            <p className="eh-mono eh-urg" data-level={s.level} role="img" aria-label={`Urgency ${s.level} of 3: ${urgency}. ${action}.`}>
              <span className="eh-urg-bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span aria-hidden="true">
                <b>{urgency}</b> · {action}
              </span>
            </p>
          </div>
          <div key={s.id} className="eh-dx-swap" aria-live="polite">
            <h3 className="eh-dx-title">{s.label}</h3>
            <p className="eh-mono eh-dx-sub">Likely cause</p>
            <p className="eh-dx-cause">{s.cause}</p>
            <p className="eh-mono eh-dx-sub">What an engineer does</p>
            <ol className="eh-dx-steps">
              {s.steps.map((step, i) => (
                <li key={step}>
                  <span className="eh-dx-step-n">0{i + 1}</span>
                  <p>{withNums(step)}</p>
                </li>
              ))}
            </ol>
            <p className="eh-dx-mean">
              <b>Meanwhile.</b> {withNums(s.mean)}
            </p>
          </div>
          <div className="eh-dx-foot">
            <a href="#book" className="eh-btn eh-btn--ember">
              Book an engineer
              <Go />
            </a>
            <p className="eh-dx-call">
              Typical visit: {s.visit.toLowerCase()}
              <a href={PHONE_HREF} className="eh-num">
                {PHONE}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Care plan: plan switch, price and the sample service report        */
/* ------------------------------------------------------------------ */

const PLANS = {
  service: {
    name: "Service plan",
    price: "9",
    items: ["Annual service, twelve checks", "Written report after every visit", "A reminder when the next one is due", "Priority booking in winter"],
  },
  cover: {
    name: "Service and cover",
    price: "17",
    items: ["Everything in the service plan", "Breakdown callouts, no callout charge", "Parts and labour on boiler repairs", "Same-day visit when the heating is off"],
  },
} as const;

type PlanId = keyof typeof PLANS;

const CHECKS = [
  "Gas pressure and burner",
  "Flue and seals",
  "Heat exchanger",
  "Condensate trap",
  "Expansion vessel",
  "System pressure",
  "Pump and valves",
  "Safety devices",
  "Controls and thermostat",
  "Radiators balanced",
  "Inhibitor level",
  "Carbon monoxide alarm",
];

const two = (n: number) => String(n).padStart(2, "0");

export function CarePlan({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanId>("service");
  const count = useRef<HTMLElement>(null);
  useScrub(count, (p) => {
    const n = Math.max(0, Math.min(CHECKS.length, Math.floor(p * 13.5)));
    if (count.current) count.current.textContent = two(n);
  });
  const chosen = PLANS[plan];

  return (
    <div className="eh-plan-grid">
      <div className="eh-plan-copy">
        {children}
        <div className="eh-switch" role="group" aria-label="Choose a plan">
          {(Object.keys(PLANS) as PlanId[]).map((id) => (
            <button key={id} type="button" aria-pressed={plan === id} onClick={() => setPlan(id)}>
              {PLANS[id].name}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          <p className="eh-price">
            <b>£{chosen.price}</b>
            <span>a month</span>
          </p>
          <ul className="eh-incl">
            {chosen.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <a href="#book" className="eh-btn eh-btn--ember">
          Start a plan
          <Go />
        </a>
        <p className="eh-mono eh-plan-note">Sample prices for a made-up firm</p>
      </div>

      <div className="eh-report" data-scrub="enter" role="group" aria-label="Sample annual service report">
        <div className="eh-report-bar">
          <span className="eh-report-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <p className="eh-mono">Annual service · sample report</p>
          <span className="eh-chip eh-report-pass">Passed</span>
        </div>
        <dl className="eh-read">
          <div>
            <dt>System pressure</dt>
            <dd>
              1.4<small>bar</small>
            </dd>
            <span className="eh-meter" aria-hidden="true">
              <i style={{ "--v": "46%" } as CSSProperties} />
            </span>
          </div>
          <div>
            <dt>Flow temperature</dt>
            <dd>
              62<small>°C</small>
            </dd>
            <span className="eh-meter" aria-hidden="true">
              <i style={{ "--v": "72%" } as CSSProperties} />
            </span>
          </div>
          <div>
            <dt>Checks passed</dt>
            <dd>
              12<small>of 12</small>
            </dd>
            <span className="eh-meter" aria-hidden="true">
              <i style={{ "--v": "100%" } as CSSProperties} />
            </span>
          </div>
        </dl>
        <ul className="eh-ticks">
          {CHECKS.map((check, i) => (
            <li key={check} style={{ "--i": i } as CSSProperties}>
              <span className="eh-tickbox" aria-hidden="true" />
              <span>{check}</span>
              <span>OK</span>
            </li>
          ))}
        </ul>
        <div className="eh-report-foot">
          <p className="eh-report-count">
            <b ref={count}>12</b> / 12<small>checks done</small>
          </p>
          <p className="eh-mono">
            {chosen.name} · next visit booked for you
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Booking form (a demo: nothing is sent)                             */
/* ------------------------------------------------------------------ */

export function BookForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <div className="eh-form eh-form--done" role="status">
        <p className="eh-mono">This is a demo</p>
        <p className="eh-form-done-title">That is where a real booking would land.</p>
        <p>Emberline Heating is a made-up firm, built by Integrate Web Design. Nothing was sent and no details were kept.</p>
      </div>
    );
  return (
    <form className="eh-form" onSubmit={onSubmit}>
      <div className="eh-form-head">
        <p className="eh-mono">Book an engineer</p>
        <span className="eh-chip">Callback within the hour</span>
      </div>
      <label className="eh-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Sam Taylor" required />
      </label>
      <div className="eh-field-row">
        <label className="eh-field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900123" required />
        </label>
        <label className="eh-field">
          <span>Postcode</span>
          <input type="text" name="postcode" autoComplete="postal-code" placeholder="AB1 2CD" />
        </label>
      </div>
      <label className="eh-field">
        <span>What is the heating doing?</span>
        <select name="issue" defaultValue="hot-water">
          <option value="hot-water">No hot water</option>
          <option value="no-heat">No heating at all</option>
          <option value="pressure">Pressure keeps dropping</option>
          <option value="noise">Banging or whistling</option>
          <option value="service">It is due a service</option>
          <option value="new">I want a new boiler or heat pump</option>
        </select>
      </label>
      <fieldset className="eh-when">
        <legend>How soon?</legend>
        <div className="eh-when-opts">
          {["Today", "This week", "Just a quote"].map((when, i) => (
            <label key={when}>
              <input type="radio" name="when" value={when} defaultChecked={i === 0} />
              <span>{when}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="eh-btn eh-btn--ember eh-btn--full">
        Book my engineer
        <Go />
      </button>
      <p className="eh-mono eh-form-note">Demo form · nothing is sent</p>
    </form>
  );
}
