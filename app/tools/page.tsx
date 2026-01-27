import { Metadata } from "next";
import ToolsPageContent from "./ToolsPageContent";
import SiteLayout from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Free Workforce Management Tools - RosterLab",
  description:
    "Access free workforce management tools including ROI calculator, personality tests, and shift preference surveys. Streamline your scheduling and team management.",
  alternates: {
    canonical: "https://rosterlab.com/tools",
  },
  openGraph: {
    title: "Free Workforce Management Tools - RosterLab",
    description:
      "Access free workforce management tools including ROI calculator, personality tests, and shift preference surveys. Streamline your scheduling and team management.",
    type: "website",
    url: "https://rosterlab.com/tools",
    images: [
      {
        url: "/images/og-images/WFM.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Workforce Management Tools - RosterLab",
    description:
      "Access free workforce management tools including ROI calculator, personality tests, and shift preference surveys. Streamline your scheduling and team management.",
    images: ["/images/og-images/WFM.png"],
  },
};

const tools = [
  {
    id: "roi-calculator",
    title: "ROI Calculator",
    description:
      "Calculate your potential return on investment with RosterLab. See how much time and money you can save with automated rostering.",
    href: "/tools/roi-calculator",
    image: "/images/og-images/ROICalc.png",
    format: "Interactive",
    category: "Financial Analysis",
  },
  {
    id: "personality-test",
    title: "Rostering Personality Type",
    description:
      "Discover your workplace personality type and learn how to better collaborate with your team members.",
    href: "/tools/staff-scheduling-personality-quiz",
    image: "/images/us-images/iStock-2187596982.jpg",
    format: "Quiz",
    category: "Team Building",
  },
  {
    id: "survey-preferences",
    title: "Shift Preferences Survey & Balancer",
    description:
      "Create custom holiday shift preference surveys for your team. Collect availability and automatically balance shift assignments fairly.",
    href: "/tools/survey-preferences",
    image: "/images/shift-preference-survey.jpg",
    format: "Survey Tool",
    category: "Shift Management",
  },
];

export default function ToolsPage() {
  return (
    <SiteLayout>
      <ToolsPageContent tools={tools} />
    </SiteLayout>
  );
}
