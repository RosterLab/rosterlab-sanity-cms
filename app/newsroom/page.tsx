import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { validatedToken } from '@/sanity/lib/token'
import NewsroomPageContent from '@/components/newsroom/NewsroomPageContent'
import { draftMode } from 'next/headers'

export const metadata = {
  title: 'Newsroom - RosterLab',
  description: 'Latest news, announcements, and updates from RosterLab.',
}

const newsroomQuery = groq`
  *[_type == "post" && "newsroom" in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`

export default async function NewsroomPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled ? { token: validatedToken } : undefined)
  const posts = await client.fetch(newsroomQuery)

  return <NewsroomPageContent posts={posts} />
}