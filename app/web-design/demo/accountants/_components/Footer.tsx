import { MarkGlyph } from "./Mark";
import { focusRingLight, label, mono, navLinks, serif, wrap } from "./ui";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#13201b] text-[#f3f0e8]">
      <div className={`${wrap} pb-28 pt-20 lg:pb-16 lg:pt-28`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <MarkGlyph className="h-10 w-10 text-[#f3f0e8]" />
            <p className={`${serif} mt-8 max-w-[22rem] text-[1.6rem] leading-[1.25] text-[#f3f0e8]`}>
              Chartered accountants for founders who would rather be building.
            </p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <p className={`${label} text-[0.62rem] text-[#f3f0e8]/60`}>The firm</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={`rounded-sm text-[0.95rem] text-[#f3f0e8]/85 hover:text-[#f3f0e8] ${focusRingLight}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-2">
            <p className={`${label} text-[0.62rem] text-[#f3f0e8]/60`}>Visit</p>
            <p className="mt-5 text-[0.95rem] leading-[1.7] text-[#f3f0e8]/85">
              9 Merlin Row
              <br />
              Clerkenwell
              <br />
              London EC1R 4DT
            </p>
          </div>
          <div className="lg:col-span-2">
            <p className={`${label} text-[0.62rem] text-[#f3f0e8]/60`}>Talk</p>
            <p className="mt-5 text-[0.95rem] leading-[1.7]">
              <a href="tel:+442079460480" className={`rounded-sm text-[#f3f0e8]/85 hover:text-[#f3f0e8] ${focusRingLight}`}>
                020 7946 0480
              </a>
              <br />
              <a href="mailto:partners@meridian.cpa" className={`rounded-sm text-[#f3f0e8]/85 hover:text-[#f3f0e8] ${focusRingLight}`}>
                partners@meridian.cpa
              </a>
            </p>
          </div>
        </div>

        <p
          aria-hidden="true"
          className={`${serif} mt-20 select-none whitespace-nowrap text-[clamp(3.2rem,14.2vw,13.6rem)] font-[300] leading-[0.85] tracking-[-0.04em] text-[#f3f0e8]/[0.92]`}
        >
          Meridian <span className="italic text-[#d6b97f]">&amp;</span> Co
        </p>

        <div className={`${mono} mt-10 flex flex-col gap-3 border-t border-[#f3f0e8]/15 pt-6 text-[0.7rem] leading-[1.7] text-[#f3f0e8]/60 lg:flex-row lg:justify-between`}>
          <p>Meridian &amp; Co Ltd. Registered in England, no. 07946021. Chartered accountants.</p>
          <p>&copy; 2026 Meridian &amp; Co. Privacy. Terms of engagement.</p>
        </div>
      </div>
    </footer>
  );
}
