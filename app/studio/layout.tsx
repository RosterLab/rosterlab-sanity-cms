import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio - RosterLab",
  description: "Content management studio for RosterLab.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}