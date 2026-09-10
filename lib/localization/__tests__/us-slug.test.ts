import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  localizeUSSlug,
  globalizeUSSlug,
  usSlugRedirectTarget,
  US_SLUG_SOURCES,
} from "../us-slug";

describe("localizeUSSlug", () => {
  it("converts roster terminology segment by segment", () => {
    expect(localizeUSSlug("rostering-basics")).toBe("scheduling-basics");
    expect(localizeUSSlug("rotating-rosters")).toBe("rotating-schedules");
    expect(localizeUSSlug("guide-to-rostering")).toBe("guide-to-scheduling");
    expect(localizeUSSlug("should-your-next-staff-roster-be-built-with-ai")).toBe(
      "should-your-next-staff-schedule-be-built-with-ai",
    );
  });

  it("never rewrites the RosterLab brand name", () => {
    expect(
      localizeUSSlug("hospital-in-perth-partners-with-rosterlab-for-smarter-rosters"),
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

// Each US article route must send the global slug to the localized URL. Missing
// the call is invisible at runtime - the page renders a duplicate that
// self-canonicalizes - so assert the wiring rather than the behaviour.
describe("US article routes redirect the pre-localization slug", () => {
  it.each([
    ["components/blog/BlogPostPage.tsx", "/us/blog/"],
    ["app/us/newsroom/[slug]/page.tsx", "/us/newsroom/"],
    ["app/us/case-studies/[slug]/page.tsx", "/us/case-studies/"],
  ])("%s redirects to %s", (route, prefix) => {
    const source = readFileSync(join(__dirname, "../../..", route), "utf8");
    expect(source).toContain("usSlugRedirectTarget(");
    expect(source).toContain("permanentRedirect(");
    expect(source).toContain("`" + prefix + "${");
  });
});
