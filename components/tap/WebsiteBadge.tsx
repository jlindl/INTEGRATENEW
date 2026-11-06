"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BusinessLink } from "@/lib/tap/types";
import { copyText } from "./clipboard";
import { SITE, SectionTitle, inputClass, secondaryButton } from "./ui";

/**
 * "Add to your website": a copy-paste review button for the business's own
 * site, with a small "Made with Integrate Tap" credit link under it.
 *
 * Why it exists: Tap's own pages live on integrate-tech.co.uk, so their credit
 * links are internal, and /b is noindex and blocked in robots.txt anyway. Real
 * backlinks only come from other domains, and this badge is how we earn them.
 *
 * The snippet lands on sites we don't control, so:
 *  - Inline styles only, no <style> or <script>. Nothing leaks in or out, and
 *    it works in any HTML block (Wix even drops it into an iframe).
 *  - Every colour sits on a background the snippet paints itself, so it reads
 *    on light and dark sites alike and the credit can never end up invisible.
 *    A hidden link would look like link spam.
 *  - The credit is a normal, followed link with a branded anchor. Keep it that
 *    way: keyword-rich links in widgets are against Google's spam policies.
 */

type ReviewLink = BusinessLink & { kind: "google" | "tripadvisor" };
type Target = "page" | "review";

/** Same pick as the hosted page's lead button: the first review link, in the owner's order. */
const isReview = (l: BusinessLink): l is ReviewLink => l.kind === "google" || l.kind === "tripadvisor";

const PLATFORM: Record<ReviewLink["kind"], string> = { google: "Google", tripadvisor: "Tripadvisor" };

const ICON_STYLE = 'aria-hidden="true" focusable="false" style="display:block;flex:none;width:20px;height:20px"';

const ICON: Record<ReviewLink["kind"], string> = {
  google: [
    `    <svg width="20" height="20" viewBox="0 0 24 24" ${ICON_STYLE}>`,
    `      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.8z"/>`,
    `      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24z"/>`,
    `      <path fill="#FBBC05" d="M5.29 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.28a12 12 0 0 0 0 10.78l4.01-3.1z"/>`,
    `      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.28 6.61l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77z"/>`,
    `    </svg>`,
  ].join("\n"),
  tripadvisor: [
    `    <svg width="20" height="20" viewBox="0 0 24 24" ${ICON_STYLE}>`,
    `      <circle cx="12" cy="12" r="12" fill="#34e0a1"/>`,
    `      <path fill="#000" d="M12 6 13.7 10.25 18.28 10.56 14.76 13.5 15.88 17.94 12 15.5 8.12 17.94 9.24 13.5 5.72 10.56 10.3 10.25Z"/>`,
    `    </svg>`,
  ].join("\n"),
};

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/** Host themes love restyling links; pin down everything they usually touch. */
const LINK_RESET =
  "box-sizing:border-box;max-width:100%;margin:0;font-family:inherit;font-style:normal;letter-spacing:normal;text-transform:none";

const WRAP_STYLE = `display:inline-flex;flex-direction:column;align-items:center;max-width:100%;margin:0;padding:0;border:0;background:none;font-family:${FONT};text-align:center;vertical-align:middle`;

const BUTTON_STYLE = `${LINK_RESET};display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:10px 22px 10px 16px;border:1px solid #dadce0;border-radius:24px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.08),0 2px 8px rgba(0,0,0,.08);color:#1f1f1f;font-size:16px;font-weight:600;line-height:1.25;text-align:left;text-decoration:none`;

// A near-white chip: invisible on white sites, a soft pill on dark ones. The
// transparent border makes it 44px tall to tap while the visible chip stays small.
const CREDIT_STYLE = `${LINK_RESET};display:inline-block;padding:4px 10px;border:10px solid transparent;border-radius:999px;background:rgba(255,255,255,.9);background-clip:padding-box;box-shadow:none;color:#4d4d4d;font-size:13px;font-weight:400;line-height:1.3;text-decoration:underline;text-underline-offset:2px`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function withUtm(url: string, slug: string) {
  const q = new URLSearchParams({ utm_source: "integrate-tap", utm_medium: "website-badge", utm_content: slug });
  return `${url}?${q}`;
}

/** The HTML a business pastes into their site. */
export function badgeSnippet(slug: string, review: ReviewLink, target: Target): string {
  // UTM tags only go on our own URLs: they mean nothing to Google or
  // Tripadvisor, and short review links aren't expecting a query string.
  const href =
    target === "review" && /^https?:\/\//i.test(review.url)
      ? review.url
      : withUtm(`${SITE}/b/${encodeURIComponent(slug)}`, slug);
  return [
    "<!-- Review button by Integrate Tap -->",
    `<div style="${WRAP_STYLE}">`,
    `  <a href="${esc(href)}" style="${BUTTON_STYLE}">`,
    ICON[review.kind],
    // Bare text, no <span>: host themes that style every span can't reach it.
    `    Review us on ${PLATFORM[review.kind]}`,
    "  </a>",
    `  <a href="${esc(withUtm(`${SITE}/`, slug))}" style="${CREDIT_STYLE}">Made with Integrate Tap</a>`,
    "</div>",
  ].join("\n");
}

const TITLE = "Add to your website";

export function WebsiteBadge({ slug, links }: { slug: string; links: BusinessLink[] }) {
  const [target, setTarget] = useState<Target>("page");
  const [copied, setCopied] = useState<"ok" | "fail" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();
  useEffect(() => () => clearTimeout(timer.current), []);

  const review = links.find(isReview);
  if (!review) {
    return (
      <section>
        <SectionTitle hint="A review button for your own website, so visitors can review you too.">{TITLE}</SectionTitle>
        <p className="rounded-2xl border border-dashed border-line-2 p-4 text-[0.9rem] text-ink-3">
          Add your Google review link in Links above and save. Your website button will show up here.
        </p>
      </section>
    );
  }

  const platform = PLATFORM[review.kind];
  const snippet = badgeSnippet(slug, review, target);
  // The preview opens links in a new tab so a stray click can't lose unsaved edits above.
  const preview = snippet.replace(/<a href=/g, '<a target="_blank" rel="noopener" href=');

  async function copy() {
    const ok = await copyText(snippet);
    setCopied(ok ? "ok" : "fail");
    clearTimeout(timer.current);
    // A failure stays up so there's time to read how to copy it by hand.
    if (ok) timer.current = setTimeout(() => setCopied(null), 2500);
  }

  function choose(next: Target) {
    setTarget(next);
    setCopied(null); // "Copied" would be about the old code.
  }

  const options: [Target, string, string][] = [
    ["page", "My page", "Opens your page, review button first. It always shows your latest links."],
    ["review", `Straight to ${platform}`, `One click to ${platform}. If you change your ${platform} link, copy the code again.`],
  ];

  return (
    <section className="space-y-6">
      <SectionTitle hint="Get reviews from people who visit your website too. Copy the code and paste it into your site, for example in your footer or on your contact page.">
        {TITLE}
      </SectionTitle>

      {/* Side by side only when each pane fits the button on one line, as on most sites. */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-3">
        {(
          [
            ["On a light website", "bg-[#ffffff]"],
            ["On a dark website", "bg-[#141414]"],
          ] as const
        ).map(([caption, bg]) => (
          <figure key={caption}>
            <div
              className={`flex items-center justify-center rounded-2xl border border-line px-4 py-5 ${bg}`}
              dangerouslySetInnerHTML={{ __html: preview }}
            />
            <figcaption className="mt-2 text-center text-[0.8rem] text-ink-3">{caption}</figcaption>
          </figure>
        ))}
      </div>

      <fieldset className="min-w-0">
        <legend className="mb-2 text-[0.9rem] font-medium text-ink">Button goes to</legend>
        <div className="inline-flex max-w-full flex-wrap gap-1 rounded-[1.6rem] border border-line bg-paper-2/40 p-1">
          {options.map(([value, label]) => (
            <label key={value} className="relative">
              <input
                type="radio"
                name={`${id}-target`}
                value={value}
                checked={target === value}
                onChange={() => choose(value)}
                className="peer sr-only"
              />
              <span
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-[0.9rem] font-medium transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent ${
                  target === value ? "bg-ink text-paper shadow-lift" : "text-ink-2 hover:text-ink"
                }`}
              >
                {label}
              </span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-3">{options.find(([v]) => v === target)?.[2]}</p>
      </fieldset>

      <div>
        <label htmlFor={`${id}-code`} className="mb-1.5 block text-[0.9rem] font-medium text-ink">
          Code
        </label>
        <textarea
          id={`${id}-code`}
          value={snippet}
          readOnly
          rows={7}
          wrap="off"
          spellCheck={false}
          onFocus={(e) => e.currentTarget.select()}
          // 16px on phones so iOS doesn't zoom in when the field is focused.
          className={`${inputClass} resize-y font-mono leading-relaxed sm:text-[0.78rem]`}
        />
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button type="button" onClick={copy} className={secondaryButton} aria-live="polite">
            {copied === "ok" && (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {copied === "ok" ? "Copied" : copied === "fail" ? "Couldn't copy" : "Copy code"}
          </button>
          {copied === "fail" && <span className="text-[0.84rem] text-ink-3">Select the code above and copy it.</span>}
        </div>
      </div>

      <details className="group rounded-xl border border-line bg-paper-2/40 text-[0.86rem] text-ink-2">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
          How do I add it to my website?
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className="px-4 pb-4 leading-relaxed">
          <ol className="list-decimal space-y-1.5 pl-4">
            <li>Press <b className="font-medium text-ink">Copy code</b>.</li>
            <li>
              In your website builder, add an HTML block where you want the button. It&apos;s called Custom HTML in
              WordPress, Embed HTML in Wix, Code in Squarespace and Custom Liquid in Shopify.
            </li>
            <li>Paste the code in and publish.</li>
          </ol>
          <p className="mt-3">Someone else looks after your website? Send them the code.</p>
        </div>
      </details>
    </section>
  );
}
