import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { HiCheck, HiMinus, HiInformationCircle } from "react-icons/hi";
import React from "react";

export const metadata = {
  title: "Pricing - Affordable AI Staff Scheduling Software",
  description:
    "Explore RosterLab's flexible pricing for AI-powered staff rostering. Save time, ensure compliance, and build fairer schedules effortlessly.",
  alternates: {
    canonical: 'https://rosterlab.com/pricing',
  },
  openGraph: {
    title: "Pricing - Affordable AI Staff Scheduling Software",
    description:
      "Explore RosterLab's flexible pricing for AI-powered staff rostering. Save time, ensure compliance, and build fairer schedules effortlessly.",
    type: "website",
    url: "https://rosterlab.com/pricing",
    images: [
      {
        url: "/images/og images/Pricing.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - Affordable AI Staff Scheduling Software",
    description:
      "Explore RosterLab's flexible pricing for AI-powered staff rostering. Save time, ensure compliance, and build fairer schedules effortlessly.",
    images: ["/images/og images/Pricing.png"],
  },
};

const pricingPlans = [
  {
    name: "Digital Rostering",
    price: "Free",
    description:
      "For teams looking to transition to a digital scheduling platform.",
    features: [
      "Manual scheduling platform",
      "Simple rule violations check",
      "Dynamic statistics counts",
      "Colour coding by shifts",
      "Employee mobile app",
    ],
    cta: "Sign up for free",
    ctaLink: "https://app.rosterlab.com/signup",
    highlighted: false,
  },
  {
    name: "AI Optimised Rostering",
    price: "$20",
    period: "per person per month",
    description: "Complex 24/7 AI-powered rostering",
    features: [
      "24/7 automatic rostering",
      "Multiple sessions per shift",
      "Dynamic re-rostering",
      "Legal and contractual compliance",
      "Optimised staffing resources",
      "Scenario simulation",
    ],
    cta: "Book a demo",
    ctaLink: "/book-a-demo",
    highlighted: true,
  },
  {
    name: "Enterprise Solution",
    price: "Contact us",
    description: "Custom solutions for large organisations",
    features: [
      "SSO",
      "API access",
      "Workforce scheduling consulting",
      "Integrations",
      "Customised rules",
      "Priority support",
    ],
    cta: "Contact us",
    ctaLink: "/contact",
    highlighted: false,
  },
];

const features = [
  {
    category: "For Scheduling Admins & Managers",
    items: [
      {
        name: "Staff rostering",
        digital: true,
        ai: true,
        enterprise: true,
      },
      {
        name: "AI assigning day shifts",
        digital: "Manual",
        ai: true,
        enterprise: true,
      },
      {
        name: "AI assigning night shifts",
        digital: "Manual",
        ai: true,
        enterprise: true,
      },
      {
        name: "AI assigning roles to shifts",
        digital: "Manual",
        ai: true,
        enterprise: true,
      },

      {
        name: "AI assigning multiple sessions to shift",
        digital: false,
        ai: true,
        enterprise: true,
      },
      {
        name: "Staff preferences",
        digital: "Collect through app",
        ai: "Optimised by AI",
        enterprise: "Optimised by AI",
      },
      {
        name: "Rostering rules",
        digital: "Simple checks",
        ai: "Complex rules",
        enterprise: "Customised rules",
      },

      {
        name: "Live statistics on staffing levels",
        digital: true,
        ai: true,
        enterprise: true,
      },
      {
        name: "Live schedules",
        digital: true,
        ai: true,
        enterprise: true,
      },
      {
        name: "Leave management",
        digital: false,
        ai: true,
        enterprise: true,
      },
      {
        name: "Open shifts",
        digital: false,
        ai: true,
        enterprise: true,
      },
      {
        name: "Smart shift swaps",
        digital: false,
        ai: true,
        enterprise: true,
      },

      {
        name: "Re-rostering (reschedule a subset of your roster)",
        digital: false,
        ai: true,
        enterprise: true,
      },
      {
        name: "SSO",
        digital: false,
        ai: false,
        enterprise: true,
      },
      {
        name: "API",
        digital: false,
        ai: false,
        enterprise: true,
      },
      {
        name: "Integrations",
        digital: false,
        ai: false,
        enterprise: true,
      },
      {
        name: "RPA",
        digital: false,
        ai: false,
        enterprise: true,
      },
      {
        name: "Consulting",
        digital: false,
        ai: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "FOR EMPLOYEES",
    items: [
      {
        name: "View published shifts and tasks",
        digital: true,
        ai: true,
        enterprise: true,
      },
      {
        name: "Preferences",
        digital: true,
        ai: true,
        enterprise: true,
      },
      {
        name: "Leave requests",
        digital: false,
        ai: true,
        enterprise: true,
      },
      {
        name: "Open shifts",
        digital: false,
        ai: true,
        enterprise: true,
      },
      {
        name: "See who's on leave",
        digital: false,
        ai: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "SUPPORT",
    items: [
      {
        name: "RosterLab Support",
        digital: "Live chat",
        ai: "Dedicated support",
        enterprise: "Priority support",
      },
    ],
  },
];

const faqItems = [
  {
    question:
      "What’s the difference between your AI rosters and traditional rostering tools?",
    answer:
      "Traditional rostering tools help you build rosters manually, often by dragging shifts around in a calendar or check your manual rosters against some simple rules (what our <a href='/solutions/free-staff-scheduling' class='text-blue-600 hover:underline'>free product</a> offers). You're still doing the thinking, and the tool just makes it neater.<br><br><a href='/solutions/ai-staff-scheduling' class='text-blue-600 hover:underline'>RosterLab's AI</a> goes several steps further. It actually <em>builds</em> the roster for you. Our algorithms consider your staffing requirements, employee preferences, fatigue and union rules, skill coverage, and fairness - all at once. The result is a fully optimised, compliant, and fair roster in a fraction of the time, with better outcomes for staff and management alike.",
  },
  {
    question: "Which plan suits me the best?",
    answer:
      "We strongly recommend <a href='/contact' class='text-blue-600 hover:underline'>contacting us</a> if you're rostering for healthcare or non-healthcare teams with a minimum size of 30.<br><br>If you're simply looking for a digital solution to move away from Excel, feel free to <a href='https://app.rosterlab.com/signup' class='text-blue-600 hover:underline'>sign up for free</a>. If you're interested in using AI to generate and optimise rosters, <a href='/book-a-demo' class='text-blue-600 hover:underline'>book a chat</a> or start a live conversation with us to learn more.",
  },
  {
    question: "What is my ROI choosing RosterLab",
    answer:
      "RosterLab delivers ROI by significantly reducing the time spent on rostering, often by up to 90%, while improving staff satisfaction and retention through fair, preference-aware schedules. <br><br> Our AI enforces fatigue and union rules, helping lower sick leave and burnout risk, and ensures better coverage with fewer gaps, reducing costly last-minute changes and improving staff retention. <br><br>Optimised rosters also streamline onboarding for new departments or teams, enabling you to scale without increasing manual workload. Many customers see a return on investment within the first few months, with some recovering costs in their very first roster.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "We charge based on the number of staff on roster being generated by our AI. If you are looking for large enterprise solution, please <a href='/contact' class='text-blue-600 hover:underline'>reach out</a> to one of our team members for further discussion.",
  },

  {
    question: "Does admin users or managers get charged?",
    answer:
      "We only charge for staff who are included on the roster. Admin users or managers who are not part of the roster display are free of charge.",
  },

  {
    question: "What kind of support is included?",
    answer:
      "All plans include email support and access to our knowledge base.<br><br> Paying customers get priority email and live chat support with faster response times. <br><br> Enterprise customers receive dedicated support including phone support and an assigned customer success manager.",
  },
];

export default function PricingPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-x-hidden">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Optimise Your Staffing
              </h1>
              <h2
                className="text-3xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                }}
              >
                From Today
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unlock the power of automatic rostering today! See immediate
                improvements in rostering efficiency and staff satisfaction.
              </p>
            </div>
          </Container>
        </div>

        {/* Pricing Cards */}
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                  plan.highlighted ? "ring-2 ring-blue-500 scale-105" : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-600">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <HiCheck className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 flex items-center gap-2">
                        {feature}
                        {feature === "Workforce scheduling consulting" && (
                          <div className="relative group">
                            <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                              For example, cost analysis, resource planning and
                              more
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
                            </div>
                          </div>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={plan.ctaLink}
                  className={`w-full py-4 text-lg font-semibold ${
                    plan.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : plan.name === "Digital Rostering"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-purple-500 text-white hover:bg-purple-600"
                  }`}
                  analyticsLabel={plan.cta}
                  analyticsLocation="Pricing Card"
                  analyticsProperties={{ 
                    plan_name: plan.name,
                    cta_type: plan.cta.includes('Sign up') ? 'signup' : 'demo',
                    external: plan.ctaLink.includes('http')
                  }}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </Container>

        {/* Feature Comparison */}
        <div className="bg-white py-20">
          <Container>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Complete Feature Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-2 sm:py-6 sm:px-6 font-bold text-gray-900 text-xs sm:text-base">
                      Features
                    </th>
                    <th className="text-center py-4 px-2 sm:py-6 sm:px-6 font-bold text-gray-900 text-xs sm:text-base">
                      Digital
                      <br />
                      <span className="text-xs font-normal text-gray-600">
                        Free
                      </span>
                    </th>
                    <th className="text-center py-4 px-2 sm:py-6 sm:px-6 font-bold text-gray-900 text-xs sm:text-base">
                      AI
                      <br />
                      <span className="text-xs font-normal text-gray-600">
                        $20/user
                      </span>
                    </th>
                    <th className="text-center py-4 px-2 sm:py-6 sm:px-6 font-bold text-gray-900 text-xs sm:text-base">
                      Enterprise
                      <br />
                      <span className="text-xs font-normal text-gray-600">
                        Custom
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr className="bg-gray-100">
                        <td
                          colSpan={4}
                          className="py-2 px-2 sm:py-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((feature, index) => (
                        <tr
                          key={`${categoryIndex}-${index}`}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td
                            className={`py-3 px-2 sm:py-4 sm:px-6 text-gray-700 font-medium text-xs sm:text-base ${
                              feature.name.includes("AI assigning")
                                ? "pl-8 sm:pl-12"
                                : ""
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {feature.name.trim()}
                              {(feature.name === "API" ||
                                feature.name === "Integrations" ||
                                feature.name === "RPA" ||
                                feature.name === "Consulting") && (
                                <div className="relative group inline-block">
                                  <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                    Upon request
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
                                  </div>
                                </div>
                              )}
                            </span>
                          </td>
                          <td className="py-3 px-2 sm:py-4 sm:px-6 text-center">
                            {typeof feature.digital === "string" ? (
                              <span className="text-xs sm:text-sm text-gray-600">
                                {feature.digital}
                              </span>
                            ) : feature.digital ? (
                              <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" />
                            ) : (
                              <HiMinus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-2 sm:py-4 sm:px-6 text-center">
                            {typeof feature.ai === "string" ? (
                              <span className="text-xs sm:text-sm text-gray-600">
                                {feature.ai}
                              </span>
                            ) : feature.ai ? (
                              <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" />
                            ) : (
                              <HiMinus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-2 sm:py-4 sm:px-6 text-center">
                            {typeof feature.enterprise === "string" ? (
                              <span className="text-xs sm:text-sm text-gray-600">
                                {feature.enterprise}
                              </span>
                            ) : feature.enterprise ? (
                              <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" />
                            ) : (
                              <HiMinus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Frequently Asked Questions
              </h2>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div
          className="pt-20"
          style={{
            background:
              "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
          }}
        >
          <div className="text-center p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join healthcare organisations already optimising their workforce
              with RosterLab
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="https://app.rosterlab.com/signup"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                analyticsLabel="Sign up for free"
                analyticsLocation="Pricing CTA Bottom"
                analyticsProperties={{ cta_type: 'signup', external: true }}
              >
                Sign up for free
              </Button>
              <Button
                href="/staff-rostering-interactive-demo"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                analyticsLabel="Book a Demo"
                analyticsLocation="Pricing CTA Bottom"
                analyticsProperties={{ cta_type: 'demo' }}
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
