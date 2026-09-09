/** @jest-environment node */
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

test("all 67 mapped US pages expose specific metadata and existing social images", () => {
  for (const pathname of Object.values(US_URL_MAPPINGS)) {
    let expression: string | undefined;
    for (const file of [`app${pathname}/page.tsx`, `app${pathname}/layout.tsx`]) {
      if (!fs.existsSync(file)) continue;
      const tree = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const visit = (node: ts.Node) => {
        if (ts.isVariableDeclaration(node) && node.name.getText(tree) === "metadata") expression = node.initializer?.getText(tree);
        ts.forEachChild(node, visit);
      };
      visit(tree);
      if (expression) break;
    }
    expect({ pathname, hasMetadata: !!expression }).toEqual({ pathname, hasMetadata: true });
    const context = {module: {exports: {} as any}, pathname, withHreflang, resourceMetadata, URL};
    vm.runInNewContext(ts.transpileModule(`module.exports = ${expression}`, {compilerOptions: {target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS}}).outputText, context);
    const metadata = context.module.exports;
    expect(metadata.title).toBeTruthy();
    expect(metadata.description?.trim()).toBeTruthy();
    expect(metadata.alternates.canonical).toBe("https://rosterlab.com" + pathname);
    if (metadata.robots?.index === false) expect(metadata.alternates.languages).toEqual({});
    else expect(metadata.alternates.languages["en-US"]).toBe(metadata.alternates.canonical);
    for (const image of [...(metadata.openGraph?.images || []), ...(metadata.twitter?.images || [])]) {
      const url = typeof image === "string" ? image : image.url;
      if (url.startsWith("/")) expect({pathname, url, exists: fs.existsSync("public" + url)}).toEqual({pathname, url, exists: true});
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

test("generated article metadata retains editorial descriptions and production article URLs", () => {
  for (const type of ["case-studies", "newsroom"]) {
    const source = fs.readFileSync(`app/us/${type}/[slug]/page.tsx`, "utf8");
    expect(source).toContain(
      "post.seo?.metaDescription?.trim() || post.excerpt?.trim()",
    );
    expect(source).not.toContain("metaDescription.slice(");
    expect(source).not.toContain("process.env.NEXT_PUBLIC_SITE_URL");
    expect(source).toContain('<ArticleSchema inLanguage="en-US"');
  }
});
