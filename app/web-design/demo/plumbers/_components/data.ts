/** Postcode districts Northline covers, with a typical emergency arrival time in minutes. */
export const DISTRICTS: Record<string, [string, number]> = {
  LS1: ["Leeds city centre", 35],
  LS2: ["Leeds city centre", 35],
  LS3: ["Burley", 30],
  LS4: ["Burley", 25],
  LS5: ["Kirkstall", 20],
  LS6: ["Headingley", 25],
  LS7: ["Chapel Allerton", 35],
  LS8: ["Roundhay", 40],
  LS9: ["Harehills", 40],
  LS10: ["Hunslet", 40],
  LS11: ["Beeston", 40],
  LS12: ["Armley", 30],
  LS13: ["Bramley", 30],
  LS14: ["Seacroft", 45],
  LS15: ["Cross Gates", 50],
  LS16: ["Adel", 35],
  LS17: ["Moortown", 40],
  LS18: ["Horsforth", 30],
  LS19: ["Yeadon", 40],
  LS20: ["Guiseley", 45],
  LS21: ["Otley", 55],
  LS22: ["Wetherby", 65],
  LS23: ["Boston Spa", 70],
  LS25: ["Garforth", 55],
  LS26: ["Rothwell", 50],
  LS27: ["Morley", 45],
  LS28: ["Pudsey", 35],
  LS29: ["Ilkley", 70],
  WF1: ["Wakefield", 65],
  WF2: ["Wakefield", 65],
  WF3: ["Tingley", 50],
  BD10: ["Idle", 50],
  BD18: ["Shipley", 55],
};

export function lookupPostcode(raw: string) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!clean) return { kind: "empty" as const };
  // A full postcode always ends digit + two letters, so strip that to get the district.
  const outward = /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(clean) ? clean.slice(0, -3) : clean;
  const m = outward.match(/^([A-Z]{1,2}\d{1,2})/);
  if (!m) return { kind: "invalid" as const };
  const hit = DISTRICTS[m[1]] ? m[1] : null;
  if (!hit) return { kind: "outside" as const, district: m[1] };
  const [area, mins] = DISTRICTS[hit];
  return { kind: "covered" as const, district: hit, area, mins };
}

export function formatMins(mins: number) {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const r = mins % 60;
  return r ? `${h} hr ${r} min` : `${h} hr`;
}
