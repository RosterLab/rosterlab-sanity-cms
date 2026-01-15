import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware for handling localized routes
// No automatic redirects - users choose their preferred version
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Handle www removal and trailing slash in a single redirect
  const hasWww = hostname.startsWith("www.");
  const hasTrailingSlash = url.pathname !== "/" && url.pathname.endsWith("/");

  if (hasWww || hasTrailingSlash) {
    // Remove www from hostname
    if (hasWww) {
      url.hostname = hostname.replace(/^www\./, "");
    }

    // Remove trailing slash from pathname
    if (hasTrailingSlash) {
      url.pathname = url.pathname.slice(0, -1);
    }

    // Single 301 redirect for both www and trailing slash
    return NextResponse.redirect(url, { status: 301 });
  }

  const pathname = request.nextUrl.pathname;

  // Redirect old transportation/port-rostering paths to new location
  if (pathname === "/industries/transportation/port-rostering") {
    url.pathname = "/industries/port-rostering";
    return NextResponse.redirect(url, { status: 301 });
  }
  if (pathname === "/us/industries/transportation/port-scheduling") {
    url.pathname = "/us/industries/port-scheduling";
    return NextResponse.redirect(url, { status: 301 });
  }

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
