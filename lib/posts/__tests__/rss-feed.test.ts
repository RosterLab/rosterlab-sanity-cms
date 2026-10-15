/** @jest-environment node */
import { GET } from "@/app/blog/rss.xml/route";
import { GET as retiredTest } from "@/app/test-identify/route";
import { client } from "@/sanity/lib/client";

jest.mock("@/sanity/lib/client", () => ({ client: { fetch: jest.fn() } }));
jest.mock("next-sanity", () => ({
  groq: (parts: TemplateStringsArray) => parts.join(""),
}));

test("RSS escapes CMS text and emits valid article links and publication dates", async () => {
  (client.fetch as jest.Mock).mockResolvedValue([
    {
      title: 'Fairness & "flexibility" <today>',
      slug: { current: "rostering-basics" },
      excerpt: "Staff's preferences & coverage",
      publishedAt: "2026-10-01T00:00:00Z",
    },
    { title: "Undated", slug: { current: "undated" }, publishedAt: "invalid" },
    { title: "Missing slug" },
  ]);
  const response = await GET();
  const xml = await response.text();
  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/rss+xml");
  expect(xml).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');
  expect(xml).toContain("Fairness &amp; &quot;flexibility&quot; &lt;today&gt;");
  expect(xml).toContain("Staff&apos;s preferences &amp; coverage");
  expect(xml).toContain("https://rosterlab.com/blog/rostering-basics");
  expect(xml).toContain("<pubDate>Thu, 01 Oct 2026 00:00:00 GMT</pubDate>");
  expect(xml).not.toMatch(/Invalid Date|Missing slug|\/blog\/undefined/);
  expect(xml.match(/<item>/g)).toHaveLength(2);
  expect(client.fetch).toHaveBeenCalledWith(
    expect.stringContaining('!(_id in path("drafts.**"))'),
    { excludedSite: "us" },
  );
});

test("RSS remains valid when no articles are published", async () => {
  (client.fetch as jest.Mock).mockResolvedValue([]);
  const xml = await (await GET()).text();
  expect(xml).toContain("<channel>");
  expect(xml).not.toContain("<item>");
});

test("retired test URL returns Gone with an explicit noindex header", () => {
  const response = retiredTest();
  expect(response.status).toBe(410);
  expect(response.headers.get("x-robots-tag")).toBe("noindex");
});
