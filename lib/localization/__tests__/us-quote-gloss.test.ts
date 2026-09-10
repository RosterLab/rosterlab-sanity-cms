import { glossUSQuotedTerms, isCaseStudy } from "../us-quote-gloss";

const span = (text: string, marks: string[] = []) => ({
  _type: "span",
  _key: Math.random().toString(36).slice(2),
  text,
  marks,
});
const block = (children: any[], markDefs: any[] = []) => ({
  _type: "block",
  style: "normal",
  children,
  markDefs,
});
const text = (body: any[]) =>
  body
    .filter((b) => b._type === "block")
    .map((b: any) => b.children.map((c: any) => c.text).join(""))
    .join("\n");

describe("glossUSQuotedTerms", () => {
  it("glosses each roster form in place", () => {
    const body = [
      block([span("“We rebuilt the roster and the rostering rules.”")]),
      block([span("“Our rosters are fairer now.”")]),
    ];
    expect(text(glossUSQuotedTerms(body)!)).toBe(
      "“We rebuilt the roster (schedule) and the rostering (scheduling) rules.”\n" +
        "“Our rosters (schedules) are fairer now.”",
    );
  });

  it("glosses every occurrence, not just the first", () => {
    const body = [block([span("the roster, then another roster")])];
    expect(text(glossUSQuotedTerms(body)!)).toBe(
      "the roster (schedule), then another roster (schedule)",
    );
  });

  it("leaves the RosterLab brand alone", () => {
    const body = [block([span("RosterLab rebuilt the roster for RosterLab.")])];
    expect(text(glossUSQuotedTerms(body)!)).toBe(
      "RosterLab rebuilt the roster (schedule) for RosterLab.",
    );
  });

  it("handles a term split across spans", () => {
    const body = [block([span("blame the "), span("roster", ["strong"]), span(" maker")])];
    expect(text(glossUSQuotedTerms(body)!)).toBe(
      "blame the roster (schedule) maker",
    );
  });

  it("is idempotent", () => {
    const body = [block([span("the roster was fixed")])];
    const once = glossUSQuotedTerms(body)!;
    expect(text(glossUSQuotedTerms(once)!)).toBe(text(once));
  });

  it("skips code spans and editor-preserved annotations", () => {
    const preserved = [block([span("keep roster here", ["p1"])], [
      { _key: "p1", _type: "usPreserve" },
    ])];
    expect(text(glossUSQuotedTerms(preserved)!)).toBe("keep roster here");

    const code = [block([span("roster", ["code"])])];
    expect(text(glossUSQuotedTerms(code)!)).toBe("roster");
  });

  it("leaves blocks without roster terms untouched", () => {
    const body = [block([span("The schedule is published weekly.")])];
    expect(glossUSQuotedTerms(body)![0]).toBe(body[0]);
  });

  it("passes through non-block content", () => {
    const body = [{ _type: "image", alt: "A roster on screen" }];
    expect(glossUSQuotedTerms(body)).toEqual(body);
  });
});

describe("isCaseStudy", () => {
  it("detects the case-studies category", () => {
    expect(isCaseStudy({ categories: [{ slug: { current: "case-studies" } }] })).toBe(true);
  });

  it("is false for blog and newsroom posts", () => {
    expect(isCaseStudy({ categories: [{ slug: { current: "newsroom" } }] })).toBe(false);
    expect(isCaseStudy({ categories: null })).toBe(false);
    expect(isCaseStudy({})).toBe(false);
  });
});
