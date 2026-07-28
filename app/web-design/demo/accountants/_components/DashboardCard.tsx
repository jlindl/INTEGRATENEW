import { display } from "./ui";

const row = "flex items-baseline justify-between gap-4 py-3.5";

/**
 * The hero's proof piece: a hand-built client dashboard, pure HTML/CSS.
 * White surface, hairlines, a green sparkline and a brass offset frame.
 */
export function DashboardCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Brass offset frame, the quiet "established" wink */}
      <div
        className="absolute -bottom-3.5 -right-3.5 hidden h-full w-full rounded-2xl border border-[#b08d57]/45 sm:block"
        aria-hidden="true"
      />
      <div className="relative rounded-2xl border border-[#e2ded2] bg-white p-6 shadow-[0_36px_80px_-42px_rgba(21,32,28,0.45)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#565f59]">
            Client dashboard
          </p>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#1f5c46]/10 px-3 py-1 text-[0.68rem] font-semibold text-[#1f5c46]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#1f5c46]"
              aria-hidden="true"
            />
            All accounts up to date
          </p>
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm text-[#565f59]">Cash position</p>
            <p className="text-xs font-semibold text-[#1f5c46]">
              +12% on last year
            </p>
          </div>
          <p
            className={`${display} mt-1.5 text-[2rem] font-medium leading-none tracking-tight text-[#15201c]`}
          >
            £248,300
          </p>
          <svg
            viewBox="0 0 240 56"
            preserveAspectRatio="none"
            className="mt-4 h-14 w-full"
            aria-hidden="true"
          >
            <path
              d="M0 46 L24 41 L48 43 L72 34 L96 37 L120 28 L144 30 L168 20 L192 23 L216 13 L240 9 L240 56 L0 56 Z"
              fill="#1f5c46"
              opacity="0.08"
            />
            <path
              d="M0 46 L24 41 L48 43 L72 34 L96 37 L120 28 L144 30 L168 20 L192 23 L216 13 L240 9"
              fill="none"
              stroke="#1f5c46"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <dl className="mt-6 divide-y divide-[#e2ded2] border-t border-[#e2ded2] text-sm">
          <div className={row}>
            <dt className="text-[#565f59]">Corporation tax saved</dt>
            <dd
              className={`${display} text-lg font-medium tracking-tight text-[#15201c]`}
            >
              £18,400
            </dd>
          </div>
          <div className={row}>
            <dt className="text-[#565f59]">VAT return</dt>
            <dd className="font-medium text-[#1f5c46]">Filed 4 days early</dd>
          </div>
          <div className={row}>
            <dt className="text-[#565f59]">Next deadline</dt>
            <dd className="font-medium text-[#15201c]">CT600 · 12 Aug</dd>
          </div>
        </dl>

        <p className="mt-5 text-[0.68rem] text-[#565f59]">
          Live from Xero. Updated 9:42 this morning.
        </p>
      </div>
    </div>
  );
}
