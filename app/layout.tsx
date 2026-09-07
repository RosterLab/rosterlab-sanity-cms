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
import { headers } from "next/headers";
import SkipLink from "@/components/accessibility/SkipLink";
import StatsigProvider from "@/components/analytics/StatsigProvider";
import StatsigExposureLogger from "@/components/analytics/StatsigExposureLogger";
import CTAModalManager from "@/components/modals/CTAModalManager";
import AskAiShareWidget from "@/components/ui/AskAiShareWidget";
import { MarketAccessProvider } from "@/components/market-access/MarketAccessProvider";
import { MARKET_ACCESS_HINT_SCRIPT } from "@/lib/market-access/client-gate";

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://rosterlab.com",
  ),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  // Check if current page is a US page
  const headersList = await headers();
  const pathname =
    headersList.get("x-pathname") || headersList.get("x-url") || "";
  const isUSPage = pathname === "/us" || pathname.startsWith("/us/");
  // Internal / admin surfaces should NOT show the marketing widget.
  // Routes excluded from middleware (studio, static, etc.) arrive with an
  // empty pathname — treat those as internal too.
  const isInternalRoute =
    !pathname ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/draft") ||
    pathname.startsWith("/azure-ad") ||
    pathname.startsWith("/api");

  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Applies the cached market-access decision before first paint, so a
            visitor never sees the wrong CTAs flash first. See
            lib/market-access/client-gate.ts. */}
        <script
          dangerouslySetInnerHTML={{ __html: MARKET_ACCESS_HINT_SCRIPT }}
        />
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://widget.intercom.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://featuregates.org" />
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
        <StructuredData type="organization" isUSPage={isUSPage} />
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
              {!isInternalRoute && (
                <AskAiShareWidget
                  learnFromUrl={
                    isUSPage
                      ? "https://rosterlab.com/us"
                      : "https://rosterlab.com"
                  }
                />
              )}
            </ClientProviders>
          </MarketAccessProvider>
        </StatsigProvider>
      </body>
    </html>
  );
}
