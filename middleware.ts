import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware for handling localized routes
// No automatic redirects - users choose their preferred version
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Detect user's country from various sources
  // 1. Vercel geo object (if deployed on Vercel)
  // 2. Netlify x-country header (if deployed on Netlify)
  // 3. Standard geo headers
  const detectedCountry =
    (request as any).geo?.country ||
    request.headers.get("x-country") ||
    request.headers.get("CF-IPCountry") ||
    request.headers.get("X-Country-Code") ||
    null;

  // Handle /us routes - no redirects, just pass through
  if (pathname.startsWith("/us")) {
    const response = NextResponse.next();
    // Add detected country as header for client components
    if (detectedCountry) {
      response.headers.set("x-detected-country", detectedCountry);
    }
    return response;
  }

  const response = NextResponse.next();

  // Add detected country as header for client components
  if (detectedCountry) {
    response.headers.set("x-detected-country", detectedCountry);
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    // Match all routes except static files
    "/((?!_next/static|_next/image|favicon.ico|studio).*)",
  ],
};
