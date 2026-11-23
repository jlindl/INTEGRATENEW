"use client";

import { useId, useState } from "react";
import { display, focusRing } from "./ui";

const APR = 0.099;
const terms = [
  { months: 6, apr: 0 },
  { months: 12, apr: 0 },
  { months: 24, apr: APR },
  { months: 36, apr: APR },
];

function monthly(amount: number, months: number, apr: number) {
  if (apr === 0) return amount / months;
  const r = Math.pow(1 + apr, 1 / 12) - 1;
  return (amount * r) / (1 - Math.pow(1 + r, -months));
}

const gbp = (n: number, dp = 2) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: dp, maximumFractionDigits: dp });

const rep = monthly(2450, 36, APR);

export function FinanceCalc() {
  const [amount, setAmount] = useState(2450);
  const [ti, setTi] = useState(1);
  const id = useId();
  const term = terms[ti];
  const pm = monthly(amount, term.months, term.apr);
  const total = pm * term.months;
  const pct = ((amount - 500) / (6000 - 500)) * 100;

  return (
    <div className="flex h-full flex-col rounded-[2rem] bg-[#1c2a26] p-7 text-[#fffcf7] sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className={`${display} text-[1.7rem]`}>Spread the cost</h3>
        <p className="text-[0.8rem] text-[#d5e0d7]">0% over 6 or 12 months on treatment over £500</p>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
        <div>
          <label htmlFor={`${id}-amt`} className="flex items-baseline justify-between text-[0.85rem] text-[#d5e0d7]">
            Treatment cost
            <span className={`${display} text-[1.6rem] text-[#fffcf7] tabular-nums`}>{gbp(amount, 0)}</span>
          </label>
          <input
            id={`${id}-amt`}
            type="range"
            min={500}
            max={6000}
            step={50}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={`bw-range mt-4 w-full ${focusRing}`}
            style={{ background: `linear-gradient(to right, #f2d6c6 ${pct}%, rgba(255,252,247,0.18) ${pct}%)` }}
          />
          <fieldset className="mt-7">
            <legend className="text-[0.85rem] text-[#d5e0d7]">Pay over</legend>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {terms.map((t, i) => (
                <button
                  key={t.months}
                  type="button"
                  aria-pressed={ti === i}
                  onClick={() => setTi(i)}
                  className={`rounded-xl px-2 py-2.5 text-center text-[0.85rem] font-semibold transition-colors ${focusRing} ${
                    ti === i ? "bg-[#fffcf7] text-[#1c2a26]" : "bg-[#fffcf7]/8 text-[#fffcf7] hover:bg-[#fffcf7]/15"
                  }`}
                >
                  {t.months} mo
                  <span className={`block text-[0.68rem] font-medium ${ti === i ? "text-[#55625c]" : "text-[#d5e0d7]"}`}>
                    {t.apr === 0 ? "0% APR" : "9.9% APR"}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="rounded-[1.5rem] bg-[#fffcf7]/[0.06] p-5 ring-1 ring-[#fffcf7]/10" aria-live="polite">
          <p className="text-[0.8rem] text-[#d5e0d7]">Monthly payment</p>
          <p className={`${display} mt-1 text-[2.8rem] leading-none tabular-nums text-[#f2d6c6]`}>{gbp(pm)}</p>
          <p className="mt-3 text-[0.8rem] leading-relaxed text-[#d5e0d7]">
            {term.months} payments. Total {gbp(total)}
            {term.apr === 0 ? ", no interest." : "."}
          </p>
        </div>
      </div>

      <p className="mt-auto pt-8 text-[0.72rem] leading-relaxed text-[#d5e0d7]/80">
        Representative example: borrowing £2,450 over 36 months at 9.9% APR
        representative, 36 monthly payments of {gbp(rep)}, total payable{" "}
        {gbp(rep * 36)}. Finance subject to status, over 18s only. Brightwell
        Dental is a credit broker, not a lender. Illustrative figures for this
        demo.
      </p>
    </div>
  );
}
