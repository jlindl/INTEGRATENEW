import Image from "next/image";
import { DispatchCard } from "./DispatchCard";
import { ArrowIcon, PhoneIcon, StarIcon } from "./icons";
import s from "./nl.module.css";
import { display, focusRing, mono, narrow, PHONE_DISPLAY, PHONE_HREF, wrap } from "./theme";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-[#f3f6f5]">
      {/* Faint plan grid, like a pipework drawing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(#dfe7e8_1px,transparent_1px),linear-gradient(90deg,#dfe7e8_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className={`${wrap} relative grid gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-16`}>
        <div className="lg:col-span-7 lg:pt-6">
          <p
            className={`${s.rise} inline-flex items-center gap-2.5 rounded-full border border-[#cdd8da] bg-white px-3.5 py-1.5 text-[0.85rem] font-semibold text-[#0b1a28]`}
          >
            <span className={`${s.live} inline-block h-2 w-2 rounded-full bg-[#ff5a36] text-[#ff5a36]`} aria-hidden="true" />
            Taking emergency calls now across Leeds
          </p>

          <h1
            id="hero-title"
            className={`${display} ${s.rise} mt-6 text-[clamp(2.6rem,5.9vw,5.9rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-[#0b1a28] [animation-delay:80ms]`}
          >
            Yes, we can
            <br />
            come{" "}
            <span className="relative inline-block">
              <span className="relative z-10">today.</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-[-0.06em] bottom-[0.06em] z-0 h-[0.3em] rounded-sm bg-[#1ed3b0]"
              />
            </span>
          </h1>

          <p
            className={`${s.rise} mt-7 max-w-[34rem] text-[1.1rem] leading-[1.6] text-[#33475a] [animation-delay:160ms] sm:text-[1.18rem]`}
          >
            Leaks, boilers and blocked drains across Leeds and West Yorkshire. A real person answers in under 30 seconds,
            an engineer is usually at your door within two hours, and you get a fixed price before any tools come out.
          </p>

          {/* The two jobs people arrive with, kept apart */}
          <div className={`${s.rise} mt-9 grid gap-3 [animation-delay:240ms] sm:grid-cols-2`}>
            <a
              href={PHONE_HREF}
              className={`${focusRing} group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#1ed3b0] p-5 text-[#0b1a28] transition-transform duration-300 hover:-translate-y-1 sm:min-h-[184px] sm:p-6`}
            >
              <span className={`${narrow} text-[0.75rem] font-bold uppercase tracking-[0.2em]`}>
                Emergency, happening now
              </span>
              <span className="mt-5 block">
                <span className={`${display} flex items-center gap-2.5 text-[1.55rem] font-extrabold leading-none tracking-[-0.03em] sm:text-[1.7rem]`}>
                  <PhoneIcon className="h-6 w-6 shrink-0" />
                  <span className={mono}>{PHONE_DISPLAY}</span>
                </span>
                <span className="mt-2.5 block text-[0.92rem] font-medium leading-snug text-[#0b1a28]/80">
                  Answered by a person, 24/7. No call-out fee.
                </span>
              </span>
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#0b1a28] text-[#1ed3b0] transition-transform duration-300 group-hover:rotate-[-45deg]"
              >
                <ArrowIcon />
              </span>
            </a>

            <a
              href="#book"
              className={`${focusRing} group relative flex flex-col justify-between rounded-[24px] border border-[#cdd8da] bg-white p-5 text-[#0b1a28] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#0b1a28] sm:min-h-[184px] sm:p-6`}
            >
              <span className={`${narrow} text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#4b5d6b]`}>
                Planned work
              </span>
              <span className="mt-5 block">
                <span className={`${display} block text-[1.45rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[1.55rem]`}>
                  Book a visit or a fixed quote
                </span>
                <span className="mt-2.5 block text-[0.92rem] leading-snug text-[#4b5d6b]">
                  Boilers, bathrooms, servicing. Free surveys.
                </span>
              </span>
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[#cdd8da] transition-[transform,background-color,color] duration-300 group-hover:rotate-[-45deg] group-hover:bg-[#0b1a28] group-hover:text-white"
              >
                <ArrowIcon />
              </span>
            </a>
          </div>

          <ul
            className={`${s.rise} mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.92rem] text-[#33475a] [animation-delay:320ms]`}
          >
            <li className="flex items-center gap-2">
              <span className="flex text-[#e8a317]" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </span>
              <span>
                <strong className="text-[#0b1a28]">4.9</strong> from 412 Google reviews
              </span>
            </li>
            <li>
              <strong className="text-[#0b1a28]">Gas Safe</strong> <span className={mono}>000000</span>
            </li>
            <li>
              <strong className="text-[#0b1a28]">12-month</strong> guarantee on every repair
            </li>
          </ul>
        </div>

        {/* Photo + dispatch board */}
        <div className={`${s.fade} relative lg:col-span-5 [animation-delay:200ms]`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#dfe7e8] sm:aspect-[16/11] lg:aspect-auto lg:h-[min(640px,74vh)]">
            <Image
              src="/web-design/demo/plumbers/hero-under-sink.webp"
              alt="A Northline engineer sitting on a kitchen floor, fixing the pipework under a sink with his toolbox open beside him"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[72%_50%] [filter:saturate(0.9)_contrast(1.04)]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1a28]/45 via-transparent to-transparent" />
            <p className="absolute right-4 top-4 rounded-full bg-white/92 px-3.5 py-1.5 text-[0.8rem] font-semibold text-[#0b1a28] backdrop-blur">
              Callum, on a job in LS6
            </p>
          </div>

          <div className="relative z-10 mx-auto -mt-20 w-[calc(100%-1.5rem)] max-w-[400px] sm:-mt-28 lg:absolute lg:-left-6 lg:bottom-6 lg:mt-0 lg:w-[350px]">
            <DispatchCard />
          </div>
        </div>
      </div>
    </section>
  );
}
