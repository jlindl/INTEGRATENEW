import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

/**
 * The label every immersive demo carries: a small fixed pill, bottom left,
 * saying plainly that this is a demo by Integrate (the business is made up)
 * and taking the visitor back to the web design page.
 *
 * Demos keep the bottom-left corner clear for it. A demo with its own fixed
 * bar along the bottom of a phone sets `--imm-bar` (the bar's height) on its
 * root so the pill sits above it.
 */
export function ImmersiveCredit() {
  return (
    <Link
      href="/web-design#immersive"
      className="imm-credit"
      aria-label="This is a demo site by Integrate Web Design; the business is fictional. Back to all demos."
    >
      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true" className="imm-credit-arrow">
        <path d="M13 8H3.5M7 4.2 3.2 8 7 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <BrandLogo variant="mark" tone="light" height={15} alt="" />
      <span className="imm-credit-text">
        Demo{" "}
        <span className="imm-credit-by">
          by <b>Integrate</b>
        </span>
      </span>
    </Link>
  );
}
