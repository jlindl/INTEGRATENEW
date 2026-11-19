/**
 * The A La Parrilla visuals for /black-friday: the real site on a phone, its
 * map listing and its stories. Server components, no JavaScript.
 *
 * Images live in public/black-friday/. Drop a replacement in with the same
 * file name and it is picked up everywhere:
 *   alp-site-mobile.webp   real screenshot of alaparrilla.co.uk, 390x844 @2x
 *   alp-site-desktop.webp  real screenshot of alaparrilla.co.uk, 1440x900
 *   alp-map.webp           drawn from OpenStreetMap data around Windsor
 *                          Street, Birmingham (960x420)
 * The map must keep its "© OpenStreetMap contributors" credit. Never swap in
 * Google or Apple map imagery, and never hotlink an image.
 *
 * The listing card is drawn in markup in the style of a local search result.
 * It carries no ratings or review counts: only facts from the restaurant's
 * own site (name, category, area, delivery and collection).
 */
import Image from "next/image";
import { EXAMPLE } from "@/lib/blackFriday";

export const IMG = {
  siteMobile: "/black-friday/alp-site-mobile.webp",
  siteDesktop: "/black-friday/alp-site-desktop.webp",
  map: "/black-friday/alp-map.webp",
  stories: ["/black-friday/alp-story-1-v2.webp", "/black-friday/alp-story-2-v2.webp", "/black-friday/alp-story-3-v2.webp"],
} as const;

/* ----------------------------------------------------------------- Phone */

/** Pass `relative` or `absolute` in className: the frame doesn't set its own position. */
export function Phone({
  className = "",
  sizes,
  priority = false,
}: {
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`rounded-[2.3rem] bg-carbon p-[0.42rem] shadow-[0_1px_0_1px_rgba(255,255,255,0.06)_inset,0_2px_4px_rgba(10,10,12,0.12),0_24px_48px_-12px_rgba(10,10,12,0.35),0_60px_100px_-40px_rgba(10,10,12,0.45)] ${className}`}
    >
      {/* A faint sheen down the frame edge. */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[2.3rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.14),transparent_28%,transparent_72%,rgba(255,255,255,0.06))]"
        aria-hidden="true"
      />
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.95rem] bg-[#17110e]">
        <Image
          src={IMG.siteMobile}
          alt={`The ${EXAMPLE.name} website on a phone`}
          fill
          sizes={sizes}
          priority={priority}
          quality={60}
          className="object-cover object-top"
        />
        <span className="absolute left-1/2 top-[0.55rem] h-[0.95rem] w-[3.6rem] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------- Local listing card */

const Pin = () => (
  <svg viewBox="0 0 24 32" className="absolute left-1/2 top-1/2 h-8 w-6 -translate-x-1/2 -translate-y-full drop-shadow-[0_3px_4px_rgba(0,0,0,0.3)]" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.5 12 32 12 32s12-11.5 12-20.3C24 5.2 18.6 0 12 0Z" fill="#1b1a16" />
    <circle cx="12" cy="11.5" r="4.3" fill="#f2f1ec" />
  </svg>
);

const ActionIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const ACTIONS = [
  { label: "Website", d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" },
  { label: "Directions", d: "M3 11 21 3l-8 18-2-8-8-2Z" },
  { label: "Call", d: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 6a1 1 0 0 1 1-2Z" },
];

export function LocalCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-white text-left shadow-[0_2px_4px_rgba(27,26,22,0.05),0_12px_32px_rgba(27,26,22,0.1),0_32px_80px_-20px_rgba(27,26,22,0.18)] ${className}`}
    >
      <div className="relative aspect-[16/7] bg-paper-2">
        <Image src={IMG.map} alt="" fill sizes="19rem" className="object-cover" />
        <Pin />
        <span className="absolute bottom-1 right-1 rounded-[3px] bg-white/90 px-1 py-px text-[0.56rem] leading-tight text-ink-2">
          © OpenStreetMap contributors
        </span>
      </div>
      <div className="px-3.5 pb-3.5 pt-3">
        <span className="block text-[0.98rem] font-semibold leading-tight text-ink">{EXAMPLE.name}</span>
        <span className="mt-0.5 block text-[0.76rem] text-ink-3">
          {EXAMPLE.category} · {EXAMPLE.area}
        </span>
        <span className="mt-1 block text-[0.74rem] font-medium text-[#23794f]">Delivery · Collection</span>
        <span className="mt-2.5 flex gap-1" aria-hidden="true">
          {ACTIONS.map((a) => (
            <span key={a.label} className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-line px-2 py-1 text-[0.66rem] font-medium text-ink-2">
              <ActionIcon d={a.d} />
              {a.label}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Stories */

/** Pass `relative` or `absolute` in className, as with Phone. */
export function Story({ src, n, className = "" }: { src: string; n: number; className?: string }) {
  return (
    <div
      className={`aspect-[9/16] overflow-hidden rounded-[0.9rem] bg-[#17110e] shadow-[0_2px_4px_rgba(10,10,12,0.12),0_18px_40px_-14px_rgba(10,10,12,0.45)] ring-1 ring-black/5 ${className}`}
    >
      <Image src={src} alt={`${EXAMPLE.name} story design ${n} of 3`} fill sizes="(min-width: 1024px) 9.5rem, 7.5rem" className="object-cover" />
    </div>
  );
}

/* ---------------------------------------------------------- Browser frame */

export function BrowserFrame({ className = "", sizes }: { className?: string; sizes: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-white shadow-lift ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-line-2" />
        <span className="h-2 w-2 rounded-full bg-line-2" />
        <span className="h-2 w-2 rounded-full bg-line-2" />
        <span className="ml-2 truncate rounded-full bg-white px-2.5 py-0.5 font-mono text-[0.6rem] text-ink-3">{EXAMPLE.domain}</span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={IMG.siteDesktop} alt={`The ${EXAMPLE.name} website on a desktop screen`} fill sizes={sizes} quality={60} className="object-cover object-top" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Hero visual */

/**
 * The phone, the listing card and three fanned stories. Nothing here waits
 * for JavaScript: the phone never animates, and only the stories and card
 * ease into place with CSS, which reduced-motion turns off. The headline is
 * the largest element at every width, so nothing here is preloaded.
 */
export function HeroVisual() {
  return (
    <div
      className="relative mx-auto h-[27.5rem] w-full max-w-[23rem] sm:h-[33rem] sm:max-w-[28rem] lg:h-[37rem] lg:max-w-[31rem]"
      role="img"
      aria-label={`Example of our work: the ${EXAMPLE.name} website on a phone, its map listing and three of its story designs`}
    >
      {/* Soft floor shadow so the group sits on the page. */}
      <span className="absolute inset-x-[8%] bottom-[2%] h-16 rounded-full bg-ink/10 blur-2xl" aria-hidden="true" />

      <div className="bf-fan absolute right-[7%] top-[7%] h-[62%] w-[56%] sm:right-0 sm:w-[60%]" aria-hidden="true">
        <Story src={IMG.stories[0]} n={1} className="bf-fan-1 absolute right-[38%] top-[6%] w-[46%]" />
        <Story src={IMG.stories[1]} n={2} className="bf-fan-2 absolute right-[19%] top-0 w-[46%]" />
        <Story src={IMG.stories[2]} n={3} className="bf-fan-3 absolute right-0 top-[9%] w-[46%]" />
      </div>

      <Phone className="absolute left-[3%] top-0 z-10 w-[10.75rem] sm:w-[13rem] lg:w-[14.75rem]" sizes="(min-width: 1024px) 15rem, (min-width: 640px) 13rem, 11rem" />

      <div className="bf-card absolute bottom-[1%] right-0 z-20 w-[15.25rem] sm:right-[2%] sm:w-[16.5rem]" aria-hidden="true">
        <LocalCard />
      </div>
    </div>
  );
}
