import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import MobileAppPreferencesModule from "@/components/sections/animations/MobileAppPreferencesModule";

export const metadata = withHreflang(
  {
    title: "Ground Crew Rostering Software - RosterLab",
    description:
      "Streamline airport ground crew rostering with AI. Balance baggage handlers, ramp agents, and GSE operators across shifts for optimal airport operations.",
    alternates: {
      canonical:
        "https://rosterlab.com/industries/airports-and-transportation-roster/ground-crew",
    },
    openGraph: {
      title: "Ground Crew Rostering Software - RosterLab",
      description:
        "Streamline airport ground crew rostering with AI. Balance baggage handlers, ramp agents, and GSE operators across shifts for optimal airport operations.",
      type: "website",
      url: "https://rosterlab.com/industries/airports-and-transportation-roster/ground-crew",
      images: [
        {
          url: "/images/illustration/ground-crew-roster.svg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ground Crew Rostering Software - RosterLab",
      description:
        "Streamline airport ground crew rostering with AI. Balance baggage handlers, ramp agents, and GSE operators across shifts for optimal airport operations.",
      images: ["/images/illustration/ground-crew-roster.svg"],
    },
  },
  "/industries/airports-and-transportation-roster/ground-crew",
);

const faqItems = [
  {
    question: "Can ground crew submit their own preferences?",
    answer:
      "Yes. Baggage handlers, ramp agents, and other ground crew can submit shift preferences, time-off requests, and availability through our mobile app. RosterLab's <a href='https://rosterlab.com/feature/self-scheduling' class='text-blue-600 hover:text-blue-700 underline'>self-rostering feature</a> lets staff bid for available shifts while maintaining coverage requirements and certification rules.",
  },
  {
    question: "What happens when ground crew call in sick at the last minute?",
    answer:
      "RosterLab identifies replacement staff who meet the required certifications (GSE operations, aircraft marshalling, etc.), checks their recent hours to avoid fatigue, and fills gaps quickly. The system prevents unsafe coverage by alerting you if a shift can't be properly staffed.",
  },
  {
    question: "How does RosterLab prevent roster-based favouritism?",
    answer:
      "RosterLab uses algorithm-based shift allocation that eliminates subjective bias. Every shift assignment is based on objective criteria: certifications, availability, workload balance, and compliance rules.",
  },
  {
    question: "Can RosterLab track different certifications for ground crew?",
    answer:
      "Yes. RosterLab manages all certifications including GSE operations (tugs, belt loaders, aircraft stairs), dangerous goods handling, aircraft marshalling, and more. You can instantly see which critical certifications are held by only one or two people and plan accordingly.",
  },
];

export default function GroundCrewRosteringPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-sky-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                  Optimised, Efficient
                </span>{" "}
                Ground Crew Rosters
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create intelligent AI rosters that balance baggage handlers,
                ramp agents, and GSE operators across shifts.
              </p>
              <div className="mb-8 space-y-2">
                <p className="text-gray-600 flex items-center justify-start">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
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
                  Ensure certified staff for GSE and specialist operations
                </p>
                <p className="text-gray-600 flex items-center justify-start">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
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
                  Balance workload across ramp, baggage, and service teams
                </p>
                <p className="text-gray-600 flex items-center justify-start">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
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
                  Safety compliance and fatigue management
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/pricing"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                >
                  View Pricing
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/ground-crew-roster.svg"
                alt="Ground crew rostering software interface"
                width={600}
                height={400}
                className="block w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Better Airport Operations Start with Smart Ground Crew Rostering
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build efficient and fair ground crew rosters in minutes, not days.
              Discover how:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pain Point 1: Certification Management */}
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-sky-600"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                GSE certification tracking
              </h3>
              <p className="text-gray-600">
                Ensure staff with proper certifications for tugs, belt loaders,
                aircraft stairs, and dangerous goods handling are assigned to
                each shift.
              </p>
            </div>

            {/* Pain Point 3: Workload Balance */}
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-indigo-600"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Cross-team coordination
              </h3>
              <p className="text-gray-600">
                Balance workload across ramp operations, baggage handling, and
                aircraft servicing teams for efficient operations.
              </p>
            </div>

            {/* Pain Point 4: Safety Compliance */}
            <div className="text-center p-6">
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Fatigue management
              </h3>
              <p className="text-gray-600">
                Maintain safety standards with intelligent fatigue management,
                rest period enforcement, and workload distribution.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <MobileAppPreferencesModule />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-16">
                Perfect For Airport Ground Operations
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-sky-600"
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
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Manage Equipment Certifications
                    </h4>
                    <p className="text-gray-600">
                      Track and enforce GSE certifications including tugs, belt
                      loaders, pushback tractors, aircraft stairs, and dangerous
                      goods handling.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-indigo-600"
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
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Coordinate Multiple Teams
                    </h4>
                    <p className="text-gray-600">
                      Balance ramp agents, baggage handlers, aircraft servicers,
                      and marshalling staff across all shifts and terminal
                      areas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Reduce Fatigue & Burnout
                    </h4>
                    <p className="text-gray-600">
                      Fairly distribute workload and enforce rest periods to
                      maintain safety standards and improve staff retention in
                      demanding airport operations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-sky-600"
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
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Meet More Staff Preferences
                    </h4>
                    <p className="text-gray-600">
                      Help ground crew achieve better work-life balance by
                      considering preferences whilst ensuring critical flight
                      operations are fully supported.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-indigo-600"
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
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Optimise Staffing Levels
                    </h4>
                    <p className="text-gray-600">
                      Understand actual staffing needs better and determine
                      optimal team size for each operation and shift pattern.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="max-w-md mx-auto text-center mt-12">
            <Button
              href="/solutions/ai-roster-generator"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3"
            >
              Learn about AI Rostering
            </Button>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Questions we hear from airport operations managers
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Smarter, Fairer Ground Crew Rosters
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join airports that have streamlined ground operations and improved
              staff satisfaction
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/book-a-demo"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Hidden Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          {
            name: "Airports & Transportation",
            url: "/industries/airports-and-transportation-roster",
          },
          { name: "Ground Crew Rostering" },
        ]}
      />
    </SiteLayout>
  );
}
