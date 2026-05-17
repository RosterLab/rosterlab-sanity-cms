"use client";

import { useEffect } from "react";
import { trackFormSubmission } from "@/lib/analytics/events/conversion-events";
import { analytics } from "@/components/analytics/tracking";

interface HubSpotFormCallback {
  type: "hsFormCallback";
  eventName: "onFormReady" | "onFormSubmitted";
  id: string; // Form GUID
  data?: {
    submissionValues?: Record<string, any>;
    formGuid?: string;
    portalId?: string;
    pageUrl?: string;
    pageName?: string;
    redirectUrl?: string;
    formName?: string;
  };
}

const FORM_GUID_TO_NAME: Record<string, string> = {
  "77e5a8c4-4303-4681-8c92-afa7b070380c": "contact",
  "8b313479-637e-4725-8b9e-3fe8cdae6077": "excel-template",
  "b49cff03-442a-490a-8357-aa1672058a31": "timesheet-template",
  "af8acfa7-f7fc-4da6-8d08-1c3f2458fb5e": "shift-swap-template",
  "0dae293b-6e69-4fb0-9af9-dec04f54865a": "employee-of-month-template",
  "dc7c7138-f03a-40b1-bc97-335fc28ddcd6": "newsletter",
  "7a140682-3e29-470f-a3b0-10c8d97beb02": "hubspot-default",
};

/**
 * HubSpot Form Listener Component
 *
 * This component listens for HubSpot form submission events and tracks them
 * in both Amplitude and GTM. It should be included on any page that has a
 * HubSpot form.
 *
 * @example
 * <HubSpotFormListener />
 */
export default function HubSpotFormListener() {
  useEffect(() => {
    console.log(
      "[HubSpotFormListener] Component mounted, listening for form submissions",
    );

    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== "hsFormCallback") return;

      const formGuid = event.data.id;
      const formName = FORM_GUID_TO_NAME[formGuid] || formGuid;

      if (event.data.eventName === "onFormReady") {
        window.rlTracker?.formStart(formName);
        return;
      }

      // Type guard to check if it's a HubSpot form submission event
      if (event.data.eventName === "onFormSubmitted") {
        window.rlTracker?.formSubmit(formName);
        console.log("[HubSpotFormListener] HubSpot form submission detected!");
        const formData = event.data as HubSpotFormCallback;

        // Extract submission values if available
        const submissionValues = formData.data?.submissionValues || {};

        console.log("[HubSpotFormListener] Form data:", {
          formGuid: formData.id,
          formName: formData.data?.formName,
          submissionValues: submissionValues,
        });

        // If email is provided, identify the user
        if (submissionValues.email) {
          try {
            console.log(
              "[HubSpotFormListener] Identifying user with email:",
              submissionValues.email,
            );

            // Build user properties
            const userProperties: Record<string, any> = {
              email: submissionValues.email,
            };

            if (submissionValues.firstname) {
              userProperties.first_name = submissionValues.firstname;
            }
            if (submissionValues.lastname) {
              userProperties.last_name = submissionValues.lastname;
            }
            if (submissionValues.company) {
              userProperties.company = submissionValues.company;
            }
            if (submissionValues.phone || submissionValues.mobilephone) {
              userProperties.phone =
                submissionValues.phone || submissionValues.mobilephone;
            }

            // Identify user with email as the user ID
            analytics.identify(submissionValues.email, userProperties);

            console.log("[HubSpotFormListener] User identified successfully");
          } catch (error) {
            console.error(
              "[HubSpotFormListener] Error identifying user:",
              error,
            );
          }
        }

        // Track in Amplitude
        try {
          // Log current session before tracking
          console.log("[HubSpotFormListener] Session before form tracking:", {
            deviceId: analytics.getDeviceId(),
            userId: analytics.getUserId(),
          });

          trackFormSubmission({
            form_guid: formData.id,
            form_name: formData.data?.formName,
            page_url: formData.data?.pageUrl || window.location.href,
            page_name: formData.data?.pageName || document.title,
            portal_id: formData.data?.portalId,
            redirect_url: formData.data?.redirectUrl,
            page_location: window.location.pathname,
            // Include common form fields if they exist
            user_email: submissionValues.email,
            user_name:
              submissionValues.firstname && submissionValues.lastname
                ? `${submissionValues.firstname} ${submissionValues.lastname}`
                : submissionValues.fullname,
            company_name: submissionValues.company,
            phone_number:
              submissionValues.phone || submissionValues.mobilephone,
            // Include all submission values as custom properties
            submission_data: submissionValues,
          });
          console.log(
            "[HubSpotFormListener] Successfully tracked form submission to Amplitude",
          );

          // If form has a redirect URL, add a flag to prevent new session on redirect
          if (formData.data?.redirectUrl) {
            console.log(
              "[HubSpotFormListener] Form will redirect to:",
              formData.data.redirectUrl,
            );
            // Store flag in sessionStorage to maintain session across redirect
            if (typeof window !== "undefined") {
              window.sessionStorage.setItem("amplitude_form_redirect", "true");
              setTimeout(() => {
                window.sessionStorage.removeItem("amplitude_form_redirect");
              }, 5000); // Remove flag after 5 seconds
            }
          }
        } catch (error) {
          console.error(
            "[HubSpotFormListener] Error tracking form submission:",
            error,
          );
        }

        // GTM dataLayer push is already handled by trackFormSubmission()
        // Removed duplicate push to prevent double tracking

        // Log for debugging (remove in production)
        if (process.env.NODE_ENV === "development") {
          console.log("Form submission tracked:", {
            formGuid: formData.id,
            formName: formData.data?.formName,
            email: submissionValues.email,
          });
        }
      }
    };

    // Add event listener
    window.addEventListener("message", handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
