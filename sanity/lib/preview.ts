import { client } from './client'

// Preview client for draft content
export const previewClient = client.withConfig({
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
})

// Helper to check if we're in preview mode
export function isPreviewMode(cookies?: string): boolean {
  if (typeof window !== 'undefined') {
    return document.cookie.includes('sanity-preview=true')
  }
  return cookies?.includes('sanity-preview=true') || false
}

// Get the appropriate client based on preview mode
export function getClient(preview = false) {
  return preview ? previewClient : client
}

// Generate preview URL
export function generatePreviewUrl(document: { _type: string; slug?: { current: string } }): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const secret = process.env.SANITY_PREVIEW_SECRET
  
  if (!secret) {
    console.warn('SANITY_PREVIEW_SECRET not set - preview URLs will not work')
    return '#'
  }

  const params = new URLSearchParams({
    secret,
    type: document._type,
    slug: document.slug?.current || '',
  })

  return `${baseUrl}/api/preview?${params.toString()}`
}