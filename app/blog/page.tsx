import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import BlogCard from '@/components/blog/BlogCard'
import Container from '@/components/ui/Container'

export const metadata = {
  title: 'Blog - RosterLab',
  description: 'Insights, tips, and updates on workforce management and employee scheduling.',
}

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery)

  return (
    <div className="py-16 bg-neutral-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            RosterLab Blog
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Insights, tips, and updates on workforce management and employee scheduling.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: {
              _id: string;
              title: string;
              slug: { current: string };
              excerpt?: string;
              mainImage?: { asset: { _ref: string }; alt?: string };
              publishedAt: string;
              author: { name: string; image?: { asset: { _ref: string }; alt?: string } };
              categories?: Array<{ title: string; slug: { current: string } }>;
            }) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-neutral-600 mb-4">
              No blog posts yet
            </h2>
            <p className="text-neutral-500">
              Check back soon for the latest insights on workforce management.
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}