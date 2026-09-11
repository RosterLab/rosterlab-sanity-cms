import { localizeUSPost } from "@/lib/localization/us-blog";
import { withHreflang } from "@/components/seo/HreflangTags";
import { getClient } from "@/sanity/lib/client";
import { blogPostsOnlyQuery } from "@/sanity/lib/queries";
import { validatedToken } from "@/sanity/lib/token";
import BlogPageContent from "@/components/blog/BlogPageContent";
import { draftMode } from "next/headers";

// ISR: Revalidate every 5 minutes (blog content changes frequently)
export const revalidate = 300;

export const metadata = withHreflang(
  {
    title: "Blog - AI Staff Scheduling Guides",
    description:
      "Discover insights on staff scheduling, shift planning, and workforce planning. Stay ahead with practical tips from RosterLab.",
    alternates: {
      canonical: "https://rosterlab.com/us/blog",
    },
    openGraph: {
      title: "Blog - AI Staff Scheduling Guides",
      description:
        "Discover insights on staff scheduling, shift planning, and workforce planning. Stay ahead with practical tips from RosterLab.",
      type: "website",
      url: "https://rosterlab.com/us/blog",
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
      title: "Blog - AI Staff Scheduling Guides",
      description:
        "Discover insights on staff scheduling, shift planning, and workforce planning. Stay ahead with practical tips from RosterLab.",
      images: ["/images/og-images/Blog.png"],
    },
  },
  "/us/blog",
);

export default async function BlogPage() {
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const posts = await client.fetch(blogPostsOnlyQuery, {
    excludedSite: "global",
  });

  return (
    <BlogPageContent posts={posts.map(localizeUSPost)} basePath="/us/blog" />
  );
}
