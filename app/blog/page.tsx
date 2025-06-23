import { getClient } from '@/sanity/lib/client'
import { blogPostsOnlyQuery } from '@/sanity/lib/queries'
import { validatedToken } from '@/sanity/lib/token'
import BlogPageContent from '@/components/blog/BlogPageContent'
import { draftMode } from 'next/headers'

export const metadata = {
  title: 'Blog - RosterLab',
  description: 'Insights, tips, and updates on workforce management and employee scheduling.',
}

export default async function BlogPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled ? { token: validatedToken } : undefined)
  const posts = await client.fetch(blogPostsOnlyQuery)

  return <BlogPageContent posts={posts} />
}