/** @jest-environment node */
import { renderToString } from "react-dom/server";
import CaseStudyGateCheck from "./CaseStudyGateCheck";

test.each([
  [false, "how-plastics-department-used-roster-simulation-to-cut-in-costs"],
  [true, "how-plastics-department-used-schedule-simulation-to-cut-in-costs"],
])("renders the full case study before hydration (US=%s)", (isUS, slug) => {
  const html = renderToString(
    <CaseStudyGateCheck isUS={isUS as boolean} slug={slug as string}>
      <article>Full case study content</article>
    </CaseStudyGateCheck>,
  );
  expect(html).toBe("<article>Full case study content</article>");
});
