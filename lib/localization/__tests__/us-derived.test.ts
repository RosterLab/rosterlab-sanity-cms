import { derivedUSFields } from "../us-derived";
import { localizeUSPost } from "../us-blog";

// The Studio shows derivedUSFields() as each US field's placeholder. If it
// disagreed with localizeUSPost, the editor would be promised one thing and
// the page would render another - so assert they agree.
describe("the Studio placeholder matches what the page renders", () => {
  const posts = [
    {
      title: "Rostering 101: the basics of rostering",
      slug: { current: "rostering-basics" },
      excerpt: "A guide to rostering your team",
      seo: {
        metaTitle: "Rostering 101",
        metaDescription: "Rostering explained for new rosterers",
      },
      author: { name: "Sunny Feng" },
    },
    {
      title: "The Complete Guide to Shift Bidding",
      slug: { current: "shift-bidding-guide-how-to-implement" },
      excerpt: "Speciality locum physicians and rosters",
      seo: { metaTitle: "The Complete Guide to Shift Bidding" },
    },
    {
      title: "Public holidays across wards",
      slug: { current: "skeleton-staffing-guide-lean-operations-management" },
      excerpt: "Wards and public holidays",
      seo: { metaDescription: "Managing wards over public holidays" },
    },
  ];

  it.each(posts.map((p) => [p.slug.current, p] as const))(
    "agrees for %s",
    (_slug, post) => {
      const rendered = localizeUSPost(post as never);
      const placeholder = derivedUSFields(post as never);
      expect(placeholder.title).toBe(rendered.title);
      expect(placeholder.excerpt).toBe(rendered.excerpt);
      expect(placeholder.metaTitle).toBe(rendered.seo.metaTitle);
      expect(placeholder.metaDescription).toBe(rendered.seo.metaDescription);
    },
  );

  it("derives the US slug too", () => {
    expect(
      derivedUSFields({ slug: { current: "rostering-basics" } }).slug,
    ).toBe("scheduling-basics");
  });

  it("survives a half-filled draft", () => {
    expect(() => derivedUSFields({})).not.toThrow();
    expect(derivedUSFields({}).title).toBeUndefined();
  });
});
