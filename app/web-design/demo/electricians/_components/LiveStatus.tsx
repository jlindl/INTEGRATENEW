"use client";

import { useEffect, useState } from "react";

/**
 * A believable "who's on right now" readout, worked out from the visitor's
 * clock in UK time. The server renders a neutral version; the client fills
 * in the shift after hydration, so markup never mismatches.
 */

type Shift = { label: string; crew: number; names: string; eta: string };

function shiftFor(hour: number): Shift {
  if (hour >= 7 && hour < 18)
    return { label: "Day team on shift", crew: 6, names: "Dan, Kofi, Leanne +3", eta: "18 min" };
  if (hour >= 18 && hour < 23)
    return { label: "Evening team on call", crew: 3, names: "Kofi, Leanne, Sam", eta: "22 min" };
  return { label: "Night team on call", crew: 2, names: "Sam and Ruth", eta: "31 min" };
}

function ukHour() {
  try {
    return Number(
      new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Europe/London" }).format(new Date()),
    );
  } catch {
    return new Date().getHours();
  }
}

export function useShift() {
  const [shift, setShift] = useState<Shift | null>(null);
  useEffect(() => {
    const update = () => setShift(shiftFor(ukHour()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return shift;
}

const recent = [
  "Board fault made safe, Didsbury M20",
  "Tripping RCD traced, Sale M33",
  "Kitchen circuit restored, Stockport SK4",
  "EICR issued, Salford M6",
  "Storm damage isolated, Bury BL9",
  "Outside socket replaced, Altrincham WA14",
];

/** Rotates through recently closed jobs. Static under reduced motion. */
export function RecentJobs({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % recent.length), 4200);
    return () => window.clearInterval(id);
  }, []);
  const mins = [12, 31, 47, 58, 76, 94][i];
  return (
    <span className={className}>
      <span key={i} className="inline-block motion-safe:animate-[ve-fade_.5s_ease-out_both]">
        {recent[i]} <span className="text-[#9aa4b2]">· {mins} min ago</span>
      </span>
    </span>
  );
}

export function ShiftLine() {
  const shift = useShift();
  return (
    <span>
      {shift ? (
        <>
          {shift.label}: <span className="text-[#f3f5f8]">{shift.crew} electricians</span>
        </>
      ) : (
        <>Emergency line open 24/7</>
      )}
    </span>
  );
}
