import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import ChaosCarlaClient from './ChaosCarlaClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chaos Carla - Your Rostering Personality',
  description: 'Pessimistic planner who expects the worst and creates backup rosters for the backup rosters. Your cautious approach ensures you\'re prepared for any scheduling disaster.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Chaos Carla - Your Rostering Personality',
    description: 'Pessimistic planner who expects the worst and creates backup rosters for the backup rosters. Your cautious approach ensures you\'re prepared for any scheduling disaster.',
    images: [
      {
        url: '/images/quiz/og/og.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab Personality Quiz - Chaos Carla'
      }
    ],
    type: 'website',
    url: '/tools/staff-scheduling-personality-quiz/chaos-carla'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chaos Carla - Your Rostering Personality',
    description: 'Pessimistic planner who expects the worst and creates backup rosters for the backup rosters. Your cautious approach ensures you\'re prepared for any scheduling disaster.',
    images: ['/images/quiz/og/og.png']
  }
}

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["manage-night-shift-planning-wellbeing-effectively", 
                      "how-to-reduce-absenteeism-for-shift-workers", 
                      "rostering-basics"])] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name}
  }
`

export default async function ChaosCarlaPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  
  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery)
  
  return <ChaosCarlaClient recommendedPosts={recommendedPosts} />
}