import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface CalendlyEventData {
  event?: {
    uri?: string;
    event_type_name?: string;
    start_time?: string;
  };
  invitee?: {
    email?: string;
    name?: string;
  };
  uri?: string;
  email?: string;
  name?: string;
  start_time?: string;
}

interface CalendlyEventHandlers {
  onEventScheduled?: (eventData: CalendlyEventData) => void | Promise<void>;
  onEventTypeViewed?: (eventData: CalendlyEventData) => void;
  onDateAndTimeSelected?: (eventData: CalendlyEventData) => void;
  onProfilePageViewed?: (eventData: CalendlyEventData) => void;
}

interface CalendlyConfig {
  baseUrl: string;
  queryParams?: Record<string, string>;
  region: "us" | "global";
  redirectPath?: string;
  styles?: {
    height?: string;
    minWidth?: string;
  };
  pageSettings?: {
    hideGdprBanner?: boolean;
  };
}

interface UseCalendlyWidgetOptions {
  config: CalendlyConfig;
  eventHandlers?: CalendlyEventHandlers;
  shouldLoad: boolean;
  enablePerformanceOptimizations?: boolean;
}

export function useCalendlyWidget({
  config,
  eventHandlers,
  shouldLoad,
  enablePerformanceOptimizations = true,
}: UseCalendlyWidgetOptions) {
  const [isBooking, setIsBooking] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState<string>("");
  const [shouldLoadWidget, setShouldLoadWidget] = useState(false);

  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const hasTrackedViewRef = useRef(false);
  const router = useRouter();

  // Build Calendly URL with parameters
  useEffect(() => {
    if (!config.baseUrl) return;

    const params = new URLSearchParams({
      hide_gdpr_banner: "1",
      utm_source: "website",
      utm_medium: "booking",
      utm_campaign: "demo",
      ...config.queryParams,
    });

    setCalendlyUrl(`${config.baseUrl}?${params.toString()}`);
  }, [config.baseUrl, config.queryParams]);

  // Performance optimizations
  useEffect(() => {
    if (!enablePerformanceOptimizations) return;

    // Check if mobile and load immediately
    if (window.innerWidth < 768) {
      setShouldLoadWidget(true);
    }

    // Prefetch confirmation page if specified
    if (config.redirectPath) {
      router.prefetch(config.redirectPath);
    }

    // Add preconnect for Calendly domains
    const calendlyDomains = [
      "https://assets.calendly.com",
      "https://calendly.com",
      "https://app.calendly.com",
    ];

    const links: HTMLLinkElement[] = [];

    calendlyDomains.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = domain;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      links.push(link);
    });

    // Preload the Calendly widget script
    const preloadScript = document.createElement("link");
    preloadScript.rel = "preload";
    preloadScript.as = "script";
    preloadScript.href =
      "https://assets.calendly.com/assets/external/widget.js";
    document.head.appendChild(preloadScript);
    links.push(preloadScript);

    // Prefetch the Calendly iframe page if URL is ready
    if (calendlyUrl) {
      const prefetchIframe = document.createElement("link");
      prefetchIframe.rel = "prefetch";
      prefetchIframe.href = `${calendlyUrl}&embed_domain=${window.location.hostname}&embed_type=Inline`;
      document.head.appendChild(prefetchIframe);
      links.push(prefetchIframe);
    }

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadWidget(true);
          }
        });
      },
      {
        rootMargin: "500px",
        threshold: 0.01,
      },
    );

    if (widgetContainerRef.current) {
      observer.observe(widgetContainerRef.current);
    }

    return () => {
      observer.disconnect();
      // Clean up all added elements
      links.forEach((link) => link.remove());
    };
  }, [
    enablePerformanceOptimizations,
    config.redirectPath,
    calendlyUrl,
    router,
  ]);

  // Extract event data from Calendly events
  const extractEventData = useCallback((e: any): CalendlyEventData => {
    const eventDetail = e?.detail;
    const eventData = e?.data || e?.detail || e;

    return {
      event: eventData?.event,
      invitee: eventData?.invitee,
      uri: eventData?.event?.uri || eventData?.uri,
      email: eventData?.invitee?.email || eventData?.email,
      name: eventData?.invitee?.name || eventData?.name,
      start_time: eventData?.event?.start_time || eventData?.start_time,
    };
  }, []);

  // Event handlers
  const onEventScheduled = useCallback(
    async (e: any) => {
      setIsBooking(true);
      const eventData = extractEventData(e);

      console.log("=== CALENDLY EVENT SCHEDULED ===", eventData);

      // Track in GA4 via dataLayer
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "calendly_meeting_scheduled",
          calendly_event_type: eventData.event?.event_type_name || "demo",
          calendly_event_uri: eventData.uri,
          calendly_invitee_email: eventData.email,
          calendly_invitee_name: eventData.name,
          calendly_scheduled_date: eventData.start_time,
        });
      }

      // Call custom handler
      if (eventHandlers?.onEventScheduled) {
        await eventHandlers.onEventScheduled(eventData);
      }

      // Redirect if path specified
      if (config.redirectPath) {
        setTimeout(() => {
          router.push(config.redirectPath!);
        }, 50);
      }
    },
    [extractEventData, eventHandlers, config.redirectPath, router],
  );

  const onEventTypeViewed = useCallback(
    (e: any) => {
      const eventData = extractEventData(e);
      console.log("=== CALENDLY EVENT TYPE VIEWED ===", eventData);

      // Track widget view in GA4 (only once per page load)
      const trackingKey = `__calendlyViewed:${window.location.pathname}`;

      if (
        !hasTrackedViewRef.current &&
        !(window as any)[trackingKey] &&
        typeof window !== "undefined" &&
        (window as any).dataLayer
      ) {
        hasTrackedViewRef.current = true;
        (window as any)[trackingKey] = true;
        (window as any).dataLayer.push({
          event: "calendly_widget_viewed",
          page_location: window.location.pathname,
        });
      }

      eventHandlers?.onEventTypeViewed?.(eventData);
    },
    [extractEventData, eventHandlers],
  );

  const onDateAndTimeSelected = useCallback(
    (e: any) => {
      const eventData = extractEventData(e);
      console.log("=== CALENDLY DATE AND TIME SELECTED ===", eventData);
      eventHandlers?.onDateAndTimeSelected?.(eventData);
    },
    [extractEventData, eventHandlers],
  );

  const onProfilePageViewed = useCallback(
    (e: any) => {
      const eventData = extractEventData(e);
      console.log("=== CALENDLY PROFILE PAGE VIEWED ===", eventData);
      eventHandlers?.onProfilePageViewed?.(eventData);
    },
    [extractEventData, eventHandlers],
  );

  return {
    // State
    isBooking,
    calendlyUrl,
    shouldLoadWidget: shouldLoad && shouldLoadWidget,

    // Refs
    widgetContainerRef,

    // Event handlers
    eventListeners: {
      onEventScheduled,
      onEventTypeViewed,
      onDateAndTimeSelected,
      onProfilePageViewed,
    },

    // Manual controls
    setShouldLoadWidget,
    setIsBooking,
  };
}
