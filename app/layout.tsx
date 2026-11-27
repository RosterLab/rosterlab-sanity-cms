import type { Metadata } from "next";
import "./globals.css";
import ClientHeader from "@/components/layout/ClientHeader";
import ClientFooter from "@/components/layout/ClientFooter";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import UTMTracker from "@/components/analytics/UTMTracker";
import MetaPixel from "@/components/analytics/MetaPixel";
import RlTracker from "@/components/analytics/RlTracker";
import StructuredData from "@/components/seo/StructuredData";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { Poppins } from "next/font/google";
import { LazyStyles } from "@/components/layout/LazyStyles";
import ClientProviders from "@/components/layout/ClientProviders";
import GeolocationProvider from "@/components/layout/GeolocationProvider";
import SkipLink from "@/components/accessibility/SkipLink";
import StatsigProvider from "@/components/analytics/StatsigProvider";
import StatsigExposureLogger from "@/components/analytics/StatsigExposureLogger";
import CTAModalManager from "@/components/modals/CTAModalManager";
import SiteDocument, { SiteShareWidget } from "@/components/layout/SiteDocument";
import { MarketAccessProvider } from "@/components/market-access/MarketAccessProvider";
import { MARKET_ACCESS_HINT_SCRIPT } from "@/lib/market-access/client-gate";
import { ROUTING_PREFILL_CAPTURE_SCRIPT } from "@/lib/calendly/routing-prefill";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "AI-Powered Staff Rostering Software | RosterLab",
    template: "%s | RosterLab",
  },
  description:
    "RosterLab uses AI to generate fair, optimised staff rosters for complex teams in minutes. Built for healthcare, 24/7 operations, and large shift-based teams.",
  metadataBase: new URL("https://rosterlab.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <SiteDocument className={poppins.variable}>
      <head>
        {/* Strip personal routing answers before any analytics initialization. */}
        <script
          dangerouslySetInnerHTML={{ __html: ROUTING_PREFILL_CAPTURE_SCRIPT }}
        />
        {/* Applies the cached market-access decision before first paint, so a
            visitor never sees the wrong CTAs flash first. See
            lib/market-access/client-gate.ts. */}
        <script
          dangerouslySetInnerHTML={{ __html: MARKET_ACCESS_HINT_SCRIPT }}
        />
        {/* Critical resource hints.

            No font preconnects: `next/font/google` self-hosts Poppins at build
            time, so nothing is ever fetched from fonts.googleapis.com or
            fonts.gstatic.com and Lighthouse flagged both hints as unused. */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://widget.intercom.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://featuregates.org" />
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
        <StructuredData type="organization" />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        )}
      </head>
      <body
        className={`${poppins.className} min-h-screen bg-white text-neutral-900 antialiased`}
        suppressHydrationWarning={true}
      >
        <SkipLink />
        <StatsigProvider clientKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY}>
          <MarketAccessProvider>
            <ClientProviders
              intercomAppId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID!}
            >
              {process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY && (
                <StatsigExposureLogger />
              )}
              <RlTracker />
              <UTMTracker debug={process.env.NODE_ENV === "development"} />
              <MetaPixel />
              <GeolocationProvider />
              <ClientHeader />
              <main id="main-content" className="flex-grow" role="main">
                {children}
              </main>
              <ClientFooter />
              {isEnabled && <VisualEditing />}
              <LazyStyles />
              <CTAModalManager />
              <SiteShareWidget />
            </ClientProviders>
          </MarketAccessProvider>
        </StatsigProvider>
      </body>
    </SiteDocument>
  );
}
