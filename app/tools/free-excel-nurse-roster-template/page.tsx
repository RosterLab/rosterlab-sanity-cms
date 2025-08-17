import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { validatedToken } from '@/sanity/lib/token'
import ExcelTemplateClient from './ExcelTemplateClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Excel Nurse Roster Template - RosterLab',
  description: 'Download our free Excel nurse roster template. Pre-formatted monthly roster grid with shift allocation, staff tracking, and automatic totals.',
  openGraph: {
    title: 'Free Excel Nurse Roster Template - RosterLab',
    description: 'Download our free Excel nurse roster template. Pre-formatted monthly roster grid with shift allocation, staff tracking, and automatic totals.',
    images: [
      {
        url: '/images/excel/excel-preview-new.png',
        width: 1200,
        height: 600,
        alt: 'Excel nurse roster template preview'
      }
    ],
    type: 'website',
    url: '/tools/free-excel-nurse-roster-template'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Excel Nurse Roster Template - RosterLab',
    description: 'Download our free Excel nurse roster template. Pre-formatted monthly roster grid with shift allocation, staff tracking, and automatic totals.',
    images: ['/images/excel/excel-preview-new.png']
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

export default async function FreeExcelNurseRosterTemplatePage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled && validatedToken ? { token: validatedToken } : undefined)
  
  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery)
  
  return <ExcelTemplateClient recommendedPosts={recommendedPosts} />
}