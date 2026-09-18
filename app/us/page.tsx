import LandingHero from "@/components/sections/LandingHero";
import FeatureTestimonial from "@/components/sections/FeatureTestimonial";
import BenefitsNew from "@/components/sections/BenefitsNew";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import IndustrySolutionsNew from "@/components/sections/IndustrySolutionsNew";
import TestimonialsNew from "@/components/sections/TestimonialsNew";
import FinalCTA from "@/components/sections/FinalCTA";
import DotFocalOverlay from "@/components/sections/DotFocalOverlay";
import SectionDivider from "@/components/ui/SectionDivider";
import SectionCorners, { logoColor } from "@/components/ui/SectionCorners";
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

/* Boundary treatment mirrors the AU/NZ homepage — see app/page.tsx. This page
   has no Otto section, so it carries one rule fewer. */
const TINT = "bg-slate-50/70";

function SectionFrame({
  index,
  tint = false,
  children,
}: {
  index: number;
  tint?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative ${tint ? TINT : ""}`}>
      <SectionCorners color={logoColor(index)} />
      {children}
    </div>
  );
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
        <SectionFrame index={0} tint>
          <FeatureTestimonial content={FEATURE_TESTIMONIAL_US} />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame index={1}>
          <BenefitsNew tabs={BENEFIT_TABS_US} />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame index={2}>
          <IndustrySolutionsNew
            industries={INDUSTRIES_US}
            heading={INDUSTRIES_HEADING_US}
          />
        </SectionFrame>

        {/* Own curved band, top and bottom — sits out of the ruled rhythm and
            the corner marks, which would land on the curve. */}
        <TestimonialsNew testimonials={TESTIMONIALS_US} isUS />

        <SectionFrame index={3}>
          <FeaturesGrid features={FEATURES_US} heading={FEATURES_HEADING_US} />
        </SectionFrame>
        <SectionDivider />

        <FinalCTA heading={FINAL_CTA_HEADING_US} isUS />
      </div>
    </div>
  );
}
