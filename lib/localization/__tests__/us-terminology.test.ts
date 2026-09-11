import { localizeUSPost, localizeUSText } from "../us-blog";
import { usMetaTitles } from "../us-terminology";

test.each([
  ["2-2-3-panama-shift-scheduling", "casual or relief staff", "temporary or relief staff"],
  ["skeleton-staffing-guide-lean-operations-management", "public holidays across wards", "holidays across units"],
  ["how-to-reduce-absenteeism-for-shift-workers", "casual or agency staff", "temporary or agency staff"],
  ["rostering-basics", "a rota, staff schedule or personnel planner depending on where you are from", "a shift schedule or personnel planner"],
  ["westernaustralia-oldest-tertiary-hospital-expands-partnership-with-rosterlab", "junior doctor wellbeing", "physician-in-training well-being"],
])("final audit terminology is adapted only in the reviewed resource %s", (slug, title, expected) => {
  expect(localizeUSPost({ slug, title }).title).toBe(expected);
});

test("explains Australian SMO roles and localizes subsequent scheduling references", () => {
  const slug = "sydney-tertiary-hospital-saves-300-hours-with-ai-rostering";
  expect(localizeUSPost({slug, title: "60 Senior Medical Officers (SMOs)"}).title)
    .toBe("60 Senior medical officers (comparable to US attending physicians)");
  expect(localizeUSPost({slug, title: "Cross-site SMOs use SMO rostering software"}).title)
    .toBe("Cross-site attending physicians use physician scheduling software");
  expect(localizeUSText("SMO rostering")).toBe("SMO scheduling");
});

test("expands clinical and employment acronyms naturally within sentences", () => {
  expect(
    localizeUSPost({
      title: "See your GP",
      slug: "improving-continuity-of-care-in-healthcare",
    }).title,
  ).toBe("See your primary care physician");
  expect(
    localizeUSPost({
      title: "Apply EBA rules",
      slug: "future-of-workforce-scheduling",
    }).title,
  ).toBe("Apply applicable employment-agreement rules");
});

const body = (parts: string[], extra = {}) => [
  {
    _type: "block",
    _key: "clinical",
    style: "normal",
    markDefs: [],
    ...extra,
    children: parts.map((text, i) => ({
      _type: "span",
      _key: String(i),
      marks: i ? ["strong"] : [],
      text,
    })),
  },
];
const rendered = (post: any) =>
  post.body[0].children.map((s: any) => s.text).join("");

test("clinical terminology is scoped and preserves quotations, attribution and source", () => {
  const post = {
    title: "Consultants",
    slug: {
      current:
        "auckland-tertiary-hospital-improves-fairness-for-on-call-roster",
    },
    body: body([
      "10 cons",
      "ultants and junior consultant Dr. Fernando; fellows. “Consultants roster.” Dr. Fernando, Consultant, Auckland Tertiary Hospital",
    ]),
  };
  const source = JSON.stringify(post);
  const result = localizeUSPost(post);
  expect(rendered(result)).toBe(
    "10 consultant physicians (comparable to US attending physicians) and early-career consultant physician Dr. Fernando; fellows. “Consultants roster.” Dr. Fernando, Consultant, Auckland Tertiary Hospital",
  );
  expect(result.body![0].children[1].marks).toEqual(["strong"]);
  expect(JSON.stringify(post)).toBe(source);
  expect(
    localizeUSText(
      "business consultants, university registrars, senior registrar, nurse anaesthetist",
    ),
  ).toBe(
    "business consultants, university registrars, senior registrar, nurse anaesthetist",
  );
});

test("international training roles are explained without inventing resident or chief resident credentials", () => {
  const result = localizeUSPost({
    title: "Training",
    slug: "hospital-in-perth-partners-with-rosterlab-for-smarter-rosters",
    body: body(["The AMU registrar roster."]),
  });
  expect(rendered(result)).toBe(
    "The acute medical unit registrar (physician in specialty training) schedule.",
  );
});

test("reviewed employment prose replaces Australian status claims across spans", () => {
  const result = localizeUSPost({
    title: "Open shifts",
    slug: "open-shifts-understanding-the-basics",
    body: body([
      "Casual staff members work irregular hours without guaranteed shifts. If you schedule them regularly like permanent employees, ",
      "they may legally qualify for part-time status and additional benefits like annual leave and sick pay.",
    ]),
  });
  expect(rendered(result)).toBe(
    "Employees with variable hours may pick up available shifts. Benefit eligibility depends on applicable law, hours worked, and employer policies; using open shifts does not determine an employee’s legal status.",
  );
});

test("editorial US overrides and blockquotes take precedence over terminology rules", () => {
  const result = localizeUSPost({
    title: "Consultants",
    slug: "auckland-tertiary-hospital-improves-fairness-for-on-call-roster",
    body: body(["Consultants"], { style: "blockquote" }),
    usLocalization: { title: "Consultants: an international case study" },
  });
  expect(result.title).toBe("Consultants: an international case study");
  expect(rendered(result)).toBe("Consultants");
});

test("roster terminology and ward wording both localize in article bodies", () => {
  const result = localizeUSPost({
    title: "Rostering basics elsewhere",
    slug: "guide-to-rostering",
    body: body(["Rostering a ward roster takes time."]),
  });
  expect(rendered(result)).toBe("Scheduling a unit schedule takes time.");
});

describe("US SERP titles for articles whose global headline does not localize", () => {
  // Written to land 50-60 characters once the layout appends " | RosterLab":
  // past 60 Google truncates, under 50 leaves the result line half empty.
  it.each(Object.entries(usMetaTitles))(
    "%s renders within the SERP band",
    (_slug, { use, when }) => {
      const rendered = use.length + " | RosterLab".length;
      expect({ use, rendered }).toEqual({ use, rendered: expect.any(Number) });
      expect(rendered).toBeGreaterThanOrEqual(50);
      expect(rendered).toBeLessThanOrEqual(60);
      // An entry whose US title matches the global one differentiates nothing.
      expect(use).not.toBe(when);
    },
  );

  it("fills the gap where the global headline localizes to itself", () => {
    const result = localizeUSPost({
      title: "The Complete Guide to Shift Bidding",
      slug: "shift-bidding-guide-how-to-implement",
      seo: { metaTitle: "The Complete Guide to Shift Bidding" },
    });
    expect(result.seo.metaTitle).toBe(
      "Shift Bidding: How to Implement It at Work",
    );
  });

  it("yields to a US SEO title set in the CMS", () => {
    const result = localizeUSPost({
      title: "The Complete Guide to Shift Bidding",
      slug: "shift-bidding-guide-how-to-implement",
      seo: { metaTitle: "The Complete Guide to Shift Bidding" },
      usLocalization: { metaTitle: "An editor's own US title" },
    });
    expect(result.seo.metaTitle).toBe("An editor's own US title");
  });

  it("steps aside once the global headline has been rewritten", () => {
    const result = localizeUSPost({
      title: "The Complete Guide to Shift Bidding",
      slug: "shift-bidding-guide-how-to-implement",
      seo: { metaTitle: "Shift Bidding in 2027: A Rostering Guide" },
    });
    // The global title moved on, so the override yields to the localizer
    // rather than pinning a US title to an article that no longer exists.
    expect(result.seo.metaTitle).toBe(
      "Shift Bidding in 2027: A Scheduling Guide",
    );
  });

  it("leaves articles outside the map to the normal dictionary", () => {
    const result = localizeUSPost({
      title: "Rostering guide",
      slug: "guide-to-rostering",
      seo: { metaTitle: "A guide to staff rostering" },
    });
    expect(result.seo.metaTitle).toBe("A guide to staff scheduling");
  });
});
