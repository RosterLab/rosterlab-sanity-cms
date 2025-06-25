import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { validatedToken } from '@/sanity/lib/token'
import CaseStudiesPageContent from '@/components/case-studies/CaseStudiesPageContent'
import { draftMode } from 'next/headers'

export const metadata = {
  title: 'RosterLab Case Studies - Real-World Results',
  description: 'Explore our rostering success stories. See how RosterLab\'s AI cuts scheduling time and lifts staff satisfaction for industries worldwide.',
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

  return <CaseStudiesPageContent posts={posts} />
}