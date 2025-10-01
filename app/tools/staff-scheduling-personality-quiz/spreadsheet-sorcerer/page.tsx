import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import { validatedToken } from "@/sanity/lib/token";
import SpreadsheetSorcererClient from "./SpreadsheetSorcererClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Spreadsheet Sorcerer - Your Roster Personality",
  description:
    "Master of formulas and pivot tables. Discover your rostering personality and learn how to leverage your data-driven approach to create perfectly optimized staff schedules.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "The Spreadsheet Sorcerer - Your Roster Personality",
    description:
      "Master of formulas and pivot tables. Discover your rostering personality and learn how to leverage your data-driven approach to create perfectly optimized staff schedules.",
    images: [
      {
        url: "/images/quiz/og/og.png",
        width: 1200,
        height: 630,
        alt: "RosterLab Personality Quiz - Spreadsheet Sorcerer",
      },
    ],
    type: "website",
    url: "/tools/staff-scheduling-personality-quiz/spreadsheet-sorcerer",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spreadsheet Sorcerer - Your Roster Personality",
    description:
      "Master of formulas and pivot tables. Discover your rostering personality and learn how to leverage your data-driven approach to create perfectly optimized staff schedules.",
    images: ["/images/quiz/og/og.png"],
  },
};

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["how-to-optimise-shifts-during-a-hiring-freeze", 
                      "fairer-scheduling-at-work-reducing-shift-bias", 
                      "how-to-implement-self-scheduling"])] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name}
  }
`;

export default async function SpreadsheetSorcererPage() {
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );

  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery);

  return <SpreadsheetSorcererClient recommendedPosts={recommendedPosts} />;
}
