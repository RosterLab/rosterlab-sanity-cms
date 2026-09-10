import { localizeUSPost } from "@/lib/localization/us-blog";
import { withHreflang } from "@/components/seo/HreflangTags";
import { getClient } from "@/sanity/lib/client";
import { blogPostsOnlyQuery } from "@/sanity/lib/queries";
import BlogPageContent from "@/components/blog/BlogPageContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = /^\d+$/.test(page) ? Number(page) : NaN;

  if (isNaN(pageNumber) || pageNumber < 1) {
    return {};
  }

  // De-optimise title and description for pages beyond 1
  const title =
    pageNumber === 1
      ? "RosterLab Blog - AI Scheduling Tips"
      : `RosterLab Blog - Page ${pageNumber}`;

  const description =
    pageNumber === 1
      ? "Discover insights on staff scheduling, shift planning, and workforce planning. Stay ahead with practical tips from RosterLab."
      : `Explore page ${pageNumber} of RosterLab's blog featuring expert insights on staff scheduling, shift planning, and workforce management best practices.`;

  const baseUrl = "https://rosterlab.com";

  return withHreflang(
    {
      title,
      description,
      robots: {
        index: false, // Pagination pages should not be indexed
        follow: true,
      },
      alternates: {
        canonical:
          pageNumber === 1
            ? `${baseUrl}/us/blog`
            : `${baseUrl}/us/blog/page/${pageNumber}`,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: `${baseUrl}/us/blog/page/${pageNumber}`,
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
        title,
        description,
        images: ["/images/og-images/Blog.png"],
      },
    },
    `/us/blog/page/${pageNumber}`,
  );
}

// Rendered per request. These pages are noindex and low traffic, so
// prerendering buys nothing - and a static route whose param list can be
// empty cannot be rendered on demand at all. Rendering per request also
// means a newly needed page works before the next deploy.
export const dynamic = "force-dynamic";

export default async function BlogPaginationPage({ params }: Props) {
  const { page } = await params;
  const pageNumber = /^\d+$/.test(page) ? Number(page) : NaN;

  // Redirect to main blog page if page is 1
  if (pageNumber === 1) {
    return notFound();
  }

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  // No draftMode(): pagination has no preview value, and a dynamic API here
  // previously forced the route into a broken static/dynamic hybrid.
  const client = getClient();
  const posts = await client.fetch(blogPostsOnlyQuery);

  const postsPerPage = 12;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (pageNumber > totalPages) {
    notFound();
  }

  return (
    <BlogPageContent
      posts={posts.map(localizeUSPost)}
      currentPage={pageNumber}
      basePath="/us/blog"
    />
  );
}
