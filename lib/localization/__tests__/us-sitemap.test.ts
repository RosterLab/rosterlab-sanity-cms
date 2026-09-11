/** @jest-environment node */
import { GET } from "@/app/sitemap.xml/route";
import { US_URL_MAPPINGS } from "@/components/seo/HreflangTags";

jest.mock("next-sanity", () => ({
  groq: (parts: TemplateStringsArray) => parts.join(""),
}));

jest.mock("../../../sanity/lib/client", () => ({
  client: {
    fetch: jest.fn(async () => [
      {
        slug: "example-blog",
        _updatedAt: "2026-08-01T00:00:00Z",
        categories: [],
      },
      {
        slug: "example-case",
        publishedAt: "2026-07-01T00:00:00Z",
        categories: [{ slug: { current: "case-studies" } }],
      },
      {
        slug: "example-news",
        _updatedAt: "invalid",
        categories: [{ slug: { current: "newsroom" } }],
      },
    ]),
  },
}));

test("sitemap includes public regional routes once and uses only real CMS dates", async () => {
  const xml = await (await GET()).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(new Set(urls).size).toBe(urls.length);
  for (const us of Object.values(US_URL_MAPPINGS)) {
    if (/^\/us\/tools\/staff-scheduling-personality-quiz\/[^/]+$/.test(us))
      expect(urls).not.toContain("https://rosterlab.com" + us);
    else expect(urls).toContain("https://rosterlab.com" + us);
  }
  for (const path of [
    "blog/example-blog",
    "case-studies/example-case",
    "newsroom/example-news",
  ]) {
    expect(urls).toContain("https://rosterlab.com/" + path);
    expect(urls).toContain("https://rosterlab.com/us/" + path);
  }
  expect(
    urls.some((url) =>
      /\/page\/|\/unlocked|\/survey-preferences\/(?:s|admin)\/|\/meeting-confirmed/.test(
        url,
      ),
    ),
  ).toBe(false);
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
    (match) => match[1],
  );
  expect(
    entries.find((entry) => entry.includes("/us/pricing</loc>")),
  ).not.toContain("lastmod");
  expect(
    entries.find((entry) => entry.includes("/us/blog/example-blog</loc>")),
  ).toContain("2026-08-01T00:00:00.000Z");
  expect(
    entries.find((entry) => entry.includes("/us/newsroom/example-news</loc>")),
  ).not.toContain("lastmod");
});
