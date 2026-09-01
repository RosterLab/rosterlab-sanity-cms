import type { NextRequest } from "next/server";
import { normalizeCountryCode } from "./policy";

function countryFromNetlifyHeader(request: NextRequest): string | null {
  const raw = request.headers.get("x-nf-geo");
  if (!raw) return null;

  try {
    const geo = JSON.parse(raw);
    return normalizeCountryCode(
      geo?.country?.code || geo?.country?.iso_code || geo?.country,
    );
  } catch {
    return null;
  }
}

export function detectRequestCountry(request: NextRequest): string | null {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.MARKET_ACCESS_ALLOW_TEST_COUNTRY === "true"
  ) {
    const testCountry = request.nextUrl.searchParams.get("test-country");
    if (testCountry) return normalizeCountryCode(testCountry);
  }

  const frameworkGeo = normalizeCountryCode((request as any).geo?.country);
  if (frameworkGeo) return frameworkGeo;

  const headerNames = [
    "x-vercel-ip-country",
    "x-country",
    "cf-ipcountry",
    "x-country-code",
    "x-geo-country",
    "x-detected-country",
  ];
  for (const headerName of headerNames) {
    const country = normalizeCountryCode(request.headers.get(headerName));
    if (country) return country;
  }

  return countryFromNetlifyHeader(request);
}
