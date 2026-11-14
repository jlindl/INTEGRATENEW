"use client";

/**
 * "Specify it": the signature scene.
 *
 * A kitchen elevation drawn in CSS. Scrolling the pinned stage walks through
 * nine finishes in three chapters (doors, worktop, handles); the drawing reads
 * them from --p in kitchen-fitters.css. The swatch buttons set a row directly,
 * and a row the visitor has set stops following the scroll.
 *
 * Nothing here re-renders on scroll: the scrub callback and the buttons both
 * write straight to the DOM (attributes and text), as the kit asks.
 */
import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { useScrub } from "@/components/web-design/immersive/useScrub";
import { Arrow, Tick } from "./bits";
import { board, DOORS, HANDLES, PLINTHS, WORKTOPS, type Option } from "./board";

type RowKey = "doors" | "worktop" | "handles";
type Triple = [number, number, number];
type Picked = [number | null, number | null, number | null];

const ROWS: { key: RowKey; label: string; options: Option[] }[] = [
  { key: "doors", label: "Doors", options: DOORS },
  { key: "worktop", label: "Worktop", options: WORKTOPS },
  { key: "handles", label: "Handles", options: HANDLES },
];

const REVS = "ABCDEFGHJKLMNPRSTUVWXYZ";

/* ------------------------------------------------------------------ */
/*  The drawing                                                        */
/* ------------------------------------------------------------------ */

/** Cup (or knob) and bar share one spot; the stylesheet cross-fades them. */
function Pulls() {
  return (
    <span className="mk-hdl">
      <i className="mk-hdl-cup" />
      <i className="mk-hdl-bar" />
    </span>
  );
}

function Door({ col, wall = false, side }: { col: number; wall?: boolean; side: "l" | "r" }) {
  return (
    <div
      className={`mk-front mk-front--door mk-front--${wall ? "wall" : "base"} mk-front--${side}`}
      style={{ gridColumn: col, gridRow: wall ? 1 : 4 }}
    >
      <i className="mk-rail" />
      <Pulls />
    </div>
  );
}

function Stack({ col }: { col: number }) {
  return (
    <div className="mk-stack" style={{ gridColumn: col, gridRow: 4 }}>
      {["slab", "deep", "deep"].map((kind, i) => (
        <div key={i} className={`mk-front mk-front--drawer mk-front--${kind}`}>
          <i className="mk-rail" />
          <Pulls />
        </div>
      ))}
    </div>
  );
}

function Elevation() {
  return (
    <div className="mk-elev" aria-hidden="true">
      <span className="mk-dim mk-dim--top">
        <b>3,600</b>
      </span>
      <span className="mk-dim mk-dim--side">
        <b>2,150</b>
      </span>

      <div className="mk-run">
        {/* wall units, open shelves, hood */}
        <Door col={1} wall side="r" />
        <div className="mk-shelf">
          <i className="mk-plank mk-plank--hi" />
          <span className="mk-things mk-things--hi">
            <i className="mk-ob mk-ob--jar" />
            <i className="mk-ob mk-ob--jar" />
            <i className="mk-ob mk-ob--jar" />
            <i className="mk-ob mk-ob--jug" />
          </span>
          <i className="mk-plank mk-plank--lo" />
          <span className="mk-things mk-things--lo">
            <i className="mk-ob mk-ob--bowls" />
            <i className="mk-ob mk-ob--books" />
            <i className="mk-ob mk-ob--plant" />
          </span>
        </div>
        <div className="mk-front mk-front--hood" />
        <Door col={5} wall side="r" />
        <Door col={6} wall side="l" />

        {/* splashback, and what stands on the worktop */}
        <div className="mk-splash">
          <span className="mk-tap">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <i className="mk-hob" />
          <span className="mk-kettle">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="mk-mug">
            <i />
            <i />
            <i />
          </span>
          <span className="mk-boards">
            <i />
            <i />
          </span>
        </div>

        <div className="mk-top">
          <i className="mk-top-block" />
          <i className="mk-top-conc" />
        </div>

        {/* base units */}
        <Stack col={1} />
        <Door col={2} side="r" />
        <Door col={3} side="l" />
        <div className="mk-oven">
          <i className="mk-oven-ctl" />
          <i className="mk-oven-bar" />
          <i className="mk-oven-glass" />
        </div>
        <Stack col={5} />
        <Door col={6} side="l" />
        <div className="mk-plinth" />
      </div>

      <i className="mk-floor" />

      <span className="mk-pin mk-pin--1">1</span>
      <span className="mk-pin mk-pin--2">2</span>
      <span className="mk-pin mk-pin--3">3</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The scene                                                          */
/* ------------------------------------------------------------------ */

export function Specifier() {
  const kit = useRef<HTMLDivElement>(null);
  /** Where the scroll has got to, per row. */
  const scrolled = useRef<Triple>([0, 0, 0]);
  /** What the visitor has set by hand, per row (null: follow the scroll). */
  const picked = useRef<Picked>([null, null, null]);
  const lastKey = useRef("000");
  const rev = useRef(0);
  const timer = useRef(0);

  /** Write the current spec to the drawing, the buttons and the sheet. */
  const sync = useCallback((animate: boolean) => {
    const el = kit.current;
    if (!el) return;
    const eff = ROWS.map((_, r) => picked.current[r] ?? scrolled.current[r]) as Triple;
    const key = eff.join("");
    if (key !== lastKey.current) {
      lastKey.current = key;
      rev.current += 1;
    }

    if (animate) {
      /* A tap cross-fades; the scroll does its own blending from --p. */
      el.setAttribute("data-anim", "");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => el.removeAttribute("data-anim"), 800);
    }

    ROWS.forEach((row, r) => {
      const mine = picked.current[r];
      if (mine === null) el.removeAttribute(`data-${row.key}`);
      else el.setAttribute(`data-${row.key}`, String(mine));

      el.querySelectorAll<HTMLElement>(`[data-row="${row.key}"]`).forEach((button) => {
        button.setAttribute("aria-pressed", String(Number(button.dataset.i) === eff[r]));
      });

      const option = row.options[eff[r]];
      const out = el.querySelector<HTMLElement>(`[data-out="${row.key}"]`);
      if (out) out.textContent = option.spec;
      const chip = el.querySelector<HTMLElement>(`[data-chip="${row.key}"]`);
      if (chip) chip.className = `mk-chip mk-mat--${option.id}`;
    });

    const plinth = el.querySelector<HTMLElement>('[data-out="plinth"]');
    if (plinth) plinth.textContent = PLINTHS[eff[0]];
    const revOut = el.querySelector<HTMLElement>('[data-out="rev"]');
    if (revOut) revOut.textContent = REVS[rev.current % REVS.length];
    const untouched = picked.current.every((p) => p === null);
    el.querySelectorAll<HTMLElement>('[data-out="reset"]').forEach((button) => {
      button.hidden = untouched;
    });

    board.set({ doors: eff[0], worktop: eff[1], handles: eff[2] });
  }, []);

  /* Nine finishes across the pin: three per chapter. */
  useScrub(kit, (p) => {
    const slot = Math.min(8, Math.floor(p * 9));
    const next: Triple = [
      Math.min(slot, 2),
      Math.min(Math.max(slot - 3, 0), 2),
      Math.min(Math.max(slot - 6, 0), 2),
    ];
    const was = scrolled.current;
    if (next[0] === was[0] && next[1] === was[1] && next[2] === was[2]) return;
    scrolled.current = next;
    sync(false);
  });

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (row: number, index: number) => {
    picked.current[row] = index;
    sync(true);
  };
  const reset = () => {
    picked.current = [null, null, null];
    sync(true);
  };

  return (
    <div className="mk-kit" ref={kit}>
      <header className="mk-kit-head">
        <p className="mk-mono mk-kicker">
          <span className="mk-kicker-mark" aria-hidden="true" />
          Scroll or tap
        </p>
        <h2 className="mk-h2">
          Specify <em>it.</em>
        </h2>
        {/* Phones, while the scene is pinned: the sheet's own reset is folded away. */}
        <button type="button" className="mk-reset mk-reset--head" data-out="reset" hidden onClick={reset}>
          Reset to scroll
        </button>
        <p className="mk-kit-lead">
          Keep scrolling and the finishes change. Or tap a sample and set it yourself. Whatever is on the board comes
          with you to the design visit.
        </p>
      </header>

      <div className="mk-board">
        <p className="mk-board-cap mk-mono" aria-hidden="true">
          <span>Elevation A · run 3,600 mm</span>
          <span>Scale 1:20</span>
        </p>
        <Elevation />
        <div className="mk-prog" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
      </div>

      <div className="mk-rows">
        {ROWS.map((row, r) => (
          <div key={row.key} className="mk-row" data-ch={r} role="group" aria-label={row.label}>
            <p className="mk-row-label">
              <b>0{r + 1}</b>
              <span>{row.label}</span>
            </p>
            {row.options.map((option, i) => (
              <button
                key={option.id}
                type="button"
                className="mk-sw"
                data-row={row.key}
                data-i={i}
                aria-pressed={i === 0}
                aria-label={`${row.label}: ${option.name}`}
                onClick={() => pick(r, i)}
              >
                <i className={`mk-sw-chip mk-mat--${option.id}`} />
                <span className="mk-sw-name">
                  <span className="mk-sw-s">{option.short}</span>
                  <span className="mk-sw-l">{option.name}</span>
                </span>
                <span className="mk-sw-code">{option.code}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <aside className="mk-sheet" aria-label="Specification sheet">
        <div className="mk-sheet-head">
          <p className="mk-sheet-title">Specification</p>
          <p className="mk-mono">
            Sheet 01 · Rev <span data-out="rev">A</span>
          </p>
        </div>
        <dl className="mk-sheet-rows">
          {ROWS.map((row, r) => (
            <div key={row.key} className="mk-sheet-row" data-ch={r}>
              <dt>{row.label}</dt>
              <dd>
                <i className={`mk-chip mk-mat--${row.options[0].id}`} data-chip={row.key} />
                <span data-out={row.key}>{row.options[0].spec}</span>
                <span className="mk-tick">
                  <Tick />
                </span>
              </dd>
            </div>
          ))}
          <div className="mk-sheet-row" data-ch="0">
            <dt>Plinth</dt>
            <dd>
              <span data-out="plinth">{PLINTHS[0]}</span>
              <span className="mk-tick">
                <Tick />
              </span>
            </dd>
          </div>
          <div className="mk-sheet-row mk-sheet-row--fixed" data-ch="x">
            <dt>Carcass</dt>
            <dd>
              <span>18 mm, solid backs</span>
              <span className="mk-tick">
                <Tick />
              </span>
            </dd>
          </div>
          <div className="mk-sheet-row mk-sheet-row--fixed" data-ch="x">
            <dt>Run</dt>
            <dd>
              <span>3,600 mm, six units</span>
              <span className="mk-tick">
                <Tick />
              </span>
            </dd>
          </div>
        </dl>
        <div className="mk-sheet-foot">
          <p className="mk-sheet-note">
            <span>Tap any sample to change it.</span>
            <button type="button" className="mk-reset" data-out="reset" hidden onClick={reset}>
              Reset
            </button>
          </p>
          <a href="#visit" className="mk-btn mk-btn--brass mk-btn--full">
            Book a visit with this spec
            <Arrow />
          </a>
        </div>
      </aside>
    </div>
  );
}
