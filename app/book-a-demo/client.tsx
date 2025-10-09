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
    calendlyUrl:
      "https://calendly.com/d/csww-rc4-9v6/test-version?hide_event_type_details=1&hide_gdpr_banner=1",
  };

  return <DemoBookingBase region="global" regionalContent={regionalContent} />;
}
