"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DeviceStage, { type Mode } from "@/components/web-design-portal/device-stage";
import { GlobeIcon, LayersIcon, PhoneIcon } from "@/components/web-design-portal/icons";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

const AUTOPLAY_MS = 5000;

const CAPABILITIES: {
  id: Mode;
  label: string;
  blurb: string;
  tags: string[];
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}[] = [
  {
    id: "sites",
    label: "Websites",
    blurb:
      "A design built around how your business actually sells. Works properly on phones, loads quickly, and your team can update it without a developer.",
    tags: ["Custom design", "Editable content", "SEO-ready"],
    Icon: GlobeIcon,
  },
  {
    id: "webapps",
    label: "Portals & Systems",
    blurb:
      "Secure logins, dashboards, documents and payments, with bookings, CRMs, stock and automations wired together into one place.",
    tags: ["Client portals", "Bookings & CRM", "Payments"],
    Icon: LayersIcon,
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    blurb:
      "Native iOS & Android or installable web apps for ordering, loyalty, booking and live tracking.",
    tags: ["iOS & Android", "Ordering & loyalty", "Live tracking"],
    Icon: PhoneIcon,
  },
];

export default function BuildShowcase() {
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  // Arrival: the device tips up off the page and settles as the stage scrolls
  // from the bottom edge of the screen to its centre.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "center center"],
  });
  const enterRotate = useTransform(scrollYProgress, [0, 1], [34, 0]);
  const enterScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const enterY = useTransform(scrollYProgress, [0, 1], [70, 0]);

  // Then it follows the pointer: -1..1 across the stage on each axis, sprung
  // so the device swings rather than snaps.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltY = useSpring(useTransform(pointerX, [-1, 1], [-13, 13]), {
    stiffness: 150,
    damping: 18,
  });
  const tiltX = useSpring(useTransform(pointerY, [-1, 1], [10, -10]), {
    stiffness: 150,
    damping: 18,
  });

  const onStageMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const onStageLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const paused = engaged || offscreen;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % CAPABILITIES.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const active = CAPABILITIES[index];

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={() => setEngaged(false)}
      className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16"
    >
      {/* Scale and stage height are paired in `.device-stage` — see globals.css. */}
      <div
        ref={stageRef}
        onPointerMove={onStageMove}
        onPointerLeave={onStageLeave}
        className="device-stage relative flex items-center justify-center [perspective:1300px] lg:order-2"
      >
        <div
          aria-hidden
          className="halo-breathe pointer-events-none absolute h-[300px] w-[min(620px,90vw)] rounded-full bg-[radial-gradient(closest-side,rgba(160,43,255,0.42),transparent_74%)] blur-2xl"
        />
        <motion.div
          // preserve-3d keeps the pointer tilt below in the same 3D space as
          // this arrival tilt, instead of flattening it into this plane.
          className="[transform-style:preserve-3d]"
          style={
            reduce
              ? undefined
              : { rotateX: enterRotate, scale: enterScale, y: enterY }
          }
        >
          <motion.div
            style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY }}
          >
            <div className="device-scale">
              <DeviceStage mode={active.id} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ul className="flex flex-col gap-2 lg:order-1">
        {CAPABILITIES.map((capability, i) => {
          const isActive = i === index;
          const { Icon } = capability;

          return (
            <li key={capability.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={isActive}
                className={`relative flex w-full gap-4 rounded-2xl border p-5 text-left transition-all duration-300 lg:p-6 ${
                  isActive
                    ? "border-neon-400/40 bg-white/[0.05]"
                    : "border-white/8 bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.035]"
                }`}
              >
                {/* Rail: fills across one autoplay tick on the active item. */}
                <span
                  aria-hidden
                  className="absolute inset-y-5 left-0 w-[3px] overflow-hidden rounded-full bg-white/10"
                >
                  {isActive && (
                    <span
                      key={index}
                      data-paused={paused}
                      className="autoplay-bar block h-full w-full rounded-full bg-neon-500 shadow-[0_0_14px_2px_rgba(160,43,255,0.85)]"
                      style={
                        {
                          "--autoplay-duration": `${AUTOPLAY_MS}ms`,
                        } as React.CSSProperties
                      }
                    />
                  )}
                </span>

                <span
                  className={`ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                    isActive
                      ? "border-neon-400/45 bg-neon-500/15 text-neon-200"
                      : "border-white/10 bg-abyss-raised text-white/55"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[1.1875rem] font-medium tracking-[-0.02em] transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {capability.label}
                  </span>

                  <span
                    className={`mt-1.5 block text-[15px] leading-[1.5] transition-colors duration-300 ${
                      isActive ? "text-white/60" : "text-white/40"
                    }`}
                  >
                    {capability.blurb}
                  </span>

                  <span className="mt-3.5 flex flex-wrap gap-1.5">
                    {capability.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-2.5 py-1 text-[12px] transition-colors duration-300 ${
                          isActive
                            ? "border-neon-400/30 bg-neon-500/10 text-neon-200"
                            : "border-white/10 text-white/35"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
