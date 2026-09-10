import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware for handling localized routes
// No automatic redirects - users choose their preferred version
export function middleware(request: NextRequest) {
  // A plain URL preserves our explicit trailing-slash normalization; NextURL
  // can reapply the original trailing slash when it serializes a redirect.
  const url = new URL(request.url);
  const hostname = request.headers.get("host") || "";

  // request.url carries the origin the Next runtime sees, which behind a CDN is
  // the internal one. Redirecting to that would either downgrade to http - and
  // cost a second hop through the CDN's HTTPS rule on every www and trailing
  // slash URL on the site - or point at an internal host. The forwarded headers
  // are the public origin, so prefer them whenever they are present.
  const forwardedProto = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();
  if (forwardedProto) url.protocol = `${forwardedProto}:`;
  if (hostname) {
    url.host = hostname;
    // The host setter keeps any existing port, so clear it explicitly when
    // the forwarded host carries none.
    if (!hostname.includes(":")) url.port = "";
  }

  // Accept common US blog URL variants while preserving article slugs and queries.
  const canonicalBlogPath = url.pathname.replace(
    /^\/us\/blogs?(?=\/|$)/i,
    "/us/blog",
  );
  const hasBlogAlias = canonicalBlogPath !== url.pathname;

  // Handle www removal and trailing slash in a single redirect
  const hasWww = hostname.startsWith("www.");
  const hasTrailingSlash = url.pathname !== "/" && url.pathname.endsWith("/");

  if (hasWww || hasTrailingSlash || hasBlogAlias) {
    url.pathname = canonicalBlogPath;
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
    timezone: nfGeo.timezone || request.headers.get("x-nf-timezone") || null,
    latitude: geo.latitude || nfGeo.latitude || null,
    longitude: geo.longitude || nfGeo.longitude || null,
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
    // Expose the current pathname to server components (the layout uses this
    // to detect US vs global pages).
    response.headers.set("x-pathname", pathname);
  };

  // Forward the pathname on the *request* headers so server components that
  // call headers() can read it (response headers aren't visible there).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
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
