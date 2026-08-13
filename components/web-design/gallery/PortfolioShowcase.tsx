/**
 * PortfolioShowcase — the hub's #work section, ported 1:1 from the
 * integratewebdesign.vercel.app "Selected work" treatment: an ink backdrop
 * (#050208) with a masked dot-grid, film grain, a purple radial bloom and a
 * bracketed frame; a centered neon eyebrow pill + Inter Tight heading +
 * subheading; and the 3-D coverflow <WorkCarousel> beneath.
 *
 * The builds are data-driven from lib/webDesignData — add a niche there and it
 * joins the carousel automatically.
 */
import localFont from "next/font/local";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCarousel } from "@/components/web-design/gallery/WorkCarousel";
import { IndustryGrid } from "@/components/web-design/gallery/IndustryGrid";

/* Inter Tight — the live site's face for this section. */
const interTight = localFont({
  src: [
    { path: "../../../assets/fonts/inter-tight/inter-tight-100-900.woff2", weight: "100 900", style: "normal" },
  ],
  display: "swap",
});

/* Four-point sparkle for the eyebrow pill (matches the live badge). */
function SparkIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4 text-[#ddb8ff]">
      <path
        d="M9.1 1.2 10 4.3a2 2 0 0 0 1.35 1.36l3.1.9-3.1.9A2 2 0 0 0 10 8.82l-.9 3.1-.9-3.1A2 2 0 0 0 6.85 7.46l-3.1-.9 3.1-.9A2 2 0 0 0 8.2 4.3l.9-3.1Z"
        fill="currentColor"
      />
      <path
        d="M3.4 9.7l.34 1.18a1.4 1.4 0 0 0 .95.95l1.18.34-1.18.34a1.4 1.4 0 0 0-.95.95l-.34 1.18-.34-1.18a1.4 1.4 0 0 0-.95-.95L.93 12.5l1.18-.34a1.4 1.4 0 0 0 .95-.95L3.4 9.7Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export function PortfolioShowcase() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className={`${interTight.className} relative isolate overflow-hidden border-t border-white/[0.06] bg-[#050208]`}
    >
      {/* Masked dot-grid */}
      <div aria-hidden="true" className="iwd-dot-grid absolute inset-0 z-0" />
      {/* Film grain */}
      <div
        aria-hidden="true"
        className="iwd-grain pointer-events-none absolute -inset-[10%] z-[1] opacity-[0.05] mix-blend-overlay"
      />
      {/* Purple radial bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 z-0 h-[520px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(103,11,178,0.28), transparent 72%)",
        }}
      />

      {/* Bracketed frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 mx-auto w-full max-w-[1420px] px-6 sm:px-10"
      >
        <div className="relative h-full w-full border-x border-white/[0.07]">
          <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] border-b-0 border-r-0 border-[#ddb8ff]/35 [border-style:solid]" />
          <span className="absolute -right-[5px] top-2 h-[9px] w-[9px] border-b-0 border-l-0 border-[#ddb8ff]/35 [border-style:solid]" />
          <span className="absolute -left-[5px] bottom-2 h-[9px] w-[9px] border-r-0 border-t-0 border-[#ddb8ff]/35 [border-style:solid]" />
          <span className="absolute -right-[5px] bottom-2 h-[9px] w-[9px] border-l-0 border-t-0 border-[#ddb8ff]/35 [border-style:solid]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 py-16 sm:px-10 lg:py-20">
        <Reveal className="flex flex-col items-center text-center">
          <span className="iwd-badge-glow relative inline-flex items-center gap-2 rounded-full border border-[#b25dff]/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
            <SparkIcon />
            Selected work
          </span>

          <h2
            id="work-heading"
            className="mt-8 max-w-[18ch] text-balance text-[clamp(1.875rem,3.4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.035em] text-white"
          >
            Sites and Apps We&rsquo;ve Shipped
          </h2>

          <p className="mt-6 max-w-[52ch] text-balance text-[clamp(1rem,1.1vw,1.2rem)] leading-[1.55] text-white/60">
            Eight builds across trades, professional services, health,
            hospitality and clothing. Drag, swipe, or use the arrows, then open
            any of them live.
          </p>
        </Reveal>

        <WorkCarousel />

        <IndustryGrid />
      </div>
    </section>
  );
}
