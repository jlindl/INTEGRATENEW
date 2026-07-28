import { PhoneIcon } from "./icons";
import { container, displayFont, focusDark, PHONE_DISPLAY, PHONE_HREF } from "./theme";

export function EmergencyBanner() {
  return (
    <section aria-labelledby="emergency-heading" className="bg-[#0c1420]">
      <div
        className={`${container} flex flex-col items-start justify-between gap-6 py-9 sm:py-10 md:flex-row md:items-center`}
      >
        <div>
          <h2
            id="emergency-heading"
            className={`${displayFont} text-[1.35rem] font-bold leading-snug text-[#eef5fb] sm:text-2xl`}
          >
            Water where it shouldn&rsquo;t be? Call now.
          </h2>
          <p className="mt-1.5 text-[#8ba3ba]">24/7, no call-out fee. An engineer answers, not a queue.</p>
        </div>
        <a
          href={PHONE_HREF}
          className={`inline-flex items-center gap-3 rounded-xl px-2 py-2 ${focusDark} group`}
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#23c1a6] text-[#08110f] transition-colors group-hover:bg-[#31d6b9]">
            <PhoneIcon className="h-5 w-5" />
          </span>
          <span
            className={`${displayFont} text-[clamp(1.5rem,4vw,2.1rem)] font-extrabold tracking-[-0.01em] text-[#eef5fb] transition-colors group-hover:text-[#23c1a6]`}
          >
            {PHONE_DISPLAY}
          </span>
        </a>
      </div>
    </section>
  );
}
