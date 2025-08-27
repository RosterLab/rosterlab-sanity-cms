"use client";

import { useEffect } from "react";
import { analytics } from "@/components/analytics/Amplitude";

interface BlogPostTrackerProps {
  title: string;
  slug: string;
  author?: string;
  category?: string;
  publishedAt?: string;
}

export default function BlogPostTracker({
  title,
  slug,
  author,
  category,
  publishedAt,
}: BlogPostTrackerProps) {
  useEffect(() => {
    // Track a custom event for blog post views with metadata
    // This will be tracked within the same session as other events
    analytics.track("Blog Post Viewed", {
      post_title: title,
      post_slug: slug,
      post_author: author || "RosterLab",
      post_category: category,
      post_published_date: publishedAt,
      content_type: "blog_post",
      // Include page information for consistency
      page_path: `/blog/${slug}`,
      page_title: title,
    });

    console.log("Blog post view tracked:", {
      title,
      slug,
      sessionId: analytics.getSessionId?.() || "N/A",
    });
  }, [title, slug, author, category, publishedAt]);

  // This component doesn't render anything
  return null;
}
