// Analytics conversion events for tracking demo bookings and other conversions

declare global {
  interface Window {
    dataLayer?: any[];
    analytics?: any;
  }
}

interface DemoBookingProperties {
  form_guid: string;
  organizer_name: string;
  is_meeting_paid: boolean;
  meeting_date: string;
  duration_minutes: number;
  meeting_type: string;
  page_location: string;
  user_email?: string;
  user_name?: string;
}

interface UserTraits {
  email?: string;
  name?: string;
}

export function trackDemoBookingComplete(
  properties: DemoBookingProperties,
  userTraits?: UserTraits
) {
  // Track in Google Analytics via dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'demo_booking_complete',
      ...properties,
    });
  }

  // Track in Amplitude or other analytics services if available
  if (typeof window !== 'undefined' && window.analytics && window.analytics.track) {
    window.analytics.track('Demo Booking Completed', properties);
    
    // Identify user if email is available
    if (userTraits?.email) {
      window.analytics.identify(userTraits.email, userTraits);
    }
  }

  // Log for debugging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Demo Booking Complete:', { properties, userTraits });
  }
}