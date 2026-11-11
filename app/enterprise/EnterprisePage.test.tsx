/** @jest-environment node */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import EnterprisePage from "./EnterprisePage";
import { enterpriseMetadata } from "./enterprise-metadata";
import { enterpriseText, US_ENTERPRISE_TEAMS } from "./enterprise-copy";
import { getGlobalPath, getUSPath } from "@/components/seo/HreflangTags";

const visibleCopy = (html: string) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ");

test("US enterprise copy uses scheduling and American spelling throughout", () => {
  const html = renderToStaticMarkup(<EnterprisePage isUS />);
  const copy = visibleCopy(html);
  expect(copy).toContain(
    "Enterprise healthcare scheduling software powered by AI",
  );
  expect(copy).toContain("physicians in training");
  expect(copy).toContain("Reduce labor and administration costs");
  expect(copy).toContain("Organization-wide oversight");
  expect(copy).toContain("Alison, Radiologic Technologist Team Leader");
  expect(copy).not.toMatch(
    /\b(?:roster|rosters|rostering|doctors|labour|organisations?|organisational|optimisation|utilisation|authorised|undefined)\b/i,
  );
  expect(html).toContain('href="/us/case-studies"');
  expect(html).toContain('href="/us/tools/savings-calculator"');
  expect(html).toContain(
    'href="/us/case-studies/how-plastics-department-used-schedule-simulation-to-cut-in-costs"',
  );
  expect(html).toContain('alt="RosterLab generating schedules on a laptop"');
});

test("the global enterprise page retains its original regional wording", () => {
  const html = renderToStaticMarkup(<EnterprisePage />);
  const copy = visibleCopy(html);
  expect(copy).toContain(
    "Enterprise healthcare rostering software powered by AI",
  );
  expect(copy).toContain("Reduce labour and administration costs");
  expect(copy).toContain("junior doctors");
  expect(copy).toContain("Alison, MRT team leader");
  expect(html).toContain('href="/tools/roi-calculator"');
  expect(html).toContain('href="/case-studies"');
});

test.each([false, true])(
  "plastics card keeps its new title and has no quote (US: %s)",
  (isUS) => {
    const html = renderToStaticMarkup(<EnterprisePage isUS={isUS} />);
    const cards = html.match(/<article\b[\s\S]*?<\/article>/g)!;
    const plastics = cards.find((card) =>
      card.includes("Plastics Unit in Western Australia"),
    )!;
    expect(plastics).toContain(
      "Plastics Unit in Western Australia Saves on Overtime Costs",
    );
    expect(plastics).toContain("~15%");
    expect(plastics).toContain("projected cost savings");
    expect(plastics).not.toContain("<blockquote");
  },
);

test("US terminology keeps brand names and possessive grammar intact", () => {
  expect(enterpriseText("RosterLab generates rosters for doctors.", true)).toBe(
    "RosterLab generates schedules for physicians.",
  );
  expect(
    enterpriseText(
      "supporting both junior doctors' wellbeing and training",
      true,
    ),
  ).toBe(
    "supporting both the well-being of physicians in training and training",
  );
  expect(US_ENTERPRISE_TEAMS.Physiotherapy).toBe("Physical therapy");
  expect(US_ENTERPRISE_TEAMS["Senior medical"]).toBe("Physicians");
});

test("enterprise URLs have reciprocal regional metadata", () => {
  expect(getUSPath("/enterprise")).toBe("/us/enterprise");
  expect(getGlobalPath("/us/enterprise")).toBe("/enterprise");
  const global = enterpriseMetadata();
  const us = enterpriseMetadata(true);
  expect(global.alternates?.canonical).toBe("https://rosterlab.com/enterprise");
  expect(us.alternates?.canonical).toBe("https://rosterlab.com/us/enterprise");
  expect(us.title).toBe("Enterprise Healthcare Scheduling Software");
  expect(us.alternates?.languages).toEqual(global.alternates?.languages);
  expect(us.alternates?.languages?.["en-US"]).toBe(
    "https://rosterlab.com/us/enterprise",
  );
});
