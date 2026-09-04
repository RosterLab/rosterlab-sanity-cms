"use client";

import { Children, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  trackButtonClick,
  trackSmartButtonClick,
} from "@/components/analytics/tracking";
import { handleCrossDomainLink } from "@/lib/analytics/identity-stitching";
import DemoLabel from "@/components/market-access/DemoLabel";
import {
  isDemoBookingHref,
  isFreeSignupHref,
} from "@/lib/market-access/labels";
import { FREE_SIGNUP_GATE_CLASS } from "@/lib/market-access/client-gate";

/**
 * Gates the plain-text parts of a label so CSS can pick the country's wording.
 * Non-string children (icons and the like) are handed back untouched.
 */
function gateTextChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child, index) =>
    typeof child === "string" ? (
      <DemoLabel key={index}>{child}</DemoLabel>
    ) : (
      child
    ),
  );
}

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  analyticsLabel?: string;
  analyticsLocation?: string;
  analyticsProperties?: Record<string, any>;
  ariaLabel?: string;
  ariaPressed?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  type = "button",
  analyticsLabel,
  analyticsLocation,
  analyticsProperties,
  ariaLabel,
  ariaPressed,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary:
      "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className,
    // Free signup isn't offered everywhere. The gate hides the CTA in CSS
    // rather than dropping it from the tree, so the decision lands before
    // first paint instead of a fetch later — see lib/market-access/client-gate.
    href && isFreeSignupHref(href) && FREE_SIGNUP_GATE_CLASS,
  );

  // Visitors routed to the request form can't pick a time, so the booking
  // promise in the label would be wrong. Which wording applies is decided in
  // CSS, for the same reason as the free-signup gate above.
  const label =
    href && isDemoBookingHref(href) ? gateTextChildren(children) : children;

  const handleClick = () => {
    if (analyticsLabel && href) {
      trackSmartButtonClick(analyticsLabel, href, analyticsLocation, {
        variant,
        size,
        ...analyticsProperties,
      });
    } else if (analyticsLabel) {
      trackButtonClick(analyticsLabel, analyticsLocation, {
        variant,
        size,
        href,
        path:
          typeof window !== "undefined" ? window.location.pathname : undefined,
        ...analyticsProperties,
      });
    }
    onClick?.();
  };

  if (href) {
    // Create the click handler with cross-domain support
    const clickHandler = analyticsLabel
      ? handleCrossDomainLink(href, (e) => {
          // Track analytics for all links
          trackSmartButtonClick(analyticsLabel, href, analyticsLocation, {
            variant,
            size,
            ...analyticsProperties,
          });

          // For external non-app.rosterlab.com links, handle navigation
          if (href.startsWith("http") && !href.includes("app.rosterlab.com")) {
            e.preventDefault();
            // Small delay to ensure event is sent before navigation
            setTimeout(() => {
              window.location.href = href;
            }, 100);
          }
        })
      : href.includes("app.rosterlab.com")
        ? handleCrossDomainLink(href)
        : undefined;

    return (
      <Link
        href={href}
        className={classes}
        onClick={clickHandler}
        role="button"
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        aria-disabled={disabled}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
    >
      {label}
    </button>
  );
}
