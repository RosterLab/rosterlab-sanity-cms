import { publishesToGlobal, publishesToUS } from "../site-scope";

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
});
