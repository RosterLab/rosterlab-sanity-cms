import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type')

  // Check the secret and next parameters
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // Check if the document exists
  if (slug && type) {
    const document = await client.fetch(
      `*[_type == $type && slug.current == $slug][0]`,
      { type, slug }
    )

    if (!document) {
      return new Response('Document not found', { status: 404 })
    }
  }

  // Enable Draft Mode by setting the cookie
  const response = new Response()
  response.headers.set('Set-Cookie', 'sanity-preview=true; Path=/; HttpOnly; SameSite=Strict')

  // Redirect to the path from the fetched document
  const redirectUrl = type === 'post' ? `/blog/${slug}` : `/${slug || ''}`
  return redirect(redirectUrl)
}