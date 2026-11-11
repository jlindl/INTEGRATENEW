"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CLIENTS } from "@/components/web-design-portal/site-data";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

export type Mode = "sites" | "webapps" | "mobile";

/**
 * The hardware for "What we build": a laptop and a phone drawn to look like
 * the real thing — machined edges, bezels, glass glare, contact shadows —
 * instead of grey placeholder bars.
 *
 *  - Websites: the laptop plays through screenshots of live client sites.
 *  - Portals & systems: the laptop shows an example portal interface,
 *    labelled as an example (it is not a client's system).
 *  - Mobile: the phone comes forward with the A La Parrilla demo app, using
 *    the items, prices and loyalty count from the app on the live portal.
 *
 * Authored at a fixed 560x430 and scaled to fit by `.device-scale`.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const SHOWREEL = ["Allied Insurance", "Ramsay Timber", "ModelMentions", "PoundMart"]
  .map((name) => CLIENTS.find((client) => client.name === name))
  .filter((client) => client !== undefined);
const SHOWREEL_MS = 2600;

/* ------------------------------------------------------------- Screens */

function SitesScreen({ playing }: { playing: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SHOWREEL.length),
      SHOWREEL_MS,
    );
    return () => window.clearInterval(id);
  }, [playing]);

  const client = SHOWREEL[index];

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      {/* Browser toolbar, as it would look on the machine. */}
      <div className="flex h-[22px] shrink-0 items-center gap-1.5 border-b border-black/10 bg-[#ececee] px-2.5">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="h-[7px] w-[7px] rounded-full" style={{ background: c }} />
        ))}
        <span className="mx-auto flex h-[14px] w-[46%] items-center justify-center gap-1 rounded-[4px] bg-white text-[7.5px] font-medium text-black/60">
          <svg viewBox="0 0 10 10" className="h-[6px] w-[6px]" aria-hidden>
            <path d="M3 4.5V3.3a2 2 0 1 1 4 0v1.2M2.4 4.5h5.2v4H2.4z" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          {client.domain}
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={client.name}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={client.image}
              alt=""
              fill
              sizes="560px"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const NAV = ["Overview", "Bookings", "Clients", "Invoices", "Messages"];

const BOOKINGS = [
  { time: "09:00", who: "Survey visit", where: "Chorley", tone: "#a02bff" },
  { time: "11:30", who: "Consultation call", where: "Video", tone: "#2fd39b" },
  { time: "14:00", who: "Installation", where: "Preston", tone: "#ff9f43" },
];

const INVOICES = [
  { ref: "INV-0412", status: "Paid", ok: true },
  { ref: "INV-0413", status: "Paid", ok: true },
  { ref: "INV-0414", status: "Reminder sent", ok: false },
];

function PortalScreen() {
  return (
    <div className="absolute inset-0 flex bg-[#f6f5f8] text-[#14111a]">
      {/* Sidebar */}
      <div className="flex w-[104px] shrink-0 flex-col gap-1 bg-[#121018] px-2.5 py-3 text-white">
        <div className="mb-3 flex items-center gap-1.5 px-1">
          <span className="h-3.5 w-3.5 rounded-[4px] bg-gradient-to-br from-[#c98fff] to-[#7a12d6]" />
          <span className="text-[8.5px] font-semibold tracking-[-0.01em]">Client portal</span>
        </div>
        {NAV.map((item, i) => (
          <span
            key={item}
            className={`rounded-[5px] px-2 py-1.5 text-[7.5px] ${
              i === 0 ? "bg-white/12 font-semibold text-white" : "text-white/55"
            }`}
          >
            {item}
          </span>
        ))}
        <span className="mt-auto flex items-center gap-1.5 rounded-[6px] bg-white/[0.06] p-1.5">
          <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#ffd7b0] to-[#e08a4a]" />
          <span className="text-[7px] text-white/70">Signed in</span>
        </span>
      </div>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[7px] font-medium uppercase tracking-[0.14em] text-black/40">Overview</p>
            <p className="text-[13px] font-semibold tracking-[-0.02em]">Good morning</p>
          </div>
          <span className="rounded-full bg-[#14111a] px-2.5 py-1 text-[7.5px] font-medium text-white">
            + New booking
          </span>
        </div>

        <div className="grid flex-1 grid-cols-[1.25fr_1fr] gap-2.5">
          {/* Activity chart */}
          <div className="flex flex-col rounded-[9px] bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_6px_18px_-8px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between">
              <p className="text-[8px] font-semibold">Enquiries</p>
              <span className="rounded-full bg-black/[0.05] px-1.5 py-0.5 text-[6.5px] text-black/50">Last 30 days</span>
            </div>
            <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="mt-2 w-full flex-1" aria-hidden>
              <defs>
                <linearGradient id="portal-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a02bff" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#a02bff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 40, 60].map((y) => (
                <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#000" strokeOpacity="0.06" strokeWidth="0.6" />
              ))}
              <path
                d="M0 62 C 18 58, 26 48, 40 50 S 64 34, 80 38 S 104 52, 120 40 S 146 18, 162 24 S 186 14, 200 10 L200 80 L0 80Z"
                fill="url(#portal-area)"
              />
              <path
                d="M0 62 C 18 58, 26 48, 40 50 S 64 34, 80 38 S 104 52, 120 40 S 146 18, 162 24 S 186 14, 200 10"
                fill="none"
                stroke="#8710e8"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="162" cy="24" r="2.6" fill="#fff" stroke="#8710e8" strokeWidth="1.4" />
            </svg>
          </div>

          {/* Today */}
          <div className="flex flex-col rounded-[9px] bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_6px_18px_-8px_rgba(0,0,0,0.12)]">
            <p className="text-[8px] font-semibold">Today</p>
            <ul className="mt-1.5 flex flex-1 flex-col justify-between">
              {BOOKINGS.map((b) => (
                <li key={b.time} className="flex items-center gap-1.5 border-t border-black/[0.06] py-1">
                  <span className="h-5 w-[2.5px] rounded-full" style={{ background: b.tone }} />
                  <span className="w-[24px] text-[7px] font-semibold tabular-nums">{b.time}</span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[7.5px] font-medium">{b.who}</span>
                    <span className="block text-[6.5px] text-black/45">{b.where}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Invoices */}
        <div className="rounded-[9px] bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_6px_18px_-8px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-semibold">Invoices</p>
            <p className="text-[6.5px] text-black/45">Chased automatically</p>
          </div>
          <ul className="mt-1.5 grid grid-cols-3 gap-2">
            {INVOICES.map((inv) => (
              <li key={inv.ref} className="flex items-center justify-between rounded-[6px] bg-black/[0.035] px-2 py-1.5">
                <span className="text-[7px] font-medium tabular-nums">{inv.ref}</span>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[6px] font-semibold"
                  style={
                    inv.ok
                      ? { background: "#e3f8ee", color: "#13804f" }
                      : { background: "#fff1e3", color: "#b25a07" }
                  }
                >
                  {inv.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const EMBER = "#ff6a2b";

function PhoneScreen() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#16100c] text-white">
      {/* Header lit like the fire the brand is built on. */}
      <div className="relative h-[132px] shrink-0 overflow-hidden bg-[radial-gradient(120%_90%_at_80%_110%,#ff8a3d_0%,#d4401a_32%,#5a1408_62%,#16100c_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_25%_100%,rgba(255,190,90,0.45),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-[#16100c]" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-3 text-[8.5px] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-[3px]">
            <span className="h-[5px] w-[9px] rounded-[1.5px] bg-white/90" />
            <span className="h-[6px] w-[12px] rounded-[2px] border border-white/70 p-[1px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-white/90" />
            </span>
          </span>
        </div>
        <p className="absolute bottom-2 left-4 text-[13px] font-bold uppercase tracking-[-0.01em]">
          A La Parrilla
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3 pb-4">
        <div className="rounded-[12px] bg-white/[0.06] p-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[8.5px] font-semibold">Your usual</span>
            <span className="text-[7px] text-white/45">3 items</span>
          </div>
          <ul className="mt-1.5 space-y-1">
            {[
              ["×1", "Slow-smoked brisket plate", "£14.50"],
              ["×3", "Colombian empanadas", "£7.20"],
              ["×1", "Chimichurri fries", "£4.50"],
            ].map(([qty, item, price]) => (
              <li key={item} className="flex gap-1.5 text-[7.5px]">
                <span className="w-3 text-white/40">{qty}</span>
                <span className="flex-1 truncate text-white/85">{item}</span>
                <span className="tabular-nums text-white/70">{price}</span>
              </li>
            ))}
          </ul>
        </div>

        <span
          className="flex items-center justify-between rounded-full px-3.5 py-2 text-[8.5px] font-semibold text-[#16100c]"
          style={{ background: EMBER }}
        >
          Reorder in two taps
          <span className="tabular-nums">£26.20</span>
        </span>

        <div
          className="rounded-[12px] p-2.5"
          style={{ background: `linear-gradient(135deg, ${EMBER}38, rgba(255,255,255,0.04))` }}
        >
          <div className="flex items-baseline justify-between">
            <span className="text-[8.5px] font-semibold">Fuego Rewards</span>
            <span className="text-[8.5px] font-semibold tabular-nums" style={{ color: EMBER }}>
              7 / 10
            </span>
          </div>
          <div className="mt-1.5 flex justify-between">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className="h-[11px] w-[11px] rounded-full border"
                style={{
                  background: i < 7 ? EMBER : "transparent",
                  borderColor: i < 7 ? EMBER : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>

        <span className="mx-auto mt-auto h-[3px] w-[64px] rounded-full bg-white/55" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Hardware */

/** Light falling across glass: a soft diagonal sheen plus a hard edge glint. */
function Glare() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.04)_28%,transparent_42%,transparent_70%,rgba(255,255,255,0.05)_100%)]"
    />
  );
}

function Tag({
  children,
  className = "right-2.5 bottom-2.5",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`absolute ${className} z-20 rounded-full bg-black/70 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm`}>
      {children}
    </span>
  );
}

function Laptop({ mode, playing }: { mode: Mode; playing: boolean }) {
  return (
    <div className="relative w-[540px]">
      {/* Lid: machined graphite shell around a black glass bezel. */}
      <div className="relative mx-auto w-[500px] rounded-[16px] bg-[linear-gradient(180deg,#3a3a40,#1b1b1f_60%,#121215)] p-[1.5px] shadow-[0_0_0_0.5px_rgba(255,255,255,0.18)_inset]">
        <div className="relative rounded-[14.5px] bg-[#050506] px-[9px] pb-[9px] pt-[12px]">
          {/* Camera */}
          <span className="absolute left-1/2 top-[4px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#1d2333] shadow-[0_0_0_1px_#0b0b0d,inset_0_0_1px_#4b5a80]" />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-black">
            <motion.div
              initial={false}
              animate={{ opacity: mode === "webapps" ? 0 : 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0"
            >
              <SitesScreen playing={playing && mode === "sites"} />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ opacity: mode === "webapps" ? 1 : 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0"
            >
              <PortalScreen />
              <Tag className="bottom-[40px] left-2.5">Example UI</Tag>
            </motion.div>
            <Glare />
          </div>
        </div>
      </div>

      {/* Hinge + base deck. */}
      <div className="relative -mt-px h-[5px] w-[504px] mx-auto rounded-b-[2px] bg-[linear-gradient(180deg,#0c0c0e,#2a2a2f)]" />
      <div className="relative mx-auto h-[13px] w-[540px] rounded-b-[14px] rounded-t-[3px] bg-[linear-gradient(180deg,#5a5a62_0%,#2e2e34_38%,#18181c_100%)] shadow-[0_1px_0_rgba(255,255,255,0.22)_inset]">
        {/* Thumb notch */}
        <span className="absolute left-1/2 top-0 h-[5px] w-[86px] -translate-x-1/2 rounded-b-[6px] bg-[linear-gradient(180deg,#1a1a1e,#3a3a41)]" />
      </div>
      {/* Contact shadow on the surface. */}
      <span className="absolute -bottom-[18px] left-1/2 h-[22px] w-[600px] -translate-x-1/2 rounded-[50%] bg-black/80 blur-[12px]" />
    </div>
  );
}

function Phone() {
  return (
    <div className="relative">
      {/* Side buttons */}
      <span className="absolute -left-[2.5px] top-[82px] h-[26px] w-[3px] rounded-l-[2px] bg-[#2b2b30]" />
      <span className="absolute -left-[2.5px] top-[118px] h-[40px] w-[3px] rounded-l-[2px] bg-[#2b2b30]" />
      <span className="absolute -right-[2.5px] top-[104px] h-[56px] w-[3px] rounded-r-[2px] bg-[#2b2b30]" />

      {/* Brushed titanium band, then the black glass. */}
      <div className="relative h-[392px] w-[192px] rounded-[38px] bg-[linear-gradient(140deg,#6a6a72,#2a2a30_30%,#1a1a1e_60%,#4a4a52)] p-[2.5px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.95),0_0_0_0.5px_rgba(255,255,255,0.25)_inset]">
        <div className="relative h-full w-full rounded-[35.5px] bg-black p-[6px]">
          <div className="relative h-full w-full overflow-hidden rounded-[30px]">
            <PhoneScreen />
            {/* Dynamic island */}
            <span className="absolute left-1/2 top-[8px] z-20 h-[16px] w-[56px] -translate-x-1/2 rounded-full bg-black" />
            <Tag className="right-3 top-[38px]">Demo app</Tag>
            <Glare />
          </div>
        </div>
      </div>
      <span className="absolute -bottom-[14px] left-1/2 h-[18px] w-[170px] -translate-x-1/2 rounded-[50%] bg-black/80 blur-[10px]" />
    </div>
  );
}

export default function DeviceStage({ mode }: { mode: Mode }) {
  const reduce = usePrefersReducedMotion();
  const mobile = mode === "mobile";
  const transition = { duration: reduce ? 0 : 0.85, ease: EASE };

  return (
    <div className="relative h-[430px] w-[560px]">
      {/* The laptop steps back and dims when the phone takes the stage. */}
      <motion.div
        initial={false}
        animate={
          mobile
            ? { x: -58, y: 6, scale: 0.84, opacity: 0.42, filter: "blur(1.5px)" }
            : { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        transition={transition}
        className="absolute left-[10px] top-[44px]"
      >
        <Laptop mode={mode} playing={!reduce} />
      </motion.div>

      <motion.div
        initial={false}
        animate={
          mobile
            ? { y: 0, opacity: 1, rotate: -4, scale: 1 }
            : { y: 90, opacity: 0, rotate: 6, scale: 0.9 }
        }
        transition={transition}
        style={{ pointerEvents: "none" }}
        className="absolute right-[56px] top-[12px]"
      >
        <Phone />
      </motion.div>
    </div>
  );
}
