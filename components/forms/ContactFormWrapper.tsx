"use client";

import LeadCaptureForm from "./LeadCaptureForm";
import { usePathname } from "next/navigation";

export default function ContactFormWrapper({
  progressive = false,
}: {
  /** See LeadCaptureForm's `progressive`. */
  progressive?: boolean;
} = {}) {
  const pathname = usePathname();
  const isUS = pathname === "/us" || pathname?.startsWith("/us/");
  return (
    <LeadCaptureForm
      source="contact"
      submitLabel="Send message"
      showMessage
      contactQualification
      progressive={progressive}
      messageLabel={
        isUS
          ? "Tell us about your scheduling challenges"
          : "Tell us about your rostering challenges"
      }
      successMessage="Thanks — your message has been sent to the RosterLab team."
    />
  );
}
