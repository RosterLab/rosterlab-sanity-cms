import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RosterLab Demo - AI Staff Rostering Software Walkthrough",
  description:
    "Watch how RosterLab helps healthcare teams optimize rostering, reduce admin time drastically, and boost staff autonomy.",
  openGraph: {
    title: "RosterLab Demo - AI Staff Rostering Software Walkthrough",
    description:
      "Watch how RosterLab helps healthcare teams optimize rostering, reduce admin time drastically, and boost staff autonomy.",
    images: ["/images/og-images/demo-video.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RosterLab Demo - AI Staff Rostering Software Walkthrough",
    description:
      "Watch how RosterLab helps healthcare teams optimize rostering, reduce admin time drastically, and boost staff autonomy.",
  },
};

export default function DemoVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
