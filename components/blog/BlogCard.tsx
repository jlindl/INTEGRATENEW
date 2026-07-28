/**
 * BlogCard — one post in the blog index grid. Editorial, image-free (procedural
 * hairline treatment in keeping with the rest of the site). Static server
 * component; entrance animation is handled by the index's RevealGroup.
 */
import Link from "next/link";
import type { Post } from "@/lib/blogData";

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl bg-card p-7 hairline shadow-lift transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-float md:p-8"
    >
      <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-3">
        <span className="text-accent">{post.category}</span>
        <span className="h-[3px] w-[3px] rounded-full bg-line-2" aria-hidden="true" />
        <span>{post.readMinutes} min read</span>
      </div>

      <h3 className="font-display-tuned mt-5 text-xl font-medium leading-snug text-ink md:text-2xl">
        {post.title}
      </h3>

      <p className="mt-3 max-w-[46ch] flex-1 leading-relaxed text-ink-2">
        {post.excerpt}
      </p>

      <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
        <span className="font-mono text-[0.72rem] text-ink-3">
          <time dateTime={post.date}>{post.dateLabel}</time>
        </span>
        <span className="flex items-center gap-1.5 text-[0.85rem] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
          Read
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
