import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

/**
 * Blog index — an editorial header, a featured post, then a grid of the rest.
 * Driven entirely by the MDX files in content/blog (see lib/blog.ts).
 */
export default function BlogIndex() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : [];

  return (
    <section className="relative overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative">
        {/* Header */}
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            The Integrate Blog
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display-tuned mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.05] text-ink">
              Practical notes on winning work{" "}
              <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
                and wasting less time.
              </span>
            </h1>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-7 max-w-[54ch] text-lg leading-relaxed text-ink-2">
            How businesses get found, turn enquiries into booked work, and hand
            the repetitive admin to AI. Written plainly, for the people running
            the business.
          </Reveal>
        </div>

        {!featured && (
          <Reveal as="p" delay={0.1} className="mt-16 max-w-[54ch] text-lg leading-relaxed text-ink-2 md:mt-20">
            The first articles are on their way. In the meantime,{" "}
            <Link href="/contact" className="font-medium text-ink underline decoration-accent/60 underline-offset-4 hover:text-accent">
              get in touch
            </Link>{" "}
            and tell us what you&apos;re working on.
          </Reveal>
        )}

        {/* Featured post */}
        {featured && (
          <Reveal delay={0.1} className="mt-16 md:mt-20">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl bg-card hairline shadow-lift transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:shadow-float lg:grid-cols-2"
            >
              {/* Hero image when the post has one, else the procedural "cover" (metallic wash + hairline geometry) */}
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                {featured.heroImage ? (
                  <Image
                    src={featured.heroImage}
                    alt={featured.heroImageAlt ?? ""}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.02]"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,var(--color-paper-3),var(--color-paper-2)_44%,var(--color-card)_66%,var(--color-line))]" />
                    <div
                      className="absolute inset-0 opacity-80"
                      style={{
                        background:
                          "conic-gradient(from 210deg at 72% 10%, transparent 0deg, rgb(255 255 255 / 0.8) 28deg, transparent 76deg)",
                      }}
                      aria-hidden="true"
                    />
                  </>
                )}
                <span className="glass absolute left-5 top-5 rounded-full px-3.5 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ink-2">
                  Featured
                </span>
              </div>

              <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
                <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-3">
                  <span className="text-accent">{featured.category}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-line-2" aria-hidden="true" />
                  <span>{featured.readMinutes} min read</span>
                </div>
                <h2 className="font-display-tuned text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-[1.08] text-ink">
                  {featured.title}
                </h2>
                <p className="max-w-[52ch] leading-relaxed text-ink-2">
                  {featured.excerpt}
                </p>
                <span className="mt-2 flex items-center gap-1.5 text-[0.9rem] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
                  Read article
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* The rest */}
        <RevealGroup className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.09}>
          {rest.map((post) => (
            <RevealItem as="div" key={post.slug} className="h-full">
              <BlogCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
