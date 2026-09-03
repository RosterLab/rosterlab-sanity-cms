"use client";

import LeadCaptureForm from "./LeadCaptureForm";

export default function ContactFormWrapper() {
  return (
    <LeadCaptureForm
      source="contact"
      submitLabel="Send message"
      showPhone
      showMessage
      messageLabel="Tell us about your rostering challenges"
      successMessage="Thanks — your message has been sent to the RosterLab team."
    />
  );
}
