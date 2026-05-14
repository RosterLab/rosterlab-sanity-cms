import { analytics } from "@/components/analytics/tracking";
import {
  metaTrackLead,
  metaTrackSchedule,
  metaTrackContact,
  metaTrackSubscribe,
  metaTrackViewContent,
} from "@/lib/analytics/meta-pixel";

export interface DemoBookingProperties {
  form_guid: string;
  organizer_name: string;
  is_meeting_paid: boolean;
  meeting_date: string;
  duration_minutes: number;
  meeting_type?: string;
  page_location?: string;
  user_email?: string;
  user_name?: string;
  company_name?: string;
  company_size?: string;
  user_role?: string;
  phone_number?: string;
}

const CONTACT_FORM_GUID = "77e5a8c4-4303-4681-8c92-afa7b070380c";

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
  analytics.track("demo_booking_complete", {
    ...properties,
    email: properties.user_email,
    timestamp: new Date().toISOString(),
    source: "calendly",
  });

  if (userProperties && Object.keys(userProperties).length > 0) {
    const cleanUserProps = Object.fromEntries(
      Object.entries(userProperties).filter(
        ([, value]) => value !== undefined && value !== null,
      ),
    );

    if (Object.keys(cleanUserProps).length > 0) {
      analytics.setUserProperties(cleanUserProps);
      if (cleanUserProps.email) {
        analytics.identify(cleanUserProps.email, cleanUserProps);
      }
    }
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
  analytics.track("form_submission", {
    ...properties,
    timestamp: new Date().toISOString(),
    source: "hubspot_form",
  });

  if (properties.user_email) {
    const userProperties = {
      email: properties.user_email,
      name: properties.user_name,
      company: properties.company_name,
      phone: properties.phone_number,
    };

    const cleanUserProps = Object.fromEntries(
      Object.entries(userProperties).filter(([, v]) => v !== undefined),
    );

    if (Object.keys(cleanUserProps).length > 0) {
      analytics.setUserProperties(cleanUserProps);
      analytics.identify(properties.user_email, cleanUserProps);
    }
  }

  // Legacy GTM event name for existing triggers
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "hubspot-form-success",
      "hs-form-guid": properties.form_guid,
    });
  }

  // Meta Pixel: Contact for contact form, Subscribe for newsletters, Lead for others
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
  const isContactForm = properties.form_guid === CONTACT_FORM_GUID;

  if (isNewsletter) {
    metaTrackSubscribe({
      contentName: properties.form_name || "Newsletter Signup",
      value: 10,
      userData: metaFormUserData,
    });
  } else if (isContactForm) {
    metaTrackContact({
      contentName: properties.form_name || "Contact Form",
      value: 200,
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

export const trackPricingViewed = (properties?: {
  page_location?: string;
  page_url?: string;
  [key: string]: any;
}) => {
  analytics.track("pricing_viewed", {
    ...properties,
    timestamp: new Date().toISOString(),
  });

  metaTrackViewContent({
    contentName: "Pricing Page",
    contentCategory: "pricing",
    contentType: "page",
  });
};
