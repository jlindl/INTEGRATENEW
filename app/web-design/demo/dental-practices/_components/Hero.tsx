import Image from "next/image";
import { BreathControl } from "./BreathControl";
import { btnGhost, btnPrimary, container, display, eyebrow } from "./ui";

function Stars() {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="#a4553a">
          <path d="M10 1.6l2.5 5.3 5.8.6-4.3 3.9 1.2 5.7L10 14.3l-5.2 2.8 1.2-5.7L1.7 7.5l5.8-.6L10 1.6Z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * The hero's signature: the portrait sits inside a soft halo that breathes
 * at a 4 in, 4 hold, 6 out pace. All of it is CSS (see page.tsx), so it runs
 * without JS; the only client code is the pause button.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" aria-labelledby="hero-title" data-breath>
      {/* ambient wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[#e3ebe4] blur-3xl" />
        <div className="absolute -right-24 -top-32 h-[30rem] w-[30rem] rounded-full bg-[#f2d6c6]/70 blur-3xl" />
      </div>

      <div
        className={`${container} relative grid items-center gap-12 pb-20 pt-8 sm:pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-28 lg:pt-14`}
      >
        <div className="bw-rise">
          <p className={eyebrow}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#a4553a]" aria-hidden="true" />
            Gentle dentistry in Leeds
          </p>
          <h1
            id="hero-title"
            className={`${display} mt-6 text-[clamp(3rem,8.2vw,6.6rem)] font-light leading-[0.94] tracking-[-0.035em] text-[#1c2a26]`}
          >
            Take a breath.
            <span className="block italic text-[#2d5547] [font-variation-settings:'SOFT'_100,'WONK'_1]">
              We&rsquo;ll go
            </span>
            <span className="block">at your pace.</span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-[1.12rem] leading-[1.65] text-[#55625c]">
            Brightwell is a calm, unhurried practice for people who&rsquo;d
            rather not be at the dentist. Clear prices before anything starts,
            a stop signal we always honour, and online booking that takes about
            a minute.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#book" className={btnPrimary}>
              Book a first visit
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" />
              </svg>
            </a>
            <a href="#nervous" className={btnGhost}>
              I&rsquo;m a nervous patient
            </a>
          </div>

          <dl className="mt-12 grid max-w-[34rem] grid-cols-3 gap-4 border-t border-[#1c2a26]/10 pt-6">
            <div>
              <dt className="sr-only">Rating</dt>
              <dd>
                <span className={`${display} block text-[1.75rem] leading-none text-[#1c2a26]`}>4.9</span>
                <span className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-[#55625c]">
                  <Stars /> 1,100+ reviews
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">New patient wait</dt>
              <dd>
                <span className={`${display} block text-[1.75rem] leading-none text-[#1c2a26]`}>Same week</span>
                <span className="mt-2 block text-[0.8rem] text-[#55625c]">new-patient visits</span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Finance</dt>
              <dd>
                <span className={`${display} block text-[1.75rem] leading-none text-[#1c2a26]`}>0%</span>
                <span className="mt-2 block text-[0.8rem] text-[#55625c]">finance over 12 months</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Portrait + breathing halo */}
        <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
          <div aria-hidden="true" className="absolute left-1/2 top-[46%] -z-0 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2">
            <div className="bw-breathe absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,#f2d6c6_0%,#efe0d2_38%,rgba(227,235,228,0.6)_62%,transparent_72%)]" />
            <div className="bw-breathe-ring absolute inset-[6%] rounded-full border border-[#2d5547]/20" />
            <div className="bw-breathe-ring bw-delay absolute inset-[14%] rounded-full border border-[#2d5547]/15" />
          </div>

          <div className="bw-rise-late relative mx-auto aspect-[4/5] w-[86%] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] shadow-[0_50px_90px_-50px_rgba(34,67,58,0.55)]">
            <Image
              src="/web-design/demo/dental-practices/hero-smile.webp"
              alt="A woman in a cream jumper smiling warmly, relaxed and at ease"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 86vw"
              className="bw-grade object-cover object-[50%_30%]"
            />
          </div>

          {/* breath cue */}
          <div className="absolute bottom-6 left-0 z-10 flex items-center gap-3 rounded-full border border-[#fffcf7]/60 bg-[#fffcf7]/80 py-2 pl-2 pr-3 shadow-[0_20px_40px_-24px_rgba(28,42,38,0.5)] backdrop-blur-md sm:left-2 lg:-left-6">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#e3ebe4]" aria-hidden="true">
              <span className="bw-breathe-dot h-4 w-4 rounded-full bg-[#2d5547]" />
            </span>
            <span className="relative block h-5 w-[8.6rem] overflow-hidden text-[0.92rem] font-medium text-[#1c2a26]">
              <span className="bw-cue bw-cue-in absolute inset-0">Breathe in&hellip;</span>
              <span className="bw-cue bw-cue-hold absolute inset-0">and hold&hellip;</span>
              <span className="bw-cue bw-cue-out absolute inset-0">and slowly out.</span>
              <span className="bw-cue-static absolute inset-0">In 4, hold 4, out 6</span>
            </span>
            <BreathControl />
          </div>

          {/* next slot card */}
          <div className="absolute -right-1 top-3 z-10 w-[10.5rem] rounded-[1.4rem] border border-[#fffcf7]/70 bg-[#fffcf7]/88 p-3.5 sm:top-8 sm:w-[12.5rem] sm:p-4 shadow-[0_24px_50px_-28px_rgba(28,42,38,0.55)] backdrop-blur-md sm:right-0 lg:-right-4">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#55625c]">Next new-patient slot</p>
            <p className={`${display} mt-2 text-[1.15rem] leading-tight text-[#1c2a26] sm:text-[1.35rem]`}>Thursday, 9:20am</p>
            <p className="mt-1 text-[0.8rem] text-[#55625c]">45 minutes with Dr Hannah Ellery</p>
          </div>
        </div>
      </div>
    </section>
  );
}
