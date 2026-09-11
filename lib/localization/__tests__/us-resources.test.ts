/** @jest-environment node */
import fs from "node:fs";
import path from "node:path";
import { formatDateShort } from "@/lib/utils";
import { RESOURCE_PATHS } from "../resource-routes";
import { localizeUSPathname } from "../us-slug";
import { getUSPath, getGlobalPath } from "@/components/seo/HreflangTags";
import {
  localizeUSResourceLink,
  localizeUSSurveyURL,
  localizeUSResourceResult,
  resourceMetadata,
} from "../us-resources";

test("all public resources have reciprocal routes and self canonicals", () => {
  for (const source of RESOURCE_PATHS) {
    // US resource URLs localize roster terminology in the path itself.
    const us = `/us${localizeUSPathname(source)}`;
    expect(getUSPath(source)).toBe(us);
    expect(getGlobalPath(us)).toBe(source);
    expect(fs.existsSync(path.join(process.cwd(), "app", us, "page.tsx"))).toBe(
      true,
    );
    const metadata = resourceMetadata({ title: "Resource" }, us);
    expect(metadata.alternates?.canonical).toBe(`https://rosterlab.com${us}`);
    expect(metadata.alternates?.languages?.["en-US"]).toBe(
      `https://rosterlab.com${us}`,
    );
    expect(resourceMetadata({}, source).alternates?.languages).toEqual(
      metadata.alternates?.languages,
    );
  }
});

test("URL conversion preserves delimiters, APIs, assets, external links and absolute destinations", () => {
  for (const value of [
    "",
    " ",
    "\n",
    ",",
    "true",
    "staff_name",
    "#download",
    "/api/whitepaper-gate",
    "/whitepapers/rostering-as-a-strategic-workforce-lever.pdf",
    "/templates/staff-roster.xlsx",
    "https://example.com/templates",
    "//rosterlab.com/templates",
  ])
    expect(localizeUSResourceLink(value)).toBe(value);
  expect(localizeUSResourceLink("https://rosterlab.com")).toBe(
    "https://rosterlab.com/us",
  );
  expect(
    localizeUSResourceLink("/case-studies/customer?source=us#results"),
  ).toBe("/us/case-studies/customer?source=us#results");
  expect(localizeUSResourceLink("/us/templates")).toBe("/us/templates");
});

test("US article dates use month/day ordering while global dates stay unchanged", () => {
  expect(formatDateShort("2025-12-10T12:00:00", "en-US")).toBe("12/10/2025");
  expect(formatDateShort("2025-12-10T12:00:00")).toBe("10/12/2025");
});

test("survey links keep their preview origin, IDs and tokens, and stay out of public SEO pairs", () => {
  const original =
    "http://localhost:3000/tools/survey-preferences/admin/abc-123?token=a%2Fb%2Bc&source=test#results";
  expect(localizeUSSurveyURL(original)).toBe(
    original.replace("/tools/", "/us/tools/"),
  );
  expect(getUSPath("/tools/survey-preferences/admin/abc-123")).toBeUndefined();
  const metadata = resourceMetadata(
    {},
    "/us/whitepapers/scheduling-as-a-strategic-workforce-lever/unlocked",
  );
  expect(metadata.robots).toEqual({ index: false, follow: false });
  expect(metadata.alternates?.languages).toEqual({});
});

test("CMS resource translation preserves case study identity and editorial protection", () => {
  const source = {
    title: "Rostering at Example Centre",
    slug: { current: "example-centre-rostering" },
    author: { name: "Jane" },
    usLocalization: { protectedTerms: ["Example Centre"] },
    body: [
      {
        _type: "block",
        style: "blockquote",
        children: [
          { _type: "span", text: "Our rostering improved.", marks: [] },
        ],
      },
    ],
  };
  const snapshot = JSON.stringify(source);
  const [post] = localizeUSResourceResult([source]);
  expect(post.title).toBe("Scheduling at Example Centre");
  expect(post.slug).toEqual(source.slug);
  expect(post.body).toEqual(source.body);
  expect(JSON.stringify(source)).toBe(snapshot);
  expect(
    localizeUSResourceResult({
      title: "Rostering at Dargaville Medical Centre",
    }).title,
  ).toBe("Scheduling at Dargaville Medical Centre");
  expect(
    localizeUSResourceResult({
      title: "Visit Melbourne Convention & Exhibition Centre",
    }).title,
  ).toBe("Visit Melbourne Convention & Exhibition Centre");
});
