import { Metadata } from "next";
import StaffRosteringInteractiveDemoClient from "./client";
import PageWrapper from "./PageWrapper";
import { withHreflang } from "@/components/seo/HreflangTags";

export const metadata: Metadata = withHreflang(
  {
    title: "Interactive Demo - RosterLab",
    description:
      "Experience RosterLab's interactive demo and see how AI instantly builds fair, compliant staff rosters. Create rosters for complex teams in minutes, not days.",
    alternates: {
      canonical: "https://rosterlab.com/staff-rostering-interactive-demo",
    },
    openGraph: {
      title: "Interactive Demo - RosterLab",
      description:
        "Experience RosterLab's interactive demo and see how AI instantly builds fair, compliant staff rosters. Create rosters for complex teams in minutes, not days.",
      type: "website",
      url: "https://rosterlab.com/staff-rostering-interactive-demo",
      images: [
        {
          url: "/images/og-images/InteractiveDemo.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Interactive Demo - RosterLab",
      description:
        "Experience RosterLab's interactive demo and see how AI instantly builds fair, compliant staff rosters. Create rosters for complex teams in minutes, not days.",
      images: ["/images/og-images/InteractiveDemo.png"],
    },
  },
  "/staff-rostering-interactive-demo",
);

export default function StaffRosteringInteractiveDemo() {
  return (
    <PageWrapper>
      <StaffRosteringInteractiveDemoClient />
    </PageWrapper>
  );
}
