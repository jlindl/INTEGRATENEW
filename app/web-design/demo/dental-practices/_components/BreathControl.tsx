"use client";

import { useState } from "react";
import { focusRing } from "./ui";

/** Pause/play for the breathing animation (WCAG 2.2.2: moving content can be paused). */
export function BreathControl() {
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.querySelector("[data-breath]")?.toggleAttribute("data-paused", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? "Resume breathing animation" : "Pause breathing animation"}
      className={`bw-breath-btn flex h-8 w-8 items-center justify-center rounded-full text-[#2d5547] transition-colors hover:bg-[#e3ebe4] ${focusRing}`}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M5 3.5v9l7.5-4.5z" /> : <path d="M4.5 3.5h2.4v9H4.5zM9.1 3.5h2.4v9H9.1z" />}
      </svg>
    </button>
  );
}
