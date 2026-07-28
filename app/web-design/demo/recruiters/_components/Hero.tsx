import Image from "next/image";
import {
  container,
  displayFont,
  monoKicker,
  monoStack,
  pillGhost,
  pillPrimary,
} from "./tokens";

const METRICS = [
  { value: "11 days", label: "average time to shortlist" },
  { value: "92%", label: "of offers accepted" },
  { value: "1,400+", label: "placements made since 2014" },
];

export function Hero() {
  return (
    <section className="overflow-hidden">
      <div className={`${container} pb-14 pt-14 sm:pt-20 lg:pb-16 lg:pt-24`}>
        <p className={`${monoKicker} flex items-center gap-2.5 text-[#c43a10]`}>
          <span
            className="inline-block h-2 w-2 rounded-[2px] bg-[#ff5a3c]"
            aria-hidden="true"
          />
          Executive &amp; Technology Search · London
        </p>

        <h1
          className={`${displayFont} mt-6 max-w-4xl text-[clamp(2.7rem,7vw,5rem)] font-bold leading-[1.02] tracking-[-0.025em] text-[#16181d]`}
        >
          The shortlist you actually wanted.{" "}
          <span className="relative inline-block">
            In days, not weeks.
            <span
              className="absolute inset-x-0 -bottom-1 h-[0.14em] rounded-full bg-[#ff5a3c] sm:-bottom-2"
              aria-hidden="true"
            />
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-10 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p className="max-w-xl text-lg leading-relaxed text-[#5c5f68]">
            Specialist recruiters for scaling technology teams. Pre-vetted
            candidates, a transparent process with a clock on it, and a
            replacement guarantee on every placement.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#contact" className={pillPrimary}>
              Submit a vacancy
            </a>
            <a href="#roles" className={pillGhost}>
              Browse live roles
            </a>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-[#e7e2d8] pt-8 sm:grid-cols-3 sm:gap-10 lg:mt-16">
          {METRICS.map((metric) => (
            <div
              key={metric.value}
              className="border-l-2 border-[#ff5a3c] pl-4 sm:border-l sm:border-[#e7e2d8] sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dd
                className={`${displayFont} text-3xl font-bold tracking-tight text-[#16181d] sm:text-4xl`}
              >
                {metric.value}
              </dd>
              <dt
                className={`${monoStack} mt-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-[#5c5f68]`}
              >
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Editorial photo band, held quiet under a warm ink wash */}
      <div className={`${container} pb-4`}>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/10] sm:aspect-[21/9]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=70"
              alt="The Ascend Talent team working a search together around a meeting table"
              fill
              priority
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#16181d]/55 via-[#16181d]/10 to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl bg-[#f7f5f1]/94 px-5 py-4 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md">
            <p className={`${monoStack} text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#c43a10]`}>
              Now shortlisting
            </p>
            <p className="w-full text-sm font-semibold text-[#16181d]">
              Head of Platform Engineering · Series C fintech · £120k · Hybrid,
              London
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
