/** @jest-environment node */
import {
  getUSPath,
  getGlobalPath,
  generateHreflangMetadata,
  LOCALIZED_PAGES,
} from "@/components/seo/HreflangTags";
import {
  alliedHealthCopy,
  alliedHealthAnswer,
  alliedHealthHref,
} from "@/app/industries/healthcare/allied-health-rostering/localization";
import { usNavItems } from "@/components/layout/USHeader";
import nextConfig from "@/next.config";

const globalPath = "/industries/healthcare/allied-health-rostering";
const usPath = "/us/industries/healthcare/allied-health-scheduling";

test("allied health has a reciprocal region pair registered for the sitemap", () => {
  expect(getUSPath(globalPath)).toBe(usPath);
  expect(getGlobalPath(usPath)).toBe(globalPath);
  expect(LOCALIZED_PAGES.has(globalPath)).toBe(true);
  const cluster = generateHreflangMetadata(globalPath).alternates!.languages;
  expect(cluster).toEqual(
    generateHreflangMetadata(usPath).alternates!.languages,
  );
  expect(cluster.en).toBe(`https://rosterlab.com${globalPath}`);
  expect(cluster["en-US"]).toBe(`https://rosterlab.com${usPath}`);
});

test("US allied health links stay regional, including HTML links inside FAQ answers", () => {
  expect(alliedHealthHref("/staff-rostering-interactive-demo", true)).toBe(
    "/us/product-tour",
  );
  expect(alliedHealthHref("/industries/healthcare/radiography", true)).toBe(
    "/us/industries/healthcare/radiography-scheduling",
  );
  expect(
    alliedHealthAnswer(
      "Ask <a href='/feature/ai-staff-rostering-assistant'>Otto</a> about your roster.",
      true,
    ),
  ).toBe(
    "Ask <a href='/us/feature/ai-staff-scheduling-assistant'>Otto</a> about your schedule.",
  );
  expect(alliedHealthHref(globalPath, false)).toBe(globalPath);
});

test("US clinical copy and spelling are localized without rewriting the brand", () => {
  expect(
    alliedHealthCopy(
      "RosterLab rostering for physiotherapists across wards",
      true,
    ),
  ).toBe("RosterLab scheduling for physical therapists across units");
  expect(alliedHealthCopy("Haematology", false)).toBe("Haematology");
  expect(
    alliedHealthCopy(
      "Radiographers and a Physiotherapist join an Anaesthetic technician in theatre",
      true,
    ),
  ).toBe(
    "Radiologic technologists and a Physical therapist join an Anesthesia technician in operating room",
  );
  expect(
    alliedHealthCopy(
      "Our roster writers plan surgical lists and re-roster affected shifts",
      true,
    ),
  ).toBe(
    "Our schedulers plan operating room schedules and reschedule affected shifts",
  );
});

test("US navigation links to allied health without a separate radiography entry", () => {
  const solutions = usNavItems.find((item) => item.title === "Solutions");
  if (!solutions || !("subItems" in solutions)) {
    throw new Error("Expected the Solutions menu to contain navigation items");
  }
  expect(solutions.subItems).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ title: "Allied Health", link: usPath }),
    ]),
  );
  expect(solutions.subItems).not.toContainEqual(
    expect.objectContaining({
      link: "/us/industries/healthcare/radiography-scheduling",
    }),
  );
});

test("the previously advertised US URL redirects directly to the scheduling page", async () => {
  const redirects = await nextConfig.redirects!();
  expect(redirects).toContainEqual({
    source: "/us/industries/healthcare/allied-health-rostering",
    destination: usPath,
    permanent: true,
  });
});

test.each(["deploy-preview", "branch-deploy", "production"])(
  "%s uses the intended indexing header policy",
  async (context) => {
    const previous = process.env.CONTEXT;
    try {
      process.env.CONTEXT = context;
      const rules = await nextConfig.headers!();
      const noindex = rules.some((rule) =>
        rule.headers.some(
          (header) =>
            header.key === "X-Robots-Tag" && header.value.includes("noindex"),
        ),
      );
      expect(noindex).toBe(context !== "production");
    } finally {
      if (previous === undefined) delete process.env.CONTEXT;
      else process.env.CONTEXT = previous;
    }
  },
);
