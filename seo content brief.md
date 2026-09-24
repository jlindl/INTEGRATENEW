# Integrate SEO Engine: Build Brief

You are working in the repo for Integrate's website (live at https://integrate-tech.co.uk, Vercel project `integratenew`, deploys from this repo). Build an automated SEO content and social distribution engine inside this repo, following the phases below. Read this whole brief before starting.

## Goal

Every day, automatically:

1. Publish 2 blog posts to the site: one focused on a UK location, one focused on a service or trade niche.
2. Condense each post into platform-specific social captions.
3. Generate an image prompt from each post and render the image.
4. Post to Integrate's LinkedIn company page, Facebook Page and Instagram via an aggregator API.
5. Every blog post and every social post must link to the site's contact page.

It runs on GitHub Actions on a schedule. No server, no dashboard.

## About Integrate (for content generation)

- Integrate is a UK agency serving trades and local businesses, starting with Lancashire and the North West, expanding UK-wide.
- Core offer is lead generation for trades: Meta ads, into a lead form, into an AI WhatsApp agent that qualifies the lead (budget, location, job type, timing) and books it into the tradesperson's calendar. A second AI agent can be added to the client's website.
- Also offers premium websites for trades and AI automation.
- Audience: tradespeople and small local business owners (roofers, plumbers, heating engineers, joiners, electricians, builders, landscapers, glaziers, etc.). Write for them, plainly and practically.
- Brand voice: restrained, confident, editorial. No hype, no fluff.
- UK English spelling throughout.

## Hard rules for all generated content

- Never use em dashes (the long dash character). Use commas, colons, full stops or brackets instead. The quality gate must reject any post or caption containing one.
- Never invent statistics, client names, testimonials, case study results or quotes. General, verifiable facts only. If a number isn't verifiable, don't use it.
- No banned filler phrases (maintain a list in config), e.g. "in today's fast-paced world", "delve", "game-changer", "unlock", "elevate", "look no further", "navigating the landscape".
- Location posts must be genuinely specific to that place (local towns, housing stock, typical trade demand, geography). A post that would still make sense with the town name swapped out fails.

## Phase 0: Inspect and report (do this first, then stop)

Before writing any code, inspect the repo and report back to Jack:

- Next.js version and router (App or Pages)
- How existing blog articles are stored and rendered (MDX files, markdown, a data file, a CMS, etc.), the folder, the frontmatter/fields used, and the components involved
- How many existing articles there are and their slugs
- The exact contact page path
- Whether article pages have metadata, Open Graph images, JSON-LD schema, and whether a sitemap exists and includes the blog
- Package manager and any existing scripts or GitHub workflows

Then propose how new posts will be stored so they match the existing format exactly and existing articles keep working. **Wait for Jack to confirm before continuing.**

## Phase 1: Blog foundations

Bring the blog up to what the engine needs, without breaking existing posts:

- Posts stored as files in the repo in the existing format (MDX preferred if it's already MDX), with frontmatter including: title, slug, description, date, type (`location` or `service`), targetKeyword, location or service reference, heroImage, heroImageAlt, and a `social` block for recording publish status and post IDs.
- Static generation for post pages.
- A CTA component rendered automatically at the end of every post (and optionally mid-post) linking to the contact page. This is the guaranteed link, independent of what the model writes.
- `BlogPosting` JSON-LD on every post, plus `LocalBusiness`/`Service` context where appropriate. Location posts should reference the area served.
- Blog posts included in the sitemap automatically.
- Hero image used as the Open Graph image.
- A "related posts" section for internal linking.

## Phase 2: Topic engine and article generation

Create a `seo-engine/` directory (or `scripts/seo-engine/`, match repo conventions) in TypeScript.

**Topic data (committed to the repo):**

- `locations.json`: each entry has name, county, nearby towns, and a short notes field of local context. Start with Lancashire and Greater Manchester towns (Preston, Chorley, Leyland, Blackburn, Burnley, Bolton, Wigan, St Helens, Warrington, Lancaster, Blackpool, Southport, Bury, Rochdale, Oldham, etc.), then wider North West, then UK cities.
- `services.json`: trade by service combinations, e.g. "lead generation for roofers", "AI WhatsApp lead qualification for plumbers", "websites for joiners", "Meta ads for heating engineers".
- `ledger.json`: records every topic used (date, type, topic, slug, target keyword) so nothing repeats. Topic picking must also avoid near-duplicates of existing article slugs and titles.

**Daily picks:** one location post (a location paired with a trade angle, e.g. "Getting more roofing leads in Chorley") and one service post (a deep dive on one niche).

**Generation:** use the Anthropic SDK with the current Claude Sonnet model (check the Anthropic docs for the current model string). Request structured JSON output: title, slug, metaDescription (140 to 160 chars), excerpt, targetKeyword, body (MDX), heroImageAlt. Pass in: the brand and offer context above, the hard rules, the topic, local context from `locations.json`, and a list of existing posts (title + slug) so the model can add genuine internal links.

**Content requirements:**

- Location posts: 900 to 1,400 words. Service posts: 1,200 to 1,800 words.
- Target keyword in title, first paragraph, one H2 and meta description.
- At least one contextual in-body link to the contact page.
- At least two internal links to existing posts or service pages.
- Clear H2/H3 structure, a short FAQ section at the end (3 to 5 questions).

**Quality gate (code, not the model's judgement):** reject a post if any of these fail:

- Word count out of range
- No in-body link to the contact page
- Fewer than two internal links, or any internal link that doesn't resolve to a real page
- Contains an em dash
- Contains a banned phrase
- Title or slug duplicates an existing post
- Too similar to an existing post (e.g. word shingle Jaccard similarity above a threshold, configurable)
- Meta description length out of range

On failure, retry once with the failure reasons fed back to the model. If it fails again, skip that post for the day and log why (open a GitHub issue).

## Phase 3: Social captions and images

**Captions** (one Claude call per post, structured output), each linking to the contact page with UTM parameters, e.g. `https://integrate-tech.co.uk/contact?utm_source=linkedin&utm_medium=social&utm_campaign=seo-engine&utm_content=<slug>`:

- LinkedIn: 150 to 250 words, professional, a hook first line, the contact link, 3 to 5 hashtags.
- Facebook: 60 to 150 words, conversational, the contact link.
- Instagram: 100 to 150 words, the contact URL written out in text plus "link in bio" (Instagram captions aren't clickable), 8 to 15 relevant hashtags.

Captions go through the same em dash and banned phrase checks.

**Image:** Claude writes an image prompt from the post (photographic, realistic, UK setting, trade context, no text in the image, no logos, no identifiable real people). Render it via an image generation API behind an `ImageProvider` interface so it can be swapped. Default to OpenAI's image API (check docs for the current model). Generate 1080x1080 for socials and use it as the post hero/OG image. Commit images to the repo (e.g. `public/blog/<slug>.webp`, compressed) so they're served from the site's domain, which also gives the aggregator a public URL.

## Phase 4: Publishing via aggregator

Use **Ayrshare** as the aggregator, wrapped behind a `Publisher` interface so it could be swapped for Postiz later. One API call per post with caption per platform, image URL, and platforms: LinkedIn (company page), Facebook, Instagram. Jack will create the Ayrshare account and connect the accounts; tell him exactly what to set up.

- Only post to socials after the blog post is live: poll the live post URL until it returns 200 (timeout ~15 minutes, then fail and log).
- Record returned post IDs and status per platform in the post's `social` frontmatter block (or a state file). Never double-post: if a platform is already marked posted, skip it.
- Stagger posting: e.g. location post socials mid-morning, service post socials early afternoon (UK time).

## Phase 5: Scheduling, review mode and ops

**GitHub Actions:**

- `seo-generate.yml`: daily cron (early morning UK time; note GitHub cron is UTC, account for BST/GMT). Generates both posts, images and captions.
- `seo-publish.yml`: runs after new posts land on `main`, waits for the deploy, then posts to socials. Also runnable manually (`workflow_dispatch`) to retry failed posts.
- Make sure write-back commits (status/post IDs) don't trigger infinite loops or unnecessary Vercel builds. Use path filters and/or Vercel's ignored build step as appropriate, and explain the approach.

**Review mode:** env var `PUBLISH_MODE`:

- `pr` (default to start): the generate job opens a pull request with both posts, images and captions shown in the PR description. Socials only fire after Jack merges.
- `auto`: commits straight to `main`.

**Local commands:** `seo:generate` with a `--dry-run` flag (writes to a temp folder, no commit, no posting), `seo:publish` with `--dry-run`, and a way to generate a single post for a given topic.

**Secrets (GitHub Actions):** `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `AYRSHARE_API_KEY`, `SITE_URL`. Document them in a README.

**Logging:** each run logs topics picked, gate results, token usage and approximate cost. Failures open a GitHub issue.

## Working method

- Work phase by phase. After each phase, summarise what was built and what Jack needs to do (accounts, secrets), then wait for confirmation before the next phase.
- Keep all engine config (banned phrases, word ranges, thresholds, schedule, platforms) in one config file.
- Write a `seo-engine/README.md` covering setup, secrets, how to run locally, how to add locations and services, and how to switch from `pr` to `auto` mode.
- Don't touch unrelated parts of the site.