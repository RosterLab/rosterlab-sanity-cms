"use client";

import { DemoBookingBase } from "@/components/booking";

export default function BookADemoClient() {
  const regionalContent = {
    title: "Speak With A Scheduling Expert",
    description:
      "See how RosterLab turns complex staffing requirements into smarter staff schedules with AI built for workforce scheduling.",
    terminology: {
      expert: "Scheduling Expert",
    },
    links: {
      contact: "/us/contact",
      meetingConfirmed: "/us/meeting-confirmed",
    },
    calendlyUrls: {
      standard: "https://calendly.com/d/dv9p-szb-vt5",
      usExtended: "https://calendly.com/d/dv9p-szb-vt5",
    },
  };

  return <DemoBookingBase region="us" regionalContent={regionalContent} />;
}
