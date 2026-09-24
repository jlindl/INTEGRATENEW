/**
 * Blog content loader. Every post is an MDX file in content/blog/<slug>.mdx
 * with YAML frontmatter; the index, the /blog/[slug] template, the sitemap and
 * the SEO engine all read from here. Server-only (uses the filesystem), so
 * client components should import the `Post` type, not these functions.
 *
 * Frontmatter is validated at build time: a malformed post fails the build
 * rather than shipping a broken page.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostType = "location" | "service";

export type Post = {
  slug: string;
  title: string;
  /** Meta description (140 to 160 chars for engine-written posts). */
  description: string;
  /** Short summary shown on cards and the featured slot. */
  excerpt: string;
  /** Machine date (YYYY-MM-DD) for <time datetime> and JSON-LD. */
  date: string;
  /** Human label shown on the page, e.g. "24 June 2026". */
  dateLabel: string;
  updated?: string;
  type: PostType;
  /** Eyebrow label on cards and the breadcrumb. */
  category: string;
  targetKeyword: string;
  /** Town or city name for location posts (matches locations.json). */
  location?: string;
  /** County / region for location posts. */
  region?: string;
  /** Service reference for service posts (matches services.json). */
  service?: string;
  /** Trade angle, e.g. "roofers". Used for related posts. */
  trade?: string;
  /** Root-relative path, e.g. /blog/<slug>.webp. Doubles as the OG image. */
  heroImage?: string;
  heroImageAlt?: string;
  author: string;
  featured?: boolean;
  readMinutes: number;
  /** Raw MDX body (frontmatter stripped). */
  body: string;
};

const WORDS_PER_MINUTE = 230;

function fail(file: string, msg: string): never {
  throw new Error(`[blog] ${file}: ${msg}`);
}

function str(data: Record<string, unknown>, key: string, file: string, required = true): string | undefined {
  const v = data[key];
  // YAML turns bare dates into Date objects; normalise back to YYYY-MM-DD.
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (v === undefined || v === null || v === "") {
    if (required) fail(file, `missing "${key}"`);
    return undefined;
  }
  if (typeof v !== "string") fail(file, `"${key}" must be a string`);
  return v;
}

function formatDateLabel(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function countWords(mdx: string): number {
  return mdx
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function parsePost(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const slug = str(data, "slug", file)!;
  if (`${slug}.mdx` !== file) fail(file, `slug "${slug}" must match the filename`);

  const date = str(data, "date", file)!;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(file, `"date" must be YYYY-MM-DD`);

  const type = str(data, "type", file) as PostType;
  if (type !== "location" && type !== "service") fail(file, `"type" must be "location" or "service"`);

  const heroImage = str(data, "heroImage", file, false);
  const heroImageAlt = str(data, "heroImageAlt", file, false);
  if (heroImage && !heroImageAlt) fail(file, `"heroImageAlt" is required when "heroImage" is set`);

  return {
    slug,
    title: str(data, "title", file)!,
    description: str(data, "description", file)!,
    excerpt: str(data, "excerpt", file)!,
    date,
    dateLabel: formatDateLabel(date),
    updated: str(data, "updated", file, false),
    type,
    category: str(data, "category", file, false) ?? (type === "location" ? "Local guides" : "Playbooks"),
    targetKeyword: str(data, "targetKeyword", file)!,
    location: str(data, "location", file, false),
    region: str(data, "region", file, false),
    service: str(data, "service", file, false),
    trade: str(data, "trade", file, false),
    heroImage,
    heroImageAlt,
    author: str(data, "author", file, false) ?? "Integrate",
    featured: data.featured === true,
    readMinutes: Math.max(1, Math.round(countWords(content) / WORDS_PER_MINUTE)),
    body: content,
  };
}

let cache: Post[] | null = null;

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))
    : [];
  cache = files
    .map(parsePost)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)));
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function allPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/**
 * Related posts for internal linking: same service, place or trade score
 * highest, then same post type, with recency breaking ties.
 */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const same = (a?: string, b?: string) => !!a && !!b && a.toLowerCase() === b.toLowerCase();
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        (same(p.service, post.service) ? 4 : 0) +
        (same(p.location, post.location) ? 3 : 0) +
        (same(p.region, post.region) ? 1 : 0) +
        (same(p.trade, post.trade) ? 2 : 0) +
        (p.type === post.type ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map(({ p }) => p);
}
