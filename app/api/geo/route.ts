import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const geo = (request as any).geo || {};

  const nfGeoHeader = request.headers.get("x-nf-geo");
  let nfGeo: Record<string, any> = {};
  if (nfGeoHeader) {
    try {
      nfGeo = JSON.parse(nfGeoHeader);
    } catch {}
  }

  let country =
    geo.country ||
    request.headers.get("x-country") ||
    request.headers.get("CF-IPCountry") ||
    request.headers.get("X-Country-Code") ||
    request.headers.get("x-detected-country") ||
    null;

  const city =
    geo.city || nfGeo.city || request.headers.get("x-nf-city") || null;
  const region =
    geo.region ||
    nfGeo.subdivision?.code ||
    request.headers.get("x-nf-region") ||
    null;
  const timezone =
    nfGeo.timezone || request.headers.get("x-nf-timezone") || null;
  const latitude = geo.latitude || nfGeo.latitude || null;
  const longitude = geo.longitude || nfGeo.longitude || null;

  if (process.env.NODE_ENV === "development") {
    const testCountry = request.nextUrl.searchParams.get("test-country");
    if (testCountry) {
      country = testCountry;
    }
  }

  return NextResponse.json({
    country,
    city,
    region,
    timezone,
    latitude,
    longitude,
    detected: !!country,
    ...(process.env.NODE_ENV === "development" && {
      testHint:
        "Add ?test-country=US or ?test-country=NZ to test different locations",
    }),
  });
}
