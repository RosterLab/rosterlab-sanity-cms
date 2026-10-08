/** @jest-environment node */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PortableText from "@/components/blog/PortableText";
import { canonicalArticleHref } from "../article-redirects";

jest.mock("@/sanity/lib/client", () => ({ urlFor: jest.fn() }));

test("renders the existing Perth CMS link with its working destination", () => {
  const body = [
    {
      _type: "block",
      _key: "paragraph",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "text",
          text: "Initial partnership",
          marks: ["perth"],
        },
      ],
      markDefs: [
        {
          _type: "link",
          _key: "perth",
          blank: true,
          href: "https://rosterlab.com/newsroom/royal-perth-hospital-partners-with-rosterlab-for-smarter-rosters",
        },
      ],
    },
  ];
  const original = JSON.stringify(body);
  const html = renderToStaticMarkup(<PortableText value={body} />);
  expect(html).toContain(
    'href="https://rosterlab.com/newsroom/hospital-in-perth-partners-with-rosterlab-for-smarter-rosters"',
  );
  expect(html).toContain("Initial partnership");
  expect(html).toContain('target="_blank"');
  expect(JSON.stringify(body)).toBe(original);
});

test("preserves query strings and fragments when correcting regional article links", () => {
  expect(
    canonicalArticleHref(
      "/us/newsroom/royal-perth-hospital-partners-with-rosterlab-for-smarter-schedules/?source=article#partnership",
    ),
  ).toBe(
    "/us/newsroom/hospital-in-perth-partners-with-rosterlab-for-smarter-schedules?source=article#partnership",
  );
});

test.each([
  "https://example.com/blog/automated-staff-scheduling",
  "/blog/holiday-staff-scheduling-fairness",
  "mailto:team@rosterlab.com",
  undefined,
])("leaves unrelated links unchanged: %s", (href) => {
  expect(canonicalArticleHref(href)).toBe(href);
});
