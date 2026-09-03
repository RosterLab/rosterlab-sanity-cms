import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({
  measurementId,
}: GoogleAnalyticsProps) {
  return (
    <>
      {/*
        The dataLayer and the gtag() shim are defined inline so they exist while
        the document is still parsing. next/script would defer them until after
        hydration, and several events fire from mount effects (demo_page_viewed,
        cta_modal_viewed, whitepaper_page_viewed) — those would hit the
        `typeof window.gtag === "function"` guard in tracking.ts and be dropped.
        Calls made before gtag.js arrives queue on dataLayer and are replayed on
        load, so only the library download is deferred.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
