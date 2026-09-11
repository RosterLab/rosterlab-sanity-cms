
import { resourceMetadata } from "@/lib/localization/us-resources";
import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { validatedToken } from "@/sanity/lib/token";
import NewsroomPageContent from "@/components/newsroom/NewsroomPageContent";
import { draftMode } from "next/headers";

export const metadata = resourceMetadata({
  title: "Newsroom - Press Releases & Updates",
  description:
    "Get the latest RosterLab news - product launches, partnerships, awards, and media coverage. Stay updated on our AI rostering innovations.",
  alternates: {
    canonical: "https://rosterlab.com/newsroom",
  },
  openGraph: {
    title: "RosterLab Newsroom - Press Releases & Updates",
    description:
      "Get the latest RosterLab news - product launches, partnerships, awards, and media coverage. Stay updated on our AI rostering innovations.",
    type: "website",
    url: "https://rosterlab.com/newsroom",
    images: [
      {
        url: "/images/og-images/Newsroom.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RosterLab Newsroom - Press Releases & Updates",
    description:
      "Get the latest RosterLab news - product launches, partnerships, awards, and media coverage. Stay updated on our AI rostering innovations.",
    images: ["/images/og-images/Newsroom.png"],
  },
}, `/newsroom`);

const newsroomQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != "us") && "newsroom" in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name,
      slug,
      image
    },
    "authors": authors[]->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`;

export default async function NewsroomPage() {
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const posts = await client.fetch(newsroomQuery);

  return <NewsroomPageContent posts={posts} />;
}
