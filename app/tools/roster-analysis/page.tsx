import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
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
  *[_type == "post" && (!defined(sites) || sites != "us") && "case-studies" in categories[]->slug.current] | order(publishedAt desc)[0...3] {
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

async function CaseStudies() {
  const client = getClient();
  const raw = await client
    .fetch<RawCaseStudy[]>(caseStudiesQuery, {}, { next: { revalidate } })
    .catch((error: unknown) => {
      console.error("Could not load roster analysis case studies", error);
      return [];
    });
  const caseStudies = (raw || []).map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    imageUrl: p.mainImage
      ? urlFor(p.mainImage).width(800).height(450).url()
      : null,
    imageAlt: p.mainImage?.alt || p.title,
  }));

  if (caseStudies.length === 0) return null;

  return (
    <div className="bg-white border-t border-gray-100 py-16 lg:py-[120px]">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-[40px] font-bold text-gray-900 mb-4 leading-[1.15]">
            Case Studies
          </h2>
          <p className="text-base sm:text-[20px] text-gray-600 leading-[1.5]">
            See how global organizations are transforming their
            workforce management with RosterLab.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                {cs.imageUrl && (
                  <Image
                    src={cs.imageUrl}
                    alt={cs.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                  Case study
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-[1.25]">
                  {cs.title}
                </h3>
                {cs.excerpt && (
                  <p className="text-base text-gray-600 mb-4 leading-[1.5] line-clamp-3">
                    {cs.excerpt}
                  </p>
                )}
                <span className="text-base font-semibold text-primary-600 group-hover:underline mt-auto">
                  Read story →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default function RosterAnalysisPage() {
  return (
    <SiteLayout>
      <RosterAnalysisClient
        caseStudies={
          <Suspense fallback={null}>
            <CaseStudies />
          </Suspense>
        }
      />
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
