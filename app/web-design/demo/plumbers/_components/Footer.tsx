import { NorthlineMark } from "./icons";
import { display, EMAIL, focusRingDark, mono, narrow, PHONE_DISPLAY, PHONE_HREF, wrap } from "./theme";

const COLS = [
  {
    h: "Services",
    links: [
      ["Emergency plumbing", "#after-you-call"],
      ["Boilers and heating", "#services"],
      ["Bathrooms", "#services"],
      ["Drains", "#services"],
      ["Price menu", "#prices"],
    ],
  },
  {
    h: "Areas",
    links: [
      ["Leeds", "#coverage"],
      ["Headingley", "#coverage"],
      ["Horsforth", "#coverage"],
      ["Wakefield", "#coverage"],
      ["All areas", "#coverage"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0b1a28] pb-24 text-[#c9d6df] sm:pb-10">
      <div className={`${wrap} pt-16 sm:pt-20`}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <NorthlineMark className="h-10 w-10" />
              <span className={`${display} text-[1.4rem] font-extrabold tracking-[-0.03em] text-white`}>Northline</span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed">
              Plumbing and heating engineers for Leeds and West Yorkshire since 2011. Family run, from Kirkstall.
            </p>
            <a
              href={PHONE_HREF}
              className={`${focusRingDark} ${mono} mt-6 inline-block rounded text-[1.5rem] text-white hover:text-[#1ed3b0]`}
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-1">
              <a href={`mailto:${EMAIL}`} className={`${focusRingDark} rounded hover:text-white`}>
                {EMAIL}
              </a>
            </p>
          </div>

          {COLS.map((c) => (
            <nav key={c.h} aria-label={`Footer ${c.h}`} className="lg:col-span-2">
              <h2 className={`${narrow} text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#1ed3b0]`}>{c.h}</h2>
              <ul className="mt-4 grid gap-2.5">
                {c.links.map(([l, href]) => (
                  <li key={l}>
                    <a href={href} className={`${focusRingDark} rounded hover:text-white`}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-3">
            <h2 className={`${narrow} text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#1ed3b0]`}>Hours</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5">
              <dt>Emergencies</dt>
              <dd className="text-white">24/7, every day</dd>
              <dt>Office</dt>
              <dd className="text-white">Mon to Sat, 7am to 8pm</dd>
              <dt>Surveys</dt>
              <dd className="text-white">Mon to Sat, by booking</dd>
            </dl>
          </div>
        </div>

        <p
          aria-hidden="true"
          className={`${display} mt-16 select-none text-center text-[clamp(3rem,16.5vw,15.5rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-[#12263a]`}
        >
          Northline
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#1d3850] pt-6 text-[0.85rem] text-[#9fb3c3] lg:flex-row lg:justify-between">
          <p>
            Northline Plumbing &amp; Heating Ltd. Registered in England, no. <span className={mono}>08142217</span>. Gas Safe{" "}
            <span className={mono}>000000</span>.
          </p>
          <p>&copy; 2026 Northline. Prices include VAT.</p>
        </div>
      </div>
    </footer>
  );
}
