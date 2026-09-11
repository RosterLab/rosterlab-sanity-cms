/** @jest-environment node */
import { createCaseStudyPage } from "./CaseStudyPage";
import { createNewsroomArticlePage } from "./NewsroomArticlePage";
import { notFound, permanentRedirect } from "next/navigation";

const mockFetch = jest.fn();
jest.mock("@/sanity/lib/client", () => ({
  client: { fetch: (...args: unknown[]) => mockFetch(...args) },
  getClient: () => ({ fetch: (...args: unknown[]) => mockFetch(...args) }),
  urlFor: () => ({ url: () => "https://example.com/image.png" }),
}));
jest.mock("next-sanity", () => ({ groq: (strings: TemplateStringsArray) => strings[0] }));
jest.mock("@/sanity/lib/token", () => ({ validatedToken: undefined }));
jest.mock("next/headers", () => ({
  draftMode: async () => ({ isEnabled: false }),
}));
jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("not found");
  }),
  permanentRedirect: jest.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
  usePathname: () => "/",
}));

const params = Promise.resolve({ slug: "example" });
const description = "An intentionally long editorial description. "
  .repeat(5)
  .trim();
const post = {
  _id: "post-1",
  title: "Example",
  slug: { current: "example" },
  seo: { metaDescription: `  ${description}  ` },
  body: [],
  publishedAt: "2026-01-01",
  categories: [],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe.each([
  ["case-studies", createCaseStudyPage],
  ["newsroom", createNewsroomArticlePage],
] as const)("%s articles", (section, createPage) => {
  test.each([false, true])(
    "preserves locale-specific editorial descriptions and query scope (US=%s)",
    async (isUS) => {
      mockFetch.mockResolvedValue(post);
      const metadata = await createPage(isUS).generateMetadata({ params });
      expect(metadata.description).toBe(
        isUS ? description : post.seo.metaDescription.slice(0, 152) + "...",
      );
      expect(metadata.alternates?.canonical).toBe(
        `https://rosterlab.com${isUS ? "/us" : ""}/${section}/example`,
      );
      expect(mockFetch.mock.calls[0][0]).toContain(
        `sites != "${isUS ? "global" : "us"}"`,
      );
      expect(mockFetch.mock.calls[0][1]).toEqual(
        isUS ? { slug: "example", usSlug: "example" } : { slug: "example" },
      );
    },
  );

  test("redirects a fetched US article to its editorial slug override", async () => {
    mockFetch.mockImplementation(async (query: string) =>
      query.includes("[0]")
        ? { ...post, usSlug: { current: "editorial-url" } }
        : [],
    );
    await expect(createPage(true).Page({ params })).rejects.toThrow(
      `redirect:/us/${section}/editorial-url`,
    );
    expect(permanentRedirect).toHaveBeenCalledWith(
      `/us/${section}/editorial-url`,
    );
    expect(notFound).not.toHaveBeenCalled();
  });

  test("missing US articles remain 404s instead of redirecting", async () => {
    mockFetch.mockResolvedValue(null);
    await expect(createPage(true).Page({ params })).rejects.toThrow(
      "not found",
    );
    expect(permanentRedirect).not.toHaveBeenCalled();
  });

  test("static US URLs preserve editorial slugs and derive missing overrides", async () => {
    mockFetch.mockResolvedValue([
      { slug: "rostering-basics" },
      { slug: "example", usSlug: "editorial-url" },
    ]);
    expect(await createPage(true).generateStaticParams()).toEqual([
      { slug: "scheduling-basics" },
      { slug: "editorial-url" },
    ]);
  });
});
