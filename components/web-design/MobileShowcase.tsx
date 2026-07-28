"use client";

/**
 * MobileShowcase — the hub's "we design the app too" beat. A tabbed capability
 * showcase: a tab bar over a bordered panel that splits into feature copy (left)
 * and a phone mockup (right). Each tab carries an industry accent that bleeds
 * into the panel glow and the app UI — so switching tabs re-lights the room.
 *
 * The phone screens are fully-designed, dark-mode app UIs drawn entirely in
 * markup (no canvas, no images): a live technician-tracking map for field
 * service, a financial portal for professional services, and a live
 * order-tracking screen for hospitality. Each ships a realistic status bar,
 * app chrome and bottom tab bar, and is tinted by the active tab's accent.
 * Tab swaps cross-fade; reduced motion swaps instantly. Fully keyboard-operable
 * (roving arrow keys), and every brand maps to a real portfolio build.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";

type IconName =
  | "pin"
  | "repeat"
  | "card"
  | "chart"
  | "lock"
  | "bell"
  | "calendar"
  | "star"
  | "cart"
  | "layout"
  | "home"
  | "user"
  | "clock"
  | "gift"
  | "flame"
  | "van"
  | "receipt"
  | "phone";

function Icon({ name, className, style }: { name: IconName; className?: string; style?: React.CSSProperties }) {
  const paths: Record<IconName, string> = {
    pin: "M8 14.5s5-4.7 5-8.5a5 5 0 0 0-10 0c0 3.8 5 8.5 5 8.5Z M8 6.2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z",
    repeat: "M3.5 8a4.5 4.5 0 0 1 7.8-3 M12.5 8a4.5 4.5 0 0 1-7.8 3 M11 2.5V5H8.5 M5 13.5V11h2.5",
    card: "M2 4.5h12v7H2Z M2 7h12",
    chart: "M2.5 13.5h11 M4.5 13V8 M8 13V4.5 M11.5 13V9.5",
    lock: "M4 7.5h8v6H4Z M6 7.5V6a2 2 0 0 1 4 0v1.5",
    bell: "M8 2.5a3.2 3.2 0 0 0-3.2 3.2c0 3.8-1.5 4.3-1.5 5.3h9.4c0-1-1.5-1.5-1.5-5.3A3.2 3.2 0 0 0 8 2.5Z M6.6 13.6a1.5 1.5 0 0 0 2.8 0",
    calendar: "M3 4.5h10v9H3Z M3 7.2h10 M6 3v2.5 M10 3v2.5",
    star: "M8 2.4l1.7 3.7 4 .4-3 2.7.9 4L8 11.2 4.4 13.2l.9-4-3-2.7 4-.4Z",
    cart: "M2.5 3h1.6l1.4 7h6l1.4-5H5.2 M6.5 13.5a.9.9 0 1 0 0-.01 M11 13.5a.9.9 0 1 0 0-.01",
    layout: "M2.5 3.5h11v9h-11Z M2.5 6.5h11 M7 6.5v6",
    home: "M2.5 8 8 3l5.5 5 M4 7v6h8V7",
    user: "M8 3.4a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2Z M4 13c0-2.2 1.9-3.7 4-3.7s4 1.5 4 3.7",
    clock: "M8 2.6a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Z M8 5.2v3l2 1.2",
    gift: "M3 8h10v5.5H3Z M2.3 5.5h11.4V8H2.3Z M8 5.5v8 M8 5.5C6.9 3.4 4.3 4.1 5.4 5.6 M8 5.5c1.1-2.1 3.7-1.4 2.6.1",
    flame: "M8 2.4c2 2.3 3.4 3.9 3.4 6.1a3.4 3.4 0 0 1-6.8 0c0-1 .3-1.8.9-2.6.2 1 .8 1.5 1.5 1.5 0-1.9.3-3.3 1-5Z",
    van: "M1.5 5h7.5v6h-7.5Z M9 7h2.6l2 2v2H9Z M4.2 11a1.1 1.1 0 1 0 0-.01 M11.6 11a1.1 1.1 0 1 0 0-.01",
    receipt: "M4 2.5h8v11l-1.5-1-1.5 1-1.5-1-1.5 1-1.5-1V2.5Z M6 5.5h4 M6 8h4",
    phone: "M5 2.8 6.6 3l.7 2.4-1 .9a8 8 0 0 0 3.4 3.4l.9-1 2.4.7.2 1.6a1.1 1.1 0 0 1-1.1 1.2A9.4 9.4 0 0 1 3.6 4a1.1 1.1 0 0 1 1.2-1.2Z",
  };
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name].split(" M").map((seg, i) => (
        <path key={i} d={i === 0 ? seg : `M${seg}`} />
      ))}
    </svg>
  );
}

type Tab = {
  id: "field" | "portal" | "order";
  label: string;
  tabIcon: IconName;
  accent: string;
  brand: string;
  appGlyph: IconName;
  platform: string;
  desc: string;
  features: { icon: IconName; label: string }[];
};

const TABS: Tab[] = [
  {
    id: "order",
    label: "Ordering & loyalty",
    tabIcon: "flame",
    accent: "#ff7a3c",
    brand: "A La Parrilla",
    appGlyph: "flame",
    platform: "iOS · Android",
    desc: "Order direct and skip the delivery-app fees, then watch it cook over live fire. Reorder a favourite in two taps, and every plate stamps their card toward a free one.",
    features: [
      { icon: "van", label: "Live order tracking, fire to door" },
      { icon: "repeat", label: "Two-tap reorder of the usual" },
      { icon: "gift", label: "Loyalty stamps that earn free plates" },
    ],
  },
  {
    id: "portal",
    label: "Client portals",
    tabIcon: "layout",
    accent: "#43c088",
    brand: "Meridian & Co",
    appGlyph: "chart",
    platform: "iOS · Web app",
    desc: "A private login where clients can check their numbers, grab a document or see what's due, without emailing to ask.",
    features: [
      { icon: "chart", label: "Real-time dashboards" },
      { icon: "lock", label: "Encrypted document vault" },
      { icon: "bell", label: "Push updates that matter" },
    ],
  },
  {
    id: "field",
    label: "Field service",
    tabIcon: "pin",
    accent: "#ffb020",
    brand: "Voltedge",
    appGlyph: "pin",
    platform: "iOS · Android",
    desc: "The name they already call, now on their phone. Book a callout, watch the van get closer on the map, and pay once the job's signed off.",
    features: [
      { icon: "pin", label: "Live technician tracking" },
      { icon: "repeat", label: "One-tap rebooking" },
      { icon: "card", label: "Apple & Google Pay" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Shared phone chrome                                                */
/* ------------------------------------------------------------------ */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-1.5 pb-2.5 pt-1 text-white">
      <span className="text-[0.62rem] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="15" height="10" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.4" />
        </svg>
        {/* wifi */}
        <svg width="13" height="10" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M2 4.4a9 9 0 0 1 12 0" strokeLinecap="round" />
          <path d="M4.4 7a5.4 5.4 0 0 1 7.2 0" strokeLinecap="round" />
          <circle cx="8" cy="9.4" r="0.95" fill="currentColor" stroke="none" />
        </svg>
        {/* battery */}
        <span className="flex items-center gap-[1.5px]">
          <span className="flex h-2.5 w-[22px] items-center rounded-[3px] border border-white/55 px-[1.5px]">
            <span className="h-1.5 w-[70%] rounded-[1px] bg-white" />
          </span>
          <span className="h-1 w-[2px] rounded-r-sm bg-white/55" />
        </span>
      </span>
    </div>
  );
}

function TabBar({ accent, items, active }: { accent: string; items: IconName[]; active: number }) {
  return (
    <div className="mt-2 flex items-center justify-around border-t border-white/8 px-2 pb-1 pt-2.5">
      {items.map((name, i) => (
        <span key={name} className="flex flex-col items-center gap-1">
          <Icon
            name={name}
            className="h-4.5 w-4.5"
            style={{ color: i === active ? accent : "rgba(255,255,255,0.38)" }}
          />
          <span
            className="h-1 w-1 rounded-full transition-opacity"
            style={{ background: accent, opacity: i === active ? 1 : 0 }}
          />
        </span>
      ))}
    </div>
  );
}

function AppHeader({
  title,
  sub,
  accent,
  right,
}: {
  title: string;
  sub?: string;
  accent: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-[0.7rem] text-carbon"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}
          aria-hidden="true"
        >
          <span className="text-[0.7rem] font-bold">{title.trim().charAt(0)}</span>
        </span>
        <span className="leading-tight">
          <span className="block whitespace-nowrap text-[0.82rem] font-semibold text-white">{title}</span>
          {sub ? <span className="block whitespace-nowrap text-[0.58rem] text-white/50">{sub}</span> : null}
        </span>
      </div>
      {right}
    </div>
  );
}

function LivePill({ accent, label }: { accent: string; label: string }) {
  const reduce = useReducedMotion();
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.08em]"
      style={{ color: accent, background: `${accent}1f` }}
    >
      <span className="relative flex h-1.5 w-1.5">
        {!reduce && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: accent }}
            animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
      </span>
      {label}
    </span>
  );
}

function MiniStars({ accent, rating }: { accent: string; rating: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="8" height="8" viewBox="0 0 16 16" fill={accent} aria-hidden="true">
            <path d="M8 2.4l1.7 3.7 4 .4-3 2.7.9 4L8 11.2 4.4 13.2l.9-4-3-2.7 4-.4Z" />
          </svg>
        ))}
      </span>
      <span className="text-[0.58rem] text-white/60">{rating}</span>
    </span>
  );
}

/* Reusable stepper for job / order progress. */
function Stepper({ steps, current, accent }: { steps: string[]; current: number; accent: string }) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => {
        const done = i <= current;
        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                className="flex h-3.5 w-3.5 items-center justify-center rounded-full"
                style={{ background: done ? accent : "#26262e" }}
              >
                {i < current ? (
                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="#0a0a0c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                ) : i === current ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0a0a0c]" />
                ) : null}
              </span>
              <span
                className="text-[0.5rem] uppercase tracking-wide"
                style={{ color: done ? "#e7e4dd" : "#6b6b76" }}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className="mx-1 mb-4 h-[2px] flex-1 rounded-full"
                style={{ background: i < current ? accent : "#26262e" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen 1 — Voltedge field service (live tracking)                 */
/* ------------------------------------------------------------------ */

function FieldScreen({ accent }: { accent: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-full flex-col px-4 pb-2 pt-8">
      <StatusBar />
      <AppHeader
        title="Voltedge"
        sub="Job #VE-2048"
        accent={accent}
        right={<LivePill accent={accent} label="En route" />}
      />

      {/* Map */}
      <div className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-[1.4rem] border border-white/8 bg-[#0d0e12]">
        <svg viewBox="0 0 220 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          {/* land tint */}
          <rect width="220" height="260" fill="#111318" />
          {/* park */}
          <rect x="18" y="150" width="70" height="60" rx="8" fill="#16241c" />
          {/* river */}
          <path d="M-10 40 C60 70 40 130 130 150 S210 210 240 200 L240 260 L-10 260 Z" fill="#0e1a24" opacity="0.7" />
          {/* road network */}
          <g stroke="#1f2230" strokeWidth="9" strokeLinecap="round">
            <line x1="-10" y1="70" x2="230" y2="95" />
            <line x1="-10" y1="185" x2="230" y2="165" />
            <line x1="55" y1="-10" x2="38" y2="270" />
            <line x1="165" y1="-10" x2="182" y2="270" />
          </g>
          <g stroke="#191c27" strokeWidth="4" strokeLinecap="round">
            <line x1="-10" y1="128" x2="230" y2="128" />
            <line x1="110" y1="-10" x2="110" y2="270" />
          </g>
          {/* route */}
          <path
            d="M45 214 C95 185 70 120 132 116 S196 70 190 44"
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${accent}aa)` }}
          />
          <path
            d="M45 214 C95 185 70 120 132 116 S196 70 190 44"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="0.5 8"
            opacity="0.7"
          >
            {!reduce && (
              <animate attributeName="stroke-dashoffset" values="0;-8.5" dur="0.9s" repeatCount="indefinite" />
            )}
          </path>
          {/* destination */}
          <g transform="translate(190 44)">
            <circle r="11" fill={accent} opacity="0.18" />
            <path d="M-5 1 L0 -4 L5 1 M-3.5 0.5 V5 H3.5 V0.5" fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* van marker */}
          <g transform="translate(45 214)">
            <circle r="15" fill={accent} opacity="0.16">
              {!reduce && (
                <>
                  <animate attributeName="r" values="13;22;13" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.32;0;0.32" dur="2.4s" repeatCount="indefinite" />
                </>
              )}
            </circle>
            <circle r="9" fill={accent} />
            <circle r="9" fill="none" stroke="#0d0e12" strokeWidth="1.6" />
            <path d="M-4 -1.4h5l2 2v2h-9Z M-2.4 2.6a1 1 0 1 0 0 .01 M3.4 2.6a1 1 0 1 0 0 .01" fill="none" stroke="#0d0e12" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        {/* ETA chip */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-xl border border-white/10 bg-carbon/85 px-3 py-2 backdrop-blur-sm">
          <span className="text-[1.15rem] font-bold leading-none text-white">12</span>
          <span className="text-[0.5rem] uppercase leading-tight tracking-wide text-white/60">
            min
            <br />
            away
          </span>
        </div>
      </div>

      {/* Technician card */}
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-2.5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-bold text-carbon"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}aa)` }}
        >
          MD
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.82rem] font-semibold text-white">Marcus Doyle</p>
          <div className="mt-1 flex items-center gap-2">
            <MiniStars accent={accent} rating="4.9" />
            <span className="text-[0.58rem] text-white/45">· NICEIC</span>
          </div>
        </div>
        {/* call the technician */}
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-carbon"
          style={{ background: accent }}
        >
          <Icon name="phone" className="h-4 w-4" />
        </span>
      </div>

      {/* Progress */}
      <div className="mt-3">
        <Stepper steps={["Booked", "En route", "Arriving"]} current={1} accent={accent} />
      </div>

      <TabBar accent={accent} items={["home", "pin", "clock", "user"]} active={1} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen 2 — Meridian client portal (finance dashboard)             */
/* ------------------------------------------------------------------ */

function PortalScreen({ accent }: { accent: string }) {
  const docs = [
    { name: "Year-end accounts 2025", date: "Signed", state: "done" },
    { name: "VAT return · Q2", date: "Due 7 Aug", state: "due" },
    { name: "Management pack", date: "New", state: "new" },
  ];
  return (
    <div className="flex h-full flex-col px-4 pb-2 pt-8">
      <StatusBar />
      <div className="flex items-center justify-between px-1">
        <div>
          <p className="text-[0.6rem] text-white/50">Good morning</p>
          <p className="text-[0.95rem] font-semibold text-white">Sarah Whitmore</p>
        </div>
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/70">
          <Icon name="bell" className="h-4 w-4" />
          <span className="absolute -right-0 -top-0 h-2 w-2 rounded-full border border-[#0a0a0c]" style={{ background: accent }} />
        </span>
      </div>

      {/* Balance hero */}
      <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[0.56rem] uppercase tracking-[0.12em] text-white/45">Cash position</span>
          <span className="rounded-md px-1.5 py-0.5 text-[0.56rem] font-semibold" style={{ color: accent, background: `${accent}22` }}>
            +12.4%
          </span>
        </div>
        <p className="mt-1 text-[1.5rem] font-bold leading-none tracking-tight text-white">£248,300</p>

        <svg viewBox="0 0 220 60" preserveAspectRatio="none" className="mt-3 h-14 w-full">
          <defs>
            <linearGradient id="msPortalArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* gridlines */}
          {[15, 30, 45].map((y) => (
            <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
          ))}
          <path d="M0 46 L28 42 L56 44 L84 30 L112 34 L140 20 L168 24 L196 12 L220 7 L220 60 L0 60 Z" fill="url(#msPortalArea)" />
          <path
            d="M0 46 L28 42 L56 44 L84 30 L112 34 L140 20 L168 24 L196 12 L220 7"
            fill="none"
            stroke={accent}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="220" cy="7" r="3" fill={accent} stroke="#0a0a0c" strokeWidth="1.5" />
        </svg>
        <div className="mt-1 flex justify-between text-[0.5rem] text-white/35">
          {["Mar", "Apr", "May", "Jun", "Jul"].map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>

      {/* Stat row */}
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {[
          { k: "Invoices due", v: "£12,480" },
          { k: "Tax set aside", v: "£31,200" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
            <p className="text-[0.52rem] uppercase tracking-wide text-white/45">{s.k}</p>
            <p className="mt-0.5 text-[0.9rem] font-semibold text-white">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Documents */}
      <div className="mt-3 min-h-0 flex-1 rounded-2xl border border-white/8 bg-white/[0.03] p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[0.58rem] font-semibold uppercase tracking-wide text-white/55">Documents</span>
          <Icon name="lock" className="h-3 w-3 text-white/35" />
        </div>
        <ul className="flex flex-col gap-2">
          {docs.map((d) => (
            <li key={d.name} className="flex items-center gap-2.5">
              <span className="flex h-7 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]">
                <Icon name="receipt" className="h-3.5 w-3.5" style={{ color: accent }} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[0.66rem] text-white/85">{d.name}</span>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[0.5rem] font-semibold"
                style={
                  d.state === "done"
                    ? { color: accent, background: `${accent}1c` }
                    : d.state === "new"
                      ? { color: "#0a0a0c", background: accent }
                      : { color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)" }
                }
              >
                {d.date}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <TabBar accent={accent} items={["home", "chart", "layout", "user"]} active={0} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen 3 — A La Parrilla live order tracking                      */
/* ------------------------------------------------------------------ */

function OrderScreen({ accent }: { accent: string }) {
  const reduce = useReducedMotion();
  const items = [
    { n: "Slow-smoked brisket plate", q: "×1", p: "£14.50", dot: "#8a3b1e" },
    { n: "Colombian empanadas", q: "×3", p: "£7.20", dot: "#d99a3a" },
    { n: "Chimichurri fries", q: "×1", p: "£4.50", dot: "#6fae4f" },
  ];
  const STAMPS = 10;
  const earned = 7;
  return (
    <div className="flex h-full flex-col px-4 pb-2 pt-8">
      <StatusBar />
      <AppHeader
        title="A La Parrilla"
        sub="Order #A-1287"
        accent={accent}
        right={<LivePill accent={accent} label="Cooking" />}
      />

      {/* Hero — live over the fire */}
      <div className="relative mt-3 overflow-hidden rounded-[1.4rem] border border-white/10 p-3.5">
        <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${accent}44, ${accent}12 52%, #150f0c 100%)` }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 82% -10%, rgba(255,180,120,0.42), transparent 55%)" }} aria-hidden="true" />

        {/* drifting ember glows */}
        {!reduce &&
          [0, 1].map((i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              className="absolute rounded-full blur-2xl"
              style={{ background: `${accent}55`, width: 90, height: 90, right: i ? -14 : 92, bottom: i ? -26 : 6 }}
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.18, 1] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
            />
          ))}

        {/* steam rising off the flame */}
        {!reduce && (
          <div className="absolute right-[26px] top-1.5 flex gap-[5px]" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-6 w-[2px] rounded-full"
                style={{ background: "linear-gradient(to top, rgba(255,220,190,0), rgba(255,224,196,0.85))" }}
                animate={{ y: [6, -10], opacity: [0, 0.7, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
              />
            ))}
          </div>
        )}

        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[0.56rem] uppercase tracking-[0.12em] text-white/60">Arriving by</p>
              <p className="text-[1.35rem] font-bold leading-none text-white">7:32 pm</p>
              <p className="mt-1.5 flex items-center gap-1 text-[0.56rem] text-white/70">
                <Icon name="flame" className="h-3 w-3" style={{ color: accent }} />
                Cooking over open flame · 6 min left
              </p>
            </div>
            <motion.span
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 backdrop-blur-sm"
              style={{ color: accent }}
              animate={reduce ? undefined : { boxShadow: [`0 0 0 0 ${accent}00`, `0 0 20px 3px ${accent}88`, `0 0 0 0 ${accent}00`] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon name="flame" className="h-5 w-5" />
            </motion.span>
          </div>
          <div className="mt-4">
            <Stepper steps={["Confirmed", "Cooking", "On its way"]} current={1} accent={accent} />
          </div>
        </div>
      </div>

      {/* Order items */}
      <div className="mt-3 min-h-0 flex-1 rounded-2xl border border-white/8 bg-white/[0.03] p-3">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[0.58rem] font-semibold uppercase tracking-wide text-white/55">Your order</span>
          <span className="text-[0.58rem] font-semibold" style={{ color: accent }}>3 items</span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {items.map((it) => (
            <li key={it.n} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[0.52rem] font-bold text-white/85" style={{ background: it.dot }}>
                {it.q}
              </span>
              <span className="min-w-0 flex-1 truncate text-[0.66rem] text-white/85">{it.n}</span>
              <span className="shrink-0 text-[0.64rem] font-semibold text-white/70">{it.p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-2">
          <span className="flex items-center gap-1 text-[0.6rem] text-white/55">
            <Icon name="lock" className="h-3 w-3 text-white/40" />
            Paid direct · no app fees
          </span>
          <span className="text-[0.78rem] font-bold text-white">£26.20</span>
        </div>
      </div>

      {/* Loyalty — stamp card */}
      <div
        className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 p-2.5"
        style={{ background: `linear-gradient(135deg, ${accent}20, rgba(255,255,255,0.03))` }}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[0.68rem] font-semibold text-white">
            <Icon name="gift" className="h-3.5 w-3.5" style={{ color: accent }} />
            Fuego Rewards
          </span>
          <span className="rounded-full px-2 py-0.5 text-[0.52rem] font-bold" style={{ color: "#0a0a0c", background: accent }}>
            {earned} / {STAMPS}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          {Array.from({ length: STAMPS }).map((_, i) => {
            const filled = i < earned;
            return (
              <span
                key={i}
                className="flex h-[15px] w-[15px] items-center justify-center rounded-full"
                style={filled ? { background: accent } : { border: "1px dashed rgba(255,255,255,0.28)" }}
              >
                {filled ? <Icon name="flame" className="h-2 w-2" style={{ color: "#0a0a0c" }} /> : null}
              </span>
            );
          })}
        </div>
        <p className="mt-1.5 text-[0.56rem] text-white/60">
          3 plates to a <span className="font-semibold text-white/90">free brisket</span>, worth £14.50
        </p>
      </div>

      <TabBar accent={accent} items={["home", "layout", "receipt", "gift"]} active={2} />
    </div>
  );
}

function AppScreen({ tab }: { tab: Tab }) {
  if (tab.id === "field") return <FieldScreen accent={tab.accent} />;
  if (tab.id === "portal") return <PortalScreen accent={tab.accent} />;
  return <OrderScreen accent={tab.accent} />;
}

function Phone({ tab }: { tab: Tab }) {
  return (
    <div className="relative">
      {/* Ghost phone behind, for depth */}
      <div
        aria-hidden="true"
        className="absolute -right-8 top-6 hidden h-[560px] w-[258px] rotate-[8deg] rounded-[2.6rem] border border-graphite bg-carbon-2/70 sm:block"
      />
      {/* Main phone */}
      <div className="relative mx-auto h-[584px] w-[268px] rounded-[2.6rem] border border-graphite-2 bg-gradient-to-b from-carbon-3 to-carbon p-[10px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-white/10">
        {/* top edge highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[2.6rem]"
          style={{ boxShadow: "inset 1.5px 1.5px 0 rgba(255,255,255,0.22)" }}
        />
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-[#0a0a0c]">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-black" aria-hidden="true">
            <span className="absolute right-2.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/12" />
          </div>
          <AppScreen tab={tab} />
        </div>
      </div>
    </div>
  );
}

export function MobileShowcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = TABS[active];

  function onTabKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (i + 1) % TABS.length : (i - 1 + TABS.length) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const swap = (key: string, children: React.ReactNode, extra = "") => (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: EASE }}
        className={extra}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section
      id="mobile"
      aria-labelledby="mobile-heading"
      className="relative border-t border-graphite py-24 md:py-32"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow text-halo-dim">
            Mobile & app design
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            <span
              id="mobile-heading"
              className="mt-5 block font-display-tuned text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.06] text-ivory"
            >
              It doesn&apos;t stop at the website.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.12} className="mt-6 max-w-[58ch] text-lg leading-relaxed text-mist">
            Plenty of businesses meet their customers in an app, not a browser.
            We build those too: ordering, loyalty, portals, booking. We make them
            look and feel like the website, so the whole thing reads as one
            company.
          </Reveal>
        </div>

        {/* Tab bar */}
        <Reveal delay={0.16} className="mt-12">
          <div role="tablist" aria-label="Mobile capabilities" className="flex flex-wrap gap-2">
            {TABS.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`mobile-tab-${t.id}`}
                  aria-selected={on}
                  aria-controls="mobile-panel"
                  tabIndex={on ? 0 : -1}
                  data-cursor="link"
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-[0.85rem] font-medium transition-colors duration-300 ${
                    on
                      ? "border-graphite-2 bg-carbon-3 text-ivory"
                      : "border-transparent text-mist hover:text-ivory"
                  }`}
                >
                  <Icon
                    name={t.tabIcon}
                    className="h-4 w-4"
                    {...(on ? { style: { color: t.accent } } : {})}
                  />
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <Reveal delay={0.2} className="mt-4">
          <div
            id="mobile-panel"
            role="tabpanel"
            aria-labelledby={`mobile-tab-${tab.id}`}
            className="relative overflow-hidden rounded-[1.8rem] border border-graphite bg-carbon-2/60 p-8 md:p-12"
          >
            {/* accent bleed glow — shifts with the active tab */}
            <AnimatePresence>
              <motion.div
                key={tab.id}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{ background: `radial-gradient(60% 70% at 78% 30%, ${tab.accent}24, transparent 66%)` }}
              />
            </AnimatePresence>

            <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
              {/* Left — copy */}
              <div className="min-h-[300px]">
                {swap(
                  `copy-${tab.id}`,
                  <>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-[0.85rem]"
                        style={{
                          background: `linear-gradient(135deg, ${tab.accent}, ${tab.accent}99)`,
                          boxShadow: `0 10px 24px -10px ${tab.accent}aa`,
                        }}
                      >
                        <Icon name={tab.appGlyph} className="h-5 w-5 text-carbon" />
                      </span>
                      <span className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold tracking-tight text-ivory">{tab.brand}</span>
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-halo-dim">
                          {tab.platform}
                        </span>
                      </span>
                    </div>

                    <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-mist">{tab.desc}</p>

                    <ul className="mt-8 flex flex-col gap-4">
                      {tab.features.map((f) => (
                        <li key={f.label} className="flex items-center gap-3.5">
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-graphite bg-carbon"
                            style={{ color: tab.accent }}
                          >
                            <Icon name={f.icon} className="h-4 w-4" />
                          </span>
                          <span className="text-[0.98rem] text-ivory/90">{f.label}</span>
                        </li>
                      ))}
                    </ul>
                  </>,
                )}
              </div>

              {/* Right — phone */}
              <div className="flex justify-center lg:justify-end">
                {swap(`phone-${tab.id}`, <Phone tab={tab} />)}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
