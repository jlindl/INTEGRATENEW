/**
 * Runs the quality gate over existing posts, e.g. after hand-editing one.
 *
 *   npm run seo:check                         every post in content/blog
 *   npm run seo:check -- path/to/post.mdx     specific files (also works for dry-run output)
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { config } from "./config";
import { loadLocations } from "./lib/data";
import { runGate, type GateTopic } from "./lib/gate";
import { loadExistingPosts, validPaths } from "./lib/site";

async function main() {
  const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const targets = files.length
    ? files
    : fs.existsSync(config.paths.blog)
      ? fs.readdirSync(config.paths.blog).filter((f) => f.endsWith(".mdx")).map((f) => path.join(config.paths.blog, f))
      : [];
  if (targets.length === 0) {
    console.log("No posts to check.");
    return;
  }

  const all = loadExistingPosts();
  // Posts checked together (e.g. one dry run's output) may link to each other.
  const checkedSlugs = targets.map((f) => ({ slug: path.basename(f, ".mdx") }));
  const locations = loadLocations();
  let failed = 0;

  for (const file of targets) {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    const slug = String(data.slug ?? path.basename(file, ".mdx"));
    const others = all.filter((p) => p.slug !== slug);
    const place = locations.find((l) => l.name === data.location);
    const topic: GateTopic =
      data.type === "location"
        ? { type: "location", location: { name: String(data.location ?? ""), nearby: place?.nearby ?? [] } }
        : { type: "service" };

    const result = await runGate(
      {
        title: String(data.title ?? ""),
        slug,
        metaDescription: String(data.description ?? ""),
        excerpt: String(data.excerpt ?? ""),
        targetKeyword: String(data.targetKeyword ?? ""),
        body: content,
      },
      topic,
      {
        existing: others,
        takenSlugs: new Set(others.map((p) => p.slug)),
        validPaths: validPaths([...all, ...checkedSlugs]),
      },
    );

    const s = result.stats;
    console.log(
      `${result.pass ? "PASS" : "FAIL"}  ${path.relative(config.paths.root, file)}  ` +
        `(${s.words} words, meta ${s.metaLength}, ${s.internalLinks.length} internal links, ` +
        `${s.faqQuestions} FAQs, max similarity ${s.maxBodySimilarity ? s.maxBodySimilarity.score.toFixed(2) : "n/a"})`,
    );
    for (const f of result.failures) console.log(`  - ${f}`);
    if (!result.pass) failed++;
  }
  process.exit(failed ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
