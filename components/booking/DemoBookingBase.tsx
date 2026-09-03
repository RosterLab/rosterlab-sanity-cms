"use client";

import { useEffect } from "react";
import Container from "@/components/ui/Container";
import SiteLayout from "@/components/layout/SiteLayout";
import Link from "next/link";
import { useCalendlyWidget } from "@/lib/hooks";
import { useCalendlyEventListener } from "react-calendly";
import { trackDemoBookingComplete } from "@/lib/analytics/events/conversion-events";
import { analytics } from "@/components/analytics/tracking";
import dynamic from "next/dynamic";
import TrustedBy from "@/components/sections/TrustedBy";
import CommercialReviewForm from "./CommercialReviewForm";
import { useMarketAccess } from "@/components/market-access/MarketAccessProvider";
import { markDemoBooked } from "@/lib/analytics/user-behavior-tracker";

// Embed size. Driven by CSS variables in app/globals.css so the height can be
// tuned (and made responsive) in one place.
const CALENDLY_EMBED_STYLES = {
  height: "var(--calendly-embed-height, 700px)",
  minWidth: "var(--calendly-embed-min-width, 320px)",
} as const;

// Lazy load the Calendly widget
const LazyInlineWidget = dynamic(
  () => import("react-calendly").then((mod) => mod.InlineWidget),
  {
    loading: () => (
      <div
        className="flex items-center justify-center bg-gray-50 rounded-lg"
        style={{ height: CALENDLY_EMBED_STYLES.height }}
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
  calendlyUrls: {
    standard: string;
    usExtended: string;
  };
}

interface DemoBookingBaseProps {
  region: "us" | "global";
  regionalContent: RegionalContent;
  className?: string;
  showTrustedBy?: boolean;
}

export default function DemoBookingBase({
  region,
  regionalContent,
  className = "",
  showTrustedBy = false,
}: DemoBookingBaseProps) {
  const { status: marketAccessStatus, decision } = useMarketAccess();
  const canViewCalendar =
    marketAccessStatus === "ready" &&
    decision !== null &&
    decision.demo !== "request_review";
  const selectedCalendlyUrl =
    decision?.demo === "us_24_7"
      ? regionalContent.calendlyUrls.usExtended
      : regionalContent.calendlyUrls.standard;

  // Calendly widget integration
  const { isBooking, calendlyUrl, shouldLoadWidget, widgetContainerRef } =
    useCalendlyWidget({
      config: {
        baseUrl: canViewCalendar ? selectedCalendlyUrl : "",
        queryParams: {
          utm_content: analytics.getDeviceId() || "no_anon_id",
        },
        region,
        redirectPath: regionalContent.links.meetingConfirmed,
        styles: CALENDLY_EMBED_STYLES,
        pageSettings: {
          hideGdprBanner: true,
        },
      },
      shouldLoad: canViewCalendar,
      enablePerformanceOptimizations: true,
    });

  // Track page load and UTM parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source");
      const utmMedium = urlParams.get("utm_medium");
      const utmCampaign = urlParams.get("utm_campaign");
      const utmContent = urlParams.get("utm_content");

      // Track demo page view with UTM parameters
      analytics.track("demo_page_viewed", {
        utm_source: utmSource || undefined,
        utm_medium: utmMedium || undefined,
        utm_campaign: utmCampaign || undefined,
        utm_content: utmContent || undefined,
        page_location: window.location.pathname,
        page_url: window.location.href,
      });
    }
  }, []);

  useEffect(() => {
    if (shouldLoadWidget && calendlyUrl) {
      window.rlTracker?.formStart("book-demo");
    }
  }, [shouldLoadWidget, calendlyUrl]);

  // Handle Calendly events
  useCalendlyEventListener({
    onEventScheduled: async (e: any) => {
      markDemoBooked();
      window.rlTracker?.formSubmit("book-demo");
      const eventData = e?.data || e?.detail || e;

      // Get UTM parameters from URL if present
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source");
      const utmMedium = urlParams.get("utm_medium");
      const utmCampaign = urlParams.get("utm_campaign");
      const utmContent = urlParams.get("utm_content");

      // CRITICAL: Identify the user when they book via Calendly
      const userEmail = eventData?.invitee?.email || eventData?.email;
      const userName = eventData?.invitee?.name || eventData?.name;

      if (userEmail) {
        const nameParts = userName?.split(" ") || [];
        await analytics.identify(userEmail, {
          email: userEmail,
          firstName: nameParts[0] || undefined,
          lastName: nameParts.slice(1).join(" ") || undefined,
        });
      }

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
          user_email: userEmail,
          user_name: userName,
          // Include UTM tracking
          utm_source: utmSource || "direct",
          utm_medium: utmMedium || undefined,
          utm_campaign: utmCampaign || undefined,
          utm_content: utmContent || undefined,
        },
        {
          email: userEmail,
          name: userName,
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
              {decision?.demo === "request_review"
                ? "Request a Commercial Review"
                : regionalContent.title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              RosterLab&apos;s paid solution starts at US$20 per employee per
              month. Team size is collected for context and does not determine
              calendar access.
            </p>
          </div>

          {marketAccessStatus === "loading" ? (
            <div className="flex min-h-[420px] items-center justify-center rounded-lg bg-gray-50">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
                <p className="text-gray-600">Checking demo availability…</p>
              </div>
            </div>
          ) : decision?.demo === "request_review" || !decision ? (
            <div className="pb-12">
              <CommercialReviewForm
                decision={
                  decision ?? {
                    policyVersion: "unavailable",
                    countryCode: null,
                    freeSignup: "hide",
                    demo: "request_review",
                    reasonCode: "unknown_country",
                  }
                }
              />
            </div>
          ) : (
            <>
              <div
                ref={widgetContainerRef}
                className="relative pb-8 lg:pb-0"
                style={{ minHeight: CALENDLY_EMBED_STYLES.height }}
              >
                {shouldLoadWidget && calendlyUrl ? (
                  <LazyInlineWidget
                    url={calendlyUrl}
                    styles={CALENDLY_EMBED_STYLES}
                    pageSettings={{ hideGdprBanner: true }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center bg-gray-50 rounded-lg"
                    style={{ height: CALENDLY_EMBED_STYLES.height }}
                  >
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600">Loading calendar...</p>
                    </div>
                  </div>
                )}
                {isBooking && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg z-50">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
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

              <div className="hidden lg:block text-center -mt-10 pb-8">
                <p className="text-gray-600">
                  Can&apos;t find a suitable time?{" "}
                  <Link
                    href={regionalContent.links.contact}
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Get in touch
                  </Link>
                </p>
              </div>
            </>
          )}
        </Container>

        {showTrustedBy && <TrustedBy />}
      </div>
    </SiteLayout>
  );
}
