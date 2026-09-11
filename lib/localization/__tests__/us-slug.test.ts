import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  localizeUSSlug,
  globalizeUSSlug,
  usSlugRedirectTarget,
  effectiveUSSlug,
  US_SLUG_SOURCES,
} from "../us-slug";

describe("localizeUSSlug", () => {
  it("converts roster terminology segment by segment", () => {
    expect(localizeUSSlug("rostering-basics")).toBe("scheduling-basics");
    expect(localizeUSSlug("rotating-rosters")).toBe("rotating-schedules");
    expect(localizeUSSlug("guide-to-rostering")).toBe("guide-to-scheduling");
    expect(
      localizeUSSlug("should-your-next-staff-roster-be-built-with-ai"),
    ).toBe("should-your-next-staff-schedule-be-built-with-ai");
  });

  it("never rewrites the RosterLab brand name", () => {
    expect(
      localizeUSSlug(
        "hospital-in-perth-partners-with-rosterlab-for-smarter-rosters",
      ),
    ).toBe("hospital-in-perth-partners-with-rosterlab-for-smarter-schedules");
    expect(
      localizeUSSlug(
        "whanganui-radiography-redirects-179-hours-of-admin-back-to-clinical-work-through-rosterlab",
      ),
    ).toBe(
      "whanganui-radiography-redirects-179-hours-of-admin-back-to-clinical-work-through-rosterlab",
    );
    expect(localizeUSSlug("why-rosterlab-free")).toBe("why-rosterlab-free");
  });

  it("collapses only the duplicate segment the swap creates", () => {
    expect(
      localizeUSSlug(
        "real-cost-of-nurse-turnover-nurse-retention-strategy-through-scheduling-rostering",
      ),
    ).toBe(
      "real-cost-of-nurse-turnover-nurse-retention-strategy-through-scheduling",
    );
  });

  it("leaves slugs without roster terminology untouched", () => {
    for (const slug of [
      "holiday-staff-scheduling-fairness",
      "2-2-3-panama-shift-scheduling",
      "shift-types",
      "open-shifts-understanding-the-basics",
    ]) {
      expect(localizeUSSlug(slug)).toBe(slug);
    }
  });

  it("is idempotent", () => {
    for (const slug of US_SLUG_SOURCES) {
      expect(localizeUSSlug(localizeUSSlug(slug))).toBe(localizeUSSlug(slug));
    }
  });
});

describe("globalizeUSSlug", () => {
  it("round-trips every registered source slug", () => {
    for (const slug of US_SLUG_SOURCES) {
      expect(globalizeUSSlug(localizeUSSlug(slug))).toBe(slug);
    }
  });

  it("produces no collisions between US slugs", () => {
    const seen = new Set<string>();
    for (const slug of US_SLUG_SOURCES) {
      const us = localizeUSSlug(slug);
      expect(seen.has(us)).toBe(false);
      seen.add(us);
    }
  });

  it("never maps a registered US slug onto an unrelated global slug", () => {
    // A global slug that already reads as US English must survive the reverse.
    expect(globalizeUSSlug("holiday-staff-scheduling-fairness")).toBe(
      "holiday-staff-scheduling-fairness",
    );
    expect(globalizeUSSlug("shift-types")).toBe("shift-types");
  });

  it("falls back to the identity for unknown slugs", () => {
    expect(globalizeUSSlug("an-article-published-yesterday")).toBe(
      "an-article-published-yesterday",
    );
  });

  it("every registered source actually changes", () => {
    for (const slug of US_SLUG_SOURCES) {
      expect(localizeUSSlug(slug)).not.toBe(slug);
    }
  });
});

describe("usSlugRedirectTarget", () => {
  it("redirects a global slug requested under /us", () => {
    expect(usSlugRedirectTarget("rostering-basics")).toBe("scheduling-basics");
  });

  it("does not redirect a slug that is already localized", () => {
    expect(usSlugRedirectTarget("scheduling-basics")).toBeUndefined();
  });

  it("does not redirect a slug with no US variant", () => {
    expect(usSlugRedirectTarget("shift-types")).toBeUndefined();
  });
});

// Each US article route must send every other URL that resolves to an article
// to the one it publishes at. The redirect runs after the lookup, because an
// editor-chosen usSlug is only known from the fetched document - missing it
// leaves the article reachable at two US addresses, which is how the
// duplicate-URL defect happened the first time.
describe("US article routes redirect to the canonical US URL", () => {
  it.each([
    ["components/blog/BlogPostPage.tsx", "/us/blog/"],
    ["app/us/newsroom/[slug]/page.tsx", "/us/newsroom/"],
    ["app/us/case-studies/[slug]/page.tsx", "/us/case-studies/"],
  ])("%s redirects to %s", (route, prefix) => {
    const source = readFileSync(join(__dirname, "../../..", route), "utf8");
    expect(source).toContain("effectiveUSSlug(");
    expect(source).toContain("permanentRedirect(");
    expect(source).toContain("`" + prefix + "${");
    // The redirect must sit after the lookup: before it, the override is
    // unknown and the article would 404 at its previous URL.
    expect(source.indexOf("permanentRedirect(")).toBeGreaterThan(
      source.indexOf("notFound()"),
    );
  });

  it.each([
    ["app/us/newsroom/[slug]/page.tsx"],
    ["app/us/case-studies/[slug]/page.tsx"],
  ])("%s resolves an override or the derived slug", (route) => {
    const source = readFileSync(join(__dirname, "../../..", route), "utf8");
    expect(source).toContain(
      "usSlug.current == $usSlug || slug.current == $slug",
    );
  });
});

describe("effectiveUSSlug", () => {
  it("derives from the global slug when no override is set", () => {
    expect(effectiveUSSlug({ slug: { current: "rostering-basics" } })).toBe(
      "scheduling-basics",
    );
  });

  it("uses an editor's override verbatim", () => {
    expect(
      effectiveUSSlug({
        slug: { current: "2-2-3-panama-shift-scheduling" },
        usSlug: { current: "2-2-3-schedule" },
      }),
    ).toBe("2-2-3-schedule");
  });

  it("accepts the bare strings listing projections return", () => {
    expect(effectiveUSSlug({ slug: "rotating-rosters" })).toBe(
      "rotating-schedules",
    );
    expect(
      effectiveUSSlug({ slug: "anything", usSlug: "chosen-us-slug" }),
    ).toBe("chosen-us-slug");
  });

  it("is empty for a post with no slug rather than throwing", () => {
    expect(effectiveUSSlug({})).toBe("");
  });
});
