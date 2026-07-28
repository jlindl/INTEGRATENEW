/**
 * NichePager — prev/next navigation between niche detail pages, with a central
 * "All work" link back to the grid. Neighbours wrap, driven by the data order.
 */
import Link from "next/link";
import { adjacentNiches, type Niche } from "@/lib/webDesignData";

function PagerLink({ niche, dir }: { niche: Niche; dir: "prev" | "next" }) {
  const next = dir === "next";
  return (
    <Link
      href={`/web-design/${niche.slug}`}
      className={`group flex flex-1 flex-col gap-1 ${next ? "items-end text-right" : "items-start"}`}
    >
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mist-2">
        {next ? "Next" : "Previous"}
      </span>
      <span className="flex items-center gap-2 text-lg font-medium text-ivory transition-colors group-hover:text-halo">
        {!next && <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>}
        {niche.forLabel}
        {next && <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>}
      </span>
    </Link>
  );
}

export function NichePager({ slug }: { slug: string }) {
  const adj = adjacentNiches(slug);
  if (!adj) return null;

  return (
    <nav
      aria-label="Between projects"
      className="container-x flex items-center gap-6 border-t border-graphite py-10 sm:gap-10"
    >
      <PagerLink niche={adj.prev} dir="prev" />
      <Link
        href="/web-design#work"
        className="hidden shrink-0 items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist-2 transition-colors hover:text-ivory sm:flex"
      >
        All work
      </Link>
      <PagerLink niche={adj.next} dir="next" />
    </nav>
  );
}
