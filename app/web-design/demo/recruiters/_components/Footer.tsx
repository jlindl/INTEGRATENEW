import { BrandMark } from "./icons";
import { container, displayFont, focusRing, monoStack } from "./tokens";

const COLUMNS = [
  {
    heading: "Employers",
    links: [
      { href: "#hire", label: "How we work" },
      { href: "#sectors", label: "Sectors" },
      { href: "#contact", label: "Submit a vacancy" },
    ],
  },
  {
    heading: "Candidates",
    links: [
      { href: "#candidates", label: "Why register" },
      { href: "#roles", label: "Live roles" },
      { href: "#contact", label: "Register your CV" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#e7e2d8] bg-[#f7f5f1]">
      <div className={`${container} py-14 sm:py-16`}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <span className="flex items-center gap-2.5 text-[#16181d]">
              <BrandMark className="h-6 w-6" />
              <span
                className={`${displayFont} text-[1.2rem] font-bold tracking-tight`}
              >
                Ascend Talent
              </span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5c5f68]">
              Executive and technology search for scaling teams. Shortlists in
              days, placements that stay, and a guarantee behind every one.
            </p>
            <address className={`${monoStack} mt-7 space-y-1.5 text-[0.72rem] not-italic leading-relaxed text-[#5c5f68]`}>
              <p>18 Charterhouse Street, London EC1M 6JN</p>
              <p>
                <a
                  href="tel:+442079460958"
                  className={`rounded-sm transition-colors duration-200 hover:text-[#16181d] ${focusRing}`}
                >
                  020 7946 0958
                </a>
                {" · "}
                <a
                  href="mailto:hello@ascendtalent.com"
                  className={`rounded-sm transition-colors duration-200 hover:text-[#16181d] ${focusRing}`}
                >
                  hello@ascendtalent.com
                </a>
              </p>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            {COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h3 className={`${monoStack} text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#c43a10]`}>
                  {column.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={`rounded-sm text-sm font-medium text-[#16181d]/75 transition-colors duration-200 hover:text-[#16181d] ${focusRing}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#e7e2d8] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className={`${monoStack} text-[0.65rem] uppercase tracking-[0.14em] text-[#5c5f68]`}>
            © 2026 Ascend Talent Ltd · Registered in England &amp; Wales
          </p>
          <p className={`${monoStack} text-[0.65rem] uppercase tracking-[0.14em] text-[#5c5f68]`}>
            REC corporate member · Equal-opportunity search
          </p>
        </div>

      </div>
    </footer>
  );
}
