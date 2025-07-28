import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { validatedToken } from '@/sanity/lib/token'
import CaseStudiesPageContent from '@/components/case-studies/CaseStudiesPageContent'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

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
    ? 'RosterLab Case Studies - Real-World Results' 
    : `RosterLab Case Studies - Page ${pageNumber}`
  
  const description = pageNumber === 1
    ? 'Explore our rostering success stories. See how RosterLab\'s AI cuts scheduling time and lifts staff satisfaction for industries worldwide.'
    : `Browse page ${pageNumber} of our case studies showcasing real-world rostering success stories.`

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rosterlab.com'
  
  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: pageNumber === 1 ? `${baseUrl}/case-studies` : `${baseUrl}/case-studies/page/${pageNumber}`,
    },
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const client = getClient()
    const posts = await client.fetch(caseStudiesQuery)
    
    const postsPerPage = 12
    const totalPages = Math.ceil((posts?.length || 0) / postsPerPage)
    
    if (totalPages <= 1) {
      return []
    }
    
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      page: String(i + 2), // Start from page 2
    }))
  } catch (error) {
    console.error('Error generating static params for case studies pagination:', error)
    return []
  }
}

export default async function CaseStudiesPaginationPage({ params }: Props) {
  const { page } = await params
  const pageNumber = parseInt(page, 10)
  
  // Redirect to main case studies page if page is 1
  if (pageNumber === 1) {
    return notFound()
  }
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }
  
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  const posts = await client.fetch(caseStudiesQuery)
  
  const postsPerPage = 12
  const totalPages = Math.ceil(posts.length / postsPerPage)
  
  if (pageNumber > totalPages) {
    notFound()
  }

  return <CaseStudiesPageContent posts={posts} currentPage={pageNumber} />
}