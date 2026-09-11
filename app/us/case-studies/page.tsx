import { localizeUSResourceResult } from "@/lib/localization/us-resources";

import { resourceMetadata } from "@/lib/localization/us-resources";
import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { validatedToken } from "@/sanity/lib/token";
import CaseStudiesPageContent from "@/components/case-studies/CaseStudiesPageContent";
import { draftMode } from "next/headers";

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

export const metadata = resourceMetadata({
  title: "Case Studies - Better Schedules, Impactful Results",
  description:
    "Explore real-world case studies showing how RosterLab's AI scheduling improved coverage, cut admin time, and delivered fair schedules for complex teams.",
  alternates: {
    canonical: "https://rosterlab.com/us/case-studies",
  },
  openGraph: {
    title: "RosterLab Case Studies - Better Schedules, Impactful Results",
    description:
      "Explore real-world case studies showing how RosterLab's AI scheduling improved coverage, cut admin time, and delivered fair schedules for complex teams.",
    type: "website",
    url: "https://rosterlab.com/us/case-studies",
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
    title: "RosterLab Case Studies - Better Schedules, Impactful Results",
    description:
      "Explore real-world case studies showing how RosterLab's AI scheduling improved coverage, cut admin time, and delivered fair schedules for complex teams.",
    images: ["/images/og-images/CaseStudies.png"],
  },
}, "/us/case-studies");

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

export default async function CaseStudiesPage() {
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const posts = await client.fetch(caseStudiesQuery).then(localizeUSResourceResult);

  return <CaseStudiesPageContent isUS posts={posts} />;
}
