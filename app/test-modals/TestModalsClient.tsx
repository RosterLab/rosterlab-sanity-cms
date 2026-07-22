"use client";

import { useState } from "react";
import CTAModalDemoBooking from "@/components/modals/CTAModalDemoBooking";
import CTAModalCaseStudy from "@/components/modals/CTAModalCaseStudy";
import CTAModalWebinarRecording from "@/components/modals/CTAModalWebinarRecording";
import CTAModalDemoVideo from "@/components/modals/CTAModalDemoVideo";

type Variant = "A" | "B" | "C" | "D" | null;

const VARIANTS: Array<{
  id: Exclude<Variant, null>;
  label: string;
  description: string;
}> = [
  {
    id: "A",
    label: "Demo Booking",
    description: "Live demo showcase with illustration + trusted-by strip.",
  },
  {
    id: "B",
    label: "Case Study (gated)",
    description: "Gated case study download. No trusted-by strip.",
  },
  {
    id: "C",
    label: "Webinar Recording",
    description: "Whanganui case study webinar + trusted-by strip.",
  },
  {
    id: "D",
    label: "Demo Video (gated)",
    description: "Gated demo video walkthrough + trusted-by strip.",
  },
];

export default function TestModalsClient() {
  const [active, setActive] = useState<Variant>(null);

  const close = () => setActive(null);
  const noop = () => {};

  return (
    <main className="min-h-screen bg-neutral-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Modal preview
        </h1>
        <p className="text-neutral-600 mb-8">
          Internal-only page for previewing the 4 CTA modal variants. Click a
          card to open the modal in test mode (no analytics or state
          side-effects).
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className="text-left bg-white border border-neutral-200 rounded-xl p-6 hover:border-cyan-500 hover:shadow-md transition"
            >
              <div className="text-xs font-semibold text-cyan-600 tracking-wide uppercase mb-1">
                Variant {v.id}
              </div>
              <div className="text-lg font-semibold text-neutral-900 mb-2">
                {v.label}
              </div>
              <p className="text-sm text-neutral-600">{v.description}</p>
            </button>
          ))}
        </div>
      </div>

      {active === "A" && (
        <CTAModalDemoBooking
          isOpen
          onClose={close}
          onConversion={noop}
          testMode
        />
      )}
      {active === "B" && (
        <CTAModalCaseStudy
          isOpen
          onClose={close}
          onConversion={noop}
          testMode
        />
      )}
      {active === "C" && (
        <CTAModalWebinarRecording
          isOpen
          onClose={close}
          onConversion={noop}
        />
      )}
      {active === "D" && (
        <CTAModalDemoVideo
          isOpen
          onClose={close}
          onConversion={noop}
          testMode
        />
      )}
    </main>
  );
}
