import { BrandMark } from "./BrandMark";
import { address, container, display, focusRingLight, navLinks, phone } from "./ui";

const hours = [
  ["Mon to Wed", "8am to 7pm"],
  ["Thu", "8am to 8pm"],
  ["Fri", "8am to 5pm"],
  ["Sat", "9am to 2pm"],
  ["Sun", "Closed"],
];

export function SiteFooter() {
  return (
    <footer className="bg-[#1c2a26] text-[#d5e0d7]">
      <div className={`${container} pb-28 pt-20 sm:pb-24`}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr]">
          <div>
            <BrandMark tone="light" />
            <p className={`${display} mt-6 max-w-sm text-[1.6rem] font-light leading-snug text-[#fffcf7]`}>
              Gentle, unhurried dentistry in the middle of Leeds.
            </p>
            <a
              href="#book"
              className={`mt-7 inline-flex min-h-12 items-center rounded-full bg-[#f2d6c6] px-6 text-[0.95rem] font-semibold text-[#1c2a26] transition-colors hover:bg-[#fffcf7] ${focusRingLight}`}
            >
              Book online
            </a>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#a9bfae]">Find us</h2>
            <address className="mt-4 not-italic leading-relaxed text-[#fffcf7]">
              Brightwell Dental
              <br />
              {address.line1}
              <br />
              {address.line2}
            </address>
            <p className="mt-3 text-[0.9rem]">Five minutes from Leeds station. Two free bays round the back.</p>
            <a href={phone.href} className={`mt-4 block w-fit rounded-sm font-semibold text-[#fffcf7] hover:underline ${focusRingLight}`}>
              {phone.display}
            </a>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#a9bfae]">Opening hours</h2>
            <dl className="mt-4 space-y-2 text-[0.92rem]">
              {hours.map(([d, h]) => (
                <div key={d} className="flex justify-between gap-4">
                  <dt>{d}</dt>
                  <dd className="whitespace-nowrap text-[#fffcf7]">{h}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#a9bfae]">Explore</h2>
            <ul className="mt-4 space-y-2 text-[0.92rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={`rounded-sm hover:text-[#fffcf7] hover:underline ${focusRingLight}`}>{l.label}</a>
                </li>
              ))}
              <li>
                <a href="#book" className={`rounded-sm hover:text-[#fffcf7] hover:underline ${focusRingLight}`}>Book online</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[#fffcf7]/10 pt-6 text-[0.78rem] text-[#a9bfae] md:flex-row md:justify-between">
          <p>Brightwell Dental Ltd. Registered with the CQC, ref. 0-000000000 (placeholder). All dentists registered with the GDC.</p>
          <p>A fictional practice, designed as a demo. © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
