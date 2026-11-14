/**
 * Hue & Cry's colour card. The names and codes are made up for the demo.
 * Shared by the page (server) and the interactive parts (client).
 */
export type Paint = {
  id: string;
  name: string;
  code: string;
  hex: string;
  /** Text colour that reads on the paint. */
  on: string;
  note: string;
  finish: string;
};

export const PAINTS: Paint[] = [
  {
    id: "plaster",
    name: "Morning Plaster",
    code: "HC 112",
    hex: "#e9c9b8",
    on: "#1d1b1a",
    note: "Warm and soft. Kind to north-facing rooms.",
    finish: "Flat matt",
  },
  {
    id: "hedge",
    name: "Back Hedge Green",
    code: "HC 318",
    hex: "#1f4a3d",
    on: "#f7f2ea",
    note: "Deep and calm. Makes white woodwork look sharp.",
    finish: "Flat matt",
  },
  {
    id: "table",
    name: "Kitchen Table Yellow",
    code: "HC 204",
    hex: "#e2a33b",
    on: "#1d1b1a",
    note: "Sunny without shouting. Good in kitchens and halls.",
    finish: "Flat matt",
  },
  {
    id: "door",
    name: "Front Door Blue",
    code: "HC 451",
    hex: "#2c4bd8",
    on: "#f7f2ea",
    note: "Bold. Best on one wall, or on the door itself.",
    finish: "Eggshell",
  },
  {
    id: "sheet",
    name: "Dust Sheet White",
    code: "HC 006",
    hex: "#f7f2ea",
    on: "#1d1b1a",
    note: "A soft white that does not glare. Ceilings and trim.",
    finish: "Flat matt",
  },
  {
    id: "soot",
    name: "Chimney Soot",
    code: "HC 590",
    hex: "#2b2725",
    on: "#f7f2ea",
    note: "Nearly black. Strong behind shelves and pictures.",
    finish: "Flat matt",
  },
];

/** The three colours the scroll rolls on, in order. */
export const COATS: Paint[] = PAINTS.slice(0, 3);
