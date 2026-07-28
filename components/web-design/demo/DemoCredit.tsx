import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

/**
 * DemoCredit — the "back to the studio" button every /web-design/demo/* site
 * carries. A fixed bottom-right glass pill, dark by design so it reads on any
 * demo brand (light or dark), with a back arrow, the Integrate mark, and a
 * clear label. It doubles as the "this is a showcase, not a real business"
 * signal and the way back to the portfolio.
 *
 * Demos must keep the bottom-right corner clear of fixed UI so this never
 * collides with their own chrome.
 */
export function DemoCredit() {
  return (
    <Link
      href="/web-design"
      aria-label="Back to Integrate Web Design — this is a representative demo. View the portfolio."
      className="group fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-full border border-white/15 bg-[#0d0f14]/90 py-2 pl-3 pr-4 shadow-[0_12px_34px_-12px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-white/5 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#b25dff]/60 hover:shadow-[0_16px_40px_-12px_rgba(160,43,255,0.45)]"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="h-3.5 w-3.5 text-white/60 transition-[transform,color] duration-300 group-hover:-translate-x-0.5 group-hover:text-[#c98fff]"
      >
        <path d="M13 8H3.5M7 4.2 3.2 8 7 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <LogoMark tone="light" className="h-4 w-4" />
      <span className="text-[0.72rem] font-medium tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white">
        Back to <span className="text-white">Integrate Web Design</span>
      </span>
    </Link>
  );
}
