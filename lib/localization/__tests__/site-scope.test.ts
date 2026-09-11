import {
  GLOBAL_SITE_FILTER,
  US_SITE_FILTER,
  publishesToGlobal,
  publishesToUS,
} from "../site-scope";

describe("site scope", () => {
  // Every article written before the switch existed has no `sites` value, so
  // "unset" must keep behaving exactly as it did: published to both.
  it("treats an unset value as both sites", () => {
    for (const post of [{}, { sites: null }, { sites: undefined }]) {
      expect(publishesToGlobal(post as never)).toBe(true);
      expect(publishesToUS(post as never)).toBe(true);
    }
  });

  it.each([
    ["all", true, true],
    ["global", true, false],
    ["us", false, true],
  ])("%s publishes global=%s us=%s", (sites, global, us) => {
    expect(publishesToGlobal({ sites })).toBe(global);
    expect(publishesToUS({ sites })).toBe(us);
  });

  // The GROQ filters have to agree with the helpers, or a page would render
  // an article the sitemap omits.
  it("the GROQ filters mirror the helpers", () => {
    const evaluate = (filter: string, sites?: string) => {
      const defined = sites !== undefined;
      return filter
        .replace("!defined(sites)", String(!defined))
        .replace(/sites != "(\w+)"/, (_m, excluded) =>
          String(sites !== excluded),
        )
        .split("||")
        .some((clause) => clause.trim().replace(/[()]/g, "") === "true");
    };
    for (const sites of [undefined, "all", "global", "us"]) {
      expect(evaluate(GLOBAL_SITE_FILTER, sites)).toBe(
        publishesToGlobal({ sites }),
      );
      expect(evaluate(US_SITE_FILTER, sites)).toBe(publishesToUS({ sites }));
    }
  });
});
