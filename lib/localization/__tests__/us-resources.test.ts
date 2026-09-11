/** @jest-environment node */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
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

function generatedFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory()
      ? generatedFiles(file)
      : /\.tsx?$/.test(file) &&
          fs.readFileSync(file, "utf8").startsWith("// Generated from ")
        ? [file]
        : [];
  });
}

// Regression guard for localization accidentally modifying the behavior of a
// calculator, form, gate or survey. Compare the source and generated ASTs,
// independent of the generation algorithm.
test("generated resources preserve numeric logic, storage keys, delimiters, API and asset calls", () => {
  function invariants(text: string) {
    const tree = ts.createSourceFile(
      "resource.tsx",
      text,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const values: string[] = [];
    const inspect = (node: ts.Node) => {
      // Editorial metadata may deliberately differ (e.g. removing legacy
      // description-length clipping); us-seo.test covers that separately.
      if (ts.isFunctionDeclaration(node) && node.name?.text === "generateMetadata") return;
      if (ts.isNumericLiteral(node)) values.push(`number:${node.text}`);
      if (ts.isCallExpression(node)) {
        const name = node.expression.getText(tree);
        if (
          /\.(split|join|getItem|setItem|removeItem)$/.test(name) ||
          name === "fetch"
        ) {
          node.arguments.forEach((arg) => {
            if (ts.isStringLiteral(arg)) values.push(`${name}:${arg.text}`);
          });
        }
      }
      if (ts.isTaggedTemplateExpression(node)) return; // CMS adds an override projection; SQL is checked separately.
      ts.forEachChild(node, inspect);
    };
    inspect(tree);
    return values;
  }
  for (const file of [
    ...generatedFiles("app/us"),
  ]) {
    const output = fs.readFileSync(file, "utf8");
    const sourcePath = /^\/\/ Generated from (.+?)\. Run /.exec(output)![1];
    expect({ file, values: invariants(output) }).toEqual({
      file,
      values: invariants(fs.readFileSync(sourcePath, "utf8")),
    });
    expect(output).not.toContain('split("/us")');
    expect(output).not.toContain('|| "/us"');
  }
});
