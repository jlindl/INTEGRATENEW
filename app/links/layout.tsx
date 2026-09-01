import type { Metadata } from "next";

/**
 * /links is a link-in-bio destination: people arrive here from an Instagram,
 * TikTok or LinkedIn profile, almost always on a phone. It deliberately skips
 * the site nav so there's nothing to get lost in — the page is the menu. The
 * logo returns to the homepage for anyone who wants the full site.
 */
export const metadata: Metadata = {
  title: "Links — Integrate",
  description:
    "Book a call with Integrate, or follow us on Instagram, TikTok and LinkedIn.",
  robots: { index: true, follow: true },
};

export default function LinksLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main id="main">{children}</main>;
}
