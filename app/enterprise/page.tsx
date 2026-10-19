import Container from "@/components/ui/Container";
import EnterpriseHero from "./EnterpriseHero";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import EnterpriseFAQ from "./EnterpriseFAQ";
import TestimonialsNew from "@/components/sections/TestimonialsNew";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { withHreflang } from "@/components/seo/HreflangTags";
// Phosphor icons, weighted so every line icon renders at roughly 2px:
// Regular at 24–32px, Light at 40px, Bold at 16–24px.
import {
  PiArrowRightBold,
  PiChartBar,
  PiClipboardTextLight,
  PiCurrencyCircleDollar,
  PiDeviceMobileLight,
  PiChalkboardTeacherBold,
  PiHeartbeat,
  PiHourglass,
  PiKeyLight,
  PiHandshakeBold,
  PiHeadsetBold,
  PiShieldCheck,
  PiSmiley,
  PiTimer,
  PiUserGearLight,
} from "react-icons/pi";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

// ISR: Revalidate every 1 hour (marketing page, rarely changes)
export const revalidate = 3600;

// Each section fills at least one desktop screen, content centred within it.
// Phones keep natural heights: a short section stretched to a tall screen is
// mostly empty space there.
const FULL_SCREEN = "lg:flex lg:min-h-svh lg:flex-col lg:justify-center";

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

const OUTCOMES: { stat: string; label: string; icon: IconType }[] = [
  { stat: "90%", label: "less time spent on rostering", icon: PiTimer },
  {
    stat: "320+",
    label: "hours saved annually by a tertiary hospital",
    icon: PiHourglass,
  },
  {
    stat: "15%",
    label: "lower labour costs achieved through roster optimisation",
    icon: PiCurrencyCircleDollar,
  },
  { stat: "10%", label: "improvement in staff satisfaction", icon: PiSmiley },
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

interface Feature {
  title: string;
  /** Leading words of the title drawn in brand blue. */
  highlight: string;
  description: string;
  // Stand-in product images until dedicated enterprise screenshots exist.
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Size override, e.g. for the wide Otto wordmark. */
    className?: string;
    /** A finished 4:3 artwork that fills the frame edge to edge. */
    fill?: boolean;
  };
}

const FEATURES: Feature[] = [
  {
    title: "AI-powered roster optimisation",
    highlight: "AI-powered",
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
      src: "/images/generating.webp",
      alt: "RosterLab's solution analysis chart of staffing levels across a roster period",
      width: 953,
      height: 557,
    },
  },
  {
    title: "Intelligent workforce insights",
    highlight: "Intelligent",
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

const SECURITY_POINTS = [
  "Cloud-based infrastructure (AWS) with robust encryption and security",
  "Single sign-on (SSO), multi-factor authentication (MFA), and role-based access control",
  "Enterprise governance: monitoring, oversight, and documented security processes",
  "SOC 2 compliance",
];

// One tile per security point, with the access-control point split into its
// three parts. Brand logo where there is one (AWS), line icons otherwise. SOC 2 (icon: null) draws its own shield badge.
const SECURITY_BADGES: { label: string; icon: IconType | null }[] = [
  { label: "SOC 2 compliance", icon: null },
  { label: "Cloud infrastructure (AWS)", icon: FaAws },
  { label: "Single sign-on (SSO)", icon: PiKeyLight },
  { label: "Multi-factor authentication (MFA)", icon: PiDeviceMobileLight },
  { label: "Role-based access control", icon: PiUserGearLight },
  { label: "Enterprise governance", icon: PiClipboardTextLight },
];

const IMPLEMENTATION: Benefit[] = [
  {
    icon: PiHandshakeBold,
    title: "Hands-on implementation",
    description:
      "Our rostering specialists take the time to understand your clinical rostering practices, tailoring RosterLab to how your teams operate.",
  },
  {
    icon: PiChalkboardTeacherBold,
    title: "Training and enablement",
    description:
      "We equip roster managers and department leaders with the knowledge they need to use RosterLab with confidence.",
  },
  {
    icon: PiHeadsetBold,
    title: "Dedicated customer success",
    description:
      "Receive priority enterprise support and expert guidance with a dedicated customer success manager by your side.",
  },
];

// Titles and images are each story's own published metadata.
const STORIES = [
  {
    title: "Sydney Hospital Saves 300+ Hours With AI",
    href: "/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering",
    image:
      "https://cdn.sanity.io/images/el2jjtjd/production/207aa931d8495f1f6fb7ce76a40a218937ec146a-640x424.jpg",
  },
  {
    title: "Royal Perth Hospital Partners on AI Rosters",
    href: "/newsroom/hospital-in-perth-partners-with-rosterlab-for-smarter-rosters",
    image:
      "https://cdn.sanity.io/images/el2jjtjd/production/aca53d542d2c5b2599f66b41712322f6acec45bd-640x427.jpg",
  },
  {
    title: "Auckland Radiology Boosts Staff Retention",
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

/**
 * Decorative accents for the feature images, in the brand teal, cyan and
 * blue. One per image, cycling, pinned to a corner of its frame.
 */
const ACCENTS = [
  // Waves
  <svg
    key="waves"
    aria-hidden="true"
    viewBox="0 0 96 36"
    className="h-9 w-24"
    fill="none"
  >
    {[6, 18, 30].map((y) => (
      <path
        key={y}
        d={`M2 ${y} q 7.5 -6 15 0 t 15 0 t 15 0 t 15 0 t 15 0 t 15 0`}
        stroke="#03F9BE"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    ))}
  </svg>,
  // Squiggle
  <svg
    key="squiggle"
    aria-hidden="true"
    viewBox="0 0 64 40"
    className="h-10 w-16"
    fill="none"
  >
    <path
      d="M4 30 c 8 -24 16 -24 14 -4 s 10 18 16 -2 s 12 -20 14 0 s 8 10 12 -6"
      stroke="#24D9DC"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>,
  // Dot arc
  <svg key="dots" aria-hidden="true" viewBox="0 0 72 72" className="h-16 w-16">
    {Array.from({ length: 5 }).flatMap((_, r) =>
      Array.from({ length: 5 }).map((_, c) =>
        r + c < 6 ? (
          <circle
            key={`${r}-${c}`}
            cx={6 + c * 14}
            cy={6 + r * 14}
            r="3"
            fill="#2563EB"
            opacity="0.5"
          />
        ) : null,
      ),
    )}
  </svg>,
  // Hatching
  <svg
    key="hatch"
    aria-hidden="true"
    viewBox="0 0 96 24"
    className="h-6 w-24"
    fill="none"
  >
    {Array.from({ length: 14 }).map((_, i) => (
      <path
        key={i}
        d={`M${4 + i * 6.5} 22 L${12 + i * 6.5} 2`}
        stroke="#03F9BE"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ))}
  </svg>,
];

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
        trustedHeading="Trusted by leading hospitals and health systems"
      />

      {/* 1 — Strategic advantage */}
      <section className={`py-20 ${FULL_SCREEN}`}>
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
                  className="rounded-xl bg-slate-200/60 px-5 py-2.5 font-semibold text-blue-700"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 2 — ROI */}
      <section className={`bg-slate-50 py-20 md:py-24 ${FULL_SCREEN}`}>
        <Container>
          <SectionHeading
            title="Proven outcomes for clinical environments"
            description="See what enterprise healthcare organisations are achieving with RosterLab."
          />

          <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => {
              const Icon = o.icon;
              return (
                <div
                  key={o.stat}
                  className="flex flex-col rounded-2xl bg-white p-7"
                >
                  <Icon aria-hidden="true" className="h-8 w-8 text-gray-900" />
                  <dt className="order-last mt-1 text-sm text-gray-600 leading-snug">
                    {o.label}
                  </dt>
                  <dd className="mt-8 text-4xl font-medium tracking-tight text-gray-900">
                    {o.stat}
                  </dd>
                </div>
              );
            })}
          </dl>

          <figure className="mt-4 grid grid-cols-1 gap-6 rounded-2xl bg-blue-100 p-8 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] md:items-end md:p-10">
            <div>
              <blockquote className="text-xl md:text-2xl font-medium text-gray-900 leading-snug">
                &ldquo;Rostering would take 7-8 days, now it takes 2-3 hours,
                allowing me to focus more on patient care.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="block font-semibold text-gray-900">Mike</span>
                <span className="block text-gray-600">
                  Associate Clinical Manager Radiology
                </span>
              </figcaption>
            </div>
            <Image
              src="/images/logos/whanganui-mark.webp"
              alt="Te Whatu Ora Whanganui"
              width={186}
              height={72}
              className="h-12 w-auto md:justify-self-end"
            />
          </figure>

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

          {/* Newsroom callout: image with a logo badge on the left, a soft
              panel on the right, opposite corners rounded. */}
          <Link
            href={NEWSROOM.href}
            className="group mx-auto mt-14 grid max-w-5xl grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            {/* The badge straddles the image's bottom-left corner, outside
                the clipped image so it stays clear of the artwork's text. */}
            <div className="relative">
              <div className="relative aspect-[16/10] h-full overflow-hidden rounded-t-[2.5rem] bg-slate-200 sm:aspect-auto sm:min-h-64 sm:rounded-none sm:rounded-bl-[3rem]">
                <Image
                  src={NEWSROOM.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 400px, 100vw"
                  className="object-cover"
                />
              </div>
              <span className="absolute -bottom-6 -left-3 z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white px-3 shadow-lg sm:-left-6 sm:h-28 sm:w-28">
                <Image
                  src="/images/logos/te-whatu-ora.webp"
                  alt="Health New Zealand Te Whatu Ora"
                  width={516}
                  height={114}
                  className="block h-auto w-[4.5rem] sm:w-20"
                />
              </span>
            </div>
            <div className="flex flex-col justify-center rounded-b-[2.5rem] bg-blue-50 p-8 sm:rounded-none sm:rounded-tr-[3rem] md:p-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Newsroom
              </span>
              <span className="mt-3 text-xl md:text-2xl font-semibold italic text-blue-950 leading-snug">
                {NEWSROOM.title}
              </span>
              <span className="mt-6 inline-flex items-center gap-1 self-start border-b-2 border-blue-600 pb-0.5 font-semibold text-blue-700 group-hover:text-blue-800">
                Read the announcement
                <PiArrowRightBold
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {/* 3 — Benefits */}
      <section className={`bg-slate-100 py-20 md:py-24 ${FULL_SCREEN}`}>
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
      <section className={`py-20 md:py-24 ${FULL_SCREEN}`}>
        <Container>
          <h2 className="max-w-3xl text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.1] tracking-tight">
            One rostering platform for every clinical team
          </h2>
          <div className="mt-16 space-y-20 lg:space-y-28">
            {FEATURES.map((f, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={f.title}
                  className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
                >
                  <div className={`lg:max-w-md ${flip ? "lg:order-2" : ""}`}>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight tracking-tight">
                      <span className="text-blue-600">{f.highlight}</span>
                      {f.title.slice(f.highlight.length)}
                    </h3>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                  {/* Frame with opposite corners rounded, mirrored on
                      alternate rows, and a brand accent off one corner. */}
                  <div className={`relative ${flip ? "lg:order-1" : ""}`}>
                    <div
                      className={`flex aspect-[4/3] items-center justify-center overflow-hidden bg-blue-50 ${f.image.fill ? "" : "p-6 md:p-10"} ${
                        flip
                          ? "rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-lg rounded-br-lg"
                          : "rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-lg rounded-bl-lg"
                      }`}
                    >
                      <Image
                        src={f.image.src}
                        alt={f.image.alt}
                        width={f.image.width}
                        height={f.image.height}
                        sizes="(min-width: 1024px) 700px, 100vw"
                        className={
                          f.image.fill
                            ? "h-full w-full object-cover"
                            : `h-auto max-h-full w-auto rounded-lg ${f.image.className ?? "shadow-lg"}`
                        }
                      />
                    </div>
                    <div
                      className={`absolute ${
                        flip ? "-top-5 -right-3" : "-bottom-4 left-8"
                      }`}
                    >
                      {ACCENTS[i % ACCENTS.length]}
                    </div>
                  </div>
                </div>
              );
            })}
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
              <PiArrowRightBold aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* 5 — Testimonials (swipeable on mobile, arrows on desktop). The
          carousel's band is translucent, so the faint dot grid behind it
          shows through, as on the home page. */}
      <div className={`relative ${FULL_SCREEN}`}>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle,rgba(55,121,221,0.18)_1px,transparent_1px)] bg-[length:22px_22px]"
        />
        <div className="relative">
          <TestimonialsNew />
        </div>
      </div>

      {/* 6 — Security & privacy */}
      <section className={`py-20 md:py-24 ${FULL_SCREEN}`}>
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
                <li
                  key={point}
                  className="py-6 first:pt-0 last:pb-0 text-lg md:text-xl font-medium text-gray-900 leading-snug"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Badge row, centred between two rules on desktop. The rules sit at
              the tiles' midline (half of the 6rem tile). */}
          <div className="mt-16 flex items-start gap-6">
            <span
              aria-hidden="true"
              className="mt-12 hidden h-px flex-1 bg-gray-300 lg:block"
            />
            <ul className="grid w-full grid-cols-3 gap-x-4 gap-y-6 md:grid-cols-6 lg:w-auto lg:grid-cols-[repeat(6,7rem)] lg:gap-x-4">
              {SECURITY_BADGES.map(({ label, icon: Icon }) => (
                <li key={label} className="flex flex-col items-center">
                  <div className="flex aspect-square w-full max-w-24 items-center justify-center rounded-xl bg-slate-100">
                    {Icon ? (
                      // Light weight at 40px gives a ~2px line, matching the
                      // SOC 2 shield below. (AWS is a filled mark.)
                      <Icon
                        aria-hidden="true"
                        className="h-10 w-10 text-gray-500"
                      />
                    ) : (
                      // SOC 2 badge: line-drawn stand-in until the official
                      // artwork is supplied.
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 100 116"
                        className="h-12 w-10 text-gray-500"
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
                  <span className="mt-3 max-w-28 text-center text-[11px] uppercase tracking-wider text-gray-500 leading-snug">
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

      {/* 7 — Implementation & support */}
      <section className={`bg-gray-50 py-20 md:py-24 ${FULL_SCREEN}`}>
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.1] tracking-tight">
              Implementation backed by healthcare rostering expertise
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed lg:pt-2">
              From initial setup to ongoing optimisation, we help your
              organisation get up and running smoothly, so you can start seeing
              improvements from the very first roster.
            </p>
          </div>
          <div className="mt-14 md:mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {IMPLEMENTATION.map(({ icon: Icon, title, description }) => (
              <div key={title}>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600"
                >
                  <Icon className="h-6 w-6 text-white" />
                </span>
                <h3 className="mt-5 text-lg md:text-xl font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8 — Customer stories */}
      <section className={`py-20 ${FULL_SCREEN}`}>
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug group-hover:text-blue-700">
                    {story.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 9 — FAQ */}
      <section className={`bg-slate-50 py-20 md:py-24 ${FULL_SCREEN}`}>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
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

      {/* 10 — Ending CTA */}
      <section
        className={`bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20 ${FULL_SCREEN}`}
      >
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
