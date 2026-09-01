import type { Metadata } from "next";

/**
 * /book is a standalone booking page for people arriving from a social bio
 * via /links. It deliberately has no site nav or footer: the form is the only
 * thing on it, so nobody lands on the full website mid-flow and wanders off.
 */
export const metadata: Metadata = {
  title: "Book a call — Integrate",
  description:
    "Leave your details and we'll call you back within one business day to set up a 30-minute strategy call.",
};

export default function BookLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main id="main">{children}</main>;
}
