import Container from "@/components/ui/Container";
import SolutionHero from "@/components/sections/SolutionHero";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import TestimonialsNew from "@/components/sections/TestimonialsNew";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { withHreflang } from "@/components/seo/HreflangTags";
import {
  HiAcademicCap,
  HiArrowRight,
  HiSupport,
  HiUserGroup,
} from "react-icons/hi";
import {
  LuChartColumn,
  LuCloud,
  LuFingerprint,
  LuKeyRound,
  LuMinus,
  LuUsers,
  LuCircleDollarSign,
  LuHeartPulse,
  LuShieldCheck,
} from "react-icons/lu";
import type { IconType } from "react-icons";

// ISR: Revalidate every 1 hour (marketing page, rarely changes)
export const revalidate = 3600;

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

const ORG_TYPES = [
  "Public health systems",
  "Private hospital groups",
  "Multi-site healthcare providers",
];

// Each label is split so its key phrase can be highlighted on the card.
const OUTCOMES: {
  stat: string;
  highlight: string;
  rest: string;
  art: "bars" | "clock" | "coins" | "trend";
}[] = [
  {
    stat: "90%",
    highlight: "less time",
    rest: " spent on rostering",
    art: "bars",
  },
  {
    stat: "320+",
    highlight: "hours saved annually",
    rest: " by a tertiary hospital",
    art: "clock",
  },
  {
    stat: "15%",
    highlight: "lower labour costs",
    rest: " achieved through roster optimisation",
    art: "coins",
  },
  {
    stat: "10%",
    highlight: "improvement",
    rest: " in staff satisfaction",
    art: "trend",
  },
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
    icon: LuCircleDollarSign,
    title: "Reduce labour and administration costs",
    description:
      "Make better use of existing staffing capacity. Reduce unnecessary overtime, penalty costs, locum and agency cover, while freeing clinical managers from days of manual rostering.",
  },
  {
    icon: LuHeartPulse,
    title: "Support staff wellbeing and retention",
    description:
      "Create fairer, more sustainable rosters that balance workloads, accommodate preferences and manage fatigue, helping clinicians achieve a healthier work-life balance.",
  },
  {
    icon: LuChartColumn,
    title: "Make better workforce decisions",
    description:
      "Gain greater visibility into staffing patterns, workforce utilisation and roster performance to identify inefficiencies and make informed resourcing decisions.",
  },
  {
    icon: LuShieldCheck,
    title: "Strengthen compliance and clinical safety",
    description:
      "Apply organisational policies, union agreements, staffing requirements and fatigue rules consistently across different departments and clinical workforce groups.",
  },
];

interface Feature {
  tag: string;
  title: string;
  description: string;
  // Stand-in product images until dedicated enterprise screenshots exist.
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Size override, e.g. for the wide Otto wordmark. */
    className?: string;
  };
}

const FEATURES: Feature[] = [
  {
    tag: "Workforce allocation",
    title: "AI-powered roster optimisation",
    description:
      "RosterLab generates rosters that assign the right people at the right time automatically, keeping services running smoothly with fewer disruptions and higher productivity.",
    image: {
      src: "/images/new-product-images/what-if-scenario.png",
      alt: "Two roster scenarios compared, with the compliant one generated by RosterLab",
      width: 573,
      height: 291,
    },
  },
  {
    tag: "Department view",
    title: "Organisation-wide visibility, department-level control",
    description:
      "Give each department the flexibility to roster according to its own rules and working practices, while maintaining a unified view across the organisation.",
    image: {
      src: "/images/rules-builder/rules-compliance-roster.webp",
      alt: "Fixed and flexible rostering rules configured for a department",
      width: 1967,
      height: 1153,
    },
  },
  {
    tag: "Reporting & analytics",
    title: "Enterprise reporting and analytics",
    description:
      "Create data reports on fairness, compliance, staffing patterns and roster performance across your organisation to uncover trends and support better operational decisions.",
    image: {
      src: "/images/generating.webp",
      alt: "RosterLab's solution analysis chart of staffing levels across a roster period",
      width: 953,
      height: 557,
    },
  },
  {
    tag: "Workforce insights",
    title: "Intelligent workforce insights",
    description:
      "Turn roster data into actionable workforce insights. Our AI rostering assistant Otto spots coverage gaps and workload imbalances, then recommends what to do next.",
    image: {
      src: "/images/otto.png",
      alt: "Otto, RosterLab's AI rostering assistant",
      width: 4618,
      height: 1530,
      className: "max-h-32",
    },
  },
];

// Titles are short labels drawn from each point's own wording.
const SECURITY_POINTS = [
  {
    title: "Secure cloud infrastructure",
    description:
      "Cloud-based infrastructure (AWS) with robust encryption and security.",
  },
  {
    title: "Strong authentication",
    description:
      "Single sign-on (SSO), multi-factor authentication (MFA), and role-based access control.",
  },
  {
    title: "Enterprise governance",
    description: "Monitoring, oversight, and documented security processes.",
  },
  {
    title: "SOC 2 compliance",
    description: "RosterLab is SOC 2 compliant.",
  },
];

// Line-art tiles for what the section claims. SOC 2 is the only
// certification; the rest are capabilities listed above.
const SECURITY_BADGES: { label: string; icon?: IconType }[] = [
  { label: "SOC 2" },
  { label: "AWS", icon: LuCloud },
  { label: "SSO", icon: LuKeyRound },
  { label: "MFA", icon: LuFingerprint },
  { label: "Role-based access", icon: LuUsers },
];

const IMPLEMENTATION: Benefit[] = [
  {
    icon: HiUserGroup,
    title: "Hands-on implementation",
    description:
      "Our rostering specialists take the time to understand your clinical rostering practices, tailoring RosterLab to how your teams operate.",
  },
  {
    icon: HiAcademicCap,
    title: "Training and enablement",
    description:
      "We equip roster managers and department leaders with the knowledge they need to use RosterLab with confidence.",
  },
  {
    icon: HiSupport,
    title: "Dedicated customer success",
    description:
      "Receive priority enterprise support and expert guidance with a dedicated customer success manager by your side.",
  },
];

// Titles, summaries and images are each story's own published metadata.
const STORIES = [
  {
    tag: "Case study",
    title: "Sydney Hospital Saves 300+ Hours With AI",
    description:
      "See how a Sydney Tertiary Hospital Emergency Department reduced manual rostering by 300 hours with RosterLab’s AI rostering software.",
    href: "/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering",
    image:
      "https://cdn.sanity.io/images/el2jjtjd/production/207aa931d8495f1f6fb7ce76a40a218937ec146a-640x424.jpg",
  },
  {
    tag: "Newsroom",
    title: "Royal Perth Hospital Partners on AI Rosters",
    description:
      "Royal Perth Hospital partners with RosterLab to deliver AI rostering for AMU & ICU, improving shift fairness, compliance, & continuity of patient care.",
    href: "/newsroom/hospital-in-perth-partners-with-rosterlab-for-smarter-rosters",
    image:
      "https://cdn.sanity.io/images/el2jjtjd/production/aca53d542d2c5b2599f66b41712322f6acec45bd-640x427.jpg",
  },
  {
    tag: "Case study",
    title: "Auckland Radiology Boosts Staff Retention",
    description:
      "An Auckland radiology department reduces roster time from 120 hours to just 8 using RosterLab, achieving full staffing for the first time in 28 years.",
    href: "/case-studies/radiology-department-auckland",
    image:
      "https://cdn.sanity.io/images/el2jjtjd/production/0fad2d02c97c42ec12755f8e9390c7fc6f4726c3-640x427.jpg",
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

/** Small spot illustrations for the outcome cards. */
function OutcomeArt({ kind }: { kind: (typeof OUTCOMES)[number]["art"] }) {
  const common = {
    "aria-hidden": true,
    className: "h-24 w-32",
    viewBox: "0 0 128 96",
    fill: "none",
  } as const;
  if (kind === "bars")
    return (
      <svg {...common}>
        {[20, 40, 60, 80].map((y) => (
          <line
            key={y}
            x1="16"
            x2="112"
            y1={y}
            y2={y}
            stroke="#CBD5E1"
            strokeDasharray="3 3"
          />
        ))}
        <rect x="34" y="12" width="24" height="76" rx="3" fill="#CBD5E1" />
        <rect x="70" y="76" width="24" height="12" rx="3" fill="#2563EB" />
      </svg>
    );
  if (kind === "clock")
    return (
      <svg {...common}>
        <circle cx="64" cy="48" r="36" fill="#DBEAFE" />
        <circle
          cx="64"
          cy="48"
          r="28"
          fill="#fff"
          stroke="#2563EB"
          strokeWidth="4"
        />
        <path
          d="M64 32v16l11 8"
          stroke="#2563EB"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "coins")
    return (
      <svg {...common}>
        {[66, 52, 38, 24].map((y, i) => (
          <g key={y}>
            <rect
              x="34"
              y={y}
              width="60"
              height="12"
              fill={i === 0 ? "#fff" : "#2563EB"}
              stroke={i === 0 ? "#94A3B8" : "#1D4ED8"}
            />
            <ellipse
              cx="64"
              cy={y}
              rx="30"
              ry="8"
              fill={i === 0 ? "#fff" : "#60A5FA"}
              stroke={i === 0 ? "#94A3B8" : "#1D4ED8"}
            />
          </g>
        ))}
      </svg>
    );
  return (
    <svg {...common}>
      {[24, 48, 72].map((y) => (
        <line
          key={y}
          x1="16"
          x2="112"
          y1={y}
          y2={y}
          stroke="#CBD5E1"
          strokeDasharray="3 3"
        />
      ))}
      <path
        d="M18 70 L46 58 L70 62 L108 26"
        stroke="#2563EB"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="108" cy="26" r="5" fill="#2563EB" />
    </svg>
  );
}

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
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
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

function IconCard({ item }: { item: Benefit }) {
  const Icon = item.icon;
  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50"
      >
        <Icon className="h-6 w-6 text-blue-600" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-gray-900">{item.title}</h3>
      <p className="mt-2 text-gray-600 leading-relaxed">{item.description}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function EnterprisePage() {
  return (
    <SiteLayout>
      <SolutionHero
        title="Enterprise healthcare rostering software, powered by AI"
        description="Roster your entire clinical workforce on one secure platform. Control labour and staffing costs, strengthen compliance, and deploy your clinicians where they’re needed most."
        bullets={[]}
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
        image={{
          src: "/images/updated-hero/auto-scheduling.webp",
          alt: "A clinician generating a compliant roster in RosterLab",
        }}
      />

      <TrustedByDualRow heading="Trusted by leading hospitals and health systems" />

      {/* 1 — Strategic advantage */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Turn rostering into a strategic advantage"
            description="RosterLab brings hospital teams, departments and services together on one intelligent AI rostering platform, helping large healthcare organisations lift workforce productivity, coordinate staffing at scale, and operate with greater resilience."
          />
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-slate-50 px-6 py-6 text-center">
            <p className="font-semibold text-gray-900">
              Built for complex healthcare organisations:
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-3">
              {ORG_TYPES.map((type) => (
                <li
                  key={type}
                  className="rounded-xl bg-slate-200/60 px-5 py-2.5 font-medium text-gray-800"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 2 — ROI */}
      <section className="py-20 md:py-24">
        <Container>
          <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight">
            <span className="block text-blue-600">Proven outcomes</span>
            <span className="block text-gray-900">
              for clinical environments
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg text-gray-600 leading-relaxed">
            See what enterprise healthcare organisations are achieving with
            RosterLab.
          </p>

          {/* Quote card on the left, the four outcomes as a 2x2 beside it. */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <figure className="flex flex-col justify-between col-span-2 rounded-2xl border border-blue-200 bg-blue-100 p-8 lg:row-span-2 md:p-10">
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 leading-snug">
                &ldquo;Rostering would take 7-8 days, now it takes 2-3 hours,
                allowing me to focus more on patient care.&rdquo;
              </blockquote>
              <figcaption className="mt-10 flex items-end justify-between gap-6">
                <span className="text-sm">
                  <span className="block font-semibold text-gray-900">
                    Mike
                  </span>
                  <span className="block text-gray-600">
                    Associate Clinical Manager Radiology
                  </span>
                </span>
                <Image
                  src="/images/logos/whanganui-mark.webp"
                  alt="Te Whatu Ora Whanganui"
                  width={186}
                  height={72}
                  className="h-12 w-auto shrink-0"
                />
              </figcaption>
            </figure>

            {OUTCOMES.map((o) => (
              <div
                key={o.stat}
                className="flex flex-col items-center justify-between rounded-2xl border border-gray-200 bg-slate-50 p-4 text-center sm:p-6"
              >
                <p className="text-sm text-gray-700 leading-snug">
                  <span className="font-semibold text-blue-600">
                    {o.highlight}
                  </span>
                  {o.rest}
                </p>
                <div className="my-4">
                  <OutcomeArt kind={o.art} />
                </div>
                <p className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-blue-600">
                  {o.stat}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              href="/tools/roi-calculator"
              className="inline-flex items-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700"
              analyticsLabel="Calculate your ROI"
              analyticsLocation={LOCATION}
              analyticsProperties={{
                cta_type: "roi_calculator",
                page_name: "Enterprise",
                section: "roi",
              }}
            >
              Calculate your ROI
            </Button>
          </div>

          {/* Newsroom callout */}
          <Link
            href={NEWSROOM.href}
            className="group mx-auto mt-12 flex max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md sm:flex-row"
          >
            <div className="relative aspect-[2/1] w-full shrink-0 bg-slate-100 sm:aspect-auto sm:w-64">
              <Image
                src={NEWSROOM.image}
                alt=""
                fill
                sizes="(min-width: 640px) 256px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Newsroom
              </span>
              <span className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
                {NEWSROOM.title}
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                Read the announcement
                <HiArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {/* 3 — Benefits */}
      <section className="bg-slate-100 py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
              Better workforce outcomes across your organisation
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="rounded-xl bg-white p-6">
                  <Icon aria-hidden="true" className="h-6 w-6 text-gray-700" />
                  <h3 className="mt-8 text-lg md:text-xl font-medium text-gray-900 leading-snug">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4 — Key enterprise features */}
      <section className="py-20 md:py-24">
        <Container>
          <SectionHeading title="One rostering platform for every clinical team" />
          <div className="mt-16 space-y-20 lg:space-y-28">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    {f.tag}
                  </p>
                  <h3 className="mt-3 text-3xl md:text-4xl font-medium text-gray-900 leading-tight tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                    {f.description}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src={f.image.src}
                    alt={f.image.alt}
                    width={f.image.width}
                    height={f.image.height}
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className={`h-auto w-auto rounded-xl ${f.image.className ?? "max-h-80 drop-shadow-xl"}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-lg font-semibold text-gray-900">
              See RosterLab in action.
            </p>
            <Button
              href="/book-a-demo"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700"
              analyticsLabel="Book a demo"
              analyticsLocation={LOCATION}
              analyticsProperties={{
                cta_type: "demo",
                page_name: "Enterprise",
                section: "features",
              }}
            >
              Book a demo
              <HiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* 5 — Testimonials (swipeable on mobile, arrows on desktop). The
          carousel's band is translucent, so the faint dot grid behind it
          shows through, as on the home page. */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle,rgba(55,121,221,0.18)_1px,transparent_1px)] bg-[length:22px_22px]"
        />
        <div className="relative">
          <TestimonialsNew />
        </div>
      </div>

      {/* 6 — Security & privacy */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.1] tracking-tight">
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
              {SECURITY_POINTS.map((point) => (
                <li key={point.title} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-xl md:text-2xl font-medium text-gray-900">
                      {point.title}
                    </h3>
                    <LuMinus
                      aria-hidden="true"
                      className="mt-2 h-4 w-4 shrink-0 text-gray-400"
                    />
                  </div>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-16 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-5">
            {SECURITY_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <li key={badge.label} className="text-center">
                  <div className="flex aspect-square items-center justify-center rounded-xl bg-slate-100">
                    {Icon ? (
                      <span className="flex h-14 w-14 items-center justify-center rounded-xl border-[1.5px] border-gray-500 sm:h-24 sm:w-24 sm:rounded-2xl lg:h-28 lg:w-28">
                        <Icon
                          aria-hidden="true"
                          className="h-7 w-7 text-gray-600 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                          strokeWidth={1.25}
                        />
                      </span>
                    ) : (
                      // SOC 2: a line-drawn shield with the mark inside.
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 100 116"
                        className="h-16 w-14 sm:h-28 sm:w-24 lg:h-32 lg:w-28"
                        fill="none"
                      >
                        <path
                          d="M50 4 L94 20 V56 C94 84 74 102 50 112 C26 102 6 84 6 56 V20 Z"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <text
                          x="50"
                          y="52"
                          textAnchor="middle"
                          fontSize="20"
                          fill="#374151"
                        >
                          SOC
                        </text>
                        <text
                          x="50"
                          y="76"
                          textAnchor="middle"
                          fontSize="20"
                          fill="#374151"
                        >
                          2
                        </text>
                      </svg>
                    )}
                  </div>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500 sm:text-xs">
                    {badge.label}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 7 — Implementation & support */}
      <section className="bg-gray-50 py-20">
        <Container>
          <SectionHeading
            title="Implementation backed by healthcare rostering expertise"
            description="From initial setup to ongoing optimisation, we help your organisation get up and running smoothly, so you can start seeing improvements from the very first roster."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {IMPLEMENTATION.map((item) => (
              <IconCard key={item.title} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* 8 — Customer stories */}
      <section className="py-20">
        <Container>
          <SectionHeading title="Customer stories" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STORIES.map((story) => (
              <Link
                key={story.href}
                href={story.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[3/2] w-full bg-slate-100">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {story.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
                    {story.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600 leading-relaxed">
                    {story.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    Read more
                    <HiArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 9 — FAQ */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              title="Frequently asked questions"
              description="Everything you need to know about RosterLab for enterprise."
              className="mb-12"
            />
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </Container>
      </section>

      {/* 10 — Ending CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              A better way forward for your workforce
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              See how RosterLab can deliver better rostering outcomes across
              your organisation.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                href="/book-a-demo"
                className="bg-white px-8 py-4 text-lg text-blue-600 hover:bg-gray-100"
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
                className="border-2 border-white bg-transparent px-8 py-4 text-lg text-white hover:bg-white hover:text-blue-600"
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
        </Container>
      </section>

      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Enterprise" }]}
      />
    </SiteLayout>
  );
}
