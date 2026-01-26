import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import { validatedToken } from "@/sanity/lib/token";
import EmployeeOfMonthFormClient from "./EmployeeOfMonthFormClient";
import Container from "@/components/ui/Container";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";
import { HiCheck, HiPencilAlt, HiStar, HiTemplate } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Button from "@/components/ui/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Editable Employee of the Month Template",
  description:
    "Download our free, editable Employee of the Month certificate template on Canva. Recognise outstanding team members with a professionally designed certificate.",
  alternates: {
    canonical:
      "https://rosterlab.com/templates/free-employee-of-the-month-certificate",
  },
  openGraph: {
    title: "Free Editable Employee of the Month Template",
    description:
      "Download our free, editable Employee of the Month certificate template on Canva. Recognise outstanding team members with a professionally designed certificate.",
    images: [
      {
        url: "/images/employee-certificate/employee-of-month-editable-certificate-preview.png",
        width: 1200,
        height: 600,
        alt: "Employee of the Month certificate template preview",
      },
    ],
    type: "website",
    url: "/templates/free-employee-of-the-month-certificate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Editable Employee of the Month Template",
    description:
      "Download our free, editable Employee of the Month certificate template on Canva. Recognise outstanding team members with a professionally designed certificate.",
    images: [
      "/images/employee-certificate/employee-of-month-editable-certificate-preview.png",
    ],
  },
};

// Query for recommended blog posts
const recommendedPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) &&
    (slug.current in ["employee-recognition-programs-boost-morale",
                      "workplace-culture-best-practices",
                      "employee-engagement-strategies"])] {
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
    icon: HiPencilAlt,
    title: "Fully Editable in Canva",
    description:
      "Customise the certificate with employee names, dates, and personalised messages using Canva's easy-to-use editor.",
  },
  {
    icon: HiTemplate,
    title: "Professional Design",
    description:
      "Beautifully designed certificate that looks professional and can be printed or shared digitally.",
  },
  {
    icon: HiStar,
    title: "Ready to Print",
    description:
      "Optimised for standard paper sizes and high-quality printing to create an impressive recognition award.",
  },
];

const benefits = [
  "Recognise employee achievements professionally",
  "Fully customisable template - edit in Canva",
  "Print or share digitally with your team",
];

const faqItems = [
  {
    question: "Who is this Employee of the Month certificate for?",
    answer:
      "This free certificate template is perfect for managers, HR teams, and business owners who want to recognise and celebrate outstanding employee performance. It's ideal for companies of any size looking to boost morale and show appreciation for their team members' hard work.",
  },
  {
    question: "How do I edit the certificate template?",
    answer:
      "After submitting the form, you'll receive access to the template on Canva. Simply click the button to open it in Canva's editor, where you can easily customise the employee name, date, achievement details, and any other text. No design experience required - Canva makes it simple to personalise your certificates.",
  },
  {
    question: "Can I use this template multiple times?",
    answer:
      "Yes! Once you have access to the Canva template, you can use it as many times as you need. Create certificates for different employees each month, save variations, and keep your employee recognition program consistent and professional.",
  },
  {
    question: "What format is the certificate in?",
    answer:
      "The certificate is a fully editable Canva template. You can download it as a PDF for printing, save it as an image to share digitally, or use Canva's print service to have professional certificates delivered to you.",
  },
];

export default async function FreeEmployeeOfMonthCertificatePage() {
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
                    <HiStar className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-green-600 font-semibold">
                    FREE TEMPLATE
                  </span>
                </div>

                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Free Employee of the Month Certificate
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                  Recognise outstanding team members with our professionally
                  designed, fully editable Canva certificate template.
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
                    <strong>100% Free</strong> - No credit card required. Access
                    your editable Canva template instantly.
                  </p>
                </div>
              </div>

              {/* Form Section - Client Component */}
              <EmployeeOfMonthFormClient />
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
                Everything you need to create professional employee recognition
                certificates
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
                    src="/images/employee-certificate/employee-of-month-editable-certificate-preview.png"
                    alt="Employee of the Month certificate template preview showing professional design with space for employee name and achievement details"
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
        {recommendedPosts.length > 0 && (
          <section className="bg-white py-20">
            <Container>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Learn More About Employee Recognition
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

              {/* CTAs */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
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

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md bg-white border-2 border-blue-600 px-8 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Learn About RosterLab
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
        )}

        {/* FAQ Section - Server Rendered */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Everything you need to know about the Employee of the Month
                certificate
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
                Ready to Streamline Your Workforce Management?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                While certificates recognise great work, RosterLab helps create
                it. Discover how our workforce management platform empowers your
                team to perform at their best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/solutions/free-staff-rostering-software"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Explore RosterLab
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  );
}
