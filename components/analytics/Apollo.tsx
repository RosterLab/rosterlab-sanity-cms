import Script from "next/script";

interface ApolloProps {
  appId: string;
}

/**
 * Apollo.io Website Tracker
 *
 * Tracks website visitors and integrates with Apollo.io for sales intelligence
 * and lead enrichment.
 */
export default function Apollo({ appId }: ApolloProps) {
  return (
    <Script
      id="apollo-tracker"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          function initApollo() {
            var n = Math.random().toString(36).substring(7);
            var o = document.createElement("script");
            o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
            o.async = true;
            o.defer = true;
            o.onload = function() {
              window.trackingFunctions.onLoad({appId: "${appId}"});
            };
            document.head.appendChild(o);
          }
          initApollo();
        `,
      }}
    />
  );
}
