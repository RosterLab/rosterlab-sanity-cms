import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import { formatDate } from '@/lib/utils'

interface RelatedPost {
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
}

interface RelatedPostsProps {
  posts: RelatedPost[]
  currentPostId?: string
}

export default function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // Filter out the current post and limit to 3
  const relatedPosts = posts
    .filter(post => post._id !== currentPostId)
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-neutral-900 mb-8">Related Articles</h3>
      <div className="grid gap-8 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <article key={post._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Link href={`/blog/${post.slug.current}`}>
              {post.mainImage && (
                <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(400).height(300).url()}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                  {post.title}
                </h4>
                {post.excerpt && (
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span>{post.author?.name || 'RosterLab Team'}</span>
                  <time>{formatDate(post.publishedAt)}</time>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}