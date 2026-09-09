import {
  localizeUSPost,
  localizeUSText,
  localizeUSBody,
  localizeUSLink,
} from "../us-blog";
import {
  generateHreflangMetadata,
  getGlobalPath,
  getUSPath,
} from "@/components/seo/HreflangTags";

const span = (text: string, marks: string[] = []) => ({
  _type: "span",
  text,
  marks,
});
const block = (children: any[], extra = {}) => ({
  _type: "block",
  _key: "heading-key",
  style: "normal",
  children,
  markDefs: [],
  ...extra,
});
const text = (body: any[]) =>
  body.map((b) => b.children?.map((c: any) => c.text).join("")).join("\n");

test("converts whole words and capitalization without corrupting product names or contextual terms", () => {
  expect(
    localizeUSText(
      "ROSTER Rostering rostered rosters re-rostering RosterLab optimise labour colour aged care leave employees",
    ),
  ).toBe(
    "SCHEDULE Scheduling scheduled schedules rescheduling RosterLab optimize labor color aged care leave employees",
  );
});
test("preserves inline quotations, URL text and protected entities", () => {
  expect(
    localizeUSText(
      '“Optimise rosters” and "rostering" with New Zealand Nurses Organisation; optimise https://example.com/roster',
      ["New Zealand Nurses Organisation"],
    ),
  ).toBe(
    '“Optimise rosters” and "rostering" with New Zealand Nurses Organisation; optimize https://example.com/roster',
  );
});
test("handles words and quotations split by formatting without changing keys or source", () => {
  const source = [
    block([
      span("“Optimise "),
      span("rosters", ["strong"]),
      span("” then ros"),
      span("tering and re-", ["em"]),
      span("rostering"),
    ]),
  ];
  const original = JSON.stringify(source);
  const result = localizeUSBody(source)!;
  expect(text(result)).toBe(
    "“Optimise rosters” then scheduling and rescheduling",
  );
  expect(result[0]._key).toBe("heading-key");
  expect(result[0].children[1].marks).toEqual(["strong"]);
  expect(JSON.stringify(source)).toBe(original);
});
test("preserves single-quoted customer quotations containing contractions across spans", () => {
  const source = [
    block([
      span("‘We’re optimising "),
      span("rosters’, then "),
      span("'We're optimising "),
      span("rosters' and rostering."),
    ]),
  ];
  expect(text(localizeUSBody(source)!)).toBe(
    "‘We’re optimising rosters’, then 'We're optimising rosters' and scheduling.",
  );
  expect(localizeUSText("Rosterers optimise rosters")).toBe(
    "Schedulers optimize schedules",
  );
});
test("preserves blockquotes, code and editorial annotations while routing internal links", () => {
  const source = [
    block([span("optimise rostering")], { style: "blockquote" }),
    block(
      [
        span("roster", ["code"]),
        span(" Organisation", ["keep"]),
        span(" optimise"),
      ],
      {
        markDefs: [
          { _key: "keep", _type: "usPreserve" },
          { _key: "link", _type: "link", href: "/blog/roster#section" },
        ],
      },
    ),
  ];
  const result = localizeUSBody(source)!;
  expect(text(result)).toBe("optimise rostering\nroster Organisation optimize");
  expect(result[1].markDefs[1].href).toBe("/us/blog/roster#section");
});
test("protects phrases crossing spans and leaves assets and embed URLs intact", () => {
  const source = [
    block([span("Nurses "), span("Organisation and rostering")]),
    {
      _type: "image",
      asset: { _ref: "image-roster-id" },
      alt: "Rostering illustration",
    },
    { _type: "youtube", url: "https://youtube.com/roster" },
  ];
  const result = localizeUSBody(source, ["Nurses Organisation"])!;
  expect(text(result).split("\n")[0]).toBe(
    "Nurses Organisation and scheduling",
  );
  expect(result[1]).toEqual({
    _type: "image",
    asset: { _ref: "image-roster-id" },
    alt: "Scheduling illustration",
  });
  expect(result[2]).toEqual(source[2]);
});
test("uses exact editorial overrides, localizes their links, and does not change author or slug", () => {
  const post = {
    title: "Rostering",
    slug: { current: "rostering" },
    author: { name: "Colour Centre" },
    excerpt: "Optimise",
    body: [],
    seo: { metaTitle: "Original SEO" },
    usLocalization: {
      title: "Custom roster title",
      excerpt: "Custom summary",
      body: [
        block([span("Keep rostering")], {
          markDefs: [{ _type: "link", href: "/pricing" }],
        }),
      ],
    },
  };
  const result = localizeUSPost(post);
  expect(result.title).toBe("Custom roster title");
  expect(result.seo.metaTitle).toBe("Custom roster title");
  expect(text(result.body!)).toBe("Keep rostering");
  expect(result.body![0].markDefs[0].href).toBe("/us/pricing");
  expect(result.author).toEqual(post.author);
  expect(result.slug).toEqual(post.slug);
});
test("handles nullable Sanity fields and unset/empty overrides", () => {
  const result = localizeUSPost({
    title: "Rostering",
    excerpt: null,
    mainImage: { alt: null },
    seo: { metaTitle: null },
    usLocalization: { title: null, body: [] },
    body: [block([span("optimise")])],
  } as any);
  expect(result.title).toBe("Scheduling");
  expect(result.excerpt).toBeUndefined();
  expect(text(result.body!)).toBe("optimize");
});
test("routes supported internal destinations while preserving query, anchors and external URLs", () => {
  expect(
    localizeUSLink("https://rosterlab.com/blog/rostering?utm_source=email#abc"),
  ).toBe("/us/blog/rostering?utm_source=email#abc");
  expect(localizeUSLink("/blog")).toBe("/us/blog");
  expect(localizeUSLink("/case-studies/example")).toBe(
    "/us/case-studies/example",
  );
  expect(localizeUSLink("/feature/leave-requests")).toBe(
    "/us/feature/time-off-requests",
  );
  for (const href of [
    "/authors/example",
    "mailto:hello@example.com",
    "https://other.com/blog/roster",
    "#roster",
    "/us/blog/roster",
  ])
    expect(localizeUSLink(href)).toBe(href);
});
test("regional article and pagination mappings have reciprocal hreflang and stable slugs", () => {
  const path = "/blog/rostering-guide";
  expect(getUSPath(path)).toBe("/us" + path);
  expect(getGlobalPath("/us" + path)).toBe(path);
  expect(generateHreflangMetadata(path)).toEqual(
    generateHreflangMetadata("/us" + path),
  );
  expect(getUSPath("/blog/page/2")).toBe("/us/blog/page/2");
  expect(getUSPath("/blog/page/2oops")).toBeUndefined();
  expect(generateHreflangMetadata(path).alternates?.languages.en).toBe(
    "https://rosterlab.com" + path,
  );
});

test("localizes spelling gaps found in the content audit while preserving quotes", () => {
  expect(
    localizeUSText(
      'Specialised teams realise gains by utilising tools that summarise results and personalise programmes. "We specialised in rostering."',
    ),
  ).toBe(
    'Specialized teams realize gains by utilizing tools that summarize results and personalize programs. "We specialised in rostering."',
  );
});
