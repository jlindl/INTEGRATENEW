"use client";

import { RecentJobs, useShift } from "./LiveStatus";
import { LiveDot, display, mono } from "./ui";

/**
 * Hero side panel styled like an instrument readout. It answers the two
 * questions a panicking caller has: is anyone there, and how fast.
 */
export function DispatchPanel() {
  const shift = useShift();

  return (
    <aside
      aria-label="Live call-out status"
      className="relative border border-white/15 bg-[#0a0c0f]/75 backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <p className={`${mono} flex items-center gap-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-[#f3f5f8]`}>
          <LiveDot />
          Emergency line open
        </p>
        <p className={`${mono} text-[0.7rem] uppercase tracking-[0.18em] text-[#9aa4b2]`}>Dispatch</p>
      </div>

      <dl className="grid grid-cols-2">
        <div className="border-b border-r border-white/10 px-5 py-5">
          <dt className={`${mono} text-[0.66rem] uppercase tracking-[0.16em] text-[#9aa4b2]`}>On call now</dt>
          <dd className={`${display} mt-1 text-[3.2rem] font-black leading-none text-[#f3f5f8]`}>
            {shift ? shift.crew : 6}
            <span className="ml-1 text-lg font-bold text-[#9aa4b2]">sparks</span>
          </dd>
        </div>
        <div className="border-b border-white/10 px-5 py-5">
          <dt className={`${mono} text-[0.66rem] uppercase tracking-[0.16em] text-[#9aa4b2]`}>Avg. arrival</dt>
          <dd className={`${display} mt-1 text-[3.2rem] font-black leading-none text-[#ffb020]`}>
            {shift ? shift.eta.replace(" min", "") : "18"}
            <span className="ml-1 text-lg font-bold text-[#9aa4b2]">min</span>
          </dd>
        </div>
      </dl>

      <div className="border-b border-white/10 px-5 py-4">
        <p className={`${mono} text-[0.66rem] uppercase tracking-[0.16em] text-[#9aa4b2]`}>
          {shift ? shift.label : "Engineers on shift"}
        </p>
        <p className="mt-1 text-[0.95rem] text-[#f3f5f8]">{shift ? shift.names : "Day, evening and night teams"}</p>
      </div>

      <div className="px-5 py-4">
        <p className={`${mono} text-[0.66rem] uppercase tracking-[0.16em] text-[#9aa4b2]`}>Last job closed</p>
        <p className="mt-1 min-h-[3rem] text-[0.95rem] leading-snug text-[#f3f5f8]">
          <RecentJobs />
        </p>
      </div>

      {/* Corner ticks, like a meter bezel */}
      <span aria-hidden="true" className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-[#ffb020]" />
      <span aria-hidden="true" className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#ffb020]" />
    </aside>
  );
}
