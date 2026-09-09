// Generated from app/(main)/tools/staff-scheduling-personality-quiz/rules-robot/page.tsx. Run npm run localize:resources; do not edit directly.

import { localizeUSResourceResult } from "@/lib/localization/us-resources";

import { resourceMetadata } from "@/lib/localization/us-resources";
import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import RulesRobotClient from "@/app/us/tools/staff-scheduling-personality-quiz/rules-robot/RulesRobotClient"
import { Metadata } from 'next'

export const metadata: Metadata = resourceMetadata({
  title: "The Rules Robot - Your Schedule Personality",
  description: 'Guardian of compliance and protocols. Leverage your systematic approach to create perfectly compliant staff schedules.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: "The Rules Robot - Your Schedule Personality",
    description: 'Guardian of compliance and protocols. Leverage your systematic approach to create perfectly compliant staff schedules.',
    images: [
      {
        url: '/images/quiz/og/og.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab Personality Quiz - Rules Robot'
      }
    ],
    type: 'website',
    url: "/us/tools/staff-scheduling-personality-quiz/rules-robot"
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Rules Robot - Your Schedule Personality",
    description: 'Guardian of compliance and protocols. Leverage your systematic approach to create perfectly compliant staff schedules.',
    images: ['/images/quiz/og/og.png']
  }
}, "/us/tools/staff-scheduling-personality-quiz/rules-robot")

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["manage-night-shift-planning-wellbeing-effectively", 
                      "fairer-scheduling-at-work-reducing-shift-bias", 
                      "staff-rostering-to-payroll-the-right-way-to-do-it"])] {
    _id,
    usLocalization,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name}
  }
`

export default async function RulesRobotPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  
  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery).then(localizeUSResourceResult)
  
  return <RulesRobotClient recommendedPosts={recommendedPosts} />
}