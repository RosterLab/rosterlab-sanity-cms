import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import Intercom from "@/components/analytics/Intercom";
import Datadog from "@/components/analytics/Datadog";
import StructuredData from "@/components/seo/StructuredData";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

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
    <html lang="en">
      <head>
        <StructuredData type="organization" />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased" suppressHydrationWarning={true}>
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
