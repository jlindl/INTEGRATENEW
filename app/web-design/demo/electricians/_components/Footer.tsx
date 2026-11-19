import Image from "next/image";
import { LiveDot, PHONE, PhoneIcon, TEL, Wordmark, display, focusRing, mono, wrap } from "./ui";

const nav = [
  { href: "#triage", label: "Power cut triage" },
  { href: "#services", label: "Services and prices" },
  { href: "#callout", label: "Emergency call-outs" },
  { href: "#team", label: "Accreditations" },
  { href: "#areas", label: "Areas we cover" },
  { href: "#reviews", label: "Reviews" },
  { href: "#quote", label: "Get a fixed price" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0a0c0f]">
      {/* Final call to action over Salford Quays at night */}
      <div className="relative isolate overflow-hidden border-t border-white/10">
        <Image
          src="/web-design/demo/electricians/salford-quays.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover object-[70%_60%] brightness-[1.05] saturate-[1.1]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0a0c0f_0%,rgba(10,12,15,.25)_55%,#0a0c0f_100%)]" />
        <div className={`${wrap} py-24 sm:py-32`}>
          <p className={`${mono} flex items-center gap-2.5 text-[0.75rem] uppercase tracking-[0.18em] text-[#f3f5f8]`}>
            <LiveDot /> Someone is on call right now
          </p>
          <p className={`${display} mt-6 text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.85] text-[#f3f5f8]`}>
            Still in the dark?
          </p>
          <a
            href={TEL}
            className={`group mt-4 inline-flex max-w-full items-center gap-3 sm:gap-5 ${display} text-[clamp(2.6rem,11.5vw,10.5rem)] font-black leading-[0.9] tracking-[-0.01em] text-[#ffb020] transition-[text-shadow] hover:[text-shadow:0_0_40px_rgba(255,176,32,.55)] ${focusRing}`}
          >
            <PhoneIcon className="h-[0.42em] w-[0.42em] shrink-0" />
            <span className="whitespace-nowrap">{PHONE}</span>
          </a>
        </div>
      </div>

      <div className={`${wrap} grid gap-12 border-t border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]`}>
        <div>
          <Wordmark />
          <p className="mt-5 max-w-sm leading-relaxed text-[#9aa4b2]">
            Domestic and light commercial electricians for Greater Manchester.
            Emergency line answered by an electrician, every hour of every day.
          </p>
          <address className={`${mono} mt-6 not-italic text-[0.78rem] uppercase leading-relaxed tracking-[0.1em] text-[#9aa4b2]`}>
            Unit 4, Brinksway Trade Park
            <br />
            Stockport SK3 0BZ
          </address>
        </div>

        <nav aria-label="Footer">
          <p className={`${mono} text-[0.7rem] uppercase tracking-[0.16em] text-[#9aa4b2]`}>On this page</p>
          <ul className="mt-4 grid gap-2.5">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`text-[#f3f5f8] transition-colors hover:text-[#ffb020] ${focusRing}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={`${mono} text-[0.7rem] uppercase tracking-[0.16em] text-[#9aa4b2]`}>Hours</p>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-[#f3f5f8]">
            <dt className="text-[#9aa4b2]">Emergencies</dt>
            <dd>24/7, 365 days</dd>
            <dt className="text-[#9aa4b2]">Planned work</dt>
            <dd>Mon to Sat, 7:30am to 6pm</dd>
            <dt className="text-[#9aa4b2]">Office</dt>
            <dd>Mon to Fri, 8am to 5pm</dd>
          </dl>
          <a
            href="mailto:jobs@voltedge.co.uk"
            className={`mt-6 inline-block text-[#f3f5f8] underline decoration-white/30 underline-offset-4 hover:decoration-[#ffb020] ${focusRing}`}
          >
            jobs@voltedge.co.uk
          </a>
        </div>
      </div>

      <div className={`${wrap} flex flex-col gap-3 border-t border-white/10 pb-24 pt-6 text-[0.8rem] text-[#9aa4b2] sm:flex-row sm:justify-between sm:pb-8`}>
        <p>© 2026 Voltedge Electrical Ltd. Registered in England, no. 07714392.</p>
        <p>NICEIC Approved Contractor · TrustMark · Part P registered</p>
      </div>
    </footer>
  );
}
