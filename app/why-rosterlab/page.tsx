import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import { HiLightBulb, HiScale, HiTrendingUp } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getClient, urlFor } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import { validatedToken } from "@/sanity/lib/token";
import { groq } from "next-sanity";
import { formatDate } from "@/lib/utils";
import AgenticAICarousel from "@/app/feature/ai-staff-rostering-assistant/AgenticAICarousel";
import FAQAccordion from "@/components/ui/FAQAccordion";

export const metadata = withHreflang(
  {
    title: "Why Choose Us - RosterLab",
    description:
      "Discover why teams choose RosterLab as their rostering platform. Our team is dedicated to building smarter, fairer AI rostering tools that put people first.",
    alternates: {
      canonical: "https://rosterlab.com/why-rosterlab",
    },
    other: {
      link: '<link rel="preload" href="/images/illustration/Timeline-pana.svg" as="image" type="image/svg+xml" fetchpriority="high" />',
    },
    openGraph: {
      title: "Why Choose Us - RosterLab",
      description:
        "Discover why teams choose RosterLab as their rostering platform. Our team is dedicated to building smarter, fairer AI rostering tools that put people first.",
      type: "website",
      url: "https://rosterlab.com/why-rosterlab",
      images: [
        {
          url: "/images/og-images/why-choose-us.png",
          width: 1200,
          height: 630,
          alt: "Why Choose Us - RosterLab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Why Choose Us - RosterLab",
      description:
        "Discover why teams choose RosterLab as their rostering platform. Our team is dedicated to building smarter, fairer AI rostering tools that put people first.",
      images: ["/images/og-images/why-choose-us.png"],
    },
  },
  "/why-rosterlab",
);

const recentCaseStudiesQuery = groq`
  *[_type == "post" && "case-studies" in categories[]->slug.current] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name
    },
    categories[]->{
      title,
      slug
    }
  }
`;

type CaseStudy = {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt?: string;
  mainImage?: { asset?: { _ref: string }; alt?: string };
  publishedAt?: string;
  author?: { name?: string };
};

export default async function WhyRosterLabPage() {
  const headerText = "Why Choose RosterLab?";
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const caseStudies: CaseStudy[] =
    (await client.fetch(recentCaseStudiesQuery)) ?? [];
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1
                className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                aria-label={headerText}
              >
                Why Choose{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                  }}
                >
                  RosterLab?
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                By combining advanced AI with cutting-edge operations research,
                we make rostering smarter, faster, and effortless.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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
                  Learn about AI rostering
                </Button>
              </div>
            </div>

            {/* Video Player */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/illustration/why-us-new.svg"
                alt="Why RosterLab illustration"
                width={600}
                height={600}
                className="w-full h-auto max-w-xl"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <Container>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Rosters Solved in Minutes, Not Days.
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Our AI considers every rule, constraint, and preference to create
              the best possible schedule automatically, giving you time back to
              focus on your people and patients.
            </p>

            {/* Trusted Logos */}
            <div>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10">
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
                    src="/images/logos/royal-flying-doctor.png"
                    alt="Royal Flying Doctor Service"
                    width={88}
                    height={38}
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
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mission Section Clone - White Background */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Purpose-Built AI Optimisation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                RosterLab is an optimisation solver dedicated for workforce
                scheduling. It doesn't guess; it mathematically proves the
                schedule it finds is the best (or very close to it) under your
                specific rules.
              </p>
              <ul className="text-lg text-gray-600 space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <span>Optimise for safe staffing levels for every shift</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <span>
                    Ensure appropriate skill and seniority mix for an optimal
                    workforce
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <span>
                    Automatically balance coverage needs with staff preferences
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <Image
                src="/images/new-product-images/svg/preferences/staff-preferences.svg"
                alt="Staff Preferences widget"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Why Teams Switch Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Technology Built For Complexity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Results From Day One
                </h3>
                <p className="text-gray-600">
                  From building your first roster with RosterLab, you'll
                  experience time saved and fewer errors from day one.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Easy To Transition
                </h3>
                <p className="text-gray-600">
                  Maintain your rostering approach while reducing admin for an
                  easy, seamless transition.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Grows As You Scale
                </h3>
                <p className="text-gray-600">
                  Personalised rules for roles and skills make it easy to scale
                  operations with your team.
                </p>
              </div>
            </div>

            {/* CTA for ROI Calculator */}
            <div className="mt-12 text-center">
              <Button
                href="/tools/roi-calculator"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Calculate Your ROI
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Purpose-Built Optimisation Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <svg
                  className="w-10 h-10 text-[#1c82fd] mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-4">
                  "The main benefits of RosterLab is that you can generate the
                  roster automatically, but you can also switch roster views by
                  employee and by shift, making it easier to manage - that is
                  what the staff loved. We trust it. It's made management's life
                  easier."
                </blockquote>
                <div className="mb-4">
                  <p className="font-bold text-gray-900">
                    Auckland-based Radiology Department, MRT Lead
                  </p>
                </div>
                <div className="flex justify-center">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm11 2H6v10h8V5z"
                      clipRule="evenodd"
                    />
                    <path d="M10 7a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1zM7 11a1 1 0 100 2h6a1 1 0 100-2H7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Dedicated to Better Rostering
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                All-in-one platforms claim to do it all - but end up doing
                nothing exceptionally well. RosterLab is purpose-built for one
                thing: creating the best possible roster, every time.
              </p>
              <ul className="text-lg text-gray-600 space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <span>
                    Designed for healthcare & other complex staffing operations
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <span>
                    AI-driven efficiency, but with human-led decisions
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <span>
                    Handles intricate constraints, preferences, and compliance
                    rules
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Coming Soon: Agentic AI Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <Container>
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6 text-gray-900">
              Evolving for the Future
            </h3>
            <p className="text-xl text-gray-600 mb-12">
              Our AI Rostering Assistant (Otto) will soon be able to take action
              on your behalf, making rostering effortless - always with your
              approval and oversight.
            </p>

            <AgenticAICarousel />

            <div className="mt-12">
              <p className="text-xl text-gray-600 mb-8">
                Powered by{" "}
                <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent font-bold">
                  Agentic AI
                </span>
              </p>
              <Button
                href="/feature/ai-staff-rostering-assistant"
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Recent Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-20 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Teams We've Recently Helped
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Partner with RosterLab for better team and patient outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((post) => {
                const postUrl = post.slug?.current
                  ? `/case-studies/${post.slug.current}`
                  : "/case-studies";
                return (
                  <Link
                    key={post._id}
                    href={postUrl}
                    className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
                  >
                    {post.mainImage?.asset && (
                      <div className="relative h-56 w-full">
                        <Image
                          src={urlFor(post.mainImage)
                            .width(640)
                            .height(360)
                            .url()}
                          alt={post.mainImage?.alt || post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <div className="mt-auto">
                        <div className="text-blue-600 font-medium flex items-center group-hover:text-blue-700">
                          Read More
                          <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Button
                href="/case-studies"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                View all case studies
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              FAQs
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Common questions about our AI-powered rostering technology
            </p>
            <FAQAccordion
              items={[
                {
                  question: "Is RosterLab an LLM?",
                  answer:
                    "No, RosterLab isn't an LLM - and that's a good thing. Language models are great for writing emails, not for deciding who's on the 2 a.m. shift so your team avoid fatigue.",
                },
                {
                  question: "What kind of AI is RosterLab?",
                  answer:
                    "RosterLab uses mathematical optimisation (operations research) to build and solve rosters. The AI applies mathematical, statistical, and computational methods to help make better rostering decisions - especially for complex ones involving limited resources, risks, and trade-offs.",
                },
                {
                  question: "Does RosterLab's AI learn from the past?",
                  answer:
                    "It doesn't need to. You set rules and priorities; the AI solver then finds the optimal solution. Over time, you can refine your priorities and rules (e.g., fairness) to reflect your policies - no retraining.",
                },
              ]}
            />
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div
        className="py-20"
        style={{
          background:
            "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
        }}
      >
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the healthcare organisations already optimising their
              workforce with RosterLab.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/book-a-demo"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4"
              >
                Book a Demo
              </Button>
              <Button
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Why Choose Us" }]}
      />
    </SiteLayout>
  );
}
