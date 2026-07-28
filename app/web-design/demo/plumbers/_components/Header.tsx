import { MobileNav } from "./MobileNav";
import { DropIcon, PhoneIcon } from "./icons";
import { btnPrimarySm, container, displayFont, focusLight, PHONE_DISPLAY, PHONE_HREF } from "./theme";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#boilers", label: "Boilers" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dde8ee] bg-white/90 backdrop-blur-md">
      <div className={`${container} flex h-16 items-center justify-between gap-3 sm:h-[4.25rem]`}>
        <a
          href="#top"
          className={`flex items-center gap-2 rounded-lg px-1 py-1 ${focusLight}`}
          aria-label="Northline Plumbing and Heating, back to top"
        >
          <DropIcon className="h-5 w-5 text-[#23c1a6]" />
          <span className="flex flex-col leading-none">
            <span className={`${displayFont} text-[1.02rem] font-extrabold tracking-[0.09em] text-[#12212e]`}>
              NORTHLINE
            </span>
            <span className="mt-1 hidden text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#4e6274] sm:block">
              Plumbing &amp; Heating
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold text-[#4e6274] transition-colors hover:bg-[#f6f9fb] hover:text-[#12212e] ${focusLight}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={PHONE_HREF}
            className={`hidden items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-[#12212e] transition-colors hover:text-[#0d6e5d] lg:inline-flex ${focusLight}`}
          >
            <PhoneIcon className="h-4 w-4 text-[#23c1a6]" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_HREF}
            aria-label={`Call Northline on ${PHONE_DISPLAY}`}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#dde8ee] bg-white text-[#0d6e5d] transition-colors hover:border-[#23c1a6]/60 md:hidden ${focusLight}`}
          >
            <PhoneIcon className="h-4.5 w-4.5" />
          </a>
          <a href="#contact" className={`hidden md:inline-flex ${btnPrimarySm} ${focusLight}`}>
            Book an engineer
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
