"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, type FormEvent } from "react";
import { display, focusRing } from "./ui";

const reasons = [
  { id: "new", label: "New patient visit", mins: 45, price: "£65", note: "Check-up, X-rays if needed, a written plan" },
  { id: "check", label: "Check-up", mins: 20, price: "£45", note: "For existing patients" },
  { id: "hyg", label: "Hygiene visit", mins: 30, price: "£75", note: "With Jo or Ellie" },
  { id: "align", label: "Aligner consultation", mins: 30, price: "Free", note: "Includes a 3D scan" },
  { id: "emerg", label: "Emergency appointment", mins: 20, price: "£95", note: "Pain, swelling, a broken tooth" },
];

const comforts = [
  "I’m nervous, please go slowly",
  "Talk me through everything",
  "I’d rather not know the details",
  "Headphones, please",
  "Weighted blanket, please",
  "I have a strong gag reflex",
  "I’d like to hear about sedation",
];

const stepNames = ["Reason", "Time", "Comfort", "Details"];

const DAY = 86400000;

function slotsFor(date: Date, reasonIdx: number) {
  const dow = date.getDay();
  const base =
    dow === 6
      ? ["9:00", "9:40", "10:20", "11:00", "11:40", "12:20", "1:00"]
      : ["8:20", "9:20", "10:00", "11:10", "12:30", "2:00", "2:40", "3:30", "4:50", "5:40", "6:20"];
  if (dow === 4) base.push("7:00", "7:30");
  // deterministic "already booked" pattern so it feels like a real diary
  const seed = date.getDate() * 7 + date.getMonth() * 13 + reasonIdx * 5;
  return base.map((t, i) => ({ t, taken: ((seed + i * 11) % 7) < 3 }));
}

function ampm(t: string) {
  const h = parseInt(t, 10);
  return h >= 8 && h < 12 ? `${t}am` : `${t}pm`;
}

export function BookingWidget() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState<number | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);

  // Only rendered once the visitor reaches step 2, so it never runs during SSR.
  const days = useMemo(() => {
    if (step < 1) return [];
    const out: Date[] = [];
    const now = new Date();
    let d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    while (out.length < 10) {
      d = new Date(d.getTime() + DAY);
      if (d.getDay() !== 0) out.push(d);
    }
    return out;
  }, [step]);

  const day = days[dayIdx];
  const slots = day && reason !== null ? slotsFor(day, reason) : [];
  const dayLabel = day
    ? day.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
    : "";

  const canNext = step === 0 ? reason !== null : step === 1 ? time !== null : true;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!name.trim() || mobile.replace(/\D/g, "").length < 10) return;
    setDone(true);
  };

  const reset = () => {
    setStep(0);
    setReason(null);
    setTime(null);
    setPrefs([]);
    setName("");
    setMobile("");
    setTried(false);
    setDone(false);
  };

  const anim = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
      };

  const nameErr = tried && !name.trim();
  const mobileErr = tried && mobile.replace(/\D/g, "").length < 10;

  return (
    <div className="overflow-hidden rounded-[2rem] bg-[#fffcf7] text-[#1c2a26] shadow-[0_60px_100px_-60px_rgba(10,20,17,0.8)]">
      {/* stepper */}
      <div className="border-b border-[#1c2a26]/8 px-6 pb-5 pt-6 sm:px-8">
        <ol className="flex items-center gap-2" aria-label="Booking progress">
          {stepNames.map((s, i) => {
            const state = done || i < step ? "done" : i === step ? "now" : "next";
            return (
              <li key={s} className="flex flex-1 flex-col gap-2" aria-current={state === "now" ? "step" : undefined}>
                <span className="h-1 overflow-hidden rounded-full bg-[#1c2a26]/8">
                  <span
                    className="block h-full rounded-full bg-[#2d5547] transition-[width] duration-700 ease-out"
                    style={{ width: state === "next" ? "0%" : "100%" }}
                  />
                </span>
                <span className={`text-[0.72rem] font-semibold tracking-wide ${state === "next" ? "text-[#55625c]/70" : "text-[#1c2a26]"}`}>
                  {s}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative min-h-[27rem] px-6 py-7 sm:px-8">
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.div key="done" {...anim} transition={{ duration: 0.45 }} className="flex flex-col items-center py-6 text-center" role="status">
              <span className="relative flex h-20 w-20 items-center justify-center" aria-hidden="true">
                <span className="bw-breathe absolute inset-0 rounded-full bg-[#e3ebe4]" />
                <svg viewBox="0 0 24 24" className="relative h-8 w-8" fill="none" stroke="#2d5547" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 12.5l5 5L19.5 7" />
                </svg>
              </span>
              <p className={`${display} mt-6 text-[2rem] leading-tight`}>
                You&rsquo;re booked in, {name.trim().split(" ")[0]}.
              </p>
              <p className="mt-3 max-w-sm text-[0.97rem] leading-relaxed text-[#55625c]">
                {reason !== null ? reasons[reason].label : ""} on{" "}
                <span className="font-semibold text-[#1c2a26]">
                  {dayLabel} at {time ? ampm(time) : ""}
                </span>
                . A confirmation text is on its way, and Mia will message the
                afternoon before.
              </p>
              {prefs.length > 0 ? (
                <div className="mt-6 w-full max-w-sm rounded-2xl bg-[#f6f1ea] p-4 text-left">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#55625c]">Noted for your dentist</p>
                  <ul className="mt-2 space-y-1 text-[0.9rem]">
                    {prefs.map((p) => (
                      <li key={p} className="flex gap-2"><span className="text-[#2d5547]" aria-hidden="true">&#10003;</span>{p}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <button type="button" onClick={reset} className={`mt-7 rounded-full border border-[#1c2a26]/15 px-5 py-2.5 text-[0.9rem] font-semibold hover:bg-[#f6f1ea] ${focusRing}`}>
                Start again
              </button>
              <p className="mt-4 text-[0.75rem] text-[#55625c]">Demo booking. Nothing has been sent.</p>
            </motion.div>
          ) : step === 0 ? (
            <motion.fieldset key="s0" {...anim} transition={{ duration: 0.35 }}>
              <legend className={`${display} text-[1.5rem]`}>What would you like to book?</legend>
              <div className="mt-5 space-y-2.5">
                {reasons.map((r, i) => {
                  const on = reason === i;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        setReason(i);
                        setTime(null);
                      }}
                      className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${focusRing} ${
                        on ? "border-[#2d5547] bg-[#e3ebe4]/70 shadow-[inset_0_0_0_1px_#2d5547]" : "border-[#1c2a26]/10 hover:border-[#2d5547]/40 hover:bg-[#f6f1ea]/60"
                      }`}
                    >
                      <span className="flex items-center gap-3.5">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${on ? "border-[#2d5547] bg-[#2d5547]" : "border-[#1c2a26]/25"}`} aria-hidden="true">
                          {on ? <span className="h-1.5 w-1.5 rounded-full bg-[#fffcf7]" /> : null}
                        </span>
                        <span>
                          <span className="block text-[0.98rem] font-semibold">{r.label}</span>
                          <span className="block text-[0.8rem] text-[#55625c]">{r.note}</span>
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-[0.95rem] font-semibold">{r.price}</span>
                        <span className="block text-[0.75rem] text-[#55625c]">{r.mins} min</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.fieldset>
          ) : step === 1 ? (
            <motion.div key="s1" {...anim} transition={{ duration: 0.35 }}>
              <p className={`${display} text-[1.5rem]`} id="bw-time-legend">Pick a time that suits you</p>
              <div className="-mx-6 mt-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8">
                <div className="flex gap-2" role="group" aria-label="Choose a day">
                  {days.map((d, i) => {
                    const on = dayIdx === i;
                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setDayIdx(i);
                          setTime(null);
                        }}
                        className={`flex w-[4.1rem] shrink-0 flex-col items-center rounded-2xl py-3 transition-colors ${focusRing} ${
                          on ? "bg-[#2d5547] text-[#fffcf7]" : "bg-[#f6f1ea] text-[#1c2a26] hover:bg-[#ece3d6]"
                        }`}
                      >
                        <span className={`text-[0.7rem] font-semibold uppercase tracking-wider ${on ? "text-[#d5e0d7]" : "text-[#55625c]"}`}>
                          {d.toLocaleDateString("en-GB", { weekday: "short" })}
                        </span>
                        <span className={`${display} mt-0.5 text-[1.45rem] leading-none`}>{d.getDate()}</span>
                        <span className={`mt-1 text-[0.68rem] ${on ? "text-[#d5e0d7]" : "text-[#55625c]"}`}>
                          {d.toLocaleDateString("en-GB", { month: "short" })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="mt-5 text-[0.85rem] text-[#55625c]">
                {dayLabel}
                {day?.getDay() === 4 ? ". Late evening slots available." : ""}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4" role="group" aria-labelledby="bw-time-legend">
                {slots.map((s) => {
                  const on = time === s.t;
                  return (
                    <button
                      key={s.t}
                      type="button"
                      disabled={s.taken}
                      aria-pressed={on}
                      aria-label={s.taken ? `${ampm(s.t)}, already booked` : ampm(s.t)}
                      onClick={() => setTime(s.t)}
                      className={`rounded-xl border py-2.5 text-[0.9rem] font-semibold tabular-nums transition-colors ${focusRing} ${
                        s.taken
                          ? "cursor-not-allowed border-transparent bg-transparent text-[#55625c]/45 line-through"
                          : on
                            ? "border-[#2d5547] bg-[#2d5547] text-[#fffcf7]"
                            : "border-[#1c2a26]/12 hover:border-[#2d5547] hover:bg-[#e3ebe4]/50"
                      }`}
                    >
                      {ampm(s.t)}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.fieldset key="s2" {...anim} transition={{ duration: 0.35 }}>
              <legend className={`${display} text-[1.5rem]`}>Anything that would help?</legend>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-[#55625c]">
                Optional. Whatever you tick goes straight onto your notes, so
                you won&rsquo;t have to explain it on the day.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {comforts.map((c) => {
                  const on = prefs.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPrefs((p) => (on ? p.filter((x) => x !== c) : [...p, c]))}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.9rem] font-medium transition-colors ${focusRing} ${
                        on ? "border-[#2d5547] bg-[#2d5547] text-[#fffcf7]" : "border-[#1c2a26]/12 hover:border-[#2d5547]/50 hover:bg-[#f6f1ea]"
                      }`}
                    >
                      <span aria-hidden="true" className={`flex h-4 w-4 items-center justify-center rounded-full ${on ? "bg-[#fffcf7] text-[#2d5547]" : "border border-[#1c2a26]/25"}`}>
                        {on ? <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M3.5 8.5l3 3 6-7" /></svg> : null}
                      </span>
                      {c}
                    </button>
                  );
                })}
              </div>
            </motion.fieldset>
          ) : (
            <motion.form key="s3" id="bw-details" {...anim} transition={{ duration: 0.35 }} onSubmit={submit} noValidate>
              <p className={`${display} text-[1.5rem]`}>Last thing: who&rsquo;s coming in?</p>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="bw-name" className="text-[0.85rem] font-semibold">Full name</label>
                  <input
                    id="bw-name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={nameErr}
                    aria-describedby={nameErr ? "bw-name-err" : undefined}
                    className={`mt-1.5 w-full rounded-xl border bg-[#fffcf7] px-4 py-3 text-[1rem] outline-none transition-colors focus:border-[#2d5547] focus:ring-2 focus:ring-[#2d5547]/20 ${nameErr ? "border-[#a4553a]" : "border-[#1c2a26]/15"}`}
                  />
                  {nameErr ? <p id="bw-name-err" className="mt-1 text-[0.8rem] text-[#a4553a]">Please add your name.</p> : null}
                </div>
                <div>
                  <label htmlFor="bw-mobile" className="text-[0.85rem] font-semibold">Mobile number</label>
                  <input
                    id="bw-mobile"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="07700 900123"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    aria-invalid={mobileErr}
                    aria-describedby={mobileErr ? "bw-mobile-err" : "bw-mobile-hint"}
                    className={`mt-1.5 w-full rounded-xl border bg-[#fffcf7] px-4 py-3 text-[1rem] outline-none transition-colors placeholder:text-[#55625c]/50 focus:border-[#2d5547] focus:ring-2 focus:ring-[#2d5547]/20 ${mobileErr ? "border-[#a4553a]" : "border-[#1c2a26]/15"}`}
                  />
                  {mobileErr ? (
                    <p id="bw-mobile-err" className="mt-1 text-[0.8rem] text-[#a4553a]">Please enter a UK mobile number.</p>
                  ) : (
                    <p id="bw-mobile-hint" className="mt-1 text-[0.8rem] text-[#55625c]">For your confirmation text. We never call unless you ask.</p>
                  )}
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-[#f6f1ea] px-4 py-3.5 text-[0.9rem]">
                <span className="font-semibold">{reason !== null ? reasons[reason].label : ""}</span>
                <span className="text-[#55625c]"> · {dayLabel}, {time ? ampm(time) : ""}</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {!done ? (
        <div className="flex items-center justify-between gap-3 border-t border-[#1c2a26]/8 bg-[#f6f1ea]/60 px-6 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`rounded-full px-4 py-2.5 text-[0.9rem] font-semibold text-[#55625c] transition-colors hover:text-[#1c2a26] ${step === 0 ? "invisible" : ""} ${focusRing}`}
          >
            Back
          </button>
          <p className="hidden text-[0.8rem] text-[#55625c] sm:block">No payment to book. Free to move.</p>
          {step < 3 ? (
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-[#2d5547] px-6 text-[0.92rem] font-semibold text-[#fffcf7] transition-colors hover:bg-[#22433a] disabled:cursor-not-allowed disabled:bg-[#2d5547]/35 ${focusRing}`}
            >
              {step === 2 ? (prefs.length ? "Continue" : "Skip") : "Continue"}
            </button>
          ) : (
            <button
              type="submit"
              form="bw-details"
              className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-[#2d5547] px-6 text-[0.92rem] font-semibold text-[#fffcf7] transition-colors hover:bg-[#22433a] ${focusRing}`}
            >
              Confirm booking
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
