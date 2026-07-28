import { container, display, focusRing, navLinks, quietLink } from "./ui";

const colHeading =
  "text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#5a544a]";

const practices = [
  "Corporate & Commercial",
  "Commercial Property",
  "Dispute Resolution",
  "Wills, Trusts & Probate",
  "Employment",
  "Family",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e4ddd0]">
      <div className={`${container} py-14 sm:py-16`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p
              className={`${display} text-xl font-medium tracking-tight text-[#1a1712]`}
            >
              Halstead Law
            </p>
            <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-[#5a544a]">
              Commercial &amp; Private Client
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#5a544a]">
              A modern firm with old-fashioned judgement, acting for businesses
              and individuals across London and the South East since 1984.
            </p>
          </div>

          <nav aria-label="Practice areas">
            <p className={colHeading}>Expertise</p>
            <ul className="mt-4 space-y-2.5">
              {practices.map((p) => (
                <li key={p}>
                  <a
                    href="#expertise"
                    className={`rounded-sm text-sm text-[#1a1712]/80 transition-colors duration-200 hover:text-[#1a1712] ${focusRing}`}
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={colHeading}>Contact</p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-[#5a544a]">
              88 Bedford Row
              <br />
              London WC1R 4LL
            </address>
            <p className="mt-3 text-sm">
              <a
                href="tel:+442079460112"
                className={`rounded-sm font-medium text-[#1a1712] transition-colors duration-200 hover:text-[#7c2d2d] ${focusRing}`}
              >
                020 7946 0112
              </a>
            </p>
            <p className="mt-1.5 text-sm">
              <a href="mailto:hello@halsteadlaw.com" className={quietLink}>
                hello@halsteadlaw.com
              </a>
            </p>
            <p className="mt-3 text-sm text-[#5a544a]">
              Monday to Friday, 8:30 to 18:00
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#e4ddd0] pt-6 text-xs leading-relaxed text-[#5a544a]">
          <p>
            Halstead Law LLP is authorised and regulated by the Solicitors
            Regulation Authority, SRA number 004821. Registered in England &amp;
            Wales, company number OC318204.
          </p>
          <p className="mt-4">
            Halstead Law is a representative demo site by Integrate Web Design.
          </p>
        </div>
      </div>
    </footer>
  );
}
