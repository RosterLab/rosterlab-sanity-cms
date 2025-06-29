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
  let redirectUrl = `/${slug || ''}`
  
  if (slug && type) {
    const document = await client.fetch(
      `*[_type == $type && slug.current == $slug][0]{
        ...,
        categories[]->
      }`,
      { type, slug }
    )

    if (!document) {
      return new Response('Document not found', { status: 404 })
    }

    // Determine the correct URL based on categories for posts
    if (type === 'post' && document.categories) {
      const categorySlug = document.categories.find((cat: any) => 
        cat.slug?.current === 'case-studies' || cat.slug?.current === 'newsroom'
      )?.slug?.current

      if (categorySlug === 'case-studies') {
        redirectUrl = `/case-studies/${slug}`
      } else if (categorySlug === 'newsroom') {
        redirectUrl = `/newsroom/${slug}`
      } else {
        redirectUrl = `/blog/${slug}`
      }
    } else if (type === 'post') {
      redirectUrl = `/blog/${slug}`
    }
  }

  // Enable Draft Mode by setting the cookie
  const response = new Response()
  response.headers.set('Set-Cookie', 'sanity-preview=true; Path=/; HttpOnly; SameSite=Strict')

  // Redirect to the path from the fetched document
  return redirect(redirectUrl)
}