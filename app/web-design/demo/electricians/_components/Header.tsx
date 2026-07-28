import { MobileNav } from "./MobileNav";
import {
  Bolt,
  PhoneIcon,
  Wordmark,
  container,
  display,
  focusRing,
  focusRingOnAmber,
} from "./ui";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#emergency", label: "Emergency" },
  { href: "#areas", label: "Areas" },
  { href: "#reviews", label: "Reviews" },
];

export function Header() {
  return (
    <>
      {/* Slim 24/7 utility bar. Scrolls away; the header below sticks. */}
      <div className="bg-[#ffb020] text-[#12151b]">
        <div
          className={`${container} flex items-center justify-between gap-4 py-2 text-[0.8rem] font-semibold`}
        >
          <p className="flex items-center gap-2">
            <Bolt className="h-3.5 w-3.5" />
            <span>
              24/7 emergency callouts
              <span className="hidden sm:inline"> across Greater Manchester</span>
            </span>
          </p>
          <a
            href="tel:01614960100"
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-1 underline-offset-4 hover:underline ${focusRingOnAmber}`}
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            0161 496 0100
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#232a35] bg-[#0e1116]/95 backdrop-blur">
        <div
          className={`${container} flex h-16 items-center justify-between gap-4`}
        >
          <a
            href="#hero"
            aria-label="Voltedge, back to top"
            className={`rounded-md ${focusRing}`}
          >
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-sm px-0.5 text-sm font-medium text-[#93a0b1] transition-colors hover:text-[#f4f7fb] ${focusRing}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:01614960100"
              className={`hidden items-center gap-2 rounded-md px-1 text-sm font-semibold text-[#f4f7fb] transition-colors hover:text-[#ffb020] lg:inline-flex ${focusRing}`}
            >
              <PhoneIcon className="h-4 w-4 text-[#ffb020]" />
              0161 496 0100
            </a>
            <a
              href="#quote"
              className={`hidden rounded-md bg-[#ffb020] px-4 py-2.5 text-sm font-semibold uppercase leading-none tracking-[0.08em] text-[#12151b] transition-colors hover:bg-[#ffc24d] md:inline-flex ${display} ${focusRing}`}
            >
              Get a fast quote
            </a>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
