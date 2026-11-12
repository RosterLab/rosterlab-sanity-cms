"use client";

import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";
import { trackButtonClick } from "@/components/analytics/tracking";
import { cn } from "@/lib/utils";

interface InlineCtaLinkProps {
  href: string;
  label: string;
  analyticsLocation: string;
  analyticsProperties: { cta_type: string; page_name: string; section: string };
  className?: string;
  onDark?: boolean;
}

export default function InlineCtaLink({
  href,
  label,
  analyticsLocation,
  analyticsProperties,
  className,
  onDark = false,
}: InlineCtaLinkProps) {
  return (
    <Link
      href={href}
      onClick={() =>
        trackButtonClick(label, analyticsLocation, analyticsProperties)
      }
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold",
        onDark
          ? "text-white hover:text-[#C7D2FF] focus-visible:text-[#C7D2FF]"
          : "text-[#1F2A5C] hover:text-[#3B7FE8] focus-visible:text-[#3B7FE8]",
        className,
      )}
    >
      {label}
      <PiArrowRightBold
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:translate-x-0.5"
      />
    </Link>
  );
}
