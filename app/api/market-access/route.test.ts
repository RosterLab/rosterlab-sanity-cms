/** @jest-environment node */

import { NextRequest } from "next/server";
import { GET, OPTIONS } from "./route";

describe("market access API", () => {
  test("uses the detected country and prevents shared caching", async () => {
    const request = new NextRequest("http://localhost/api/market-access", {
      headers: {
        "x-country": "AE",
        origin: "https://app.rosterlab.com",
      },
    });

    const response = await GET(request);

    expect(await response.json()).toMatchObject({
      countryCode: "AE",
      freeSignup: "show",
      demo: "nzt_business_hours",
    });
    expect(response.headers.get("cache-control")).toContain("no-store");
    expect(response.headers.get("access-control-allow-origin")).toBe(
      "https://app.rosterlab.com",
    );
  });

  test("allows configured app origins and rejects unknown preflight origins", async () => {
    const allowed = await OPTIONS(
      new NextRequest("http://localhost/api/market-access", {
        method: "OPTIONS",
        headers: { origin: "capacitor://localhost" },
      }),
    );
    const rejected = await OPTIONS(
      new NextRequest("http://localhost/api/market-access", {
        method: "OPTIONS",
        headers: { origin: "https://example.com" },
      }),
    );

    expect(allowed.status).toBe(204);
    expect(rejected.status).toBe(403);
  });
});
