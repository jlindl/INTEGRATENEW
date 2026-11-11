import { GlobeIcon, SparkIcon } from "@/components/web-design-portal/icons";

/**
 * The capsule track with a glowing orb that sweeps between an "AI" cap and a
 * "shipped product" cap — intelligence travelling into something live.
 *
 * Entirely CSS-driven: no timers, no state, nothing to hydrate. `--orb-throw`
 * sets the travel distance so the track can change width per breakpoint while
 * the keyframes stay fixed.
 */

const CAP =
  "cap-pulse absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border bg-abyss/70 backdrop-blur-sm";

export default function OrbSlider() {
  return (
    <div className="relative flex items-center justify-center py-16 lg:py-24">
      {/* Soft bloom behind the whole assembly. */}
      <div
        aria-hidden
        className="halo-breathe pointer-events-none absolute h-[320px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(160,43,255,0.42),rgba(103,11,178,0.16)_52%,transparent_78%)] blur-[36px] lg:h-[380px] lg:w-[640px]"
      />

      <div className="orb-track relative h-14 w-[268px] rounded-full border border-neon-400/45 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_50px_-12px_rgba(160,43,255,0.8)] backdrop-blur-sm sm:w-[300px]">
        {/* The rail the orb runs along. */}
        <div
          aria-hidden
          className="absolute inset-x-14 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-neon-300/45 to-transparent"
        />

        <span className={`${CAP} left-1.5`}>
          <SparkIcon className="h-[18px] w-[18px]" />
        </span>

        <span className={`${CAP} cap-pulse-late right-1.5`}>
          <GlobeIcon className="h-[19px] w-[19px]" />
        </span>

        {/* Travelling group: the orb plus the smear of light it drags along. */}
        <div
          aria-hidden
          className="orb-travel absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute h-16 w-24 rounded-full bg-neon-400/35 blur-xl" />
            <span className="orb-pulse relative h-[30px] w-[30px] rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
