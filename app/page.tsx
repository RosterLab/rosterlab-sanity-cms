import LandingHero from "@/components/sections/LandingHero";
import FeatureTestimonial from "@/components/sections/FeatureTestimonial";
import BenefitsNew from "@/components/sections/BenefitsNew";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import OttoSection from "@/components/sections/OttoSection";
import {
  HealthcareWorkforceSection,
  OtherIndustriesSection,
} from "@/components/sections/IndustriesSection";
import TestimonialsNew, {
  FEATURED_CASE_STUDY_AU,
} from "@/components/sections/TestimonialsNew";
import FinalCTA from "@/components/sections/FinalCTA";
import DotFocalOverlay from "@/components/sections/DotFocalOverlay";
import SectionDivider from "@/components/ui/SectionDivider";
import { withHreflang } from "@/components/seo/HreflangTags";

// ISR: Revalidate every 1 hour
export const revalidate = 3600;

export const metadata = withHreflang(
  {
    title: "AI-Powered Staff Rostering Software | RosterLab",
    description:
      "RosterLab uses AI to generate fair, optimised staff rosters for complex teams in minutes. Built for healthcare, 24/7 operations, and large shift-based teams.",
    alternates: {
      canonical: "https://rosterlab.com",
    },
    openGraph: {
      title: "AI-Powered Staff Rostering Software | RosterLab",
      description:
        "RosterLab uses AI to generate fair, optimised staff rosters for complex teams in minutes. Built for healthcare, 24/7 operations, and large shift-based teams.",
      type: "website",
      url: "https://rosterlab.com",
      images: [
        {
          url: "/images/og-images/Home.png",
          width: 1200,
          height: 630,
          alt: "RosterLab - AI Staff Scheduling Software",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI-Powered Staff Rostering Software | RosterLab",
      description:
        "RosterLab uses AI to generate fair, optimised staff rosters for complex teams in minutes. Built for healthcare, 24/7 operations, and large shift-based teams.",
      images: ["/images/og-images/Home.png"],
    },
  },
  "/",
);

/*
  Section boundaries live here rather than inside each section, so a rule is
  owned by the page and can never be drawn twice where two sections meet.

  The tint is translucent: DotFocalOverlay sits behind this stack, and a solid
  fill would blank its dots out for the tinted section's whole height.
*/
const TINT = "bg-slate-50/70";

/** Wraps a section so it can carry the alternating tint. */
function SectionFrame({
  tint = false,
  children,
}: {
  tint?: boolean;
  children: React.ReactNode;
}) {
  return <div className={`relative ${tint ? TINT : ""}`}>{children}</div>;
}

export default function Home() {
  return (
    <div className="relative bg-white">
      <DotFocalOverlay />
      <div className="relative z-10">
        {/* The hero's rounded bottom is its own edge — a straight rule would
            cut across the curve, so the run of boundaries starts below it. */}
        <LandingHero />

        <SectionFrame tint>
          <FeatureTestimonial />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame>
          <BenefitsNew />
        </SectionFrame>
        <SectionDivider />

        {/* Tinted so it reads as its own band after the benefits tabs; Otto
            below drops its tint so two tinted bands never sit back to back. */}
        <SectionFrame tint>
          <CapabilitiesSection />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame>
          <OttoSection />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame>
          <HealthcareWorkforceSection />
        </SectionFrame>

        {/* TestimonialsNew carries its own tinted band with a curved edge top
            and bottom, so it sits out of the ruled rhythm on both sides. */}
        <TestimonialsNew featuredCaseStudy={FEATURED_CASE_STUDY_AU} />

        <SectionFrame>
          <OtherIndustriesSection />
        </SectionFrame>
        <SectionDivider />

        {/* FeaturesGrid ("Everything you need to run a perfect roster") was
            dropped from this page; the component is kept for reuse and still
            renders on the US page. */}
        <FinalCTA
          heading="Still rostering the hard way?"
          description="See how RosterLab turns your complex staffing requirements into an optimised roster in minutes."
          progressiveForm
        />
      </div>
    </div>
  );
}
