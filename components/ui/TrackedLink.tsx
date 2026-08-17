"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackSmartButtonClick } from "@/components/analytics/tracking";

interface TrackedLinkProps {
  href: string;
  /** Human-readable name for the click event. */
  label: string;
  /** Section the click came from, e.g. "Landing Features". */
  location?: string;
  properties?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
}

/**
 * A plain `next/link` that reports its click.
 *
 * Exists so a server component can track a link without becoming a client
 * component itself — only this anchor is an island, and `children` stay
 * server-rendered. The `href` is a real one, so crawlers see an ordinary
 * link and the markup is unchanged.
 */
export default function TrackedLink({
  href,
  label,
  location,
  properties,
  className,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackSmartButtonClick(label, href, location, properties)}
    >
      {children}
    </Link>
  );
}
