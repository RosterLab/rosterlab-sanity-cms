"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import HiClock from "@/components/icons/HiClock";
import HiShieldCheck from "@/components/icons/HiShieldCheck";
import HiUsers from "@/components/icons/HiUsers";
import { useEffect, useState } from "react";

interface RegionalContent {
  title: string;
  subtitle: string;
  terminology: {
    scheduling: string; // "scheduling" or "rostering"
    schedules: string; // "schedules" or "rosters"
    platform: string; // "scheduling platform" or "rostering platform"
    challenges: string; // "Scheduling Challenges" or "Rostering Challenges"
  };
  benefits: {
    timeSaving: {
      title: string;
      description: string;
    };
    compliance: {
      title: string;
      description: string;
    };
    satisfaction: {
      title: string;
      description: string;
    };
  };
  cta: {
    title: string;
    subtitle: string;
    bookDemo: string;
    contact: string;
  };
  links: {
    bookDemo: string;
    contact: string;
  };
  demoUrls: {
    desktop: string;
    mobile: string;
  };
}

interface InteractiveDemoBaseProps {
  region: "us" | "global";
  regionalContent: RegionalContent;
  className?: string;
}

export default function InteractiveDemoBase({
  regionalContent,
  className = "",
}: InteractiveDemoBaseProps) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobileOrTablet(width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <SiteLayout>
      <div
        className={`py-16 bg-gradient-to-br from-blue-50 to-primary-50 min-h-screen ${className}`}
      >
        <Container>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              {regionalContent.title}
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              {regionalContent.subtitle}
            </p>

            {/* Interactive Demo */}
            <div className="relative max-w-4xl mx-auto mb-12">
              <div className="relative rounded-lg overflow-hidden aspect-video shadow-2xl">
                {isMobileOrTablet ? (
                  <iframe
                    src={regionalContent.demoUrls.mobile}
                    title="RosterLab Demo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                ) : (
                  <iframe
                    title="Rosterlab interactive media"
                    loading="lazy"
                    className="w-full h-full"
                    allowFullScreen
                    src={regionalContent.demoUrls.desktop}
                  />
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom CTA - Full Width */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 text-white">
        <Container>
          {/* Benefits Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiClock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">
                {regionalContent.benefits.timeSaving.title}
              </h3>
              <p className="text-white/90 text-sm">
                {regionalContent.benefits.timeSaving.description}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">
                {regionalContent.benefits.compliance.title}
              </h3>
              <p className="text-white/90 text-sm">
                {regionalContent.benefits.compliance.description}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiUsers className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">
                {regionalContent.benefits.satisfaction.title}
              </h3>
              <p className="text-white/90 text-sm">
                {regionalContent.benefits.satisfaction.description}
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">
              {regionalContent.cta.title}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {regionalContent.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href={regionalContent.links.bookDemo}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
                analyticsLabel="Book a demo"
                analyticsLocation="Interactive Demo CTA"
                analyticsProperties={{ cta_type: "demo" }}
              >
                {regionalContent.cta.bookDemo}
              </Button>
              <Button
                href={regionalContent.links.contact}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md font-medium transition-colors"
                analyticsLabel="Contact us"
                analyticsLocation="Interactive Demo CTA"
                analyticsProperties={{ cta_type: "contact" }}
              >
                {regionalContent.cta.contact}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
