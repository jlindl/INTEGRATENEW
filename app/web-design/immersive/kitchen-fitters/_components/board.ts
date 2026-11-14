/**
 * Marlowe's finishes, and "the board": the spec the visitor has put together
 * so far (from the scroll scene, the swatches and the measure-up helper).
 *
 * The board is a tiny module-level store so the final form can show what is
 * on it without any component re-rendering while the page scrolls.
 */

export type Option = {
  /** Suffix of the material class that draws it: mk-mat--<id>. */
  id: string;
  name: string;
  short: string;
  /** How it reads on the spec sheet. */
  spec: string;
  code: string;
};

export const DOORS: Option[] = [
  { id: "sage", name: "Sage", short: "Sage", spec: "Sage green, satin", code: "D-01" },
  { id: "navy", name: "Inky navy", short: "Navy", spec: "Inky navy, satin", code: "D-02" },
  { id: "oak", name: "Natural oak", short: "Oak", spec: "Natural oak, oiled", code: "D-03" },
];

export const WORKTOPS: Option[] = [
  { id: "quartz", name: "White quartz", short: "Quartz", spec: "White quartz, 20 mm", code: "W-01" },
  { id: "block", name: "Oak block", short: "Oak block", spec: "Oak block, 40 mm", code: "W-02" },
  { id: "concrete", name: "Concrete grey", short: "Concrete", spec: "Concrete grey, 30 mm", code: "W-03" },
];

export const HANDLES: Option[] = [
  { id: "cup", name: "Brass cup", short: "Cup", spec: "Brass cup and knob", code: "H-01" },
  { id: "bar", name: "Black bar", short: "Bar", spec: "Black bar, 160 mm", code: "H-02" },
  { id: "none", name: "Handleless", short: "None", spec: "Handleless rail", code: "H-03" },
];

/** The plinth follows the doors. */
export const PLINTHS = ["Sage, to match", "Navy, to match", "Oak, to match"];

export type Board = {
  doors: number;
  worktop: number;
  handles: number;
  /** One line from the measure-up helper, e.g. "L-shape, medium, nothing staying". */
  room: string;
};

let state: Board = { doors: 0, worktop: 0, handles: 0, room: "L-shape, medium, nothing staying" };
const listeners = new Set<() => void>();

export const board = {
  get: (): Board => state,
  set(patch: Partial<Board>) {
    const next = { ...state, ...patch };
    if (
      next.doors === state.doors &&
      next.worktop === state.worktop &&
      next.handles === state.handles &&
      next.room === state.room
    )
      return;
    state = next;
    listeners.forEach((fn) => fn());
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
