"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import HiClock from "@/components/icons/HiClock";
import HiShieldCheck from "@/components/icons/HiShieldCheck";
import HiUsers from "@/components/icons/HiUsers";
import { useEffect, useState } from "react";

export default function StaffRosteringInteractiveDemoClient() {
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
      <div className="py-16 bg-gradient-to-br from-blue-50 to-primary-50 min-h-screen">
        <Container>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              See RosterLab in Action
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Discover how our AI-powered rostering platform can save your
              healthcare team 90% of scheduling time while improving staff
              satisfaction and operational efficiency.
            </p>

            {/* Interactive Demo */}
            <div className="relative max-w-4xl mx-auto mb-12">
              <div className="relative rounded-lg overflow-hidden aspect-video shadow-2xl">
                {isMobileOrTablet ? (
                  <iframe
                    src="https://www.youtube.com/embed/V-lRIaiD3mQ"
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
                    src="https://demo.arcade.software/qKV5GmMinypq2yXM19Xi?embed"
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
              <h3 className="font-semibold text-white mb-1">90% Time Saving</h3>
              <p className="text-white/90 text-sm">
                Generate rosters in minutes, not hours
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">100% Compliant</h3>
              <p className="text-white/90 text-sm">
                Guaranteed to meet union and contract obligations
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiUsers className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">
                Better Staff Satisfaction
              </h3>
              <p className="text-white/90 text-sm">
                Fairer, safer rosters for your team
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">
              Can't Find a Suitable Time?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Contact us directly and we'll work around your schedule
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="mailto:hello@rosterlab.com"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
                analyticsLabel="Email Us"
                analyticsLocation="Interactive Demo CTA"
                analyticsProperties={{ cta_type: "email", external: true }}
              >
                Email Us
              </Button>
              <Button
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md font-medium transition-colors"
                analyticsLabel="Get Started Today"
                analyticsLocation="Interactive Demo CTA"
                analyticsProperties={{ cta_type: "contact" }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
