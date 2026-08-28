import HeroNew from "@/components/sections/HeroNew";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import FeatureTestimonial from "@/components/sections/FeatureTestimonial";
import BenefitsNew from "@/components/sections/BenefitsNew";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import IndustrySolutionsNew from "@/components/sections/IndustrySolutionsNew";
import TestimonialsNew from "@/components/sections/TestimonialsNew";
import FinalCTA from "@/components/sections/FinalCTA";
import DotFocalOverlay from "@/components/sections/DotFocalOverlay";
import { withHreflang } from "@/components/seo/HreflangTags";
import {
  HERO_CONTENT_US,
  TRUSTED_BY_HEADING_US,
  FEATURE_TESTIMONIAL_US,
  BENEFIT_TABS_US,
  INDUSTRIES_US,
  INDUSTRIES_HEADING_US,
  TESTIMONIALS_US,
  FEATURES_US,
  FEATURES_HEADING_US,
  FINAL_CTA_HEADING_US,
} from "@/app/us/landing-content";

// ISR: Revalidate every 1 hour (mirrors the AU landing page)
export const revalidate = 3600;

export const metadata = withHreflang(
  {
    title: "RosterLab - AI Staff Scheduling Software for Complex Teams",
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

export default function Home() {
  return (
    <div className="relative bg-white">
      <DotFocalOverlay />
      <div className="relative z-10">
        <HeroNew content={HERO_CONTENT_US} />
        <TrustedByDualRow heading={TRUSTED_BY_HEADING_US} />
        <FeatureTestimonial content={FEATURE_TESTIMONIAL_US} />
        <BenefitsNew tabs={BENEFIT_TABS_US} />
        <IndustrySolutionsNew
          industries={INDUSTRIES_US}
          heading={INDUSTRIES_HEADING_US}
        />
        <TestimonialsNew testimonials={TESTIMONIALS_US} />
        <FeaturesGrid features={FEATURES_US} heading={FEATURES_HEADING_US} />
        <FinalCTA heading={FINAL_CTA_HEADING_US} />
      </div>
    </div>
  );
}
