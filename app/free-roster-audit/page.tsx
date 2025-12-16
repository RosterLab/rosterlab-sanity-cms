import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import { HiCheck } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Image from "next/image";

const pathname = "/free-roster-audit";

export const metadata = withHreflang(
  {
    title:
      "Free Roster Audit - Expert Analysis by Rostering Architects | RosterLab",
    description:
      "Get a comprehensive free audit of your staff roster. Our rostering architects assess fairness, operational efficiency, and compliance. Book your expert review today.",
    openGraph: {
      title:
        "Free Roster Audit - Expert Analysis by Rostering Architects | RosterLab",
      description:
        "Get a comprehensive free audit of your staff roster. Our rostering architects assess fairness, operational efficiency, and compliance. Book your expert review today.",
      images: [
        {
          url: "/images/og-images/AutoRosterGeneration.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Free Roster Audit - Expert Analysis by Rostering Architects | RosterLab",
      description:
        "Get a comprehensive free audit of your staff roster. Our rostering architects assess fairness, operational efficiency, and compliance. Book your expert review today.",
      images: ["/images/og-images/AutoRosterGeneration.png"],
    },
  },
  pathname,
);

const faqItems = [
  {
    question: "What does the free roster audit include?",
    answer:
      "Our comprehensive audit includes a thorough analysis of your roster's fairness, operational efficiency, and compliance. A rostering architect will review your current scheduling practices, identify areas for improvement, and provide actionable recommendations tailored to your organisation's unique needs.",
  },
  {
    question: "Who conducts the roster audit?",
    answer:
      "Your audit is conducted by one of our experienced rostering architects who specialise in workforce scheduling optimisation. They bring deep industry expertise and have helped organisations across healthcare and other sectors improve their rostering practices.",
  },
  {
    question: "How long does the audit process take?",
    answer:
      "The initial audit typically takes 1-2 weeks from the time you provide your roster data. This includes data analysis, assessment, and preparation of a comprehensive report with findings and recommendations. You'll receive a detailed report followed by a consultation session to discuss the results.",
  },
  {
    question: "What information do I need to provide for the audit?",
    answer:
      "We'll need access to your current roster data, including shift patterns, staff assignments, skill requirements, and any relevant workplace agreements or compliance requirements. Our team will guide you through the data collection process to ensure we have everything needed for a thorough assessment.",
  },
  {
    question: "Is there any obligation after receiving the free audit?",
    answer:
      "Absolutely not. The free roster audit is our way of demonstrating the value we can provide. You're under no obligation to use RosterLab or engage any of our services. We're confident that the insights from your audit will be valuable regardless of your next steps.",
  },
];

export default function FreeRosterAuditPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  FREE ASSESSMENT
                </div>
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    Free Roster Audit
                  </span>{" "}
                  <br className="hidden md:block" />
                  and Assessment
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Get a comprehensive analysis of your staff roster from our
                  rostering architects. We'll assess fairness, operational
                  efficiency, and compliance—then provide actionable
                  recommendations to optimise your workforce scheduling.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/book-your-free-audit"
                    className="bg-[#1c82fd] text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                    analyticsLabel="Book Free Audit"
                    analyticsLocation="Free Roster Audit Page"
                    analyticsProperties={{
                      cta_type: "audit",
                      page_name: "Free Roster Audit",
                      section: "hero",
                    }}
                  >
                    Book Your Free Audit
                  </Button>
                  <Button
                    href="/contact"
                    className="bg-white text-[#1c82fd] border-2 border-[#1c82fd] hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                    analyticsLabel="Contact Us"
                    analyticsLocation="Free Roster Audit Page"
                    analyticsProperties={{
                      cta_type: "contact",
                      page_name: "Free Roster Audit",
                      section: "hero",
                    }}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/us-images/iStock-2012944723.jpg"
                    alt="Expert roster audit analysis"
                    width={600}
                    height={600}
                    className="object-cover w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* What We Analyse Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What Our Rostering Architects Analyse
              </h2>
              <p className="text-lg text-gray-600">
                Our comprehensive audit covers every aspect of your workforce
                scheduling to identify opportunities for improvement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Fairness Assessment */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Fairness Assessment
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Equitable shift distribution</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Workload balance analysis</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Weekend & holiday rotation</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Preference accommodation</span>
                  </li>
                </ul>
              </div>

              {/* Operational Efficiency */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-7 h-7 text-white"
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
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Operational Efficiency
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Coverage optimisation</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Skill mix alignment</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Cost efficiency analysis</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Overtime pattern review</span>
                  </li>
                </ul>
              </div>

              {/* Compliance Review */}
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-7 h-7 text-white"
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
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Compliance Review
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Regulatory requirement check</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Work hour limitations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Rest period validation</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Contract compliance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12 text-center">
              <Button
                href="/book-your-free-audit"
                className="bg-[#1c82fd] text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                analyticsLabel="Book Free Audit"
                analyticsLocation="Free Roster Audit Page"
                analyticsProperties={{
                  cta_type: "audit",
                  page_name: "Free Roster Audit",
                  section: "what_we_analyse",
                }}
              >
                Book Your Free Audit
              </Button>
            </div>
          </Container>
        </div>

        {/* Benefits Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Get a Professional Roster Audit?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Even well-intentioned roster practices can develop blind spots
                  over time. Our expert analysis reveals hidden inefficiencies,
                  compliance risks, and fairness issues that may be costing you
                  time, money, and staff satisfaction.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Uncover Hidden Costs
                      </p>
                      <p className="text-gray-600">
                        Identify inefficiencies that drain your budget through
                        unnecessary overtime or understaffing
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Reduce Compliance Risk
                      </p>
                      <p className="text-gray-600">
                        Catch regulatory violations before they result in
                        penalties or legal issues
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Improve Staff Satisfaction
                      </p>
                      <p className="text-gray-600">
                        Create fairer, more balanced schedules that boost morale
                        and reduce turnover
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Get Expert Recommendations
                      </p>
                      <p className="text-gray-600">
                        Receive actionable insights from rostering architects
                        with years of industry experience
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <Image
                  src="/images/audit.webp"
                  alt="Roster audit analysis"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12 text-center">
              <Button
                href="/book-your-free-audit"
                className="bg-[#1c82fd] text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                analyticsLabel="Book Free Audit"
                analyticsLocation="Free Roster Audit Page"
                analyticsProperties={{
                  cta_type: "audit",
                  page_name: "Free Roster Audit",
                  section: "benefits",
                }}
              >
                Book Your Free Audit
              </Button>
            </div>
          </Container>
        </div>

        {/* The Audit Process */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How the Audit Process Works
              </h2>
              <p className="text-lg text-gray-600">
                Simple, transparent, and designed to deliver maximum value
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Book Your Audit
                </h3>
                <p className="text-gray-600">
                  Schedule a brief intro call to discuss your needs and data
                  requirements
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Share Your Roster
                </h3>
                <p className="text-gray-600">
                  Securely provide your roster data and relevant workplace
                  agreements
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Expert Analysis
                </h3>
                <p className="text-gray-600">
                  Our rostering architects conduct a comprehensive review
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Get Results
                </h3>
                <p className="text-gray-600">
                  Receive a detailed report with actionable recommendations
                </p>
              </div>
            </div>
          </Container>
        </div>

        {/* Who Should Get an Audit */}
        <div className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
          <Container>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Is a Roster Audit Right for You?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Consider a free audit if you're experiencing any of these
                challenges:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  High staff turnover or low morale
                </h3>
                <p className="text-gray-600">
                  Unfair rostering practices may be driving valuable staff away
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Excessive overtime costs
                </h3>
                <p className="text-gray-600">
                  Poor planning and inefficient scheduling inflate your labour
                  budget
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Compliance concerns or violations
                </h3>
                <p className="text-gray-600">
                  Regulatory risks that could result in penalties or legal
                  issues
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Frequent coverage gaps or overstaffing
                </h3>
                <p className="text-gray-600">
                  Inconsistent scheduling leads to operational inefficiencies
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Time consuming administration
                </h3>
                <p className="text-gray-600">
                  Hours spent every week building and adjusting schedules
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Frequent shift swap requests or conflicts
                </h3>
                <p className="text-gray-600">
                  Sign that your current roster isn't meeting staff needs
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12 text-center">
              <Button
                href="/book-your-free-audit"
                className="bg-[#1c82fd] text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                analyticsLabel="Book Free Audit"
                analyticsLocation="Free Roster Audit Page"
                analyticsProperties={{
                  cta_type: "audit",
                  page_name: "Free Roster Audit",
                  section: "is_audit_right",
                }}
              >
                Book Your Free Audit
              </Button>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Common questions about our free roster audit service
              </p>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
          <Container>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Optimise Your Workforce Scheduling?
              </h2>
              <p className="text-xl mb-12 opacity-90">
                Book your free roster audit today and discover how expert
                analysis can transform your scheduling practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-your-free-audit"
                  className="bg-white text-[#1c82fd] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  analyticsLabel="Book Free Audit"
                  analyticsLocation="Free Roster Audit Page"
                  analyticsProperties={{
                    cta_type: "audit",
                    page_name: "Free Roster Audit",
                    section: "final_cta",
                  }}
                >
                  Book Your Free Audit
                </Button>
                <Button
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1c82fd] px-8 py-4 text-lg font-semibold"
                  analyticsLabel="Contact Us"
                  analyticsLocation="Free Roster Audit Page"
                  analyticsProperties={{
                    cta_type: "contact",
                    page_name: "Free Roster Audit",
                    section: "final_cta",
                  }}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Hidden Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Free Roster Audit" }]}
      />
    </SiteLayout>
  );
}
