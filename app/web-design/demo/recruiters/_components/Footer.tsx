import { BrandMark } from "./icons";
import { display, focusRingDark, mono, navLinks, serif, wrap } from "./tokens";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#121317] text-white">
      <div className={`${wrap} pt-16 sm:pt-20`}>
        <div className="grid grid-cols-1 gap-10 border-b border-white/12 pb-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-6 w-6 text-white" />
              <span className={`${display} text-[1.15rem] font-extrabold tracking-[-0.03em]`}>Ascend Talent</span>
            </div>
            <p className={`${serif} mt-6 max-w-[24rem] text-[1.6rem] italic leading-snug text-white/85`}>
              A search firm you&rsquo;d hand a brief to, not another one filling your inbox.
            </p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-3">
            <p className={`${mono} text-[0.66rem] uppercase tracking-[0.14em] text-white/50`}>Site</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 lg:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={`rounded-sm text-[0.95rem] text-white/80 hover:text-white ${focusRingDark}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <p className={`${mono} text-[0.66rem] uppercase tracking-[0.14em] text-white/50`}>Talk to us</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-white/80">
              14 Rivington Street, London EC2A 3DU
              <br />
              <a href="tel:02079460321" className={`rounded-sm hover:text-white ${focusRingDark}`}>020 7946 0321</a>
              <br />
              <a href="mailto:briefs@ascendtalent.co.uk" className={`rounded-sm hover:text-white ${focusRingDark}`}>
                briefs@ascendtalent.co.uk
              </a>
            </p>
          </div>
        </div>

        <div className={`${mono} flex flex-col gap-2 py-6 text-[0.68rem] text-white/50 sm:flex-row sm:justify-between sm:pr-72`}>
          <p>Ascend Talent Ltd. Registered in England and Wales. REC Corporate Member.</p>
          <p>Privacy. Candidate data policy. Modern slavery statement.</p>
        </div>
      </div>
      <p
        className={`${display} select-none whitespace-nowrap pb-2 text-center text-[24vw] font-extrabold leading-[0.75] tracking-[-0.07em] text-white/[0.06]`}
        aria-hidden="true"
      >
        ascend
      </p>
    </footer>
  );
}
