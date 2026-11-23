import { Reveal } from "./Reveal";
import { label, mono, serif, wrap } from "./ui";

const services = [
  {
    t: "Bookkeeping and month‑end",
    d: "Bank feeds reconciled weekly, receipts chased, a clean close every month. Run in Xero, with Dext for your receipts.",
    inc: ["Xero set-up or rescue", "Weekly reconciliation", "Supplier and payroll runs"],
    fee: "from £95",
  },
  {
    t: "Tax and compliance",
    d: "Corporation tax, VAT, self assessment for directors and the annual accounts. Filed early, with the reasoning written down.",
    inc: ["Year-end accounts", "CT600 and VAT returns", "Directors’ self assessment"],
    fee: "from £145",
  },
  {
    t: "Payroll and pensions",
    d: "RTI submissions, auto-enrolment, P11Ds and the awkward cases: starters mid-month, salary sacrifice, statutory leave.",
    inc: ["Monthly or weekly runs", "Auto-enrolment", "Payslips and P60s"],
    fee: "from £35",
  },
  {
    t: "R&D tax relief",
    d: "Claims under the merged scheme, written with your engineers and defended if HMRC enquires. We only take on claims we would stand behind.",
    inc: ["Eligibility review", "Technical narrative", "Enquiry support"],
    fee: "per claim",
  },
  {
    t: "Management accounts and forecasting",
    d: "A monthly pack with a cash runway, a 13-week cash flow and a short note on what changed. Board-ready, not spreadsheet-ready.",
    inc: ["Monthly pack", "Rolling forecast", "Budget versus actual"],
    fee: "from £180",
  },
  {
    t: "Fractional finance director",
    d: "A Meridian partner in your board meetings, your fundraise and your data room. For companies not yet ready for a full-time FD.",
    inc: ["Board attendance", "Fundraising and due diligence", "Exit planning"],
    fee: "from £1,450",
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className={`${label} text-[#4f5a54]`}>
              <span className="text-[#a7834b]">02</span> &nbsp;Services
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={80}>
            <h2
              id="services-title"
              className={`${serif} text-[clamp(2.4rem,5vw,4.4rem)] font-[350] leading-[1] tracking-[-0.02em] text-[#13201b]`}
            >
              Everything a growing company files, <em className="italic text-[#1b4a3a]">kept in one place.</em>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-3 lg:pt-3" delay={160}>
            <p className="text-[0.98rem] leading-[1.7] text-[#4f5a54]">
              Take the full set or start with one. Monthly fees are fixed and
              exclude VAT. Most clients begin with bookkeeping and tax, then
              add reporting as the business grows.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-24">
          <div
            aria-hidden="true"
            className={`${label} hidden grid-cols-[5rem_minmax(0,1.05fr)_minmax(0,1.5fr)_9rem] gap-8 border-b border-[#13201b] pb-3 text-[0.62rem] text-[#4f5a54] lg:grid`}
          >
            <span>No.</span>
            <span>Service</span>
            <span>What it covers</span>
            <span className="text-right">Monthly, ex VAT</span>
          </div>
          <ol className="border-t border-[#13201b] lg:border-t-0">
            {services.map((s, i) => (
              <Reveal
                as="li"
                key={s.t}
                delay={i * 50}
                className="group relative grid gap-x-8 gap-y-3 border-b border-[#d6cfbf] py-8 transition-colors duration-500 hover:bg-[#ebe6d9]/60 lg:grid-cols-[5rem_minmax(0,1.05fr)_minmax(0,1.5fr)_9rem] lg:py-10"
              >
                <span className={`${mono} text-[0.8rem] text-[#a7834b] lg:pl-1 lg:pt-2`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`${serif} text-[1.75rem] leading-[1.1] tracking-[-0.01em] text-[#13201b] transition-transform duration-500 group-hover:translate-x-1 lg:text-[2.1rem]`}>
                  {s.t}
                </h3>
                <div>
                  <p className="max-w-[36rem] text-[1rem] leading-[1.7] text-[#4f5a54]">{s.d}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.inc.map((x) => (
                      <li
                        key={x}
                        className="rounded-full border border-[#d6cfbf] bg-[#f3f0e8] px-3 py-1 text-[0.78rem] text-[#13201b]/80"
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={`${mono} text-[0.95rem] tabular-nums text-[#13201b] lg:pr-1 lg:pt-2 lg:text-right`}>
                  {s.fee}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
