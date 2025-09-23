import Hero from "@/app/us/components/Hero";
import TrustedBy from "@/app/us/components/TrustedBy";
import Benefits from "@/app/us/components/Benefits";
import Onboarding from "@/app/us/components/Onboarding";
import IndustrySolutions from "@/app/us/components/IndustrySolutions";
import Testimonials from "@/app/us/components/Testimonials";
import FAQ from "@/app/us/components/FAQ";
import FinalCTA from "@/app/us/components/FinalCTA";
import { withHreflang } from "@/components/seo/HreflangTags";

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
    <>
      <Hero />

      <TrustedBy />
      <Benefits />
      <Onboarding />
      <IndustrySolutions />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
