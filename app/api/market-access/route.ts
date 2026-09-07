import { NextRequest, NextResponse } from "next/server";
import { detectRequestCountry } from "@/lib/market-access/geo";
import { evaluateMarketAccess } from "@/lib/market-access/policy";

const ALLOWED_ORIGINS = new Set([
  "https://app.rosterlab.com",
  "https://test.rosterlab.com",
  "https://preview.rosterlab.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "capacitor://localhost",
  "ionic://localhost",
]);

function corsHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get("origin");
  return {
    ...(origin && ALLOWED_ORIGINS.has(origin)
      ? { "Access-Control-Allow-Origin": origin }
      : {}),
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "private, no-store, max-age=0",
    Vary: "Origin",
    "X-Content-Type-Options": "nosniff",
  };
}

export async function GET(request: NextRequest) {
  const countryCode = detectRequestCountry(request);
  const decision = evaluateMarketAccess(countryCode, {
    disabled: process.env.MARKET_ACCESS_GATING_DISABLED === "true",
  });

  return NextResponse.json(decision, {
    headers: corsHeaders(request),
  });
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}
