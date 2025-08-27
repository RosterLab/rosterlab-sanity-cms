'use client';

import { useEffect } from 'react';
import { trackFormSubmission } from '@/lib/analytics/events/conversion-events';

interface HubSpotFormCallback {
  type: 'hsFormCallback';
  eventName: 'onFormSubmitted';
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
    console.log('[HubSpotFormListener] Component mounted, listening for form submissions');
    
    const handleMessage = (event: MessageEvent) => {
      // Log all message events for debugging
      console.log('[HubSpotFormListener] Message received:', event.data);
      
      // Type guard to check if it's a HubSpot form submission event
      if (
        event.data && 
        event.data.type === 'hsFormCallback' && 
        event.data.eventName === 'onFormSubmitted'
      ) {
        console.log('[HubSpotFormListener] HubSpot form submission detected!');
        const formData = event.data as HubSpotFormCallback;
        
        // Extract submission values if available
        const submissionValues = formData.data?.submissionValues || {};
        
        console.log('[HubSpotFormListener] Form data:', {
          formGuid: formData.id,
          formName: formData.data?.formName,
          submissionValues: submissionValues
        });
        
        // Track in Amplitude
        try {
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
            user_name: submissionValues.firstname && submissionValues.lastname 
              ? `${submissionValues.firstname} ${submissionValues.lastname}` 
              : submissionValues.fullname,
            company_name: submissionValues.company,
            phone_number: submissionValues.phone || submissionValues.mobilephone,
            // Include all submission values as custom properties
            submission_data: submissionValues,
          });
          console.log('[HubSpotFormListener] Successfully tracked form submission to Amplitude');
        } catch (error) {
          console.error('[HubSpotFormListener] Error tracking form submission:', error);
        }

        // Also push to GTM dataLayer (maintaining dual tracking)
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'hubspot-form-success',
            'hs-form-guid': formData.id,
          });
        }

        // Log for debugging (remove in production)
        if (process.env.NODE_ENV === 'development') {
          console.log('Form submission tracked:', {
            formGuid: formData.id,
            formName: formData.data?.formName,
            email: submissionValues.email,
          });
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