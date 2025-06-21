import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: { asset: { _ref: string }; alt?: string }
    publishedAt: string
    author: {
      name: string
      image?: { asset: { _ref: string }; alt?: string }
    }
    categories?: Array<{
      title: string
      slug: { current: string }
    }>
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.mainImage && (
        <Link href={`/blog/${post.slug.current}`}>
          <div className="relative h-48 w-full">
            <Image
              src={urlFor(post.mainImage).width(400).height(200).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      
      <div className="p-6">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <span
                key={category.slug.current}
                className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
        
        <h2 className="text-xl font-bold mb-3 line-clamp-2">
          <Link 
            href={`/blog/${post.slug.current}`}
            className="hover:text-primary-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        
        {post.excerpt && (
          <p className="text-neutral-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <div className="flex items-center space-x-2">
            {post.author?.image && (
              <div className="relative w-6 h-6">
                <Image
                  src={urlFor(post.author.image).width(24).height(24).url()}
                  alt={post.author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <span>{post.author?.name || 'Unknown Author'}</span>
          </div>
          <time>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </article>
  )
}