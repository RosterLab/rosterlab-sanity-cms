"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import { analytics } from "@/components/analytics/tracking";

const STORAGE_KEY = "rl_whitepaper_unlocked";

export default function WhitepaperUnlockedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has unlocked
    const unlocked = localStorage.getItem(STORAGE_KEY) === "true";

    if (!unlocked) {
      // Redirect back to the main page if not unlocked
      router.push("/whitepapers/rostering-as-a-strategic-workforce-lever");
    } else {
      setIsLoading(false);
      analytics.track("whitepaper_unlocked_page_viewed", {
        page_location: window.location.pathname,
      });
    }
  }, [router]);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen py-20">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Whitepaper Unlocked
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Great! Your whitepaper is ready
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Preview the content below or download the full PDF
              </p>

              {/* Download Button */}
              <a
                href="/whitepapers/rostering-as-a-strategic-workforce-lever.pdf"
                download="RosterLab-Whitepaper-Rostering-as-a-Strategic-Workforce-Lever.pdf"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                onClick={() => {
                  analytics.track("whitepaper_pdf_downloaded", {
                    from: "unlocked_page",
                  });
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Full PDF
              </a>
            </div>

            {/* Key Stats */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 mb-8">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-4 sm:mb-6 text-center">
                Key Results
              </h2>
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">93%</div>
                  <div className="text-xs sm:text-sm md:text-base text-neutral-600 leading-tight">Reduction in rostering time</div>
                  <div className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">120hrs to 8hrs</div>
                </div>
                <div className="text-center border-x border-neutral-200">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">$80K+</div>
                  <div className="text-xs sm:text-sm md:text-base text-neutral-600 leading-tight">Annual savings</div>
                  <div className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">One FTE equiv.</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">600+</div>
                  <div className="text-xs sm:text-sm md:text-base text-neutral-600 leading-tight">Staff preferences met</div>
                  <div className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">Per cycle</div>
                </div>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
              <div className="relative">
                <div className="w-full" style={{ height: "800px" }}>
                  <iframe
                    src="/whitepapers/rostering-as-a-strategic-workforce-lever.pdf#toolbar=1&navpanes=0"
                    className="w-full h-full rounded-lg border border-neutral-200"
                    title="Rostering as a Strategic Workforce Lever - Full Whitepaper"
                  />
                </div>
                <p className="text-center text-sm text-neutral-500 mt-4">
                  Use the navigation controls in the PDF viewer to browse all 13 pages
                </p>
              </div>
            </div>

            {/* CTA - Book Demo */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to transform your rostering?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                See how RosterLab can help your organization achieve similar results
              </p>
              <a
                href="/book-a-demo"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-neutral-100 font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg"
                onClick={() => {
                  analytics.track("book_demo_clicked", {
                    from: "whitepaper_unlocked",
                  });
                }}
              >
                Book a Demo
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
