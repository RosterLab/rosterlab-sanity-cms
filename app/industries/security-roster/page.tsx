import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import Link from "next/link";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Security Staff Rostering Software - RosterLab",
    description:
      "Learn how our rostering software simplifies staff scheduling in security. Create fair, efficient rosters that improve site safety, compliance & saves time.",
    alternates: {
      canonical: "https://rosterlab.com/industries/security-roster",
    },
    openGraph: {
      title: "Security Staff Rostering Software - RosterLab",
      description:
        "Learn how our rostering software simplifies staff scheduling in security. Create fair, efficient rosters that improve site safety, compliance & saves time.",
      type: "website",
      url: "https://rosterlab.com/industries/security-roster",
      images: [
        {
          url: "/images/security-roster.jpg",
          width: 1200,
          height: 630,
          alt: "Security workforce scheduling with RosterLab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Security Staff Rostering Software - RosterLab",
      description:
        "Learn how our rostering software simplifies staff scheduling in security. Create fair, efficient rosters that improve site safety, compliance & saves time.",
      images: ["/images/security-roster.jpg"],
    },
  },
  "/industries/security-roster",
);

export default function SecurityPage() {
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
                  Security Rostering
                </span>{" "}
                Software for Teams
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                Less time rostering, more time ensuring site security. We
                specialise in all types of security rosters, no matter how
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
                    Made for security and complex industries
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
                src="/images/illustration/security.svg"
                alt="Security workforce scheduling dashboard"
                width={600}
                height={400}
                className="block w-full h-auto max-w-md mx-auto lg:max-w-full"
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
              Trusted by global teams with complex rosters
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
              Transform Your Security Operations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Handle the unique complexities of security rostering with
              AI-driven scheduling that adapts to your dynamic demands.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - App Screenshot */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-sky-100 rounded-3xl transform rotate-3"></div>
              <div className="relative">
                <Image
                  src="/images/generating.webp"
                  alt="RosterLab security platform showing AI-powered rostering"
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
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Variable Demand Matching
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Adapt to emergencies and fluctuating site requirements
                        automatically
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
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      24/7 Coverage with Fatigue Management
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Maintain continuous security coverage across all sites
                      while managing fatigue risks. Automatically enforce rest
                      periods, limit consecutive night shifts, and ensure safe
                      transitions between shift patterns to keep guards alert
                      and effective.
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Multiple Sites & Skills Made Easy
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Ensure proper coverage across all sites and security roles
                      - from patrol officers and CCTV operators to access
                      control and emergency response. Automatically allocate the
                      right people with the right licences to each site.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Reduce Staff Turnover
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Combat high security staff turnover by respecting
                      preferences and work-life balance. Fair, transparent
                      rosters that consider individual needs lead to happier
                      staff, better retention, and improved site safety.
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
                      Optimise Labour Costs & Compliance
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Automatically enforce security licencing requirements and
                      rest break requirements while optimising staffing
                      efficiency. Better utilisation of ordinary hours reduces
                      unnecessary overtime costs.
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

      {/* Security Verticals */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tailored Solutions for Every Security Sector
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built rostering for the unique needs of each security
              sector.
            </p>
          </div>

          {/* All Departments */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              All Security Sectors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                  <svg
                    className="w-8 h-8 text-blue-500 transition-transform duration-200 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Security Guards</h4>
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Patrol Officers</h4>
              </div>
              <div className="text-center group cursor-pointer">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Mobile Patrols</h4>
              </div>
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
                <h4 className="font-semibold text-gray-900">Event Security</h4>
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Loss Prevention</h4>
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
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">CCTV Operators</h4>
              </div>
              <div className="text-center group cursor-pointer">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Corporate Security
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Retail Security</h4>
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Construction Site Security
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Access Control</h4>
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Emergency Response
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">24/7 Operations</h4>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Security Rostering
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/feature/automated-rostering"
              className="flex flex-col bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
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
              <p className="text-gray-600 mb-3 flex-grow">
                Create optimal schedules in minutes using AI that balances all
                requirements.
              </p>
              <div className="flex items-center text-blue-600 font-medium mt-auto">
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
              href="/feature/rules-engine"
              className="flex flex-col bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
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
                Employment Law Compliant
              </h3>
              <p className="text-gray-600 mb-3 flex-grow">
                Automatically enforce employment agreements, fairness, and rest
                break requirements.
              </p>
              <div className="flex items-center text-sky-600 font-medium mt-auto">
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
              href="/feature/open-shifts"
              className="flex flex-col bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
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
              <p className="text-gray-600 mb-3 flex-grow">
                Optimise all the staffing intricacies for better coverage across
                your sites.
              </p>
              <div className="flex items-center text-blue-600 font-medium mt-auto">
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
              className="flex flex-col bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
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
              <p className="text-gray-600 mb-3 flex-grow">
                Staff can view schedules, set preferences, request leave, accept
                open shifts and manage swaps from any device.
              </p>
              <div className="flex items-center text-cyan-600 font-medium mt-auto">
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
              className="flex flex-col bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
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
              <p className="text-gray-600 mb-3 flex-grow">
                Handle last-minute changes with minimal disruption during staff
                call-outs or emergencies.
              </p>
              <div className="flex items-center text-indigo-600 font-medium mt-auto">
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
              className="flex flex-col bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
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
              <p className="text-gray-600 mb-3 flex-grow">
                Better-quality rosters, self rostering, reduced bias perception,
                and better work-life balance.
              </p>
              <div className="flex items-center text-blue-600 font-medium mt-auto">
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
            Optimised Rosters. Safer Staff.
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Well-rested security guards are more alert and effective. Fair
            rosters with proper fatigue management reduce burnout, improve
            retention, and ensure your team stays sharp when it matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/book-a-demo"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-200"
            >
              Schedule a Security Demo
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
          { name: "Security" },
        ]}
      />
    </SiteLayout>
  );
}
