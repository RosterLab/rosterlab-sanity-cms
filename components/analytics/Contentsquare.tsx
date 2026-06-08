"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    _uxa?: Array<[string, ...unknown[]]>;
  }
}

export default function Contentsquare() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window._uxa = window._uxa || [];
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window._uxa.push(["trackPageview", url]);
  }, [pathname, searchParams]);

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script id="contentsquare" strategy="afterInteractive">
      {`
        window._uxa = window._uxa || [];
        (function() {
          var mt = document.createElement("script");
          mt.type = "text/javascript";
          mt.async = true;
          mt.src = "https://t.contentsquare.net/uxa/bc185a828835d.js";
          document.head.appendChild(mt);
        })();
      `}
    </Script>
  );
}
