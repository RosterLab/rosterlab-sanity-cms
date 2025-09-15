import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware for handling localized routes
// No automatic redirects - users choose their preferred version
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Detect user's country from various sources
  // 1. Vercel geo object (if deployed on Vercel)
  // 2. CloudFront headers (if deployed on AWS)
  // 3. Standard geo headers
  const detectedCountry = 
    (request as any).geo?.country ||
    request.headers.get('CloudFront-Viewer-Country') ||
    request.headers.get('CF-IPCountry') ||
    request.headers.get('X-Country-Code') ||
    null

  // Handle /us routes - no redirects, just pass through
  if (pathname.startsWith('/us')) {
    const response = NextResponse.next()
    // Add detected country as header for client components
    if (detectedCountry) {
      response.headers.set('x-detected-country', detectedCountry)
    }
    return response
  }

  // Add hreflang headers for SEO
  const response = NextResponse.next()
  
  // Add detected country as header for client components
  if (detectedCountry) {
    response.headers.set('x-detected-country', detectedCountry)
  }
  
  // Get the base path without /us prefix if present
  const basePath = pathname.startsWith('/us/') ? pathname.substring(3) : pathname
  
  // Add Link header for hreflang (for crawlers that support it)
  const linkHeader = []
  
  // Default (AU/NZ) version
  linkHeader.push(`<https://rosterlab.com${basePath}>; rel="alternate"; hreflang="en-AU"`)
  linkHeader.push(`<https://rosterlab.com${basePath}>; rel="alternate"; hreflang="en-NZ"`)
  
  // US version
  linkHeader.push(`<https://rosterlab.com/us${basePath}>; rel="alternate"; hreflang="en-US"`)
  
  // x-default (let search engines decide)
  linkHeader.push(`<https://rosterlab.com${basePath}>; rel="alternate"; hreflang="x-default"`)
  
  if (linkHeader.length > 0) {
    response.headers.set('Link', linkHeader.join(', '))
  }
  
  return response
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|studio).*)',
  ],
}