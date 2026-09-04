import HeroAttio from "@/components/sections/HeroAttio";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import FeatureTestimonial from "@/components/sections/FeatureTestimonial";
import BenefitsNew from "@/components/sections/BenefitsNew";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import IndustrySolutionsNew from "@/components/sections/IndustrySolutionsNew";
import TestimonialsNew from "@/components/sections/TestimonialsNew";
import FinalCTA from "@/components/sections/FinalCTA";
import DotFocalOverlay from "@/components/sections/DotFocalOverlay";

export const metadata = {
  title: "Hero Layout Preview",
  robots: { index: false, follow: false },
};

/**
 * The live landing page with the new hero swapped in for HeroNew, so the hero
 * can be judged against the sections that actually follow it. Everything below
 * the hero is the same set, in the same order, as app/page.tsx.
 */
export default function TestHeroPage() {
  return (
    <div className="relative bg-white">
      <DotFocalOverlay />
      <div className="relative z-10">
        <HeroAttio />
        <TrustedByDualRow />
        <FeatureTestimonial />
        <BenefitsNew />
        <IndustrySolutionsNew />
        <TestimonialsNew />
        <FeaturesGrid />
        <FinalCTA />
      </div>
    </div>
  );
}
