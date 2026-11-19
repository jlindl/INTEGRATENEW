import { BookingWidget } from "./BookingWidget";
import { Reveal } from "./Reveal";
import { container, display, eyebrowLight, focusRingLight, phone } from "./ui";

const promises = [
  ["About a minute", "Four short steps. No account, no password."],
  ["Free to move", "Reply to any text to change or cancel. No fee for 24 hours’ notice."],
  ["Nothing to pay today", "You only pay for what you agree to, on the day."],
];

export function Booking() {
  return (
    <section id="book" aria-labelledby="book-title" className="relative isolate scroll-mt-20 overflow-hidden bg-[#22433a] text-[#fffcf7]">
      <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-[#2d5547] blur-3xl" />
      <div aria-hidden="true" className="absolute right-[-10rem] top-[-10rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[#f2d6c6]/10 blur-3xl" />

      <div className={`${container} grid gap-14 py-24 sm:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-36`}>
        <Reveal>
          <p className={eyebrowLight}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#f2d6c6]" aria-hidden="true" />
            Book online
          </p>
          <h2
            id="book-title"
            className={`${display} mt-6 text-[clamp(2.4rem,5.2vw,4.3rem)] font-light leading-[1.02] tracking-[-0.03em]`}
          >
            The hardest part is{" "}
            <em className="text-[#f2d6c6] [font-variation-settings:'SOFT'_100,'WONK'_1]">this bit.</em> We&rsquo;ve made it easy.
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-[1.7] text-[#d5e0d7]">
            Real slots from our diary, no phone call required. Tell us what
            would help you feel comfortable and it&rsquo;ll be on your notes
            before you arrive.
          </p>

          <ul className="mt-10 space-y-5">
            {promises.map(([t, b]) => (
              <li key={t} className="flex gap-4">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fffcf7]/10" aria-hidden="true">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="#f2d6c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
                </span>
                <span>
                  <span className="block font-semibold">{t}</span>
                  <span className="block text-[0.93rem] text-[#d5e0d7]">{b}</span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-10 border-t border-[#fffcf7]/12 pt-6 text-[0.95rem] text-[#d5e0d7]">
            Rather speak to someone?{" "}
            <a href={phone.href} className={`rounded-sm font-semibold text-[#fffcf7] underline decoration-[#f2d6c6]/50 underline-offset-4 hover:decoration-[#f2d6c6] ${focusRingLight}`}>
              {phone.display}
            </a>
          </p>
        </Reveal>

        <Reveal delay={100} className="min-w-0">
          <BookingWidget />
          <noscript>
            <p className="mt-4 text-[0.9rem] text-[#d5e0d7]">
              Online booking needs JavaScript. Please call us on {phone.display} and we&rsquo;ll book you in.
            </p>
          </noscript>
        </Reveal>
      </div>
    </section>
  );
}
