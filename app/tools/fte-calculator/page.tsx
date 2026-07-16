import FTECalculatorClient from "./client";
import SiteLayout from "@/components/layout/SiteLayout";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "FTE Requirement Calculator - RosterLab",
    description:
      "Convert your weekly staffing demand model into the number of full-time equivalents (FTE) required to cover it, and compare against FTE available.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "FTE Requirement Calculator - RosterLab",
      description:
        "Convert your weekly staffing demand model into the number of full-time equivalents (FTE) required to cover it, and compare against FTE available.",
      type: "website",
      url: "https://rosterlab.com/tools/fte-calculator",
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
      title: "FTE Requirement Calculator - RosterLab",
      description:
        "Convert your weekly staffing demand model into the number of full-time equivalents (FTE) required to cover it, and compare against FTE available.",
      images: ["/images/og-images/ROICalc.png"],
    },
  },
  "/tools/fte-calculator",
);

export default function FTECalculatorPage() {
  return (
    <SiteLayout>
      <FTECalculatorClient />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "FTE Requirement Calculator" },
        ]}
      />
    </SiteLayout>
  );
}
