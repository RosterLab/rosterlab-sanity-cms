import { getClient } from '@/sanity/lib/client'
import { blogPostsOnlyQuery } from '@/sanity/lib/queries'
import { validatedToken } from '@/sanity/lib/token'
import BlogPageContent from '@/components/blog/BlogPageContent'
import { draftMode } from 'next/headers'

export const metadata = {
  title: 'RosterLab Blog - AI Rostering & Scheduling Tips',
  description: 'Discover insights on staff rostering, shift scheduling, and workforce planning. Stay ahead with practical tips from RosterLab.',
}

export default async function BlogPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled ? { token: validatedToken } : undefined)
  const posts = await client.fetch(blogPostsOnlyQuery)

  return <BlogPageContent posts={posts} />
}