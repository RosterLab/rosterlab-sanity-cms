'use client';

import { useEffect } from 'react';
import { trackDemoBookingComplete } from '@/lib/analytics/events/conversion-events';

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
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Type guard to check if it's a HubSpot meeting event
      if (event.data && event.data.meetingBookSucceeded === true) {
        const payload = event.data as HubSpotMeetingPayload;
        
        if (payload.meetingsPayload) {
          const { meetingsPayload } = payload;
          const contact = meetingsPayload.bookingResponse.postResponse.contact;
          
          // Track in Amplitude
          trackDemoBookingComplete(
            {
              form_guid: meetingsPayload.formGuid,
              organizer_name: meetingsPayload.bookingResponse.postResponse.organizer.name,
              is_meeting_paid: meetingsPayload.isPaidMeeting,
              meeting_date: meetingsPayload.bookingResponse.event.dateString,
              duration_minutes: meetingsPayload.bookingResponse.event.duration / 60000,
              page_location: window.location.pathname,
              // Include user info if available
              user_email: contact?.email,
              user_name: contact?.firstName && contact?.lastName 
                ? `${contact.firstName} ${contact.lastName}` 
                : undefined,
              company_name: contact?.company,
              user_role: contact?.jobtitle,
              phone_number: contact?.phone,
            },
            // User properties for identification
            contact ? {
              email: contact.email,
              name: contact.firstName && contact.lastName 
                ? `${contact.firstName} ${contact.lastName}` 
                : undefined,
              company: contact.company,
              role: contact.jobtitle,
              phone: contact.phone,
            } : undefined
          );

          // Also push to GTM dataLayer (maintaining dual tracking)
          if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
              event: 'hubspot_meeting_success',
              'hs-form-guid': meetingsPayload.formGuid,
              'hs-organizer': meetingsPayload.bookingResponse.postResponse.organizer.name,
              'hs-is-meeting-paid': meetingsPayload.isPaidMeeting,
              'hs-meeting-date': meetingsPayload.bookingResponse.event.dateString,
              'hs-duration-minutes': meetingsPayload.bookingResponse.event.duration / 60000,
            });
          }

          // Log for debugging (remove in production)
          if (process.env.NODE_ENV === 'development') {
            console.log('Demo booking tracked:', {
              formGuid: meetingsPayload.formGuid,
              organizer: meetingsPayload.bookingResponse.postResponse.organizer.name,
              date: meetingsPayload.bookingResponse.event.dateString,
              contact: contact?.email,
            });
          }
        }
      }
    };

    // Add event listener
    window.addEventListener('message', handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // This component doesn't render anything
  return null;
}