import RosterAnalysisClient from "./RosterAnalysisClient";
import SiteLayout from "@/components/layout/SiteLayout";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Roster Analysis - Instant Scheduling Insights | RosterLab",
  description:
    "Upload your roster and get instant AI-powered analysis. Identify fairness issues, compliance gaps, and optimisation opportunities in seconds.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "AI Roster Analysis - Instant Scheduling Insights | RosterLab",
    description:
      "Upload your roster and get instant AI-powered analysis. Identify fairness issues, compliance gaps, and optimisation opportunities in seconds.",
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
    title: "AI Roster Analysis - Instant Scheduling Insights | RosterLab",
    description:
      "Upload your roster and get instant AI-powered analysis. Identify fairness issues, compliance gaps, and optimisation opportunities in seconds.",
    images: ["/images/og-images/AutoRosterGeneration.png"],
  },
};

export default function RosterAnalysisPage() {
  return (
    <SiteLayout>
      <RosterAnalysisClient />
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
