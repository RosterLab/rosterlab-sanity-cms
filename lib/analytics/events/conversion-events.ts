/**
 * Centralized Conversion Events for Segment
 *
 * This file contains all conversion-related events for easy management
 * by multiple team members. Each event is well-documented with its
 * properties and usage.
 */

import { analytics } from "@/components/analytics/Segment";

// Event names as constants for consistency
export const CONVERSION_EVENTS = {
  DEMO_BOOKING_COMPLETE: "demo_booking_complete",
  FORM_SUBMITTED: "form_submitted",
  FORM_SUBMISSION: "form_submission",
  TRIAL_STARTED: "trial_started",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
} as const;

// Type definitions for event properties
export interface DemoBookingProperties {
  form_guid: string;
  organizer_name: string;
  is_meeting_paid: boolean;
  meeting_date: string;
  duration_minutes: number;
  meeting_type?: string;
  page_location?: string;
  // User properties from form
  user_email?: string;
  user_name?: string;
  company_name?: string;
  company_size?: string;
  user_role?: string;
  phone_number?: string;
}

/**
 * Track demo booking completion
 *
 * @param properties - Demo booking event properties
 * @param userProperties - Optional user properties to identify the user
 *
 * @example
 * trackDemoBookingComplete({
 *   form_guid: 'abc123',
 *   organizer_name: 'John Doe',
 *   is_meeting_paid: false,
 *   meeting_date: '2024-01-15',
 *   duration_minutes: 30
 * }, {
 *   email: 'user@example.com',
 *   company: 'Example Corp'
 * });
 */
export const trackDemoBookingComplete = (
  properties: DemoBookingProperties,
  userProperties?: {
    email?: string;
    company?: string;
    name?: string;
    role?: string;
    phone?: string;
  },
) => {
  console.log("trackDemoBookingComplete called with:", {
    properties,
    userProperties,
  });

  // Track the event with email explicitly in event properties
  analytics.track(CONVERSION_EVENTS.DEMO_BOOKING_COMPLETE, {
    ...properties,
    email: properties.user_email, // Also include email as a top-level property
    timestamp: new Date().toISOString(),
    // Add any additional context
    source: "calendly",
  });

  // Set user properties if provided
  if (userProperties && Object.keys(userProperties).length > 0) {
    // Clean up undefined values
    const cleanUserProps = Object.fromEntries(
      Object.entries(userProperties).filter(
        ([, value]) => value !== undefined && value !== null,
      ),
    );

    if (Object.keys(cleanUserProps).length > 0) {
      console.log("Setting user properties:", cleanUserProps);
      analytics.setUserProperties(cleanUserProps);

      // If email is provided, use it as user ID for better tracking
      if (cleanUserProps.email) {
        console.log("Identifying user with email:", cleanUserProps.email);
        analytics.identify(cleanUserProps.email, cleanUserProps);
      }
    }
  }

  // Also push to dataLayer for GTM (dual tracking)
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "demo_booking_complete",
      amplitude_event_sent: true,
      ...properties,
    });
  }
};

/**
 * Generic form submission tracking
 */
export const trackFormSubmitted = (
  formName: string,
  formType: string,
  properties?: Record<string, any>,
) => {
  analytics.track(CONVERSION_EVENTS.FORM_SUBMITTED, {
    form_name: formName,
    form_type: formType,
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track trial start
 */
export const trackTrialStarted = (
  planType: string,
  properties?: Record<string, any>,
) => {
  analytics.track(CONVERSION_EVENTS.TRIAL_STARTED, {
    plan_type: planType,
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track contact form submission
 */
export const trackContactFormSubmitted = (
  subject: string,
  properties?: Record<string, any>,
) => {
  analytics.track(CONVERSION_EVENTS.CONTACT_FORM_SUBMITTED, {
    subject,
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track HubSpot form submission
 *
 * @param properties - Form submission event properties
 *
 * @example
 * trackFormSubmission({
 *   form_guid: 'abc123',
 *   form_name: 'Contact Form',
 *   user_email: 'user@example.com'
 * });
 */
export const trackFormSubmission = (properties: {
  form_guid: string;
  form_name?: string;
  page_url?: string;
  page_name?: string;
  portal_id?: string;
  redirect_url?: string;
  page_location?: string;
  user_email?: string;
  user_name?: string;
  company_name?: string;
  phone_number?: string;
  submission_data?: Record<string, any>;
}) => {
  // Track the event
  analytics.track(CONVERSION_EVENTS.FORM_SUBMISSION, {
    ...properties,
    timestamp: new Date().toISOString(),
    source: "hubspot_form",
  });

  // Set user properties if email is provided
  if (properties.user_email) {
    const userProperties = {
      email: properties.user_email,
      name: properties.user_name,
      company: properties.company_name,
      phone: properties.phone_number,
    };

    // Remove undefined values
    const cleanUserProps = Object.fromEntries(
      Object.entries(userProperties).filter(([, v]) => v !== undefined),
    );

    if (Object.keys(cleanUserProps).length > 0) {
      analytics.setUserProperties(cleanUserProps);
      analytics.identify(properties.user_email, cleanUserProps);
    }
  }

  // Also push to dataLayer for GTM (dual tracking)
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "hubspot-form-success",
      "hs-form-guid": properties.form_guid,
      amplitude_event_sent: true,
    });
  }
};
