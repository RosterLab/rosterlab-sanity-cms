import { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

// Base URL for the site
const baseUrl = 'https://rosterlab.com'

// Static routes
const staticRoutes = [
  '',
  '/about',
  '/pricing',
  '/book-a-demo',
  '/contact',
  '/careers',
  '/why-choose-us',
  '/free-rostering-template',
  '/roi-calculator',
  '/staff-rostering-interactive-demo',
  '/industries',
  '/industries/healthcare',
  '/industries/healthcare/agedcare',
  '/industries/healthcare/edicu',
  '/industries/healthcare/radiology',
  '/solutions/ai-schedules',
  '/solutions/free-staff-scheduling',
  '/solutions/staff-roster-mobile-app',
  '/feature/auto-roster-generation',
  '/feature/leave-requests',
  '/feature/open-shifts',
  '/feature/payroll-integration',
  '/feature/preferences-rules',
  '/feature/re-rostering',
  '/feature/self-scheduling',
  '/feature/shift-swaps',
  '/resources/testimonials',
  '/blog',
  '/case-studies',
  '/newsroom',
]

// Query for dynamic content - only posts exist in Sanity
const postQuery = groq`*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt,
  _updatedAt,
  categories[]->{
    slug
  }
}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic content from Sanity
  const posts = await client.fetch(postQuery)

  // Generate sitemap entries for static routes
  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.includes('/feature/') ? 0.9 : 0.8,
  }))

  // Generate entries for blog posts
  const postEntries = posts?.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) || []

  // Calculate pagination for each section
  const postsPerPage = 12
  
  // Separate posts by category
  const blogPosts = posts?.filter((post: any) => {
    const categorySlugStrings = post.categories?.map((cat: any) => cat.slug?.current) || []
    return !categorySlugStrings.includes('case-studies') && !categorySlugStrings.includes('newsroom')
  }) || []
  
  const caseStudies = posts?.filter((post: any) => 
    post.categories?.some((cat: any) => cat.slug?.current === 'case-studies')
  ) || []
  
  const newsroomPosts = posts?.filter((post: any) => 
    post.categories?.some((cat: any) => cat.slug?.current === 'newsroom')
  ) || []

  // Generate pagination entries
  const paginationEntries = []
  
  // Blog pagination
  const blogTotalPages = Math.ceil(blogPosts.length / postsPerPage)
  for (let i = 2; i <= blogTotalPages; i++) {
    paginationEntries.push({
      url: `${baseUrl}/blog/page/${i}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })
  }
  
  // Case studies pagination
  const caseStudiesTotalPages = Math.ceil(caseStudies.length / postsPerPage)
  for (let i = 2; i <= caseStudiesTotalPages; i++) {
    paginationEntries.push({
      url: `${baseUrl}/case-studies/page/${i}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })
  }
  
  // Newsroom pagination
  const newsroomTotalPages = Math.ceil(newsroomPosts.length / postsPerPage)
  for (let i = 2; i <= newsroomTotalPages; i++) {
    paginationEntries.push({
      url: `${baseUrl}/newsroom/page/${i}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })
  }

  // Combine all entries
  return [
    ...staticEntries,
    ...postEntries,
    ...paginationEntries,
  ]
}