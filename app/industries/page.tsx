import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import Link from "next/link";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "AI Rostering Software for All Industries - RosterLab",
    description:
      "Simplify your staff roster, and reduce your costs, no matter your industry. Discover how RosterLab fits your business, industry & goals.",
    alternates: {
      canonical: "https://rosterlab.com/industries",
    },
    openGraph: {
      title: "AI Rostering Software for All Industries - RosterLab",
      description:
        "Simplify your staff roster, and reduce your costs, no matter your industry. Discover how RosterLab fits your business, industry & goals.",
      type: "website",
      url: "https://rosterlab.com/industries",
      images: [
        {
          url: "/images/og-images/Industry.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Rostering Software for All Industries - RosterLab",
      description:
        "Simplify your staff roster, and reduce your costs, no matter your industry. Discover how RosterLab fits your business, industry & goals.",
      images: ["/images/og-images/Industry.png"],
    },
  },
  "/industries",
);

export default function IndustriesPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left">
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                AI Rostering Software for{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                  }}
                >
                  all industries
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Whether you're managing nurses, doctors, call centre agents, or
                ground crew staff - RosterLab's intelligent scheduling adapts to
                your industry's unique requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/book-a-demo"
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                  analyticsLabel="Book a Demo"
                  analyticsLocation="Industries Hero"
                  analyticsProperties={{ cta_type: "demo" }}
                >
                  Book a Demo
                </Button>
                <Button
                  href="/pricing"
                  className="bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50"
                  analyticsLabel="View Pricing"
                  analyticsLocation="Industries Hero"
                  analyticsProperties={{
                    cta_type: "pricing",
                  }}
                >
                  View Pricing
                </Button>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/illustration/Manufacturing Process-pana.svg"
                alt="Manufacturing process illustration"
                width={600}
                height={400}
                className="w-full max-w-xl h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Healthcare Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <svg
                  className="w-4 h-4 mr-2"
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
                Healthcare
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Healthcare Workforce Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From ICU to aged care facilities, optimise staffing while
                ensuring compliance, skill mix requirements, and staff
                wellbeing. Our AI understands the complexities of 24/7
                healthcare operations.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">90% faster scheduling</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">100% compliance</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">Skill mix optimisation</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">Fair shift distribution</span>
                </div>
              </div>
              <Link href="/industries/healthcare">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Explore Healthcare Solutions
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/industries/healthcare/ed-icu"
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow relative group"
                  >
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
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
                    <h3 className="font-semibold text-gray-900 mb-1">
                      ICU & ED
                    </h3>
                    <p className="text-sm text-gray-600">
                      Critical care coverage
                    </p>
                  </Link>
                  <Link
                    href="/industries/healthcare/aged-care"
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow relative group"
                  >
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors"
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
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Aged Care
                    </h3>
                    <p className="text-sm text-gray-600">
                      Resident-focused care
                    </p>
                  </Link>
                  <Link
                    href="/industries/healthcare/radiology"
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow relative group"
                  >
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transition-colors"
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
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Radiology
                    </h3>
                    <p className="text-sm text-gray-600">
                      Imaging optimisation
                    </p>
                  </Link>
                  <Link
                    href="/industries/healthcare/pathology-rostering"
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow relative group"
                  >
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors"
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
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Pathology
                    </h3>
                    <p className="text-sm text-gray-600">
                      Lab staff scheduling
                    </p>
                  </Link>
                  <Link
                    href="/industries/healthcare/radiography"
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow relative group"
                  >
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors"
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
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Radiography
                    </h3>
                    <p className="text-sm text-gray-600">
                      Imaging tech rostering
                    </p>
                  </Link>
                  <Link
                    href="/industries/healthcare"
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow block relative group"
                  >
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
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
                    <h3 className="font-semibold text-gray-900 mb-1">
                      More...
                    </h3>
                    <p className="text-sm text-gray-600">
                      All healthcare departments
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Industries Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transforming Workforce Management Across Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI adapts to your industry's unique scheduling challenges,
              compliance requirements, and operational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ports */}
            <Link
              href="/industries/transportation/port-rostering"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block group"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/port-roster.jpg"
                  alt="Ports industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ports</h3>
                <p className="text-gray-600 mb-4">
                  Manage dock workers, crane operators, and logistics staff
                  across shifts while coordinating with vessel and cargo
                  operations.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Staff port rostering coordination
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Safer and more efficient rosters
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    24/7 operations management
                  </li>
                </ul>
                <div className="bg-blue-600 text-white text-center py-2 rounded group-hover:bg-blue-700 transition-colors w-full">
                  Explore Port Rostering
                </div>
              </div>
            </Link>

            {/* Call Centers */}
            <Link
              href="/industries/call-centre-rostering"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block group"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/call center.webp"
                  alt="Call centres industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Call Centres
                </h3>
                <p className="text-gray-600 mb-4">
                  Optimise agent scheduling to meet service levels while
                  managing breaks, training, and multi-skill routing
                  requirements.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Service level optimisation
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Multi-channel coverage
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Peak hour management
                  </li>
                </ul>
                <div className="bg-blue-600 text-white text-center py-2 rounded group-hover:bg-blue-700 transition-colors w-full">
                  Explore Call Centre Rostering
                </div>
              </div>
            </Link>

            {/* Transportation */}
            <Link
              href="/industries/airports-and-transportation-roster"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block group"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/airports.webp"
                  alt="Airports & Transportation industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Airports & Transportation
                </h3>
                <p className="text-gray-600 mb-4">
                  Schedule drivers, pilots, and crew while managing hours of
                  service, route qualifications, and regulatory compliance.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Hours of service tracking
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Route qualification matching
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Rest period compliance
                  </li>
                </ul>
                <div className="bg-blue-600 text-white text-center py-2 rounded group-hover:bg-blue-700 transition-colors w-full">
                  Explore Transportation Rostering
                </div>
              </div>
            </Link>

            {/* Hospitality */}
            <Link
              href="/industries/hospitality-roster"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block group"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/hospitality.webp"
                  alt="Hospitality industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Hospitality
                </h3>
                <p className="text-gray-600 mb-4">
                  Balance front desk, housekeeping, kitchen, and service staff
                  across varying occupancy levels and event schedules.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Occupancy-based staffing
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Multi-department coordination
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Event staffing flexibility
                  </li>
                </ul>
                <div className="bg-blue-600 text-white text-center py-2 rounded group-hover:bg-blue-700 transition-colors w-full">
                  Explore Hospitality Rostering
                </div>
              </div>
            </Link>

            {/* Security */}
            <Link
              href="/industries/security-roster"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block group"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/security-roster.jpg"
                  alt="Security industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Security
                </h3>
                <p className="text-gray-600 mb-4">
                  Manage security guards, patrol officers, and surveillance
                  teams across multiple sites with 24/7 coverage requirements
                  and compliance tracking.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Multi-site coordination
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Licence compliance tracking
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Round-the-clock coverage
                  </li>
                </ul>
                <div className="bg-blue-600 text-white text-center py-2 rounded group-hover:bg-blue-700 transition-colors w-full">
                  Explore Security Rostering
                </div>
              </div>
            </Link>

            {/* Retail */}
            <Link
              href="/industries/retail-roster"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block group"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/retail-roster.jpg"
                  alt="Retail industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Retail</h3>
                <p className="text-gray-600 mb-4">
                  Optimise floor staff, stockroom teams, and managers across
                  peak trading hours, seasonal demands, and varying customer
                  footfall.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Peak hour optimisation
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Seasonal demand management
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Multi-store coordination
                  </li>
                </ul>
                <div className="bg-blue-600 text-white text-center py-2 rounded group-hover:bg-blue-700 transition-colors w-full">
                  Explore Retail Rostering
                </div>
              </div>
            </Link>

            {/* Public Services */}
            <Link
              href="/industries/public-services-roster"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block group"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/public-services-roster.jpg"
                  alt="Public services industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Public Services
                </h3>
                <p className="text-gray-600 mb-4">
                  Coordinate public service workers and facility staff with
                  union agreements, optimised coverage, and cross-department
                  coordination.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Union agreement compliance
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Optimised service coverage
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Cross-department coordination
                  </li>
                </ul>
                <div className="bg-blue-600 text-white text-center py-2 rounded group-hover:bg-blue-700 transition-colors w-full">
                  Explore Public Services Rostering
                </div>
              </div>
            </Link>

            {/* Manufacturing */}
            <Link
              href="/industries/manufacturing-roster"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block group"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/manufacturer.jpg"
                  alt="Manufacturing industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Manufacturing
                </h3>
                <p className="text-gray-600 mb-4">
                  Manage shift patterns, skill requirements, and production line
                  coverage while maintaining safety and efficiency standards.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Production line optimisation
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Shift pattern management
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Skill certification tracking
                  </li>
                </ul>
                <div className="bg-blue-600 text-white text-center py-2 rounded group-hover:bg-blue-700 transition-colors w-full">
                  Explore Manufacturing Rostering
                </div>
              </div>
            </Link>

            {/* Education */}
            <Link
              href="/industries/education-roster"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block group"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/Education.webp"
                  alt="Education industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Education
                </h3>
                <p className="text-gray-600 mb-4">
                  Roster teachers, support staff, & substitutes while balancing
                  class requirements, specialisations, and professional
                  development.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Subject expertise matching
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Substitute management
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Break duty scheduling
                  </li>
                </ul>
                <div className="bg-blue-600 text-white text-center py-2 rounded group-hover:bg-blue-700 transition-colors w-full">
                  Explore Education Rostering
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Core Benefits */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Universal Benefits, Industry-Specific Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No matter your industry, RosterLab delivers the same core benefits
              while adapting to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-500"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Automatic Scheduling
              </h3>
              <p className="text-gray-600">
                Create optimal schedules in minutes, not days or weeks
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-600"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Full Compliance
              </h3>
              <p className="text-gray-600">
                Automatically enforce all rules, regulations, and agreements
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-sky-500"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Cost Optimisation
              </h3>
              <p className="text-gray-600">
                Reduce overtime, minimise agency costs, optimise coverage
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Happy Teams
              </h3>
              <p className="text-gray-600">
                Fair schedules that respect preferences and work-life balance
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Path to Perfect Rosters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process takes you from complex scheduling
              challenges to optimised rosters in just a few simple steps.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Set rules & demands
                  </h3>
                  <p className="text-gray-600">
                    Configure industry-specific rules, compliance requirements,
                    skill mix, and coverage demands to ensure complete roster
                    compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Collect requests & preferences
                  </h3>
                  <p className="text-gray-600">
                    Staff submit leave requests and shift preferences through
                    the{" "}
                    <Link
                      href="/solutions/staff-roster-mobile-app"
                      className="text-blue-600 hover:underline"
                    >
                      mobile app
                    </Link>
                    , ready for review and roster planning.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Automatically generate rosters
                  </h3>
                  <p className="text-gray-600">
                    Our AI creates optimal, compliant schedules that balance
                    operational needs with staff preferences automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Share and manage schedules
                  </h3>
                  <p className="text-gray-600">
                    Publish rosters via{" "}
                    <Link
                      href="/solutions/staff-roster-mobile-app"
                      className="text-blue-600 hover:underline"
                    >
                      mobile app
                    </Link>
                    , manage shift swaps, and integrate with payroll - all in
                    real-time.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                href="/staff-rostering-interactive-demo"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                See an Example
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
        }}
      >
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Workforce Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of organisations saving time and money with
              intelligent scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/book-a-demo"
                className="bg-white text-blue-600 hover:bg-gray-100"
                analyticsLabel="Book a Demo"
                analyticsLocation="Industries Bottom CTA"
                analyticsProperties={{ cta_type: "demo" }}
              >
                Book a Demo
              </Button>
              <Button
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                analyticsLabel="Discuss Your Industry"
                analyticsLocation="Industries Bottom CTA"
                analyticsProperties={{ cta_type: "contact" }}
              >
                Discuss Your Industry
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Industries" }]}
      />
    </SiteLayout>
  );
}
