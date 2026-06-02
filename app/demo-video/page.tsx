"use client";

import { useEffect } from "react";
import { analytics } from "@/components/analytics/tracking";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import Link from "next/link";

export default function DemoVideoPage() {
  useEffect(() => {
    analytics.track("demo_video_viewed", {
      page_location: window.location.pathname,
      page_url: window.location.href,
    });
  }, []);

  return (
    <SiteLayout>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 min-h-screen py-20">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                RosterLab High-Level Walkthrough
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                See what RosterLab does and how our workforce scheduling solution can benefit your organisation.
              </p>
            </div>

            {/* Video Player */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src="https://www.youtube.com/embed/SvS-2hWe5IM"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="RosterLab Demo Video"
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6 text-center">
                Ready to get started?
              </h2>
              <p className="text-lg text-neutral-600 text-center mb-8 max-w-2xl mx-auto">
                See how RosterLab can transform your staff scheduling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <Link
                  href="/demo"
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="text-center">
                    <div className="font-bold text-lg mb-1">Book a personalised demo</div>
                    <div className="text-sm text-teal-100">
                      See it live
                    </div>
                  </div>
                </Link>

                <Link
                  href="/case-studies"
                  className="flex flex-col items-center gap-3 p-6 bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-neutral-300 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-8 h-8 text-neutral-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div className="text-center">
                    <div className="font-bold text-lg mb-1 text-neutral-900">
                      Case Studies
                    </div>
                    <div className="text-sm text-neutral-600">
                      Success stories
                    </div>
                  </div>
                </Link>

                <Link
                  href="/contact"
                  className="flex flex-col items-center gap-3 p-6 bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-neutral-300 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-8 h-8 text-neutral-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="text-center">
                    <div className="font-bold text-lg mb-1 text-neutral-900">
                      Contact Us
                    </div>
                    <div className="text-sm text-neutral-600">
                      Get in touch
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
