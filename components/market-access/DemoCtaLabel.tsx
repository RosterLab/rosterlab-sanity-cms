import { isDemoBookingHref } from "@/lib/market-access/labels";
import DemoLabel from "./DemoLabel";

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
 * or `a`.
 */
export default function DemoCtaLabel({ children, href }: DemoCtaLabelProps) {
  const isBookingLink = href === undefined || isDemoBookingHref(href);
  if (!isBookingLink) return <>{children}</>;
  return <DemoLabel>{children}</DemoLabel>;
}
