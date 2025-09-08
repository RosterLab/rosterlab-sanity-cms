import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { readdirSync, statSync, readFileSync } from 'fs'
import { join } from 'path'
import nextConfig from '@/next.config'

// Base URL for the site
const baseUrl = 'https://rosterlab.com'

// Pages to exclude from sitemap
const excludedPaths = [
  '/studio',   // Sanity Studio - has noindex
  '/api',      // API routes
  '/draft',    // Draft pages - have noindex
  '/azure-ad', // Azure AD - has noindex
]

// Import from the centralized location
import { US_URL_MAPPINGS, LOCALIZED_PAGES } from '@/components/seo/HreflangTags'

// Function to check if a page or its layout has noindex robots meta
function hasNoIndex(pagePath: string): boolean {
  try {
    // Check the page.tsx file
    const pageContent = readFileSync(pagePath, 'utf8')
    if (pageContent.includes('robots:') && pageContent.includes('index: false')) {
      return true
    }
    
    // Also check if there's a layout.tsx in the same directory
    const dir = pagePath.substring(0, pagePath.lastIndexOf('/'))
    const layoutPath = join(dir, 'layout.tsx')
    try {
      const layoutContent = readFileSync(layoutPath, 'utf8')
      if (layoutContent.includes('robots:') && layoutContent.includes('index: false')) {
        return true
      }
    } catch {
      // No layout file or can't read it, continue
    }
    
    return false
  } catch (error) {
    return false
  }
}

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
        
        // Skip the /us directory as we'll handle it separately
        if (file === 'us' && basePath === '') {
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
        // Check if the page has noindex metadata
        if (!hasNoIndex(filePath)) {
          // Add the route (basePath already has leading /)
          pages.push(basePath)
        }
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

// Generate hreflang links for a URL
function generateHreflangLinks(path: string): string {
  const links: string[] = []
  
  // Check if this page has a US version
  if (LOCALIZED_PAGES.has(path || '/')) {
    const usPath = US_URL_MAPPINGS[path || '/'] || `/us${path}`
    
    // Default (AU/NZ) version
    links.push(`    <xhtml:link rel="alternate" hreflang="en-AU" href="${baseUrl}${path}"/>`)
    links.push(`    <xhtml:link rel="alternate" hreflang="en-NZ" href="${baseUrl}${path}"/>`)
    
    // US version
    links.push(`    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}${usPath}"/>`)
    
    // x-default (let search engines decide)
    links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${path}"/>`)
  }
  
  return links.join('\n')
}

// Query for dynamic content
const postQuery = groq`*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt,
  _updatedAt,
  categories[]->{
    slug
  }
}`

async function generateSitemap() {
  // Get redirects from next.config
  const redirects = await nextConfig.redirects?.()
  const redirectSourcePaths = new Set(redirects?.map(r => r.source.replace('/:path*', '').replace('/:slug*', '')) || [])
  
  // Dynamically find all pages
  const appDir = join(process.cwd(), 'app')
  const staticRoutes = findPages(appDir)
  
  // Sort routes for consistency
  staticRoutes.sort()
  
  // Fetch dynamic content from Sanity
  const posts = await client.fetch(postQuery)

  // Generate XML entries
  const entries: string[] = []
  
  // Add static routes (default version)
  for (const route of staticRoutes) {
    const lastmod = new Date().toISOString()
    const priority = route === '' ? 1 : route.includes('/feature/') ? 0.9 : 0.8
    const hreflangLinks = generateHreflangLinks(route)
    
    entries.push(`  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${hreflangLinks ? '\n' + hreflangLinks : ''}
  </url>`)
  }
  
  // Add US versions of localized pages
  for (const originalPath of LOCALIZED_PAGES) {
    const usPath = US_URL_MAPPINGS[originalPath] || `/us${originalPath}`
    const lastmod = new Date().toISOString()
    const priority = originalPath === '/' ? 1 : originalPath.includes('/feature/') ? 0.9 : 0.8
    
    entries.push(`  <url>
    <loc>${baseUrl}${usPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en-AU" href="${baseUrl}${originalPath}"/>
    <xhtml:link rel="alternate" hreflang="en-NZ" href="${baseUrl}${originalPath}"/>
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}${usPath}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${originalPath}"/>
  </url>`)
  }
  
  // Add blog posts
  const blogPosts = posts?.filter((post: any) => {
    const categorySlugStrings = post.categories?.map((cat: any) => cat.slug?.current) || []
    return !categorySlugStrings.includes('case-studies') && !categorySlugStrings.includes('newsroom')
  }) || []
  
  for (const post of blogPosts) {
    const blogUrl = `/blog/${post.slug}`
    if (!redirectSourcePaths.has(blogUrl)) {
      const lastmod = new Date(post._updatedAt || post.publishedAt).toISOString()
      entries.push(`  <url>
    <loc>${baseUrl}${blogUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
    }
  }
  
  // Add case studies
  const caseStudies = posts?.filter((post: any) => 
    post.categories?.some((cat: any) => cat.slug?.current === 'case-studies')
  ) || []
  
  for (const post of caseStudies) {
    const caseStudyUrl = `/case-studies/${post.slug}`
    if (!redirectSourcePaths.has(caseStudyUrl)) {
      const lastmod = new Date(post._updatedAt || post.publishedAt).toISOString()
      entries.push(`  <url>
    <loc>${baseUrl}${caseStudyUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
    }
  }
  
  // Add newsroom posts
  const newsroomPosts = posts?.filter((post: any) => 
    post.categories?.some((cat: any) => cat.slug?.current === 'newsroom')
  ) || []
  
  for (const post of newsroomPosts) {
    const newsroomUrl = `/newsroom/${post.slug}`
    if (!redirectSourcePaths.has(newsroomUrl)) {
      const lastmod = new Date(post._updatedAt || post.publishedAt).toISOString()
      entries.push(`  <url>
    <loc>${baseUrl}${newsroomUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
    }
  }
  
  // Add pagination pages
  const postsPerPage = 12
  
  // Blog pagination
  const blogTotalPages = Math.ceil(blogPosts.length / postsPerPage)
  for (let i = 2; i <= blogTotalPages; i++) {
    entries.push(`  <url>
    <loc>${baseUrl}/blog/page/${i}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`)
  }
  
  // Case studies pagination
  const caseStudiesTotalPages = Math.ceil(caseStudies.length / postsPerPage)
  for (let i = 2; i <= caseStudiesTotalPages; i++) {
    entries.push(`  <url>
    <loc>${baseUrl}/case-studies/page/${i}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`)
  }
  
  // Newsroom pagination
  const newsroomTotalPages = Math.ceil(newsroomPosts.length / postsPerPage)
  for (let i = 2; i <= newsroomTotalPages; i++) {
    entries.push(`  <url>
    <loc>${baseUrl}/newsroom/page/${i}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`)
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`
}

export async function GET() {
  const sitemap = await generateSitemap()
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}