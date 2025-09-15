import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Get country from various sources
  const country = 
    (request as any).geo?.country ||
    request.headers.get('CloudFront-Viewer-Country') ||
    request.headers.get('CF-IPCountry') ||
    request.headers.get('X-Country-Code') ||
    request.headers.get('x-detected-country') || // From middleware
    null

  return NextResponse.json({
    country: country,
    detected: !!country
  })
}