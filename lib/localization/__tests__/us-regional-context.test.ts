import { localizeUSPost } from "../us-blog";
import { explainUSRegionalTerms } from "../us-regional-context";

test("regional research and screenshot abbreviations are explained without changing references", () => {
  expect(
    localizeUSPost({
      title: "A UK study by CIPD (2023)",
      slug: "how-to-reduce-absenteeism-for-shift-workers",
    }).title,
  ).toBe(
    "A UK study by the Chartered Institute of Personnel and Development (CIPD, 2023)",
  );
  expect(
    localizeUSPost({ title: "Some leave (AL)", slug: "excel-series" }).title,
  ).toBe("Some vacation (shown as AL, for annual leave, in the example)");
});

const block = (key: string, parts: string[], extra = {}) => ({
  _type: "block",
  _key: key,
  style: "normal",
  markDefs: [],
  ...extra,
  children: parts.map((text, index) => ({
    _type: "span",
    _key: `${key}-${index}`,
    text,
    marks: index ? ["strong"] : [],
  })),
});
const text = (body: any[]) =>
  body.map((b) => b.children?.map((c: any) => c.text).join("")).join("\n");

test("explains regional terms beside split-span quotes without editing attributed text", () => {
  const quote = block("quote", ["Our ME", "CA protects nurses."], {
    style: "blockquote",
  });
  const body = [
    block("intro", ["A New Zealand hospital."]),
    quote,
    block("later", ["MECA rules"]),
  ];
  const original = JSON.stringify(body);
  const result = explainUSRegionalTerms(body, "radiology-department-auckland")!;
  expect(result[1]._key).toBe("us-context-meca");
  expect(result[2]).toBe(quote);
  expect(text(result)).toContain("multi-employer collective agreement");
  expect(result.filter((b) => b._key.startsWith("us-context-"))).toHaveLength(
    1,
  );
  expect(JSON.stringify(body)).toBe(original);
});

test("combined explanations stay outside continuous numbered lists and are idempotent", () => {
  const body = [
    block("first", ["Staffing"], { listItem: "number", level: 1 }),
    block("second", ["NZNO MECA"], { listItem: "number", level: 1 }),
  ];
  const source = {
    title: "Night shifts",
    slug: "manage-night-shift-planning-wellbeing-effectively",
    body,
  };
  const once = localizeUSPost(source);
  expect(once.body!.map((b) => b._key)).toEqual([
    "us-context-meca-nzno",
    "first",
    "second",
  ]);
  expect(text(once.body!)).toContain("New Zealand Nurses Organisation");
  expect(localizeUSPost(once).body).toEqual(once.body);
});

test("AMA explanation is scoped to Australian agreements, not unrelated US content", () => {
  const body = [block("agreement", ["WA Health System AMA Agreement"])];
  expect(
    text(
      explainUSRegionalTerms(
        body,
        "hospital-in-perth-partners-with-rosterlab-for-smarter-rosters",
      )!,
    ),
  ).toContain("Australian Medical Association");
  expect(explainUSRegionalTerms(body, "us-medical-association-news")).toBe(
    body,
  );
  expect(
    explainUSRegionalTerms(undefined, "radiology-department-auckland"),
  ).toBeUndefined();
});

test("editorial body overrides remain authoritative and unrelated articles get no notes", () => {
  const body = [block("body", ["MECA"])];
  const post = localizeUSPost({
    title: "Case study",
    slug: "radiology-department-auckland",
    body,
    usLocalization: { body },
  });
  expect(post.body).toEqual(body);
  expect(explainUSRegionalTerms(body, "unknown")).toBe(body);
});

test("general US employment guidance uses contract wording instead of foreign legal acronyms", () => {
  const result = localizeUSPost({
    title: "Rules",
    slug: "ukg-healthcare-rostering-software",
    body: [
      block("rules", [
        "Enterprise Bargaining Agreement rules (EBA or MECA or any form of union rules)",
      ]),
    ],
  });
  expect(text(result.body!)).toBe(
    "Collective bargaining agreement or union contract requirements",
  );
});
