# SEO engine

Writes two blog posts a day for integrate-tech.co.uk: one about a place (for example "roofing leads in Chorley") and one about a service (for example "Meta ads for heating engineers"). Every post goes through a code-based quality gate before it's saved.

> Status: Phase 2 of the build brief. Article generation and the quality gate work. Images and social captions (Phase 3), social publishing (Phase 4) and the scheduled GitHub Actions jobs (Phase 5) come next, and this README will grow with them.

## How a post is made

1. **Pick a topic.** [lib/topics.ts](lib/topics.ts) picks one location topic and one service topic from [data/](data/). Topics already in the ledger are skipped, and so are topics that overlap an existing post's title.
2. **Generate.** [lib/claude.ts](lib/claude.ts) asks Claude (`claude-sonnet-5`) for structured JSON: title, slug, meta description, excerpt, target keyword, MDX body and hero image alt text. The prompt ([lib/prompts.ts](lib/prompts.ts)) carries the brand context, the hard rules, the local notes and the list of pages that exist, so links can only point at real pages.
3. **Check.** [lib/gate.ts](lib/gate.ts) rejects the post if any of these fail:
   - word count out of range (location 900 to 1,400, service 1,200 to 1,800)
   - an em dash anywhere, or a spaced hyphen or double hyphen used as a dash
   - a banned phrase
   - meta description not 140 to 160 characters
   - target keyword missing from the title, the first paragraph, a `##` heading or the meta description
   - no in-body link to `/contact`
   - fewer than 2 other internal links, or any link to a page that doesn't exist
   - any external link
   - duplicate slug or title, or a title too close to an existing one
   - body too similar to an existing post (word 5-gram Jaccard above 0.3)
   - FAQ section missing, or not 3 to 5 questions
   - location posts: the town named fewer than 3 times, or fewer than 2 nearby towns named
   - anything that isn't plain markdown (HTML, code, curly braces, import/export), or MDX that doesn't compile
4. **Retry once.** If the gate fails, the model gets the list of failures and writes the post again. If it fails a second time, the post is skipped for the day, recorded as `failed` in the ledger, and a GitHub issue is opened. A topic that fails twice is retired.
5. **Save.** The post is written to `content/blog/<slug>.mdx` in the site's frontmatter format, and the topic is added to [data/ledger.json](data/ledger.json).

All settings (model, word ranges, thresholds, banned phrases, retry count, publish mode) are in [config.ts](config.ts).

## Running it locally

You need an Anthropic API key:

```bash
export ANTHROPIC_API_KEY=sk-ant-...        # PowerShell: $env:ANTHROPIC_API_KEY="sk-ant-..."
```

| Command | What it does |
|---|---|
| `npm run seo:generate -- --plan` | Shows which topics would be picked today. No API call, no cost. |
| `npm run seo:generate -- --dry-run` | Generates both posts into a temp folder and prints where. Doesn't touch the ledger, the blog or GitHub. |
| `npm run seo:generate` | Generates today's posts into `content/blog/` and updates the ledger. |
| `npm run seo:generate -- --only location` | Only the location post (or `--only service`). |
| `npm run seo:generate -- --location chorley --audience roofers --angle leads` | One location post on a topic you choose. Angles: `leads`, `marketing`, `website`. |
| `npm run seo:generate -- --service meta-ads --audience plumbers` | One service post on a topic you choose. |
| `npm run seo:check` | Runs the quality gate over every post in `content/blog/`. You can pass file paths instead, including dry-run output. |

Every run prints the topics picked, the gate result for each attempt, tokens used and an approximate cost. It also saves a summary to `seo-engine/logs/generate-<date>.json`, which is git-ignored. At current Sonnet pricing, a post costs roughly $0.05 to $0.20, depending on retries.

Re-running on the same day is safe: a post type already generated that day is skipped.

## Adding places and services

- **Places:** add an entry to [data/locations.json](data/locations.json) with an `id`, `name`, `county`, `tier` (1 is used first), a list of `nearby` towns, and `notes`. The notes are given to the model as trusted local context, so keep them to general, checkable facts such as geography, housing, transport and character. Don't put statistics in them. Location posts must mention at least two of the `nearby` towns.
- **Services:** add to `services` in [data/services.json](data/services.json). `keyword` is the suggested search phrase, where `{audience}` becomes, for example, "roofers". `summary` tells the model what Integrate actually does.
- **Audiences:** add to `audiences`. Set `kind` to `trade` for tradespeople (picked first) or `local-business` for others. `jobs` gives the model concrete examples.
- **Combinations to skip:** add `"service-id:audience-id"` to `excludePairs`.

Order of picking:
- Every tier 1 place gets 3 posts before tier 2 starts, then tier 3, and then the cycle repeats. The round size is `topics.locationRoundSize` in the config.
- Within a round, the least-used place and audience go first.
- Ties are broken by the date, so re-running on the same day picks the same topics.

## Review mode

`PUBLISH_MODE` controls what the scheduled job does with new posts. It's set up in Phase 5:

- `pr` (default): opens a pull request with the day's posts for you to review and merge.
- `auto`: commits straight to `main`.

## Secrets

| Secret | Used for | Needed from |
|---|---|---|
| `ANTHROPIC_API_KEY` | Article and caption generation | Phase 2 |
| `OPENAI_API_KEY` | Image generation | Phase 3 |
| `AYRSHARE_API_KEY` | Posting to LinkedIn, Facebook and Instagram | Phase 4 |
| `SITE_URL` | Absolute links (defaults to `https://integrate-tech.co.uk`) | Optional |
