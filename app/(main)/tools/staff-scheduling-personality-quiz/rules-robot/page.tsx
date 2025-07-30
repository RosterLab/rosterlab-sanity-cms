import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import RulesRobotClient from './RulesRobotClient'

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