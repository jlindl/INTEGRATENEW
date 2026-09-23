/**
 * MDX rendering for blog posts. Element overrides carry the same typographic
 * treatment the original block renderer used (h2 / p / quote), extended with
 * the elements long-form posts need: h3, lists, links, emphasis.
 *
 * Posts are trusted repo content (written by hand or by the SEO engine, whose
 * quality gate rejects import/export statements and unknown components).
 */
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import { ContactCta } from "@/components/blog/ContactCta";

function A({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const cls =
    "font-medium text-ink underline decoration-accent/60 decoration-1 underline-offset-4 transition-colors hover:text-accent";
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

const components = {
  h2: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="font-display-tuned mt-14 text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-tight text-ink"
      {...p}
    />
  ),
  h3: (p: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="font-display-tuned mt-10 text-[1.35rem] font-medium leading-snug text-ink" {...p} />
  ),
  p: (p: ComponentPropsWithoutRef<"p">) => <p className="mt-6 text-lg leading-relaxed text-ink-2" {...p} />,
  ul: (p: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-6 list-disc space-y-2.5 pl-6 text-lg leading-relaxed text-ink-2 marker:text-accent" {...p} />
  ),
  ol: (p: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-6 list-decimal space-y-2.5 pl-6 text-lg leading-relaxed text-ink-2 marker:text-ink-3" {...p} />
  ),
  li: (p: ComponentPropsWithoutRef<"li">) => <li className="pl-1.5" {...p} />,
  blockquote: (p: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-10 border-l-2 border-accent pl-6 [&>p]:mt-0 [&>p]:font-display-tuned [&>p]:text-[clamp(1.3rem,2.4vw,1.7rem)] [&>p]:font-medium [&>p]:italic [&>p]:leading-snug [&>p]:text-ink"
      {...p}
    />
  ),
  strong: (p: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-ink" {...p} />,
  hr: () => <hr className="my-12 border-line" />,
  a: A,
  ContactCta,
};

/** Allowed custom components, shared with the SEO engine's quality gate. */
export const MDX_COMPONENT_NAMES = ["ContactCta"] as const;

export async function PostBody({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, { ...runtime });
  return <Content components={components} />;
}
