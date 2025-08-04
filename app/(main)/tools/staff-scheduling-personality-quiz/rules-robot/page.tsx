import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import RulesRobotClient from './RulesRobotClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Rules Robot - Your Rostering Personality',
  description: 'You\'re the guardian of compliance, the protector of protocols. Discover your rostering personality and learn how to leverage your systematic approach to staff scheduling.',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'The Rules Robot - Your Rostering Personality',
    description: 'You\'re the guardian of compliance, the protector of protocols. Discover your rostering personality and learn how to leverage your systematic approach to staff scheduling.',
    images: [
      {
        url: '/images/quiz/og/og.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab Personality Quiz - Rules Robot'
      }
    ],
    type: 'website',
    url: '/tools/staff-scheduling-personality-quiz/rules-robot'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Rules Robot - Your Rostering Personality',
    description: 'You\'re the guardian of compliance, the protector of protocols. Discover your rostering personality and learn how to leverage your systematic approach to staff scheduling.',
    images: ['/images/quiz/og/og.png']
  }
}

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["manage-night-shift-planning-wellbeing-effectively", 
                      "fairer-scheduling-at-work-reducing-shift-bias", 
                      "staff-rostering-to-payroll-the-right-way-to-do-it"])] {
    _id,
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
  const recommendedPosts = await client.fetch(recommendedPostsQuery)
  
  return <RulesRobotClient recommendedPosts={recommendedPosts} />
}