import type { PostHog } from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

let loading: Promise<PostHog | null> | undefined;

function redactUrl(value: string): string {
  try {
    const url = new URL(value, window.location.origin);
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return value.split(/[?#]/, 1)[0];
  }
}

function isMarketingPage(pathname: string): boolean {
  return !["/api", "/azure-ad", "/draft", "/studio"].some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Fetches and initialises posthog-js once, however many callers ask.
 *
 * The library is ~90 KB, so it is never part of the initial bundle: the
 * instrumentation hook asks for it after the page has loaded, and an error
 * report asks for it immediately if it arrives first.
 */
export function loadPostHog(): Promise<PostHog | null> {
  if (!projectToken || typeof window === "undefined") {
    return Promise.resolve(null);
  }
  loading ??= import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(projectToken, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        ui_host:
          process.env.NEXT_PUBLIC_POSTHOG_UI_HOST || "https://us.posthog.com",
        defaults: "2026-05-30",

        // Neon remains RosterLab's durable CDP. PostHog provides the
        // marketer-facing behavioural view alongside exception reporting and
        // session replay.
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: false,
        capture_heatmaps: true,
        capture_dead_clicks: false,
        capture_performance: true,
        capture_exceptions: true,
        disable_surveys: true,
        person_profiles: "always",

        // Replay is started separately, below, once PostHog is up.
        disable_session_recording: true,
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: "[data-sensitive], .ph-mask",
          blockSelector:
            'input[type="hidden"], input[type="file"], [data-posthog-no-capture]',
          recordHeaders: false,
          recordBody: false,
          maskCapturedNetworkRequestFn: (request) => ({
            ...request,
            name: request.name ? redactUrl(request.name) : request.name,
          }),
        },
        before_send: (event) => {
          if (event?.properties?.$current_url) {
            event.properties.$current_url = redactUrl(
              String(event.properties.$current_url),
            );
          }
          return event;
        },
      });

      if (isMarketingPage(window.location.pathname)) {
        posthog.startSessionRecording();
      }
      return posthog;
    })
    .catch(() => null);
  return loading;
}
