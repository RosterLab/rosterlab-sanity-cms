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
  title: "Optimisation Engineer — Mathematical Optimisation & AI",
  description:
    "Join RosterLab as an Optimisation Engineer and develop the mathematical optimisation and AI systems behind hospital rostering.",
  alternates: {
    canonical: "https://rosterlab.com/careers/optimisation-engineer",
  },
  openGraph: {
    title:
      "Optimisation Engineer — Mathematical Optimisation & AI | RosterLab Careers",
    description:
      "Develop the mathematical optimisation and AI systems behind RosterLab's hospital rostering platform.",
    type: "website",
    url: "https://rosterlab.com/careers/optimisation-engineer",
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
    title:
      "Optimisation Engineer — Mathematical Optimisation & AI | RosterLab Careers",
    description:
      "Develop the mathematical optimisation and AI systems behind RosterLab's hospital rostering platform.",
    images: ["/images/og-images/Careers.png"],
  },
};

export default function OptimisationEngineerPage() {
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
              Optimisation Engineer — Mathematical Optimisation &amp; AI
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
                Help develop the core intelligence behind AI-powered hospital
                rostering and solve difficult optimisation problems with direct
                real-world impact.
              </p>
              <a
                href="mailto:careers@rosterlab.com"
                className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <HiMail className="mr-2 h-5 w-5" />
                Apply Now — careers@rosterlab.com
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Job Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-8">
              RosterLab is a fast-growing, seed-funded SaaS startup building
              AI-powered optimisation software for hospital rostering. Our
              technology helps hospitals automate complex scheduling, improve
              staff work-life balance, reduce administrative workload, and
              operate more efficiently.
            </p>
            <p className="text-gray-600 mb-8">
              We are looking for an Optimisation Engineer to join our R&amp;D
              team and help develop the core intelligence behind our product.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You’ll Do
            </h2>
            <p className="text-gray-600 mb-6">
              Your work will sit across two closely connected areas:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Mathematical Optimisation
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
              <li>
                Develop and improve optimisation models for complex hospital
                rostering problems.
              </li>
              <li>
                Work with techniques such as integer programming, decomposition,
                and metaheuristics.
              </li>
              <li>
                Improve solution quality, robustness, and computational
                performance.
              </li>
              <li>
                Build new modelling techniques that map closely to real-world
                scenarios.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI Agents
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
              <li>
                Help develop our AI rostering agent, which interacts heavily
                with our optimisation engine and scheduling algorithms.
              </li>
              <li>
                Build ways for the agent to understand rostering requirements,
                configure and interrogate optimisation models, diagnose
                problems, and improve solutions.
              </li>
              <li>
                Explore how LLMs and optimisation algorithms can work together
                to automate increasingly complex parts of the rostering process.
              </li>
            </ul>

            <p className="text-gray-600 mb-8">
              You’ll work closely with our engineering and product teams to turn
              research and prototypes into production software.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who You Are
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
              <li>
                Master’s or PhD in a STEM discipline is required, ideally
                Operations Research, Engineering Science, Computer Science,
                Mathematics, Statistics, or a related quantitative field.
              </li>
              <li>
                Strong mathematical and algorithmic problem-solving ability.
              </li>
              <li>
                Experience with mathematical optimisation, constraint
                programming, heuristics, metaheuristics, algorithms, or
                operations research.
              </li>
              <li>
                Strong programming skills and comfortable rapidly prototyping
                and testing new approaches.
              </li>
              <li>
                Interested in the intersection of optimisation and modern AI/LLM
                systems.
              </li>
              <li>
                Research-minded and experimental — you enjoy benchmarking
                approaches, investigating why algorithms behave the way they do,
                and finding better solutions.
              </li>
              <li>
                Comfortable working on difficult, open-ended problems in a
                fast-moving startup.
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
              <li>
                Work on genuinely difficult optimisation problems with direct
                real-world impact.
              </li>
              <li>
                Significant freedom to research, prototype, and introduce new
                approaches.
              </li>
              <li>Equity/ESOP in the company.</li>
              <li>
                Direct influence over RosterLab’s core optimisation and AI
                technology.
              </li>
              <li>
                The opportunity to improve working conditions for healthcare
                professionals around the world.
              </li>
              <li>
                Rapid technical and career growth as an early member of the
                R&amp;D team.
              </li>
            </ul>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply</h2>
              <p className="text-gray-600 mb-6">
                Send your CV and a short note about what drew you to the role to{" "}
                <a
                  href="mailto:careers@rosterlab.com"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  careers@rosterlab.com
                </a>
                .
              </p>
              <a
                href="mailto:careers@rosterlab.com"
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
