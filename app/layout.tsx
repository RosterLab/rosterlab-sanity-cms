import type { Metadata } from "next";
import "./globals.css";
import ClientHeader from "@/components/layout/ClientHeader";
import ClientFooter from "@/components/layout/ClientFooter";
import { GoogleTagManagerNoscript } from "@/components/analytics/GoogleTagManager";
import GoogleTagManagerHead from "@/components/analytics/GoogleTagManagerHead";
import Amplitude from "@/components/analytics/Amplitude";
import UTMTracker from "@/components/analytics/UTMTracker";
import StructuredData from "@/components/seo/StructuredData";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { Poppins } from "next/font/google";
import { LazyStyles } from "@/components/layout/LazyStyles";
import ClientProviders from "@/components/layout/ClientProviders";
import GeolocationProvider from "@/components/layout/GeolocationProvider";
import { headers } from "next/headers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: "RosterLab - Workforce Management Solutions",
  description:
    "Simplifying workforce management with intelligent scheduling solutions.",
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
        <StructuredData type="organization" isUSPage={isUSPage} />
        <GoogleTagManagerHead gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      </head>
      <body
        className={`${poppins.className} min-h-screen bg-white text-neutral-900 antialiased`}
        suppressHydrationWarning={true}
      >
        <GoogleTagManagerNoscript gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
        <ClientProviders
          intercomAppId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID!}
        >
          <Amplitude apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!} />
          <UTMTracker debug={process.env.NODE_ENV === "development"} />
          <GeolocationProvider />
          <ClientHeader />
          <main className="flex-grow">{children}</main>
          <ClientFooter />
          {isEnabled && <VisualEditing />}
          <LazyStyles />
        </ClientProviders>
      </body>
    </html>
  );
}
