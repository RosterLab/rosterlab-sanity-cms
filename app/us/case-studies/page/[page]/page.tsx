// Generated from app/case-studies/page/[page]/page.tsx. Run npm run localize:resources; do not edit directly.

import { localizeUSResourceResult } from "@/lib/localization/us-resources";

import { resourceMetadata } from "@/lib/localization/us-resources";
import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import CaseStudiesPageContent from "@/components/us-resources/case-studies/CaseStudiesPageContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const caseStudiesQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != "global") && "case-studies" in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    usLocalization { protectedTerms, title, excerpt, metaTitle, metaDescription, mainImage, ogImage },
    usProtectedTerms,
    usSlug,
    usTitle,
    usExcerpt,
    usMainImage,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name,
      slug,
      image
    },
    "authors": authors[]->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`;

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = (/^\d+$/.test(page) ? Number(page) : NaN);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return resourceMetadata({}, `/us/case-studies/page/${page}`);
  }

  // De-optimise title and description for pages beyond 1
  const title =
    pageNumber === 1
      ? "RosterLab Case Studies - Real-World Results"
      : `RosterLab Case Studies - Page ${pageNumber}`;

  const description =
    pageNumber === 1
      ? "Explore our scheduling success stories. See how RosterLab's AI cuts scheduling time and lifts staff satisfaction for industries worldwide."
      : `Browse page ${pageNumber} of our case studies showcasing real-world scheduling success stories.`;

  const baseUrl = "https://rosterlab.com";

  return resourceMetadata({
    title,
    description,
    robots: {
      index: false, // Pagination pages should not be indexed
      follow: true,
    },
    alternates: {
      canonical:
        pageNumber === 1
          ? `${baseUrl}/case-studies`
          : `${baseUrl}/us/case-studies/page/${pageNumber}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/us/case-studies/page/${pageNumber}`,
      images: [
        {
          url: "/images/og-images/CaseStudies.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-images/CaseStudies.png"],
    },
  }, `/us/case-studies/page/${page}`);
}

// Rendered per request. These pages are noindex and low traffic, so
// prerendering buys nothing - and a static route whose generateStaticParams
// list can be empty cannot be rendered on demand at all, which is what made
// /case-studies/page/2 and /newsroom/page/2 return 500. Rendering per request
// also means a newly needed page works before the next deploy.
export const dynamic = "force-dynamic";

export default async function CaseStudiesPaginationPage({ params }: Props) {
  const { page } = await params;
  const pageNumber = (/^\d+$/.test(page) ? Number(page) : NaN);

  // Redirect to main case studies page if page is 1
  if (pageNumber === 1) {
    return notFound();
  }

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  // No draftMode(): pagination has no preview value, and a dynamic API here
  // previously forced the route into a broken static/dynamic hybrid.
  const client = getClient();
  const posts = await client.fetch(caseStudiesQuery).then(localizeUSResourceResult);

  const postsPerPage = 12;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (pageNumber > totalPages) {
    notFound();
  }

  return <CaseStudiesPageContent posts={posts} currentPage={pageNumber} />;
}
