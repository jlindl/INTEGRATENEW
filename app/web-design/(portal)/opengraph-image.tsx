import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/ui/LogoMark";

/**
 * The share-card for /web-design — generated at build so the link preview
 * carries the same dark, purple-lit atmosphere as the page itself. Uses the
 * shared LogoMark (explicit size + literal colour, since satori has no CSS
 * variable pipeline).
 */
export const alt =
  "Integrate Web Design. Bespoke, industry-specific web design.";
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
        {/* Aurora blooms — the page's atmosphere, frozen for the card */}
        <div
          style={{
            position: "absolute",
            left: -140,
            top: -220,
            width: 640,
            height: 520,
            background:
              "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.28), rgba(168,85,247,0) 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -260,
            width: 700,
            height: 560,
            background:
              "radial-gradient(circle at 50% 50%, rgba(88,52,168,0.30), rgba(88,52,168,0) 66%)",
          }}
        />

        {/* Lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LogoMark tone="light" size={52} solid="#f2f1ec" />
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>
              Integrate
            </span>
            <span
              style={{
                fontSize: 17,
                letterSpacing: 5,
                color: "#767c88",
                textTransform: "uppercase",
              }}
            >
              Web Design
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: -2.5,
            }}
          >
            Websites, built by industry.
          </div>
          <div style={{ fontSize: 27, color: "#9a9ba3", lineHeight: 1.4 }}>
            Bespoke web design, tuned to how each market actually buys.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingTop: 28,
            borderTop: "1px solid #23232a",
          }}
        >
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: 9,
              background: "#a855f7",
            }}
          />
          <span style={{ fontSize: 19, color: "#9a9ba3" }}>
            Electricians · Plumbers · Recruiters · Accountants · and yours
          </span>
        </div>
      </div>
    ),
    size,
  );
}
