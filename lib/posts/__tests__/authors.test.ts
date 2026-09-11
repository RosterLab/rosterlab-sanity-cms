import { postAuthors, authorByline, FALLBACK_AUTHOR } from "../authors";

const person = (name: string, slug?: string) => ({
  name,
  slug: slug ? { current: slug } : null,
});

describe("postAuthors", () => {
  it("reads the authors array", () => {
    expect(
      postAuthors({ authors: [person("Ana Silva"), person("Bo Chen")] }).map(
        (a) => a.name,
      ),
    ).toEqual(["Ana Silva", "Bo Chen"]);
  });

  // Every post predating the array still carries the single field.
  it("falls back to the legacy single author", () => {
    expect(
      postAuthors({ author: person("Ana Silva") }).map((a) => a.name),
    ).toEqual(["Ana Silva"]);
  });

  it("prefers the array when both are set", () => {
    expect(
      postAuthors({
        authors: [person("Bo Chen")],
        author: person("Ana Silva"),
      }).map((a) => a.name),
    ).toEqual(["Bo Chen"]);
  });

  it("ignores unresolved references and empty arrays", () => {
    expect(
      postAuthors({ authors: [], author: person("Ana Silva") }),
    ).toHaveLength(1);
    expect(
      postAuthors({ authors: [null as any, { name: undefined }] }),
    ).toEqual([]);
    expect(postAuthors(null)).toEqual([]);
    expect(postAuthors({})).toEqual([]);
  });
});

describe("authorByline", () => {
  it.each([
    [["Ana Silva"], "Ana Silva"],
    [["Ana Silva", "Bo Chen"], "Ana Silva and Bo Chen"],
    [["Ana Silva", "Bo Chen", "Dev Patel"], "Ana Silva, Bo Chen and Dev Patel"],
    [[], ""],
  ])("renders %j as %s", (names, expected) => {
    expect(authorByline((names as string[]).map((n) => person(n)))).toBe(
      expected,
    );
  });
});

it("exposes a fallback for posts with no author", () => {
  expect(FALLBACK_AUTHOR).toBe("RosterLab");
});
