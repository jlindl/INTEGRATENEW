import {
  HazardStripe,
  PhoneIcon,
  Wordmark,
  container,
  display,
  focusRing,
} from "./ui";

const footerLink = `rounded-sm px-0.5 text-sm text-[#93a0b1] transition-colors hover:text-[#f4f7fb] ${focusRing}`;

const colHeading = `${display} text-sm font-semibold uppercase tracking-[0.18em] text-[#f4f7fb]`;

const exploreLinks = [
  { href: "#services", label: "Services" },
  { href: "#emergency", label: "Emergency" },
  { href: "#areas", label: "Areas" },
  { href: "#reviews", label: "Reviews" },
  { href: "#quote", label: "Get a fast quote" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#232a35]">
      {/* Signature hazard stripe, use two of two */}
      <HazardStripe tone="amber" />

      <div className={`${container} pb-28 pt-14 sm:pb-24`}>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#93a0b1]">
              Wired right the first time. Certified electricians for homes and
              small business across Greater Manchester.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className={colHeading}>Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={colHeading}>Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#93a0b1]">
              <li>
                <a
                  href="tel:01614960100"
                  className={`inline-flex items-center gap-2 rounded-sm px-0.5 font-semibold text-[#f4f7fb] transition-colors hover:text-[#ffb020] ${focusRing}`}
                >
                  <PhoneIcon className="h-3.5 w-3.5 text-[#ffb020]" />
                  0161 496 0100
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@voltedge.co.uk"
                  className={footerLink}
                >
                  hello@voltedge.co.uk
                </a>
              </li>
              <li>
                Unit 7, Fentonbridge Works,
                <br />
                Manchester M4 5FE
              </li>
            </ul>
          </div>

          <div>
            <h2 className={colHeading}>Hours</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#93a0b1]">
              Emergencies 24/7 · Office Mon-Fri 8-6
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-2 border-t border-[#232a35] pt-6 text-xs leading-relaxed text-[#93a0b1]">
          <p>
            Voltedge Electrical Ltd, registered in England and Wales, company
            no. 08841377. Registered office: Unit 7, Fentonbridge Works,
            Manchester M4 5FE.
          </p>
          <p>
            Voltedge is a representative demo site by Integrate Web Design.
          </p>
        </div>
      </div>
    </footer>
  );
}
