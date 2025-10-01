import ROICalculatorClient from "./client";
import SiteLayout from "@/components/layout/SiteLayout";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "ROI Calculator - RosterLab",
    description:
      "Calculate your ROI with RosterLab. See how much time and money you can save with AI-powered rosters.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "ROI Calculator - RosterLab",
      description:
        "Calculate your ROI with RosterLab. See how much time and money you can save with AI-powered rosters.",
      type: "website",
      url: "https://rosterlab.com/tools/roi-calculator",
      images: [
        {
          url: "/images/og-images/ROICalc.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ROI Calculator - RosterLab",
      description:
        "Calculate your ROI with RosterLab. See how much time and money you can save with AI-powered rosters.",
      images: ["/images/og-images/ROICalc.png"],
    },
  },
  "/tools/roi-calculator",
);

export default function ROICalculatorPage() {
  return (
    <SiteLayout>
      <ROICalculatorClient />

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "ROI Calculator" },
        ]}
      />
    </SiteLayout>
  );
}
