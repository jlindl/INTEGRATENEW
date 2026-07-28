/**
 * IntroReveal — the signature load moment: a near-black curtain where the
 * brand mark blooms into focus and an iris hairline draws beneath it, then the
 * curtain lifts (≈1.35s total) to reveal the page as its atmosphere switches
 * on. Everything is keyframed in CSS (globals: `wd-intro-*`), so it starts on
 * first paint, needs no hydration, and finishes even with JS disabled.
 *
 * The inline script runs before first paint and skips the whole sequence after
 * the first view in a session, so refreshes and deep links inside the room
 * don't replay it. Reduced motion hides it entirely via a media query.
 */
import { LogoMark } from "@/components/ui/LogoMark";

const SKIP_SCRIPT = `(function(){try{var e=document.getElementById("wd-intro");if(!e)return;if(sessionStorage.getItem("wd-intro-seen")){e.setAttribute("data-skip","")}else{sessionStorage.setItem("wd-intro-seen","1")}}catch(t){}})()`;

export function IntroReveal() {
  return (
    <>
      <div id="wd-intro" aria-hidden="true">
        <div className="wd-intro-panel">
          <div className="wd-intro-lockup">
            <LogoMark tone="light" className="wd-intro-mark h-12 w-12" />
            <span className="wd-intro-line" />
            <p className="wd-intro-tag">Integrate · Web Design</p>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} />
    </>
  );
}
