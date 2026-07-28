import Image from "next/image";
import { Reveal } from "./Reveal";
import {
  Eyebrow,
  PhoneIcon,
  container,
  display,
  focusRing,
  h2Heading,
  sectionSub,
} from "./ui";

const chip =
  "inline-flex items-center rounded-md border border-[#232a35] bg-[#0e1116] px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#ffb020]";

const tileTitle = `${display} text-2xl font-semibold uppercase leading-tight tracking-[0.02em] text-[#f4f7fb]`;

const tileBody = "text-base leading-relaxed text-[#93a0b1]";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24">
      <div className={`${container} py-16 sm:py-20 lg:py-24`}>
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <h2 className={h2Heading}>Electrical work, done properly.</h2>
          <p className={sectionSub}>
            Domestic and light commercial, across Greater Manchester. Every job
            tested, certified and covered by our 10 year workmanship warranty.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
          {/* 01 · Emergency fault-finding (typographic) */}
          <Reveal className="lg:col-span-7">
            <article className="flex h-full flex-col justify-between gap-8 rounded-lg border border-[#232a35] bg-[#161b23] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <p
                  aria-hidden="true"
                  className={`${display} text-[clamp(2.75rem,5vw,4rem)] font-bold leading-none text-[#ffb020]`}
                >
                  01
                </p>
                <p className={chip}>From £89</p>
              </div>
              <div>
                <h3 className={tileTitle}>Emergency fault-finding</h3>
                <p className={`mt-3 ${tileBody}`}>
                  Dead sockets, tripping circuits, a burning smell from the
                  board. We trace the fault, make it safe and fix it. 2 hour
                  response, day or night.
                </p>
              </div>
            </article>
          </Reveal>

          {/* 02 · Full & partial rewires (typographic) */}
          <Reveal className="lg:col-span-5" delay={80}>
            <article className="flex h-full flex-col justify-between gap-8 rounded-lg border border-[#232a35] bg-[#161b23] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <p
                  aria-hidden="true"
                  className={`${display} text-[clamp(2.75rem,5vw,4rem)] font-bold leading-none text-[#ffb020]`}
                >
                  02
                </p>
                <p className={chip}>Free survey</p>
              </div>
              <div>
                <h3 className={tileTitle}>Full &amp; partial rewires</h3>
                <p className={`mt-3 ${tileBody}`}>
                  Whole-home or room-by-room, fully certified. Tidy chasing,
                  minimal disruption, paperwork handed over on the day.
                </p>
              </div>
            </article>
          </Reveal>

          {/* 03 · EV charger installs (image tile) */}
          <Reveal className="lg:col-span-5" delay={40}>
            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#232a35] bg-[#161b23]">
              <div className="relative aspect-[16/10]">
                <Image
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=75"
                  alt="Electric vehicle charging port plugged into a car"
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex grow flex-col gap-3 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={tileTitle}>EV charger installs</h3>
                  <p className={chip}>From £949</p>
                </div>
                <p className={tileBody}>
                  OZEV approved installers for every major charger brand.
                  Supplied, fitted and commissioned, usually in a single visit.
                </p>
              </div>
            </article>
          </Reveal>

          {/* 04 · Fuse board upgrades & EICR testing (image tile) */}
          <Reveal className="lg:col-span-7" delay={120}>
            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#232a35] bg-[#161b23]">
              <div className="relative aspect-[16/10] lg:aspect-[21/9]">
                <Image
                  src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1400&q=75"
                  alt="Close-up of a modern consumer unit with labelled circuit breakers"
                  fill
                  sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex grow flex-col gap-3 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={tileTitle}>
                    Fuse board upgrades &amp; EICR testing
                  </h3>
                  <p className={chip}>Certs from £129</p>
                </div>
                <p className={tileBody}>
                  Modern consumer units with RCBO protection on every circuit,
                  plus full condition reports. Landlord certificates from £129.
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        <p className="mt-8 text-base text-[#93a0b1]">
          Something else? If it involves wiring, we do it.{" "}
          <a
            href="tel:01614960100"
            className={`inline-flex items-center gap-1.5 rounded-md px-0.5 font-semibold text-[#f4f7fb] transition-colors hover:text-[#ffb020] ${focusRing}`}
          >
            <PhoneIcon className="h-3.5 w-3.5 text-[#ffb020]" />
            Call 0161 496 0100
          </a>
        </p>
      </div>
    </section>
  );
}
