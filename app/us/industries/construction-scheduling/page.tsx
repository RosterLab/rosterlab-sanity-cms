import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import Link from "next/link";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Construction Scheduling Software - RosterLab",
    description:
      "Streamline construction workforce scheduling with AI. Coordinate contractors, subcontractors, and trades across multiple project sites for on-time delivery.",
    alternates: {
      canonical: "https://rosterlab.com/us/industries/construction-scheduling",
    },
    openGraph: {
      title: "Construction Scheduling Software - RosterLab",
      description:
        "Streamline construction workforce scheduling with AI. Coordinate contractors, subcontractors, and trades across multiple project sites for on-time delivery.",
      type: "website",
      url: "https://rosterlab.com/us/industries/construction-scheduling",
      images: [
        {
          url: "/images/construction-scheduling.jpg",
          width: 1200,
          height: 630,
          alt: "Construction workforce scheduling with RosterLab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Construction Scheduling Software - RosterLab",
      description:
        "Streamline construction workforce scheduling with AI. Coordinate contractors, subcontractors, and trades across multiple project sites for on-time delivery.",
      images: ["/images/construction-scheduling.jpg"],
    },
  },
  "/us/industries/construction-scheduling",
);

export default function ConstructionPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-8 sm:py-12 md:py-16">
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
                  Construction Scheduling
                </span>{" "}
                Software for Teams
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                Coordinate contractors, subcontractors, and trades across
                multiple sites with intelligent AI scheduling for on-time
                project delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/us/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 transform transition-all duration-200 hover:shadow-lg"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/us/pricing"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:-translate-y-1 transform transition-all duration-200 hover:shadow-lg"
                >
                  View Pricing
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
                    Made for construction and complex projects
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
                    AI-generated schedules in seconds
                  </span>
                </div>
              </div>
            </div>
            <div className="relative mt-6 lg:mt-0">
              <Image
                src="/images/construction.jpg"
                alt="Construction workforce scheduling dashboard"
                width={600}
                height={400}
                className="block w-full h-auto max-w-md mx-auto lg:max-w-full rounded-lg"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="pt-1.5 lg:pt-8 pb-12 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2
              className="font-semibold text-neutral-700 mb-8"
              style={{ fontSize: "23px" }}
            >
              Trusted by global teams with complex scheduling
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/logos/whanganui.png"
                  alt="Whanganui"
                  width={120}
                  height={60}
                  className="max-w-full h-auto grayscale"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/logos/department-of-health-western-australia.png"
                  alt="Department of Health Western Australia"
                  width={202}
                  height={86}
                  className="max-w-full h-auto grayscale"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/logos/rpa.png"
                  alt="RPA"
                  width={160}
                  height={80}
                  className="max-w-full h-auto grayscale"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/logos/hawkesbay.png"
                  alt="Hawkes Bay"
                  width={160}
                  height={50}
                  className="max-w-full h-auto grayscale"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/logos/nsw-south-eastern.png"
                  alt="NSW South Eastern"
                  width={152}
                  height={40}
                  className="max-w-full h-auto grayscale"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/logos/royal-flying-doctor.png"
                  alt="Royal Flying Doctor Service"
                  width={88}
                  height={38}
                  className="max-w-full h-auto grayscale"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transform Your Construction Workforce Management
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Handle the unique complexities of construction scheduling with
              AI-driven coordination across contractors, trades, and project
              sites.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - App Screenshot */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-orange-100 rounded-3xl transform rotate-3"></div>
              <div className="relative">
                <Image
                  src="/images/generating.webp"
                  alt="RosterLab construction platform showing AI-powered workforce scheduling"
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Multi-Site Coordination
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Manage contractors across multiple project sites
                        simultaneously
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
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Coordinate Multiple Contractors
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Bring together general contractors, subcontractors, and
                      specialist trades into one unified schedule. Manage
                      dependencies between electrical, plumbing, HVAC, and
                      structural work to keep projects on track.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Multi-Site Project Management
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Manage workforce allocation across multiple construction
                      sites simultaneously. Optimize resource utilization by
                      moving crews between projects based on progress stages and
                      priorities.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-orange-600"
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
                      Track Certifications & Licenses
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Ensure proper certification coverage for specialist work
                      including electrical licenses, crane operations, confined
                      space entry, height work permits, and trade
                      qualifications. Maintain site safety and compliance.
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
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Reduce Project Delays & Costs
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Optimize labor costs by reducing idle time, minimizing
                      crew conflicts, and ensuring right-sized teams for each
                      project phase. Better coordination means fewer delays and
                      penalty clauses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/us/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/us/contact"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Construction Verticals */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tailored Solutions for Every Construction Sector
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built scheduling for the unique needs of each construction
              discipline and project type.
            </p>
          </div>

          {/* All Construction Types */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              All Construction Disciplines
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-blue-500 transition-transform duration-200 group-hover:scale-110"
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
                  Commercial Building
                </h4>
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Residential Projects
                </h4>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-orange-500 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Infrastructure</h4>
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Industrial Construction
                </h4>
              </div>
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Renovation & Refit
                </h4>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-yellow-600 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Civil Engineering
                </h4>
              </div>
              <div className="text-center group cursor-pointer">
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
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Road & Bridge Work
                </h4>
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Specialist Contractors
                </h4>
              </div>
            </div>
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
            On-Time Projects, Safer Sites.
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            When construction managers spend less time on administrative tasks,
            they can focus on what matters most - delivering projects on time,
            on budget, and maintaining safe worksites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/us/book-a-demo"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-200"
            >
              Book a Construction Demo
            </Button>
            <Button
              href="/us/solutions/ai-staff-schedule-maker"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 font-semibold hover:shadow-xl hover:-translate-y-1 transform transition-all duration-200"
            >
              Learn more about AI scheduling
            </Button>
          </div>
        </Container>
      </div>

      {/* Hidden Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/us" },
          { name: "Industries", url: "/us/industries" },
          { name: "Construction" },
        ]}
      />
    </SiteLayout>
  );
}
