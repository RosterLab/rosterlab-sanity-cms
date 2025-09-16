"use client";

import { InteractiveDemoBase } from "@/components/demos";

export default function ProductTourClient() {
  const regionalContent = {
    title: "See RosterLab in Action",
    subtitle:
      "Discover how our AI-powered scheduling platform can save your healthcare team 90% of scheduling time while improving staff satisfaction and operational efficiency.",
    terminology: {
      scheduling: "scheduling",
      schedules: "schedules",
      platform: "scheduling platform",
      challenges: "Scheduling Challenges",
    },
    benefits: {
      timeSaving: {
        title: "90% Time Saving",
        description: "Generate schedules in minutes, not hours",
      },
      compliance: {
        title: "100% Compliant",
        description: "Guaranteed to meet union and contract obligations",
      },
      satisfaction: {
        title: "Better Staff Satisfaction",
        description: "Fairer, safer schedules for your team",
      },
    },
    cta: {
      title: "Talk to Us About your Scheduling Challenges",
      subtitle: "Book in a quick chat with someone from our team.",
      bookDemo: "Book a demo",
      contact: "Contact us",
    },
    links: {
      bookDemo: "/us/book-a-demo",
      contact: "/us/contact",
    },
    demoUrls: {
      desktop: "https://demo.arcade.software/qKV5GmMinypq2yXM19Xi?embed",
      mobile: "https://www.youtube.com/embed/V-lRIaiD3mQ",
    },
  };

  return <InteractiveDemoBase region="us" regionalContent={regionalContent} />;
}
