# SEO engine

Writes two blog posts a day for integrate-tech.co.uk:
- one about a place, for example "roofing leads in Chorley"
- one about a service, for example "Meta ads for heating engineers"

Each post also gets a LinkedIn caption for Integrate's company page, which links to the post and to the contact form. Every post and caption goes through code-based checks before it's saved, and every one links to `/contact`.

It runs itself on GitHub Actions:
- Each morning it writes the posts and adds them to a pull request for you to review.
- When you merge, the posts go live on the site.
- Each post's LinkedIn caption is then scheduled for the company page.

**Contents:** [How a post is made](#how-a-post-is-made) · [Publishing to LinkedIn](#publishing-to-linkedin) · [The daily schedule](#the-daily-schedule-github-actions) · [Setup checklist](#setup-checklist) · [Running it locally](#running-it-locally) · [Adding places and services](#adding-places-and-services) · [Secrets](#secrets)

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
   - at most 3,000 characters in total (LinkedIn's limit)

   It gets one retry. If it still fails, the blog post is published anyway, the caption is marked `failed` so nothing goes to LinkedIn, and an issue says how to retry.
6. **Save.**
   - The post goes to `content/blog/<slug>.mdx`.
   - The caption and its LinkedIn status go to `seo-engine/linkedin/<slug>.json`, kept apart from the post, so recording a LinkedIn post never changes the blog or rebuilds the site.
   - The topic is added to [data/ledger.json](data/ledger.json).

Posts have no generated images. The blog shows its standard drawn cover for them.

All settings are in [config.ts](config.ts), including the model, word ranges, thresholds, banned phrases, LinkedIn caption rules, posting slots and retry counts.

## Publishing to LinkedIn

`npm run seo:publish` ([publish.ts](publish.ts)) sends captions to Integrate's LinkedIn company page through [Ayrshare](https://www.ayrshare.com). Ayrshare sits behind a `Publisher` interface in [lib/publisher.ts](lib/publisher.ts), so another service (e.g. Postiz) can replace it by adding a class and a case in `getPublisher()`.

- **Only live posts.** A caption is sent only once its blog post returns 200 on the live site. After a merge, the publisher polls for up to 15 minutes while Vercel deploys. If the post still isn't live, it's marked failed, retried on later runs, and reported in an issue.
- **Staggered.** Location posts go out at 10:30 and service posts at 13:30, UK time. Each post takes the next free day for its slot, so if you merge several days' posts at once they go out one a day, not all together. The times are `linkedin.slots` in the config.
- **Never twice.** Posts already scheduled or posted are skipped. Every send also carries an idempotency key (`seo-engine:<slug>:<attempt>`), so Ayrshare itself refuses a repeat, even if a run crashed before saving its status.
- **Status** is saved in `seo-engine/linkedin/<slug>.json`:
  - `pending` → `scheduled` (with the time and Ayrshare id) → `posted` (with the LinkedIn post URL).
  - `failed` means something went wrong; the reason is in `error`. Failed posts are retried up to 3 times.
  - A scheduled post whose time has passed is checked with Ayrshare and marked `posted`.
- **Account problems** (bad key, disconnected page) stop the run without marking any post as failed.

| Command | What it does |
|---|---|
| `npm run seo:publish -- --dry-run` | Shows what would be sent and when. Doesn't post or change anything. |
| `npm run seo:publish` | Schedules every pending post that's live into its next slot. |
| `npm run seo:publish -- --slug <slug>` | Only that post. Also retries it after it has used up its attempts. |
| `npm run seo:publish -- --now` | Posts straight away instead of waiting for the slot. |

## The daily schedule (GitHub Actions)

Two workflows in `.github/workflows/`:

**[seo-generate.yml](../.github/workflows/seo-generate.yml)** runs every day at 05:00 UTC. That's 06:00 UK in summer and 05:00 in winter, because GitHub cron only runs in UTC. You can also run it by hand from the Actions tab. What it does depends on `PUBLISH_MODE`:
- `pr` (the default): the day's posts, captions and ledger update go on the branch `seo/pending-posts`, in one pull request titled "SEO engine: new blog posts to review".
  - The PR description lists every post with its keyword, word count, meta description and LinkedIn caption. Vercel's preview deployment on the PR shows the posts as they'll look.
  - While the PR is open, each day's posts are added to it. That keeps the ledger continuous, so topics can't repeat even if you don't merge for a week.
  - To drop a post, delete its `.mdx` and its `seo-engine/linkedin/` file on the branch before merging. Once you merge (or close) the PR, the next run starts a fresh one.
- `auto`: posts are committed straight to `main`, and publishing runs straight after.

**[seo-publish.yml](../.github/workflows/seo-publish.yml)** runs `seo:publish`:
- when posts land on `main` (you merge the PR)
- after `seo-generate` in auto mode
- every day at 15:00 UTC, to confirm scheduled posts went out and retry failures
- by hand from the Actions tab, with an optional slug, "post now" or dry run

It commits the updated status files back to `main`.

**Why status commits don't cause loops or pointless deploys:**
- Pushes made with the workflow's own `GITHUB_TOKEN` never start other workflows.
- `seo-publish` only reacts to changes in `content/blog/`.
- [vercel.json](../vercel.json) has an `ignoreCommand` that skips the site build when a commit only touches `seo-engine/linkedin/` or `seo-engine/logs/`.

Normal commits build as before.

**Failures open a GitHub issue** labelled `seo-engine`. That covers:
- a post that failed the gate twice
- a caption that failed
- a post that couldn't be sent to LinkedIn
- any run that crashed

Each run's log is attached to the run as an artifact (`seo-generate-log`).

## Setup checklist

1. **Anthropic:** create an API key at console.anthropic.com and add credit under Billing.
2. **Ayrshare:**
   - Create an account and choose a plan that covers about 60 posts a month. Check the plan's limits and whether it includes LinkedIn company pages.
   - Under Social Accounts, link LinkedIn and pick the **Integrate company page**. You need to be a Super Admin or Content Admin of the page.
   - Copy the API key from the API Key page.
3. **GitHub repository settings:**
   - **Secrets and variables → Actions → Secrets:** add `ANTHROPIC_API_KEY` and `AYRSHARE_API_KEY`. `SITE_URL` is optional and defaults to `https://integrate-tech.co.uk`.
   - **Secrets and variables → Actions → Variables:** add `PUBLISH_MODE` = `pr` (or `auto` later). Leaving it unset also means `pr`.
   - **Actions → General → Workflow permissions:** choose "Read and write permissions" and tick "Allow GitHub Actions to create and approve pull requests".
   - Optional: **General → Pull Requests →** "Automatically delete head branches".
4. **Merge the engine into `main`.** Scheduled and manual workflows only run from the default branch.
5. **Test by hand from the Actions tab:**
   - run "SEO generate" and review the PR it opens
   - merge it
   - watch "SEO publish" schedule the LinkedIn posts, or run it first with "dry run" ticked

**Switching from `pr` to `auto`:** set the `PUBLISH_MODE` variable to `auto`. Posts then go live every morning without review. Switch back any time.

## Running it locally

Put keys in `.env.local` at the project root. Git ignores that file, and the engine reads it automatically:

```
ANTHROPIC_API_KEY=sk-ant-api03-...
AYRSHARE_API_KEY=...        # only needed for seo:publish
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
| `npm run seo:publish -- --dry-run` | See [Publishing to LinkedIn](#publishing-to-linkedin). |

Every run prints:
- the topics picked
- the gate result for each attempt
- tokens used and an approximate cost

It also saves a summary to `seo-engine/logs/generate-<date>.json`, which is git-ignored. The summary includes any rejected drafts, so you can see why they failed.

A normal day of two posts and two captions costs roughly $0.12 to $0.25 in Claude usage. Re-running on the same day is safe: a post type already generated that day is skipped.

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

## Secrets

| Secret | Used for |
|---|---|
| `ANTHROPIC_API_KEY` | Writing posts and captions |
| `AYRSHARE_API_KEY` | Posting to the LinkedIn company page |
| `SITE_URL` | Absolute links and the live check. Optional; defaults to `https://integrate-tech.co.uk`. |

`GITHUB_TOKEN` is provided by Actions automatically and is used for commits, the review PR and issues.
