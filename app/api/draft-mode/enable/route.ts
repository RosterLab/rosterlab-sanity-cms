import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { token } from '@/sanity/lib/token'
import { client } from '@/sanity/lib/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'

export async function GET(request: NextRequest) {
  try {
    // Handle Sanity preview requests
    const url = new URL(request.url)
    if (url.searchParams.has('sanity-preview-secret')) {
      // Use validatePreviewUrl for Sanity preview
      const { isValid, redirectTo = '/' } = await validatePreviewUrl(
        client.withConfig({
          token: token || undefined,
        }),
        request.url
      )

      if (!isValid) {
        return new Response('Invalid preview secret', { status: 401 })
      }

      const draft = await draftMode()
      draft.enable()

      return NextResponse.redirect(new URL(redirectTo, request.url))
    }

    // Handle regular preview requests
    const secret = url.searchParams.get('secret')
    const slug = url.searchParams.get('slug')

    if (!secret) {
      return new Response('Missing secret', { status: 401 })
    }

    // Verify the secret matches
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Invalid secret', { status: 401 })
    }

    const draft = await draftMode()
    draft.enable()

    const redirectUrl = slug ? `/${slug}` : '/'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  } catch (error) {
    console.error('Draft mode error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}