// Generated from app/(main)/tools/staff-scheduling-personality-quiz/peacekeeper-panda/page.tsx. Run npm run localize:resources; do not edit directly.

import { localizeUSResourceResult } from "@/lib/localization/us-resources";

import { resourceMetadata } from "@/lib/localization/us-resources";
import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import PeacekeeperPandaClient from "@/app/us/tools/staff-scheduling-personality-quiz/peacekeeper-panda/PeacekeeperPandaClient"
import { Metadata } from 'next'

export const metadata: Metadata = resourceMetadata({
  title: "The Peacekeeper Panda - Your Schedule Personality",
  description: 'Mediator who balances personalities with zen-like calm. Your peaceful approach creates harmony in chaotic scheduling.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: "The Peacekeeper Panda - Your Schedule Personality",
    description: 'Mediator who balances personalities with zen-like calm. Your peaceful approach creates harmony in chaotic scheduling.',
    images: [
      {
        url: '/images/quiz/og/og.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab Personality Quiz - Peacekeeper Panda'
      }
    ],
    type: 'website',
    url: "/us/tools/staff-scheduling-personality-quiz/peacekeeper-panda"
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Peacekeeper Panda - Your Schedule Personality",
    description: 'Mediator who balances personalities with zen-like calm. Your peaceful approach creates harmony in chaotic scheduling.',
    images: ['/images/quiz/og/og.png']
  }
}, "/us/tools/staff-scheduling-personality-quiz/peacekeeper-panda")

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != "global") && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["increase-staff-engagement-for-shift-workers", 
                      "skeleton-staffing-guide-lean-operations-management", 
                      "fairer-scheduling-at-work-reducing-shift-bias"])] {
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

export default async function PeacekeeperPandaPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  
  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery).then(localizeUSResourceResult)
  
  return <PeacekeeperPandaClient recommendedPosts={recommendedPosts} />
}