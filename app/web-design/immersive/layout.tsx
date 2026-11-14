import type { Metadata } from "next";
import { ImmersiveCredit } from "@/components/web-design/immersive/ImmersiveCredit";
import { ImmersiveDirector } from "@/components/web-design/immersive/ImmersiveDirector";
import "./immersive.css";

/**
 * /web-design/immersive/<trade>: ten scroll-driven homepage demos, one per
 * trade, each for a made-up business. They are linked from the "Immersive
 * homepages" section of /web-design and listed in lib/immersiveDemos.ts.
 *
 * This layout gives every demo the shared scroll engine and the "Demo by
 * Integrate" label, and keeps them all out of search. Each demo's own
 * page.tsx brings its fonts, its stylesheet and its content.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ImmersiveLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="imm" data-imm-root>
      {children}
      <ImmersiveCredit />
      <ImmersiveDirector />
    </div>
  );
}
