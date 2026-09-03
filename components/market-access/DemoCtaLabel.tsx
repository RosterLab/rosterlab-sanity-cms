"use client";

import {
  isDemoBookingHref,
  toRequestDemoLabel,
  useMustRequestDemo,
} from "./MarketAccessProvider";

interface DemoCtaLabelProps {
  /** Text as written for countries that can book straight into the calendar. */
  children: string;
  /**
   * The CTA's destination. Omit only when the caller already knows the link is
   * a booking page; anything else is left untouched.
   */
  href?: string;
}

/**
 * Renders a demo CTA's text, swapping "Book" for "Request" in the countries
 * that land on the request form instead of Calendly.
 *
 * `Button` does this on its own. This is for the CTAs built from a raw `Link`
 * or `a`, including the ones inside server components — it is a client
 * component so it can read the market access decision from anywhere.
 */
export default function DemoCtaLabel({ children, href }: DemoCtaLabelProps) {
  const mustRequestDemo = useMustRequestDemo();
  const isBookingLink = href === undefined || isDemoBookingHref(href);
  return (
    <>
      {mustRequestDemo && isBookingLink
        ? toRequestDemoLabel(children)
        : children}
    </>
  );
}
