import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get country from various sources
  let country =
    (request as any).geo?.country ||
    request.headers.get("x-country") || // Netlify header
    request.headers.get("CF-IPCountry") ||
    request.headers.get("X-Country-Code") ||
    request.headers.get("x-detected-country") || // From middleware
    null;

  // Local development testing - simulate different countries via query param
  if (process.env.NODE_ENV === "development") {
    const testCountry = request.nextUrl.searchParams.get("test-country");
    if (testCountry) {
      country = testCountry;
    }
  }

  return NextResponse.json({
    country: country,
    detected: !!country,
    // Show available test params in development
    ...(process.env.NODE_ENV === "development" && {
      testHint:
        "Add ?test-country=US or ?test-country=NZ to test different locations",
    }),
  });
}
