/** @jest-environment node */
import { execSync } from "node:child_process";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { resolveTitle } from "next/dist/lib/metadata/resolvers/resolve-title";
import {
  US_URL_MAPPINGS,
  generateHreflangMetadata,
  withHreflang,
} from "@/components/seo/HreflangTags";
import { resourceMetadata } from "../us-resources";

// Reading a route's metadata means evaluating the object literal it exports,
// because most of them are wrapped in resourceMetadata()/withHreflang() and the
// resolved title, canonical and languages only exist after those run.
function metadataExpression(file: string): string | undefined {
  if (!fs.existsSync(file)) return undefined;
  const tree = ts.createSourceFile(
    file,
    fs.readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let expression: string | undefined;
  const visit = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(tree) === "metadata"
    )
      expression = node.initializer?.getText(tree);
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return expression;
}

function evaluateMetadata(expression: string, pathname: string) {
  const context = {
    module: { exports: {} as any },
    pathname,
    withHreflang,
    resourceMetadata,
    URL,
  };
  vm.runInNewContext(
    ts.transpileModule(`module.exports = ${expression}`, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
      },
    }).outputText,
    context,
  );
  return context.module.exports;
}

// page.tsx wins over layout.tsx, matching Next's own precedence.
const routeFiles = (pathname: string) => [
  `app${pathname}/page.tsx`,
  `app${pathname}/layout.tsx`,
];

test("all 67 mapped US pages expose specific metadata and existing social images", () => {
  for (const pathname of Object.values(US_URL_MAPPINGS)) {
    const expression = routeFiles(pathname)
      .map(metadataExpression)
      .find(Boolean);
    expect({ pathname, hasMetadata: !!expression }).toEqual({
      pathname,
      hasMetadata: true,
    });
    const metadata = evaluateMetadata(expression!, pathname);
    expect(metadata.title).toBeTruthy();
    expect(metadata.description?.trim()).toBeTruthy();
    expect(metadata.alternates.canonical).toBe(
      "https://rosterlab.com" + pathname,
    );
    if (metadata.robots?.index === false)
      expect(metadata.alternates.languages).toEqual({});
    else
      expect(metadata.alternates.languages["en-US"]).toBe(
        metadata.alternates.canonical,
      );
    for (const image of [
      ...(metadata.openGraph?.images || []),
      ...(metadata.twitter?.images || []),
    ]) {
      const url = typeof image === "string" ? image : image.url;
      if (url.startsWith("/"))
        expect({
          pathname,
          url,
          exists: fs.existsSync("public" + url),
        }).toEqual({ pathname, url, exists: true });
    }
  }
});

test("Next resolves branded titles once while retaining branding for unbranded titles", () => {
  for (const title of [
    "Pricing - RosterLab",
    "RosterLab Blog - Page 2",
    "AI Staff Scheduling | RosterLab",
  ]) {
    expect(
      resolveTitle(
        withHreflang({ title }, "/us/pricing").title,
        "%s | RosterLab",
      ).absolute,
    ).toBe(title);
  }
  expect(
    resolveTitle(
      withHreflang({ title: "Staff scheduling tips" }, "/us/blog").title,
      "%s | RosterLab",
    ).absolute,
  ).toBe("Staff scheduling tips | RosterLab");
});

test("all mapped public pages have reciprocal absolute language clusters", () => {
  for (const [global, us] of Object.entries(US_URL_MAPPINGS)) {
    const globalURL = "https://rosterlab.com" + (global === "/" ? "" : global);
    const languages = generateHreflangMetadata(us).alternates!.languages;
    expect(languages).toEqual(
      generateHreflangMetadata(global).alternates!.languages,
    );
    expect(languages["en-US"]).toBe("https://rosterlab.com" + us);
    expect(languages.en).toBe(globalURL);
    expect(languages["x-default"]).toBe(globalURL);
  }
});

test("non-indexable pages retain their canonical but do not advertise language alternatives", () => {
  const meta = resourceMetadata(
    { title: "Page 2", robots: { index: false, follow: true } },
    "/us/case-studies/page/2",
  );
  expect(meta.alternates).toEqual({
    canonical: "https://rosterlab.com/us/case-studies/page/2",
    languages: {},
  });
  expect(meta.robots).toEqual({ index: false, follow: true });
  expect(
    withHreflang({ robots: "noindex, follow" }, "/us/blog/page/2").alternates
      .languages,
  ).toEqual({});
});

test("US social metadata uses US locale and production canonical URLs", () => {
  const meta = resourceMetadata(
    { openGraph: { url: "https://preview.example/case", locale: "en_NZ" } },
    "/us/case-studies/example",
  );
  expect(meta.openGraph).toMatchObject({
    locale: "en_US",
    url: "https://rosterlab.com/us/case-studies/example",
  });
});

// A title that renders past 60 characters truncates mid-phrase, and a
// description outside 70-160 invites Google to write its own. Branding belongs
// in the appended title template, never inside the description field. Walks the
// routes on disk rather than US_URL_MAPPINGS: the whitepaper that prompted this
// guard is indexable but absent from the hreflang registry.
test("every indexable US route renders a title and description within SERP range", () => {
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const name = `${dir}/${entry.name}`;
      return entry.isDirectory()
        ? walk(name)
        : /\/(page|layout)\.tsx$/.test(name)
          ? [name]
          : [];
    });
  const offenders: Record<string, unknown>[] = [];
  const unevaluated: Record<string, unknown>[] = [];
  let checked = 0;
  for (const file of walk("app/us")) {
    // Dynamic routes take their metadata from the CMS, not from source.
    // lib/localization/__tests__/us-terminology.test.ts covers those titles.
    if (/\[(slug|page|surveyId)\]/.test(file)) continue;
    const expression = metadataExpression(file);
    if (!expression) continue;
    const pathname =
      "/" + file.replace(/^app\//, "").replace(/\/(page|layout)\.tsx$/, "");
    let metadata;
    try {
      metadata = evaluateMetadata(expression, pathname);
    } catch (error) {
      // Never swallow this: a route whose metadata cannot be evaluated is a
      // route this guard is not checking, which is how the whitepaper's
      // 71-character title survived the previous check.
      unevaluated.push({ pathname, reason: String((error as Error).message) });
      continue;
    }
    if (!metadata) {
      unevaluated.push({ pathname, reason: "metadata did not evaluate" });
      continue;
    }
    // noindex pages are deliberately exempt: they never reach a SERP.
    if (metadata.robots?.index === false) continue;
    checked++;
    const title = resolveTitle(metadata.title, "%s | RosterLab").absolute || "";
    const description = (metadata.description || "").trim();
    if (title.length > 60)
      offenders.push({ pathname, titleLength: title.length, title });
    if (description.length < 70 || description.length > 160)
      offenders.push({ pathname, descriptionLength: description.length });
    if (/\|\s*RosterLab/.test(description))
      offenders.push({ pathname, brandSuffixInDescription: description });
  }
  expect(offenders).toEqual([]);
  expect(unevaluated).toEqual([]);
  expect(checked).toBeGreaterThan(55);
});

// A reference whose case does not match the file on disk resolves fine on
// macOS and 404s on Linux - so it passes every local check and breaks only in
// CI or, worse, silently in production on Netlify. Local dev cannot catch this
// class, which is the whole reason for asserting it here. Files that are
// missing outright are deliberately not covered: those are visible to anyone
// who loads the page.
test("every image reference matches the file on disk exactly, including case", () => {
  const tracked = new Set(
    execSync("git ls-files public", { encoding: "utf8" })
      .split("\n")
      .filter(Boolean),
  );
  const byLowercase = new Map(
    [...tracked].map((file) => [file.toLowerCase(), file]),
  );
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const name = `${dir}/${entry.name}`;
      return entry.isDirectory()
        ? walk(name)
        : /\.tsx?$/.test(name)
          ? [name]
          : [];
    });
  const mismatches: Record<string, unknown>[] = [];
  for (const file of [...walk("app"), ...walk("components")]) {
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(/["'`](\/images\/[^"'`)\s]+)["'`]/g)) {
      const reference = match[1];
      const path = "public" + decodeURIComponent(reference);
      if (tracked.has(path)) continue;
      const actual = byLowercase.get(path.toLowerCase());
      // Only a case-differing twin is a mismatch; absent files are out of scope.
      if (actual)
        mismatches.push({
          file,
          reference,
          actual: actual.replace(/^public/, ""),
        });
    }
  }
  expect(mismatches).toEqual([]);
});
