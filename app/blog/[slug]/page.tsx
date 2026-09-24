import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { ContactCta } from "@/components/blog/ContactCta";
import { PostBody } from "@/components/blog/mdx";
import { PostJsonLd } from "@/components/blog/PostJsonLd";
import { allPostSlugs, getPost, getRelatedPosts } from "@/lib/blog";

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

  const images = post.heroImage
    ? [{ url: post.heroImage, width: 1080, height: 1080, alt: post.heroImageAlt }]
    : undefined;

  return {
    title: `${post.title} — Integrate Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: "Integrate",
      locale: "en_GB",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      ...(images ? { images } : {}),
    },
    twitter: {
      card: post.heroImage ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      ...(post.heroImage ? { images: [post.heroImage] } : {}),
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);

  return (
    <article className="relative overflow-hidden pt-32 pb-28 md:pt-40 md:pb-36">
      <PostJsonLd post={post} />
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

          {/* Hero */}
          {post.heroImage && (
            <Reveal delay={0.14} className="mt-10">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-paper-2 hairline">
                <Image
                  src={post.heroImage}
                  alt={post.heroImageAlt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 768px) 44rem, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}

          {/* Body */}
          <Reveal delay={0.16} className="mt-4">
            <PostBody source={post.body} />
          </Reveal>

          {/* Closing CTA: always rendered, independent of the post body */}
          <ContactCta variant="closing" />

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

        {/* Related posts */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mx-auto mt-24 max-w-6xl">
            <h2 id="related-heading" className="eyebrow flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Keep reading
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
