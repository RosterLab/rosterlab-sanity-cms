import Container from "@/components/ui/Container";
import SiteLayout from "@/components/layout/SiteLayout";
import {
  HiMail,
  HiLocationMarker,
  HiBriefcase,
  HiCurrencyDollar,
} from "react-icons/hi";
import Link from "next/link";

export const metadata = {
  title: "B2B Marketing Specialist - Healthcare - RosterLab Careers",
  description:
    "Join RosterLab as a B2B Marketing Specialist - Healthcare. Produce marketing content and market intelligence for healthcare workforce planning.",
  alternates: {
    canonical: "https://rosterlab.com/careers/marketing-content-specialist",
  },
  openGraph: {
    title: "B2B Marketing Specialist - Healthcare - RosterLab Careers",
    description:
      "Join RosterLab as a B2B Marketing Specialist - Healthcare. Produce marketing content and market intelligence for healthcare workforce planning.",
    type: "website",
    url: "https://rosterlab.com/careers/marketing-content-specialist",
    images: [
      {
        url: "/images/og-images/Careers.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Marketing Specialist - Healthcare - RosterLab Careers",
    description:
      "Join RosterLab as a B2B Marketing Specialist - Healthcare. Produce marketing content and market intelligence for healthcare workforce planning.",
    images: ["/images/og-images/Careers.png"],
  },
};

export default function MarketingContentSpecialistPage() {
  return (
    <SiteLayout>
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Link
              href="/careers"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Careers
            </Link>

            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Now Hiring
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              B2B Marketing Specialist - Healthcare
            </h1>

            <div className="flex flex-wrap gap-4 mb-8">
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-gray-700 font-medium shadow-sm">
                <HiLocationMarker className="w-5 h-5 text-blue-600" />
                Auckland — Hybrid — NZ
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-gray-700 font-medium shadow-sm">
                <HiBriefcase className="w-5 h-5 text-green-600" />
                Full-time
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-gray-700 font-medium shadow-sm">
                <HiCurrencyDollar className="w-5 h-5 text-purple-600" />
                Salary + ESOP
              </span>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg">
              <p className="text-lg mb-4">
                Help shape the future of healthcare workforce planning through
                content that builds trust and credibility with hospital leaders.
              </p>
              <a
                href="mailto:sunny@rosterlab.com"
                className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <HiMail className="mr-2 h-5 w-5" />
                Apply Now - sunny@rosterlab.com
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Job Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* About RosterLab */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              About RosterLab
            </h2>
            <p className="text-gray-600 mb-4">
              RosterLab is a VC-funded SaaS startup transforming healthcare
              workforce planning. Our AI-powered optimisation platform helps
              hospitals automate the creation of highly complex staff rosters,
              reducing admin time, improving fairness, and enabling better
              patient care.
            </p>
            <p className="text-gray-600 mb-4">
              We work with hospitals and health networks across Australia, New
              Zealand, and Singapore, and are exploring expansion into the US
              market.
            </p>
            <p className="text-gray-600 mb-8">
              Healthcare rostering is a harder problem than most people realise.
              Hospitals run 24/7 across dozens of specialties, each with
              different staffing rules, award interpretations, fatigue
              regulations, and skill-mix requirements. Most still rely on
              spreadsheets, manual processes, or legacy systems that weren't
              built for the complexity. That's what we're replacing, not another
              SaaS competitor, but the status quo.
            </p>

            {/* What makes this role different */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What makes this role different
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
              <li>
                <strong>Deep customer access:</strong> you'll sit in on sales
                calls, visit hospitals, and talk directly to nurses, directors,
                and workforce managers. This isn't arm's-length marketing.
              </li>
              <li>
                <strong>Deeply understand our buyers and product:</strong>{" "}
                you'll become the person who understands our buyers and our
                product deeply enough to articulate why RosterLab matters,
                differently for each audience.
              </li>
              <li>
                <strong>Direct line to founders:</strong> small team, no layers.
                Your work goes straight into sales conversations and
                market-facing content.
              </li>
              <li>
                <strong>Room to grow:</strong> this role starts hands-on with
                content and collateral, and grows into owning our full messaging
                and positioning strategy as the company scales.
              </li>
              <li>
                <strong>Meaningful product:</strong> your work helps clinicians
                get fairer shifts, less burnout, and better coverage. It
                matters.
              </li>
            </ul>

            {/* The role */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The role</h2>
            <p className="text-gray-600 mb-4">
              You'll produce marketing content and market intelligence for
              RosterLab. That means deeply understanding our buyers, from nurses
              and workforce managers to clinical directors and CFOs, and
              producing content that speaks credibly to each of them.
            </p>
            <p className="text-gray-600 mb-4">
              You'll combine research, writing, and strategic thinking to help
              us build trust in a complex, relationship-driven market.
            </p>
            <p className="text-gray-600 mb-8">
              You won't be a generalist running campaigns. You'll be the person
              who understands the healthcare buyer landscape and translates that
              into content that lands.
            </p>
            <p className="text-gray-600 mb-8">
              If you've worked in a healthcare environment or healthtech, or
              have a genuine passion for the industry through people close to
              you, we want to hear from you.
            </p>

            {/* What you'll do */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What you'll do
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Content creation
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>
                Write case studies, white papers, blog posts, one-pagers, email
                campaigns, and newsletters tailored to different buyer personas
              </li>
              <li>
                Manage and grow RosterLab's presence across social media
                channels, creating content that builds credibility with
                healthcare stakeholders
              </li>
              <li>
                Analyse how visitors find and engage with our content, and
                develop strategies to improve retention and conversion across
                the funnel
              </li>
              <li>
                Ensure everything produced is specific, grounded, and sounds
                like it was written by someone who understands hospitals
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Market research & buyer insight
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>
                Research the healthcare workforce planning landscape: buyer
                roles, pain points, procurement dynamics, competitive context
              </li>
              <li>
                Run customer and prospect interviews to capture real language
                and unmet needs
              </li>
              <li>
                Sit in on sales calls and feed insights back into messaging and
                content
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Growth, lead gen & optimisation
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>
                Support SEO strategy: keyword research, on-page optimisation,
                content gap analysis
              </li>
              <li>
                Identify and test cost-effective lead generation tactics — from
                content-driven inbound to supporting outbound sequences with the
                right collateral
              </li>
              <li>
                Help nurture inbound leads through timely, relevant follow-up
                content and campaigns
              </li>
              <li>
                Run A/B tests on messaging, CTAs, and landing pages to improve
                conversion
              </li>
              <li>
                Track what drives qualified pipeline and feed that back into
                content and channel decisions
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Market & messaging input
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>
                Help refine persona-specific messaging as we expand into new
                markets and segments
              </li>
              <li>
                Identify content gaps and prioritise based on where we are in
                the sales cycle
              </li>
              <li>
                Work with founders and our demand gen agency to pressure-test
                what's working
              </li>
            </ul>

            {/* What you'll bring */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What you'll bring
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
              <li>
                B2B SaaS marketing, ideally with some exposure to product
                marketing, content, or sales enablement.
              </li>
              <li>
                Strong writing ability: you can produce a case study or
                one-pager that's specific and persuasive, not just
                well-formatted.
              </li>
              <li>
                Genuine curiosity about customers. You find buyer interviews
                interesting, not box-ticking.
              </li>
              <li>
                Comfort with complexity: you don't need a simple product to do
                great work, and you're willing to invest in learning ours
                deeply.
              </li>
              <li>
                Ability to work independently and figure things out without
                daily direction.
              </li>
              <li>
                We prefer any background in health tech, or healthcare. If
                you're a clinician looking to transition careers and you have
                experience in clinical operations, this is for you!
              </li>
              <li>
                Bonus: experience writing for senior buyers (Director, C-suite)
                in complex or regulated environments.
              </li>
              <li>
                Bonus: experience understanding a complex product and turning
                complexity into simple, customer-driven stories and messages.
              </li>
            </ul>

            {/* How we work */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How we work
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
              <li>Small team (~12 people), fast cycles, high ownership.</li>
              <li>Direct access to founders and customers.</li>
              <li>Pragmatic quality: clear, shippable, measurable.</li>
              <li>Curiosity, kindness, and bias to action.</li>
            </ul>

            {/* Apply */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply</h2>
              <p className="text-gray-600 mb-6">
                Email examples of B2B content you've produced, along with a note
                on what drew you to this role, to{" "}
                <a
                  href="mailto:sunny@rosterlab.com"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  sunny@rosterlab.com
                </a>
              </p>
              <a
                href="mailto:sunny@rosterlab.com"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <HiMail className="mr-2 h-5 w-5" />
                Apply Now
              </a>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
