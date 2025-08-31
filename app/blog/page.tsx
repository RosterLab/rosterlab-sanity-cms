import { getClient } from "@/sanity/lib/client";
import { blogPostsOnlyQuery } from "@/sanity/lib/queries";
import { validatedToken } from "@/sanity/lib/token";
import BlogPageContent from "@/components/blog/BlogPageContent";
import { draftMode } from "next/headers";

export const metadata = {
  title: "Blog - AI Staff Rostering and Scheduling Guides",
  description:
    "Discover insights on staff rostering, shift scheduling, and workforce planning. Stay ahead with practical tips from RosterLab.",
  alternates: {
    canonical: "https://rosterlab.com/blog",
  },
  openGraph: {
    title: "Blog - AI Staff Rostering and Scheduling Guides",
    description:
      "Discover insights on staff rostering, shift scheduling, and workforce planning. Stay ahead with practical tips from RosterLab.",
    type: "website",
    url: "https://rosterlab.com/blog",
    images: [
      {
        url: "/images/og-images/Blog.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - AI Staff Rostering and Scheduling Guides",
    description:
      "Discover insights on staff rostering, shift scheduling, and workforce planning. Stay ahead with practical tips from RosterLab.",
    images: ["/images/og-images/Blog.png"],
  },
};

export default async function BlogPage() {
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const posts = await client.fetch(blogPostsOnlyQuery);

  return <BlogPageContent posts={posts} />;
}
