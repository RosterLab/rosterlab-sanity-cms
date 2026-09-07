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
    calendlyUrls: {
      standard:
        process.env.NEXT_PUBLIC_CALENDLY_STANDARD_URL ||
        "https://calendly.com/d/cw2v-vw3-j2z",
      usExtended:
        process.env.NEXT_PUBLIC_CALENDLY_US_24_7_URL ||
        "https://calendly.com/d/cw2v-vw3-j2z",
    },
  };

  return <DemoBookingBase region="us" regionalContent={regionalContent} />;
}
