'use client'

import { useEffect } from 'react'
import * as amplitude from '@amplitude/analytics-browser'
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser'

interface AmplitudeProps {
  apiKey: string
  userId?: string
  options?: Record<string, any>
}

export default function Amplitude({ apiKey, userId, options = {} }: AmplitudeProps) {
  useEffect(() => {
    if (!apiKey || typeof window === 'undefined') return

    // Initialize Amplitude with cross-domain tracking
    amplitude.init(apiKey, userId, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
      // Enable cross-domain tracking - share cookies across all subdomains
      cookieOptions: {
        domain: '.rosterlab.com', // Allows tracking across www.rosterlab.com and app.rosterlab.com
      },
      // Standard session timeout
      sessionTimeout: 30 * 60 * 1000, // 30 minutes
      // Use proxy for analytics requests
      serverUrl: 'https://public.rosterlab.com/telemetry/a/2/httpapi',
      ...options,
    })

    // Add session replay plugin
    const sessionReplay = sessionReplayPlugin({
      sampleRate: 1.0, // Record 100% of sessions
    })
    
    amplitude.add(sessionReplay)

    // Set user ID if provided
    if (userId) {
      amplitude.setUserId(userId)
    }

    return () => {
      // Clean up on unmount
      amplitude.reset()
    }
  }, [apiKey, userId, options])

  return null
}

// Analytics utility functions
export const analytics = {
  track: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      amplitude.track(eventName, eventProperties)
    }
  },

  identify: (userId: string, userProperties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      amplitude.setUserId(userId)
      if (userProperties) {
        const identify = new amplitude.Identify()
        Object.entries(userProperties).forEach(([key, value]) => {
          identify.set(key, value)
        })
        amplitude.identify(identify)
      }
    }
  },

  setUserProperties: (properties: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      const identify = new amplitude.Identify()
      Object.entries(properties).forEach(([key, value]) => {
        identify.set(key, value)
      })
      amplitude.identify(identify)
    }
  },

  setGroup: (groupType: string, groupName: string | string[]) => {
    if (typeof window !== 'undefined') {
      amplitude.setGroup(groupType, groupName)
    }
  },

  logEvent: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      amplitude.logEvent(eventName, eventProperties)
    }
  },

  reset: () => {
    if (typeof window !== 'undefined') {
      amplitude.reset()
    }
  },
}

// Common event tracking functions
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  analytics.track('Page Viewed', {
    page_name: pageName,
    ...properties,
  })
}

export const trackButtonClick = (buttonName: string, location?: string, properties?: Record<string, any>) => {
  analytics.track('Button Clicked', {
    button_name: buttonName,
    location,
    ...properties,
  })
}

export const trackFormSubmit = (formName: string, properties?: Record<string, any>) => {
  analytics.track('Form Submitted', {
    form_name: formName,
    ...properties,
  })
}

export const trackDownload = (fileName: string, fileType?: string, properties?: Record<string, any>) => {
  analytics.track('File Downloaded', {
    file_name: fileName,
    file_type: fileType,
    ...properties,
  })
}

export const trackSignup = (method?: string, properties?: Record<string, any>) => {
  analytics.track('User Signed Up', {
    signup_method: method,
    ...properties,
  })
}

export const trackLogin = (method?: string, properties?: Record<string, any>) => {
  analytics.track('User Logged In', {
    login_method: method,
    ...properties,
  })
}

export const trackFAQToggle = (question: string, action: 'opened' | 'closed', properties?: Record<string, any>) => {
  analytics.track('FAQ Toggled', {
    question,
    action,
    ...properties,
  })
}

export const trackVideoPlay = (videoTitle: string, location?: string, properties?: Record<string, any>) => {
  analytics.track('Video Played', {
    video_title: videoTitle,
    location,
    ...properties,
  })
}

export const trackScrollDepth = (depth: number, pageName?: string) => {
  analytics.track('Page Scrolled', {
    scroll_depth: depth,
    page_name: pageName,
  })
}

export const trackLinkClick = (linkText: string, linkUrl: string, isExternal: boolean, properties?: Record<string, any>) => {
  analytics.track('Link Clicked', {
    link_text: linkText,
    link_url: linkUrl,
    is_external: isExternal,
    ...properties,
  })
}