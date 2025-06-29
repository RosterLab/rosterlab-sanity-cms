import Link from 'next/link'
import { urlFor } from '@/sanity/lib/client'
import { formatDate } from '@/lib/utils'

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  mainImage?: any
  publishedAt: string
  author?: {
    name: string
  }
  categories?: Array<{
    title: string
    slug: {
      current: string
    }
  }>
}

interface RelatedPostsProps {
  posts: Post[]
  currentPostId: string
  currentPostDate: string
}

export default function RelatedPosts({ posts, currentPostId, currentPostDate }: RelatedPostsProps) {
  // Helper function to determine the correct URL path based on categories
  const getPostUrl = (post: Post) => {
    if (post.categories?.some(cat => cat.slug.current === 'case-studies')) {
      return `/case-studies/${post.slug.current}`
    } else if (post.categories?.some(cat => cat.slug.current === 'newsroom')) {
      return `/newsroom/${post.slug.current}`
    }
    return `/blog/${post.slug.current}`
  }

  // Find next and previous posts based on date
  const sortedPosts = posts
    .filter(post => post._id !== currentPostId)
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
  
  const currentDate = new Date(currentPostDate).getTime()
  
  // Find the previous post (older than current)
  const previousPost = sortedPosts
    .filter(post => new Date(post.publishedAt).getTime() < currentDate)
    .pop() // Get the last one (most recent of the older posts)
  
  // Find the next post (newer than current)
  const nextPost = sortedPosts
    .find(post => new Date(post.publishedAt).getTime() > currentDate)
  
  // Combine posts, filtering out undefined values
  const relatedPosts = [previousPost, nextPost].filter(Boolean) as Post[]

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-16 mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">You might also be interested in</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedPosts.map((post) => (
          <article key={post._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Link href={getPostUrl(post)}>
              {post.mainImage && (
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={urlFor(post.mainImage).width(400).height(225).url()}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                {post.categories && post.categories.length > 0 && (
                  <p className="text-sm text-purple-600 font-medium mb-2">
                    {post.categories[0].title}
                  </p>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  {post.author?.name && (
                    <>
                      <span>{post.author.name}</span>
                      <span className="mx-2">·</span>
                    </>
                  )}
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}