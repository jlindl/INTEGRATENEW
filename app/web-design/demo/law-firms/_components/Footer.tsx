import { focusRingLight, mono, navLinks, serif, wrap } from "./tokens";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#0f0d0b] text-[#f3efe7]">
      <div className={`${wrap} pb-28 sm:pb-24`}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[#f3efe7]/12 pt-16 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <p className={`${serif} max-w-sm text-[1.6rem] leading-[1.2] text-[#f3efe7]/85`}>
              Serious enough for the decisions that matter. Human enough to pick up the phone.
            </p>
          </div>
          <nav aria-label="Footer" className="col-span-2 lg:col-span-2 lg:col-start-7">
            <p className={`${mono} text-[0.62rem] uppercase tracking-[0.18em] text-[#f3efe7]/50`}>Firm</p>
            <ul className="mt-4 space-y-2.5 text-[0.9rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={`text-[#f3efe7]/80 hover:text-[#f3efe7] ${focusRingLight}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-2">
            <p className={`${mono} text-[0.62rem] uppercase tracking-[0.18em] text-[#f3efe7]/50`}>London</p>
            <p className="mt-4 text-[0.9rem] leading-[1.7] text-[#f3efe7]/80">
              4 Furnival Yard
              <br />
              London EC4A 1HL
              <br />
              <a href="tel:02079460418" className={`hover:text-[#f3efe7] ${focusRingLight}`}>020 7946 0418</a>
            </p>
          </div>
          <div className="lg:col-span-2">
            <p className={`${mono} text-[0.62rem] uppercase tracking-[0.18em] text-[#f3efe7]/50`}>Guildford</p>
            <p className="mt-4 text-[0.9rem] leading-[1.7] text-[#f3efe7]/80">
              31 Quarry Street
              <br />
              Guildford GU1 3UY
              <br />
              <a href="tel:01632960214" className={`hover:text-[#f3efe7] ${focusRingLight}`}>01632 960 214</a>
            </p>
          </div>
        </div>

        <p
          aria-hidden="true"
          className={`${serif} mt-20 select-none whitespace-nowrap text-[clamp(5rem,21vw,20rem)] leading-[0.8] tracking-[-0.04em] text-[#f3efe7]/[0.07]`}
        >
          Halstead<em className="italic">.</em>
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#f3efe7]/12 pt-8 text-[0.76rem] leading-[1.6] text-[#f3efe7]/55 lg:max-w-4xl">
          <p>
            Halstead Law LLP is a limited liability partnership registered in England and Wales
            (no. OC000000). Authorised and regulated by the Solicitors Regulation Authority, SRA
            no. 000000 (placeholder for demonstration). A list of members is available at our
            registered office, 4 Furnival Yard, London EC4A 1HL.
          </p>
          <p>
            &copy; 2026 Halstead Law LLP · Privacy · Complaints · Terms of business
          </p>
        </div>
      </div>
    </footer>
  );
}
