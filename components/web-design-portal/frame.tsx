/**
 * Thin measuring rules down the container edges with ticks at the corners —
 * the same rules run through every section so the page reads as one sheet.
 */
export default function Frame({
  ticks = "both",
}: {
  ticks?: "top" | "bottom" | "both" | "none";
}) {
  const tick =
    "absolute h-[9px] w-[9px] border-neon-200/35 [border-style:solid]";
  const showTop = ticks === "top" || ticks === "both";
  const showBottom = ticks === "bottom" || ticks === "both";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 mx-auto w-full max-w-[1420px] px-6 sm:px-10"
    >
      <div className="relative h-full w-full border-x border-white/[0.07]">
        {showTop && (
          <>
            <span
              className={`${tick} -left-[5px] top-2 border-b-0 border-r-0`}
            />
            <span
              className={`${tick} -right-[5px] top-2 border-b-0 border-l-0`}
            />
          </>
        )}
        {showBottom && (
          <>
            <span
              className={`${tick} -left-[5px] bottom-2 border-r-0 border-t-0`}
            />
            <span
              className={`${tick} -right-[5px] bottom-2 border-l-0 border-t-0`}
            />
          </>
        )}
      </div>
    </div>
  );
}
