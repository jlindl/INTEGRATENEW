/**
 * NicheMockup — a small, real homepage rendered procedurally for one niche.
 *
 * Everything scales from the container's width via `cqi` units, so the exact
 * same mock reads correctly as a ~380px card and as a ~1000px detail hero. It
 * is pure CSS/markup (no hooks) so it can render in a server component.
 *
 * This stands in for a real screenshot until one is supplied — the layout is
 * built so a niche's `cover` image can replace it with zero markup changes
 * (see NicheDetailHero). Each niche's palette, archetype, font and
 * copy come from lib/webDesignData, so an electrician's mock and an
 * accountant's mock genuinely differ rather than being a reskinned template.
 */
import type { CSSProperties } from "react";
import type { Niche, MockPalette, MockContent } from "@/lib/webDesignData";

/* Trades and health read as clean/industrial → geometric sans headlines.
   Professional and hospitality read as considered → editorial serif. */
function usesSerif(niche: Niche): boolean {
  return niche.category === "professional" || niche.category === "hospitality";
}

/* ---- shared chrome ------------------------------------------------ */

function ChromeBar({ p }: { p: MockPalette }) {
  const dot = p.light ? "rgba(20,20,20,0.18)" : "rgba(255,255,255,0.22)";
  return (
    <div
      className="flex items-center gap-[1.4cqi] px-[2.4cqi] py-[1.2cqi]"
      style={{ background: p.surface, borderBottom: `1px solid ${p.line}` }}
    >
      <div className="flex gap-[1cqi]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-[1.4cqi] w-[1.4cqi] rounded-full"
            style={{ background: dot }}
          />
        ))}
      </div>
    </div>
  );
}

function AddressBar({ p, domain }: { p: MockPalette; domain: string }) {
  return (
    <div
      className="mx-[2.4cqi] mt-[1.6cqi] flex items-center gap-[1.2cqi] rounded-[1cqi] px-[1.8cqi] py-[0.9cqi]"
      style={{ background: p.bg, border: `1px solid ${p.line}` }}
    >
      <span
        className="block h-[1.2cqi] w-[1.2cqi] rounded-full"
        style={{ background: p.accent, opacity: 0.9 }}
        aria-hidden="true"
      />
      <span
        className="truncate font-mono text-[1.6cqi] tracking-tight"
        style={{ color: p.sub }}
      >
        {domain}
      </span>
    </div>
  );
}

function MockNav({ p, m }: { p: MockPalette; m: MockContent }) {
  return (
    <div className="flex items-center justify-between px-[4cqi] pt-[2.6cqi]">
      <div className="flex items-center gap-[1.4cqi]">
        <span
          className="block h-[2.6cqi] w-[2.6cqi] rounded-[0.6cqi]"
          style={{ background: p.accent }}
          aria-hidden="true"
        />
        <span
          className="text-[2.1cqi] font-semibold tracking-tight"
          style={{ color: p.ink }}
        >
          {m.brand}
        </span>
      </div>
      <div className="hidden items-center gap-[2.4cqi] sm:flex">
        {m.nav.map((item) => (
          <span key={item} className="text-[1.6cqi]" style={{ color: p.sub }}>
            {item}
          </span>
        ))}
        <span
          className="rounded-full px-[2cqi] py-[0.9cqi] text-[1.5cqi] font-medium"
          style={{ background: p.accent, color: p.accentInk }}
        >
          {m.cta}
        </span>
      </div>
    </div>
  );
}

function Buttons({ p, m }: { p: MockPalette; m: MockContent }) {
  return (
    <div className="mt-[2.2cqi] flex items-center gap-[1.6cqi]">
      <span
        className="rounded-full px-[2.6cqi] py-[1.1cqi] text-[1.7cqi] font-semibold"
        style={{ background: p.accent, color: p.accentInk }}
      >
        {m.cta}
      </span>
      <span
        className="rounded-full px-[2.6cqi] py-[1.1cqi] text-[1.7cqi] font-medium"
        style={{ color: p.ink, border: `1px solid ${p.line}` }}
      >
        {m.ctaSecondary}
      </span>
    </div>
  );
}

function Eyebrow({ p, children }: { p: MockPalette; children: string }) {
  return (
    <span
      className="inline-flex items-center gap-[1cqi] rounded-full px-[1.8cqi] py-[0.8cqi] font-mono text-[1.35cqi] uppercase tracking-[0.14em]"
      style={{
        color: p.light ? p.sub : p.ink,
        background: p.light ? p.surface : p.bg,
        border: `1px solid ${p.line}`,
      }}
    >
      <span
        className="block h-[1cqi] w-[1cqi] rounded-full"
        style={{ background: p.accent }}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

function Headline({
  niche,
  p,
  m,
}: {
  niche: Niche;
  p: MockPalette;
  m: MockContent;
}) {
  const serif = usesSerif(niche);
  return (
    <h3
      className={`${serif ? "font-display-tuned font-medium" : "font-sans font-semibold"} mt-[2cqi] text-[4.1cqi] leading-[1.05] tracking-tight`}
      style={{ color: p.ink }}
    >
      {m.headlineLines.map((line, i) => (
        <span key={i} className="block">
          {i === m.headlineLines.length - 1 ? (
            <span style={{ color: p.accent }}>{line}</span>
          ) : (
            line
          )}
        </span>
      ))}
    </h3>
  );
}

/* ---- decorative "photo" panel (spotlight archetype) --------------- */

function VisualPanel({ p }: { p: MockPalette }) {
  return (
    <div
      className="relative overflow-hidden rounded-[1.6cqi]"
      style={{
        background: `radial-gradient(120% 90% at 78% 15%, ${p.glow}, transparent 60%), ${p.surface}`,
        border: `1px solid ${p.line}`,
      }}
      aria-hidden="true"
    >
      {/* abstract "hero image" geometry — a ring + horizon, tinted by accent */}
      <div className="absolute inset-0">
        <div
          className="absolute left-1/2 top-[46%] h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ border: `0.9cqi solid ${p.accent}`, opacity: 0.85 }}
        />
        <div
          className="absolute left-1/2 top-[46%] h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ border: `0.4cqi solid ${p.line}` }}
        />
        <div
          className="absolute inset-x-[10%] bottom-[14%] h-[0.4cqi] rounded-full"
          style={{ background: p.line }}
        />
        <div
          className="absolute bottom-[14%] left-[10%] h-[8%] w-[26%] rounded-[0.8cqi]"
          style={{ background: p.accent, opacity: 0.9 }}
        />
      </div>
    </div>
  );
}

function ProofStrip({ p, m }: { p: MockPalette; m: MockContent }) {
  return (
    <div
      className="mt-[2.4cqi] grid grid-cols-3 gap-[1cqi] rounded-[1.4cqi] px-[2.4cqi] py-[1.6cqi]"
      style={{ background: p.surface, border: `1px solid ${p.line}` }}
    >
      {m.proof.map((item) => (
        <div key={item.k} className="text-center">
          <div
            className="text-[2.6cqi] font-semibold tracking-tight"
            style={{ color: p.accent }}
          >
            {item.v}
          </div>
          <div className="mt-[0.4cqi] text-[1.35cqi]" style={{ color: p.sub }}>
            {item.k}
          </div>
        </div>
      ))}
    </div>
  );
}

function FeatureCards({ p, m }: { p: MockPalette; m: MockContent }) {
  return (
    <div className="mt-[2.6cqi] grid grid-cols-3 gap-[1.8cqi]">
      {m.features.map((f) => (
        <div
          key={f.title}
          className="rounded-[1.4cqi] px-[2cqi] py-[1.8cqi]"
          style={{ background: p.surface, border: `1px solid ${p.line}` }}
        >
          <span
            className="block h-[1.8cqi] w-[1.8cqi] rounded-full"
            style={{ background: p.accent }}
            aria-hidden="true"
          />
          <div
            className="mt-[1.2cqi] text-[1.9cqi] font-semibold"
            style={{ color: p.ink }}
          >
            {f.title}
          </div>
          <div className="mt-[0.6cqi] text-[1.5cqi]" style={{ color: p.sub }}>
            {f.note}
          </div>
        </div>
      ))}
    </div>
  );
}

/* mini dashboard for the split archetype */
function DashboardPanel({ p, m }: { p: MockPalette; m: MockContent }) {
  const bars = [52, 68, 46, 82, 60, 74];
  return (
    <div
      className="flex flex-col justify-between rounded-[1.6cqi] p-[2.6cqi]"
      style={{ background: p.surface, border: `1px solid ${p.line}` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[1.7cqi] font-semibold" style={{ color: p.ink }}>
          Overview
        </span>
        <span className="font-mono text-[1.3cqi]" style={{ color: p.sub }}>
          live
        </span>
      </div>

      {/* bar chart */}
      <div className="mt-[2cqi] flex h-[14cqi] items-end gap-[1.4cqi]">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-[0.5cqi]"
            style={{
              height: `${h}%`,
              background: i === 3 ? p.accent : p.line,
            }}
          />
        ))}
      </div>

      {/* figure rows from proof */}
      <div className="mt-[2cqi] flex flex-col gap-[1.2cqi]">
        {m.proof.map((item) => (
          <div key={item.k} className="flex items-center justify-between">
            <span className="text-[1.5cqi]" style={{ color: p.sub }}>
              {item.k}
            </span>
            <span
              className="text-[1.7cqi] font-semibold"
              style={{ color: p.accent }}
            >
              {item.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- archetype layouts -------------------------------------------- */

function SpotlightBody({ niche, p, m }: { niche: Niche; p: MockPalette; m: MockContent }) {
  return (
    <div className="px-[4cqi] pb-[3cqi] pt-[2.6cqi]">
      <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-[2.6cqi]">
        <div>
          <Eyebrow p={p}>{m.eyebrow}</Eyebrow>
          <Headline niche={niche} p={p} m={m} />
          <p
            className="mt-[1.6cqi] line-clamp-2 max-w-[42cqi] text-[1.7cqi] leading-[1.5]"
            style={{ color: p.sub }}
          >
            {m.sub}
          </p>
          <Buttons p={p} m={m} />
        </div>
        <div className="h-[24cqi]">
          <VisualPanel p={p} />
        </div>
      </div>
      <ProofStrip p={p} m={m} />
    </div>
  );
}

function EditorialBody({ niche, p, m }: { niche: Niche; p: MockPalette; m: MockContent }) {
  return (
    <div className="px-[4cqi] pb-[3cqi] pt-[2.8cqi]">
      <Eyebrow p={p}>{m.eyebrow}</Eyebrow>
      <div className="mt-[2cqi] grid grid-cols-[1.4fr_1fr] items-end gap-[3cqi]">
        <Headline niche={niche} p={p} m={m} />
        <p
          className="line-clamp-3 pb-[1cqi] text-[1.7cqi] leading-[1.55]"
          style={{ color: p.sub }}
        >
          {m.sub}
        </p>
      </div>
      <div className="mt-[2.2cqi]">
        <Buttons p={p} m={m} />
      </div>
      <FeatureCards p={p} m={m} />
    </div>
  );
}

function SplitBody({ niche, p, m }: { niche: Niche; p: MockPalette; m: MockContent }) {
  return (
    <div className="px-[4cqi] pb-[3cqi] pt-[2.6cqi]">
      <div className="grid grid-cols-2 items-center gap-[2.6cqi]">
        <div>
          <Eyebrow p={p}>{m.eyebrow}</Eyebrow>
          <Headline niche={niche} p={p} m={m} />
          <p
            className="mt-[1.6cqi] line-clamp-2 text-[1.7cqi] leading-[1.5]"
            style={{ color: p.sub }}
          >
            {m.sub}
          </p>
          <Buttons p={p} m={m} />
        </div>
        <div className="h-[36cqi]">
          <DashboardPanel p={p} m={m} />
        </div>
      </div>
    </div>
  );
}

/* ---- below-the-fold continuation (preview scroll only) ------------ */

/* The "rest of the page" that scrolls into view when a card is hovered — reuses
   the same building blocks, so it reads as more of a real, working site rather
   than new invented copy. */
function ContinuationBody({ p, m }: { p: MockPalette; m: MockContent }) {
  return (
    <div className="px-[4cqi] pb-[3.4cqi] pt-[3cqi]" style={{ borderTop: `1px solid ${p.line}` }}>
      <FeatureCards p={p} m={m} />
      <ProofStrip p={p} m={m} />
      <div
        className="mt-[2.6cqi] flex items-center justify-between rounded-[1.4cqi] px-[2.6cqi] py-[2cqi]"
        style={{ background: p.surface, border: `1px solid ${p.line}` }}
      >
        <span className="text-[2cqi] font-semibold tracking-tight" style={{ color: p.ink }}>
          {m.brand}
        </span>
        <span
          className="rounded-full px-[2.4cqi] py-[1cqi] text-[1.6cqi] font-semibold"
          style={{ background: p.accent, color: p.accentInk }}
        >
          {m.cta}
        </span>
      </div>
    </div>
  );
}

/* ---- public component --------------------------------------------- */

export function NicheMockup({
  niche,
  className = "",
  watermark = false,
  preview = false,
}: {
  niche: Niche;
  className?: string;
  /** show a small "Representative mockup" corner tag inside the frame */
  watermark?: boolean;
  /** card mode: pin the browser chrome and let the page body "scroll" on
   *  hover (driven by the `--wd-mock` custom property; see `.wd-mock-track`). */
  preview?: boolean;
}) {
  const p = niche.palette;
  const m = niche.mock;

  const frameStyle: CSSProperties = {
    background: p.bg,
    boxShadow: `inset 0 0 0 1px ${p.line}`,
  };

  const label = `Website design mockup for ${niche.name.toLowerCase()}: “${m.headlineLines.join(" ")}”`;

  const body = (
    <>
      <MockNav p={p} m={m} />
      {niche.archetype === "spotlight" && <SpotlightBody niche={niche} p={p} m={m} />}
      {niche.archetype === "editorial" && <EditorialBody niche={niche} p={p} m={m} />}
      {niche.archetype === "split" && <SplitBody niche={niche} p={p} m={m} />}
    </>
  );

  return (
    <div
      className={`@container relative aspect-[16/10] w-full overflow-hidden rounded-[1.2cqi] ${className}`}
      style={frameStyle}
      role="img"
      aria-label={label}
    >
      {/* Browser chrome — stays pinned above the (scrolling) page body. */}
      <div className="relative z-20" style={{ background: p.bg }}>
        <ChromeBar p={p} />
        <AddressBar p={p} domain={m.domain} />
      </div>

      {preview ? (
        <div className="wd-mock-track relative z-0">
          {body}
          <ContinuationBody p={p} m={m} />
        </div>
      ) : (
        body
      )}

      {watermark && (
        <span
          className="absolute bottom-[2cqi] right-[2cqi] z-30 rounded-full px-[1.6cqi] py-[0.7cqi] font-mono text-[1.15cqi] uppercase tracking-[0.16em] backdrop-blur-sm"
          style={{
            color: p.light ? p.sub : p.ink,
            background: p.light ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.35)",
            border: `1px solid ${p.line}`,
          }}
        >
          Representative mockup
        </span>
      )}
    </div>
  );
}
