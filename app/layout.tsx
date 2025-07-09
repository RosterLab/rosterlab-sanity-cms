import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import Intercom from "@/components/analytics/Intercom";
import Datadog from "@/components/analytics/Datadog";
import StructuredData from "@/components/seo/StructuredData";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const metadata: Metadata = {
  title: "RosterLab - Workforce Management Solutions",
  description: "Simplifying workforce management with intelligent scheduling solutions.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode()
  
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://widget.intercom.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <StructuredData type="organization" />
      </head>
      <body className={`${poppins.className} min-h-screen bg-white text-neutral-900 antialiased`} suppressHydrationWarning={true}>
        <GoogleAnalytics gaId="G-KCZHPS54K5" />
        <Intercom appId="vs4gs8pu" />
        <Datadog 
          clientToken="pubc393580843174a26b699611ed717139a"
          applicationId="e3a1fc1f-9fba-491e-9f35-1860b9208e73"
          service="rosterlab-nextjs"
          env="production"
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
