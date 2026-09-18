import LandingHero from "@/components/sections/LandingHero";
import FeatureTestimonial from "@/components/sections/FeatureTestimonial";
import BenefitsNew from "@/components/sections/BenefitsNew";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import OttoSection from "@/components/sections/OttoSection";
import IndustrySolutionsNew from "@/components/sections/IndustrySolutionsNew";
import TestimonialsNew from "@/components/sections/TestimonialsNew";
import FinalCTA from "@/components/sections/FinalCTA";
import DotFocalOverlay from "@/components/sections/DotFocalOverlay";
import SectionDivider from "@/components/ui/SectionDivider";
import SectionCorners, { logoColor } from "@/components/ui/SectionCorners";
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

/**
 * Wraps a section so it can carry its own four corner marks, and optionally
 * the alternating tint. `index` walks the logo's three colours, so each
 * section down the page is marked in a different one.
 */
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
        {/* The hero's rounded bottom is its own edge — a straight rule would
            cut across the curve, so the run of boundaries starts below it. */}
        <LandingHero />

        <SectionFrame index={0} tint>
          <FeatureTestimonial />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame index={1}>
          <BenefitsNew />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame index={2} tint>
          <OttoSection />
        </SectionFrame>
        <SectionDivider />

        <SectionFrame index={3}>
          <IndustrySolutionsNew />
        </SectionFrame>

        {/* TestimonialsNew carries its own tinted band with a curved edge top
            and bottom, so it sits out of the ruled rhythm on both sides — and
            out of the corner marks, which would land on the curve. */}
        <TestimonialsNew />

        <SectionFrame index={4}>
          <FeaturesGrid />
        </SectionFrame>
        <SectionDivider />

        <FinalCTA />
      </div>
    </div>
  );
}
