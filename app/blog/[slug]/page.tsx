import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { postQuery, postPathsQuery } from '@/sanity/lib/queries'
import { formatDate } from '@/lib/utils'
import Container from '@/components/ui/Container'
import PortableText from '@/components/blog/PortableText'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(postPathsQuery)
  return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seo?.metaTitle || `${post.title} - RosterLab Blog`,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.seo?.ogImage ? [urlFor(post.seo.ogImage).url()] : 
              post.mainImage ? [urlFor(post.mainImage).url()] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })

  if (!post) {
    notFound()
  }

  return (
    <article className="py-16 bg-white">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-neutral-500">
            <li>
              <Link href="/" className="hover:text-neutral-700">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-neutral-700">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-700">{post.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-12 text-center">
          {post.categories && post.categories.length > 0 && (
            <div className="flex justify-center flex-wrap gap-2 mb-4">
              {post.categories.map((category: { title: string; slug: { current: string } }) => (
                <span
                  key={category.slug.current}
                  className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 max-w-4xl mx-auto">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          )}

          {/* Author and Date */}
          <div className="flex items-center justify-center space-x-4 text-neutral-500">
            {post.author.image && (
              <div className="relative w-10 h-10">
                <Image
                  src={urlFor(post.author.image).width(40).height(40).url()}
                  alt={post.author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div className="text-left">
              <p className="font-medium text-neutral-700">{post.author.name}</p>
              <time className="text-sm">{formatDate(post.publishedAt)}</time>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="mb-12">
            <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} />
          </div>

          {/* Author Bio */}
          {post.author.bio && (
            <div className="mt-12 p-6 bg-neutral-50 rounded-lg">
              <div className="flex items-start space-x-4">
                {post.author.image && (
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={urlFor(post.author.image).width(64).height(64).url()}
                      alt={post.author.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    About {post.author.name}
                  </h3>
                  <p className="text-neutral-600">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}