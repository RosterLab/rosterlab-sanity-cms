import type { Metadata } from "next";
import "./globals.css";
import ClientHeader from "@/components/layout/ClientHeader";
import ClientFooter from "@/components/layout/ClientFooter";
import { GoogleTagManagerNoscript } from "@/components/analytics/GoogleTagManager";
import GoogleTagManagerHead from "@/components/analytics/GoogleTagManagerHead";
import UTMTracker from "@/components/analytics/UTMTracker";
import MetaPixel from "@/components/analytics/MetaPixel";
import Contentsquare from "@/components/analytics/Contentsquare";
import RlTracker from "@/components/analytics/RlTracker";
import StructuredData from "@/components/seo/StructuredData";
import { VisualEditing } from "next-sanity/visual-editing";
import { cookies, draftMode } from "next/headers";
import { Poppins } from "next/font/google";
import { LazyStyles } from "@/components/layout/LazyStyles";
import ClientProviders from "@/components/layout/ClientProviders";
import GeolocationProvider from "@/components/layout/GeolocationProvider";
import { headers } from "next/headers";
import SkipLink from "@/components/accessibility/SkipLink";
import StatsigProvider from "@/components/analytics/StatsigProvider";
import StatsigExposureLogger from "@/components/analytics/StatsigExposureLogger";
import { getClientBootstrapValues } from "@/lib/statsig/client-bootstrap";
import CTAModalManager from "@/components/modals/CTAModalManager";

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
  const isUSPage = pathname.startsWith("/us/");

  // Statsig bootstrap: read visitor ID and pre-compute experiment values
  const cookieStore = await cookies();
  const anonId = cookieStore.get("_rl_anon_id")?.value || null;
  const detectedCountry = headersList.get("x-detected-country") || null;
  const { user: statsigUser, values: statsigValues } =
    await getClientBootstrapValues(anonId, detectedCountry);

  return (
    <html lang="en" className={poppins.variable}>
      <head>
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
        <link rel="dns-prefetch" href="https://t.contentsquare.net" />
        <StructuredData type="organization" isUSPage={isUSPage} />
        <GoogleTagManagerHead gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      </head>
      <body
        className={`${poppins.className} min-h-screen bg-white text-neutral-900 antialiased`}
        suppressHydrationWarning={true}
      >
        <GoogleTagManagerNoscript gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
        <SkipLink />
        <StatsigProvider
          clientKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY}
          user={statsigUser}
          initialValues={statsigValues ? JSON.stringify(statsigValues) : null}
        >
          <ClientProviders
            intercomAppId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID!}
          >
            {process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY && <StatsigExposureLogger />}
            <RlTracker />
            <UTMTracker debug={process.env.NODE_ENV === "development"} />
            <MetaPixel />
            <Contentsquare />
            <GeolocationProvider />
            <ClientHeader />
            <main id="main-content" className="flex-grow" role="main">
              {children}
            </main>
            <ClientFooter />
            {isEnabled && <VisualEditing />}
            <LazyStyles />
            <CTAModalManager />
          </ClientProviders>
        </StatsigProvider>
      </body>
    </html>
  );
}
