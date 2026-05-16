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

  // Extract geo data from available sources
  const geo = (request as any).geo || {};
  const detectedCountry =
    geo.country ||
    request.headers.get("x-country") ||
    request.headers.get("CF-IPCountry") ||
    request.headers.get("X-Country-Code") ||
    null;

  const nfGeoHeader = request.headers.get("x-nf-geo");
  let nfGeo: Record<string, any> = {};
  if (nfGeoHeader) {
    try {
      nfGeo = JSON.parse(nfGeoHeader);
    } catch {}
  }

  const geoData = {
    country: detectedCountry,
    city: geo.city || nfGeo.city || request.headers.get("x-nf-city") || null,
    region:
      geo.region ||
      nfGeo.subdivision?.code ||
      request.headers.get("x-nf-region") ||
      null,
    timezone:
      nfGeo.timezone || request.headers.get("x-nf-timezone") || null,
    latitude:
      geo.latitude || nfGeo.latitude || null,
    longitude:
      geo.longitude || nfGeo.longitude || null,
  };

  const setGeoHeaders = (response: NextResponse) => {
    if (geoData.country)
      response.headers.set("x-detected-country", geoData.country);
    if (geoData.city) response.headers.set("x-detected-city", geoData.city);
    if (geoData.region)
      response.headers.set("x-detected-region", geoData.region);
    if (geoData.timezone)
      response.headers.set("x-detected-timezone", geoData.timezone);
    if (geoData.latitude)
      response.headers.set("x-detected-latitude", String(geoData.latitude));
    if (geoData.longitude)
      response.headers.set("x-detected-longitude", String(geoData.longitude));
  };

  if (pathname.startsWith("/us")) {
    const response = NextResponse.next();
    setGeoHeaders(response);
    return response;
  }

  const response = NextResponse.next();
  setGeoHeaders(response);
  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    // Match all routes except static files
    "/((?!_next/static|_next/image|favicon.ico|studio).*)",
  ],
};
