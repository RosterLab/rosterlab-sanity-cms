/** @jest-environment node */
import { renderToString } from "react-dom/server";
import CaseStudyGateCheck from "./CaseStudyGateCheck";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
jest.mock("next/dynamic", () => () => () => null);

test.each([
  { slug: "whanganui-radiography", isUS: false },
  { slug: "whanganui-radiography", isUS: true },
  {
    slug: "how-plastics-department-used-roster-simulation-to-cut-in-costs",
    isUS: false,
  },
  {
    slug: "how-plastics-department-used-schedule-simulation-to-cut-in-costs",
    isUS: true,
  },
])(
  "public case studies render article HTML before hydration ($slug, US=$isUS)",
  ({ slug, isUS }) => {
    const html = renderToString(
      <CaseStudyGateCheck slug={slug} isUS={isUS}>
        <article>
          <h1>Public case study</h1>
          <p>Article content</p>
        </article>
      </CaseStudyGateCheck>,
    );
    expect(html).toContain("<h1>Public case study</h1>");
    expect(html).toContain("Article content");
    expect(html).not.toContain("Loading...");
  },
);

test("gated articles remain hidden in server HTML until access is checked", () => {
  const html = renderToString(
    <CaseStudyGateCheck
      slug="private-case-study"
      lockedSlugs={["private-case-study"]}
    >
      <article>
        <h1>Gated case study</h1>
        <p>Protected content</p>
      </article>
    </CaseStudyGateCheck>,
  );
  expect(html).toContain("Loading...");
  expect(html).not.toContain("Gated case study");
  expect(html).not.toContain("Protected content");
});
