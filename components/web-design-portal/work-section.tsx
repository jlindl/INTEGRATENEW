import Frame from "@/components/web-design-portal/frame";
import WorkRail from "@/components/web-design-portal/work-rail";

export default function WorkSection() {
  return (
    <section
      id="work"
      /* `overflow-clip`, not hidden — the rail inside is `position: sticky`,
         and a hidden-overflow ancestor would become its scroll container. */
      className="relative isolate overflow-clip border-t border-white/[0.06] bg-abyss"
    >
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      {/* Wash of colour that stays behind the rail for the whole scene. */}
      <div
        aria-hidden
        className="pointer-events-none sticky top-0 z-0 -mb-[100svh] h-svh bg-[radial-gradient(60%_46%_at_50%_54%,rgba(103,11,178,0.3),transparent_72%)]"
      />
      <Frame />

      <div className="relative z-20">
        <WorkRail />
      </div>
    </section>
  );
}
