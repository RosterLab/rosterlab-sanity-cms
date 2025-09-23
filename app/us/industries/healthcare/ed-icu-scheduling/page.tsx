import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import USTrustedBy from "@/app/us/components/TrustedBy";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from '@/components/seo/HreflangTags';
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang({
  title: "ED & ICU Staff Scheduling Software - RosterLab",
  description:
    "Easily build and automate ED & ICU schedules with RosterLab. Reduce staff fatigue, save admin time, and improve continuity of care for patients.",
  alternates: {
    canonical: 'https://rosterlab.com/us/industries/healthcare/ed-icu-scheduling',
  },
  openGraph: {
    title: "ED & ICU Staff Scheduling Software - RosterLab",
    description:
      "Easily build and automate ED & ICU schedules with RosterLab. Reduce staff fatigue, save admin time, and improve continuity of care for patients.",
    type: "website",
    url: 'https://rosterlab.com/us/industries/healthcare/ed-icu-scheduling',
    images: [
      {
        url: "/images/og images/IndustryICUED.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ED & ICU Staff Scheduling Software - RosterLab",
    description:
      "Easily build and automate ED & ICU schedules with RosterLab. Reduce staff fatigue, save admin time, and improve continuity of care for patients.",
    images: ["/images/og images/IndustryICUED.png"],
  },
}, '/us/industries/healthcare/ed-icu-scheduling');

const faqItems = [
  {
    question:
      "How quickly can I generate my emergency department staff schedule?",
    answer:
      "The time it takes RosterLab’s AI to generate a schedule depends on the complexity of your departments. It scales with department size and the number of rules and requirements. For a typical ED or ICU ward, it takes about 10–20 minutes to solve.",
  },
  {
    question: "How does the platform automate my ICU schedule?",
    answer:
      "With Rosterlab, you can set the AI to generate schedules for your staff the same way you would. Input your scheduling information so the AI develops a deep understanding of all the requirements that need to be met, the skill sets and training level of each staff member and the soft and hard constraints that apply to how shifts can be assigned. The Rosterlab team will take you through the onboarding process to capture all the nuances in creating optimised schedules for your staff.",
  },
  {
    question: "Where is my schedule stored?",
    answer:
      "RosterLab is a cloud-based platform that keeps all your schedule information stored securely. It is available to your department wherever you have internet access.",
  },
  {
    question: "How do I share my schedule?",
    answer:
      "Staff leave requests and preferences are collated via the RosterLab iOS/Android app, ready for the AI to interpret. When you publish your schedule, it is automatically pushed to everyone who needs to see it.",
  },
];

export default function ICUEDPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Generate your ED staff schedule in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  minutes
                </span>
              </h1>
              
              {/* Mobile only: Image appears here after H1 */}
              <div className="block lg:hidden relative mb-8">
                <Image
                  src="/images/us-images/stock/istockphoto-2190085149-2048x2048.jpg"
                  alt="ICU/ED scheduling dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              
              <p className="text-xl text-gray-600 mb-8">
                Cut schedule creation time by 90% with AI automation. Build
                compliant schedules that balance critical care demands with
                staff wellbeing.
              </p>
              <div className="mb-8 space-y-2">
                <p className="text-gray-600 flex items-center justify-start">
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
                  Tailor-made for specific ICU and ED scheduling challenges
                </p>
                <p className="text-gray-600 flex items-center justify-start">
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
                  Reduce your time spent scheduling by 90%
                </p>
                <p className="text-gray-600 flex items-center justify-start">
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
                  Make safer and fairer schedules for your team
                </p>
                <p className="text-gray-600 flex items-center justify-start">
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
                  Increase continuity of care
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/us/book-a-demo"
                  className="bg-teal-600 text-white hover:bg-teal-700"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/us/product-tour"
                  className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50"
                >
                  View Product Tour
                </Button>
              </div>
            </div>
            {/* Desktop only: Image in right column */}
            <div className="hidden lg:block relative">
              <Image
                src="/images/us-images/stock/istockphoto-2190085149-2048x2048.jpg"
                alt="ICU/ED scheduling dashboard"
                width={600}
                height={400}
                className="block w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ED & ICU Scheduling Solved
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Emergency departments and ICUs require precise skill mix, 24/7
              coverage, and rapid response capabilities. Our AI ensures you
              always have the right team in place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-teal-600"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Long Hours Shift Management
              </h3>
              <p className="text-gray-600">
                Intelligently schedule long intensive shifts while preventing
                burnout. Let AI balances workload distribution and mandatory
                rest periods.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Enhanced Continuity of Care
              </h3>
              <p className="text-gray-600">
                Ensure at least one team member from previous shifts continues
                caring for each patient, minimising handover errors and
                improving outcomes.
              </p>
            </div>

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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Optimal Staff-to-Patient Ratios
              </h3>
              <p className="text-gray-600">
                Automatically maintain critical staff-to-patient ratios required
                for intensive care, enforcing safe and effective patient
                monitoring.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Specific Features */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Built for Critical Care Complexity
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Fair Distribution of Challenging Shifts
                    </h3>
                    <p className="text-gray-600">
                      Automatically distribute nights, weekends, and holidays
                      equitably. Prevent excessive consecutive shifts and ensure
                      balanced workloads.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-teal-600"
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      AI That Understands ED & ICU Needs
                    </h3>
                    <p className="text-gray-600">
                      Our AI takes your department’s unique requirements into
                      account: skill sets, training levels, and both soft and
                      hard constraints for shift assignments.
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      From Spreadsheets to Smart Scheduling
                    </h3>
                    <p className="text-gray-600">
                      Replace error-prone manual processes with a cloud-based
                      solution that creates optimal schedules in minutes. Keep
                      your scheduling knowledge stored digitally to ensure
                      consistent, high-quality schedules over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/generating.webp"
                alt="ED & ICU scheduling benefits"
                width={600}
                height={500}
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="py-20 bg-white">
        <USTrustedBy />
      </section>

      {/* Cloud Features */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Modern ICU & ED Staff Scheduling Software
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure, accessible, and integrated with your existing systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/us/feature/shift-swaps-and-trades" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Smart Shift Trades
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Enable staff to easily swap shifts with automated approval
                  workflows.
                </p>
                <span className="text-teal-600 text-base font-medium hover:text-teal-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <Link href="/us/solutions/staff-scheduling-mobile-app" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
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
                  Staff Mobile Access
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Staff can view schedules, open shifts, and swap shifts from any
                  device.
                </p>
                <span className="text-cyan-600 text-base font-medium hover:text-cyan-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <Link href="/us/solutions/ai-staff-schedule-maker" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fatigue Management
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Build fatigue management rules to prevent staff burnout with
                  ease.
                </p>
                <span className="text-blue-600 text-base font-medium hover:text-blue-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <Link href="/us/solutions/ai-staff-schedule-maker" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fair shift allocation
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Equitably distribute night shifts, weekends, and on-call
                  duties automatically.
                </p>
                <span className="text-indigo-600 text-base font-medium hover:text-indigo-700">
                  Learn more →
                </span>
              </div>
            </Link>
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
              Common questions about ED & ICU scheduling
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your ED Staff Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join leading hospitals using RosterLab to ensure optimal ICU and
              ED staffing 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/us/book-a-demo"
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button
                href="/us/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600"
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
          { name: "Home", url: "/us" },
          { name: "Industries", url: "/us/industries" },
          { name: "Healthcare", url: "/us/industries/healthcare-scheduling" },
          { name: "ED/ICU" }

        ]}

      />

    </SiteLayout>
  );
}
