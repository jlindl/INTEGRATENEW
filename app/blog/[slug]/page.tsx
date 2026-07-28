import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { allPostSlugs, getPost, type PostBlock } from "@/lib/blogData";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found — Integrate Blog" };
  return {
    title: `${post.title} — Integrate Blog`,
    description: post.excerpt,
  };
}

/* Render one content block with the right typographic treatment. */
function Block({ block }: { block: PostBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="font-display-tuned mt-14 text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-tight text-ink">
        {block.text}
      </h2>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="my-10 border-l-2 border-accent pl-6">
        <p className="font-display-tuned text-[clamp(1.3rem,2.4vw,1.7rem)] font-medium italic leading-snug text-ink">
          {block.text}
        </p>
      </blockquote>
    );
  }
  return <p className="mt-6 text-lg leading-relaxed text-ink-2">{block.text}</p>;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="relative overflow-hidden pt-32 pb-28 md:pt-40 md:pb-36">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative">
        <div className="mx-auto max-w-[44rem]">
          {/* Breadcrumb */}
          <Reveal className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-3">
            <Link href="/blog" className="transition-colors hover:text-ink">
              All posts
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-accent">{post.category}</span>
          </Reveal>

          {/* Title + meta */}
          <Reveal as="h1" delay={0.05}>
            <span className="mt-6 block font-display-tuned text-[clamp(2.1rem,5vw,3.6rem)] font-medium leading-[1.06] text-ink">
              {post.title}
            </span>
          </Reveal>

          <Reveal delay={0.12} className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-8 font-mono text-[0.75rem] text-ink-3">
            <span>{post.author}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-line-2" aria-hidden="true" />
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span className="h-[3px] w-[3px] rounded-full bg-line-2" aria-hidden="true" />
            <span>{post.readMinutes} min read</span>
          </Reveal>

          {/* Body */}
          <Reveal delay={0.16} className="mt-4">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </Reveal>

          {/* Closing CTA */}
          <div className="mt-16 rounded-3xl bg-paper-2 p-8 text-center md:p-12">
            <p className="font-display-tuned text-[clamp(1.5rem,3vw,2.1rem)] font-medium leading-tight text-ink">
              Have a process worth automating?
            </p>
            <p className="mx-auto mt-3 max-w-[44ch] leading-relaxed text-ink-2">
              Book a free audit call and we&apos;ll show you exactly what we can
              streamline.
            </p>
            <div className="mt-7 flex justify-center">
              <MagneticButton href="/#book-call" variant="primary">
                Book a strategy call
              </MagneticButton>
            </div>
          </div>

          {/* Back */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink-3 transition-colors hover:text-ink"
            >
              <span aria-hidden="true">←</span> Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
