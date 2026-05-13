import { analytics } from "@/components/analytics/tracking";
import {
  metaTrackLead,
  metaTrackSchedule,
  metaTrackContact,
  metaTrackSubscribe,
  metaTrackViewContent,
} from "@/lib/analytics/meta-pixel";

// Event names as constants for consistency
export const CONVERSION_EVENTS = {
  DEMO_BOOKING_COMPLETE: "demo_booking_complete",
  FORM_SUBMITTED: "form_submitted",
  FORM_SUBMISSION: "form_submission",
  TRIAL_STARTED: "trial_started",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
  CTA_CLICKED: "cta_clicked",
  PRICING_VIEWED: "pricing_viewed",
  SIGNUP_STARTED: "signup_started",
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

  // Meta Pixel: Lead + Schedule
  const nameParts = properties.user_name?.split(" ") || [];
  const metaUserData = {
    email: properties.user_email,
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(" ") || undefined,
    phone: properties.phone_number,
  };
  metaTrackLead({
    contentName: "Demo Booking",
    value: 500,
    userData: metaUserData,
  });
  metaTrackSchedule({
    contentName: `Demo - ${properties.organizer_name}`,
    userData: metaUserData,
  });
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

  metaTrackContact({
    contentName: subject || "Contact Form",
    value: 200,
    userData: properties?.email ? { email: properties.email } : undefined,
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

  // Meta Pixel: Subscribe for newsletters, Lead for other forms
  const formNameParts = properties.user_name?.split(" ") || [];
  const metaFormUserData = {
    email: properties.user_email,
    firstName: formNameParts[0],
    lastName: formNameParts.slice(1).join(" ") || undefined,
    phone: properties.phone_number,
  };
  const isNewsletter = properties.form_name
    ?.toLowerCase()
    .includes("newsletter");
  if (isNewsletter) {
    metaTrackSubscribe({
      contentName: properties.form_name || "Newsletter Signup",
      value: 10,
      userData: metaFormUserData,
    });
  } else {
    metaTrackLead({
      contentName: properties.form_name || "HubSpot Form",
      value: 50,
      userData: metaFormUserData,
    });
  }
};

/**
 * Track CTA button clicks (standardized event for all call-to-action buttons)
 *
 * @param properties - CTA click event properties
 *
 * @example
 * trackCTAClicked({
 *   cta_name: 'Header: Book demo',
 *   cta_type: 'demo',
 *   page_location: '/pricing',
 *   destination_url: '/book-a-demo'
 * });
 */
export const trackCTAClicked = (properties: {
  cta_name: string;
  cta_type: string;
  page_location?: string;
  destination_url?: string;
  button_text?: string;
  external?: boolean;
  [key: string]: any;
}) => {
  analytics.track(CONVERSION_EVENTS.CTA_CLICKED, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track signup intent (fired alongside cta_clicked when cta_type is 'signup')
 */
export const trackSignupStarted = (properties?: Record<string, any>) => {
  analytics.track(CONVERSION_EVENTS.SIGNUP_STARTED, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track pricing page views
 *
 * @param properties - Pricing page view properties
 *
 * @example
 * trackPricingViewed({
 *   page_location: '/pricing',
 *   page_url: 'https://rosterlab.com/pricing'
 * });
 */
export const trackPricingViewed = (properties?: {
  page_location?: string;
  page_url?: string;
  [key: string]: any;
}) => {
  analytics.track(CONVERSION_EVENTS.PRICING_VIEWED, {
    ...properties,
    timestamp: new Date().toISOString(),
  });

  metaTrackViewContent({
    contentName: "Pricing Page",
    contentCategory: "pricing",
    contentType: "page",
  });
};
