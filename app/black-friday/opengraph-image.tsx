import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/ui/LogoMark";
import { PRICE_MONTHLY, TOTAL_SPOTS, WAS_PRICE, offerState } from "@/lib/blackFriday";

/**
 * Share card for /black-friday, in the look of the Black Friday ad creative:
 * warm paper, ink type and a dark price block. Rendered per request so that
 * after the deadline (or once every spot has gone) it stops showing the price.
 */
export const alt = "Integrate Black Friday offer: a new website, full SEO and 30 stories a month.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default function OgImage() {
  const state = offerState(Date.now());
  const live = state === "live";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: "#f7f5f0",
          color: "#1b1a16",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <LogoMark size={46} solid="#1b1a16" />
            <span style={{ fontSize: 32, fontWeight: 600, letterSpacing: -1 }}>Integrate</span>
          </div>
          <span style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#74705f" }}>Black Friday</span>
        </div>

        {live ? (
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48 }}>
            <div style={{ display: "flex", fontSize: 70, fontWeight: 700, lineHeight: 1.0, letterSpacing: -3, maxWidth: 640 }}>
              A new website, full SEO and 30 stories a month.
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px 34px",
                borderRadius: 26,
                background: "#0a0a0c",
                color: "#f2f1ec",
                minWidth: 330,
              }}
            >
              {WAS_PRICE ? (
                <span style={{ fontSize: 20, color: "#9a9ba3" }}>
                  Usually <span style={{ marginLeft: 8, textDecoration: "line-through" }}>{WAS_PRICE}</span>
                </span>
              ) : null}
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 84, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>£{PRICE_MONTHLY}</span>
                <span style={{ fontSize: 26, color: "#9a9ba3" }}>/month</span>
              </div>
              <span style={{ fontSize: 22, marginTop: 14 }}>No contract. Cancel anytime.</span>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.0, letterSpacing: -3, maxWidth: 900 }}>
            {state === "sold-out" ? `All ${TOTAL_SPOTS} spots have gone.` : "Our Black Friday offer has ended."}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 24, borderTop: "1px solid #dedacd" }}>
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#1b1a16" }} />
          <span style={{ fontSize: 20, color: "#565349" }}>
            {live ? "Free website demo before you pay anything · integrate-tech.co.uk" : "Book a free call · integrate-tech.co.uk"}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
