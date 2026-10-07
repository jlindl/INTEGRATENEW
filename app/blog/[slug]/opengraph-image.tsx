import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/ui/LogoMark";
import { allPostSlugs, getPost } from "@/lib/blog";

/**
 * Per-post share card, generated at build from the post title. Posts with a
 * heroImage still set it in their own openGraph metadata.
 */
export const alt = "Integrate blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return allPostSlugs().map((slug) => ({ slug }));
}

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Integrate blog";
  const category = post?.category ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "64px 72px",
          background: "#0a0a0c",
          color: "#f2f1ec",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -260,
            width: 700,
            height: 560,
            background: "radial-gradient(circle at 50% 50%, rgba(88,52,168,0.30), rgba(88,52,168,0) 66%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LogoMark tone="light" size={46} solid="#f2f1ec" />
          <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: -1 }}>Integrate</span>
          <span style={{ fontSize: 17, letterSpacing: 5, color: "#767c88", textTransform: "uppercase", marginLeft: 6 }}>
            {category}
          </span>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 68, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1040 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 28, borderTop: "1px solid #23232a" }}>
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#a855f7" }} />
          <span style={{ fontSize: 19, color: "#9a9ba3" }}>integrate-tech.co.uk/blog</span>
        </div>
      </div>
    ),
    size,
  );
}
