"use client";

import { useState, useEffect } from "react";
import CTAModalDemoBooking from "@/components/modals/CTAModalDemoBooking";
import CTAModalCaseStudy from "@/components/modals/CTAModalCaseStudy";
import CTAModalWebinarRecording from "@/components/modals/CTAModalWebinarRecording";
import CTAModalDemoVideo from "@/components/modals/CTAModalDemoVideo";

export default function TestModalPage() {
  // Add noindex meta tag for extra protection
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);
  const [demoBookingOpen, setDemoBookingOpen] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [webinarOpen, setWebinarOpen] = useState(false);
  const [demoVideoOpen, setDemoVideoOpen] = useState(false);

  console.log('🔍 Test Modal Page - State:', {
    demoBookingOpen,
    caseStudyOpen,
    webinarOpen,
    demoVideoOpen,
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">CTA Modal A/B/C/D Testing</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 text-cyan-600">Variant A</h3>
            <p className="text-sm text-gray-600 mb-4">CTA Book Demo</p>
            <button
              onClick={() => {
                console.log('🟢 Button clicked: Demo Booking');
                setDemoBookingOpen(true);
              }}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Test Demo Booking
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 text-emerald-600">Variant B</h3>
            <p className="text-sm text-gray-600 mb-4">Case Study (Gated)</p>
            <button
              onClick={() => {
                console.log('🟢 Button clicked: Case Study');
                setCaseStudyOpen(true);
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Test Case Study
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 text-teal-600">Variant C</h3>
            <p className="text-sm text-gray-600 mb-4">Webinar Recording</p>
            <button
              onClick={() => {
                console.log('🟢 Button clicked: Webinar');
                setWebinarOpen(true);
              }}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Test Webinar Modal
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 text-purple-600">Variant D</h3>
            <p className="text-sm text-gray-600 mb-4">Gated Demo Video</p>
            <button
              onClick={() => {
                console.log('🟢 Button clicked: Demo Video');
                setDemoVideoOpen(true);
              }}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Test Demo Video
            </button>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Test Instructions</h2>
          <ul className="text-left space-y-2 text-sm text-gray-700">
            <li>✅ A/B/C/D test with 4 modal variants (25% split each)</li>
            <li>✅ Variant A will redirect to /book-a-demo with UTM tracking</li>
            <li>✅ Variants B, C & D have gated forms</li>
            <li>✅ Fill out forms to test validation</li>
            <li>✅ Check browser console for analytics events</li>
            <li>✅ Some modals have rolling logos at the bottom</li>
          </ul>
        </div>
      </div>

      {/* Demo Booking Modal */}
      <CTAModalDemoBooking
        isOpen={demoBookingOpen}
        onClose={() => {
          console.log("❌ Demo Booking Modal - Closed");
          setDemoBookingOpen(false);
        }}
        onConversion={() => {
          console.log("✅ Demo Booking Modal - Conversion tracked!");
          setDemoBookingOpen(false);
        }}
        testMode={false}
      />

      {/* Case Study Modal */}
      <CTAModalCaseStudy
        isOpen={caseStudyOpen}
        onClose={() => {
          console.log("❌ Case Study Modal - Closed");
          setCaseStudyOpen(false);
        }}
        onConversion={() => {
          console.log("✅ Case Study Modal - Conversion tracked!");
          setCaseStudyOpen(false);
        }}
        testMode={true}
      />

      {/* Webinar Modal */}
      <CTAModalWebinarRecording
        isOpen={webinarOpen}
        onClose={() => {
          console.log("❌ Webinar Modal - Closed");
          setWebinarOpen(false);
        }}
        onConversion={() => {
          console.log("✅ Webinar Modal - Conversion tracked!");
          setWebinarOpen(false);
        }}
      />

      {/* Demo Video Modal */}
      <CTAModalDemoVideo
        isOpen={demoVideoOpen}
        onClose={() => {
          console.log("❌ Demo Video Modal - Closed");
          setDemoVideoOpen(false);
        }}
        onConversion={() => {
          console.log("✅ Demo Video Modal - Conversion tracked!");
          setDemoVideoOpen(false);
        }}
        testMode={true}
      />
    </div>
  );
}
