import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import SocialButterflyClient from './SocialButterflyClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Social Butterfly - Your Rostering Personality',
  description: 'Focuses on fairness, vibes, and keeping everyone happy. Your scheduling approach prioritizes team morale and interpersonal dynamics.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'The Social Butterfly - Your Rostering Personality',
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
    url: '/tools/staff-scheduling-personality-quiz/social-butterfly'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Social Butterfly - Your Rostering Personality',
    description: 'Focuses on fairness, vibes, and keeping everyone happy. Your scheduling approach prioritizes team morale and interpersonal dynamics.',
    images: ['/images/quiz/og/og.png']
  }
}

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["increase-staff-engagement-for-shift-workers", 
                      "comprehensive-guide-shift-swaps", 
                      "rotating-rosters"])] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name}
  }
`

export default async function SocialButterflyPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  
  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery)
  
  return <SocialButterflyClient recommendedPosts={recommendedPosts} />
}