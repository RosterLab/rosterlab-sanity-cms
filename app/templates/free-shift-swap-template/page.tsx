import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import { validatedToken } from "@/sanity/lib/token";
import ShiftSwapFormClient from "./ShiftSwapFormClient";
import Container from "@/components/ui/Container";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";
import {
  HiCheck,
  HiDownload,
  HiSwitchHorizontal,
  HiClipboardCheck,
  HiUserGroup,
} from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Button from "@/components/ui/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Shift Swap Template - RosterLab",
  description:
    "Download our free shift swap request form template. Streamline staff shift exchanges with our professionally designed Word template.",
  alternates: {
    canonical: "https://rosterlab.com/templates/free-shift-swap-template",
  },
  openGraph: {
    title: "Free Shift Swap Template - RosterLab",
    description:
      "Download our free shift swap request form template. Streamline staff shift exchanges with our professionally designed Word template.",
    images: [
      {
        url: "/images/og-images/ShiftSwap.png",
        width: 1200,
        height: 600,
        alt: "Shift swap template preview",
      },
    ],
    type: "website",
    url: "/templates/free-shift-swap-template",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Shift Swap Template - RosterLab",
    description:
      "Download our free shift swap request form template. Streamline staff shift exchanges with our professionally designed Word template.",
    images: ["/images/og-images/ShiftSwap.png"],
  },
};

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && 
    (slug.current in ["comprehensive-guide-shift-swaps", 
                      "benefits-of-self-scheduling-for-shift-workers", 
                      "shift-bidding-guide-how-to-implement"])] {
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
    icon: HiSwitchHorizontal,
    title: "Manual shift swap form",
    description:
      "Pre-formatted fields for requesting shift swaps, including dates, times, and replacement staff details.",
  },
  {
    icon: HiUserGroup,
    title: "Employee information fields",
    description:
      "Dedicated sections for both requesting and covering employees, ensuring clear documentation of shift exchanges.",
  },
  {
    icon: HiClipboardCheck,
    title: "Customisable Template",
    description:
      "Easily modify fields to match your organisation's specific requirements and approval process.",
  },
];

const benefits = [
  "Standardise shift swaps across your organisation",
  "Track and document all shift exchanges manually",
  "Customisable and printable template",
];

const faqItems = [
  {
    question: "Who is this shift swap template for?",
    answer:
      "This free shift swap template is designed for managers, HR teams, and staff roster coordinators who need a standardised way to manage shift exchange requests. It's ideal for any workplace where employees need to swap shifts occasionally and managers need to approve these changes.",
  },
  {
    question: "Why do I need a shift swap form?",
    answer:
      "Without a proper shift swap process, you risk scheduling conflicts, understaffing, and confusion about who's working when. A standardised form ensures all shift swaps are properly documented, approved by management, and communicated to all relevant parties - preventing costly mistakes and maintaining proper coverage.",
  },
  {
    question: "How does this compare to digital shift swap management?",
    answer:
      "While this template provides structure for shift swap requests, our <a href='/solutions/free-staff-scheduling' class='text-blue-600 hover:text-blue-700 underline'>digital rostering solution</a> automates the entire process. Staff can request swaps through their phones, managers get instant notifications for approval, and the roster updates automatically - eliminating paperwork and reducing admin time by up to 80%.",
  },
];

export default async function FreeShiftSwapTemplatePage() {
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
                  Free Shift Swap Template
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                  Streamline your shift exchange process. Download our
                  professionally designed shift swap request form to manage
                  staff roster changes.
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
              <ShiftSwapFormClient />
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
                Everything you need to manage shift swap requests manually
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
                    src="/images/shift-swap/shift-swap-preview.png"
                    alt="Shift swap template preview showing request form with employee details, shift information, and approval sections"
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
              Learn More About Effective Shift Swaps
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
                Everything you need to know about managing shift swaps
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
                Still Managing Shift Swaps Manually?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                While our template helps organise requests, RosterLab automates
                the entire shift swap process. Let staff request swaps through
                their phones and get instant manager approvals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/feature/shift-swaps"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Learn About Digital Shift Swaps
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  );
}
