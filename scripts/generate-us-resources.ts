/**
 * Generate US resource variants from the global source, retaining layouts and
 * tool logic. Run `npm run localize:resources` after changing a source resource;
 * `npm run localize:resources:check` detects stale generated files.
 * Only copy literals and known page destinations are transformed. Imports,
 * assets, APIs, identifiers, storage keys and CMS/user data are not translated.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import {
  localizeUSText,
  localizeUSResourceLink,
} from "../lib/localization/us-resources";
import { localizeUSPathname } from "../lib/localization/us-slug";

const roots = [
  "app/case-studies",
  "app/newsroom",
  "app/webinars",
  "app/whitepapers",
  "app/templates",
  "app/tools/fte-calculator",
  "app/tools/survey-preferences",
  "app/schedge",
];
// These components render both locales; only their route wrappers are generated.
const sharedResources = new Set([
  "components/case-studies/CaseStudiesPageContent.tsx",
  "components/newsroom/NewsroomPageContent.tsx",
  "components/modals/CaseStudyGateCheck.tsx",
  "components/modals/CTAModalCaseStudy.tsx",
  "components/games/SchedgeGame.tsx",
  "components/survey/HolidayConfigurator.tsx",
  "components/survey/ResultsTable.tsx",
  "app/tools/fte-calculator/client.tsx",
  "app/tools/survey-preferences/client.tsx",
  "app/tools/survey-preferences/s/[surveyId]/client.tsx",
  "app/tools/survey-preferences/admin/[surveyId]/client.tsx",
  "app/tools/ToolsPageContent.tsx",
  "app/templates/TemplatesPageContent.tsx",
  "app/webinars/WebinarsPageContent.tsx",
  "app/templates/free-staff-roster-template-excel/ExcelFormClient.tsx",
  "app/templates/free-shift-swap-template/ShiftSwapFormClient.tsx",
  "app/templates/free-staff-timesheet-template/TimesheetFormClient.tsx",
  "app/templates/free-employee-of-the-month-certificate/EmployeeOfMonthFormClient.tsx",
  "app/whitepapers/rostering-as-a-strategic-workforce-lever/WhitepaperContent.tsx",
  "app/whitepapers/rostering-as-a-strategic-workforce-lever/unlocked/WhitepaperUnlockedContent.tsx",
]);
function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const name = `${dir}/${entry.name}`;
    return entry.isDirectory()
      ? files(name)
      : /\.[jt]sx?$/.test(name)
        ? [name]
        : [];
  });
}
const sources = [
  ...roots.flatMap(files),
  "app/tools/page.tsx",
  "app/tools/ToolsPageContent.tsx",
].filter((file) => !sharedResources.has(file));
// Route directories are localized with the copy: a US reader gets
// /us/templates/free-staff-schedule-template-excel, not the roster spelling.
// Component paths are code, not URLs, and keep their source names.
const destination = (file: string) =>
  file.startsWith("app/")
    ? localizeUSPathname(file.replace(/^app\/(?:\(main\)\/)?/, "app/us/"))
    : file.replace(/^components\//, "components/us-resources/");
const destinations = new Map(sources.map((file) => [file, destination(file)]));
const copyKeys = new Set([
  "title",
  "description",
  "excerpt",
  "label",
  "name",
  "heading",
  "subheading",
  "text",
  "content",
  "answer",
  "question",
  "placeholder",
  "alt",
  "aria-label",
  "message",
  "summary",
  "body",
  "intro",
  "subtitle",
  "format",
  "category",
]);
const skipKeys = new Set([
  "className",
  "id",
  "key",
  "value",
  "src",
  "download",
  "type",
  "name",
  "htmlFor",
  "style",
]);
const protectedTerms = ["Auckland Radiology", "RosterLab"];
function localizeCopy(value: string): string {
  // HTML FAQs contain links inside strings; URLs are otherwise protected by
  // the text dictionary. Preserve original spelling within quoted testimony.
  return localizeUSText(value, protectedTerms).replace(
    /(href=["'])([^"']+)(["'])/g,
    (_, before, href, after) => before + localizeUSResourceLink(href) + after,
  );
}
// The CMS-backed article routes generated under /us. Both need the editorial
// description and the slug redirect; a third article route added here picks up
// both without further change.
const articleRoutes = [
  "app/case-studies/[slug]/page.tsx",
  "app/newsroom/[slug]/page.tsx",
];

// A visitor who follows the global slug under /us has to be redirected to the
// localized URL, or the article stays reachable at two US addresses that each
// claim to be the canonical US page. Mirrors components/blog/BlogPostPage.tsx,
// which does this for /us/blog. The section comes from the source path, so this
// needs no per-route knowledge.
function injectSlugRedirect(generated: string, file: string): string {
  const section = `/us/${path.basename(path.dirname(path.dirname(file)))}`;
  // After the lookup, not before: the article's canonical US URL can be an
  // editor-chosen slug, which only the fetched document knows. Anything else
  // that resolves to the article - including the pre-localization URL -
  // redirects here once, so there is never a chain or a second live URL.
  const notFoundBlock = "  if (!post) {\n    notFound();\n  }\n";
  const slugImport =
    'import { localizeUSSlug, globalizeUSSlug, effectiveUSSlug } from "@/lib/localization/us-slug";';
  const navigationImport = 'import { notFound } from "next/navigation";';
  if (
    !generated.includes(notFoundBlock) ||
    !generated.includes(slugImport) ||
    !generated.includes(navigationImport)
  )
    throw new Error(`Cannot inject the US slug redirect into ${file}`);
  return generated
    .replace(
      notFoundBlock,
      notFoundBlock +
        `  const canonicalUSSlug = effectiveUSSlug(post);\n` +
        `  if (canonicalUSSlug && canonicalUSSlug !== slug)\n` +
        `    permanentRedirect(\`${section}/\${canonicalUSSlug}\`);\n`,
    )
    .replace(
      slugImport,
      'import { localizeUSSlug, globalizeUSSlug, effectiveUSSlug } from "@/lib/localization/us-slug";',
    )
    .replace(
      navigationImport,
      'import { notFound, permanentRedirect } from "next/navigation";',
    );
}

type Edit = { start: number; end: number; text: string };
function transform(
  source: string,
  filename: string,
  globalMetadataOnly = false,
): string {
  const ast = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const edits: Edit[] = [];
  const sharedComponentNames = new Set<string>();
  for (const node of ast.statements) {
    if (
      !ts.isImportDeclaration(node) ||
      !ts.isStringLiteral(node.moduleSpecifier)
    )
      continue;
    const specifier = node.moduleSpecifier.text;
    const resolved = specifier.startsWith("@/")
      ? specifier.slice(2)
      : path.posix.normalize(
          path.posix.join(path.posix.dirname(filename), specifier),
        );
    if (sharedResources.has(resolved + ".tsx") && node.importClause?.name)
      sharedComponentNames.add(node.importClause.name.text);
  }

  let needsMetadata = false;
  let needsResult = false;
  let needsSlug = false;
  const route =
    "/" + path.dirname(filename).replace(/^app\/(?:\(main\)\/)?/, "");
  const regionalRoute = globalMetadataOnly
    ? route
    : `/us${localizeUSPathname(route)}`;
  const routeExpression =
    "`" +
    regionalRoute
      .replace(/\[slug\]/g, "${slug}")
      .replace(/\[page\]/g, "${page}")
      .replace(/\[surveyId\]/g, "${surveyId}") +
    "`";
  const edit = (node: ts.Node, text: string) =>
    edits.push({ start: node.getStart(ast), end: node.end, text });
  function isInMetadata(node: ts.Node): boolean {
    for (
      let parent: ts.Node | undefined = node.parent;
      parent;
      parent = parent.parent
    ) {
      if (ts.isFunctionDeclaration(parent))
        return parent.name?.text === "generateMetadata";
    }
    return false;
  }
  function enclosingFunctionName(node: ts.Node): string | undefined {
    for (
      let parent: ts.Node | undefined = node.parent;
      parent;
      parent = parent.parent
    ) {
      if (ts.isFunctionDeclaration(parent)) return parent.name?.text;
    }
    return undefined;
  }
  function visit(node: ts.Node) {
    // US article URLs carry the localized slug. generateStaticParams emits the
    // US slug; every CMS lookup converts it back to the published global slug.
    if (
      !globalMetadataOnly &&
      ts.isShorthandPropertyAssignment(node) &&
      node.name.text === "slug"
    ) {
      const inStaticParams =
        enclosingFunctionName(node) === "generateStaticParams";
      const call = ts.isObjectLiteralExpression(node.parent)
        ? node.parent.parent
        : undefined;
      const isFetchArgument =
        call &&
        ts.isCallExpression(call) &&
        ts.isPropertyAccessExpression(call.expression) &&
        call.expression.name.text === "fetch";
      if (inStaticParams || isFetchArgument) {
        needsSlug = true;
        // A lookup matches an editor's usSlug first and the derived slug
        // otherwise, so an overridden URL resolves without a reverse map.
        edit(
          node,
          inStaticParams
            ? "slug: effectiveUSSlug(post)"
            : "slug: globalizeUSSlug(slug), usSlug: slug",
        );
      }
    }
    // Metadata is wrapped by insertion, so nested copy/URL edits remain valid.
    const staticMeta =
      ts.isVariableDeclaration(node) &&
      node.name.getText(ast) === "metadata" &&
      node.initializer;
    const returnedMeta =
      ts.isReturnStatement(node) &&
      node.expression &&
      ts.isObjectLiteralExpression(node.expression) &&
      isInMetadata(node);
    const expression = staticMeta
      ? (node as ts.VariableDeclaration).initializer!
      : returnedMeta
        ? (node as ts.ReturnStatement).expression!
        : undefined;
    if (
      expression &&
      !expression.getText(ast).startsWith("resourceMetadata(")
    ) {
      // Private dynamic pages already have noindex metadata and don't need a
      // canonical containing an unavailable surveyId at module scope.
      if (!regionalRoute.includes("[surveyId]")) {
        needsMetadata = true;
        edits.push({
          start: expression.getStart(ast),
          end: expression.getStart(ast),
          text: "resourceMetadata(",
        });
        edits.push({
          start: expression.end,
          end: expression.end,
          text: `, ${routeExpression})`,
        });
      }
    }
    if (globalMetadataOnly) {
      ts.forEachChild(node, visit);
      return;
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(ast) === "formatDateShort" &&
      node.arguments.length === 1
    ) {
      edits.push({
        start: node.arguments[0].end,
        end: node.arguments[0].end,
        text: ', "en-US"',
      });
    }
    if (
      (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
      sharedComponentNames.has(node.tagName.getText(ast))
    ) {
      edits.push({
        start: node.tagName.end,
        end: node.tagName.end,
        text: " isUS",
      });
    }
    if (
      (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
      ["BlogCard", "RelatedPosts"].includes(node.tagName.getText(ast))
    ) {
      edits.push({
        start: node.tagName.end,
        end: node.tagName.end,
        text: ' basePath="/us/blog"',
      });
    }
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const specifier = node.moduleSpecifier.text;
      const resolved = specifier.startsWith("@/")
        ? specifier.slice(2)
        : specifier.startsWith(".")
          ? path.posix.normalize(
              path.posix.join(path.posix.dirname(filename), specifier),
            )
          : "";
      const target =
        destinations.get(`${resolved}.tsx`) ||
        destinations.get(`${resolved}.ts`);
      if (target)
        edit(
          node.moduleSpecifier,
          JSON.stringify("@/" + target.replace(/\.[jt]sx?$/, "")),
        );
      // Relative imports outside the generated graph must keep their source.
      else if (specifier.startsWith("."))
        edit(node.moduleSpecifier, JSON.stringify("@/" + resolved));
      return;
    }
    if (ts.isTaggedTemplateExpression(node)) {
      if (
        node.tag.getText(ast) === "groq" &&
        node.template.getText(ast).includes('_type == "post"')
      ) {
        // Mirror only the US counterparts of the global fields this query
        // already selects. A card listing asks for title/excerpt/image, so it
        // must not be made to fetch whole US article bodies.
        // A US route must exclude global-only articles, exactly as the global
        // route excludes US-only ones. Flipping the predicate keeps the two
        // filters in step without the generated file being edited by hand.
        const source = node.template
          .getText(ast)
          .replaceAll('sites != "us"', 'sites != "global"');
        const selects = (field: string) =>
          new RegExp(`\\n\\s*${field}[,\\s{]`).test(source);
        // A paths query returns bare slug strings globally; the US build needs
        // the override too, so it can emit the URL the article publishes at.
        const usFields = ["usProtectedTerms", "usSlug"];
        if (selects("title")) usFields.push("usTitle");
        if (selects("excerpt")) usFields.push("usExcerpt");
        if (selects("body")) usFields.push("usBody");
        if (selects("mainImage")) usFields.push("usMainImage");
        if (selects("seo"))
          usFields.push("usSeo { metaTitle, metaDescription, ogImage }");
        // The legacy object is projected rather than taken wholesale for the
        // same reason: it carries a body too.
        const legacyFields = [
          "protectedTerms",
          "title",
          "excerpt",
          "metaTitle",
          "metaDescription",
          "mainImage",
          "ogImage",
          ...(selects("body") ? ["body"] : []),
        ].join(", ");
        // A paths query returns bare slug strings for the global build; the US
        // build needs the override too, so generateStaticParams can prerender
        // the URL the article actually publishes at.
        const withPaths = source.replace(
          /\[\]\.slug\.current/g,
          '[]{"slug": slug.current, "usSlug": usSlug.current}',
        );
        const withSlugMatch = withPaths.replace(
          /slug\.current == \$slug/g,
          "(usSlug.current == $usSlug || slug.current == $slug)",
        );
        const query = withSlugMatch.replace(
          /(\n\s*)title,/,
          `$1usLocalization { ${legacyFields} },$1${usFields.join(",$1")},$1title,`,
        );
        if (query !== node.template.getText(ast)) edit(node.template, query);
      }
      return; // Never translate GROQ/SQL, slugs or query identifiers.
    }
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "fetch"
    ) {
      const query = node.arguments[0]?.getText(ast) || "";
      if (/Query$/.test(query) && !/PathsQuery$/.test(query)) {
        needsResult = true;
        edits.push({
          start: node.end,
          end: node.end,
          text: ".then(localizeUSResourceResult)",
        });
      }
    }
    if (ts.isJsxText(node)) {
      const original = source.slice(node.pos, node.end);
      const localized = localizeCopy(original);
      if (localized !== original)
        edits.push({ start: node.pos, end: node.end, text: localized });
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const original = node.text;
      const parent = node.parent;
      if (ts.isPropertyAssignment(parent) && parent.name === node) return;
      const key = ts.isJsxAttribute(parent)
        ? parent.name.getText(ast)
        : ts.isPropertyAssignment(parent)
          ? parent.name.getText(ast).replace(/["']/g, "")
          : "";
      if (ts.isJsxAttribute(parent) && skipKeys.has(key)) return;
      const isRoot = /^(?:\/|https?:\/\/(?:www\.)?rosterlab\.com\/?)$/.test(
        original,
      );
      const rootNavigation =
        ["href", "url", "canonical", "basePath"].includes(key) ||
        (ts.isCallExpression(parent) &&
          /(?:router\.(?:push|replace)|redirect)$/.test(
            parent.expression.getText(ast),
          ));
      let localized = /^(en-NZ|en-AU|en-GB)$/.test(original)
        ? "en-US"
        : isRoot && !rootNavigation
          ? original
          : localizeUSResourceLink(original);
      if (
        localized === original &&
        !/^(?:\/?[\w.-]+\/|https?:|mailto:|#|@)/.test(original)
      ) {
        // Human prose and explicit copy fields only. Kebab/snake-case values,
        // single-word machine values and CSS/regex fragments remain untouched.
        const human =
          copyKeys.has(key) ||
          (/[A-Za-z]+\s+[A-Za-z]+/.test(original) &&
            !/[{};]|=>/.test(original));
        if (human) localized = localizeCopy(original);
      }
      if (localized !== original) edit(node, JSON.stringify(localized));
      return;
    }
    if (ts.isTemplateExpression(node)) {
      // Transform human copy and only known page path fragments. No expression
      // contents (IDs, tokens, user text) are changed.
      const parts = [
        node.head,
        ...node.templateSpans.map((span) => span.literal),
      ];
      for (const part of parts) {
        const raw = part.getText(ast);
        let updated = raw
          .replace(
            /\/tools\/survey-preferences(?=`$)/g,
            "/us/tools/survey-preferences",
          )
          .replace(/\/(case-studies|newsroom|blog)\//g, "/us/$1/")
          .replace(
            /\/(tools\/survey-preferences\/(?:s|admin)|tools\/staff-scheduling-personality-quiz)\//g,
            "/us/$1/",
          );
        if (
          !/[{};]|=>/.test(part.text) &&
          /[A-Za-z]+\s+[A-Za-z]+/.test(part.text)
        )
          updated = localizeCopy(updated);
        if (updated !== raw) edit(part, updated);
      }
      for (const span of node.templateSpans) visit(span.expression);
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  // Existing global resourceMetadata paths become US too (the wrapper itself
  // is retained when regenerating after global metadata has been installed).
  const imports = [
    needsMetadata && !source.includes("import { resourceMetadata }")
      ? 'import { resourceMetadata } from "@/lib/localization/us-resources";'
      : "",
    needsResult
      ? 'import { localizeUSResourceResult } from "@/lib/localization/us-resources";'
      : "",
    needsSlug
      ? 'import { localizeUSSlug, globalizeUSSlug, effectiveUSSlug } from "@/lib/localization/us-slug";'
      : "",
  ]
    .filter(Boolean)
    .join("\n");
  let result = source;
  for (const change of edits.sort((a, b) => b.start - a.start || b.end - a.end))
    result =
      result.slice(0, change.start) + change.text + result.slice(change.end);
  if (imports) {
    // Keep the client directive first.
    const directive = /^(?:["']use client["'];?)/.exec(result);
    const index = directive ? directive[0].length : 0;
    result =
      result.slice(0, index) + "\n" + imports + "\n" + result.slice(index);
  }
  return result;
}

const check = process.argv.includes("--check");
let stale = 0;
for (const file of sources) {
  const source = fs.readFileSync(file, "utf8");
  const original = transform(source, file, true);
  if (original !== source) {
    if (check) {
      console.error(`Missing global resource metadata: ${file}`);
      stale++;
    } else fs.writeFileSync(file, original);
  }
  let generated = transform(original, file);
  generated = generated.replaceAll(
    'process.env.NEXT_PUBLIC_SITE_URL || "https://rosterlab.com"',
    '"https://rosterlab.com"',
  );
  // generateStaticParams maps over the {slug, usSlug} pairs the paths query
  // now returns, so a prerendered path is the URL the article publishes at.
  generated = generated.replaceAll(
    "slugs.map((slug: string) => ({ slug: effectiveUSSlug(post) }))",
    "slugs.map((post: { slug: string; usSlug?: string }) => ({\n    slug: effectiveUSSlug(post),\n  }))",
  );
  generated = generated.replaceAll(
    "<ArticleSchema",
    '<ArticleSchema inLanguage="en-US"',
  );
  if (articleRoutes.includes(file)) {
    // Preserve editorial descriptions: Google has no fixed 155-character limit.
    // The global source's legacy padding/clipping must not override US CMS copy.
    const descriptionLogic =
      /  \/\/ Ensure meta description[\s\S]*?(?=  return resourceMetadata\(\s*\{)/;
    if (!descriptionLogic.test(generated))
      throw new Error(`Missing article metadata marker: ${file}`);
    generated = generated.replace(
      descriptionLogic,
      "  const metaDescription = post.seo?.metaDescription?.trim() || post.excerpt?.trim() || `Read ${post.title} on RosterLab.`;\n\n",
    );
    generated = injectSlugRedirect(generated, file);
  }
  if (file === "app/newsroom/[slug]/page.tsx") {
    generated = generated.replaceAll(
      "Whanganui DHB radiography department",
      "Whanganui radiography department in New Zealand",
    );
  }
  if (file.startsWith("app/webinars/")) {
    generated = generated
      .replaceAll("MRI radiographer's time", "MRI technologist's time")
      .replaceAll(
        "Three wards at Whanganui Hospital",
        "Three inpatient units at Whanganui Hospital",
      )
      .replaceAll("Three hospital wards", "Three hospital units");
  }
  if (file === "app/tools/page.tsx") {
    generated = generated
      .replaceAll("ROI Calculator", "Savings Calculator")
      .replaceAll("ROI calculator", "savings calculator")
      .replaceAll(
        "Calculate your potential return on investment with RosterLab. See how much time and money you can save with automated scheduling.",
        "Estimate how much time and money you could save with AI-powered staff scheduling.",
      );
  }
  if (file.startsWith("app/webinars/")) {
    generated = generated.replaceAll("10th December 2025", "December 10, 2025");
  }
  if (file === "app/webinars/page.tsx") {
    generated = generated.replaceAll(
      "Join our expert-led webinars on AI-powered healthcare workforce management. Learn best practices, discover new features, and connect with industry leaders.",
      "Watch on-demand conversations about healthcare staff scheduling. Explore practical experiences with AI-powered scheduling and workforce management.",
    );
  }
  if (
    file ===
    "app/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare/page.tsx"
  ) {
    generated = generated
      .replace("Full Transcript", "Webinar Summary")
      .replace(
        "<Accordion items={transcriptSections} />",
        '<p className="text-neutral-600 mb-6">Recorded December 10, 2025. This summary and the Q&amp;A below reflect the product capabilities discussed at the time of recording.</p>\n              <Accordion items={transcriptSections} />',
      );
  }
  generated =
    `// Generated from ${file}. Run npm run localize:resources; do not edit directly.\n` +
    generated;
  const target = destination(file);
  if (check) {
    if (
      !fs.existsSync(target) ||
      fs.readFileSync(target, "utf8") !== generated
    ) {
      console.error(`Stale: ${target}`);
      stale++;
    }
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, generated);
  }
}
if (stale) process.exitCode = 1;
else
  console.log(
    `${check ? "Checked" : "Generated"} ${sources.length} US resource files.`,
  );
