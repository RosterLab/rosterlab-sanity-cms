// Generated from app/webinars/page.tsx. Run npm run localize:resources; do not edit directly.

import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import WebinarsPageContent from "@/app/us/webinars/WebinarsPageContent";

export const metadata: Metadata = resourceMetadata({
  title: "AI in Healthcare Webinars",
  description:
    "Watch on-demand conversations about healthcare staff scheduling. Explore practical experiences with AI-powered scheduling and workforce management.",
  openGraph: {
    title: "AI in Healthcare Webinars | RosterLab",
    description:
      "Watch on-demand conversations about healthcare staff scheduling. Explore practical experiences with AI-powered scheduling and workforce management.",
    type: "website",
    url: "https://rosterlab.com/us/webinars",
    images: [
      {
        url: "/images/us-images/iStock-1332475767.jpg",
        width: 1200,
        height: 630,
        alt: "RosterLab Webinars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI in Healthcare Webinars | RosterLab",
    description:
      "Watch on-demand conversations about healthcare staff scheduling. Explore practical experiences with AI-powered scheduling and workforce management.",
    images: ["/images/us-images/iStock-1332475767.jpg"],
  },
  alternates: {
    canonical: "https://rosterlab.com/us/webinars",
  },
}, "/us/webinars");

export interface Webinar {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  format: string;
  category: string;
  date: string;
  duration: string;
  speakers?: string;
}

const webinars: Webinar[] = [
  {
    id: "resilient-workforce-ai-rostering",
    title: "Building a Resilient Healthcare Workforce with AI Staff Schedules",
    description:
      "Watch Mike Peterson (Associate Radiology Manager) and Sunny Feng (Co-Founder of RosterLab) discuss how AI can support a more resilient healthcare workforce and reduce time spent on staff scheduling.",
    href: "/us/webinars/building-a-resilient-workforce-with-ai-scheduling-in-healthcare",
    image: "/images/webinars/resilient-healthcare-thumbnail.png",
    format: "Recording",
    category: "Healthcare",
    date: "December 10, 2025",
    duration: "60 mins",
    speakers: "Mike Peterson & Sunny Feng",
  },
];

export default function WebinarsPage() {
  return (
    <SiteLayout>
      <WebinarsPageContent webinars={webinars} />
    </SiteLayout>
  );
}
