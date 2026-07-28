import { container, display, focusRing, navLinks, quietLink } from "./ui";

const colHeading =
  "text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#4f6360]";

const treatments = [
  "Check-ups & hygiene",
  "Teeth whitening",
  "Invisalign & aligners",
  "Dental implants",
  "Emergency care",
  "Children's dentistry",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#dceeeb]">
      <div className={`${container} py-14 sm:py-16`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p
              className={`${display} text-xl font-bold tracking-tight text-[#13201f]`}
            >
              Brightwell
            </p>
            <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#4f6360]">
              Private &amp; NHS Dentistry
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#4f6360]">
              Gentle, modern dentistry in Leeds. Clear prices, easy booking and
              a team that&rsquo;s genuinely good with nervous patients.
            </p>
          </div>

          <nav aria-label="Treatments">
            <p className={colHeading}>Treatments</p>
            <ul className="mt-4 space-y-2.5">
              {treatments.map((t) => (
                <li key={t}>
                  <a
                    href="#treatments"
                    className={`rounded-sm text-sm text-[#13201f]/80 transition-colors duration-200 hover:text-[#13201f] ${focusRing}`}
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={colHeading}>Visit or call</p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-[#4f6360]">
              18 Wellspring Road
              <br />
              Leeds LS1 4HG
            </address>
            <p className="mt-3 text-sm">
              <a
                href="tel:+441132960480"
                className={`rounded-sm font-medium text-[#13201f] transition-colors duration-200 hover:text-[#0f9c91] ${focusRing}`}
              >
                0113 296 0480
              </a>
            </p>
            <p className="mt-1.5 text-sm">
              <a href="mailto:hello@brightwelldental.com" className={quietLink}>
                hello@brightwelldental.com
              </a>
            </p>
            <p className="mt-3 text-sm text-[#4f6360]">
              Mon–Fri 8:00–19:00 · Sat 9:00–14:00
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#dceeeb] pt-6 text-xs leading-relaxed text-[#4f6360]">
          <p>
            Brightwell Dental Care is registered with the Care Quality
            Commission and its dentists are registered with the General Dental
            Council. Registered in England &amp; Wales, company number 08421197.
          </p>
          <p className="mt-4">
            Brightwell is a representative demo site by Integrate Web Design.
          </p>
        </div>
      </div>
    </footer>
  );
}
