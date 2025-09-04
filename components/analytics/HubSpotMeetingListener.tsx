"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackDemoBookingComplete } from "@/lib/analytics/events/conversion-events";
import { analytics } from "@/components/analytics/Amplitude";

interface HubSpotMeetingPayload {
  meetingBookSucceeded: boolean;
  meetingsPayload?: {
    formGuid: string;
    isPaidMeeting: boolean;
    bookingResponse: {
      postResponse: {
        organizer: {
          name: string;
        };
        contact?: {
          email?: string;
          firstName?: string;
          lastName?: string;
          company?: string;
          jobtitle?: string;
          phone?: string;
        };
      };
      event: {
        dateString: string;
        duration: number; // in milliseconds
      };
    };
  };
}

/**
 * HubSpot Meeting Listener Component
 *
 * This component listens for HubSpot meeting booking events and tracks them
 * in both Amplitude and GTM. It should be included on any page that has a
 * HubSpot meeting scheduler.
 *
 * @example
 * <HubSpotMeetingListener />
 */
export default function HubSpotMeetingListener() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch meeting-confirmed page on component mount
    router.prefetch("/meeting-confirmed");

    const handleMessage = async (event: MessageEvent) => {
      // Type guard to check if it's a HubSpot meeting event
      if (event.data && event.data.meetingBookSucceeded === true) {
        const payload = event.data as HubSpotMeetingPayload;

        if (payload.meetingsPayload) {
          const { meetingsPayload } = payload;
          const contact = meetingsPayload.bookingResponse.postResponse.contact;

          // Log current session info before tracking
          console.log("[HubSpotMeetingListener] Session before demo booking:", {
            deviceId: analytics.getDeviceId(),
            userId: analytics.getUserId(),
          });

          // Store flag to maintain session across redirect
          if (typeof window !== "undefined") {
            const deviceId = analytics.getDeviceId();
            const userId = analytics.getUserId();
            const sessionData = {
              deviceId: deviceId || "",
              userId: userId || "",
              timestamp: Date.now(),
              email: contact?.email || "",
            };

            // Store in multiple places to ensure persistence
            window.sessionStorage.setItem("amplitude_demo_booked", "true");
            window.sessionStorage.setItem(
              "amplitude_session_data",
              JSON.stringify(sessionData),
            );

            // Also store in localStorage as backup
            window.localStorage.setItem(
              "amplitude_demo_redirect",
              JSON.stringify({
                ...sessionData,
                expires: Date.now() + 60000, // Expire after 1 minute
              }),
            );

            console.log(
              "[HubSpotMeetingListener] Stored session data for redirect:",
              sessionData,
            );
          }

          // Track in Amplitude
          trackDemoBookingComplete(
            {
              form_guid: meetingsPayload.formGuid,
              organizer_name:
                meetingsPayload.bookingResponse.postResponse.organizer.name,
              is_meeting_paid: meetingsPayload.isPaidMeeting,
              meeting_date: meetingsPayload.bookingResponse.event.dateString,
              duration_minutes:
                meetingsPayload.bookingResponse.event.duration / 60000,
              page_location: window.location.pathname,
              // Include user info if available
              user_email: contact?.email,
              user_name:
                contact?.firstName && contact?.lastName
                  ? `${contact.firstName} ${contact.lastName}`
                  : undefined,
              company_name: contact?.company,
              user_role: contact?.jobtitle,
              phone_number: contact?.phone,
            },
            // User properties for identification
            contact
              ? {
                  email: contact.email,
                  name:
                    contact.firstName && contact.lastName
                      ? `${contact.firstName} ${contact.lastName}`
                      : undefined,
                  company: contact.company,
                  role: contact.jobtitle,
                  phone: contact.phone,
                }
              : undefined,
          );

          console.log(
            "[HubSpotMeetingListener] Demo booking tracked, expecting redirect to /meeting-confirmed",
          );

          // GTM dataLayer push is already handled by trackDemoBookingComplete()
          // Removed duplicate push to prevent double tracking

          // Log for debugging (remove in production)
          if (process.env.NODE_ENV === "development") {
            console.log("Demo booking tracked:", {
              formGuid: meetingsPayload.formGuid,
              organizer:
                meetingsPayload.bookingResponse.postResponse.organizer.name,
              date: meetingsPayload.bookingResponse.event.dateString,
              contact: contact?.email,
            });
          }

          // Add a minimal delay to ensure all tracking events complete
          // Then use client-side navigation for faster redirect
          setTimeout(() => {
            // Use Next.js router for client-side navigation (faster than window.location)
            router.push("/meeting-confirmed");
          }, 50); // Reduced to 50ms - analytics should use sendBeacon for reliability
        }
      }
    };

    // Add event listener
    window.addEventListener("message", handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  // This component doesn't render anything
  return null;
}
