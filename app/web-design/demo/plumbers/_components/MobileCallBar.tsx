import { PhoneIcon } from "./icons";
import { focusRing, PHONE_DISPLAY, PHONE_HREF } from "./theme";

/**
 * Mobile one-tap call pill. Sits bottom-LEFT so the bottom-right corner stays
 * free for the studio's DemoCredit pill. Plain link, works without JS.
 */
export function MobileCallBar() {
  return (
    <a
      href={PHONE_HREF}
      aria-label={`Call Northline on ${PHONE_DISPLAY}`}
      className={`${focusRing} fixed bottom-4 left-4 z-40 flex h-[46px] items-center gap-2.5 rounded-full bg-[#1ed3b0] pl-1.5 pr-4 text-[0.95rem] font-bold text-[#0b1a28] shadow-[0_14px_30px_-10px_rgba(11,26,40,0.55)] ring-1 ring-[#0b1a28]/10 sm:hidden`}
    >
      <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#0b1a28] text-[#1ed3b0]">
        <PhoneIcon className="h-4 w-4" />
      </span>
      Call
    </a>
  );
}
