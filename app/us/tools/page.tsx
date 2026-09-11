import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from "next";
import ToolsPageContent from "@/app/tools/ToolsPageContent";
import SiteLayout from "@/components/layout/SiteLayout";

export const metadata: Metadata = resourceMetadata({
  title: "Free Workforce Management Tools",
  description:
    "Free workforce management tools: savings calculator, personality tests and shift preference surveys. Streamline scheduling and team management.",
  alternates: {
    canonical: "https://rosterlab.com/us/tools",
  },
  openGraph: {
    title: "Free Workforce Management Tools - RosterLab",
    description:
      "Free workforce management tools: savings calculator, personality tests and shift preference surveys. Streamline scheduling and team management.",
    type: "website",
    url: "https://rosterlab.com/us/tools",
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
      "Free workforce management tools: savings calculator, personality tests and shift preference surveys. Streamline scheduling and team management.",
    images: ["/images/og-images/WFM.png"],
  },
}, "/us/tools");

const tools = [
  // Row 1
  {
    id: "roi-calculator",
    title: "Savings Calculator",
    description:
      "Estimate how much time and money you could save with AI-powered staff scheduling.",
    href: "/us/tools/savings-calculator",
    image: "/images/og-images/ROICalc.png",
    format: "Interactive",
    category: "Financial Analysis",
  },
  {
    id: "fte-calculator",
    title: "FTE Requirement Calculator",
    description:
      "Turn your weekly staffing demand model into the number of full-time equivalents (FTE) required, and compare it against the FTE you have available.",
    href: "/us/tools/fte-calculator",
    image: "/images/og-images/ROICalc.png",
    format: "Interactive",
    category: "Workforce Planning",
  },
  {
    id: "survey-preferences",
    title: "Shift Preferences Survey & Balancer",
    description:
      "Create custom holiday shift preference surveys for your team. Collect availability and automatically balance shift assignments fairly.",
    href: "/us/tools/survey-preferences",
    image: "/images/shift-preference-survey.jpg",
    format: "Survey Tool",
    category: "Shift Management",
  },
  // Row 2
  {
    id: "excel-template",
    title: "Free Excel Schedule Template",
    description:
      "Download a ready-to-use Excel template to get started with staff scheduling, whether you're planning shifts by hand or moving off paper.",
    href: "/us/templates/free-staff-schedule-template-excel",
    image: "/images/og-images/Excel.png",
    format: "Template",
    category: "Templates",
  },
  {
    id: "personality-test",
    title: "Scheduling Personality Type",
    description:
      "Discover your workplace personality type and learn how to better collaborate with your team members.",
    href: "/us/tools/staff-scheduling-personality-quiz",
    image: "/images/us-images/iStock-2187596982.jpg",
    format: "Quiz",
    category: "Team Building",
  },
  {
    id: "schedge",
    title: "Schedge",
    description:
      "We love scheduling so much that we built a mini game about it. See how well you can plan a schedule in under a minute.",
    href: "/us/schedge",
    image: "/images/og-images/Schedge.png",
    format: "Mini Game",
    category: "Just for Fun",
  },
];

export default function ToolsPage() {
  return (
    <SiteLayout>
      <ToolsPageContent isUS tools={tools} />
    </SiteLayout>
  );
}
