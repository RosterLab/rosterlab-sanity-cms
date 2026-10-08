import { client } from "@/sanity/lib/client";
import { blogPostsOnlyQuery } from "@/sanity/lib/queries";

export const revalidate = 300;

type FeedPost = {
  title: string;
  slug?: { current?: string };
  excerpt?: string;
  publishedAt?: string;
};

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => {
    return {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&apos;",
    }[character]!;
  });
}

export async function GET() {
  // Reuse the global blog filter: exclude US-only, newsroom, case studies,
  // drafts, and records without a published slug.
  const posts = await client.fetch<FeedPost[]>(
    `${blogPostsOnlyQuery}[0...50]`,
    { excludedSite: "us" },
  );
  const items = posts
    .filter((post) => post.slug?.current)
    .map((post) => {
      const url = `https://rosterlab.com/blog/${encodeURIComponent(post.slug!.current!)}`;
      const date = post.publishedAt ? new Date(post.publishedAt) : null;
      const pubDate =
        date && !Number.isNaN(date.getTime())
          ? `<pubDate>${date.toUTCString()}</pubDate>`
          : "";
      return `<item>
        <title>${escapeXml(post.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <description>${escapeXml(post.excerpt || "")}</description>
        ${pubDate}
      </item>`;
    });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RosterLab Blog</title>
    <link>https://rosterlab.com/blog</link>
    <description>Staff rostering insights from RosterLab.</description>
    <language>en</language>
    <atom:link href="https://rosterlab.com/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${items.join("\n")}
  </channel>
</rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    },
  );
}
