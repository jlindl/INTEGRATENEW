"use client";

/**
 * The film's primary action. Leans toward the cursor on desktop (the lean is
 * applied to an inner wrapper, so the link's own box never moves and stays an
 * honest hit target), presses in on tap. Always rendered visible: it may be
 * decorated by motion but is never hidden by it.
 */
import { useRef, type ReactNode, type PointerEvent } from "react";
import { track } from "@/lib/gtag";

export function FilmCta({
  href,
  children,
  tone = "light",
  size = "md",
  className = "",
  place,
}: {
  href: string;
  children: ReactNode;
  /** light = ivory pill for carbon rooms, dark = ink pill for paper rooms. */
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
  /** Where on the page this button sits, for analytics. */
  place: string;
}) {
  const inner = useRef<HTMLSpanElement>(null);

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse" || !inner.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
    inner.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  }
  function onLeave() {
    if (inner.current) inner.current.style.transform = "";
  }

  return (
    <a
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => track("cta_click", { place })}
      className={`film-btn film-btn--${tone} film-btn--${size} ${className}`}
    >
      <span ref={inner} className="film-btn-inner">
        <span className="film-btn-label">{children}</span>
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true" className="film-btn-arrow">
          <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
