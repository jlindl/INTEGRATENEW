"use client";

/**
 * The strip across the top of /black-friday: spots left, the end date and a
 * live countdown (days, hours, minutes). Sticky on phones and tablets so the
 * deadline stays in view; on desktop it scrolls away with the header.
 */
import { SPOTS_REMAINING, spotsLabel, timeLeft } from "@/lib/blackFriday";
import { useOffer } from "./OfferGate";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ className = "" }: { className?: string }) {
  const { remaining } = useOffer();
  const { days, hours, minutes } = timeLeft(remaining);
  const parts = [
    { v: String(days), u: "d" },
    { v: pad(hours), u: "h" },
    { v: pad(minutes), u: "m" },
  ];
  return (
    <span className={`inline-flex items-baseline gap-1.5 tabular-nums ${className}`}>
      <span className="sr-only">
        Time left: {days} {days === 1 ? "day" : "days"}, {hours} {hours === 1 ? "hour" : "hours"} and {minutes}{" "}
        {minutes === 1 ? "minute" : "minutes"}.
      </span>
      {parts.map((p) => (
        <span key={p.u} aria-hidden="true">
          <span className="text-ivory">{p.v}</span>
          <span className="text-mist">{p.u}</span>
        </span>
      ))}
    </span>
  );
}

export function TopBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-graphite bg-carbon text-ivory lg:static">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2.5 text-center font-mono text-[0.66rem] uppercase tracking-[0.12em] sm:justify-between sm:px-8 sm:text-[0.7rem]">
        <span className="inline-flex items-center gap-2">
          <span className="silver-sheen h-1.5 w-1.5 rounded-full" aria-hidden="true" />
          <span>
            Black Friday <span className="text-mist" aria-hidden="true">·</span> {spotsLabel(SPOTS_REMAINING)}
          </span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span>Ends Cyber Monday 30.11</span>
          <span className="text-mist" aria-hidden="true">·</span>
          <Countdown />
        </span>
      </p>
    </div>
  );
}
