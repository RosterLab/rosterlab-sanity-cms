import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Benefits from "@/components/sections/Benefits";
import Onboarding from "@/components/sections/Onboarding";
import IndustrySolutions from "@/components/sections/IndustrySolutions";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";
import { withHreflang } from "@/components/seo/HreflangTags";

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

export default function Home() {
  return (
    <>
      <Hero />

      <TrustedBy />
      <Benefits />
      <Onboarding />
      <IndustrySolutions />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
