"use client";

import Container from "@/components/ui/Container";
import SiteLayout from "@/components/layout/SiteLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCalendlyEventListener } from "react-calendly";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { trackDemoBookingComplete } from "@/lib/analytics/events/conversion-events";

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

export default function BookADemoClient() {
  const [isBooking, setIsBooking] = useState(false);
  const [shouldLoadWidget, setShouldLoadWidget] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Prefetch the meeting-confirmed page
    router.prefetch("/meeting-confirmed");

    // Add preconnect for Calendly
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://assets.calendly.com";
    document.head.appendChild(link);

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadWidget(true);
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before visible
        threshold: 0.01,
      },
    );

    if (widgetContainerRef.current) {
      observer.observe(widgetContainerRef.current);
    }

    return () => {
      observer.disconnect();
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [router]);

  // Handle Calendly events
  useCalendlyEventListener({
    onEventScheduled: (e: any) => {
      setIsBooking(true);

      // Extract event details
      const eventData = e.detail;

      // Track in GA4 via dataLayer
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "calendly_meeting_scheduled",
          calendly_event_type: eventData.event?.event_type_name || "demo",
          calendly_event_uri: eventData.event?.uri,
          calendly_invitee_email: eventData.invitee?.email,
          calendly_invitee_name: eventData.invitee?.name,
          calendly_scheduled_date: eventData.event?.start_time,
        });
      }

      // Track in Amplitude
      trackDemoBookingComplete(
        {
          form_guid: eventData.event?.uri || "calendly-demo",
          organizer_name: "RosterLab Team",
          is_meeting_paid: false,
          meeting_date: eventData.event?.start_time || new Date().toISOString(),
          duration_minutes: 30,
          meeting_type: eventData.event?.event_type_name || "demo",
          page_location: window.location.pathname,
          user_email: eventData.invitee?.email,
          user_name: eventData.invitee?.name,
        },
        {
          email: eventData.invitee?.email,
          name: eventData.invitee?.name,
        },
      );

      // Redirect to confirmation page
      setTimeout(() => {
        router.push("/meeting-confirmed");
      }, 50);
    },
    onEventTypeViewed: () => {
      // Track widget view in GA4 (only once)
      if (
        !hasTrackedView &&
        typeof window !== "undefined" &&
        (window as any).dataLayer
      ) {
        (window as any).dataLayer.push({
          event: "calendly_widget_viewed",
          page_location: window.location.pathname,
        });
        setHasTrackedView(true);
      }
    },
  });

  return (
    <SiteLayout>
      <div className="pt-16 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <Container>
          {/* Header */}
          <div className="text-center">
            <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Speak With A Rostering Expert
            </h1>
          </div>

          {/* Calendly Meeting Scheduler Embed */}
          <div
            ref={widgetContainerRef}
            className="relative"
            style={{ minHeight: "700px" }}
          >
            {shouldLoadWidget ? (
              <LazyInlineWidget
                url="https://calendly.com/d/csww-rc4-9v6/test-version?hide_event_type_details=1&hide_gdpr_banner=1"
                styles={{
                  height: "700px",
                  minWidth: "320px",
                }}
                pageSettings={{
                  hideEventTypeDetails: true,
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

          {/* Contact alternative */}
          <div className="text-center -mt-4">
            <p className="text-gray-600">
              Can't find a suitable time?{" "}
              <Link
                href="/contact"
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
