'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCalendlyEventListener } from 'react-calendly'
import dynamic from 'next/dynamic'
import { analytics } from '@/components/analytics/Amplitude'

// Track demo booking completion
const trackDemoBookingComplete = (properties?: Record<string, any>) => {
  analytics.track('Demo Booking Completed', properties)
}

// Lazy load the Calendly widget
const LazyInlineWidget = dynamic(
  () => import('react-calendly').then((mod) => mod.InlineWidget),
  {
    loading: () => (
      <div
        className="flex items-center justify-center bg-gray-50 rounded-lg"
        style={{ height: '900px' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    ),
    ssr: false,
  },
)

export default function CalendlyContactWidget() {
  const [isBooking, setIsBooking] = useState(false)
  const [shouldLoadWidget, setShouldLoadWidget] = useState(false)
  const widgetContainerRef = useRef<HTMLDivElement>(null)
  const hasTrackedViewRef = useRef(false)
  const router = useRouter()

  useEffect(() => {
    // Check if mobile and load immediately
    if (window.innerWidth < 768) {
      setShouldLoadWidget(true)
    }

    // Prefetch the meeting-confirmed page
    router.prefetch('/meeting-confirmed')

    // Add preconnect for Calendly domains
    const calendlyDomains = [
      'https://assets.calendly.com',
      'https://calendly.com',
      'https://app.calendly.com',
    ]

    calendlyDomains.forEach((domain) => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // Preload the Calendly widget script
    const preloadScript = document.createElement('link')
    preloadScript.rel = 'preload'
    preloadScript.as = 'script'
    preloadScript.href = 'https://assets.calendly.com/assets/external/widget.js'
    document.head.appendChild(preloadScript)

    // Prefetch the Calendly iframe page
    const prefetchIframe = document.createElement('link')
    prefetchIframe.rel = 'prefetch'
    prefetchIframe.href = 'https://calendly.com/d/cv5n-fky-kpf?hide_gdpr_banner=1&embed_domain=localhost&embed_type=Inline'
    document.head.appendChild(prefetchIframe)

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadWidget(true)
          }
        })
      },
      {
        rootMargin: '500px', // Start loading 500px before visible for faster load
        threshold: 0.01,
      },
    )

    if (widgetContainerRef.current) {
      observer.observe(widgetContainerRef.current)
    }

    return () => {
      observer.disconnect()
      // Clean up all added elements
      document
        .querySelectorAll(
          'link[rel="preconnect"][href*="calendly"], link[rel="preload"][href*="calendly"], link[rel="prefetch"][href*="calendly"]',
        )
        .forEach((el) => el.remove())
    }
  }, [router])

  // Handle Calendly events
  useCalendlyEventListener({
    onEventScheduled: (e: any) => {
      setIsBooking(true)

      // Extract event details
      const eventData = e?.data || e?.detail || e

      // Track in GA4 via dataLayer
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'calendly_meeting_scheduled',
          calendly_event_type: eventData?.event?.event_type_name || 'contact',
          calendly_event_uri: eventData?.event?.uri || eventData?.uri,
          calendly_invitee_email: eventData?.invitee?.email || eventData?.email,
          calendly_invitee_name: eventData?.invitee?.name || eventData?.name,
          calendly_scheduled_date: eventData?.event?.start_time || eventData?.start_time,
          form_location: 'contact_page',
        })
      }

      // Track in Amplitude
      trackDemoBookingComplete({
        form_guid: eventData?.event?.uri || eventData?.uri || 'calendly-contact',
        organizer_name: 'RosterLab Team',
        is_meeting_paid: false,
        meeting_date: eventData?.event?.start_time || eventData?.start_time || new Date().toISOString(),
        duration_minutes: 30,
        meeting_type: eventData?.event?.event_type_name || 'contact',
        page_location: window.location.pathname,
        user_email: eventData?.invitee?.email || eventData?.email,
        user_name: eventData?.invitee?.name || eventData?.name,
        email: eventData?.invitee?.email || eventData?.email,
        name: eventData?.invitee?.name || eventData?.name,
      })

      // Redirect to confirmation page
      setTimeout(() => {
        router.push('/meeting-confirmed')
      }, 50)
    },
    onEventTypeViewed: () => {
      // Track widget view in GA4 (only once per page load)
      const trackingKey = `__calendlyViewed:${window.location.pathname}`

      if (
        !hasTrackedViewRef.current &&
        !(window as any)[trackingKey] &&
        typeof window !== 'undefined' &&
        (window as any).dataLayer
      ) {
        hasTrackedViewRef.current = true
        ;(window as any)[trackingKey] = true
        ;(window as any).dataLayer.push({
          event: 'calendly_widget_viewed',
          page_location: window.location.pathname,
          widget_location: 'contact_page',
        })
      }
    },
  })

  return (
    <div
      ref={widgetContainerRef}
      className="relative"
      style={{ minHeight: '900px' }}
    >
      {shouldLoadWidget ? (
        <>
          <LazyInlineWidget
            url="https://calendly.com/d/cv5n-fky-kpf"
            styles={{
              height: '900px',
              minWidth: '320px',
            }}
          />
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
        </>
      ) : (
        <div
          className="flex items-center justify-center bg-gray-50 rounded-lg"
          style={{ height: '900px' }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading calendar...</p>
          </div>
        </div>
      )}
    </div>
  )
}