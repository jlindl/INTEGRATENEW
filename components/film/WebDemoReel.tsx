"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/** The six working demos, cycled in full colour inside one browser frame. */
const DEMOS = [
  { slug: "plumbers", label: "plumbers" },
  { slug: "electricians", label: "electricians" },
  { slug: "dental-practices", label: "dental practices" },
  { slug: "law-firms", label: "law firms" },
  { slug: "accountants", label: "accountants" },
  { slug: "recruiters", label: "recruiters" },
] as const;

const HOLD_MS = 3200;

export function WebDemoReel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % DEMOS.length), HOLD_MS);
    return () => window.clearInterval(t);
  }, [paused]);

  const current = DEMOS[i];

  return (
    <div
      className="film-reel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link
        href={`/web-design/demo/${current.slug}`}
        className="film-browser film-reel-browser"
        aria-label={`Open the Integrate demo website for ${current.label}`}
      >
        <span className="film-browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="film-browser-url">integrate demo · {current.label}</span>
        </span>
        <span className="film-reel-stage">
          {DEMOS.map((d, n) => (
            <Image
              key={d.slug}
              src={`/portfolio/${d.slug}-v2.jpg`}
              alt={n === i ? `Homepage of the Integrate demo website for ${d.label}` : ""}
              aria-hidden={n === i ? undefined : true}
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 560px, 90vw"
              className="film-reel-img"
              data-on={n === i ? "" : undefined}
            />
          ))}
        </span>
      </Link>

      <div className="film-reel-dots" role="group" aria-label="Choose a demo">
        {DEMOS.map((d, n) => (
          <button
            key={d.slug}
            type="button"
            aria-label={`Show the ${d.label} demo`}
            aria-pressed={n === i}
            onClick={() => setI(n)}
            className="film-reel-dot"
          />
        ))}
      </div>
    </div>
  );
}
