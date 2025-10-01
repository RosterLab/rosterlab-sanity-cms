import { Metadata } from "next";
import BookADemoClient from "./client";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = withHreflang(
  {
    title: "Book a Demo - Talk to Us About Your Rostering Challenges",
    description:
      "Book a live demo with RosterLab to see how AI-powered rostering slashes admin time, optimises shifts, and fixes your toughest scheduling challenges.",
    alternates: {
      canonical: "https://rosterlab.com/book-a-demo",
    },
    openGraph: {
      title: "Book a Demo - Talk to Us About Your Rostering Challenges",
      description:
        "Book a live demo with RosterLab to see how AI-powered rostering slashes admin time, optimises shifts, and fixes your toughest scheduling challenges.",
      type: "website",
      url: "https://rosterlab.com/book-a-demo",
      images: [
        {
          url: "/images/og-images/Bookademo.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Book a Demo - Talk to Us About Your Rostering Challenges",
      description:
        "Book a live demo with RosterLab to see how AI-powered rostering slashes admin time, optimises shifts, and fixes your toughest scheduling challenges.",
      images: ["/images/og-images/Bookademo.png"],
    },
  },
  "/book-a-demo",
);

export default function BookADemoPage() {
  return (
    <>
      <BookADemoClient />

      {/* Hidden Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Book a Demo" }]}
      />
    </>
  );
}
