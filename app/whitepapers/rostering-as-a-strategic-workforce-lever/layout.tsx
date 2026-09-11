
import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from "next";

export const metadata: Metadata = resourceMetadata({
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
        url: "/images/whitepaper thumbnail.png",
        width: 1190,
        height: 892,
        alt: "Rostering as a Strategic Workforce Lever Whitepaper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rostering as a Strategic Workforce Lever | Free Whitepaper",
    description:
      "Free whitepaper: How healthcare executives use intelligent scheduling to solve workforce challenges | RosterLab",
    images: ["/images/whitepaper thumbnail.png"],
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
}, `/whitepapers/rostering-as-a-strategic-workforce-lever`);

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
