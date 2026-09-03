import RosterAnalysisClient from "./RosterAnalysisClient";
import SiteLayout from "@/components/layout/SiteLayout";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getClient, urlFor } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Free AI Roster Analyser - Instant Roster Analysis",
  description:
    "Upload your roster for a free AI report in minutes. Spot fairness, compliance and coverage gaps, focused on what matters most to your team.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://rosterlab.com/tools/roster-analysis",
  },
  openGraph: {
    title: "Free AI Roster Analyser - Instant Roster Analysis | RosterLab",
    description:
      "Upload your roster for a free AI report in minutes. Spot fairness, compliance and coverage gaps, focused on what matters most to your team.",
    type: "website",
    url: "https://rosterlab.com/tools/roster-analysis",
    images: [
      {
        url: "/images/og-images/AutoRosterGeneration.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Roster Analyser - Instant Roster Analysis | RosterLab",
    description:
      "Upload your roster for a free AI report in minutes. Spot fairness, compliance and coverage gaps, focused on what matters most to your team.",
    images: ["/images/og-images/AutoRosterGeneration.png"],
  },
};

const caseStudiesQuery = groq`
  *[_type == "post" && "case-studies" in categories[]->slug.current] | order(publishedAt desc)[0...3] {
    title,
    "slug": slug.current,
    excerpt,
    mainImage
  }
`;

type RawCaseStudy = {
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
};

export default async function RosterAnalysisPage() {
  const client = getClient();
  const raw = await client.fetch<RawCaseStudy[]>(caseStudiesQuery);
  const caseStudies = (raw || []).map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    imageUrl: p.mainImage
      ? urlFor(p.mainImage).width(800).height(450).url()
      : null,
    imageAlt: p.mainImage?.alt || p.title,
  }));

  return (
    <SiteLayout>
      <RosterAnalysisClient caseStudies={caseStudies} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "AI Roster Analysis" },
        ]}
      />
    </SiteLayout>
  );
}
