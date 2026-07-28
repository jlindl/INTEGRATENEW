import Image from "next/image";
import { ClockIcon, FlameIcon, PhoneIcon, StarIcon, Stars } from "./icons";
import {
  btnGhostDark,
  btnPrimary,
  container,
  displayFont,
  eyebrowDark,
  focusDark,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "./theme";

const PROOF = [
  { value: "No fee", label: "for call-outs, ever" },
  { value: "4.9", label: "on Google, 212 reviews" },
  { value: "Gas Safe", label: "registered, no. 512345" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0c1420]">
      {/* Pipework photo held at texture level under a navy wash */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1920&q=60"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.13]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1420]/75 via-[#0c1420]/35 to-[#0c1420]" />
      </div>

      <div
        className={`${container} relative grid gap-14 pb-20 pt-16 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24`}
      >
        <div>
          <p className={eyebrowDark}>Gas Safe Registered · Same Day</p>
          <h1
            className={`${displayFont} mt-4 text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#eef5fb]`}
          >
            Leaks stopped. Homes protected. Same day.
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[#8ba3ba]">
            Local plumbing and heating you can actually get hold of. No call-out fee, fixed quotes, and engineers who
            tidy up after themselves.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className={`${btnPrimary} ${focusDark}`}>
              Book an engineer
            </a>
            <a href={PHONE_HREF} className={`${btnGhostDark} ${focusDark}`}>
              <PhoneIcon className="h-4 w-4 text-[#23c1a6]" />
              Emergency line
              <span className="font-medium text-[#8ba3ba]">{PHONE_DISPLAY}</span>
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-[#1f3346] pt-6">
            {PROOF.map((item) => (
              <div key={item.value}>
                <dt className="sr-only">{item.label}</dt>
                <dd className={`${displayFont} text-xl font-bold text-[#eef5fb] sm:text-2xl`}>{item.value}</dd>
                <dd className="mt-1 text-[0.78rem] leading-snug text-[#8ba3ba]">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Floating trust card stack */}
        <div className="w-full max-w-md lg:ml-auto">
          <div className="rounded-2xl bg-white p-6 shadow-[0_32px_70px_-28px_rgba(0,6,12,0.85)] sm:p-7">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6f8f3] text-[#0d6e5d]">
                <FlameIcon className="h-5 w-5" />
              </span>
              <div>
                <p className={`${displayFont} font-bold text-[#12212e]`}>Gas Safe Registered</p>
                <p className="mt-0.5 text-sm leading-relaxed text-[#4e6274]">
                  Every engineer carries the card. Registration no. 512345.
                </p>
              </div>
            </div>

            <div className="my-5 h-px bg-[#dde8ee]" aria-hidden="true" />

            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6f8f3] text-[#0d6e5d]">
                <ClockIcon className="h-5 w-5" />
              </span>
              <div>
                <p className={`${displayFont} font-bold text-[#12212e]`}>On our way within 2 hours</p>
                <p className="mt-0.5 text-sm leading-relaxed text-[#4e6274]">
                  For emergencies across Leeds, day or night.
                </p>
              </div>
            </div>

            <div className="my-5 h-px bg-[#dde8ee]" aria-hidden="true" />

            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6f8f3] text-[#f0a11b]">
                <StarIcon className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className={`${displayFont} font-bold text-[#12212e]`}>4.9 on Google</p>
                  <Stars starClassName="h-3 w-3" label="Rated 4.9 out of 5 on Google" />
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-[#4e6274]">
                  212 reviews from homes across LS postcodes.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 -mt-4 ml-6 w-fit rounded-xl bg-[#23c1a6] px-4 py-3 shadow-[0_18px_36px_-16px_rgba(35,193,166,0.8)]">
            <p className="text-sm font-bold text-[#08110f]">No call-out fee. Ever.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
