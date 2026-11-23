/**
 * Page-scoped keyframes and the CSS-only fault triage switcher.
 * Every animation is opt-in via `motion-safe:` (or the media query below),
 * and every animation ends in the fully visible state, so nothing is
 * hidden if JS never runs.
 */
const css = `
@keyframes ve-ping { 75%, 100% { transform: scale(2.4); opacity: 0; } }
@keyframes ve-rise { from { transform: translateY(105%); } to { transform: translateY(0); } }
@keyframes ve-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes ve-flicker {
  0%, 9% { opacity: .08; } 10% { opacity: 1; } 12% { opacity: .15; } 15% { opacity: 1; }
  18% { opacity: .4; } 22%, 100% { opacity: 1; }
}
@keyframes ve-kenburns { from { transform: scale(1.12); } to { transform: scale(1.02); } }
@keyframes ve-arc {
  0%, 100% { opacity: 0; } 4% { opacity: 1; } 8% { opacity: .2; } 10% { opacity: .9; } 16% { opacity: 0; }
}
@keyframes ve-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.ve-grain::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .14; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.9'/></svg>");
}

/* Fault triage: radios drive the visible panel, no JS required. */
.ve-triage [data-fault] { display: none; }
.ve-triage:has(#vf-dark:checked) [data-fault="dark"],
.ve-triage:has(#vf-trip:checked) [data-fault="trip"],
.ve-triage:has(#vf-burn:checked) [data-fault="burn"],
.ve-triage:has(#vf-circuit:checked) [data-fault="circuit"],
.ve-triage:has(#vf-spark:checked) [data-fault="spark"] { display: grid; }
@supports not selector(:has(*)) { .ve-triage [data-fault] { display: grid; } }

@media (prefers-reduced-motion: no-preference) {
  .ve-triage [data-fault] { animation: ve-fade .45s cubic-bezier(.2,.7,.2,1) both; }
}
`;

export function Styles() {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
