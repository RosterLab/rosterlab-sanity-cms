import { Metadata } from "next";
import ProductTourClient from "./client";
import PageWrapper from "./PageWrapper";

export const metadata: Metadata = {
  title: "Product Tour - RosterLab",
  description:
    "Explore RosterLab's product tour and see how AI instantly builds fair, compliant staff schedules. Create schedules for complex teams in minutes, not days.",
  alternates: {
    canonical: "https://rosterlab.com/us/product-tour",
  },
  openGraph: {
    title: "Product Tour - RosterLab",
    description:
      "Explore RosterLab's product tour and see how AI instantly builds fair, compliant staff schedules. Create schedules for complex teams in minutes, not days.",
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
    title: "Product Tour - RosterLab",
    description:
      "Explore RosterLab's product tour and see how AI instantly builds fair, compliant staff schedules. Create schedules for complex teams in minutes, not days.",
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