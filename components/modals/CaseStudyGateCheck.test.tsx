/** @jest-environment node */

import React from "react";
import { renderToString } from "react-dom/server";
import CaseStudyGateCheck from "./CaseStudyGateCheck";

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
  "renders the full case study before hydration ($slug, US=$isUS)",
  ({ slug, isUS }) => {
    const html = renderToString(
      <CaseStudyGateCheck slug={slug} isUS={isUS}>
        <article>Full case study content</article>
      </CaseStudyGateCheck>,
    );
    expect(html).toBe("<article>Full case study content</article>");
  },
);
