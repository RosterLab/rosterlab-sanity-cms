import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import { validatedToken } from "@/sanity/lib/token";
import PeacekeeperPandaClient from "./PeacekeeperPandaClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Peacekeeper Panda - Your Roster Personality",
  description:
    "Mediator type who balances personalities and conflicts with zen-like calm. Your peaceful approach creates harmony in even the most chaotic scheduling situations.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "The Peacekeeper Panda - Your Roster Personality",
    description:
      "Mediator type who balances personalities and conflicts with zen-like calm. Your peaceful approach creates harmony in even the most chaotic scheduling situations.",
    images: [
      {
        url: "/images/quiz/og/og.png",
        width: 1200,
        height: 630,
        alt: "RosterLab Personality Quiz - Peacekeeper Panda",
      },
    ],
    type: "website",
    url: "/tools/staff-scheduling-personality-quiz/peacekeeper-panda",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Peacekeeper Panda - Your Roster Personality",
    description:
      "Mediator type who balances personalities and conflicts with zen-like calm. Your peaceful approach creates harmony in even the most chaotic scheduling situations.",
    images: ["/images/quiz/og/og.png"],
  },
};

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["increase-staff-engagement-for-shift-workers", 
                      "skeleton-staffing-guide-lean-operations-management", 
                      "fairer-scheduling-at-work-reducing-shift-bias"])] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name}
  }
`;

export default async function PeacekeeperPandaPage() {
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );

  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery);

  return <PeacekeeperPandaClient recommendedPosts={recommendedPosts} />;
}
