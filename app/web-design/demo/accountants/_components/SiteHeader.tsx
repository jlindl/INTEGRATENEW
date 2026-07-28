import { BrandMark } from "./BrandMark";
import { MobileNav } from "./MobileNav";
import { btnPrimary, container, display, focusRing, navLinks } from "./ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e2ded2] bg-[#f4f2ec]/90 backdrop-blur-md">
      <div className={`${container} flex items-center justify-between gap-6 py-3.5`}>
        <a href="#main" className={`flex items-center gap-3 rounded-sm ${focusRing}`}>
          <BrandMark className="h-9 w-9 shrink-0" />
          <span className="leading-none">
            <span
              className={`${display} block text-[1.35rem] font-medium leading-none tracking-tight text-[#15201c]`}
            >
              Meridian &amp; Co
            </span>
            <span className="mt-1.5 block text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-[#565f59]">
              Chartered Accountants
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-sm text-sm font-medium text-[#15201c]/75 transition-colors duration-200 hover:text-[#15201c] ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Base btnPrimary is `inline-flex`, which would beat a plain `hidden`
              in the class-order tie and leak the CTA onto mobile; the max-md
              media variant reliably hides it below md (the CTA also lives in the
              mobile dropdown). */}
          <a href="#contact" className={`${btnPrimary} max-md:hidden`}>
            Book a consultation
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
