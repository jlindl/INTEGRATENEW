"use client";

/**
 * AmbientBackdrop — the hub's whole-page atmosphere system, three layers deep:
 *
 *   far    aurora field: three purple-toned blooms drifting on slow CSS
 *          transforms (`wd-drift-*` in globals), fixed to the viewport so the
 *          page feels lit everywhere, not just at the top
 *   mid    faint engineering linework (`wd-linework`), the layer between the
 *          light and the content
 *   near   a vignette / light-falloff wash above the content, so the page
 *          reads as a lit room rather than uniform black
 *
 * Far and mid parallax against scroll at different rates (transform-only, no
 * springs), which gives the page physical z-depth: background, mid-ground and
 * content each move at their own speed. The whole field fades in once per page
 * load (`wd-atmo-in`), timed to the intro curtain. Reduced motion → everything
 * static, still fully lit.
 */
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function AmbientBackdrop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  /* Three movement rates → depth. Content scrolls at 1×; these trail it. */
  const auroraY = useTransform(scrollY, [0, 2400], [0, -120]);
  const gridY = useTransform(scrollY, [0, 2400], [0, -280]);

  return (
    <>
      <div
        aria-hidden="true"
        className="wd-atmo-in pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Far layer — aurora blooms. Oversized so parallax never shows edges. */}
        <motion.div
          className="absolute -inset-[12%]"
          style={reduce ? undefined : { y: auroraY }}
        >
          <div
            className="wd-ambient-a absolute left-[2%] top-[-14%] h-[70vh] w-[58vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15), transparent 62%)",
            }}
          />
          <div
            className="wd-ambient-b absolute right-[-4%] top-[10%] h-[56vh] w-[46vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(124,92,196,0.12), transparent 60%)",
            }}
          />
          <div
            className="wd-ambient-c absolute bottom-[-26%] left-[20%] h-[62vh] w-[60vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(88,52,168,0.12), transparent 64%)",
            }}
          />
        </motion.div>

        {/* Mid layer — faint linework grid, a touch faster than the aurora. */}
        <motion.div
          className="wd-linework absolute -inset-[10%]"
          style={reduce ? undefined : { y: gridY }}
        />
      </div>

      {/* Near layer — vignette over everything, whisper-quiet at the center. */}
      <div
        aria-hidden="true"
        className="wd-vignette pointer-events-none fixed inset-0 z-[54]"
      />
    </>
  );
}
