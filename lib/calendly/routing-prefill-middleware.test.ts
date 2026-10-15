/** @jest-environment node */
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

test.each(["/book-a-demo", "/us/book-a-demo"])(
  "renders %s without PII in the Next navigation tree while preserving attribution and geo headers",
  (pathname) => {
    const response = middleware(
      new NextRequest(
        `https://rosterlab.com${pathname}?a1=qa%40example.com&a99=Secret&name=Secret&autofill=true&utm_source=intercom&test-country=US`,
        { headers: { "x-country": "US" } },
      ),
    );
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      `https://rosterlab.com${pathname}?utm_source=intercom&test-country=US`,
    );
    expect(response.headers.get("x-middleware-request-x-pathname")).toBe(
      pathname,
    );
    expect(response.headers.get("x-detected-country")).toBe("US");
    expect(response.headers.get("location")).toBeNull();
  },
);

test("does not rewrite ordinary demo links or other pages", () => {
  for (const pathname of [
    "/book-a-demo?utm_source=intercom",
    "/us/book-a-demo",
    "/contact?a1=unrelated",
  ]) {
    const response = middleware(
      new NextRequest(`https://rosterlab.com${pathname}`),
    );
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
  }
});

test("canonical redirects still retain prefill for the browser to capture", () => {
  const response = middleware(
    new NextRequest(
      "https://www.rosterlab.com/us/book-a-demo/?a1=qa%40example.com",
      { headers: { host: "www.rosterlab.com" } },
    ),
  );
  expect(response.status).toBe(301);
  expect(response.headers.get("location")).toBe(
    "https://rosterlab.com/us/book-a-demo?a1=qa%40example.com",
  );
});
