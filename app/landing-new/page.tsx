import type { Metadata } from "next";
import HeaderHideOnScroll from "./HeaderHideOnScroll";
import HeroNew from "@/components/sections/HeroNew";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import FeatureTestimonial from "@/components/sections/FeatureTestimonial";
import BenefitsNew from "@/components/sections/BenefitsNew";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import IndustrySolutionsNew from "@/components/sections/IndustrySolutionsNew";
import TestimonialsNew from "@/components/sections/TestimonialsNew";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Landing Page — Work In Progress",
  robots: { index: false, follow: false, nocache: true },
};

export default function LandingNew() {
  return (
    <div className="relative bg-white">
      {/* Page-wide dot overlay — masked to concentrate around 3 focal
          points down the page instead of blanketing every section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d4d8de 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: [
            "radial-gradient(ellipse 40% 18% at 50% 22%, black 0%, transparent 70%)",
            "radial-gradient(ellipse 45% 15% at 50% 55%, black 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 15% at 50% 85%, black 0%, transparent 70%)",
          ].join(", "),
          WebkitMaskImage: [
            "radial-gradient(ellipse 40% 18% at 50% 22%, black 0%, transparent 70%)",
            "radial-gradient(ellipse 45% 15% at 50% 55%, black 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 15% at 50% 85%, black 0%, transparent 70%)",
          ].join(", "),
          maskComposite: "add",
          WebkitMaskComposite: "source-over",
        }}
      />
      <div className="relative z-10">
        <HeaderHideOnScroll />
        <HeroNew />
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
