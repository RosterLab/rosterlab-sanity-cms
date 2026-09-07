"use client";

import LeadCaptureForm from "@/components/forms/LeadCaptureForm";

export default function WaitlistForm() {
  return (
    <LeadCaptureForm
      source="ai-assistant-waitlist"
      submitLabel="Join the waitlist"
      successMessage="Thanks — we'll keep you updated."
    />
  );
}
