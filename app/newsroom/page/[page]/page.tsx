import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { validatedToken } from '@/sanity/lib/token'
import NewsroomPageContent from '@/components/newsroom/NewsroomPageContent'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

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
    ? 'RosterLab Newsroom - Press Releases & Updates' 
    : `RosterLab Newsroom - Page ${pageNumber}`
  
  const description = pageNumber === 1
    ? 'Get the latest RosterLab news - product launches, partnerships, awards, and media coverage. Stay updated on our AI rostering innovations.'
    : `Browse page ${pageNumber} of our news and press releases.`

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rosterlab.com'
  
  return {
    title,
    description,
    robots: {
      index: false,  // Pagination pages should not be indexed
      follow: true,
    },
    alternates: {
      canonical: pageNumber === 1 ? `${baseUrl}/newsroom` : `${baseUrl}/newsroom/page/${pageNumber}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/newsroom/page/${pageNumber}`,
      images: [
        {
          url: '/images/og images/Newsroom.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og images/Newsroom.png'],
    },
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const client = getClient()
    const posts = await client.fetch(newsroomQuery)
    
    const postsPerPage = 12
    const totalPages = Math.ceil((posts?.length || 0) / postsPerPage)
    
    if (totalPages <= 1) {
      return []
    }
    
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      page: String(i + 2), // Start from page 2
    }))
  } catch (error) {
    console.error('Error generating static params for newsroom pagination:', error)
    return []
  }
}

export default async function NewsroomPaginationPage({ params }: Props) {
  const { page } = await params
  const pageNumber = parseInt(page, 10)
  
  // Redirect to main newsroom page if page is 1
  if (pageNumber === 1) {
    return notFound()
  }
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }
  
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  const posts = await client.fetch(newsroomQuery)
  
  const postsPerPage = 12
  const totalPages = Math.ceil(posts.length / postsPerPage)
  
  if (pageNumber > totalPages) {
    notFound()
  }

  return <NewsroomPageContent posts={posts} currentPage={pageNumber} />
}