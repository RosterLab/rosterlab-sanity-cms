import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitepaper Unlocked - Healthcare Rostering Software | RosterLab",
  description:
    "Access your free whitepaper on using intelligent healthcare scheduling software to reduce staff turnover and solve chronic understaffing.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WhitepaperUnlockedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
