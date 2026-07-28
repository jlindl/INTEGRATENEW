import {
  Eyebrow,
  HazardStripe,
  container,
  display,
  focusRingOnAmber,
} from "./ui";

export function Emergency() {
  return (
    <section id="emergency" className="bg-[#ffb020] text-[#12151b] scroll-mt-24">
      {/* Signature hazard stripe, use one of two */}
      <HazardStripe tone="dark" />

      <div className={`${container} py-14 text-center sm:py-20`}>
        <div className="flex justify-center">
          <Eyebrow tone="dark">24/7 emergency line</Eyebrow>
        </div>
        <h2
          className={`mt-4 ${display} text-[clamp(1.75rem,4.5vw,2.9rem)] font-bold uppercase leading-tight tracking-[0.01em]`}
        >
          No power? Burning smell? Tripping fuse box?
        </h2>
        <a
          href="tel:01614960100"
          className={`mt-6 inline-block rounded-lg px-2 ${display} text-[clamp(2.9rem,11vw,6.5rem)] font-bold leading-none tracking-[0.01em] transition-opacity hover:opacity-75 ${focusRingOnAmber}`}
        >
          0161 496 0100
        </a>
        <p className="mt-5 text-lg font-medium">
          Lines answered in under a minute, 24/7.
        </p>
      </div>
    </section>
  );
}
