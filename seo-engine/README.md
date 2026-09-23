# SEO engine

Writes two blog posts a day for integrate-tech.co.uk:
- one about a place, for example "roofing leads in Chorley"
- one about a service, for example "Meta ads for heating engineers"

Each post also gets a LinkedIn caption for Integrate's company page, which links to the post and to the contact form. Every post and caption goes through code-based checks before it's saved, and every one links to `/contact`.

> Status: generation, the quality gate and LinkedIn captions work. Posting to LinkedIn and the scheduled GitHub Actions jobs come next, and this README will grow with them.

## How a post is made

1. **Pick a topic.** [lib/topics.ts](lib/topics.ts) picks one location topic and one service topic from [data/](data/). It skips topics already in the ledger and topics that overlap an existing post's title.
2. **Generate.** [lib/claude.ts](lib/claude.ts) asks Claude (`claude-sonnet-5`) for structured JSON: title, slug, meta description, excerpt, target keyword and MDX body. The prompt ([lib/prompts.ts](lib/prompts.ts)) carries:
   - the brand context
   - the hard rules
   - the local notes for the place
   - the list of pages that exist, so links can only point at real pages
3. **Check.** [lib/gate.ts](lib/gate.ts) rejects the post if any of these fail:
   - word count out of range (location posts 900 to 1,400, service posts 1,200 to 1,800)
   - a body cut off mid-sentence
   - an em dash anywhere, or a spaced hyphen or double hyphen used as a dash
   - a banned phrase, including unverified claims like "our clients" or "we've seen"
   - title over 70 characters, or meta description not 140 to 160 characters
   - target keyword missing from the title, first paragraph, a `##` heading or the meta description
   - no in-body link to `/contact`
   - fewer than 2 other internal links, or any link to a page that doesn't exist
   - any external link
   - duplicate slug or title, or a title too close to an existing one
   - body too similar to an existing post (word 5-gram Jaccard above 0.3)
   - FAQ section missing, or not 3 to 5 questions
   - location posts only: the town named fewer than 3 times, or fewer than 2 nearby towns named
   - anything that isn't plain markdown (HTML, code, curly braces, import/export), or MDX that doesn't compile
4. **Retry once.** If the gate fails, the model gets the list of failures and writes the post again. If it fails a second time:
   - the post is skipped for the day
   - it's recorded as `failed` in the ledger
   - a GitHub issue is opened

   A topic that fails twice is retired. A problem with the API itself stops the run without recording anything (bad key, no credit, outage); it doesn't count against the topic.
5. **LinkedIn caption.** A second Claude call ([lib/linkedin.ts](lib/linkedin.ts)) writes the caption. The model marks where two links go, and code inserts them, both with UTM tags (`utm_source=linkedin&utm_medium=social&utm_campaign=seo-engine&utm_content=<slug>`):
   - `[ARTICLE]` becomes the post itself, e.g. `https://integrate-tech.co.uk/blog/<slug>?utm_...`. It goes early, so LinkedIn builds its preview card from the post.
   - `[CONTACT]` becomes the contact form, e.g. `https://integrate-tech.co.uk/contact?utm_...`. It goes near the end.

   The caption then goes through these checks:
   - the same dash and banned-phrase checks as posts
   - 150 to 250 words
   - a first-line hook of at most 150 characters
   - 3 to 5 hashtags
   - both links present exactly once, in that order, and placed cleanly

   It gets one retry. If it still fails, the blog post is published anyway, the caption is marked `failed` so nothing goes to LinkedIn, and an issue says how to retry.
6. **Save.**
   - The post goes to `content/blog/<slug>.mdx`.
   - The caption and its LinkedIn status go to `seo-engine/linkedin/<slug>.json`, kept apart from the post, so recording a LinkedIn post never changes the blog or rebuilds the site.
   - The topic is added to [data/ledger.json](data/ledger.json).

Posts have no generated images. The blog shows its standard drawn cover for them.

All settings are in [config.ts](config.ts), including the model, word ranges, thresholds, banned phrases, LinkedIn caption rules and retry count.

## Running it locally

Put your Anthropic API key in `.env.local` at the project root. Git ignores that file, and the engine reads it automatically:

```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

| Command | What it does |
|---|---|
| `npm run seo:generate -- --plan` | Shows which topics would be picked today. No API call, no cost. |
| `npm run seo:generate -- --dry-run` | Generates both posts and captions into a temp folder and prints where. Doesn't touch the ledger, the blog or GitHub. |
| `npm run seo:generate` | Generates today's posts into `content/blog/` and updates the ledger. |
| `npm run seo:generate -- --only location` | Only the location post. Use `--only service` for the other one. |
| `npm run seo:generate -- --location chorley --audience roofers --angle leads` | One location post on a topic you choose. Angles: `leads`, `marketing`, `website`. |
| `npm run seo:generate -- --service meta-ads --audience plumbers` | One service post on a topic you choose. |
| `npm run seo:check` | Runs the quality gate over every post in `content/blog/`. You can pass file paths instead, including dry-run output. |
| `npm run seo:caption -- <slug>` | Rewrites the LinkedIn caption for an existing post. Refuses if the post is already on LinkedIn. Add `--dry-run` to write to a temp folder. |

Every run prints:
- the topics picked
- the gate result for each attempt
- tokens used and an approximate cost

It also saves a summary to `seo-engine/logs/generate-<date>.json`, which is git-ignored. The summary includes any rejected drafts, so you can see why they failed.

A normal day of two posts and two captions costs roughly $0.20 to $0.25. Re-running on the same day is safe: a post type already generated that day is skipped.

## Adding places and services

- **Places:** add an entry to [data/locations.json](data/locations.json) with:
  - `id`, `name` and `county`
  - `tier` (1 is used first)
  - a list of `nearby` towns (location posts must mention at least two)
  - `notes`, which the model treats as trusted local context. Keep them to general, checkable facts such as geography, housing, transport and character. Don't put statistics in them.
- **Services:** add to `services` in [data/services.json](data/services.json). `keyword` is the suggested search phrase, where `{audience}` becomes, for example, "roofers". `summary` tells the model what Integrate actually does.
- **Audiences:** add to `audiences`. Set `kind` to `trade` for tradespeople (picked first) or `local-business` for others. `jobs` gives the model concrete examples.
- **Combinations to skip:** add `"service-id:audience-id"` to `excludePairs`.

Order of picking:
- Every tier 1 place gets 3 posts before tier 2 starts, then tier 3, and then the cycle repeats. The round size is `topics.locationRoundSize` in the config.
- Within a round, the least-used place and audience go first.
- Ties are broken by the date, so re-running on the same day picks the same topics.

## Review mode

`PUBLISH_MODE` controls what the scheduled job does with new posts. It's set up with the GitHub Actions jobs:

- `pr` (default): opens a pull request with the day's posts and captions for you to review and merge.
- `auto`: commits straight to `main`.

## Secrets

| Secret | Used for |
|---|---|
| `ANTHROPIC_API_KEY` | Writing posts and captions |
| LinkedIn posting credentials | Posting captions to the company page. Added in the next phase. |
| `SITE_URL` | Absolute links. Optional; defaults to `https://integrate-tech.co.uk`. |
