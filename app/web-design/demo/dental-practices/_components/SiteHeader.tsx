import { BrandMark } from "./BrandMark";
import { MobileNav } from "./MobileNav";
import { btnPrimary, container, display, focusRing, navLinks } from "./ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dceeeb] bg-[#f4faf9]/90 backdrop-blur-md">
      <div className={`${container} flex items-center justify-between gap-6 py-3.5`}>
        <a href="#main" className={`flex items-center gap-3 rounded-sm ${focusRing}`}>
          <BrandMark className="h-9 w-9 shrink-0" />
          <span className="leading-none">
            <span
              className={`${display} block text-[1.35rem] font-bold leading-none tracking-tight text-[#13201f]`}
            >
              Brightwell
            </span>
            <span className="mt-1.5 block text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#4f6360]">
              Private &amp; NHS Dentistry
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-sm text-sm font-medium text-[#13201f]/75 transition-colors duration-200 hover:text-[#13201f] ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#book" className={`${btnPrimary} max-md:hidden`}>
            Book online
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
