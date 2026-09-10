// Generated from app/whitepapers/rostering-as-a-strategic-workforce-lever/unlocked/layout.tsx. Run npm run localize:resources; do not edit directly.

import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from "next";

export const metadata: Metadata = resourceMetadata({
  title: "Whitepaper Unlocked - AI Scheduling | RosterLab",
  description:
    "Access your free whitepaper on using intelligent healthcare scheduling software to reduce staff turnover and solve chronic understaffing.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Scheduling as a Strategic Workforce Lever - RosterLab Whitepaper",
    description:
      "Access your free whitepaper on using intelligent healthcare scheduling software to reduce staff turnover and solve chronic understaffing.",
    images: [
      {
        url: "/images/whitepaper thumbnail.png",
        width: 1190,
        height: 892,
        alt: "Scheduling as a Strategic Workforce Lever - RosterLab Whitepaper",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scheduling as a Strategic Workforce Lever - RosterLab Whitepaper",
    description:
      "Access your free whitepaper on using intelligent healthcare scheduling software to reduce staff turnover and solve chronic understaffing.",
    images: ["/images/whitepaper thumbnail.png"],
  },
}, "/us/whitepapers/scheduling-as-a-strategic-workforce-lever/unlocked");

export default function WhitepaperUnlockedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
