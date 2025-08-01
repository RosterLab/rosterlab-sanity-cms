import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { validatedToken } from '@/sanity/lib/token'
import CaseStudiesPageContent from '@/components/case-studies/CaseStudiesPageContent'
import { draftMode } from 'next/headers'

export const revalidate = 60 // Revalidate every 60 seconds
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'RosterLab Case Studies - Better Rosters, Impactful Results',
  description: 'Explore real-world case studies showing how RosterLab\'s AI rostering improved coverage, cut admin time, and delivered fair schedules for complex teams.',
  alternates: {
    canonical: 'https://rosterlab.com/case-studies',
  },
  openGraph: {
    title: 'RosterLab Case Studies - Better Rosters, Impactful Results',
    description: 'Explore real-world case studies showing how RosterLab\'s AI rostering improved coverage, cut admin time, and delivered fair schedules for complex teams.',
    type: 'website',
    url: 'https://rosterlab.com/case-studies',
    images: [
      {
        url: '/images/og images/CaseStudies.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RosterLab Case Studies - Better Rosters, Impactful Results',
    description: 'Explore real-world case studies showing how RosterLab\'s AI rostering improved coverage, cut admin time, and delivered fair schedules for complex teams.',
    images: ['/images/og images/CaseStudies.png'],
  },
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
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  const posts = await client.fetch(caseStudiesQuery)

  return <CaseStudiesPageContent posts={posts} />
}