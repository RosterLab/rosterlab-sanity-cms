import LandingHero from "@/components/sections/LandingHero";
import FeatureTestimonial from "@/components/sections/FeatureTestimonial";
import BenefitsNew from "@/components/sections/BenefitsNew";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import OttoSection from "@/components/sections/OttoSection";
import {
  HealthcareWorkforceSection,
  OtherIndustriesSection,
} from "@/components/sections/IndustriesSection";
import TestimonialsNew from "@/components/sections/TestimonialsNew";
import FinalCTA from "@/components/sections/FinalCTA";
import DotFocalOverlay from "@/components/sections/DotFocalOverlay";
import SectionDivider from "@/components/ui/SectionDivider";
import { withHreflang } from "@/components/seo/HreflangTags";
import {
  HERO_CONTENT_US,
  TRUSTED_BY_HEADING_US,
  FEATURE_TESTIMONIAL_US,
  BENEFIT_TABS_US,
  CAPABILITIES_US,
  CAPABILITIES_HEADING_US,
  OTTO_COPY_US,
  WORKFORCE_CONTENT_US,
  TESTIMONIALS_US,
  FEATURED_CASE_STUDY_US,
  OTHER_INDUSTRIES_CONTENT_US,
  FINAL_CTA_US,
} from "@/app/us/landing-content";

// ISR: Revalidate every 1 hour (mirrors the AU landing page)
export const revalidate = 3600;

export const metadata = withHreflang(
  {
    title: "AI Staff Scheduling Software for Complex Teams",
    description:
      "AI staff scheduling software that automatically builds fair, compliant schedules for healthcare & other complex teams - cut admin by 90% and boost coverage.",
    alternates: {
      canonical: "https://rosterlab.com/us",
    },
    openGraph: {
      title: "RosterLab - AI Staff Scheduling Software for Complex Teams",
      description:
        "AI staff scheduling software that automatically builds fair, compliant schedules for healthcare & other complex teams - cut admin by 90% and boost coverage.",
      type: "website",
      url: "https://rosterlab.com/us",
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
      title: "RosterLab - AI Staff Scheduling Software for Complex Teams",
      description:
        "AI staff scheduling software that automatically builds fair, compliant schedules for healthcare & other complex teams - cut admin by 90% and boost coverage.",
      images: ["/images/og-images/Home.png"],
    },
  },
  "/us",
);

/* Mirrors the AU/NZ homepage section for section — see app/page.tsx — with
   US copy from landing-content.ts. */
// A light wash of the brand blue, a shade under the testimonials band's 7%.
const TINT = "bg-[rgba(55,121,221,0.06)]";

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
        <LandingHero
          content={HERO_CONTENT_US}
          trustedHeading={TRUSTED_BY_HEADING_US}
        />

        {/* Backgrounds strictly alternate so no two neighbours match, as on
            the AU page. */}
        <SectionFrame>
          <FeatureTestimonial content={FEATURE_TESTIMONIAL_US} />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame tint>
          <BenefitsNew tabs={BENEFIT_TABS_US} />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame>
          <CapabilitiesSection
            capabilities={CAPABILITIES_US}
            heading={CAPABILITIES_HEADING_US}
          />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame tint>
          <OttoSection copy={OTTO_COPY_US} />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame>
          <HealthcareWorkforceSection content={WORKFORCE_CONTENT_US} />
        </SectionFrame>

        {/* Own curved band, top and bottom — sits out of the ruled rhythm. */}
        <TestimonialsNew
          testimonials={TESTIMONIALS_US}
          isUS
          featuredCaseStudy={FEATURED_CASE_STUDY_US}
        />

        <SectionFrame>
          <OtherIndustriesSection content={OTHER_INDUSTRIES_CONTENT_US} />
        </SectionFrame>
        <SectionDivider />

        <FinalCTA
          heading={FINAL_CTA_US.heading}
          description={FINAL_CTA_US.description}
          isUS
          progressiveForm
        />
      </div>
    </div>
  );
}
