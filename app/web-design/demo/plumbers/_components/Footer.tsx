import { DropIcon } from "./icons";
import { container, displayFont, EMAIL, focusDark, PHONE_DISPLAY, PHONE_HREF } from "./theme";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#boilers", label: "Boilers" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#0c1420]">
      <div className={`${container} py-12 sm:py-14`}>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <p className="flex items-center gap-2">
              <DropIcon className="h-5 w-5 text-[#23c1a6]" />
              <span className={`${displayFont} text-[1.02rem] font-extrabold tracking-[0.09em] text-[#eef5fb]`}>
                NORTHLINE
              </span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#8ba3ba]">
              Plumbing and heating for Leeds and West Yorkshire. No call-out fee, fixed quotes, tidy engineers.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`w-fit rounded-md text-sm font-semibold text-[#8ba3ba] transition-colors hover:text-[#eef5fb] ${focusDark}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 text-sm">
            <a
              href={PHONE_HREF}
              className={`w-fit rounded-md font-semibold text-[#eef5fb] transition-colors hover:text-[#23c1a6] ${focusDark}`}
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className={`w-fit break-all rounded-md font-semibold text-[#8ba3ba] transition-colors hover:text-[#eef5fb] ${focusDark}`}
            >
              {EMAIL}
            </a>
            <address className="not-italic leading-relaxed text-[#8ba3ba]">
              Unit 4, Kirkstall Yard, Leeds LS5 3BW
            </address>
            <p className="text-[#8ba3ba]">Gas Safe Registered, no. 512345</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#1f3346] pt-6 text-xs leading-relaxed text-[#8ba3ba]">
          <p>
            &copy; 2026 Northline Plumbing &amp; Heating Ltd. Registered in England and Wales, company no. 09218404.
            Registered office: Unit 4, Kirkstall Yard, Leeds LS5 3BW.
          </p>
          <p>Northline is a representative demo site by Integrate Web Design.</p>
        </div>
      </div>
    </footer>
  );
}
