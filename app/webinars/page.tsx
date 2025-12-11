import { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import WebinarsPageContent from "./WebinarsPageContent";

export const metadata: Metadata = {
  title: "AI in Healthcare Webinars - RosterLab",
  description:
    "Join our expert-led webinars on AI-powered healthcare workforce management. Learn best practices, discover new features, and connect with industry leaders.",
  openGraph: {
    title: "AI in Healthcare Webinars | RosterLab",
    description:
      "Join our expert-led webinars on AI-powered healthcare workforce management. Learn best practices, discover new features, and connect with industry leaders.",
    type: "website",
    url: "https://www.rosterlab.com/webinars",
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
      "Join our expert-led webinars on AI-powered healthcare workforce management. Learn best practices, discover new features, and connect with industry leaders.",
    images: ["/images/us-images/iStock-1332475767.jpg"],
  },
  alternates: {
    canonical: "https://www.rosterlab.com/webinars",
  },
};

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
    title: "Building a Resilient Healthcare Workforce with AI Staff Rosters",
    description:
      "Passionate about building smarter, more sustainable healthcare operations? There's still time to register for our first ever AI in Healthcare webinar this week. Join Mike Peterson (Associate Radiology Manager) and Sunny Feng (Co-Founder of RosterLab) as they dive into how AI can help you save hundreds of hours on staff rostering.",
    href: "/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare",
    image: "/images/webinars/resilient-healthcare-thumbnail.png",
    format: "Recording",
    category: "Healthcare",
    date: "10th December 2025",
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
