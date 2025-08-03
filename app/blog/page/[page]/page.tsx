import { getClient } from '@/sanity/lib/client'
import { blogPostsOnlyQuery } from '@/sanity/lib/queries'
import { validatedToken } from '@/sanity/lib/token'
import BlogPageContent from '@/components/blog/BlogPageContent'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const revalidate = 300 // Revalidate every 5 minutes

interface Props {
  params: Promise<{ page: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params
  const pageNumber = parseInt(page, 10)
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    return {}
  }

  // De-optimise title and description for pages beyond 1
  const title = pageNumber === 1 
    ? 'RosterLab Blog - AI Rostering & Scheduling Tips' 
    : `RosterLab Blog - Page ${pageNumber}`
  
  const description = pageNumber === 1
    ? 'Discover insights on staff rostering, shift scheduling, and workforce planning. Stay ahead with practical tips from RosterLab.'
    : `Explore page ${pageNumber} of RosterLab's blog featuring expert insights on staff rostering, shift scheduling, and workforce management best practices.`

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rosterlab.com'
  
  return {
    title,
    description,
    robots: {
      index: false,  // Pagination pages should not be indexed
      follow: true,
    },
    alternates: {
      canonical: pageNumber === 1 ? `${baseUrl}/blog` : `${baseUrl}/blog/page/${pageNumber}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/blog/page/${pageNumber}`,
      images: [
        {
          url: '/images/og images/Blog.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og images/Blog.png'],
    },
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const client = getClient()
    const posts = await client.fetch(blogPostsOnlyQuery)
    
    const postsPerPage = 12
    const totalPages = Math.ceil((posts?.length || 0) / postsPerPage)
    
    if (totalPages <= 1) {
      return []
    }
    
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      page: String(i + 2), // Start from page 2
    }))
  } catch (error) {
    console.error('Error generating static params for blog pagination:', error)
    return []
  }
}

export default async function BlogPaginationPage({ params }: Props) {
  const { page } = await params
  const pageNumber = parseInt(page, 10)
  
  // Redirect to main blog page if page is 1
  if (pageNumber === 1) {
    return notFound()
  }
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }
  
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  const posts = await client.fetch(blogPostsOnlyQuery)
  
  const postsPerPage = 12
  const totalPages = Math.ceil(posts.length / postsPerPage)
  
  if (pageNumber > totalPages) {
    notFound()
  }

  return <BlogPageContent posts={posts} currentPage={pageNumber} />
}