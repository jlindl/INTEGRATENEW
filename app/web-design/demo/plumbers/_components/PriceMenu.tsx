"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { display, focusRing, h2, mono, narrow, wrap } from "./theme";

type Item = { job: string; note: string; price: string };
type Cat = { id: string; label: string; items: Item[] };

const MENU: Cat[] = [
  {
    id: "emergency",
    label: "Emergencies",
    items: [
      { job: "Find the leak and make safe", note: "Isolate, trace and stop it. Up to 1 hour.", price: "£95" },
      { job: "Burst pipe repair", note: "Accessible pipework, up to 2 joints", price: "£145" },
      { job: "Seized or leaking stopcock replaced", note: "Includes new 15mm stopcock", price: "£165" },
      { job: "Overflowing toilet cistern", note: "Fill valve or flush valve swapped", price: "£89" },
      { job: "No heating or hot water", note: "Diagnosis, any make of boiler", price: "£89" },
    ],
  },
  {
    id: "heating",
    label: "Heating",
    items: [
      { job: "Annual boiler service", note: "Flue test, report, warranty stays valid", price: "£85" },
      { job: "Landlord gas safety certificate", note: "Boiler plus up to 3 appliances", price: "£70" },
      { job: "Power flush", note: "Up to 10 radiators, inhibitor included", price: "£420" },
      { job: "Radiator replaced, like for like", note: "Supply and fit, up to 1200mm", price: "£195" },
      { job: "New combi boiler, fitted", note: "10-year warranty, smart thermostat", price: "from £2,195" },
    ],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    items: [
      { job: "Tap replaced", note: "Kitchen or basin, your tap or ours", price: "£85" },
      { job: "Washing machine or dishwasher plumbed in", note: "Valves and waste connected", price: "£95" },
      { job: "Outside tap fitted", note: "With double check valve", price: "£135" },
      { job: "Shower valve replaced", note: "Thermostatic bar or concealed", price: "£220" },
      { job: "Toilet replaced", note: "Remove old, fit and seal new", price: "£190" },
    ],
  },
  {
    id: "drains",
    label: "Drains",
    items: [
      { job: "Sink, basin or bath unblocked", note: "Inside the property", price: "£85" },
      { job: "Toilet unblocked", note: "Including the soil pipe", price: "£85" },
      { job: "Outside drain jetted", note: "Up to 2 chambers", price: "£145" },
      { job: "CCTV drain survey", note: "Recorded footage and written report", price: "£175" },
    ],
  },
];

export function PriceMenu() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(MENU[0].id);
  useEffect(() => setReady(true), []);

  function onKey(e: KeyboardEvent, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : MENU.length - 1)) % MENU.length;
    setActive(MENU[next].id);
    document.getElementById(`tab-${MENU[next].id}`)?.focus();
  }

  return (
    <section id="prices" aria-labelledby="prices-title" className="scroll-mt-20 bg-[#1ed3b0] py-20 text-[#0b1a28] sm:py-28">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-5 lg:pr-6">
          <p className={`${narrow} text-[0.8rem] font-bold uppercase tracking-[0.16em]`}>The fixed-price menu</p>
          <h2 id="prices-title" className={`${h2} mt-5`}>
            What you see is what you pay.
          </h2>
          <p className="mt-6 max-w-sm text-[1.06rem] leading-relaxed text-[#0b1a28]/85">
            Labour, VAT and the parts listed are all included. If the job turns out bigger than it looked, you get the new
            price in writing before we carry on.
          </p>
          <dl className="mt-10 grid max-w-sm grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#0b1a28]/15">
            {[
              ["£0", "call-out fee"],
              ["+£45", "8pm to 7am"],
              ["12 mo", "repair guarantee"],
              ["Card", "or bank transfer"],
            ].map(([v, k]) => (
              <div key={k} className="bg-[#1ed3b0] p-4">
                <dt className="sr-only">{k}</dt>
                <dd className={`${display} text-[1.5rem] font-extrabold leading-none tracking-[-0.03em]`}>{v}</dd>
                <dd className="mt-1.5 text-[0.85rem] text-[#0b1a28]/80">{k}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[30px] bg-white p-2 shadow-[0_40px_80px_-40px_rgba(11,26,40,0.5)] sm:p-3">
            {ready && (
              <div role="tablist" aria-label="Price categories" className="grid grid-cols-2 gap-1 rounded-[24px] bg-[#f3f6f5] p-1 sm:grid-cols-4">
                {MENU.map((c, i) => {
                  const on = c.id === active;
                  return (
                    <button
                      key={c.id}
                      id={`tab-${c.id}`}
                      role="tab"
                      type="button"
                      aria-selected={on}
                      aria-controls={`panel-${c.id}`}
                      tabIndex={on ? 0 : -1}
                      onClick={() => setActive(c.id)}
                      onKeyDown={(e) => onKey(e, i)}
                      className={`${focusRing} rounded-[20px] px-4 py-3 text-[0.95rem] font-bold transition-colors duration-200 ${
                        on ? "bg-[#0b1a28] text-white" : "text-[#33475a] hover:bg-white hover:text-[#0b1a28]"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            )}

            {MENU.map((c) => {
              const hidden = ready && c.id !== active;
              return (
                <div
                  key={c.id}
                  id={`panel-${c.id}`}
                  role={ready ? "tabpanel" : undefined}
                  aria-labelledby={ready ? `tab-${c.id}` : undefined}
                  hidden={hidden}
                  className="px-3 pb-3 pt-4 sm:px-6 sm:pb-5"
                >
                  {!ready && <h3 className={`${display} pt-4 text-[1.3rem] font-extrabold`}>{c.label}</h3>}
                  <ul className="divide-y divide-[#e4ebec]">
                    {c.items.map((it) => (
                      <li key={it.job} className="flex items-baseline gap-4 py-4 sm:py-5">
                        <div className="min-w-0 flex-1">
                          <p className="text-[1.05rem] font-bold leading-snug sm:text-[1.12rem]">{it.job}</p>
                          <p className="mt-1 text-[0.9rem] text-[#4b5d6b]">{it.note}</p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="hidden h-px flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-[#cdd8da] md:block md:max-w-[140px]"
                        />
                        <p className={`${mono} shrink-0 text-right text-[1.05rem] font-medium sm:text-[1.15rem]`}>{it.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-[0.9rem] text-[#0b1a28]/80">
            Prices checked November 2026. Parts outside the listed scope are quoted before fitting.
          </p>
        </div>
      </div>
    </section>
  );
}
