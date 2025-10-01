"use client";

import { InteractiveDemoBase } from "@/components/demos";

export default function StaffRosteringInteractiveDemoClient() {
  const regionalContent = {
    title: "See RosterLab in Action",
    subtitle:
      "Discover how our AI-powered rostering platform can save your healthcare team 90% of scheduling time while improving staff satisfaction and operational efficiency.",
    terminology: {
      scheduling: "rostering",
      schedules: "rosters",
      platform: "rostering platform",
      challenges: "Rostering Challenges",
    },
    benefits: {
      timeSaving: {
        title: "90% Time Saving",
        description: "Generate rosters in minutes, not hours",
      },
      compliance: {
        title: "100% Compliant",
        description: "Guaranteed to meet union and contract obligations",
      },
      satisfaction: {
        title: "Better Staff Satisfaction",
        description: "Fairer, safer rosters for your team",
      },
    },
    cta: {
      title: "Talk to Us About your Rostering Challenges",
      subtitle: "Book in a quick chat with someone from our team.",
      bookDemo: "Book a demo",
      contact: "Contact us",
    },
    links: {
      bookDemo: "/book-a-demo",
      contact: "/contact",
    },
    demoUrls: {
      desktop: "https://demo.arcade.software/qKV5GmMinypq2yXM19Xi?embed",
      mobile: "https://www.youtube.com/embed/V-lRIaiD3mQ",
    },
  };

  return (
    <InteractiveDemoBase region="global" regionalContent={regionalContent} />
  );
}
