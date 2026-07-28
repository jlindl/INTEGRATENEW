import { container, display, focusRing, navLinks, quietLink } from "./ui";

const colHeading =
  "text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#565f59]";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e2ded2]">
      <div className={`${container} py-14 sm:py-16`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p
              className={`${display} text-xl font-medium tracking-tight text-[#15201c]`}
            >
              Meridian &amp; Co
            </p>
            <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-[#565f59]">
              Chartered Accountants
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#565f59]">
              Proactive accounting and tax for founders, established firms and
              landlords across the UK.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className={colHeading}>Explore</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`rounded-sm text-sm text-[#15201c]/80 transition-colors duration-200 hover:text-[#15201c] ${focusRing}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={colHeading}>Visit or call</p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-[#565f59]">
              14 Copperfield Row
              <br />
              Clerkenwell, London EC1R 4DT
            </address>
            <p className="mt-3 text-sm">
              <a
                href="tel:+442079460480"
                className={`rounded-sm font-medium text-[#15201c] transition-colors duration-200 hover:text-[#1f5c46] ${focusRing}`}
              >
                020 7946 0480
              </a>
            </p>
            <p className="mt-1.5 text-sm">
              <a href="mailto:hello@meridian.cpa" className={quietLink}>
                hello@meridian.cpa
              </a>
            </p>
            <p className="mt-3 text-sm text-[#565f59]">
              Monday to Friday, 9:00 to 17:30
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#e2ded2] pt-6 text-xs leading-relaxed text-[#565f59]">
          <p>
            Meridian &amp; Co Ltd. Registered in England &amp; Wales, company
            number 09214487. Registered office: 14 Copperfield Row,
            Clerkenwell, London EC1R 4DT.
          </p>
          <p className="mt-1.5">
            A member firm of the Institute of Chartered Accountants in England
            and Wales.
          </p>
          <p className="mt-4">
            Meridian &amp; Co is a representative demo site by Integrate Web
            Design.
          </p>
        </div>
      </div>
    </footer>
  );
}
