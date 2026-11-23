import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/ui/LogoMark";

/**
 * Share card for /review-plates. Light paper like the page itself, with the
 * dark plate (same drawing as components/tap/ui Plate) as the one bold object.
 * Satori only takes ttf/otf/woff fonts and ours are woff2, so the type is the
 * default sans, as on the site-wide card.
 */
export const alt = "Integrate Tap NFC review plates. Google reviews, one tap away.";
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
          position: "relative",
          padding: "64px 72px",
          background: "#f7f5f0",
          color: "#1b1a16",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -160,
            width: 820,
            height: 820,
            background: "radial-gradient(circle at 50% 50%, rgba(120,124,132,0.16), rgba(120,124,132,0) 62%)",
          }}
        />

        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 610 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <LogoMark size={46} solid="#1b1a16" />
            <span style={{ fontSize: 32, fontWeight: 600, letterSpacing: -1 }}>Integrate</span>
            <span
              style={{
                marginLeft: 4,
                padding: "4px 14px",
                borderRadius: 999,
                border: "1px solid #dedacd",
                background: "#fdfcfa",
                fontSize: 22,
                color: "#565349",
              }}
            >
              Tap
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 78, fontWeight: 600, lineHeight: 1.04, letterSpacing: -2.5 }}>
              Google reviews, one tap away.
            </div>
            <div style={{ fontSize: 28, color: "#565349", lineHeight: 1.4 }}>
              NFC review plates for UK businesses. No app, set up in a minute.
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 26, borderTop: "1px solid #dedacd" }}>
            <div style={{ width: 9, height: 9, borderRadius: 9, background: "#6b6f77" }} />
            <span style={{ fontSize: 20, color: "#74705f" }}>integrate-tech.co.uk/review-plates</span>
          </div>
        </div>

        {/* The plate */}
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 400,
              height: 250,
              padding: 34,
              borderRadius: 38,
              background: "#1b1a16",
              transform: "rotate(-6deg)",
              boxShadow: "0 30px 80px rgba(27,26,22,0.28), 0 8px 24px rgba(27,26,22,0.18)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#c8ccd2" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6.5 8.5a5 5 0 0 1 0 7" />
                <path d="M10 6a8.5 8.5 0 0 1 0 12" />
                <path d="M13.5 3.5a12 12 0 0 1 0 17" />
              </svg>
              <LogoMark size={38} solid="#f2f1ec" />
            </div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 600, color: "#c9ced7" }}>Hold your phone here</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
