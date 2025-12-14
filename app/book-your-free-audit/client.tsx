"use client";

import { DemoBookingBase } from "@/components/booking";

export default function BookYourFreeAuditClient() {
  const regionalContent = {
    title: "Book Your Free Roster Audit",
    terminology: {
      expert: "Rostering Expert",
    },
    links: {
      contact: "/contact",
      meetingConfirmed: "/meeting-confirmed",
    },
    calendlyUrl: "https://calendly.com/d/cxgr-ksd-j2x",
  };

  return <DemoBookingBase region="global" regionalContent={regionalContent} />;
}
