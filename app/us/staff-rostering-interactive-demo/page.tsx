import { Metadata } from "next";
import StaffSchedulingInteractiveDemoClient from "./client";
import PageWrapper from "./PageWrapper";

export const metadata: Metadata = {
  title: "Staff Scheduling Interactive Demo - RosterLab",
  description:
    "Try RosterLab's interactive scheduling demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.",
  alternates: {
    canonical: "https://rosterlab.com/us/staff-rostering-interactive-demo",
  },
  openGraph: {
    title: "Staff Scheduling Interactive Demo - RosterLab",
    description:
      "Try RosterLab's interactive scheduling demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.",
    type: "website",
    url: "https://rosterlab.com/us/staff-rostering-interactive-demo",
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
    title: "Staff Scheduling Interactive Demo - RosterLab",
    description:
      "Try RosterLab's interactive scheduling demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.",
    images: ["/images/og-images/InteractiveDemo.png"],
  },
};

export default function StaffSchedulingInteractiveDemo() {
  return (
    <PageWrapper>
      <StaffSchedulingInteractiveDemoClient />
    </PageWrapper>
  );
}