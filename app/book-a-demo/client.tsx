"use client";

import { DemoBookingBase } from "@/components/booking";

export default function BookADemoClient() {
  const regionalContent = {
    title: "Speak With A Rostering Expert",
    terminology: {
      expert: "Rostering Expert",
    },
    links: {
      contact: "/contact",
      meetingConfirmed: "/meeting-confirmed",
    },
    calendlyUrl: "https://calendly.com/d/cw2v-vw3-j2z",
  };

  return <DemoBookingBase region="global" regionalContent={regionalContent} />;
}
