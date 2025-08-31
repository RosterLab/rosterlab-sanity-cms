import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Benefits from "@/components/sections/Benefits";
import Onboarding from "@/components/sections/Onboarding";
import IndustrySolutions from "@/components/sections/IndustrySolutions";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata = {
  title: "RosterLab - AI Staff Scheduling Software for Complex Teams",
  description:
    "AI staff scheduling software that automatically builds fair, compliant rosters for healthcare and other complex teams - cut admin by 90% and boost coverage.",
  alternates: {
    canonical: "https://rosterlab.com",
  },
  openGraph: {
    title: "RosterLab - AI Staff Scheduling Software for Complex Teams",
    description:
      "AI staff scheduling software that automatically builds fair, compliant rosters for healthcare and other complex teams - cut admin by 90% and boost coverage.",
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
    title: "RosterLab - AI Staff Scheduling Software for Complex Teams",
    description:
      "AI staff scheduling software that automatically builds fair, compliant rosters for healthcare and other complex teams - cut admin by 90% and boost coverage.",
    images: ["/images/og-images/Home.png"],
  },
};

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
