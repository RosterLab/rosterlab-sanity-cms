"use client";

import LeadCaptureForm from "./LeadCaptureForm";

export default function NewsletterFormWrapper() {
  return (
    <LeadCaptureForm
      source="newsletter"
      submitLabel="Subscribe"
      successMessage="Thanks — you're subscribed."
      compact
      showName={false}
      showCompany={false}
    />
  );
}
