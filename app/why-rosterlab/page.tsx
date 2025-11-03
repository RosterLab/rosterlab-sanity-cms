import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import { HiLightBulb, HiScale, HiTrendingUp } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { getVariant } from "@/lib/amplitude/experiment-server";
import { ExperimentFlags } from "@/lib/amplitude/experiment-utils";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Why Choose RosterLab - AI-Powered Rostering Solutions",
    description:
      "Discover why healthcare organisations choose RosterLab for their rostering needs. Our team is dedicated to building smarter, fairer rostering solutions that put people first.",
    alternates: {
      canonical: "https://rosterlab.com/why-rosterlab",
    },
    other: {
      link: '<link rel="preload" href="/images/illustration/Timeline-pana.svg" as="image" type="image/svg+xml" fetchpriority="high" />',
    },
    openGraph: {
      title: "Why Choose RosterLab - AI-Powered Rostering Solutions",
      description:
        "Discover why healthcare organisations choose RosterLab for their rostering needs. Our team is dedicated to building smarter, fairer rostering solutions that put people first.",
      type: "website",
      url: "https://rosterlab.com/why-rosterlab",
      images: [
        {
          url: "/images/og-images/About.png",
          width: 1200,
          height: 630,
          alt: "Why Choose RosterLab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Why Choose RosterLab - AI-Powered Rostering Solutions",
      description:
        "Discover why healthcare organisations choose RosterLab for their rostering needs. Our team is dedicated to building smarter, fairer rostering solutions that put people first.",
      images: ["/images/og-images/About.png"],
    },
  },
  "/why-rosterlab",
);

export default async function WhyRosterLabPage() {
  // A/B Test: Header text based on experiment variant
  const headerVariant = await getVariant(ExperimentFlags.ABOUT_PAGE_HEADER);
  const headerText =
    headerVariant?.value === "enabled"
      ? "Why Choose RosterLab"
      : "Why Choose RosterLab";
  return (
    <SiteLayout>
      {/* Hero Section */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Why Choose{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                  }}
                >
                  RosterLab
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We transform the way rostering works, making it faster, safer,
                and more efficient.
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
              <div
                className="w-full max-w-2xl relative group cursor-pointer"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src="/images/updated-hero/updated-hero-image.webp"
                  alt="RosterLab video preview"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  priority
                  fetchPriority="high"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg group-hover:bg-opacity-40 transition-all">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <svg
                      className="w-10 h-10 text-blue-600 ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Some tools help you make a roster. RosterLab solves it.
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our AI considers every rule, constraint, and preference to
                create the best possible schedule - automatically. That means
                you can reduce your admin by 90%.
              </p>
              <Button
                href="/book-a-demo"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                See How We Do It
              </Button>
            </div>
            <div>
              <Image
                src="/images/generating.webp"
                alt="AI roster generator in action"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Mission Section Clone - White Background */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/generating.webp"
                alt="AI roster generator in action"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Some rosters are easy. We handle the complex ones.
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Some rosters are simple and can easily be rostered manually.
                Others feel impossible. RosterLab was built for the most complex
                ones.
              </p>
              <Button
                href="/book-a-demo"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                See How We Do It
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mission Section Clone 2 - Gradient Background */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Some tools help you make a roster. RosterLab solves it.
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our AI considers every rule, constraint, and preference to
                create the best possible schedule - automatically. That means
                you can reduce your admin by 90%.
              </p>
              <Button
                href="/book-a-demo"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                See How We Do It
              </Button>
            </div>
            <div>
              <Image
                src="/images/generating.webp"
                alt="AI roster generator in action"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Comparison Table Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why RosterLab stands out
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare RosterLab's AI-powered features with traditional rostering
              solutions
            </p>
          </div>

          {/* Comparison Table */}
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-500">
                  <th className="py-4 px-6 text-left text-white font-semibold">
                    Features
                  </th>
                  <th className="py-4 px-6 text-center text-white font-semibold">
                    RosterLab
                  </th>
                  <th className="py-4 px-6 text-center text-white font-semibold">
                    Other Competitors
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 bg-yellow-50 border-l-4 border-yellow-400">
                  <td className="py-4 px-6 text-gray-900 font-semibold">
                    AI-Powered Rostering
                  </td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold text-xl">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-gray-400 text-xl">
                    ✗
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-yellow-50 border-l-4 border-yellow-400">
                  <td className="py-4 px-6 text-gray-900 font-semibold">
                    Complex Multi-Session Scheduling
                  </td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold text-xl">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-gray-400 text-xl">
                    ✗
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-yellow-50 border-l-4 border-yellow-400">
                  <td className="py-4 px-6 text-gray-900 font-semibold">
                    Staff Preference Optimization
                  </td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold text-xl">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-gray-400 text-xl">
                    ✗
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">
                    Advanced Rules & Compliance
                  </td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold text-xl">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-orange-500 text-xl">
                    ~
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">
                    Real-Time Staffing Analytics
                  </td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold text-xl">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-orange-500 text-xl">
                    ~
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-yellow-50 border-l-4 border-yellow-400">
                  <td className="py-4 px-6 text-gray-900 font-semibold">
                    Workforce Consulting Services
                  </td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold text-xl">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-gray-400 text-xl">
                    ✗
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-yellow-50 border-l-4 border-yellow-400">
                  <td className="py-4 px-6 text-gray-900 font-semibold">
                    Robotic Process Automation (RPA)
                  </td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold text-xl">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-gray-400 text-xl">
                    ✗
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">
                    Enterprise SSO & API Access
                  </td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold text-xl">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-orange-500 text-xl">
                    ~
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-xl">✓</span>
                <span className="text-gray-600">Fully supported</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 text-xl">~</span>
                <span className="text-gray-600">
                  Limited or partial support
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xl">✗</span>
                <span className="text-gray-600">Not available</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded border-l-4 border-yellow-400">
                <span className="text-gray-900 font-semibold">
                  Highlighted = RosterLab USP
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by global teams around the world
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
              Our diverse team combines expertise in optimisation, AI,
              healthcare operations, and workforce management to deliver
              innovative rostering solutions.
            </p>

            {/* Trusted Logos */}
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
                  src="/images/logos/western.png"
                  alt="Western Health"
                  width={140}
                  height={60}
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
        </Container>
      </div>

      {/* Metrics Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Better Team & Business Outcomes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Metric 1 */}
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg">
              <div className="text-5xl font-bold text-blue-600 mb-4">90%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Time Saved
              </h3>
              <p className="text-gray-600">
                Reduce admin time by 90% with AI-powered automation
              </p>
            </div>

            {/* Metric 2 */}
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg">
              <div className="text-5xl font-bold text-blue-600 mb-4">100%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Compliance
              </h3>
              <p className="text-gray-600">
                Ensure 100% compliance with complex rostering rules
              </p>
            </div>

            {/* Metric 3 */}
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg">
              <div className="text-5xl font-bold text-blue-600 mb-4">24/7</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Support
              </h3>
              <p className="text-gray-600">
                Access expert support and consulting services anytime
              </p>
            </div>
          </div>

          {/* Loved by our users - Image and Quote Widget */}
          <div className="max-w-6xl mx-auto mt-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1 flex items-center justify-center">
                <Image
                  src="/images/illustration/Doctor.svg"
                  alt="Healthcare professional illustration"
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-md"
                />
              </div>

              {/* Speech Bubble */}
              <div className="relative order-1 lg:order-2">
                <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden">
                    <div className="w-8 h-8 bg-white transform rotate-45"></div>
                  </div>

                  <div className="text-center">
                    <blockquote className="text-xl md:text-2xl text-neutral-700 mb-8 leading-relaxed">
                      &ldquo;Rostering would take 7-8 days, now it takes 2-3
                      hours…allowing me to focus more on patient care.&rdquo;
                    </blockquote>

                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-20 h-12 relative">
                        <Image
                          src="/images/logos/whanganui.png"
                          alt="Whanganui"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">Mike</p>
                        <p className="text-neutral-600">
                          Associate Clinical Manager Radiology
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
