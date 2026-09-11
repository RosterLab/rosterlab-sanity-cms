/** @jest-environment node */
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

test.each([
  ["/US/blogs", "/us/blog"],
  ["/us/blogs/", "/us/blog"],
  ["/US/blog", "/us/blog"],
  [
    "/US/blogs/Some-Slug?source=preview#section",
    "/us/blog/Some-Slug?source=preview#section",
  ],
  ["/us/blogs/page/2", "/us/blog/page/2"],
])("redirects %s to its canonical blog URL", (source, expected) => {
  const response = middleware(
    new NextRequest(`https://rosterlab.com${source}`),
  );
  expect(response.status).toBe(301);
  expect(response.headers.get("location")).toBe(
    `https://rosterlab.com${expected}`,
  );
});

test.each(["/us/blog", "/us/blog/my-post", "/us/blogspot", "/blog"])(
  "does not redirect canonical or unrelated path %s",
  (pathname) => {
    const response = middleware(
      new NextRequest(`https://rosterlab.com${pathname}`),
    );
    expect(response.headers.get("location")).toBeNull();
  },
);
