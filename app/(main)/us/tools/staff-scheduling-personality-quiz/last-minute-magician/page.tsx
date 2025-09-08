import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import LastMinuteMagicianClient from './LastMinuteMagicianClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Last-Minute Magician - Your Schedule Personality',
  description: 'Thrives under pressure, makes magic happen at the last moment. Your ability to pull together perfect schedules when time is running out is legendary.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'The Last-Minute Magician - Your Schedule Personality',
    description: 'Thrives under pressure, makes magic happen at the last moment. Your ability to pull together perfect schedules when time is running out is legendary.',
    images: [
      {
        url: '/images/quiz/og/og.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab Personality Quiz - Last-Minute Magician'
      }
    ],
    type: 'website',
    url: '/tools/staff-scheduling-personality-quiz/last-minute-magician'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Last-Minute Magician - Your Schedule Personality',
    description: 'Thrives under pressure, makes magic happen at the last moment. Your ability to pull together perfect schedules when time is running out is legendary.',
    images: ['/images/quiz/og/og.png']
  }
}

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["how-to-optimise-shifts-during-a-hiring-freeze", 
                      "staff-scheduling-to-payroll-the-right-way-to-do-it", 
                      "manage-night-shift-planning-wellbeing-effectively"])] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name}
  }
`

export default async function LastMinuteMagicianPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  
  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery)
  
  return <LastMinuteMagicianClient recommendedPosts={recommendedPosts} />
}