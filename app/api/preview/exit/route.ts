import { redirect } from 'next/navigation'

export async function GET() {
  // Clear the preview cookie
  const response = new Response()
  response.headers.set('Set-Cookie', 'sanity-preview=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0')
  
  // Redirect to the homepage
  return redirect('/')
}