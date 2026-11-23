"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Arrow } from "./Arrow";
import { btnPrimary, focusRing, label, mono, serif, wrap } from "./ui";

type Entity = "sole" | "ltd" | "group";

const entities: { id: Entity; name: string; base: number; line: string }[] = [
  { id: "sole", name: "Sole trader", base: 95, line: "Bookkeeping and self assessment" },
  { id: "ltd", name: "Limited company", base: 245, line: "Bookkeeping, accounts and CT600" },
  { id: "group", name: "Group", base: 520, line: "Group bookkeeping and consolidation" },
];

const bands = [
  { name: "Under £250k", add: 0 },
  { name: "£250k to £1m", add: 90 },
  { name: "£1m to £5m", add: 260 },
  { name: "£5m to £25m", add: 640 },
];

const gbp = (n: number) =>
  "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Tweens between totals so a change reads as a recalculation, not a jump. */
function Figure({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = value;
      setShown(value);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 650);
      const e = 1 - Math.pow(1 - t, 3);
      const v = a + (value - a) * e;
      setShown(v);
      from.current = v;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <>{gbp(Math.round(shown))}</>;
}

function Toggle({
  checked,
  onChange,
  title,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  hint: string;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start justify-between gap-6 border-b border-[#d6cfbf] py-5">
      <span>
        <span className="block text-[1rem] text-[#13201b]">{title}</span>
        <span className="mt-1 block text-[0.88rem] leading-[1.55] text-[#4f5a54]">{hint}</span>
      </span>
      <span className="relative mt-1 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={`peer h-7 w-12 cursor-pointer appearance-none rounded-full border border-[#13201b]/25 bg-[#f3f0e8] transition-colors duration-300 checked:border-[#1b4a3a] checked:bg-[#1b4a3a] ${focusRing}`}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-[#13201b]/70 transition-transform duration-300 peer-checked:translate-x-5 peer-checked:bg-[#f3f0e8]"
        />
      </span>
    </label>
  );
}

export function FeeBuilder() {
  const [entity, setEntity] = useState<Entity>("ltd");
  const [band, setBand] = useState(1);
  const [staff, setStaff] = useState(8);
  const [vat, setVat] = useState(true);
  const [mgmt, setMgmt] = useState(true);
  const [rd, setRd] = useState(false);

  const e = entities.find((x) => x.id === entity)!;
  const lines = [
    { k: e.line, v: e.base },
    { k: `Volume, turnover ${bands[band].name.toLowerCase()}`, v: bands[band].add },
    { k: `Payroll for ${staff} ${staff === 1 ? "person" : "people"}`, v: staff > 0 ? 30 + staff * 5 : 0 },
    { k: "Quarterly VAT returns", v: vat ? 55 : 0 },
    { k: "Monthly management accounts", v: mgmt ? 180 : 0 },
    { k: "Annual R&D claim, spread monthly", v: rd ? 150 : 0 },
  ].filter((l) => l.v > 0);
  const total = lines.reduce((s, l) => s + l.v, 0);

  return (
    <section id="fees" aria-labelledby="fees-title" className="scroll-mt-20 border-y border-[#d6cfbf] bg-[#ebe6d9]">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <p className={`${label} text-[#4f5a54]`}>
              <span className="text-[#a7834b]">05</span> &nbsp;Fees
            </p>
          </div>
          <div className="lg:col-span-6">
            <h2
              id="fees-title"
              className={`${serif} text-[clamp(2.4rem,5vw,4.4rem)] font-[350] leading-[1] tracking-[-0.02em] text-[#13201b]`}
            >
              Know your fee <em className="italic text-[#1b4a3a]">before we&rsquo;ve met.</em>
            </h2>
          </div>
          <p className="text-[0.98rem] leading-[1.7] text-[#4f5a54] lg:col-span-3 lg:pt-3">
            Tell us roughly what your company looks like. The quote updates as
            you go, and it is the number we will put in writing after our first
            call, unless something material is different.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Controls */}
          <form className="lg:col-span-6 lg:col-start-1" onSubmit={(ev) => ev.preventDefault()} aria-label="Fee estimator">
            <fieldset>
              <legend className={`${label} text-[#4f5a54]`}>Your business is a</legend>
              <div className="mt-4 grid grid-cols-3 gap-0 rounded-full border border-[#13201b]/20 bg-[#f3f0e8] p-1">
                {entities.map((x) => (
                  <label key={x.id} className="relative">
                    <input
                      type="radio"
                      name="entity"
                      value={x.id}
                      checked={entity === x.id}
                      onChange={() => setEntity(x.id)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-11 cursor-pointer items-center justify-center rounded-full px-2 text-center text-[0.84rem] leading-tight text-[#13201b]/80 transition-colors duration-300 peer-checked:bg-[#1b4a3a] peer-checked:text-[#f3f0e8] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#1b4a3a] sm:text-[0.92rem]">
                      {x.name}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-12">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="mc-turnover" className={`${label} text-[#4f5a54]`}>
                  Annual turnover
                </label>
                <output htmlFor="mc-turnover" className={`${serif} text-[1.4rem] text-[#13201b]`}>
                  {bands[band].name}
                </output>
              </div>
              <input
                id="mc-turnover"
                type="range"
                min={0}
                max={3}
                step={1}
                value={band}
                aria-valuetext={bands[band].name}
                onChange={(ev) => setBand(Number(ev.target.value))}
                className={`mc-range mt-5 w-full ${focusRing}`}
                style={{ ["--fill" as string]: `${(band / 3) * 100}%` }}
              />
              <div aria-hidden="true" className={`${mono} mt-3 flex justify-between text-[0.68rem] text-[#4f5a54]`}>
                <span>£0</span>
                <span>£250k</span>
                <span>£1m</span>
                <span>£25m</span>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="mc-staff" className={`${label} text-[#4f5a54]`}>
                  People on payroll
                </label>
                <output htmlFor="mc-staff" className={`${serif} text-[1.4rem] tabular-nums text-[#13201b]`}>
                  {staff === 0 ? "None" : staff}
                </output>
              </div>
              <input
                id="mc-staff"
                type="range"
                min={0}
                max={80}
                step={1}
                value={staff}
                onChange={(ev) => setStaff(Number(ev.target.value))}
                className={`mc-range mt-5 w-full ${focusRing}`}
                style={{ ["--fill" as string]: `${(staff / 80) * 100}%` }}
              />
              <div aria-hidden="true" className={`${mono} mt-3 flex justify-between text-[0.68rem] text-[#4f5a54]`}>
                <span>0</span>
                <span>20</span>
                <span>40</span>
                <span>60</span>
                <span>80</span>
              </div>
            </div>

            <div className="mt-10 border-t border-[#d6cfbf]">
              <Toggle checked={vat} onChange={setVat} title="VAT registered" hint="We prepare, review and file each quarter under Making Tax Digital." />
              <Toggle checked={mgmt} onChange={setMgmt} title="Monthly management accounts" hint="The pack, the forecast and a partner call each month." />
              <Toggle checked={rd} onChange={setRd} title="You build something new" hint="An annual R&D relief claim, written with your team." />
            </div>
          </form>

          {/* The quotation */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <div className="relative bg-[#fbfaf6] px-6 pb-8 pt-7 shadow-[0_50px_90px_-50px_rgba(15,43,34,0.5)] sm:px-9 sm:pb-10 sm:pt-9">
                <div aria-hidden="true" className="absolute inset-x-0 -top-2 h-2 [background:radial-gradient(circle_at_6px_8px,#fbfaf6_5px,transparent_5.5px)_0_0/12px_8px_repeat-x]" />
                <div className="flex items-start justify-between gap-4 border-b border-[#d6cfbf] pb-5">
                  <div>
                    <p className={`${serif} text-[1.6rem] leading-none text-[#13201b]`}>Quotation</p>
                    <p className={`${mono} mt-2 text-[0.7rem] text-[#4f5a54]`}>MC/Q/2611/0418</p>
                  </div>
                  <p className={`${mono} text-right text-[0.7rem] leading-[1.6] text-[#4f5a54]`}>
                    18 Nov 2026
                    <br />
                    Valid 12 months
                  </p>
                </div>

                <ul aria-label="Fee lines" className="py-3">
                  {lines.map((l) => (
                    <li key={l.k} className="mc-line-in flex items-baseline gap-2 py-2 text-[0.92rem]">
                      <span className="text-[#13201b]">{l.k}</span>
                      <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-[#13201b]/30" />
                      <span className={`${mono} text-[0.85rem] tabular-nums text-[#13201b]`}>{gbp(l.v)}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#13201b] pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <p className={`${label} pb-2 text-[#4f5a54]`}>Per month, ex VAT</p>
                    <p
                      className={`${serif} border-b-[3px] border-double border-[#13201b] pb-1 text-[clamp(2.4rem,5vw,3.4rem)] font-[350] leading-none tabular-nums tracking-[-0.02em] text-[#1b4a3a]`}
                    >
                      <span aria-hidden="true">
                        <Figure value={total} />
                      </span>
                      <span className="sr-only" aria-live="polite">
                        {gbp(total)} per month
                      </span>
                    </p>
                  </div>
                  <p className={`${mono} mt-4 text-right text-[0.75rem] tabular-nums text-[#4f5a54]`}>
                    {gbp(total * 12)} a year, billed monthly
                  </p>
                </div>

                <a href="#contact" className={`${btnPrimary} mt-8 w-full`}>
                  Confirm this on a call
                  <Arrow />
                </a>
                <p className="mt-4 text-center text-[0.82rem] leading-[1.5] text-[#4f5a54]">
                  No set-up fee. Switching from another accountant is on us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
