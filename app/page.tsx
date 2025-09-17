import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Benefits from "@/components/sections/Benefits";
import Onboarding from "@/components/sections/Onboarding";
import IndustrySolutions from "@/components/sections/IndustrySolutions";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata = {
  title: "RosterLab - AI Staff Rostering Software for Complex Teams",
  description:
    "Generate fair, optimised shift rosters with AI. RosterLab schedules complex patterns, balances workloads, and reduces admin by 95%.",
  alternates: {
    canonical: "https://rosterlab.com",
  },
  openGraph: {
    title: "RosterLab - AI Staff Rostering Software for Complex Teams",
    description:
      "Generate fair, optimised shift rosters with AI. RosterLab schedules complex patterns, balances workloads, and reduces admin by 95%.",
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
    title: "RosterLab - AI Staff Rostering Software for Complex Teams",
    description:
      "Generate fair, optimised shift rosters with AI. RosterLab schedules complex patterns, balances workloads, and reduces admin by 95%.",
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
