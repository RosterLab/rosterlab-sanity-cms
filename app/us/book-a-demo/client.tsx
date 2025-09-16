"use client";

import { DemoBookingBase } from "@/components/booking";

export default function BookADemoClient() {
  const regionalContent = {
    title: "Speak With A Scheduling Expert",
    terminology: {
      expert: "Scheduling Expert",
    },
    links: {
      contact: "/us/contact",
      meetingConfirmed: "/us/meeting-confirmed",
    },
    calendlyUrl: "https://calendly.com/d/cw2v-vw3-j2z",
  };

  return <DemoBookingBase region="us" regionalContent={regionalContent} />;
}
