import type { CaseStudy } from "./EnterpriseCaseStudies";

export const enterpriseStories: CaseStudy[] = [
  {
    kind: "Case study",
    title: "Radiology Boosts Staff Retention",
    href: "/case-studies/radiology-department-auckland",
    image: "/images/enterprise/case-study-radiology-photo.webp",
    label: { text: "Radiology", color: "#FFD08A" },
    quote:
      "We are now fully staffed... I've been here for 28 years, and we've never managed to achieve this level of staffing consistently for more than 2 months until RosterLab",
    attribution: "Alison, MRT team leader",
    stats: [
      { value: "$80,000+", label: "per year in savings" },
      // Rounded from the reduction in monthly rostering time: 120 hours to 8.
      { value: "~93%", label: "less time spent rostering" },
    ],
  },
  {
    kind: "Case study",
    title: "Sydney Hospital Saves 300+ Hours With AI",
    href: "/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering",
    image: "/images/enterprise/case-study-er-photo.webp",
    label: { text: "ER", color: "#03F9BE" },
    quote:
      "It’s not just about saving hours. It's about confidence in the roster, about fairness, and about giving senior clinicians time back for patient care - not spreadsheets.",
    attribution: "Emergency Physician",
    stats: [
      { value: "70%", label: "time saved from the first roster" },
      { value: "$40,000", label: "saved annually" },
    ],
  },
  {
    kind: "Case study",
    title: "Plastics Unit in Western Australia Saves on Overtime Costs",
    href: "/case-studies/how-plastics-department-used-roster-simulation-to-cut-in-costs",
    image: "/images/enterprise/case-study-plastics-photo.webp",
    label: { text: "Plastics", color: "#C7D2FF" },
    // The story has no customer quote (its only quote is RosterLab's own),
    // so this is a line from the story itself, credited as such.
    quote:
      "The simulation gave leadership something they hadn't had before: evidence.",
    attribution: "From the case study",
    stats: [
      {
        value: "~15%",
        label: "projected cost savings from roster simulation",
      },
    ],
  },
];
