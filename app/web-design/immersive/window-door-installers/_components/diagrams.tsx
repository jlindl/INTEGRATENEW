/**
 * Clearline's small line diagrams for the "Measured. Made. Fitted." section.
 * Plain SVG, no state: they are drawn in the page's own stylesheet colours.
 */

/** A window opening measured in three places and checked for square. */
export function DiagramMeasure() {
  return (
    <svg viewBox="0 0 320 200" className="cw-dg" role="presentation">
      <rect x="92" y="24" width="132" height="124" className="cw-dg-frame" />
      <path d="M92 48H224M92 86H224M92 124H224" className="cw-dg-dash" />
      <path d="M92 24 224 148" className="cw-dg-sun cw-dg-dash" />
      <circle cx="92" cy="24" r="3.5" className="cw-dg-sunfill" />
      <circle cx="224" cy="148" r="3.5" className="cw-dg-sunfill" />
      {/* width, below */}
      <path d="M92 170H224M92 163v14M224 163v14" className="cw-dg-line" />
      <text x="158" y="191" textAnchor="middle" className="cw-dg-text cw-dg-text--hi">
        1198 mm
      </text>
      {/* height, right */}
      <path d="M248 24V148M241 24h14M241 148h14" className="cw-dg-line" />
      <text x="266" y="86" textAnchor="middle" transform="rotate(90 266 86)" className="cw-dg-text cw-dg-text--hi">
        1048 mm
      </text>
      {/* three widths */}
      <path d="M66 48H86M66 86H86M66 124H86" className="cw-dg-soft" />
      <text x="62" y="51" textAnchor="end" className="cw-dg-text">
        Top
      </text>
      <text x="62" y="89" textAnchor="end" className="cw-dg-text">
        Middle
      </text>
      <text x="62" y="127" textAnchor="end" className="cw-dg-text">
        Bottom
      </text>
    </svg>
  );
}

/** A mitred frame corner with the sealed glass unit sat in its rebate. */
export function DiagramMade() {
  return (
    <svg viewBox="0 0 320 200" className="cw-dg" role="presentation">
      <path d="M44 34H320V72H82V200H44Z" className="cw-dg-solid" />
      <path d="M56 46H320M56 46V200M68 58H320M68 58V200" className="cw-dg-soft" />
      <path d="M44 34 82 72" className="cw-dg-sun" />
      <rect x="94" y="84" width="240" height="130" className="cw-dg-glass" />
      <path d="M94 200V84H320" className="cw-dg-lawn" />
      <path d="M252 194 302 130M278 194 314 148" className="cw-dg-glint" />
      {/* labels */}
      <path d="M63 53V18H98" className="cw-dg-soft" />
      <circle cx="63" cy="53" r="3" className="cw-dg-sunfill" />
      <text x="104" y="21" className="cw-dg-text">
        Mitred, welded corner
      </text>
      <text x="196" y="126" textAnchor="middle" className="cw-dg-text">
        Sealed glass unit
      </text>
      <path d="M94 168H120" className="cw-dg-soft" />
      <circle cx="94" cy="168" r="3" className="cw-dg-lawnfill" />
      <text x="126" y="171" className="cw-dg-text">
        Gasket
      </text>
    </svg>
  );
}

/** A new frame packed level in the brickwork and sealed all round. */
export function DiagramFit() {
  return (
    <svg viewBox="0 0 320 200" className="cw-dg" role="presentation">
      <defs>
        <pattern id="cw-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V9" className="cw-dg-hatch" />
        </pattern>
      </defs>
      <path d="M0 14H88V160H232V14H320V200H0Z" fill="url(#cw-hatch)" className="cw-dg-wall" />
      <rect x="98" y="24" width="124" height="126" className="cw-dg-frame cw-dg-frame--thick" />
      <rect x="110" y="36" width="100" height="102" className="cw-dg-glass" />
      {/* sealant bead down both reveals */}
      <path d="M93 18V155M227 18V155" className="cw-dg-sun cw-dg-dash" />
      {/* packers under the frame */}
      <rect x="106" y="151" width="16" height="8" className="cw-dg-sunfill" />
      <rect x="198" y="151" width="16" height="8" className="cw-dg-sunfill" />
      {/* spirit level on the bottom rail */}
      <rect x="122" y="118" width="76" height="13" rx="3" className="cw-dg-line" />
      <rect x="151" y="121.5" width="18" height="6" rx="3" className="cw-dg-line" />
      <circle cx="160" cy="124.5" r="2.2" className="cw-dg-lawnfill" />
      <text x="160" y="84" textAnchor="middle" className="cw-dg-text">
        Dead level
      </text>
      <rect x="78" y="171" width="164" height="18" className="cw-dg-plate" />
      <text x="160" y="183.5" textAnchor="middle" className="cw-dg-text cw-dg-text--hi">
        Packed, fixed, sealed
      </text>
    </svg>
  );
}
