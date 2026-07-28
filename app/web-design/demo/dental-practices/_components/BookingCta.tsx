"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { container, display, focusRing } from "./ui";

const treatments = [
  "New patient exam",
  "Check-up",
  "Hygiene",
  "Whitening",
  "Emergency",
];
const days = ["Tomorrow", "Wednesday", "Thursday", "Friday", "Saturday"];
const times = ["9:20", "11:00", "1:40", "3:15", "4:50"];

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${focusRing} ${
        selected
          ? "border-[#12b3a6] bg-[#12b3a6] text-white"
          : "border-[#dceeeb] bg-white text-[#13201f] hover:border-[#12b3a6]/50"
      }`}
    >
      {label}
    </button>
  );
}

export function BookingCta() {
  const [treatment, setTreatment] = useState(0);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(1);
  const [booked, setBooked] = useState(false);

  return (
    <section id="book" className="scroll-mt-24">
      <div
        className={`${container} grid gap-14 py-20 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-28`}
      >
        <Reveal>
          <p className="flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#4f6360]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12b3a6]" aria-hidden="true" />
            Book online
          </p>
          <h2
            className={`${display} mt-4 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-[#13201f]`}
          >
            Booked in under a minute. No phone call needed.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#4f6360]">
            Pick what you need and a time that suits you. You&rsquo;ll get an
            instant confirmation and a friendly reminder before your visit.
          </p>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#4f6360]">
                Prefer to call?
              </dt>
              <dd className="mt-1">
                <a
                  href="tel:+441132960480"
                  className={`rounded-sm text-lg font-semibold text-[#13201f] transition-colors hover:text-[#0f9c91] ${focusRing}`}
                >
                  0113 296 0480
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#4f6360]">
                Opening hours
              </dt>
              <dd className="mt-1 text-[#4f6360]">
                Mon–Fri 8:00–19:00 · Sat 9:00–14:00
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#4f6360]">
                Find us
              </dt>
              <dd className="mt-1 text-[#4f6360]">
                18 Wellspring Road, Leeds LS1 4HG
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-3xl border border-[#dceeeb] bg-white p-6 shadow-[0_40px_80px_-46px_rgba(19,32,31,0.4)] sm:p-8">
            {booked ? (
              <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#12b3a6]/12"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="#12b3a6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12.5l5 5L20 6" />
                  </svg>
                </span>
                <p
                  className={`${display} mt-5 text-2xl font-bold tracking-tight text-[#13201f]`}
                >
                  Request sent.
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#4f6360]">
                  We&rsquo;ll confirm your {treatments[treatment].toLowerCase()} for{" "}
                  <span className="font-semibold text-[#13201f]">
                    {days[day]} at {times[time]}
                  </span>{" "}
                  by text within the hour.
                </p>
                <button
                  type="button"
                  onClick={() => setBooked(false)}
                  className={`mt-6 rounded-full border border-[#dceeeb] px-5 py-2 text-sm font-semibold text-[#13201f] transition-colors hover:bg-[#f4faf9] ${focusRing}`}
                >
                  Book another
                </button>
              </div>
            ) : (
              <>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#4f6360]">
                  1 · What do you need?
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {treatments.map((t, i) => (
                    <Chip
                      key={t}
                      label={t}
                      selected={treatment === i}
                      onClick={() => setTreatment(i)}
                    />
                  ))}
                </div>

                <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#4f6360]">
                  2 · Pick a day
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {days.map((d, i) => (
                    <Chip
                      key={d}
                      label={d}
                      selected={day === i}
                      onClick={() => setDay(i)}
                    />
                  ))}
                </div>

                <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#4f6360]">
                  3 · Choose a time
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {times.map((t, i) => (
                    <Chip
                      key={t}
                      label={`${t}${i < 2 ? "am" : "pm"}`}
                      selected={time === i}
                      onClick={() => setTime(i)}
                    />
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between gap-4 rounded-xl bg-[#f4faf9] px-4 py-3">
                  <p className="text-sm text-[#4f6360]">
                    <span className="font-semibold text-[#13201f]">
                      {treatments[treatment]}
                    </span>{" "}
                    · {days[day]}, {times[time]}
                    {time < 2 ? "am" : "pm"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setBooked(true)}
                  className={`mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#12b3a6] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0f9c91] ${focusRing}`}
                >
                  Confirm booking
                </button>
                <p className="mt-3 text-center text-[0.72rem] text-[#4f6360]">
                  No payment needed to book. Free to reschedule any time.
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
