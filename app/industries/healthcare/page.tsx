import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedBy from "@/components/sections/TrustedBy";
import Link from "next/link";
import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import { validatedToken } from "@/sanity/lib/token";
import { urlFor } from "@/sanity/lib/client";
import HealthcareTestimonials from "@/components/sections/HealthcareTestimonials";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Rostering Software for Healthcare - RosterLab",
    description:
      "Learn how our rostering software simplifies staff scheduling in healthcare. Create fair, efficient rosters that improve patient care, compliance & saves time.",
    alternates: {
      canonical: "https://rosterlab.com/industries/healthcare",
    },
    openGraph: {
      title: "Rostering Software for Healthcare - RosterLab",
      description:
        "Learn how our rostering software simplifies staff scheduling in healthcare. Create fair, efficient rosters that improve patient care, compliance & saves time.",
      type: "website",
      url: "https://rosterlab.com/industries/healthcare",
      images: [
        {
          url: "/images/og-images/IndustryHealthcare.png",
          width: 1200,
          height: 630,
          alt: "Healthcare workforce scheduling with RosterLab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rostering Software for Healthcare - RosterLab",
      description:
        "Learn how our rostering software simplifies staff scheduling in healthcare. Create fair, efficient rosters that improve patient care, compliance & saves time.",
      images: ["/images/og-images/IndustryHealthcare.png"],
    },
  },
  "/industries/healthcare",
);

// Query for the 3 most recent case studies
const recentCaseStudiesQuery = groq`
  *[_type == "post" && "case-studies" in categories[]->slug.current] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`;

const testimonials = [
  {
    quote:
      "It's not just about saving hours. It's about confidence in the roster, about fairness, and about giving senior clinicians time back for patient care - not spreadsheets.",
    author: "Emergency Physician",
    company: "South Eastern Sydney Area Health Services",
  },
  {
    quote:
      "Rostering would take 7-8 days, now it takes 2-3 hours…allowing me to focus more on patient care.",
    author: "Mike",
    company: "Associate Clinical Manager Radiology",
  },
  {
    quote:
      "RosterLab has saved me countless hours... I have recommended this service to everyone I know who writes medical rosters!",
    author: "Peter",
    company: "Senior Registrar ICU, Western Australia",
  },
  {
    quote:
      "If Rosterlab can help with our complicated rostering needs, we are confident it will work for anyone.",
    author: "Judy Harris",
    company: "Practice Manager, Dargaville Hospital",
  },
  {
    quote:
      "We wanted more continuity of care built into the rosters, and RosterLab was easily able to incorporate that into the rosters they generated for us.",
    author: "Rebecca",
    company: "Staff Specialist Neonatologist, RPA Newborn Care",
  },
  {
    quote:
      "Since using RosterLab, I've felt that the rosters are better for my circadian rhythm, with less up-and-down cycling.",
    author: "Anthea",
    company: "MIT, Hawke's Bay Hospital",
  },
];

export default async function HealthcarePage() {
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const caseStudies = await client.fetch(recentCaseStudiesQuery);
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 sm:py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                  }}
                >
                  Healthcare Rostering
                </span>{" "}
                Software for Teams
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                Less time rostering, more time caring for patients. We
                specialise in all types of healthcare rosters, no matter how
                complex.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 transform transition-all duration-200 hover:shadow-lg"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/contact"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:-translate-y-1 transform transition-all duration-200 hover:shadow-lg"
                >
                  Learn More
                </Button>
              </div>

              {/* Feature Ticks */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Made for healthcare and complex industries
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    AI-generated rosters in seconds
                  </span>
                </div>
              </div>
            </div>
            <div className="relative mt-6 lg:mt-0">
              <Image
                src="/images/doctors.svg"
                alt="Healthcare workforce scheduling dashboard"
                width={600}
                height={400}
                className="block w-full h-auto max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* Core Features */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Healthcare Rostering
            </h2>
            {/* <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive features designed specifically for healthcare
              workforce management
            </p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/feature/automated-rostering"
              className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Automatically Generate Rosters
              </h3>
              <p className="text-gray-600 mb-3">
                Create optimal schedules in minutes using AI that balances all
                requirements.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                Learn more
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            <div className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-sky-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Union Compliant
              </h3>
              <p className="text-gray-600">
                Automatically enforce union rules, skill mix, and fairness
                requirements.
              </p>
            </div>

            <Link
              href="/feature/open-shifts"
              className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Better Staffing Coverage
              </h3>
              <p className="text-gray-600 mb-3">
                Optimise all the staffing intricacies for better coverage for
                your hospitals.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                Learn more
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            <Link
              href="/solutions/staff-roster-mobile-app"
              className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mobile Access & Notifications
              </h3>
              <p className="text-gray-600 mb-3">
                Staff can view schedules, make preferences, request leave,
                accept open shifts and manage swaps from any device.
              </p>
              <div className="flex items-center text-cyan-600 font-medium">
                Learn more
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            <Link
              href="/feature/re-rostering"
              className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Re-rostering
              </h3>
              <p className="text-gray-600 mb-3">
                Handle last-minute changes with minimal disruption during sick
                calls or emergencies.
              </p>
              <div className="flex items-center text-indigo-600 font-medium">
                Learn more
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            <Link
              href="/feature/self-scheduling"
              className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Higher Staff Retention
              </h3>
              <p className="text-gray-600 mb-3">
                Better-quality rosters, self rostering, reduced bias perception,
                and better work-life balance.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                Learn more
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transform Your Healthcare Operations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Empower your healthcare teams with AI-driven rostering that saves
              time, ensures compliance, and improves staff wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - App Screenshot */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-sky-100 rounded-3xl transform rotate-3"></div>
              <div className="relative">
                <Image
                  src="/images/generating.webp"
                  alt="RosterLab healthcare platform showing AI-powered rostering"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        100% Rules Compliance
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Ensures optimal staffing coverage while meeting all
                        regulations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div>
              <div className="space-y-6">
                {/* Benefit 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Focus on Patient Care
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Create fair rosters that respect preferences and work-life
                      balance. Transparent rostering boosts staff retention and
                      engagement, leading to better patient care.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-sky-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Compliant with Rules
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Automatically enforce union agreements, fairness, and
                      fatigue management rules, ensuring clinical safety and
                      continuity of care.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Improve Operational Efficiency
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Better utilise ordinary hours to reduce unnecessary
                      overtime and locums, and ensure higher skill coverage.
                      Optimise your current staffing with better efficiency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/solutions/ai-roster-generator"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Healthcare Verticals */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tailored Solutions for Every Department
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built rostering for the unique needs of each healthcare
              specialty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ICU/ED Card */}
            <Link href="/industries/healthcare/ed-icu" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/icu/pexels-shvetsa-4483340.jpg"
                    alt="ICU and Emergency Department"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    ICU & Emergency Departments
                  </h3>
                  <p className="text-gray-600 mb-3">
                    24/7 critical care coverage with skill mix optimisation and
                    surge capacity planning.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Radiology Card */}
            <Link href="/industries/healthcare/radiology" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/radiology/accuray-5VkNa1LrS8A-unsplash.jpg"
                    alt="Radiology Department"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    Radiology Departments
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Subspecialty coverage with equipment coordination and
                    reading room optimisation.
                  </p>
                  <div className="flex items-center text-teal-600 font-medium">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Aged Care Card */}
            <Link href="/industries/healthcare/aged-care" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/aged care/pexels-matthiaszomer-339620.jpg"
                    alt="Aged Care Facilities"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Aged Care Facilities
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Resident-focused scheduling with care level matching and
                    compliance assurance.
                  </p>
                  <div className="flex items-center text-purple-600 font-medium">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Departments */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              All Healthcare Departments
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link
                href="/industries/healthcare/nurse-rostering"
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-blue-500 transition-transform duration-200 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* Nurse hat */}
                    <path
                      d="M3 9l9-5 9 5v4c0 5.5-3.5 8.5-9 9-5.5-.5-9-3.5-9-9V9z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    {/* Medical cross */}
                    <path
                      d="M10 8h4v3h3v4h-3v3h-4v-3H7v-4h3V8z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Nurses</h4>
              </Link>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-blue-600 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Pharmacy</h4>
              </div>
              <Link
                href="/industries/healthcare/pathology-rostering"
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-sky-500 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Pathology</h4>
              </Link>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-cyan-600 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Allied Health</h4>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-indigo-500 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>

                <h4 className="font-semibold text-gray-900">
                  Large Medical Clinics
                </h4>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-pink-500 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3C13.66 3 15 4.34 15 6C15 7.66 13.66 9 12 9C10.34 9 9 7.66 9 6C9 4.34 10.34 3 12 3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11C16 11 14 9 12 9C10 9 8 11 8 11C6 13 5 14 5 16C5 18 6 20 8 21H16C18 20 19 18 19 16C19 14 18 13 16 11Z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Maternity Wards</h4>
              </div>
              <Link
                href="/industries/healthcare/veterinary-rostering"
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-sky-500 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Veterinary Clinics
                </h4>
              </Link>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-green-500 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  General Medicine
                </h4>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-purple-500 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Mental Health Services
                </h4>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-blue-500 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C10 2 8 3 8 5C8 6 7 7 7 8C7 9 8 10 8 11C8 12 7 13 7 14C7 15 7 16 8 17L10 22L12 22L14 22L16 17C17 16 17 15 17 14C17 13 16 12 16 11C16 10 17 9 17 8C17 7 16 6 16 5C16 3 14 2 12 2Z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Dental Chains</h4>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-blue-600 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2L12 12M12 12L20 20M12 12L4 20M4 20C3 21 3 22 4 22C5 22 6 21 7 20C8 19 9 18 10 17M20 20C21 21 21 22 20 22C19 22 18 21 17 20C16 19 15 18 14 17"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Operating Theatres
                </h4>
              </div>
              <Link
                href="/industries/healthcare/junior-medical-officer-rostering"
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-red-500 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Junior Medical Officers
                </h4>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Key Statistics */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
              Healthcare Workforce Excellence
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="text-center">
                <div className="mb-4">
                  <span className="block text-5xl font-bold text-blue-600 mb-2">
                    90%
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    Less Admin Time
                  </span>
                </div>
                <p className="text-gray-600">
                  Reduce rostering from days to minutes with AI automation
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <span className="block text-5xl font-bold text-sky-600 mb-2">
                    100%
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    Union Compliance
                  </span>
                </div>
                <p className="text-gray-600">
                  Meet all regulatory requirements and union agreements
                  automatically
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <span className="block text-5xl font-bold text-green-600 mb-2">
                    ~10%
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    Higher Efficiency
                  </span>
                </div>
                <p className="text-gray-600">
                  Reduce staff turnover and improve retention with better
                  staffing
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button
                href="/solutions/ai-roster-generator"
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3"
              >
                Explore AI Rostering Features
                <svg
                  className="w-5 h-5 ml-2 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories in Healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how healthcare organizations are transforming their workforce
              management with RosterLab
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {caseStudies.map((post: any) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <Link
                  href={`/case-studies/${post.slug.current}`}
                  className="block"
                >
                  <div className="relative h-48 overflow-hidden group">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage)
                          .width(400)
                          .height(200)
                          .url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                        <svg
                          className="w-24 h-24 text-white/20"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="text-blue-600 font-medium hover:underline inline-flex items-center">
                      Read case study
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* View all case studies CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              View all case studies
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* Success Story */}
      <HealthcareTestimonials testimonials={testimonials} />

      {/* ROI Calculator CTA */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              See Your Potential Savings
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Calculate how much time and money you could save with automated
              rostering
            </p>
            <Button
              href="/tools/roi-calculator"
              className="inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-full font-medium transition-all text-lg shadow-lg hover:shadow-xl"
            >
              View ROI calculator
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </Container>
      </section>

      {/* Central Message - Full Width */}
      <div
        className="py-16 text-center"
        style={{
          background:
            "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
        }}
      >
        <Container>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Better Patient Care, Happier Staff.
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            When healthcare professionals spend less time on administrative
            tasks, they can focus on what matters most - delivering exceptional
            patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/book-a-demo"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-200"
            >
              Schedule a Healthcare Demo
            </Button>
            <Button
              href="/solutions/ai-roster-generator"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 font-semibold hover:shadow-xl hover:-translate-y-1 transform transition-all duration-200"
            >
              Learn more about AI rostering
            </Button>
          </div>
        </Container>
      </div>

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: "Healthcare" },
        ]}
      />
    </SiteLayout>
  );
}
