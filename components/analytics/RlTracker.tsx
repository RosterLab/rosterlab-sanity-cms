"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RlTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.rlTracker !== "undefined") {
      window.rlTracker.page(document.title, { path: pathname });
    }
  }, [pathname]);

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      src="https://ops.rosterlab.com/tracker.js"
      strategy="afterInteractive"
    />
  );
}
