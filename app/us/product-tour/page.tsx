import { Metadata } from "next";
import ProductTourClient from "./client";
import PageWrapper from "./PageWrapper";

export const metadata: Metadata = {
  title: "Product Tour - Staff Scheduling Demo | RosterLab",
  description:
    "Try RosterLab's interactive scheduling demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.",
  alternates: {
    canonical: "https://rosterlab.com/us/product-tour",
  },
  openGraph: {
    title: "Product Tour - Staff Scheduling Demo | RosterLab",
    description:
      "Try RosterLab's interactive scheduling demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.",
    type: "website",
    url: "https://rosterlab.com/us/product-tour",
    images: [
      {
        url: "/images/og-images/InteractiveDemo.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Tour - Staff Scheduling Demo | RosterLab",
    description:
      "Try RosterLab's interactive scheduling demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.",
    images: ["/images/og-images/InteractiveDemo.png"],
  },
};

export default function ProductTour() {
  return (
    <PageWrapper>
      <ProductTourClient />
    </PageWrapper>
  );
}