import type { SanityClient } from "next-sanity";
import { fetchBlogPost } from "../fetch-blog-post";
import { blogPostByIdQuery } from "@/sanity/lib/queries";

jest.mock("next-sanity", () => ({ groq: String.raw }));

const freshPost = {
  _id: "new-blog",
  slug: { current: "automated-staff-rostering" },
};

test.each([
  "automated-staff-scheduling",
  "automated-staff-rostering",
])("resolves a newly published blog at %s", async (slug) => {
  const fetch = jest.fn().mockResolvedValueOnce([freshPost]).mockResolvedValueOnce(freshPost);
  expect(await fetchBlogPost({ fetch } as unknown as SanityClient, slug, true)).toEqual(freshPost);
  expect(fetch).toHaveBeenLastCalledWith(blogPostByIdQuery, { id: "new-blog" });
});

test("explicit US URLs take precedence over derived URLs", async () => {
  const override = { _id: "override", slug: { current: "another-post" }, usSlug: { current: "automated-staff-scheduling" } };
  const fetch = jest.fn().mockResolvedValueOnce([freshPost, override]).mockResolvedValueOnce(override);
  await fetchBlogPost({ fetch } as unknown as SanityClient, "automated-staff-scheduling", true);
  expect(fetch).toHaveBeenLastCalledWith(blogPostByIdQuery, { id: "override" });
});

test("unknown URLs return no article", async () => {
  const fetch = jest.fn().mockResolvedValueOnce([freshPost]);
  expect(await fetchBlogPost({ fetch } as unknown as SanityClient, "missing", true)).toBeNull();
  expect(fetch).toHaveBeenCalledTimes(1);
});
