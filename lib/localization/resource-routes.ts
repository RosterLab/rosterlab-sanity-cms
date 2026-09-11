import { localizeUSPathname } from "./us-slug";
// Resource route pairs, including non-indexed quiz results used for navigation.
// Sitemap and metadata indexing policy is evaluated separately.
export const RESOURCE_PATHS = [
  "/case-studies",
  "/newsroom",
  "/webinars",
  "/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare",
  "/whitepapers/rostering-as-a-strategic-workforce-lever",
  "/templates",
  "/templates/free-staff-roster-template-excel",
  "/templates/free-staff-timesheet-template",
  "/templates/free-shift-swap-template",
  "/templates/free-employee-of-the-month-certificate",
  "/tools",
  "/tools/fte-calculator",
  "/tools/survey-preferences",
  "/schedge",
  "/tools/staff-scheduling-personality-quiz",
  ...[
    "chaos-carla",
    "peacekeeper-panda",
    "rules-robot",
    "spreadsheet-sorcerer",
    "last-minute-magician",
    "social-butterfly",
  ].map((slug) => `/tools/staff-scheduling-personality-quiz/${slug}`),
];

// US resource URLs use American terminology, so the path is localized as well
// as the copy: /whitepapers/rostering-... becomes /us/whitepapers/scheduling-...
export const RESOURCE_US_MAPPINGS = Object.fromEntries(
  RESOURCE_PATHS.map((path) => [path, `/us${localizeUSPathname(path)}`]),
);
