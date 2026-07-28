import { DashboardCard } from "./DashboardCard";
import {
  btnPrimary,
  btnSecondary,
  container,
  display,
  eyebrowDot,
  eyebrowRow,
} from "./ui";

export function Hero() {
  return (
    <section id="hero">
      <div
        className={`${container} grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-28`}
      >
        <div>
          <p className={eyebrowRow}>
            <span className={eyebrowDot} aria-hidden="true" />
            Chartered Accountants
          </p>
          <h1
            className={`${display} mt-5 text-[clamp(2.6rem,6vw,4.35rem)] font-medium leading-[1.04] tracking-tight text-[#15201c]`}
          >
            Numbers handled. So you can build what&rsquo;s next.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#565f59]">
            Proactive accounting and tax for founders and established firms.
            Fixed fees, real-time dashboards, and an advisor who actually picks
            up the phone.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className={btnPrimary}>
              Book a consultation
            </a>
            <a href="#services" className={btnSecondary}>
              See our services
            </a>
          </div>
          <p className="mt-9 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#565f59]">
            ICAEW Chartered · Xero Platinum Partner · est. 2011
          </p>
        </div>

        <DashboardCard />
      </div>
    </section>
  );
}
