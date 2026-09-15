import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "https://app.rosterlab.com",
  "https://test.rosterlab.com",
  "https://preview.rosterlab.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "capacitor://localhost",
  "ionic://localhost",
]);

export function marketAccessCorsHeaders(
  request: NextRequest,
  methods: string,
): HeadersInit {
  const origin = request.headers.get("origin");
  return {
    ...(origin && ALLOWED_ORIGINS.has(origin)
      ? { "Access-Control-Allow-Origin": origin }
      : {}),
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "private, no-store, max-age=0",
    Vary: "Origin",
    "X-Content-Type-Options": "nosniff",
  };
}

export function marketAccessPreflightResponse(
  request: NextRequest,
  methods: string,
): NextResponse {
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: marketAccessCorsHeaders(request, methods),
  });
}
