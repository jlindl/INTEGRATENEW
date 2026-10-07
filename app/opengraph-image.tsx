import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/ui/LogoMark";

/**
 * Default share card for every page that does not set its own (home, contact,
 * book, testimonials, legal...). Same dark, purple-lit look as /web-design.
 */
export const alt = "Integrate. AI automation, lead generation and web design.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "64px 72px",
          background: "#0a0a0c",
          color: "#f2f1ec",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -140,
            top: -220,
            width: 640,
            height: 520,
            background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.28), rgba(168,85,247,0) 65%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LogoMark tone="light" size={52} solid="#f2f1ec" />
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>Integrate</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 960 }}>
          <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2.5 }}>
            AI that books the work, so you can do it.
          </div>
          <div style={{ fontSize: 27, color: "#9a9ba3", lineHeight: 1.4 }}>
            Automation, lead generation and web design for UK businesses.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingTop: 28,
            borderTop: "1px solid #23232a",
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#a855f7" }} />
          <span style={{ fontSize: 19, color: "#9a9ba3" }}>integrate-tech.co.uk</span>
        </div>
      </div>
    ),
    size,
  );
}
