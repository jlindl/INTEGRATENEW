"use client";

import { Fragment, useEffect, useRef, useState } from "react";

/** A run of text, optionally styled, or "\n" for a hard line break. */
export type TextPart = string | { text: string; className: string };

type Token =
  | { kind: "break" }
  | { kind: "word"; text: string; className?: string; index: number };

function tokenize(parts: TextPart[]): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  for (const part of parts) {
    if (part === "\n") {
      tokens.push({ kind: "break" });
      continue;
    }
    const text = typeof part === "string" ? part : part.text;
    const className = typeof part === "string" ? undefined : part.className;
    for (const word of text.split(/\s+/).filter(Boolean)) {
      tokens.push({ kind: "word", text: word, className, index: index++ });
    }
  }

  return tokens;
}

/**
 * Headline whose words rise out of a clipping mask one after another.
 *
 * Split by word, never by letter, and the spaces between them stay real text
 * nodes — so it wraps, selects and reads aloud exactly like plain text.
 *
 * `trigger="load"` runs from CSS on first paint; `trigger="view"` waits until
 * the element scrolls in. The motion itself lives in globals.css (`.rt-*`).
 */
export default function RevealText({
  parts,
  as: Tag = "span",
  trigger = "view",
  delay = 0,
  stagger = 55,
  className,
}: {
  parts: TextPart[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  trigger?: "load" | "view";
  /** ms before the first word moves. */
  delay?: number;
  /** ms between consecutive words. */
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (trigger !== "view") return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-rt={trigger}
      data-shown={shown || undefined}
      className={className}
      style={
        {
          "--rt-delay": `${delay}ms`,
          "--rt-stagger": `${stagger}ms`,
        } as React.CSSProperties
      }
    >
      {tokenize(parts).map((token, key) =>
        token.kind === "break" ? (
          // Authored line breaks are a desktop composition; on a phone the
          // words are left to wrap (and balance) on their own.
          <br key={key} className="max-sm:hidden" />
        ) : (
          <Fragment key={key}>
            <span className="rt-word">
              <span
                className="rt-inner"
                style={{ "--i": token.index } as React.CSSProperties}
              >
                {/* Styling goes on its own span: `.rt-inner` owns `animation`
                    and `transform`, and a styled word may need both too. */}
                {token.className ? (
                  <span className={token.className}>{token.text}</span>
                ) : (
                  token.text
                )}
              </span>
            </span>{" "}
          </Fragment>
        ),
      )}
    </Tag>
  );
}
