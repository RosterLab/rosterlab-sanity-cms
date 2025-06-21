import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { validatedToken } from '@/sanity/lib/token'
import BlogCard from '@/components/blog/BlogCard'
import Container from '@/components/ui/Container'
import { draftMode } from 'next/headers'
import Link from 'next/link'

export const metadata = {
  title: 'Case Studies - RosterLab',
  description: 'Real-world examples of how RosterLab transforms workforce management.',
}

const caseStudiesQuery = groq`
  *[_type == "post" && "case-studies" in categories[]->slug.current] | order(publishedAt desc) {
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

export default async function CaseStudiesPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled ? { token: validatedToken } : undefined)
  const posts = await client.fetch(caseStudiesQuery)

  return (
    <div className="py-16 bg-neutral-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Case Studies
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            See how healthcare organizations are transforming their workforce management with RosterLab.
          </p>
          
          {/* Navigation tabs */}
          <div className="flex justify-center gap-4 mt-8">
            <Link 
              href="/blog" 
              className="px-6 py-2 bg-white text-neutral-700 rounded-full font-medium hover:bg-neutral-100 transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/case-studies" 
              className="px-6 py-2 bg-primary-600 text-white rounded-full font-medium"
            >
              Case Studies
            </Link>
            <Link 
              href="/newsroom" 
              className="px-6 py-2 bg-white text-neutral-700 rounded-full font-medium hover:bg-neutral-100 transition-colors"
            >
              Newsroom
            </Link>
          </div>
        </div>

        {/* Case Studies Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-neutral-600 mb-4">
              No case studies yet
            </h2>
            <p className="text-neutral-500">
              Check back soon for real-world success stories.
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}