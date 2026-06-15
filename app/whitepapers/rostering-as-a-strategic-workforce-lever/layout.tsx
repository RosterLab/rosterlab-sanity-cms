import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rostering as a Strategic Workforce Lever | Free Whitepaper",
  description:
    "Free whitepaper: How healthcare executives use intelligent scheduling to solve workforce challenges | RosterLab",
  alternates: {
    canonical: "https://rosterlab.com/whitepapers/rostering-as-a-strategic-workforce-lever",
  },
  openGraph: {
    title: "Rostering as a Strategic Workforce Lever | Free Whitepaper",
    description:
      "Free whitepaper: How healthcare executives use intelligent scheduling to solve workforce challenges | RosterLab",
    type: "website",
    url: "https://rosterlab.com/whitepapers/rostering-as-a-strategic-workforce-lever",
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
    title: "Rostering as a Strategic Workforce Lever | Free Whitepaper",
    description:
      "Free whitepaper: How healthcare executives use intelligent scheduling to solve workforce challenges | RosterLab",
    images: ["/images/og-images/whitepaper-og.png"],
  },
  keywords: [
    "healthcare scheduling software",
    "workforce scheduling",
    "rostering strategy",
    "healthcare workforce",
    "staff turnover",
    "agency spend",
    "chronic understaffing",
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
