"use client";

import Container from "@/components/ui/Container";
import SiteLayout from "@/components/layout/SiteLayout";
import Link from "next/link";
import { useCalendlyWidget } from "@/lib/hooks";
import { useCalendlyEventListener } from "react-calendly";
import { trackDemoBookingComplete } from "@/lib/analytics/events/conversion-events";
import dynamic from "next/dynamic";

// Lazy load the Calendly widget
const LazyInlineWidget = dynamic(
  () => import("react-calendly").then((mod) => mod.InlineWidget),
  {
    loading: () => (
      <div
        className="flex items-center justify-center bg-gray-50 rounded-lg"
        style={{ height: "700px" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    ),
    ssr: false,
  },
);

interface RegionalContent {
  title: string;
  terminology: {
    expert: string; // "Scheduling Expert" or "Rostering Expert"
  };
  links: {
    contact: string;
    meetingConfirmed: string;
  };
  calendlyUrl: string;
}

interface DemoBookingBaseProps {
  region: "us" | "global";
  regionalContent: RegionalContent;
  className?: string;
}

export default function DemoBookingBase({
  region,
  regionalContent,
  className = "",
}: DemoBookingBaseProps) {
  // Calendly widget integration
  const { isBooking, calendlyUrl, shouldLoadWidget, widgetContainerRef } =
    useCalendlyWidget({
      config: {
        baseUrl: regionalContent.calendlyUrl,
        queryParams: {
          // User ID not available at demo booking time
          utm_content: "demo_booking",
        },
        region,
        redirectPath: regionalContent.links.meetingConfirmed,
        styles: {
          height: "700px",
          minWidth: "320px",
        },
        pageSettings: {
          hideGdprBanner: true,
        },
      },
      shouldLoad: true,
      enablePerformanceOptimizations: true,
    });

  // Handle Calendly events
  useCalendlyEventListener({
    onEventScheduled: async (e: any) => {
      const eventData = e?.data || e?.detail || e;

      // Track in Amplitude
      trackDemoBookingComplete(
        {
          form_guid: eventData?.event?.uri || eventData?.uri || "calendly-demo",
          organizer_name: "RosterLab Team",
          is_meeting_paid: false,
          meeting_date:
            eventData?.event?.start_time ||
            eventData?.start_time ||
            new Date().toISOString(),
          duration_minutes: 30,
          meeting_type: "demo",
          page_location: window.location.pathname,
          user_email: eventData?.invitee?.email || eventData?.email,
          user_name: eventData?.invitee?.name || eventData?.name,
        },
        {
          email: eventData?.invitee?.email || eventData?.email,
          name: eventData?.invitee?.name || eventData?.name,
        },
      );
    },
  });

  return (
    <SiteLayout>
      <div
        className={`pt-16 bg-gradient-to-b from-blue-50 to-white min-h-screen ${className}`}
      >
        <Container>
          {/* Header */}
          <div className="text-center">
            <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Speak With A{" "}
              {region === "us" ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                    Scheduling
                  </span>{" "}
                  Expert
                </>
              ) : (
                regionalContent.terminology.expert
              )}
            </h1>
          </div>

          {/* Calendly Meeting Scheduler Embed */}
          <div
            ref={widgetContainerRef}
            className="relative pb-8 lg:pb-0"
            style={{ minHeight: "700px" }}
          >
            {shouldLoadWidget && calendlyUrl ? (
              <LazyInlineWidget
                url={calendlyUrl}
                styles={{
                  height: "700px",
                  minWidth: "320px",
                }}
                pageSettings={{
                  hideGdprBanner: true,
                }}
              />
            ) : (
              <div
                className="flex items-center justify-center bg-gray-50 rounded-lg"
                style={{ height: "700px" }}
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading calendar...</p>
                </div>
              </div>
            )}
            {isBooking && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg z-50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-900 font-medium text-lg mb-2">
                    Confirming your booking...
                  </p>
                  <p className="text-gray-600 text-sm">
                    Please wait while we secure your time slot
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact alternative - Hidden on mobile and tablet */}
          <div className="hidden lg:block text-center -mt-4 pb-8">
            <p className="text-gray-600">
              Can't find a suitable time?{" "}
              <Link
                href={regionalContent.links.contact}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Get in touch
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
