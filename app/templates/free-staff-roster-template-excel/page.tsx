import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import ExcelTemplateClient from './ExcelTemplateClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Staff Roster Template Excel - RosterLab',
  description: 'Download our free staff roster template for Excel. Pre-formatted 6-week roster ready for assigning shifts and tracking workload automatically.',
  alternates: {
    canonical: 'https://rosterlab.com/templates/free-staff-roster-template-excel',
  },
  openGraph: {
    title: 'Free Staff Roster Template Excel - RosterLab',
    description: 'Download our free staff roster template for Excel. Pre-formatted 6-week roster ready for assigning shifts and tracking workload automatically.',
    images: [
      {
        url: '/images/og images/Excel.png',
        width: 1200,
        height: 600,
        alt: 'Excel roster template preview'
      }
    ],
    type: 'website',
    url: '/templates/free-staff-roster-template-excel'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Staff Roster Template Excel - RosterLab',
    description: 'Download our free staff roster template for Excel. Pre-formatted 6-week roster ready for assigning shifts and tracking workload automatically.',
    images: ['/images/og images/Excel.png']
  }
}

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["excel-series", 
                      "roster-more-effectively-with-excel-ep2-sleep-days-after-night-shifts", 
                      "should-your-next-staff-roster-be-built-with-ai"])] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name}
  }
`

export default async function FreeStaffRosterTemplateExcelPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  
  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery)
  
  return <ExcelTemplateClient recommendedPosts={recommendedPosts} />
}