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
    title: "Veterinary Rostering Software - RosterLab",
    description:
      "Streamline veterinary clinic scheduling with AI-powered rostering. Create fair, efficient rosters that improve staff wellbeing, compliance & saves time.",
    alternates: {
      canonical: "https://rosterlab.com/industries/veterinary",
    },
    openGraph: {
      title: "Veterinary Rostering Software - RosterLab",
      description:
        "Streamline veterinary clinic scheduling with AI-powered rostering. Create fair, efficient rosters that improve staff wellbeing, compliance & saves time.",
      type: "website",
      url: "https://rosterlab.com/industries/veterinary",
      images: [
        {
          url: "/images/updated-hero/vet.jpg",
          width: 1200,
          height: 630,
          alt: "Veterinary workforce scheduling with RosterLab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Veterinary Rostering Software - RosterLab",
      description:
        "Streamline veterinary clinic scheduling with AI-powered rostering. Create fair, efficient rosters that improve staff wellbeing, compliance & saves time.",
      images: ["/images/updated-hero/vet.jpg"],
    },
  },
  "/industries/veterinary",
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
      "RosterLab has transformed how we manage our veterinary staff. We can now create rosters in minutes that used to take hours.",
    author: "Sarah Mitchell",
    company: "Veterinary Practice Manager",
  },
  {
    quote:
      "The ability to balance emergency coverage with regular appointments has made our clinic run so much smoother.",
    author: "Dr. James Peterson",
    company: "Senior Veterinarian",
  },
  {
    quote:
      "Our team loves the mobile app - they can swap shifts and see their schedules instantly.",
    author: "Emma Chen",
    company: "Veterinary Nurse Coordinator",
  },
];

export default async function VeterinaryPage() {
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const caseStudies = await client.fetch(recentCaseStudiesQuery);
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-teal-50 py-8 sm:py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #059669 0%, #10b981 35%, #34d399 65%, #6ee7b7 100%)",
                  }}
                >
                  Veterinary Rostering
                </span>{" "}
                Software for Clinics
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                Less time rostering, more time caring for animals. We specialise
                in veterinary clinic rosters, no matter how complex.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/book-a-demo"
                  className="bg-green-600 text-white hover:bg-green-700 hover:-translate-y-1 transform transition-all duration-200 hover:shadow-lg"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/tools/roi-calculator"
                  className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 hover:-translate-y-1 transform transition-all duration-200 hover:shadow-lg"
                >
                  View ROI Calculator
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
                    Built for veterinary clinics
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
                src="/images/illustration/vets.svg"
                alt="Veterinary workforce scheduling dashboard"
                width={600}
                height={400}
                className="block w-full h-auto max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-teal-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transform Your Veterinary Operations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Empower your veterinary teams with AI-driven rostering that saves
              time, ensures coverage, and improves staff wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - App Screenshot */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-teal-100 rounded-3xl transform rotate-3"></div>
              <div className="relative">
                <Image
                  src="/images/generating.webp"
                  alt="RosterLab veterinary platform showing AI-powered rostering"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-green-500"
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
                        100% Coverage Guaranteed
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Ensures optimal staffing across all shifts and
                        emergencies
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Reduce Burnout
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Enhance overall work-life balance and minimise burnout for
                      your vets.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-teal-600"
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
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Improve Staffing Level Accuracy
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Understand your staffing levels better and how many people
                      are required for each role.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
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
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Meet More Staff Preferences
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Help vets achieve better work-life balance by considering
                      a high percentage of staff preferences whilst ensuring
                      critical business needs are met.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-purple-600"
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
                      24/7 Emergency Coverage
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Automatically manage after-hours and emergency on-call
                      rotations while ensuring fair distribution.
                    </p>
                  </div>
                </div>

                {/* Benefit 5 */}
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
                      Better utilise staff hours to reduce overtime and ensure
                      proper skill coverage across all procedures and
                      appointments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/solutions/ai-roster-generator"
                  className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Veterinary Rostering
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Powerful features designed specifically for veterinary clinics to
              manage complex scheduling needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/feature/automated-rostering"
              className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-500"
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
                requirements for your veterinary team.
              </p>
              <div className="flex items-center text-green-600 font-medium">
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
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-teal-500"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Skill Mix Management
              </h3>
              <p className="text-gray-600">
                Ensure every shift has the right skills present by creating
                rules to ensure a balanced mix of skills is present on your
                roster.
              </p>
            </div>

            <Link
              href="/feature/open-shifts"
              className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-500"
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
                Optimise veterinary, nursing, and support staff across all
                appointments and procedures.
              </p>
              <div className="flex items-center text-green-600 font-medium">
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
                Staff can view schedules, request leave, accept open shifts and
                manage swaps from any device.
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
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
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
                Better-quality rosters, self rostering, and better work-life
                balance for your veterinary team.
              </p>
              <div className="flex items-center text-green-600 font-medium">
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

      {/* Key Statistics */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
              Paw-sitive Workforce Excellence
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="text-center">
                <div className="mb-4">
                  <span className="block text-5xl font-bold text-green-600 mb-2">
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
                  <span className="block text-5xl font-bold text-teal-600 mb-2">
                    100%
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    Coverage Guarantee
                  </span>
                </div>
                <p className="text-gray-600">
                  Ensure all shifts and emergency coverage are properly staffed
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
                className="bg-green-600 text-white hover:bg-green-700 px-8 py-3"
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

      {/* Success Story */}
      <HealthcareTestimonials testimonials={testimonials} />

      {/* Trusted By */}
      <TrustedBy />

      {/* Central Message - Full Width */}
      <div
        className="py-16 text-center"
        style={{
          background:
            "linear-gradient(90deg, #059669 0%, #10b981 35%, #34d399 65%, #6ee7b7 100%)",
        }}
      >
        <Container>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Better Animal Care, Happier Staff.
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            When veterinary professionals spend less time on administrative
            tasks, they can focus on what matters most - delivering exceptional
            animal care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/book-a-demo"
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-200"
            >
              Schedule a Veterinary Demo
            </Button>
            <Button
              href="/solutions/ai-roster-generator"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-6 py-3 font-semibold hover:shadow-xl hover:-translate-y-1 transform transition-all duration-200"
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
          { name: "Veterinary" },
        ]}
      />
    </SiteLayout>
  );
}
