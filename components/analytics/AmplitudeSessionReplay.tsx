"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

interface AmplitudeSessionReplayProps {
  apiKey: string;
}

// Track initialization to prevent multiple inits
let isInitialized = false;

export default function AmplitudeSessionReplay({
  apiKey,
}: AmplitudeSessionReplayProps) {
  useEffect(() => {
    if (!apiKey || typeof window === "undefined") return;

    // Check if already initialized
    if (isInitialized) {
      console.log(
        "[Amplitude Session Replay] Already initialized, skipping re-initialization",
      );
      return;
    }

    // Determine server URL based on environment
    const isProduction =
      process.env.NODE_ENV === "production" &&
      !process.env.NEXT_PUBLIC_VERCEL_ENV?.includes("preview") &&
      !window.location.hostname.includes("netlify");

    const serverUrl = isProduction
      ? "https://public.rosterlab.com/telemetry/a/2/httpapi"
      : "https://public-test.rosterlab.com/telemetry/a/2/httpapi";

    // Initialize Amplitude ONLY for session replay
    // Disable all default tracking - we use Segment for analytics
    amplitude.init(apiKey, undefined, {
      defaultTracking: {
        sessions: false, // Disabled - tracked by Segment
        pageViews: false, // Disabled - tracked by Segment
        formInteractions: false, // Disabled - tracked by Segment
        fileDownloads: false, // Disabled - tracked by Segment
      },
      // Enable cross-domain tracking to share device ID
      cookieOptions: {
        domain:
          typeof window !== "undefined" &&
          window.location.hostname === "localhost"
            ? undefined
            : ".rosterlab.com",
        sameSite: "Lax",
        secure:
          typeof window !== "undefined" &&
          window.location.protocol === "https:",
        expiration: 365,
        upgrade: false,
      },
      sessionTimeout: 30 * 60 * 1000, // 30 minutes
      serverUrl,
    });

    // Mark as initialized
    isInitialized = true;

    console.log("[Amplitude Session Replay] Initialized:", {
      deviceId: amplitude.getDeviceId(),
      sessionId: amplitude.getSessionId(),
    });

    // Add session replay plugin
    const sessionReplay = sessionReplayPlugin({
      sampleRate: 1.0, // Record 100% of sessions
    });

    amplitude.add(sessionReplay);

    console.log("[Amplitude Session Replay] Session replay plugin added");

    // Expose amplitude globally for identity stitching with Segment
    (window as any).amplitude = amplitude;

    return () => {
      // Don't reset on unmount - preserve session
    };
  }, [apiKey]);

  return null;
}

// Helper to get Amplitude device ID (useful for cross-platform tracking)
export function getAmplitudeDeviceId(): string | undefined {
  if (typeof window !== "undefined") {
    return amplitude.getDeviceId();
  }
  return undefined;
}
