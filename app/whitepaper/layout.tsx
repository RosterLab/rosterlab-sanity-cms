import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Whitepaper: Rostering as a Strategic Workforce Lever | RosterLab",
  description:
    "Learn how Auckland Radiology achieved 93% reduction in rostering time, $80K+ annual savings, and 100% staff confidence. Real case study on using intelligent scheduling to solve workforce challenges.",
  alternates: {
    canonical: "https://rosterlab.com/whitepaper",
  },
  openGraph: {
    title: "Free Whitepaper: Rostering as a Strategic Workforce Lever",
    description:
      "Auckland Radiology case study: 93% reduction in rostering time, $80K+ savings, zero compliance breaches, and 600+ staff preferences met per cycle.",
    type: "website",
    url: "https://rosterlab.com/whitepaper",
    images: [
      {
        url: "/images/og-images/whitepaper-og.png",
        width: 1200,
        height: 630,
        alt: "Rostering as a Strategic Workforce Lever Whitepaper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Whitepaper: Rostering as a Strategic Workforce Lever",
    description:
      "Auckland Radiology case study: 93% reduction in rostering time, $80K+ savings, and 100% staff confidence.",
    images: ["/images/og-images/whitepaper-og.png"],
  },
  keywords: [
    "workforce scheduling",
    "rostering strategy",
    "healthcare workforce",
    "staff burnout",
    "workforce shortages",
    "labor costs",
    "intelligent scheduling",
    "Auckland Radiology",
    "whitepaper",
    "executive guide",
  ],
};

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
