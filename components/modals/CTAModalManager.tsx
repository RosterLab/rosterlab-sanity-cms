"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { usePathname } from "next/navigation";

// Lazy load modal components - they'll be preloaded at 15s
const CTAModalDemoBooking = lazy(() => import("./CTAModalDemoBooking"));
const CTAModalDemoVideo = lazy(() => import("./CTAModalDemoVideo"));
import {
  trackPageView,
  shouldShowModal,
  assignVariant,
  updateModalState,
  getModalTriggerType,
  type ActiveModalVariant,
} from "@/lib/analytics/user-behavior-tracker";
import { analytics } from "@/components/analytics/tracking";

/**
 * CTA Modal Manager
 * Manages the A/D test for CTA modals with two trigger conditions
 *
 * Trigger 1 (High-Intent):
 * - Visited at least 1 high-intent page (excluding home)
 * - Spent at least 60 seconds on high-intent page(s)
 *
 * Trigger 2 (Returning Visitor):
 * - User has visited the site before (is a returning visitor)
 * - Has been on site for at least 45 seconds this session
 *
 * Variants:
 * - A: Demo Booking (Live Demo showcase with illustration)
 * - D: Demo Video (Gated demo video walkthrough)
 *
 * Variant Assignment:
 * - First-time visitors: Random 50% split (A/D)
 * - Returning visitors: Cycles through variants (shows one they haven't seen)
 *
 * Constraints:
 * - Only 1 modal shown per session
 * - No modal if demo already booked
 */
export default function CTAModalManager() {
  const pathname = usePathname();
  const isWhitepaperPage = ["/whitepapers", "/us/whitepapers"].some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variant, setVariant] = useState<ActiveModalVariant | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Track page views whenever pathname changes
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Also close an existing popup when navigating into a whitepaper flow.
  useEffect(() => {
    if (isWhitepaperPage) setIsModalOpen(false);
  }, [isWhitepaperPage]);

  // Wait for page to fully load before starting modal checks
  useEffect(() => {
    // Delay modal checks to not interfere with initial page load
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 3000); // Wait 3 seconds after mount

    return () => clearTimeout(readyTimer);
  }, []);

  // Preload the active modal components after initial page load.
  useEffect(() => {
    const preloadTimer = setTimeout(() => {
      // Preload all modal variants in background (doesn't show them)
      import("./CTAModalDemoBooking");
      import("./CTAModalDemoVideo");
    }, 15000);

    return () => clearTimeout(preloadTimer);
  }, []);

  // Check periodically if modal should be shown (only after ready)
  useEffect(() => {
    // Don't check if modal already shown or not ready yet
    if (!isReady || isModalOpen || variant) return;

    // Don't show modals on whitepaper pages
    if (isWhitepaperPage) return;

    // Don't show modals on the mini tools pages (ROI/FTE/other calculators, quizzes, etc.)
    if (pathname.startsWith("/tools") || pathname.startsWith("/us/tools"))
      return;

    // Don't show modals on pricing or about pages
    if (pathname.startsWith("/pricing") || pathname.startsWith("/us/pricing"))
      return;
    if (pathname.startsWith("/about") || pathname.startsWith("/us/about"))
      return;

    // Don't show auto-popup on internal modal preview page
    if (pathname.startsWith("/test-modals")) return;

    const checkInterval = setInterval(() => {
      if (shouldShowModal()) {
        const assignedVariant = assignVariant();
        const triggerType = getModalTriggerType();

        setVariant(assignedVariant);
        setIsModalOpen(true);

        updateModalState({
          shown: true,
          dismissedAt: new Date().toISOString(),
        });

        // Track assignment with trigger type
        analytics.track("ab_test_assigned", {
          test_name: "cta_modal_ab_test",
          variant: assignedVariant,
          trigger_type: triggerType,
        });

        // Clear interval once modal is shown
        clearInterval(checkInterval);
      }
    }, 1000); // Check every 1 second for better responsiveness

    return () => clearInterval(checkInterval);
  }, [isReady, isModalOpen, variant, pathname, isWhitepaperPage]);

  const handleClose = () => {
    const triggerType = getModalTriggerType();
    setIsModalOpen(false);

    // Update state
    updateModalState({
      dismissed: true,
      dismissedAt: new Date().toISOString(),
    });

    // Track dismissal
    analytics.track("ab_test_dismissed", {
      test_name: "cta_modal_ab_test",
      variant,
      trigger_type: triggerType,
    });
  };

  const handleConversion = () => {
    const triggerType = getModalTriggerType();
    setIsModalOpen(false);

    // Update state
    updateModalState({
      converted: true,
      convertedAt: new Date().toISOString(),
    });

    // Track conversion
    analytics.track("ab_test_converted", {
      test_name: "cta_modal_ab_test",
      variant,
      trigger_type: triggerType,
    });
  };

  // Don't render if no variant assigned
  if (!variant || isWhitepaperPage) return null;

  return (
    <Suspense fallback={null}>
      {variant === "A" && (
        <CTAModalDemoBooking
          isOpen={isModalOpen}
          onClose={handleClose}
          onConversion={handleConversion}
        />
      )}
      {variant === "D" && (
        <CTAModalDemoVideo
          isOpen={isModalOpen}
          onClose={handleClose}
          onConversion={handleConversion}
        />
      )}
    </Suspense>
  );
}
