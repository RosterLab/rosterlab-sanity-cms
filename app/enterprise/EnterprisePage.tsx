import Container from "@/components/ui/Container";
import EnterpriseHero from "./EnterpriseHero";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import EnterpriseFAQ from "./EnterpriseFAQ";
import EnterpriseCaseStudies, { type CaseStudy } from "./EnterpriseCaseStudies";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import Reveal from "./Reveal";
import EnterpriseOutcomes from "./EnterpriseOutcomes";
import EnterpriseFeatures, { type Feature } from "./EnterpriseFeatures";
import EnterpriseTestimonials from "./EnterpriseTestimonials";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getUSPath } from "@/components/seo/HreflangTags";
import { enterpriseText } from "./enterprise-copy";
// Phosphor icons, weighted so every line icon renders at roughly 2px:
// Regular at 24–32px, Light at 40px, Bold at 16–24px.
import {
  PiChartBar,
  PiClipboardText,
  PiCurrencyCircleDollar,
  PiDatabase,
  PiChalkboardTeacher,
  PiHeartbeat,
  PiLockKey,
  PiHandshake,
  PiHeadset,
  PiShieldCheck,
} from "react-icons/pi";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

// Enterprise palette (P1 Navy): navy #1F2A5C, deep navy #141B3F and mid navy
// #2A3F8F for surfaces; site blue #3B7FE8 for primary actions and accents;
// teal #03F9BE and cyan #24D9DC for highlights; orange #F67D00 sparingly;
// tints #9CE4FF, #C7D2FF, #FFD08A, #F4F6FB; slate #8A97B8 for muted text on
// navy. Used as literal Tailwind values so they stay greppable.

// Analytics `location` for every click originating on this page.
const LOCATION = "Enterprise Page";

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
    title: "Organisation-wide oversight, department-level control",
    highlight: "Organisation-wide oversight,",
    description:
      "Set consistent rostering standards across your organisation, while giving each department the flexibility to roster according to its own rules and working practices.",
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

const SECURITY_FEATURES: {
  title: string;
  description: string;
  icon: IconType;
  tint: string;
}[] = [
  {
    title: "Cloud-based infrastructure",
    description:
      "Hosted on AWS with encryption to protect data in transit and at rest.",
    icon: FaAws,
    tint: "bg-[#FFD08A]",
  },
  {
    title: "Access & authentication",
    description:
      "Single sign-on (SSO), multi-factor authentication (MFA) and role-based access control.",
    icon: PiLockKey,
    tint: "bg-[#C7D2FF]",
  },
  {
    title: "Audit trails & accountability",
    description:
      "Track roster changes and user activity with full audit trails that support transparency and oversight.",
    icon: PiClipboardText,
    tint: "bg-[#9CE4FF]",
  },
  {
    title: "Data backup & recovery",
    description:
      "Protect rostering data with regular automated backups and reliable recovery processes.",
    icon: PiDatabase,
    tint: "bg-[#03F9BE]/30",
  },
];

const IMPLEMENTATION: Benefit[] = [
  {
    icon: PiHandshake,
    title: "Strategic workforce design",
    description:
      "During implementation, we provide insights to help healthcare leaders align roster design and workforce planning with service demand, staffing efficiency and organisational priorities.",
  },
  {
    icon: PiChalkboardTeacher,
    title: "Guided transition support",
    description:
      "We help hospital leaders make the transition smoother and more effective through dedicated training, aligned expectations and practical guidance on rostering practices.",
  },
  {
    icon: PiHeadset,
    title: "Dedicated customer success",
    description:
      "You will have dedicated support from our implementation consultants and project managers throughout your rollout, with ongoing customer success support after launch.",
  },
];

// Card headings summarise the linked stories.
// Quotes and headline figures are drawn from the linked stories.
const STORIES: CaseStudy[] = [
  {
    kind: "Case study",
    title: "Radiology Boosts Staff Retention",
    href: "/case-studies/radiology-department-auckland",
    image: "/images/enterprise/case-study-radiology-v2.webp",
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
    image: "/images/enterprise/case-study-er-v2.webp",
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
    image: "/images/enterprise/case-study-plastics.webp",
    stats: [
      {
        value: "~15%",
        label: "projected cost savings from roster simulation",
      },
    ],
  },
];

const FAQ_ITEMS = [
  {
    question:
      "Can we standardise rostering across the organisation while allowing for different team requirements?",
    answer:
      "Yes. RosterLab lets you set and enforce organisation-wide rostering policies and standards, with central oversight of the rules applied across departments. Each department can also configure its own clinical requirements and rostering rules, while retaining control over how its rosters are managed.",
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
      "Absolutely. RosterLab accounts for the different employment agreements, contracted hours, fatigue limits and working arrangements that apply to each workforce group. These requirements are factored into roster generation, reducing manual rule checks and helping prevent compliance issues.",
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
      "Implementation timelines depend on the complexity of your rostering requirements and the scope of the rollout. Your dedicated implementation consultant will work with you to establish a realistic timeline, configure your roster setup, and provide hands-on training and support for the teams involved.",
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
    <div className={`mx-auto max-w-5xl text-center ${className}`}>
      <h2 className="text-balance text-3xl md:text-[2.75rem] font-semibold text-[#1F2A5C] leading-tight tracking-tight">
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

export default function EnterprisePage({ isUS = false }: { isUS?: boolean }) {
  const t = (text: string) => enterpriseText(text, isUS);
  const href = (path: string) => (isUS ? (getUSPath(path) ?? path) : path);
  const location = isUS ? "US Enterprise Page" : LOCATION;
  const benefits = BENEFITS.map((item) => ({
    ...item,
    title: t(item.title),
    description: t(item.description),
  }));
  const features = FEATURES.map((item) => ({
    ...item,
    title: t(item.title),
    highlight: t(item.highlight),
    description: t(item.description),
    image: { ...item.image, alt: t(item.image.alt) },
  }));
  const securityFeatures = SECURITY_FEATURES.map((item) => ({
    ...item,
    title: t(item.title),
    description: t(item.description),
  }));
  const implementation = IMPLEMENTATION.map((item) => ({
    ...item,
    title: t(item.title),
    description: t(item.description),
  }));
  const stories = STORIES.map((item) => ({
    ...item,
    title: t(item.title),
    href: href(item.href),
    quote: item.quote ? t(item.quote) : undefined,
    attribution: item.attribution ? t(item.attribution) : undefined,
    stats: item.stats.map((stat) => ({ ...stat, label: t(stat.label) })),
  }));
  const faqs = FAQ_ITEMS.map((item) => ({
    question: t(item.question),
    answer: t(item.answer),
  }));
  const newsroom = {
    ...NEWSROOM,
    title: t(NEWSROOM.title),
    href: href(NEWSROOM.href),
  };

  return (
    <SiteLayout>
      <EnterpriseHero
        isUS={isUS}
        title={t("Enterprise healthcare rostering software powered by AI")}
        description={t(
          "Roster your entire clinical workforce on one secure platform. Control labour and staffing costs, strengthen compliance, and deploy your clinicians where they’re needed most.",
        )}
        analyticsLocation={location}
        primaryCta={{
          href: href("/book-a-demo"),
          label: "Talk to our team",
          analyticsProperties: {
            cta_type: "demo",
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
                  {t("Turn rostering into a strategic advantage")}
                </Reveal>
                <Reveal
                  as="p"
                  delay={0.12}
                  className="mt-6 text-lg text-white/80 leading-relaxed"
                >
                  {t(
                    "RosterLab brings hospital teams, departments and services together on one intelligent AI rostering platform, helping large healthcare organisations lift workforce productivity, coordinate staffing at scale, and operate with greater resilience.",
                  )}
                </Reveal>
                <Reveal delay={0.24} className="mt-10">
                  <p className="text-lg font-medium text-white">
                    {t("Built for complex healthcare organisations:")}
                  </p>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {ORG_TYPES.map((type, i) => (
                      <Reveal
                        as="li"
                        key={t(type)}
                        delay={0.4 + i * 0.1}
                        y={12}
                        className={`flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-center font-semibold text-[#1F2A5C] ${i === 2 ? "sm:col-span-2" : ""}`}
                      >
                        {t(type)}
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
                  alt={t("RosterLab generating rosters on a laptop")}
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

      {/* Main headings share 64px top padding, increasing to 96px at md. */}
      {/* 2 — ROI. */}
      <section className="bg-[#F4F6FB] pt-16 pb-12 md:pt-24 md:pb-16">
        <Container>
          <SectionHeading
            title="Proven outcomes for clinical environments"
            description={t(
              "See what enterprise healthcare organisations are achieving with RosterLab.",
            )}
          />

          <EnterpriseOutcomes
            newsroom={newsroom}
            isUS={isUS}
            analyticsLocation={location}
          />
        </Container>
      </section>

      {/* 3 — Benefits: four light-grey cards in a 2 x 2 on white, each with
          the same blue icon tile. */}
      <section className="bg-white pt-16 pb-12 md:pt-24 md:pb-16">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-balance text-3xl md:text-[2.75rem] font-semibold text-[#1F2A5C] leading-tight tracking-tight">
              {t("Better workforce outcomes across your organisation")}
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
            {benefits.map((b) => {
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
      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <Container>
          <h2 className="max-w-3xl text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-[1.1] tracking-tight">
            {t("One rostering platform for every clinical team")}
          </h2>
        </Container>
        <div className="mt-10 md:mt-12">
          <Container>
            <EnterpriseFeatures
              features={features}
              cta={{
                label: "See RosterLab in action",
                href: href("/book-a-demo"),
                analyticsLocation: location,
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
      <section
        className="py-16 md:py-24"
        aria-labelledby="enterprise-security-heading"
      >
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
            <div>
              <h2
                id="enterprise-security-heading"
                className="max-w-3xl text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-[1.1] tracking-tight"
              >
                Enterprise-grade security and privacy by design
              </h2>
              <p className="mt-12 max-w-lg text-base md:mt-16 md:text-lg text-gray-600 leading-relaxed">
                RosterLab protects sensitive workforce information with secure
                cloud infrastructure, robust access controls and transparent
                data practices to support enterprise security and governance
                requirements.
              </p>
            </div>

            <ul className="min-w-0 divide-y divide-gray-200">
              {securityFeatures.map(
                ({ title, description, icon: Icon, tint }) => (
                  <li
                    key={title}
                    className="flex items-start gap-4 py-6 first:pt-0 last:pb-0 sm:gap-5"
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[#1F2A5C] ${tint}`}
                    >
                      <Icon
                        className={Icon === FaAws ? "h-8 w-8" : "h-6 w-6"}
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold text-[#1F2A5C] leading-snug tracking-tight">
                        {title}
                      </h3>
                      <p className="mt-2 text-base text-gray-600 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
        </Container>
      </section>

      {/* 6 — Testimonials: one navy quote card, cycling. */}
      <EnterpriseTestimonials isUS={isUS} />

      {/* 7 — Implementation & support: a dark band, the heading and copy
          stacked on the left, then three columns, each a cyan line icon on a
          dark tile over a large title and muted copy. */}
      <section className="relative overflow-hidden bg-[#141B3F] py-16 md:py-24">
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
              {t("Implementation backed by healthcare rostering expertise")}
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
              {t(
                "Enterprise rollouts bring different departments, rostering rules and stakeholders together.",
              )}
            </p>
          </div>
          {/* Headings share a minimum height so the descriptions align. */}
          <div className="mt-14 grid max-w-6xl grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-4">
            {implementation.map(({ icon: Icon, title, description }) => (
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
      <section className="py-16 md:py-24">
        <Container>
          <EnterpriseCaseStudies stories={stories} isUS={isUS} />
        </Container>
      </section>

      {/* 9 — FAQ */}
      <section className="bg-[#F4F6FB] py-16 md:py-24">
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
            <EnterpriseFAQ items={faqs} />
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
                {t(
                  "See how RosterLab can deliver better rostering outcomes across your organisation.",
                )}
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href={href("/book-a-demo")}
                  className="rounded-md bg-white px-7 py-3.5 text-base font-semibold text-[#1F2A5C] hover:bg-[#F4F6FB]"
                  analyticsLabel="Talk to our team"
                  analyticsLocation={location}
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: "Enterprise",
                    section: "final_cta",
                  }}
                >
                  Talk to our team
                </Button>
                <Button
                  href={href("/solutions/ai-roster-generator")}
                  variant="outline"
                  className="rounded-md border-2 border-white px-7 py-3.5 text-base font-semibold text-white hover:bg-white hover:text-[#1F2A5C]"
                  analyticsLabel="Learn more about RosterLab"
                  analyticsLocation={location}
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
        items={[{ name: "Home", url: href("/") }, { name: "Enterprise" }]}
      />
    </SiteLayout>
  );
}
