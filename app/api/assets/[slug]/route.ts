import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { assetBySlugQuery } from '@/sanity/lib/queries'
import { getAssetUrl } from '@/sanity/lib/imageUrl'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const asset = await client.fetch(assetBySlugQuery, { slug: params.slug })
    
    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }
    
    const imageUrl = getAssetUrl(asset)
    
    // Redirect to the Sanity CDN URL with caching
    return NextResponse.redirect(imageUrl, {
      status: 301, // Permanent redirect
      headers: {
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      }
    })
  } catch (error) {
    console.error('Error fetching asset:', error)
    return NextResponse.json({ error: 'Failed to fetch asset' }, { status: 500 })
  }
}