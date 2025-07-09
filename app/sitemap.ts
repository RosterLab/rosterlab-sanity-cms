import { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

// Base URL for the site
const baseUrl = 'https://rosterlab.com'

// Pages to exclude from sitemap
const excludedPaths = [
  '/studio', // Sanity Studio
  '/api',    // API routes
]

// Function to recursively find all page.tsx files
function findPages(dir: string, basePath: string = ''): string[] {
  const pages: string[] = []
  
  try {
    const files = readdirSync(dir)
    
    for (const file of files) {
      const filePath = join(dir, file)
      const stat = statSync(filePath)
      
      if (stat.isDirectory()) {
        // Skip excluded directories
        const currentPath = basePath + '/' + file
        if (excludedPaths.some(excluded => currentPath.startsWith(excluded))) {
          continue
        }
        
        // Handle dynamic routes
        if (file.startsWith('[') && file.endsWith(']')) {
          // Skip dynamic route folders for static sitemap
          continue
        }
        
        // Recursively search subdirectories
        pages.push(...findPages(filePath, currentPath))
      } else if (file === 'page.tsx' && basePath !== '') {
        // Add the route (basePath already has leading /)
        pages.push(basePath)
      }
    }
    
    // Add root page if we're at the app directory
    if (basePath === '' && files.includes('page.tsx')) {
      pages.push('')
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }
  
  return pages
}

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
  // Dynamically find all pages
  const appDir = join(process.cwd(), 'app')
  const staticRoutes = findPages(appDir)
  
  // Sort routes for consistency
  staticRoutes.sort()
  
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

  // Add individual post pages for case studies and newsroom
  const caseStudyEntries = caseStudies?.map((post: any) => ({
    url: `${baseUrl}/case-studies/${post.slug}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) || []

  const newsroomEntries = newsroomPosts?.map((post: any) => ({
    url: `${baseUrl}/newsroom/${post.slug}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) || []

  // Combine all entries
  return [
    ...staticEntries,
    ...postEntries,
    ...caseStudyEntries,
    ...newsroomEntries,
    ...paginationEntries,
  ]
}