import { Metadata } from "next";
import BookADemoClient from "./client";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = withHreflang(
  {
    title: "Schedule a Demo - RosterLab",
    description:
      "Schedule a demo with RosterLab to see how modern staff scheduling can help reduce admin time, optimize shifts, & fix your toughest scheduling challenges.",
    alternates: {
      canonical: "https://rosterlab.com/us/book-a-demo",
    },
    openGraph: {
      title: "Schedule a Demo - RosterLab",
      description:
        "Schedule a demo with RosterLab to see how modern staff scheduling can help reduce admin time, optimize shifts, & fix your toughest scheduling challenges.",
      type: "website",
      url: "https://rosterlab.com/us/book-a-demo",
      images: [
        {
          url: "/images/og images/Bookademo.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Schedule a Demo - RosterLab",
      description:
        "Schedule a demo with RosterLab to see how modern staff scheduling can help reduce admin time, optimize shifts, & fix your toughest scheduling challenges.",
      images: ["/images/og images/Bookademo.png"],
    },
  },
  "/us/book-a-demo",
);

export default function BookADemoPage() {
  return (
    <>
      <BookADemoClient />

      {/* Hidden Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/us" }, { name: "Book a Demo" }]}
      />
    </>
  );
}
