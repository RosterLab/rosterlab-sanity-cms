import { loadPostHog } from "@/lib/monitoring/posthog-loader";

// PostHog stays off the critical rendering path: it is fetched and started in
// the first idle period after the window load event, matching our previous
// Clarity performance behaviour. An error report before then loads it early
// (see lib/monitoring/posthog-client.ts).
function loadWhenIdle(): void {
  const start = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => void loadPostHog(), { timeout: 2_000 });
      return;
    }
    window.setTimeout(() => void loadPostHog(), 1_000);
  };

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start, { once: true });
  }
}

loadWhenIdle();
