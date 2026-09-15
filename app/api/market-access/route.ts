import { NextRequest, NextResponse } from "next/server";
import { detectRequestCountry } from "@/lib/market-access/geo";
import { evaluateMarketAccess } from "@/lib/market-access/policy";
import {
  marketAccessCorsHeaders,
  marketAccessPreflightResponse,
} from "@/lib/market-access/cors";

const METHODS = "GET, OPTIONS";

export async function GET(request: NextRequest) {
  const countryCode = detectRequestCountry(request);
  const decision = evaluateMarketAccess(countryCode, {
    disabled: process.env.MARKET_ACCESS_GATING_DISABLED === "true",
  });

  return NextResponse.json(decision, {
    headers: marketAccessCorsHeaders(request, METHODS),
  });
}

export async function OPTIONS(request: NextRequest) {
  return marketAccessPreflightResponse(request, METHODS);
}
