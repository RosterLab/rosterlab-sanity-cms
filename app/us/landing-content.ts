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
import type { Capability } from "@/components/sections/CapabilitiesSection";
import type { OttoCopy } from "@/components/sections/OttoSection";
import type {
  OtherIndustriesContent,
  WorkforceContent,
} from "@/components/sections/IndustriesSection";
import type {
  FeaturedCaseStudy,
  Testimonial,
} from "@/components/sections/TestimonialsNew";

/*
  Each block mirrors the AU section of the same name (the component's `_AU`
  default). When the AU copy changes, change it here too, converted.

  The blocks are written out in full, images included, rather than derived
  from the AU constants: those live in "use client" modules, and a server
  page importing them gets an opaque client reference, not the data.
*/

export const HERO_CONTENT_US: HeroNewContent = {
  headline: "AI scheduling software built for healthcare.",
  description:
    "Generate fair, compliant staff schedules in minutes with AI that balances your rules, skills, and preferences at once.",
  primaryCta: { label: "Book a demo", href: "/us/book-a-demo" },
  secondaryCta: { label: "Take a tour", href: "/us/product-tour" },
  locale: "us",
};

export const TRUSTED_BY_HEADING_US =
  "Join hundreds of healthcare teams already optimizing their schedules";

export const FEATURE_TESTIMONIAL_US: FeatureTestimonialContent = {
  lead: "Scheduling would take ",
  before: "7-8 days",
  after: "2-3 hours",
  tail: ", allowing me to focus more on patient care.",
  author: "Mike",
  role: "Associate Clinical Manager, Radiology",
  // Use the US-localized webinar page.
  link: {
    href: "/us/webinars/building-a-resilient-workforce-with-ai-scheduling-in-healthcare",
    label: "Watch the webinar",
  },
};

export const BENEFIT_TABS_US: BenefitTab[] = [
  {
    id: "time",
    label: "Save Time",
    title: "Schedule your entire clinical team in minutes",
    description:
      "Take the manual work out of complex scheduling. Spend less time planning and reworking schedules, and give clinical teams more time back for patient care.",
    cta: {
      label: "Explore AI scheduling",
      href: "/us/solutions/ai-staff-schedule-maker",
    },
    highlights: [
      "Up to 90% less scheduling admin",
      "More headspace for patient care",
      "Less time spent juggling schedule changes",
    ],
  },
  {
    id: "turnover",
    label: "Retain Staff",
    title: "Retain the physicians your service depends on",
    description:
      "Give staff fairer schedules that protect their personal time. Promote a healthier work-life balance to help reduce burnout, absenteeism, and turnover.",
    cta: {
      label: "Explore fair scheduling",
      href: "/us/feature/self-scheduling",
    },
    highlights: [
      "Fairer workloads",
      "Greater staff input and engagement",
      "Fewer avoidable last-minute absences",
    ],
  },
  {
    id: "safety",
    label: "Stay Compliant",
    title: "Ensure clinical safety and compliance",
    description:
      "Assign the best-fit people to each shift based on skills, qualifications, and demand. Keep coverage, fatigue limits and compliance requirements accounted for throughout the schedule.",
    cta: {
      label: "Explore smarter coverage",
      href: "/us/feature/rules-engine",
    },
    highlights: [
      "Safer staffing",
      "Reliable clinical coverage by skills",
      "Confidence in schedule compliance",
    ],
  },
  {
    id: "optimisation",
    label: "Optimize Workforce",
    title: "Unlock hidden capacity in your workforce",
    description:
      "Allocate staff more effectively to make better use of available capacity, reducing costly overtime and reliance on locum tenens and agency staff.",
    cta: {
      label: "Explore workforce optimization",
      href: "/us/solutions/ai-staff-schedule-maker",
    },
    highlights: [
      "Minimized overtime and premium-pay costs",
      "Less reliance on agency staff",
      "More provider capacity",
    ],
    image: "/images/illustration/optimise_workforce.svg",
  },
];

export const CAPABILITIES_HEADING_US =
  "Keep schedules running smoothly with RosterLab";

// Images and colours match CAPABILITIES_AU; only the words and links change.
export const CAPABILITIES_US: Capability[] = [
  {
    tag: "Build",
    title: "Build the schedules spreadsheets can't",
    description:
      "RosterLab generates fully optimized schedules using an automated rules-based engine to balance staffing demand, skill mix, fatigue limits, labor laws, and other constraints.",
    cta: {
      label: "Explore auto-scheduling",
      href: "/us/feature/auto-scheduling",
    },
    image: {
      src: "/landing/capabilities/build-rules.webp",
      wide: "/landing/capabilities/build-rules-wide.webp",
      alt: "The RosterLab Rule Builder listing hours, night-shift and days-off rules, in front of a schedule being generated from them",
    },
    color: "#3779DE",
  },
  {
    tag: "Adapt",
    title: "Adapt the schedule as plans change",
    description:
      "Handle absences and last-minute changes without rebuilding the schedule from scratch. Automate shift swaps and fill gaps instantly while keeping coverage and compliance intact.",
    cta: {
      label: "Explore rescheduling",
      href: "/us/feature/staff-rescheduling",
    },
    image: {
      src: "/landing/capabilities/adapt-open-shifts.webp",
      wide: "/landing/capabilities/adapt-open-shifts-wide.webp",
      alt: "An open night shift on the schedule, with a staff member accepting it from the RosterLab app",
    },
    color: "#66E3B9",
  },
  {
    tag: "Engage",
    title: "Let staff shape their schedules",
    description:
      "Give staff greater flexibility around when they work with self-service tools to submit preferences, request time off, and see their latest shifts in one app.",
    cta: {
      label: "Explore self-scheduling",
      href: "/us/feature/self-scheduling",
    },
    image: {
      src: "/landing/capabilities/engage-preferences.webp",
      wide: "/landing/capabilities/engage-preferences-wide.webp",
      alt: "A staff member picks a Short Day preference in the RosterLab app and it appears on the manager's Preferences view",
    },
    color: "#61C8C7",
  },
];

export const OTTO_COPY_US: OttoCopy = {
  heading:
    "Make smarter scheduling decisions with Otto, your AI scheduling assistant",
  description:
    "Otto understands your schedule and the context behind it. Get answers, test changes, and build reports in seconds, all through conversation.",
  cta: {
    label: "See Otto in Action",
    href: "/us/feature/ai-staff-scheduling-assistant",
  },
  features: [
    {
      title: "Answer schedule questions instantly",
      description:
        "Check staffing coverage, skill mix, time off, fairness and more. Otto searches your live schedule and audit trail to give you contextual answers, including who worked when and what's changed.",
    },
    {
      title: "Get recommendations for better scheduling decisions",
      description:
        "Filling a gap, assessing a swap or reworking a schedule? Otto weighs availability, skills, workload, rest requirements and scheduling rules to recommend the best way forward.",
    },
    {
      title: "Analyze your schedule from every angle",
      description:
        "Turn your schedule data into insights you can act on. Otto breaks down any part of your schedule to create charts, summaries and reports that back confident workforce decisions.",
    },
  ],
};

// Illustrations and the mockup match WORKFORCE_CONTENT_AU; groups, words
// and links are US.
export const WORKFORCE_CONTENT_US: WorkforceContent = {
  heading: "Scheduling tailored to every healthcare workforce group",
  description:
    "RosterLab adapts to the rules, working patterns, and staffing requirements unique to each workforce group.",
  groups: [
    {
      name: "Nursing",
      illustration: "/landing/workforce/illustrations/nursing.webp",
      href: "/us/industries/healthcare/nurse-scheduling",
      linkLabel: "Explore nurse scheduling",
      description:
        "Balance skill mix, ratios and a fair spread of nights and weekends across every unit, while honoring labor rules and staff preferences.",
      features: [
        {
          title: "Shift preferences, straight from staff",
          description:
            "Nurses send shift preferences and special requests from the app, and they land on the manager's schedule the moment they are sent. The AI then fits as many as it can while keeping the unit covered.",
          image: {
            src: "/landing/workforce/nursing-preferences.webp",
            alt: "A nurse picks a Short Day preference in the RosterLab app and it appears on the manager's Preferences view for the schedule period",
          },
        },
        {
          title: "Fair nights & weekends",
          description:
            "Nights, weekends and holidays are shared out evenly over the schedule period, with the count visible to the whole team.",
        },
      ],
    },
    {
      illustration: "/landing/workforce/illustrations/junior-doctors.webp",
      name: "Residents",
      href: "/us/industries/healthcare/physician-scheduling",
      linkLabel: "Explore resident scheduling",
      description:
        "Cover every shift with compliant schedules that respect duty-hour limits, protect training time and share nights and weekends fairly.",
      features: [
        {
          title: "Fatigue & duty-hour checks",
          description:
            "Maximum hours, minimum time off and limits on consecutive nights are built into the schedule, so duty-hour violations are caught before they are scheduled.",
        },
        {
          title: "Protected training time",
          description:
            "Didactics, clinics and exam leave are blocked out first, and the schedule is built around them rather than over them.",
        },
      ],
    },
    {
      illustration: "/landing/workforce/illustrations/senior-doctors.webp",
      name: "Attending physicians",
      href: "/us/industries/healthcare/attending-physician-scheduling",
      linkLabel: "Explore attending physician scheduling",
      description:
        "Plan clinics, call and time off across every service, with a fair share of after-hours work and clear visibility for the whole team.",
      features: [
        {
          title: "Call & clinic planning",
          description:
            "Plan clinics, call and after-hours coverage together, with a fair share of unsociable work across every attending in the service.",
        },
        {
          title: "Time off across the service",
          description:
            "See every time-off request against the service's coverage in one place, and approve with confidence that clinics and lists stay staffed.",
        },
      ],
    },
    {
      name: "Allied health",
      illustration: "/landing/workforce/illustrations/allied-health.webp",
      href: "/us/industries/healthcare/radiography-scheduling",
      linkLabel: "Explore allied health scheduling",
      description:
        "Schedule allied health teams across clinics, units and sites by skill and availability, so every service has the right people on hand.",
      features: [
        {
          title: "Skill-based allocation across sites",
          description:
            "Match each clinician's skills and credentials to the clinics, units and sites that need them, and keep travel between sites to a minimum.",
        },
      ],
    },
  ],
  enterprise: {
    lead: "Scale scheduling across departments and workforce groups.",
    label: "Explore enterprise scheduling",
    href: "/us/pricing",
  },
  specialties: {
    lead: "Looking for your specialty?",
    body: "Explore scheduling for Emergency & Critical Care, Radiology, Surgery & Perioperative, and more.",
    label: "View all healthcare specialties",
    href: "/us/industries/healthcare-scheduling",
  },
};

export const FEATURED_CASE_STUDY_US: FeaturedCaseStudy = {
  stat: "179+",
  statUnit: "hours",
  statLabel: "back for clinical work",
  title: "179 hours back for clinical work",
  summary:
    "Whanganui Radiography saved more than 179 hours a year with RosterLab, returning physician time to clinical work.",
  // The slug has no roster terms, so the US path is the global one under /us.
  href: "/us/case-studies/whanganui-radiography-redirects-179-hours-of-admin-back-to-clinical-work-through-rosterlab",
  image: {
    src: "/landing/case-studies/whanganui-radiography-mri.webp",
    alt: "An MRI scanner in a hospital imaging room",
  },
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
    role: "ICU Physician, Western Australia",
    caseStudyLink: "/us/case-studies/icu-unit-western-australia",
  },
  {
    quote: [
      "If RosterLab can help with our ",
      { highlight: "complicated scheduling needs" },
      ", we're confident it will work for anyone.",
    ],
    author: "Judy Harris",
    role: "Practice Manager, Dargaville Hospital",
    caseStudyLink: "/us/case-studies/dargaville-medical-centre-new-zealand",
  },
  {
    quote: [
      "We wanted more ",
      { highlight: "continuity of care" },
      " built into the schedules, and RosterLab was easily able to incorporate that into every schedule they generated for us.",
    ],
    author: "Rebecca",
    role: "Attending Neonatologist, RPA Newborn Care",
  },
  {
    quote: [
      "Since using RosterLab, I've felt the schedules are ",
      { highlight: "better for my circadian rhythm" },
      ", with less up-and-down cycling.",
    ],
    author: "Anthea",
    role: "Radiologic Technologist, Hawke's Bay Hospital",
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
    role: "Attending Physician, Auckland Tertiary Hospital",
    caseStudyLink:
      "/us/case-studies/auckland-tertiary-hospital-improves-fairness-for-on-call-schedule",
  },
];

export const OTHER_INDUSTRIES_CONTENT_US: OtherIndustriesContent = {
  heading: "Workforce management for shift-based industries",
  description:
    "RosterLab brings intelligent scheduling and workforce optimization to shift-based teams across a range of industries.",
  viewAll: { label: "View all industries", href: "/us/industries" },
  industries: [
    { name: "Hospitality", href: "/us/industries/hospitality-scheduling" },
    {
      name: "24/7 support teams",
      href: "/us/industries/call-center-scheduling",
    },
    { name: "Retail", href: "/us/industries/retail-scheduling" },
    { name: "Education", href: "/us/industries/education-scheduling" },
    {
      name: "Airport & transportation",
      href: "/us/industries/airport-transportation-scheduling",
    },
    {
      name: "Emergency services",
      href: "/us/industries/emergency-services-scheduling",
    },
  ],
};

export const FINAL_CTA_US = {
  heading: "Still scheduling the hard way?",
  description:
    "See how RosterLab turns your complex staffing requirements into an optimized schedule in minutes.",
};
