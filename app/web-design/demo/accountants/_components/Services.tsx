import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display } from "./ui";

const services = [
  {
    n: "01",
    title: "Tax planning & filing",
    copy: "Corporation tax, personal tax and everything in between, planned ahead and filed early.",
  },
  {
    n: "02",
    title: "Advisory & board reporting",
    copy: "Management accounts and board packs that tell you what to do next, not just what happened.",
  },
  {
    n: "03",
    title: "Cloud bookkeeping (Xero & QuickBooks)",
    copy: "Clean, current books, reconciled every week without fail.",
  },
  {
    n: "04",
    title: "Payroll & VAT",
    copy: "Payslips out on time, every time, and VAT returns filed with room to spare.",
  },
  {
    n: "05",
    title: "R&D tax claims",
    copy: "Robust claims with technical narratives that stand up to HMRC scrutiny.",
  },
  {
    n: "06",
    title: "Exit & succession planning",
    copy: "Sale-ready accounts and tax-efficient structures for the day you move on.",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24">
      <div className={`${container} pb-20 sm:pb-24 lg:pb-28`}>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Everything a growing business asks of its accountants."
            sub="Six disciplines, one team, one fixed monthly fee. Start with what you need and add as you grow."
          />
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-12 grid border-l border-t border-[#e2ded2] sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.n}
                className="border-b border-r border-[#e2ded2] p-6 transition-colors duration-200 hover:bg-white sm:p-8"
              >
                <p
                  className={`${display} text-sm font-medium tracking-[0.08em] text-[#b08d57]`}
                  aria-hidden="true"
                >
                  {service.n}
                </p>
                <h3
                  className={`${display} mt-4 text-xl font-medium tracking-tight text-[#15201c]`}
                >
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#565f59]">
                  {service.copy}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
