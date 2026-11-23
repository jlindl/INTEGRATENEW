"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { formatMins, lookupPostcode } from "./data";
import { ArrowIcon, CheckIcon } from "./icons";
import s from "./nl.module.css";
import { display, focusRing, mono, narrow } from "./theme";

type Board = { day: string; time: string; eta: string; slots: number; next: string };

function board(d: Date): Board {
  const h = d.getHours();
  const day = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const eta = h >= 7 && h < 20 ? "1 hr 30" : h >= 20 && h < 23 ? "1 hr 50" : "2 hrs";
  const slots = h < 7 ? 6 : h < 20 ? Math.max(1, 6 - Math.floor((h - 7) / 2)) : 0;
  const next = h < 16 ? "Today, 4pm" : "Tomorrow, 8am";
  return { day, time, eta, slots, next };
}

/**
 * The "dispatch board": live-feeling availability plus a postcode check.
 * Server render shows sensible static values, the clock fills in on mount.
 */
export function DispatchCard() {
  const [b, setB] = useState<Board | null>(null);
  const [pc, setPc] = useState("");
  const [result, setResult] = useState<ReturnType<typeof lookupPostcode> | null>(null);
  const id = useId();

  useEffect(() => {
    const tick = () => setB(board(new Date()));
    tick();
    const t = window.setInterval(tick, 20_000);
    return () => window.clearInterval(t);
  }, []);

  function check(e: FormEvent) {
    e.preventDefault();
    setResult(lookupPostcode(pc));
  }

  const rows = [
    { k: "Emergency arrival", v: b ? `about ${b.eta}` : "within 2 hrs" },
    { k: "Same-day slots left", v: b ? (b.slots > 0 ? String(b.slots) : "Full, emergencies only") : "Available" },
    { k: "Next planned visit", v: b ? b.next : "Today" },
  ];

  return (
    <div className="w-full rounded-[26px] bg-white p-5 shadow-[0_40px_80px_-36px_rgba(11,26,40,0.55),0_0_0_1px_rgba(11,26,40,0.06)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className={`${narrow} text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#0b1a28]`}>
          Dispatch board
        </p>
        <p className={`${mono} flex items-center gap-2 text-[0.78rem] text-[#4b5d6b]`}>
          <span className={`${s.live} inline-block h-1.5 w-1.5 rounded-full bg-[#0a7a66] text-[#0a7a66]`} aria-hidden="true" />
          {b ? `${b.day}, ${b.time}` : "Live"}
        </p>
      </div>

      <dl className="mt-4 divide-y divide-[#e4ebec] border-y border-[#e4ebec]">
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-[0.9rem] text-[#4b5d6b]">{r.k}</dt>
            <dd className={`${display} text-right text-[1.02rem] font-bold text-[#0b1a28]`}>{r.v}</dd>
          </div>
        ))}
      </dl>

      <form onSubmit={check} action="#book" className="mt-4">
        <label htmlFor={`${id}-pc`} className="text-[0.9rem] font-semibold text-[#0b1a28]">
          Are we near you?
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id={`${id}-pc`}
            name="postcode"
            value={pc}
            onChange={(e) => {
              setPc(e.target.value);
              setResult(null);
            }}
            autoComplete="postal-code"
            placeholder="Postcode, e.g. LS6 2AB"
            className={`${focusRing} ${mono} min-w-0 flex-1 rounded-full border border-[#cdd8da] bg-[#f3f6f5] px-4 py-3 text-[0.95rem] uppercase text-[#0b1a28] placeholder:normal-case placeholder:text-[#6b7c88]`}
          />
          <button
            type="submit"
            className={`${focusRing} grid h-[50px] w-[50px] shrink-0 place-items-center rounded-full bg-[#0b1a28] text-white transition-colors hover:bg-[#1b3550]`}
            aria-label="Check postcode"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>
        </div>
        <p aria-live="polite" className="min-h-[1.5rem] pt-3 text-[0.9rem] leading-snug">
          {result?.kind === "covered" && (
            <span className="flex items-start gap-2 text-[#0b1a28]">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7a66]" />
              <span>
                <strong>Yes, {result.area} ({result.district}).</strong> Nearest engineer is usually about{" "}
                {formatMins(result.mins)} away.
              </span>
            </span>
          )}
          {result?.kind === "outside" && (
            <span className="text-[#0b1a28]">
              {result.district} is just outside our usual patch. Ring us and we will tell you honestly whether we can make it.
            </span>
          )}
          {(result?.kind === "invalid" || result?.kind === "empty") && (
            <span className="text-[#a3361d]">Pop in the first part of your postcode, like LS6.</span>
          )}
          {!result && <span className="text-[#4b5d6b]">Leeds, Wakefield and most of West Yorkshire.</span>}
        </p>
      </form>
    </div>
  );
}
