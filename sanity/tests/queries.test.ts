import { describe, test, expect } from "@jest/globals";

// next-sanity is ESM-only and fails to load under Jest. groq is a template tag
// that returns the interpolated query string, which is all these tests read.
jest.mock("next-sanity", () => ({
  groq: (parts: TemplateStringsArray, ...values: unknown[]) =>
    parts.reduce(
      (query, part, index) =>
        query + part + (index < values.length ? String(values[index]) : ""),
      "",
    ),
}));

import { postsQuery, postQuery, categoriesQuery } from "../lib/queries";

describe("Sanity Query Validation", () => {
  test("postsQuery should be valid GROQ", () => {
    expect(postsQuery).toContain('_type == "post" && (!defined(sites) || sites != "us")');
    // The listing must never surface drafts or slugless posts. Asserting the
    // guards individually keeps this from re-pinning to one exact filter string.
    expect(postsQuery).toContain('!(_id in path("drafts.**"))');
    expect(postsQuery).toContain("defined(slug.current)");
    expect(postsQuery).toContain("order(publishedAt desc)");
    expect(postsQuery).toContain("author->");
    expect(postsQuery).toContain("categories[]->");
  });

  test("postQuery should fetch single post with slug parameter", () => {
    expect(postQuery).toContain(
      '*[_type == "post" && (!defined(sites) || sites != "us") && slug.current == $slug][0]',
    );
    expect(postQuery).toContain("author->");
    expect(postQuery).toContain("categories[]->");
    expect(postQuery).toContain("body");
    expect(postQuery).toContain("seo");
  });

  test("categoriesQuery should fetch all categories", () => {
    expect(categoriesQuery).toContain('*[_type == "category"]');
    expect(categoriesQuery).toContain("order(title asc)");
  });

  test("queries should include essential fields", () => {
    // Posts query should include basic fields
    expect(postsQuery).toContain("_id");
    expect(postsQuery).toContain("title");
    expect(postsQuery).toContain("slug");

    // Post query should include body for full content
    expect(postQuery).toContain("body");
  });
});
