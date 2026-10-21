import Container from "@/components/ui/Container";
import EnterpriseHero from "./EnterpriseHero";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import EnterpriseFAQ from "./EnterpriseFAQ";
import EnterpriseCaseStudies, { type CaseStudy } from "./EnterpriseCaseStudies";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import Reveal from "./Reveal";
import SecurityAutoplay from "./SecurityAutoplay";
import EnterpriseOutcomes from "./EnterpriseOutcomes";
import EnterpriseFeatures, { type Feature } from "./EnterpriseFeatures";
import EnterpriseTestimonials from "./EnterpriseTestimonials";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { withHreflang } from "@/components/seo/HreflangTags";
// Phosphor icons, weighted so every line icon renders at roughly 2px:
// Regular at 24–32px, Light at 40px, Bold at 16–24px.
import {
  PiChartBar,
  PiClipboardTextLight,
  PiCurrencyCircleDollar,
  PiDeviceMobileLight,
  PiChalkboardTeacher,
  PiHeartbeat,
  PiKeyLight,
  PiHandshake,
  PiHeadset,
  PiShieldCheck,
  PiUserGearLight,
} from "react-icons/pi";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

// ISR: Revalidate every 1 hour (marketing page, rarely changes)
export const revalidate = 3600;

// Enterprise palette (P1 Navy): navy #1F2A5C, deep navy #141B3F and mid navy
// #2A3F8F for surfaces; site blue #3B7FE8 for primary actions and accents;
// teal #03F9BE and cyan #24D9DC for highlights; orange #F67D00 sparingly;
// tints #9CE4FF, #C7D2FF, #FFD08A, #F4F6FB; slate #8A97B8 for muted text on
// navy. Used as literal Tailwind values so they stay greppable.

// Analytics `location` for every click originating on this page.
const LOCATION = "Enterprise Page";

const DESCRIPTION =
  "Enterprise healthcare rostering software powered by AI. Roster your entire clinical workforce on one secure platform, control staffing costs and strengthen compliance.";

// No US equivalent yet, so no hreflang alternates are advertised.
export const metadata = withHreflang(
  {
    title: "Enterprise Healthcare Rostering Software",
    description: DESCRIPTION,
    alternates: {
      canonical: "https://rosterlab.com/enterprise",
    },
    openGraph: {
      title: "Enterprise Healthcare Rostering Software - RosterLab",
      description: DESCRIPTION,
      type: "website",
      url: "https://rosterlab.com/enterprise",
      images: [
        {
          url: "/images/og-images/Pricing.png",
          width: 1200,
          height: 630,
          alt: "RosterLab Enterprise",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Enterprise Healthcare Rostering Software - RosterLab",
      description: DESCRIPTION,
      images: ["/images/og-images/Pricing.png"],
    },
  },
  "/enterprise",
  { singleMarket: true },
);

/* ---------------------------------------------------------------- content */

// Each chip's text takes a brand accent, deepened enough to read on grey.
const ORG_TYPES = [
  "Public health systems",
  "Private hospital groups",
  "Multi-site healthcare providers",
];

const NEWSROOM = {
  title:
    "Health New Zealand and RosterLab partner on initial pilot of AI-powered rostering across New Zealand hospitals",
  href: "/newsroom/healthnz-and-rosterlab-partner-on-initial-rollout-of-ai-powered-healthcare-rostering-across-nz",
  image:
    "https://cdn.sanity.io/images/el2jjtjd/production/6d6ebbae334f25cc6cc62fed7f20c7d00c7022cf-877x439.png",
};

interface Benefit {
  icon: IconType;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: PiCurrencyCircleDollar,
    title: "Reduce labour and administration costs",
    description:
      "Make better use of existing staffing capacity. Reduce unnecessary overtime, penalty costs, locum and agency cover, while freeing clinical managers from days of manual rostering.",
  },
  {
    icon: PiHeartbeat,
    title: "Support staff wellbeing and retention",
    description:
      "Create fairer, more sustainable rosters that balance workloads, accommodate preferences and manage fatigue, helping clinicians achieve a healthier work-life balance.",
  },
  {
    icon: PiChartBar,
    title: "Make better workforce decisions",
    description:
      "Gain greater visibility into staffing patterns, workforce utilisation and roster performance to identify inefficiencies and make informed resourcing decisions.",
  },
  {
    icon: PiShieldCheck,
    title: "Strengthen compliance and clinical safety",
    description:
      "Apply organisational policies, union agreements, staffing requirements and fatigue rules consistently across different departments and clinical workforce groups.",
  },
];

const FEATURES: Feature[] = [
  {
    title: "AI-powered roster optimisation",
    highlight: "AI-powered",
    description:
      "RosterLab generates rosters that assign the right people at the right time automatically, keeping services running smoothly with fewer disruptions and higher productivity.",
    image: {
      src: "/images/enterprise/ai-roster-generator.webp",
      alt: "RosterLab generating rosters, balancing rules, staffing demand and staff preferences",
      width: 1600,
      height: 1200,
      fill: true,
    },
  },
  {
    title: "Organisation-wide visibility, department-level control",
    highlight: "Organisation-wide visibility,",
    description:
      "Give each department the flexibility to roster according to its own rules and working practices, while maintaining a unified view across the organisation.",
    image: {
      // Placeholder artwork until the final enterprise image is supplied.
      src: "/images/enterprise/organisation-wide-visibility.webp",
      alt: "A department roster in RosterLab with an overview of its ICU sub-rosters",
      width: 1600,
      height: 1200,
      fill: true,
    },
  },
  {
    title: "Enterprise reporting and analytics",
    highlight: "Enterprise reporting",
    description:
      "Create data reports on fairness, compliance, staffing patterns and roster performance across your organisation to uncover trends and support better operational decisions.",
    image: {
      src: "/images/enterprise/enterprise-reporting-v2.webp",
      alt: "RosterLab enterprise reporting with an exported overtime and undertime report",
      width: 1600,
      height: 1200,
      fill: true,
    },
  },
  {
    title: "Intelligent workforce insights",
    highlight: "Intelligent",
    description:
      "Turn roster data into actionable workforce insights. Our AI rostering assistant Otto spots coverage gaps and workload imbalances, then recommends what to do next.",
    image: {
      src: "/images/enterprise/otto-chat-v2.webp",
      alt: "Otto, RosterLab's AI rostering assistant, flagging a coverage gap and a workload imbalance",
      width: 1600,
      height: 1200,
      fill: true,
    },
  },
];

const SECURITY_POINTS = [
  "Cloud-based infrastructure (AWS) with robust encryption and security",
  "Single sign-on (SSO), multi-factor authentication (MFA), and role-based access control",
  "Enterprise governance: monitoring, oversight, and documented security processes",
  "SOC 2 compliance",
];

// One tile per security point, with the access-control point split into its
// three parts. Brand logo where there is one (AWS), line icons otherwise.
// SOC 2 (icon: null) draws its own shield badge.
// `tint` is each tile's fill: the palette's soft tints, with the brighter
// accents (teal, site blue, orange) knocked back to a wash. `point` is the
// index in SECURITY_POINTS the tile belongs to; hovering one highlights the
// other (see SECURITY_HOVER_CSS), and the point is tinted in `tint`.
const SECURITY_BADGES: {
  label: string;
  icon: IconType | null;
  tint: string;
  point: number;
}[] = [
  { label: "SOC 2 compliance", icon: null, tint: "#C7D2FF", point: 3 },
  {
    label: "Cloud infrastructure (AWS)",
    icon: FaAws,
    tint: "#FFD08A",
    point: 0,
  },
  {
    label: "Single sign-on (SSO)",
    icon: PiKeyLight,
    tint: "#9CE4FF",
    point: 1,
  },
  {
    label: "Multi-factor authentication (MFA)",
    icon: PiDeviceMobileLight,
    tint: "rgba(3,249,190,0.4)",
    point: 1,
  },
  {
    label: "Role-based access control",
    icon: PiUserGearLight,
    tint: "rgba(59,127,232,0.2)",
    point: 1,
  },
  {
    label: "Enterprise governance",
    icon: PiClipboardTextLight,
    tint: "rgba(246,125,0,0.2)",
    point: 2,
  },
];

/**
 * The list and the badges point at each other on hover, in pure CSS on
 * `:has()` so the page stays a server component:
 *  - hovering a point singles out its badges: they lift and every other
 *    badge greys out (SSO, MFA and role-based access share one point, so
 *    that point lifts all three);
 *  - hovering a badge tints its point in the badge's own colour, and greys
 *    out the other badges.
 */
/** How long each badge holds the highlight when the section plays through. */
const SECURITY_DWELL = 3200;

const SECURITY_HOVER_CSS = [
  ...SECURITY_POINTS.map(
    (_, i) =>
      `.rl-security:has([data-point="${i}"]:hover) [data-badge]:not([data-badge-point="${i}"]) .rl-badge-tile{filter:grayscale(1);opacity:.45}` +
      `.rl-security:has([data-point="${i}"]:hover) [data-badge-point="${i}"] .rl-badge-tile{transform:translateY(-4px)}`,
  ),
  ...SECURITY_BADGES.map(
    (b, k) =>
      `.rl-security:has([data-badge="${k}"]:hover) [data-point="${b.point}"]{background-color:${b.tint}}`,
  ),
  `.rl-security:has([data-badge]:hover) [data-badge]:not(:hover) .rl-badge-tile{filter:grayscale(1);opacity:.45}`,
  `.rl-security [data-badge]:hover .rl-badge-tile{transform:translateY(-4px)}`,
  // Autoplay (SecurityAutoplay): the same highlight for whichever badge is
  // playing, plus a bar under it filling over its turn. A hover anywhere in
  // the section takes over.
  ...SECURITY_BADGES.map(
    (b, k) =>
      `.rl-security[data-active="${k}"]:not(:hover) [data-point="${b.point}"]{background-color:${b.tint}}` +
      `.rl-security[data-active="${k}"]:not(:hover) [data-badge]:not([data-badge="${k}"]) .rl-badge-tile{filter:grayscale(1);opacity:.45}` +
      `.rl-security[data-active="${k}"]:not(:hover) [data-badge="${k}"] .rl-badge-tile{transform:translateY(-4px)}` +
      `.rl-security[data-active="${k}"]:not(:hover) [data-badge="${k}"] .rl-badge-bar>span{animation:rl-sec-progress ${SECURITY_DWELL}ms linear forwards}`,
  ),
  `@keyframes rl-sec-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`,
  `@media (prefers-reduced-motion: reduce){.rl-security .rl-badge-bar{display:none}}`,
].join("");

const IMPLEMENTATION: Benefit[] = [
  {
    icon: PiHandshake,
    title: "Hands-on implementation",
    description:
      "Our rostering specialists take the time to understand your clinical rostering practices, tailoring RosterLab to how your teams operate.",
  },
  {
    icon: PiChalkboardTeacher,
    title: "Training and enablement",
    description:
      "We equip roster managers and department leaders with the knowledge they need to use RosterLab with confidence.",
  },
  {
    icon: PiHeadset,
    title: "Dedicated customer success",
    description:
      "Receive priority enterprise support and expert guidance with a dedicated customer success manager by your side.",
  },
];

// Titles and images are each story's own published metadata.
// Quotes and figures are lifted word for word from each linked page.
const STORIES: CaseStudy[] = [
  {
    kind: "Case study",
    title: "Sydney Hospital Saves 300+ Hours With AI",
    href: "/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering",
    image: "/images/enterprise/case-study-er-v2.webp",
    quote:
      "It’s not just about saving hours. It's about confidence in the roster, about fairness, and about giving senior clinicians time back for patient care - not spreadsheets.",
    attribution: "Emergency Physician",
    stats: [
      { value: "67%", label: "less time writing rosters" },
      { value: "$40,000", label: "saved annually" },
    ],
  },
  {
    kind: "Newsroom",
    title: "Royal Perth Hospital Partners on AI Rosters",
    href: "/newsroom/hospital-in-perth-partners-with-rosterlab-for-smarter-rosters",
    image: "/images/enterprise/case-study-icu-v2.webp",
    quote:
      "Ensuring clinical safety, optimising staffing levels, and enhancing work-life balance were key drivers for this initiative.",
    attribution: "Daniel Ge - Co-founder, RosterLab",
    stats: [
      {
        value: "30 mins",
        label: "or less to generate a complete 13-week roster",
      },
    ],
  },
  {
    kind: "Case study",
    title: "Auckland Radiology Boosts Staff Retention",
    href: "/case-studies/radiology-department-auckland",
    image: "/images/enterprise/case-study-radiology-v2.webp",
    quote:
      "We are now fully staffed... I've been here for 28 years, and we've never managed to achieve this level of staffing consistently for more than 2 months until RosterLab",
    attribution: "MRT team leader",
    stats: [
      { value: "$80,000+", label: "per year in savings" },
      { value: "Zero", label: "breaches of MECA rules" },
    ],
  },
];

const FAQ_ITEMS = [
  {
    question:
      "Can RosterLab manage rostering across different departments and clinical teams?",
    answer:
      "Yes. RosterLab is designed to handle the complexity of rostering across large healthcare organisations, where staffing needs, working arrangements and rostering rules vary considerably between teams. Departments can build rosters around their own clinical and operational requirements, while leaders gain a consistent view of staffing and roster performance across the organisation.",
  },
  {
    question: "What ROI can we expect from RosterLab?",
    answer:
      "Healthcare organisations using RosterLab have reduced rostering time by over 90%, freeing hundreds of hours of clinical management time each year. By making better use of existing staff, hospitals can reduce unnecessary overtime and reliance on costly agency and locum cover. Fairer, more sustainable rosters can also improve staff retention, helping organisations avoid the substantial costs of recruitment and replacement.",
  },
  {
    question:
      "Can RosterLab manage different union agreements and workforce policies?",
    answer:
      "Absolutely. RosterLab can apply different union agreements, employment conditions, fatigue rules and organisational policies across workforce groups and departments. These requirements are built into the rostering process, helping teams stay compliant without checking every rule manually.",
  },
  {
    question: "Does RosterLab integrate with our existing systems?",
    answer:
      "RosterLab offers enterprise integrations and API access to work alongside your existing tech stack. During implementation, our team works with you to understand your systems and integration requirements.",
  },
  {
    question: "How does RosterLab keep our data secure?",
    answer:
      "RosterLab protects your workforce data with enterprise-grade security and governance. We are SOC 2 compliant and support multi-factor authentication, passkeys, Microsoft Entra single sign-on, and role-based access to help ensure sensitive information is only accessible to authorised users.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Implementation timelines depend on the size of your organisation, the complexity of your rostering requirements and the scope of your rollout. Your dedicated customer success manager will build a tailored implementation plan and guide your teams through roster configuration setup and onboarding.",
  },
];

/* ------------------------------------------------------------- building blocks */

function SectionHeading({
  title,
  description,
  className = "",
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-[#1F2A5C] leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function EnterprisePage() {
  return (
    <SiteLayout>
      <EnterpriseHero
        title="Enterprise healthcare rostering software powered by AI"
        description="Roster your entire clinical workforce on one secure platform. Control labour and staffing costs, strengthen compliance, and deploy your clinicians where they’re needed most."
        analyticsLocation={LOCATION}
        primaryCta={{
          href: "/book-a-demo",
          label: "Talk to our team",
          analyticsProperties: {
            cta_type: "demo",
            page_name: "Enterprise",
            section: "hero",
          },
        }}
        secondaryCta={{
          href: "/tools/roi-calculator",
          label: "See the ROI",
          analyticsProperties: {
            cta_type: "roi_calculator",
            page_name: "Enterprise",
            section: "hero",
          },
        }}
      />

      {/* 1 — Strategic advantage: a navy card set into the page, the copy
          and organisation types on the left and an image stretched to the
          full height of the card on the right. Enters piece by piece:
          heading, copy, the types in turn, then the image. */}
      <section className="py-10 md:py-12">
        <Container>
          <div className="rounded-[2rem] bg-[#1F2A5C] px-6 py-14 sm:px-12 md:px-16 md:py-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="lg:py-6">
                <Reveal
                  as="h2"
                  className="text-3xl md:text-[2.75rem] font-semibold text-white leading-[1.15] tracking-tight"
                >
                  Turn rostering into a strategic advantage
                </Reveal>
                <Reveal
                  as="p"
                  delay={0.12}
                  className="mt-6 text-lg text-white/80 leading-relaxed"
                >
                  RosterLab brings hospital teams, departments and services
                  together on one intelligent AI rostering platform, helping
                  large healthcare organisations lift workforce productivity,
                  coordinate staffing at scale, and operate with greater
                  resilience.
                </Reveal>
                <Reveal delay={0.24} className="mt-10">
                  <p className="text-lg font-medium text-white">
                    Built for complex healthcare organisations:
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {ORG_TYPES.map((type, i) => (
                      <Reveal
                        as="li"
                        key={type}
                        delay={0.4 + i * 0.1}
                        y={12}
                        className="rounded-xl bg-white px-5 py-2.5 font-semibold text-[#1F2A5C]"
                      >
                        {type}
                      </Reveal>
                    ))}
                  </ul>
                </Reveal>
              </div>
              {/* Product shot: RosterLab generating rosters on a laptop.
                  Stretches to the copy column's height on desktop, cropped
                  from the centre. */}
              <Reveal
                delay={0.18}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:h-full"
              >
                <Image
                  src="/images/enterprise/laptop-roster-generation.webp"
                  alt="RosterLab generating rosters on a laptop"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <TrustedByDualRow
        singleRow
        headingClassName="text-xl md:text-2xl text-[#1F2A5C]"
        logoColor="#1F2A5C"
        heading="Trusted by leading hospitals and health systems"
      />

      {/* 2 — ROI. Sized to fit one laptop screen (about 820px under the
          header): tight padding, a compact quote and metrics, a short
          newsroom strip. */}
      <section className="bg-[#F4F6FB] py-10">
        <Container>
          <SectionHeading
            title="Proven outcomes for clinical environments"
            description="See what enterprise healthcare organisations are achieving with RosterLab."
          />

          <EnterpriseOutcomes
            newsroom={NEWSROOM}
            analyticsLocation={LOCATION}
          />
        </Container>
      </section>

      {/* 3 — Benefits: four light-grey cards in a 2 x 2 on white, each with
          the same blue icon tile. Sized to fit one laptop screen (about 820px
          under the header). */}
      <section className="bg-white py-12">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-balance text-3xl md:text-[2.75rem] font-semibold text-[#1F2A5C] leading-tight tracking-tight">
              Better workforce outcomes across your organisation
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="flex flex-col rounded-xl bg-[#F4F6FB] p-6 md:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3B7FE8]"
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </span>
                  <h3 className="mt-4 text-xl md:text-[22px] font-medium text-[#1F2A5C] leading-snug">
                    {b.title}
                  </h3>
                  <div className="mt-auto pt-7">
                    <hr className="mb-4 border-[#1F2A5C]/10" />
                    <p className="max-w-md text-[15px] text-gray-600 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4 — Key enterprise features: heading and the feature card on one
          tint. */}
      <section className="bg-[#F4F6FB] py-20 md:py-24">
        <Container>
          <h2 className="max-w-3xl text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-[1.1] tracking-tight">
            One rostering platform for every clinical team
          </h2>
        </Container>
        <div className="mt-10 md:mt-12">
          <Container>
            <EnterpriseFeatures
              features={FEATURES}
              cta={{
                heading: "See RosterLab in action.",
                label: "Book a demo",
                href: "/book-a-demo",
                analyticsLocation: LOCATION,
                analyticsProperties: {
                  cta_type: "demo",
                  page_name: "Enterprise",
                  section: "features",
                },
              }}
            />
          </Container>
        </div>
      </section>

      {/* 5 — Security & privacy */}
      <section className="rl-security py-20 md:py-24">
        <style>{SECURITY_HOVER_CSS}</style>
        <SecurityAutoplay
          count={SECURITY_BADGES.length}
          dwell={SECURITY_DWELL}
        />
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-[1.1] tracking-tight">
                Enterprise-grade security and privacy by design
              </h2>
              <p className="mt-6 max-w-lg text-base md:text-lg text-gray-600 leading-relaxed">
                RosterLab protects sensitive workforce information through
                secure cloud infrastructure, strong authentication and
                role-based access controls, supporting the security and
                governance requirements of large healthcare organisations.
              </p>
            </div>

            <ul className="divide-y divide-gray-200">
              {SECURITY_POINTS.map((point, i) => (
                // Padded out past the column edge so the hover tint has room
                // around the text; the rules extend with it.
                <li
                  key={point}
                  data-point={i}
                  className="-mx-4 rounded-xl px-4 py-3.5 text-base md:py-6 md:text-xl font-medium text-gray-900 leading-snug transition-colors duration-200 hover:bg-[#F4F6FB]"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Badge row, centred between two rules on desktop. The rules sit at
              the tiles' midline (half of the 6rem tile). */}
          <div className="mt-8 flex items-start gap-6 md:mt-16">
            <span
              aria-hidden="true"
              className="mt-12 hidden h-px flex-1 bg-gray-300 lg:block"
            />
            <ul className="grid w-full grid-cols-6 gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-6 lg:w-auto lg:grid-cols-[repeat(6,7rem)] lg:gap-x-4">
              {SECURITY_BADGES.map(({ label, icon: Icon, tint, point }, k) => (
                <li
                  key={label}
                  data-badge={k}
                  data-badge-point={point}
                  className="flex flex-col items-center"
                >
                  <div
                    className="rl-badge-tile flex aspect-square w-full max-w-24 items-center justify-center rounded-lg md:rounded-xl transition-[transform,filter,opacity] duration-200"
                    style={{ backgroundColor: tint }}
                  >
                    {Icon ? (
                      // Light weight at 40px gives a ~2px line, matching the
                      // SOC 2 shield below. (AWS is a filled mark.)
                      <Icon
                        aria-hidden="true"
                        className="h-6 w-6 text-[#1F2A5C] md:h-10 md:w-10"
                      />
                    ) : (
                      // SOC 2 badge: line-drawn stand-in until the official
                      // artwork is supplied.
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 100 116"
                        className="h-8 w-7 text-[#1F2A5C] md:h-12 md:w-10"
                        fill="none"
                      >
                        <path
                          d="M50 4 L94 20 V56 C94 84 74 102 50 112 C26 102 6 84 6 56 V20 Z"
                          stroke="currentColor"
                          strokeWidth="4.8"
                          strokeLinejoin="round"
                        />
                        <text
                          x="50"
                          y="52"
                          textAnchor="middle"
                          fontSize="20"
                          fontWeight="500"
                          fill="currentColor"
                        >
                          SOC
                        </text>
                        <text
                          x="50"
                          y="76"
                          textAnchor="middle"
                          fontSize="20"
                          fontWeight="500"
                          fill="currentColor"
                        >
                          2
                        </text>
                      </svg>
                    )}
                  </div>
                  {/* Fills while this badge is playing (see SECURITY_HOVER_CSS). */}
                  <span
                    aria-hidden="true"
                    className="rl-badge-bar mt-1.5 block h-0.5 w-8 md:mt-2 md:w-12 overflow-hidden rounded-full bg-transparent"
                  >
                    <span className="block h-full w-full origin-left scale-x-0 bg-[#1F2A5C]" />
                  </span>
                  <span className="sr-only mt-2 max-w-28 text-center md:not-sr-only text-[11px] uppercase tracking-wider text-gray-500 leading-snug">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <span
              aria-hidden="true"
              className="mt-12 hidden h-px flex-1 bg-gray-300 lg:block"
            />
          </div>
        </Container>
      </section>

      {/* 6 — Testimonials: one navy quote card, cycling. */}
      <EnterpriseTestimonials />

      {/* 7 — Implementation & support: a dark band, the heading and copy
          stacked on the left, then three columns, each a cyan line icon on a
          dark tile over a large title and muted copy. */}
      <section className="relative overflow-hidden bg-[#141B3F] py-20 md:py-24">
        {/* Texture: a white dot grid that fades out toward the left, where
            the copy sits, and soft blue and teal glows filling the empty
            right-hand side. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[length:22px_22px] [mask-image:linear-gradient(to_left,black_20%,transparent_85%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[#3B7FE8]/25 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 right-1/4 h-[28rem] w-[28rem] rounded-full bg-[#03F9BE]/10 blur-[120px]"
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight">
              Implementation backed by healthcare rostering expertise
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed">
              From initial setup to ongoing optimisation, we help your
              organisation get up and running smoothly, so you can start seeing
              improvements from the very first roster.
            </p>
          </div>
          {/* Columns held narrower than the container, as in the
              reference, so each title breaks onto two lines; the titles are
              also held to two lines' height, so the copy under every one
              starts on the same line. */}
          <div className="mt-14 grid max-w-5xl grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-4">
            {IMPLEMENTATION.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-[#1F2A5C]"
                >
                  <Icon className="h-7 w-7 text-[#03F9BE]" />
                </span>
                <h3 className="mt-7 text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight md:min-h-[2lh]">
                  {title}
                </h3>
                <p className="mt-4 text-[#8A97B8] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8 — Customer stories: one story at a time, photo and navy panel. */}
      <section className="py-20">
        <Container>
          <EnterpriseCaseStudies stories={STORIES} />
        </Container>
      </section>

      {/* 9 — FAQ */}
      <section className="bg-[#F4F6FB] py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
                Frequently asked questions
              </h2>
              <p className="mt-4 max-w-sm text-lg text-gray-600 leading-relaxed">
                Everything you need to know about RosterLab for enterprise.
              </p>
            </div>
            <EnterpriseFAQ items={FAQ_ITEMS} />
          </div>
        </Container>
      </section>

      {/* 10 — Ending CTA: a site-blue card set into the page, copy centred,
          with an oversized RosterLab mark (its capsule, bar and dot) drawn in
          tone-on-tone outline off the left edge. */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-[#3B7FE8] px-6 py-16 text-center text-white sm:px-12 md:py-24">
            <svg
              aria-hidden="true"
              viewBox="0 0 300 420"
              className="pointer-events-none absolute -left-24 top-1/2 h-[130%] -translate-y-1/2 text-[#2A3F8F]/45 md:-left-16"
              fill="none"
              stroke="currentColor"
              strokeWidth="22"
            >
              <rect x="11" y="11" width="278" height="98" rx="49" />
              <rect x="11" y="161" width="178" height="98" rx="49" />
              <circle cx="60" cy="360" r="49" />
            </svg>
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
                A better way forward for your workforce
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-white/90">
                See how RosterLab can deliver better rostering outcomes across
                your organisation.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href="/book-a-demo"
                  className="rounded-md bg-white px-7 py-3.5 text-base font-semibold text-[#1F2A5C] hover:bg-[#F4F6FB]"
                  analyticsLabel="Talk to our team"
                  analyticsLocation={LOCATION}
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: "Enterprise",
                    section: "final_cta",
                  }}
                >
                  Talk to our team
                </Button>
                <Button
                  href="/solutions/ai-roster-generator"
                  variant="outline"
                  className="rounded-md border-2 border-white px-7 py-3.5 text-base font-semibold text-white hover:bg-white hover:text-[#1F2A5C]"
                  analyticsLabel="Learn more about RosterLab"
                  analyticsLocation={LOCATION}
                  analyticsProperties={{
                    cta_type: "learn_more",
                    page_name: "Enterprise",
                    section: "final_cta",
                  }}
                >
                  Learn more about RosterLab
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Enterprise" }]}
      />
    </SiteLayout>
  );
}
