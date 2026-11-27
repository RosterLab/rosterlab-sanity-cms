"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import AskAiShareWidget from "@/components/ui/AskAiShareWidget";

function isUSPath(pathname: string) {
  return pathname === "/us" || pathname.startsWith("/us/");
}

export default function SiteDocument({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  // The router knows the path during prerendering and on client navigations.
  const isUSPage = isUSPath(usePathname());

  return (
    <html
      lang={isUSPage ? "en-US" : "en"}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </html>
  );
}

export function SiteShareWidget() {
  const pathname = usePathname();
  const isInternalRoute = ["/studio", "/draft", "/azure-ad", "/api"].some(
    (prefix) => pathname.startsWith(prefix),
  );

  if (isInternalRoute) return null;

  return (
    <AskAiShareWidget
      learnFromUrl={
        isUSPath(pathname)
          ? "https://rosterlab.com/us"
          : "https://rosterlab.com"
      }
    />
  );
}
