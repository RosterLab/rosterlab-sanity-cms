import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitepaper Unlocked - AI Scheduling | RosterLab",
  description:
    "Access your free whitepaper on using intelligent healthcare scheduling software to reduce staff turnover and solve chronic understaffing.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Rostering as a Strategic Workforce Lever - RosterLab Whitepaper",
    description:
      "Access your free whitepaper on using intelligent healthcare scheduling software to reduce staff turnover and solve chronic understaffing.",
    images: [
      {
        url: "/images/whitepaper thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Rostering as a Strategic Workforce Lever - RosterLab Whitepaper",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rostering as a Strategic Workforce Lever - RosterLab Whitepaper",
    description:
      "Access your free whitepaper on using intelligent healthcare scheduling software to reduce staff turnover and solve chronic understaffing.",
    images: ["/images/whitepaper thumbnail.png"],
  },
};

export default function WhitepaperUnlockedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
