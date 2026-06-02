import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Rostering Software as a Strategic Workforce Lever | RosterLab",
  description:
    "Discover how intelligent healthcare scheduling software reduces staff turnover, cuts agency spend, and solves chronic understaffing. Real case study with measurable results.",
  alternates: {
    canonical: "https://rosterlab.com/whitepapers/rostering-as-a-strategic-workforce-lever",
  },
  openGraph: {
    title: "Healthcare Rostering Software as a Strategic Workforce Lever",
    description:
      "Discover how intelligent healthcare scheduling software reduces staff turnover, cuts agency spend, and solves chronic understaffing. Real case study with measurable results.",
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
    title: "Healthcare Rostering Software as a Strategic Workforce Lever",
    description:
      "Discover how intelligent healthcare scheduling software reduces staff turnover, cuts agency spend, and solves chronic understaffing. Real case study with measurable results.",
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
