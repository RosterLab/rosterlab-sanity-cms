import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import { validatedToken } from "@/sanity/lib/token";
import ExcelFormClient from "./ExcelFormClient";
import Container from "@/components/ui/Container";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";
import {
  HiCheck,
  HiDownload,
  HiTable,
  HiClipboardList,
  HiUserGroup,
} from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Button from "@/components/ui/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Staff Roster Template Excel - RosterLab",
  description:
    "Download our free staff roster template for Excel. Pre-formatted 6-week roster ready for assigning shifts and tracking workload automatically.",
  alternates: {
    canonical:
      "https://rosterlab.com/templates/free-staff-roster-template-excel",
  },
  openGraph: {
    title: "Free Staff Roster Template Excel - RosterLab",
    description:
      "Download our free staff roster template for Excel. Pre-formatted 6-week roster ready for assigning shifts and tracking workload automatically.",
    images: [
      {
        url: "/images/og-images/Excel.png",
        width: 1200,
        height: 600,
        alt: "Excel roster template preview",
      },
    ],
    type: "website",
    url: "/templates/free-staff-roster-template-excel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Staff Roster Template Excel - RosterLab",
    description:
      "Download our free staff roster template for Excel. Pre-formatted 6-week roster ready for assigning shifts and tracking workload automatically.",
    images: ["/images/og-images/Excel.png"],
  },
};

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["excel-series", 
                      "roster-more-effectively-with-excel-ep2-sleep-days-after-night-shifts", 
                      "should-your-next-staff-roster-be-built-with-ai"])] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name}
  }
`;

// Static data for features
const features = [
  {
    icon: HiTable,
    title: "Pre-formatted 6-week roster",
    description:
      "The dates and days of the week are already laid out for 6 weeks, ready for assigning shifts.",
  },
  {
    icon: HiUserGroup,
    title: "Staff information section",
    description:
      "Space to record each employee's name, initials, skill level, and FTE (contracted hours).",
  },
  {
    icon: HiClipboardList,
    title: "Shift allocation and totals",
    description:
      "Cells to assign different shifts, with automatic totals at the end for tracking workload.",
  },
];

const benefits = [
  "Distribute shifts across staff",
  "Easily review the staff balance on each day",
  "Track FTE against contract hours",
  "Edit and personalise to meet your requirements",
  "Printer friendly and easy to use",
];

const faqItems = [
  {
    question: "Who is this staff scheduling template for?",
    answer:
      "This free Excel staff roster template is designed for managers, staff schedulers and team leaders who need a simple way to organise staff shifts. It's best suited for workplaces that want a straightforward, no-cost solution without needing to adopt new software.",
  },
  {
    question: "Should I use an Excel spreadsheet to roster my staff?",
    answer:
      "Excel can be a quick and familiar tool for scheduling if you have a small team and relatively simple shift patterns. However, it can become time-consuming and error-prone as your workforce grows, especially when handling last-minute changes, compliance requirements, or multiple locations.",
  },
  {
    question:
      "What's the difference between your Excel spreadsheet and free digital scheduling?",
    answer:
      "The Excel template is static - you download it and update manually. Our <a href='/solutions/free-staff-scheduling' class='text-blue-600 hover:text-blue-700 underline'>free digital scheduling tool</a>, on the other hand, allows you to build and share rosters online, make real-time updates, and automatically notify staff of changes. Digital scheduling reduces admin time, helps prevent double-ups, and ensures your team always has the latest version.",
  },
];

export default async function FreeStaffRosterTemplateExcelPage() {
  const { isEnabled } = await draftMode();
  const client = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );

  // Fetch the recommended blog posts
  const recommendedPosts = await client.fetch(recommendedPostsQuery);

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section - Server Rendered */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <HiDownload className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-green-600 font-semibold">
                    FREE DOWNLOAD
                  </span>
                </div>

                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Free Staff Roster Template (Excel)
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                  Stop struggling with roster creation. Download our
                  professionally designed Excel template specifically built for
                  shift work scheduling.
                </p>

                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <HiCheck className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>100% Free</strong> - No credit card required. Just
                    fill out the form and download instantly.
                  </p>
                </div>
              </div>

              {/* Form Section - Client Component */}
              <ExcelFormClient />
            </div>
          </Container>
        </div>

        {/* Features Section - Server Rendered */}
        <div className="py-20 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What's Included in the Template
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to create professional staff rosters in
                Excel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 text-center"
                  >
                    <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Template Preview
              </h3>
              <div className="bg-white rounded-lg shadow-lg p-8 overflow-hidden">
                <div className="relative overflow-hidden rounded">
                  <Image
                    src="/images/excel/excel-preview-new-1.png"
                    alt="Excel roster template preview showing a 6-week calendar with staff names, shift allocations, and automatic totals"
                    width={1200}
                    height={600}
                    className="w-full h-auto transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Recommended Reading Section - Server Rendered */}
        <section className="bg-white py-20">
          <Container>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Recommended reading for Excel Rosterers
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {recommendedPosts.map((post: any) => (
                <article
                  key={post._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <Link href={`/blog/${post.slug.current}`} className="block">
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
                        Read more
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

            {/* View all blogs CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                View all blogs
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

        {/* FAQ Section - Server Rendered */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Everything you need to know about our Excel roster template
              </p>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>

        {/* CTA Section - Server Rendered */}
        <div className="py-20 bg-white">
          <Container>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Still Creating Rosters Manually?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                While our Excel template saves time, RosterLab's AI can create
                optimized rosters in minutes, not hours. See how much time you
                could save.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/solutions/ai-staff-scheduling"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Learn About AI Rostering
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  );
}
