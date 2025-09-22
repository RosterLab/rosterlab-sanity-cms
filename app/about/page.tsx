import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import { HiLightBulb, HiScale, HiTrendingUp } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { getVariant } from "@/lib/amplitude/experiment-server";
import { ExperimentFlags } from "@/lib/amplitude/experiment-utils";
import { withHreflang } from "@/components/seo/HreflangTags";

export const metadata = withHreflang(
  {
    title: "About Us - Meet the Team Behind RosterLab",
    description:
      "Learn about us and the people behind RosterLab. Our team is dedicated to building smarter, fairer rostering solutions that put people first.",
    alternates: {
      canonical: "https://rosterlab.com/about",
    },
    other: {
      link: '<link rel="preload" href="/images/illustration/Timeline-pana.svg" as="image" type="image/svg+xml" fetchpriority="high" />',
    },
    openGraph: {
      title: "About Us - Meet the Team Behind RosterLab",
      description:
        "Learn about us and the people behind RosterLab. Our team is dedicated to building smarter, fairer rostering solutions that put people first.",
      type: "website",
      url: "https://rosterlab.com/about",
      images: [
        {
          url: "/images/og-images/About.png",
          width: 1200,
          height: 630,
          alt: "About RosterLab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us - Meet the Team Behind RosterLab",
      description:
        "Learn about us and the people behind RosterLab. Our team is dedicated to building smarter, fairer rostering solutions that put people first.",
      images: ["/images/og-images/About.png"],
    },
  },
  "/about",
);

export default async function AboutPage() {
  // A/B Test: Header text based on experiment variant
  const headerVariant = await getVariant(ExperimentFlags.ABOUT_PAGE_HEADER);
  const headerText =
    headerVariant?.value === "enabled"
      ? "About the RosterLab Team"
      : "The RosterLab Story";
  return (
    <SiteLayout>
      {/* Hero Section */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {headerText === "About the RosterLab Team" ? (
                  <>
                    About the RosterLab{" "}
                    <span
                      className="text-transparent bg-clip-text"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                      }}
                    >
                      Team
                    </span>
                  </>
                ) : (
                  <>
                    The RosterLab{" "}
                    <span
                      className="text-transparent bg-clip-text"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                      }}
                    >
                      Story
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We transform the way rostering works, making it faster, safer,
                and more efficient.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/careers"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  View Open Positions
                </Button>
                <Button
                  href="/contact"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Timeline Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="w-full max-w-2xl relative"
                style={{ aspectRatio: "600/400" }}
              >
                <Image
                  src="/images/illustration/Timeline-pana.svg"
                  alt="Timeline illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                  fetchPriority="high"
                  placeholder="empty"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
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
                Our Company
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                RosterLab was born from a love of mathematics and a deep respect
                for the voices of healthcare leaders - those constantly pulled
                away from critical clinical work to manage rosters.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                That's why we are here. We automate the rostering process using
                world-leading technology that no one else can match, allowing
                your team to spend less time rostering and more time on what
                truly matters.
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
                src="/images/team/rosterlab-team-photo.webp"
                alt="RosterLab founders"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Values Section */}
      <Container>
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiLightBulb className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Innovation
              </h3>
              <p className="text-gray-600">
                We push the boundaries of what&apos;s possible with cutting-edge
                AI and optimisation algorithms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiScale className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fairness</h3>
              <p className="text-gray-600">
                The solution we build prioritises workplace safety, staff
                equity, and operational efficiency.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiTrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
              <p className="text-gray-600">
                We measure success by time saved, stress reduced & lives
                improved through better rostering.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Team Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our diverse team combines expertise in optimisation, AI,
              healthcare operations, and workforce management to deliver
              innovative rostering solutions.
            </p>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              The Founding Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src="/images/team/headshot-isaac.webp"
                    alt="Isaac Cleland, PhD"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xl font-bold text-gray-900">
                      Isaac Cleland, PhD
                    </h4>
                    <a
                      href="https://www.linkedin.com/in/isaac-cleland-01652387/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Isaac's LinkedIn"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-blue-600 font-medium mb-3">
                    Founder & CEO
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Isaac is the brain behind our AI engine. With a PhD in
                    rostering optimisation, he leads the development of our core
                    algorithms and technology. As the CEO, he brings vision to
                    the impact that RosterLab delivers for healthcare teams.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src="/images/team/headshot-sunny.webp"
                    alt="Sunny Feng"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xl font-bold text-gray-900">
                      Sunny Feng
                    </h4>
                    <a
                      href="https://www.linkedin.com/in/sunny-feng-042085b4/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Sunny's LinkedIn"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-blue-600 font-medium mb-3">
                    Co-Founder - Product & Marketing
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Sunny leads our product and marketing strategy, shaping the
                    vision behind what we build and how we bring it to the
                    world. She's passionate about creating user-centric tools
                    and truly supports the people who rely on them.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src="/images/team/headshot-daniel.webp"
                    alt="Daniel Ge"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xl font-bold text-gray-900">
                      Daniel Ge
                    </h4>
                    <a
                      href="https://www.linkedin.com/in/daniel-ge-a177ba158/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Daniel's LinkedIn"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-blue-600 font-medium mb-3">
                    Co-Founder - Sales & Implementation
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Daniel works closely with customers, bringing a deep
                    understanding of healthcare rostering challenges. He ensures
                    our solutions meet real-world needs and make a difference
                    from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Team */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Our Board Members & Advisors
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 relative mx-auto mb-4">
                  <Image
                    src="/images/team/mohan.webp"
                    alt="Mohan Nair"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">Mohan Nair</h4>
                  <a
                    href="https://www.linkedin.com/in/mohanemerge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="Mohan's LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-blue-600 mb-2 text-center">
                  Independent Board Chair
                </p>
                <p className="text-sm text-gray-600 text-left">
                  A serial corporate innovator and former Chief Innovation
                  Officer at Cambia Health Solutions, Mohan has launched seven
                  corporate start-ups, achieved two entrepreneurial exits and
                  authored three books on transformation. As Chair of
                  RosterLab’s board, he channels his AI and healthcare insight
                  to sharpen our strategy and drive international expansion.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 relative mx-auto mb-4">
                  <Image
                    src="/images/team/david.webp"
                    alt="David Beard"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">David Beard</h4>
                  <a
                    href="https://www.linkedin.com/in/david-beard-99110216/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="David's LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-blue-600 mb-2 text-center">
                  Board Member & Investor
                </p>
                <p className="text-sm text-gray-600 text-left">
                  General Partner at Movac, New Zealand’s leading deep-tech
                  venture firm, David has overseen investments in more than 50
                  technology companies and landmark exits such as PowerbyProxi’s
                  sale to Apple. His scale-up experience and investor
                  perspective reinforce RosterLab’s board as we grow from seed
                  stage to global leader in AI rostering.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 relative mx-auto mb-4">
                  <Image
                    src="/images/team/cathal.webp"
                    alt="Cathal McCloy"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">Cathal McCloy</h4>
                  <a
                    href="https://www.linkedin.com/in/cathal-mccloy-21a760238/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="Cathal's LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-blue-600 mb-2 text-center">
                  Medical Advisor
                </p>
                <p className="text-sm text-gray-600 text-left">
                  A Wellington-based general physician and geriatrician, IMSANZ
                  Council member and long-time advocate for safer clinician
                  hours, Cathal serves as RosterLab’s medical advisor. His
                  frontline insights ensure our algorithms embed clinical-safety
                  and fatigue-management principles, turning real-world ward
                  challenges into smarter, fairer rosters.
                </p>
              </div>
            </div>

            {/* Investor Logos */}
            <div className="mt-12">
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10">
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/investor logos/Pacific-Channel-Logo-RGB-Stacked-Black-Text.png"
                    alt="Pacific Channel"
                    width={200}
                    height={100}
                    className="max-w-full h-auto grayscale"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/investor logos/Movac-Primary-RGB-72-Transparent_150402.png"
                    alt="Movac"
                    width={160}
                    height={80}
                    className="max-w-full h-auto grayscale"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/investor logos/QV_Primary_RGB.png"
                    alt="Quay Ventures"
                    width={120}
                    height={60}
                    className="max-w-full h-auto grayscale"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/investor logos/footer-logo-left.png"
                    alt="University of Auckland"
                    width={200}
                    height={100}
                    className="max-w-full h-auto grayscale ml-4"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/investor logos/Primary-logo.png"
                    alt="Primary Ventures"
                    width={160}
                    height={80}
                    className="max-w-full h-auto grayscale"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="mt-16 text-center bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Growing Team
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals passionate about
              solving complex scheduling challenges and improving healthcare
              operations.
            </p>
            <Button
              href="/careers"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              View Open Positions
            </Button>
          </div>
        </Container>
      </div>

      {/* Milestones Timeline Section */}
      <div className="hidden md:block py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to revolutionising healthcare scheduling, here
              are the key milestones in our story.
            </p>
          </div>

          {/* Timeline */}
          <div className="mx-auto" style={{ maxWidth: "1200px" }}>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>

              {/* Milestone 1 - PhD Research */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    The Idea Began
                  </h3>
                  <p className="text-gray-600 mt-2">
                    The idea began with Isaac's PhD research in roster
                    optimisation at the University of Auckland, where he
                    explored how operations research could dramatically improve
                    healthcare rostering.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <p className="text-lg font-semibold text-gray-700">
                    University Research
                  </p>
                </div>
              </div>

              {/* Milestone 2 - World Champions */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <p className="text-lg font-semibold text-gray-700">
                    International Recognition
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    World Champions In Automatic Rostering
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Our underlying technology has found the most optimal
                    solution to the International Nurse Rostering Competition.
                  </p>
                </div>
              </div>

              {/* Milestone 3 - Velocity Competition */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    Velocity Innovation Competition Winners
                  </h3>
                  <p className="text-gray-600 mt-2">
                    We won first place in the Velocity Innovation competition
                    hosted by the University Of Auckland in 2020.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <p className="text-lg font-semibold text-gray-700">2020</p>
                </div>
              </div>

              {/* Milestone 4 - Company Founded */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <p className="text-lg font-semibold text-gray-700">2022</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    RosterLab Founded
                  </h3>
                  <p className="text-gray-600 mt-2">
                    RosterLab was founded by Daniel, Sunny, and Isaac - a team
                    united by a shared mission to fix broken rostering systems
                    in complex industries like healthcare.
                  </p>
                </div>
              </div>

              {/* Milestone 5 - Global Expansion */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    Bringing Solutions to the World
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Our technology is used across multiple countries, changing
                    how organisations build and manage rosters.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <p className="text-lg font-semibold text-gray-700">2024</p>
                </div>
              </div>

              {/* Milestone 6 - Real-World Impact */}
              <div className="relative flex items-center justify-between">
                <div className="w-5/12 text-right pr-8">
                  <p className="text-lg font-semibold text-gray-700">Today</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    Real-World Impact
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Today, our staff rostering software is used by hundreds of
                    shift-working professionals across healthcare and other
                    industries, transforming the way people work and fostering a
                    safer, happier workplace culture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-gray-50 rounded-lg shadow-lg border-l-4 border-blue-500 text-center">
              <p className="text-xl text-gray-800 italic mb-4">
                "RosterLab has become integral to our operations planning, we
                can't imagine reverting to manual rostering."
              </p>
              <p className="text-gray-600 font-medium">
                — Duty Manager, MoM Singapore
              </p>
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
    </SiteLayout>
  );
}
