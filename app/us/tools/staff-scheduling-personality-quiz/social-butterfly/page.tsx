// Generated from app/(main)/tools/staff-scheduling-personality-quiz/social-butterfly/page.tsx. Run npm run localize:resources; do not edit directly.

import { localizeUSResourceResult } from "@/lib/localization/us-resources";

import { resourceMetadata } from "@/lib/localization/us-resources";
import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import SocialButterflyClient from "@/app/us/tools/staff-scheduling-personality-quiz/social-butterfly/SocialButterflyClient"
import { Metadata } from 'next'

export const metadata: Metadata = resourceMetadata({
  title: "The Social Butterfly - Your Schedule Personality",
  description: 'Focuses on fairness, vibes, and keeping everyone happy. Your scheduling approach prioritizes team morale and interpersonal dynamics.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: "The Social Butterfly - Your Schedule Personality",
    description: 'Focuses on fairness, vibes, and keeping everyone happy. Your scheduling approach prioritizes team morale and interpersonal dynamics.',
    images: [
      {
        url: '/images/quiz/og/og.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab Personality Quiz - Social Butterfly'
      }
    ],
    type: 'website',
    url: "/us/tools/staff-scheduling-personality-quiz/social-butterfly"
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Social Butterfly - Your Schedule Personality",
    description: 'Focuses on fairness, vibes, and keeping everyone happy. Your scheduling approach prioritizes team morale and interpersonal dynamics.',
    images: ['/images/quiz/og/og.png']
  }
}, "/us/tools/staff-scheduling-personality-quiz/social-butterfly")

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != "global") && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["increase-staff-engagement-for-shift-workers", 
                      "comprehensive-guide-shift-swaps", 
                      "rotating-rosters"])] {
    _id,
    usLocalization { protectedTerms, title, excerpt, metaTitle, metaDescription, mainImage, ogImage },
    usProtectedTerms,
    usSlug,
    usTitle,
    usExcerpt,
    usMainImage,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name},
    "authors": authors[]->{name}
  }
`

export default async function SocialButterflyPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  
  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery).then(localizeUSResourceResult)
  
  return <SocialButterflyClient recommendedPosts={recommendedPosts} />
}