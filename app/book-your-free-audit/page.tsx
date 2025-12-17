import { Metadata } from "next";
import BookYourFreeAuditClient from "./client";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = withHreflang(
  {
    title: "Book Your Free Audit - Expert Roster Analysis | RosterLab",
    description:
      "Book a free roster audit with RosterLab's rostering architects. Get expert analysis of fairness, efficiency, and compliance in your staff scheduling.",
    alternates: {
      canonical: "https://rosterlab.com/book-your-free-audit",
    },
    openGraph: {
      title: "Book Your Free Audit - Expert Roster Analysis | RosterLab",
      description:
        "Book a free roster audit with RosterLab's rostering architects. Get expert analysis of fairness, efficiency, and compliance in your staff scheduling.",
      type: "website",
      url: "https://rosterlab.com/book-your-free-audit",
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
      title: "Book Your Free Audit - Expert Roster Analysis | RosterLab",
      description:
        "Book a free roster audit with RosterLab's rostering architects. Get expert analysis of fairness, efficiency, and compliance in your staff scheduling.",
      images: ["/images/og-images/Bookademo.png"],
    },
  },
  "/book-your-free-audit",
);

export default function BookYourFreeAuditPage() {
  return (
    <>
      <BookYourFreeAuditClient />

      {/* Hidden Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Book Your Free Audit" }]}
      />
    </>
  );
}
