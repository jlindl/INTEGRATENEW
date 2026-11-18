"use client";

/**
 * The small Black Friday link at the top of the homepage hero.
 *
 * The homepage only renders it while the offer is live by server time (it
 * revalidates every minute). This component is the backstop for a cached
 * copy: it also hides itself once the deadline passes on the visitor's clock,
 * and it can only ever hide, never show.
 */
import { useEffect, useState } from "react";
import { track } from "@/lib/gtag";

export function HomeBanner({ deadline, price }: { deadline: number; price: number }) {
  const [live, setLive] = useState(true);

  useEffect(() => {
    const check = () => setLive(Date.now() < deadline);
    check();
    const id = window.setInterval(check, 30_000);
    return () => window.clearInterval(id);
  }, [deadline]);

  if (!live) return null;

  return (
    <a
      href="/black-friday"
      onClick={() => track("cta_click", { place: "home_black_friday_banner" })}
      className="group mb-5 inline-flex min-h-11 max-w-full items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-1.5 pr-3.5 text-[0.8rem] text-ivory transition-colors duration-300 hover:border-halo/60 hover:bg-white/[0.07] sm:text-[0.84rem]"
    >
      <span className="shrink-0 rounded-full bg-ivory px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-carbon">
        Black Friday
      </span>
      <span className="min-w-0 truncate">
        <span className="sm:hidden">£{price}/mo: website, SEO, stories</span>
        <span className="hidden sm:inline">A new website, full SEO and 30 stories a month for £{price}/mo</span>
      </span>
      <span aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}
