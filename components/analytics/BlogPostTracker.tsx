"use client";

import { useEffect } from "react";
import { analytics } from "@/components/analytics/tracking";
import { metaTrackViewContent } from "@/lib/analytics/meta-pixel";

const HEALTHCARE_SLUGS = [
  "healthcare",
  "nursing",
  "aged-care",
  "senior-care",
  "medical",
  "hospital",
  "clinical",
  "dental",
  "veterinary",
  "telehealth",
  "pathology",
  "radiology",
  "cardiology",
];

function detectIndustryFromCategories(
  categories?: { slug: string; title: string }[],
): string | null {
  if (!categories) return null;
  for (const cat of categories) {
    if (HEALTHCARE_SLUGS.some((h) => cat.slug.includes(h))) return "healthcare";
  }
  return null;
}

interface BlogPostTrackerProps {
  title: string;
  slug: string;
  author?: string;
  category?: string;
  categories?: { slug: string; title: string }[];
  publishedAt?: string;
}

export default function BlogPostTracker({
  title,
  slug,
  author,
  category,
  categories,
  publishedAt,
}: BlogPostTrackerProps) {
  useEffect(() => {
    const industry = detectIndustryFromCategories(categories);

    analytics.track("Blog Post Viewed", {
      post_title: title,
      post_slug: slug,
      post_author: author || "RosterLab",
      post_category: category,
      post_published_date: publishedAt,
      content_type: "blog_post",
      industry,
      page_path: `/blog/${slug}`,
      page_title: title,
    });

    if (industry) {
      window.rlTracker?.track("industry.viewed", {
        industry,
        path: window.location.pathname,
        content_type: "case_study",
        title,
      });
    }

    metaTrackViewContent({
      contentName: title,
      contentCategory: industry || category || "blog",
      contentIds: [slug],
      contentType: "blog_post",
    });
  }, [title, slug, author, category, categories, publishedAt]);

  return null;
}
