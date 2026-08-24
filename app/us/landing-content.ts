/**
 * US copy for the refreshed landing page.
 *
 * The US page renders the same section components as the AU one; only the
 * copy and link targets differ, so they live here rather than in forked
 * components. Terminology follows the house rules: roster -> schedule,
 * rostering -> scheduling, and en-GB -> en-US spelling (optimise -> optimize,
 * favouritism -> favoritism). Link targets use the /us/ equivalents from
 * `US_URL_MAPPINGS` in components/seo/HreflangTags.tsx — keep them in sync.
 */

import type { HeroNewContent } from "@/components/sections/HeroNew";
import type { FeatureTestimonialContent } from "@/components/sections/FeatureTestimonial";
import type { BenefitTab } from "@/components/sections/BenefitsNew";
import type { Industry } from "@/components/sections/IndustrySolutionsNew";
import type { Testimonial } from "@/components/sections/TestimonialsNew";
import type { Feature } from "@/components/sections/FeaturesGrid";

export const HERO_CONTENT_US: HeroNewContent = {
  headline: "AI scheduling software built for complex teams.",
  description:
    "Generate and optimize staff schedules in minutes, not days. Built for healthcare, 24/7 operations, and teams with rules too complex for spreadsheets.",
  primaryCta: { label: "Book a demo", href: "/us/book-a-demo" },
  secondaryCta: { label: "See an example", href: "/us/product-tour" },
  locale: "us",
};

export const TRUSTED_BY_HEADING_US =
  "Join over 150+ teams already optimizing their schedules";

export const FEATURE_TESTIMONIAL_US: FeatureTestimonialContent = {
  lead: "Scheduling would take ",
  before: "7-8 days",
  after: "2-3 hours",
  tail: ", allowing me to focus more on patient care.",
  author: "Mike",
  role: "Associate Clinical Manager Radiology",
  // No US variant of this webinar exists, so it points at the shared page.
  link: {
    href: "/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare",
    label: "Watch the webinar",
  },
};

export const BENEFIT_TABS_US: BenefitTab[] = [
  {
    id: "time",
    label: "Save Time",
    title: "Generate schedules in minutes",
    description:
      "Let the AI handle complex contractual and operational constraints while you focus on what matters most. Manage last-minute changes with rescheduling, open shifts, and automatic shift swaps based on predefined rules.",
    cta: {
      label: "Explore AI generation",
      href: "/us/feature/ai-staff-scheduling-assistant",
    },
    highlights: [
      "Generate Schedules Automatically",
      "Handle Complex Rules and Staffing Requirements",
      "Reduce Admin for Last-minute Changes",
      "Dynamically reschedule staff",
    ],
  },
  {
    id: "optimisation",
    label: "Optimize Workforce",
    title: "Optimize your workforce with AI",
    description:
      "Harness our advanced mathematical optimization engine to allocate staff efficiently. Reduce penalty costs, improve coverage, and plan ahead with confidence.",
    cta: {
      label: "Explore optimization",
      href: "/us/solutions/ai-staff-schedule-maker",
    },
    highlights: [
      "Optimize Skill Mix",
      "Allocate Staff Efficiently",
      "Minimize Costs",
      "Dynamic Scenario Planning",
    ],
    image: "/images/illustration/optimise_workforce.svg",
  },
  {
    id: "turnover",
    label: "Reduce Turnover",
    title: "Improve staff retention",
    description:
      "Empower your team to plan ahead and manage their schedules with confidence, while staying aligned with business needs. Fewer shift swaps, reduced absenteeism, and better-matched preferences drive engagement.",
    cta: {
      label: "Explore retention",
      href: "/us/feature/self-scheduling",
    },
    highlights: [
      "Improve Work-Life Balance and Staff Satisfaction",
      "Meet a High Percentage of Preferences",
      "Reduce Unnecessary Sick Leave",
      "Reduce Staff Turnover",
    ],
  },
  {
    id: "safety",
    label: "Safety & Fairness",
    title: "Ensure compliance and equity",
    description:
      "Ensure clinical safety and fairness with every schedule. By embedding equity and fatigue-management rules into our AI, you eliminate favoritism, reduce staff fatigue, and create safer, more inclusive schedules.",
    cta: { label: "Explore safety", href: "/us/feature/rules-engine" },
    highlights: [
      "Eliminate Favoritism",
      "Distribute Shifts Fairly",
      "Reduce Clinical Risks",
      "Reduce Fatigue",
    ],
  },
];

export const INDUSTRIES_US: Industry[] = [
  {
    name: "ICU/ED",
    category: "Healthcare",
    description: "Critical care scheduling with complex skill-mix.",
    href: "/us/industries/healthcare/ed-icu-scheduling",
    image: "/landing/industries/icu.webp",
  },
  {
    name: "Radiology",
    category: "Healthcare",
    description: "Plan your schedules by sessions.",
    href: "/us/industries/healthcare/radiology-scheduling",
    image: "/landing/industries/radi.webp",
  },
  {
    name: "Senior Care",
    category: "Healthcare",
    description: "Allocate your staff more effectively for continuity of care.",
    href: "/us/industries/healthcare/senior-care-scheduling",
    image: "/landing/industries/aged.webp",
  },
  {
    name: "Vets",
    category: "Healthcare",
    description: "Scheduling for veterinary clinics with mixed skill mixes.",
    href: "/us/industries/healthcare/veterinary-scheduling",
    image: "/landing/industries/vet.webp",
  },
  {
    name: "Hospitality",
    category: "Other Industries",
    description: "Restaurant and hotel staff scheduling.",
    href: "/us/industries/hospitality-scheduling",
    image: "/landing/industries/service.webp",
  },
  {
    name: "24/7 Support Teams",
    category: "Other Industries",
    description: "Round-the-clock customer service scheduling.",
    href: "/us/industries/call-center-scheduling",
    image: "/landing/industries/247.webp",
  },
  {
    name: "Manufacturing",
    category: "Other Industries",
    description: "Shift work optimization for production lines.",
    href: "/us/industries/manufacturing-scheduling",
    image: "/landing/industries/manu.webp",
  },
];

export const INDUSTRIES_HEADING_US = {
  title: "Workforce management built around how your industry works.",
  subtitle:
    "Designed for the real operational demands of each industry, from shift-heavy healthcare and hospitality to 24/7 operations and highly regulated public services. Explore how we tailor scheduling, forecasting, and compliance to your team.",
};

// Mike is deliberately absent — he is the featured quote higher up the page.
export const TESTIMONIALS_US: Testimonial[] = [
  {
    quote: [
      "RosterLab has ",
      { highlight: "saved me countless hours" },
      ". I have recommended this service to ",
      { highlight: "everyone I know" },
      " who writes medical schedules.",
    ],
    author: "Peter",
    role: "Senior Registrar ICU, Western Australia",
    caseStudyLink: "/case-studies/icu-unit-western-australia",
  },
  {
    quote: [
      "If RosterLab can help with our ",
      { highlight: "complicated scheduling needs" },
      ", we're confident it will work for anyone.",
    ],
    author: "Judy Harris",
    role: "Practice Manager, Dargaville Hospital",
    caseStudyLink: "/case-studies/dargaville-medical-centre-new-zealand",
  },
  {
    quote: [
      "We wanted more ",
      { highlight: "continuity of care" },
      " built into the schedules, and RosterLab was easily able to incorporate that into every schedule they generated for us.",
    ],
    author: "Rebecca",
    role: "Staff Specialist Neonatologist, RPA Newborn Care",
  },
  {
    quote: [
      "Since using RosterLab, I've felt the schedules are ",
      { highlight: "better for my circadian rhythm" },
      ", with less up-and-down cycling.",
    ],
    author: "Anthea",
    role: "MIT, Hawke's Bay Hospital",
  },
  {
    quote: [
      "RosterLab has been a ",
      { highlight: "game-changer" },
      " for our radiology department. It has allowed us to ",
      { highlight: "maximize vacation provisions" },
      " while maintaining a safer schedule.",
    ],
    author: "Dr. Fernando",
    role: "Junior Consultant, Auckland Tertiary Hospital",
    caseStudyLink:
      "/case-studies/auckland-tertiary-hospital-improves-fairness-for-on-call-roster",
  },
];

export const FEATURES_US: Feature[] = [
  {
    title: "Auto Scheduling",
    description:
      "Generate optimal, safe, fair, and flexible complex schedules at the click of a button.",
    href: "/us/feature/auto-scheduling",
    image: "01-automated-rostering.svg",
  },
  {
    title: "AI Scheduling Assistant",
    description:
      "Ask AI to build or update schedules, investigate issues, and run the reports you need.",
    href: "/us/feature/ai-staff-scheduling-assistant",
    image: "02-ai-rostering-assistant.svg",
  },
  {
    title: "Open Shifts",
    description:
      "Fill unfulfilled shifts instantly with the right people and the right skills.",
    href: "/us/feature/open-shifts",
    image: "03-open-shifts.svg",
  },
  {
    title: "Shift Swaps",
    description:
      "Automatically approve routine trades while flagging critical changes.",
    href: "/us/feature/shift-swaps-and-trades",
    image: "04-shift-swaps.svg",
  },
  {
    title: "Time-Off Requests",
    description:
      "Approve time off with confidence by seeing how every request affects shift coverage.",
    href: "/us/feature/time-off-requests",
    image: "05-leave-requests.svg",
  },
  {
    title: "Staff Preferences",
    description:
      "AI self-scheduling for better work-life balance, without compromising coverage or rules.",
    href: "/us/feature/self-scheduling",
    image: "06-staff-preferences.svg",
  },
  {
    title: "Rescheduling",
    description:
      "Handle last-minute changes without rebuilding the schedule from scratch.",
    href: "/us/feature/staff-rescheduling",
    image: "07-re-rostering.svg",
  },
  {
    title: "Rules Engine",
    description:
      "Labor laws, clinical safety, fatigue rules, skill mix. Configured once, enforced always.",
    href: "/us/feature/rules-engine",
    image: "08-rules-engine.svg",
  },
];

export const FEATURES_HEADING_US = {
  title: "Everything you need to run a perfect schedule.",
  subtitle:
    "A connected toolkit for planning, publishing, and adjusting your schedules.",
};

export const FINAL_CTA_HEADING_US =
  "Having a headache making schedules for shift workers?";
