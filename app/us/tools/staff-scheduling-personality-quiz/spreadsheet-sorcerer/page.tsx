// Generated from app/(main)/tools/staff-scheduling-personality-quiz/spreadsheet-sorcerer/page.tsx. Run npm run localize:resources; do not edit directly.

import { localizeUSResourceResult } from "@/lib/localization/us-resources";

import { resourceMetadata } from "@/lib/localization/us-resources";
import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import SpreadsheetSorcererClient from "@/app/us/tools/staff-scheduling-personality-quiz/spreadsheet-sorcerer/SpreadsheetSorcererClient"
import { Metadata } from 'next'

export const metadata: Metadata = resourceMetadata({
  title: "The Spreadsheet Sorcerer - Your Schedule Personality",
  description: 'Master of formulas and pivot tables. Leverage your data-driven approach to create perfectly optimized staff schedules.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: "The Spreadsheet Sorcerer - Your Schedule Personality",
    description: 'Master of formulas and pivot tables. Leverage your data-driven approach to create perfectly optimized staff schedules.',
    images: [
      {
        url: '/images/quiz/og/og.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab Personality Quiz - Spreadsheet Sorcerer'
      }
    ],
    type: 'website',
    url: "/us/tools/staff-scheduling-personality-quiz/spreadsheet-sorcerer"
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Spreadsheet Sorcerer - Your Schedule Personality",
    description: 'Master of formulas and pivot tables. Leverage your data-driven approach to create perfectly optimized staff schedules.',
    images: ['/images/quiz/og/og.png']
  }
}, "/us/tools/staff-scheduling-personality-quiz/spreadsheet-sorcerer")

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != "global") && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["how-to-optimise-shifts-during-a-hiring-freeze", 
                      "fairer-scheduling-at-work-reducing-shift-bias", 
                      "how-to-implement-self-scheduling"])] {
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

export default async function SpreadsheetSorcererPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  
  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery).then(localizeUSResourceResult)
  
  return <SpreadsheetSorcererClient recommendedPosts={recommendedPosts} />
}