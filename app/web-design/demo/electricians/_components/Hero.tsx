import Image from "next/image";
import { RecentJobs } from "./LiveStatus";
import { DispatchPanel } from "./DispatchPanel";
import {
  Arrow,
  Bolt,
  PHONE,
  PhoneIcon,
  Stars,
  TEL,
  display,
  focusRing,
  mono,
  wrap,
} from "./ui";

const tickerItems = [
  "Answered by an electrician, not a call centre",
  "Fixed call-out price before we set off",
  "Every job tested and certified",
  "No subcontractors",
  "Christmas Day included",
  "10 year workmanship warranty",
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative -mt-[105px] flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0c0f]"
    >
      {/* Photo: hands testing a live board, graded down into the dark */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 -scale-x-100">
        <Image
          src="/web-design/demo/electricians/hero-board.webp"
          alt="A Voltedge electrician testing a breaker inside an open distribution board"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[22%_45%] brightness-[.66] contrast-[1.15] saturate-[.55] motion-safe:animate-[ve-kenburns_14s_cubic-bezier(.2,.6,.2,1)_both]"
        />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,#0a0c0f_0%,rgba(10,12,15,.92)_30%,rgba(10,12,15,.55)_62%,rgba(10,12,15,.25)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,#0a0c0f_0%,rgba(10,12,15,0)_45%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_35%,rgba(255,176,32,.16),transparent_70%)] mix-blend-screen" />
        <div aria-hidden="true" className="ve-grain absolute inset-0" />
      </div>

      <div className={`${wrap} relative flex flex-1 flex-col justify-end pb-12 pt-[150px] sm:pb-16 lg:pb-20`}>
        <div className="grid items-end gap-12 xl:grid-cols-[1fr_380px]">
          <div>
            <p className={`${mono} flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] uppercase tracking-[0.2em] text-[#9aa4b2] motion-safe:animate-[ve-fade_.7s_.1s_ease-out_both]`}>
              <span className="text-[#ffb020]">24/7 emergency electricians</span>
              <span aria-hidden="true" className="h-px w-8 bg-white/25" />
              Greater Manchester
            </p>

            <h1
              id="hero-title"
              className={`${display} mt-5 text-[clamp(4.4rem,15vw,11rem)] xl:text-[clamp(7rem,9vw,9.5rem)] font-black uppercase leading-[0.82] tracking-[-0.01em] text-[#f3f5f8]`}
            >
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="block text-[#ffb020] motion-safe:animate-[ve-flicker_1.4s_.35s_linear_both]">
                  Power out?
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="block motion-safe:animate-[ve-rise_.9s_.15s_cubic-bezier(.2,.75,.2,1)_both]">
                  We pick up.
                </span>
              </span>
            </h1>

            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-[#c9d0d9] sm:text-xl motion-safe:animate-[ve-fade_.8s_.5s_ease-out_both]">
              A qualified electrician answers, quotes you a fixed call-out price
              on the phone, and is usually at your door inside 30 minutes. Day,
              night, bank holidays.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-stretch motion-safe:animate-[ve-fade_.8s_.65s_ease-out_both]">
              <a
                href={TEL}
                className={`group relative flex items-center gap-4 bg-[#ffb020] py-3.5 pl-4 pr-6 text-[#0a0c0f] shadow-[0_0_60px_rgba(255,176,32,.28)] transition-[background-color,box-shadow] hover:bg-[#ffc04a] hover:shadow-[0_0_80px_rgba(255,176,32,.45)] ${focusRing}`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center bg-[#0a0c0f] text-[#ffb020]">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className={`${mono} text-[0.68rem] font-medium uppercase tracking-[0.16em] opacity-75`}>
                    Tap to call, 24/7
                  </span>
                  <span className={`${display} text-[2rem] font-black uppercase leading-none tracking-[0.01em]`}>
                    {PHONE}
                  </span>
                </span>
              </a>
              <a
                href="#quote"
                className={`group inline-flex items-center justify-between gap-4 border border-white/25 bg-[#0a0c0f]/40 px-6 py-4 ${display} text-xl font-bold uppercase tracking-[0.04em] text-[#f3f5f8] backdrop-blur-sm transition-colors hover:border-[#ffb020] hover:text-[#ffb020] ${focusRing}`}
              >
                Not urgent? Get a fixed price
                <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <ul className={`${mono} mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.75rem] uppercase tracking-[0.12em] text-[#9aa4b2] motion-safe:animate-[ve-fade_.8s_.8s_ease-out_both]`}>
              <li className="flex items-center gap-2">
                <Stars className="h-3.5 w-3.5" />
                <span>
                  <span className="text-[#f3f5f8]">4.9</span> from 320 Google reviews
                </span>
              </li>
              <li>NICEIC Approved Contractor</li>
              <li>10 year workmanship warranty</li>
            </ul>
          </div>

          <div className="hidden xl:block motion-safe:animate-[ve-fade_.9s_.9s_ease-out_both]">
            <DispatchPanel />
          </div>
        </div>

        {/* Mobile and tablet: compact live line instead of the full panel */}
        <p className={`${mono} mt-8 flex items-start gap-2 border-t border-white/10 pt-4 text-[0.72rem] uppercase leading-relaxed tracking-[0.12em] text-[#f3f5f8] xl:hidden`}>
          <span className="shrink-0 text-[#ffb020]">Last job ·</span>
          <RecentJobs />
        </p>
      </div>

      {/* Amber ticker. Duplicated list so the loop is seamless; the copy is hidden from AT. */}
      <div className="relative z-10 overflow-hidden bg-[#ffb020] text-[#0a0c0f]">
        <div className="flex w-max motion-safe:animate-[ve-ticker_38s_linear_infinite]">
          {[0, 1].map((dup) => (
            <ul
              key={dup}
              aria-hidden={dup === 1 ? true : undefined}
              className={`${display} flex shrink-0 items-center py-3 text-lg font-extrabold uppercase tracking-[0.06em]`}
            >
              {tickerItems.map((t) => (
                <li key={t} className="flex items-center gap-6 pl-6">
                  {t}
                  <Bolt className="h-4 w-4" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
