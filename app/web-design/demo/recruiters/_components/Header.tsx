import { BrandMark } from "./icons";
import { MobileNav } from "./MobileNav";
import {
  container,
  displayFont,
  focusRing,
  monoStack,
  navLinks,
  pillPrimarySm,
} from "./tokens";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e7e2d8] bg-[#f7f5f1]/92 backdrop-blur-md">
      <div
        className={`${container} flex items-center justify-between gap-6 py-3.5`}
      >
        <a
          href="#main"
          className={`flex items-center gap-2.5 rounded-sm text-[#16181d] ${focusRing}`}
        >
          <BrandMark className="h-6 w-6" />
          <span className="leading-none">
            <span
              className={`${displayFont} block text-[1.2rem] font-bold leading-none tracking-tight`}
            >
              Ascend Talent
            </span>
            <span
              className={`${monoStack} mt-1 block text-[0.55rem] font-medium uppercase tracking-[0.24em] text-[#5c5f68]`}
            >
              Executive &amp; Technology Search
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-sm text-sm font-medium text-[#16181d]/70 transition-colors duration-200 hover:text-[#16181d] ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className={`${pillPrimarySm} hidden lg:inline-flex`}>
            Submit a vacancy
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
