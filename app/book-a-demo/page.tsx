import { Metadata } from "next";
import BookADemoClient from "./client";

export const metadata: Metadata = {
  title: "Book a Demo - Talk to Us About Your Scheduling Challenges",
  description:
    "Book a live demo with RosterLab to see how AI-powered rostering slashes admin time, balances shifts, and fixes your toughest scheduling challenges.",
  alternates: {
    canonical: "https://rosterlab.com/book-a-demo",
  },
  openGraph: {
    title: "Book a Demo - Talk to Us About Your Scheduling Challenges",
    description:
      "Book a live demo with RosterLab to see how AI-powered rostering slashes admin time, balances shifts, and fixes your toughest scheduling challenges.",
    type: "website",
    url: "https://rosterlab.com/book-a-demo",
    images: [
      {
        url: "/images/og-images/Bookademo.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Demo - Talk to Us About Your Scheduling Challenges",
    description:
      "Book a live demo with RosterLab to see how AI-powered rostering slashes admin time, balances shifts, and fixes your toughest scheduling challenges.",
    images: ["/images/og-images/Bookademo.png"],
  },
};

export default function BookADemoPage() {
  return <BookADemoClient />;
}
