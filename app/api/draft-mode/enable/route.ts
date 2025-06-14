import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { token } from '@/sanity/lib/token'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (!secret) {
    return new Response('Missing secret', { status: 401 })
  }

  if (!token) {
    return new Response('Missing token', { status: 401 })
  }

  // Verify the secret matches
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  const redirectUrl = slug ? `/${slug}` : '/'
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}