import { FlameIcon, PhoneIcon } from "./icons";
import { Reveal } from "./Reveal";
import {
  btnPrimary,
  container,
  displayFont,
  eyebrowDark,
  focusDark,
  h2Dark,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "./theme";

const STATS = [
  { value: "£75", label: "annual service, warranty kept valid" },
  { value: "£28 a month", label: "spreads the cost of a new boiler" },
  { value: "10 years", label: "warranty on selected new installs" },
];

export function BoilerFeature() {
  return (
    <section id="boilers" aria-labelledby="boilers-heading" className="scroll-mt-24 bg-[#f6f9fb] pb-20 sm:pb-28">
      <div className={container}>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#0c1420] p-7 sm:p-10 lg:p-14">
            <div
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#23c1a6]/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
              <div>
                <p className={eyebrowDark}>Boilers &amp; servicing</p>
                <h2 id="boilers-heading" className={`${h2Dark} mt-3`}>
                  Boiler due a service?
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-[#8ba3ba]">
                  A yearly service from £75 keeps the warranty valid, the bills down and the whole system safe. If it
                  is time for a replacement, we quote in the kitchen, not from a call centre, and you can spread new
                  boiler costs from £28 a month.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href="#contact" className={`${btnPrimary} ${focusDark}`}>
                    Book an engineer
                  </a>
                  <a
                    href={PHONE_HREF}
                    className={`inline-flex items-center gap-2 rounded-xl px-2 py-2 font-semibold text-[#eef5fb] transition-colors hover:text-[#23c1a6] ${focusDark}`}
                  >
                    <PhoneIcon className="h-4 w-4 text-[#23c1a6]" />
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#1f3346] bg-[#13202f] px-4 py-2 text-sm font-semibold text-[#eef5fb]">
                  <FlameIcon className="h-4 w-4 text-[#23c1a6]" />
                  Gas Safe Registered, no. 512345
                </p>
              </div>

              <dl className="grid gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.value}
                    className="rounded-2xl border border-[#1f3346] bg-[#13202f] px-5 py-4 sm:px-6 sm:py-5"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className={`${displayFont} text-xl font-bold text-[#eef5fb] sm:text-2xl`}>{stat.value}</dd>
                    <dd className="mt-0.5 text-sm text-[#8ba3ba]">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
