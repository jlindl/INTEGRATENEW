# SEO engine

Writes two blog posts a day for integrate-tech.co.uk:
- one about a place, for example "roofing leads in Chorley"
- one about a service, for example "Meta ads for heating engineers"

Every post goes through code-based checks before it's saved, and every one links to `/contact`.

It runs itself on GitHub Actions. Each morning it writes the posts and adds them to a pull request for you to review. When you merge, the posts go live on the site.

> **LinkedIn is paused.** The engine can also write a LinkedIn caption for each post, and posting to the company page is planned. Both are switched off until LinkedIn grants API access. See [LinkedIn (paused)](#linkedin-paused).

**Contents:** [How a post is made](#how-a-post-is-made) · [The daily schedule](#the-daily-schedule-github-actions) · [Setup checklist](#setup-checklist) · [Running it locally](#running-it-locally) · [Adding places and services](#adding-places-and-services) · [LinkedIn (paused)](#linkedin-paused) · [Secrets](#secrets)

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
5. **Save.** The post goes to `content/blog/<slug>.mdx`, and the topic is added to [data/ledger.json](data/ledger.json).

Posts have no generated images. The blog shows its standard drawn cover for them.

All settings are in [config.ts](config.ts), including the model, word ranges, thresholds, banned phrases and retry count.

## The daily schedule (GitHub Actions)

[seo-generate.yml](../.github/workflows/seo-generate.yml) runs every day at 05:00 UTC. That's 06:00 UK in summer and 05:00 in winter, because GitHub cron only runs in UTC. You can also run it by hand from the Actions tab. What it does depends on `PUBLISH_MODE`:

- `pr` (the default): the day's posts and ledger update go on the branch `seo/pending-posts`, in one pull request titled "SEO engine: new blog posts to review".
  - The PR description lists every post with its keyword, word count and meta description. Vercel's preview deployment on the PR shows the posts as they'll look.
  - While the PR is open, each day's posts are added to it. That keeps the ledger continuous, so topics can't repeat even if you don't merge for a week.
  - To drop a post, delete its `.mdx` on the branch before merging. To change wording, edit the file there.
  - Once you merge (or close) the PR, the next run starts a fresh one.
- `auto`: posts are committed straight to `main` and go live on the next deploy.

**Failures open a GitHub issue** labelled `seo-engine`: a post that failed the gate twice, or a run that crashed. Each run's log is attached to the run as an artifact (`seo-generate-log`).

## Setup checklist

1. **Anthropic:** create an API key at console.anthropic.com and add credit under Billing.
2. **GitHub repository settings:**
   - **Secrets and variables → Actions → Secrets:** add `ANTHROPIC_API_KEY`. `SITE_URL` is optional and defaults to `https://integrate-tech.co.uk`.
   - **Secrets and variables → Actions → Variables:** optionally add `PUBLISH_MODE` = `pr` or `auto`. Unset means `pr`.
   - **Actions → General → Workflow permissions:** choose "Read and write permissions" and tick "Allow GitHub Actions to create and approve pull requests".
   - Optional: **General → Pull Requests →** "Automatically delete head branches".
3. **Merge the engine into `main`.** Scheduled and manual workflows only run from the default branch.
4. **Test by hand from the Actions tab:** run "SEO generate", review the PR it opens, and merge it.

**Switching from `pr` to `auto`:** set the `PUBLISH_MODE` variable to `auto`. Posts then go live every morning without review. Switch back any time.

## Running it locally

Put your Anthropic API key in `.env.local` at the project root. Git ignores that file, and the engine reads it automatically:

```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

| Command | What it does |
|---|---|
| `npm run seo:generate -- --plan` | Shows which topics would be picked today. No API call, no cost. |
| `npm run seo:generate -- --dry-run` | Generates both posts into a temp folder and prints where. Doesn't touch the ledger, the blog or GitHub. |
| `npm run seo:generate` | Generates today's posts into `content/blog/` and updates the ledger. |
| `npm run seo:generate -- --only location` | Only the location post. Use `--only service` for the other one. |
| `npm run seo:generate -- --location chorley --audience roofers --angle leads` | One location post on a topic you choose. Angles: `leads`, `marketing`, `website`. |
| `npm run seo:generate -- --service meta-ads --audience plumbers` | One service post on a topic you choose. |
| `npm run seo:check` | Runs the quality gate over every post in `content/blog/`. You can pass file paths instead, including dry-run output. |

Every run prints:
- the topics picked
- the gate result for each attempt
- tokens used and an approximate cost

It also saves a summary to `seo-engine/logs/generate-<date>.json`, which is git-ignored. The summary includes any rejected drafts, so you can see why they failed.

A normal day of two posts costs roughly $0.10 to $0.20 in Claude usage. Re-running on the same day is safe: a post type already generated that day is skipped.

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

## LinkedIn (paused)

The plan is to post each article to Integrate's LinkedIn company page directly through LinkedIn's own API, which is free. It's paused until LinkedIn grants access.

**What's already built and working (switched off):** [lib/linkedin.ts](lib/linkedin.ts) writes a LinkedIn caption for each post with Claude. Code checks it:
- 150 to 250 words
- a hook of at most 150 characters
- 3 to 5 hashtags
- no dashes or banned phrases
- two UTM-tagged links, the article first and the contact form near the end

Setting `linkedin.enabled` to `true` in [config.ts](config.ts) turns captions on. They're then saved to `seo-engine/linkedin/<slug>.json` and shown in the review PR. `npm run seo:caption -- <slug>` writes one by hand at any time.

**What's still to build once access is granted:** posting to the page through LinkedIn's Posts API. The design:
- post at 10:30 (location) and 13:30 (service) UK time
- only once the article is live
- never twice, by checking the page's recent posts before sending
- with a one-command LinkedIn login that renews itself where LinkedIn allows

An earlier Ayrshare-based version is in git history (commit `34be7ab`) for reference.

**Getting access (do this now, because LinkedIn's review takes about 1 to 2 weeks):**
1. At [linkedin.com/developers](https://www.linkedin.com/developers/apps), create an app. Associate it with the **Integrate company page** and upload a logo.
2. Have a page admin verify the app. The portal generates a verification link for them.
3. On the app's **Products** tab, request the **Community Management API**. It's only open to registered companies; Integrate AI Solutions Limited qualifies. Describe the use as "publishing our own blog posts to our own company page". The Community Management API must be the only product on a new app.
4. When it's approved, tell Claude Code, and it will build the posting step. You'll need the app's client ID and secret, and the page's numeric ID from the admin URL (`linkedin.com/company/<number>/admin/`).

## Secrets

| Secret | Used for |
|---|---|
| `ANTHROPIC_API_KEY` | Writing posts |
| `SITE_URL` | Absolute links. Optional; defaults to `https://integrate-tech.co.uk`. |

`GITHUB_TOKEN` is provided by Actions automatically and is used for commits, the review PR and issues.
