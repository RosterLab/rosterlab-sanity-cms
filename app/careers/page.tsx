import Container from "@/components/ui/Container";
import SiteLayout from "@/components/layout/SiteLayout";
import {
  HiMail,
  HiLocationMarker,
  HiLightningBolt,
  HiUserGroup,
  HiGlobeAlt,
} from "react-icons/hi";
import Image from "next/image";
import JobListing from "./JobListing";

export const metadata = {
  title: "Careers - Join our talented team at RosterLab",
  description:
    "Help shape the future of AI scheduling - explore open roles at RosterLab and join a mission-driven team creating smarter, fairer workforce solutions.",
  alternates: {
    canonical: "https://rosterlab.com/careers",
  },
  openGraph: {
    title: "Careers - Join our talented team at RosterLab",
    description:
      "Help shape the future of AI scheduling - explore open roles at RosterLab and join a mission-driven team creating smarter, fairer workforce solutions.",
    type: "website",
    url: "https://rosterlab.com/careers",
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
    title: "Careers - Join our talented team at RosterLab",
    description:
      "Help shape the future of AI scheduling - explore open roles at RosterLab and join a mission-driven team creating smarter, fairer workforce solutions.",
    images: ["/images/og-images/Careers.png"],
  },
};

export default function CareersPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Us in Revolutionising <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                }}
              >
                Workforce Scheduling
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Be part of a team that's making a real difference in healthcare by
              solving one of the industry's most complex challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/about"
                className="inline-flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Learn more about us
              </a>
              <a
                href="https://www.linkedin.com/company/rosterlab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Follow for updates
              </a>
            </div>
            {/* Team Illustration */}
            <div className="mt-12 max-w-3xl mx-auto">
              <Image
                src="/images/illustration/Team-pana.svg"
                alt="Join our team"
                width={768}
                height={576}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Why RosterLab */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join RosterLab?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just building software - we're transforming how
              healthcare organisations manage their most valuable asset: their
              people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiLightningBolt className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Meaningful Impact
              </h3>
              <p className="text-gray-600">
                Your work directly helps healthcare workers spend more time
                caring for patients and less time on scheduling.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiUserGroup className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Great Team Culture
              </h3>
              <p className="text-gray-600">
                Join a diverse, passionate team that values collaboration,
                innovation, and work-life balance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiGlobeAlt className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                People First
              </h3>
              <p className="text-gray-600">
                We prioritise our team's wellbeing with flexible work
                arrangements and a culture that values work-life balance.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <JobListing
              title="Implementation Engineer/Specialist"
              location="Auckland, NZ"
              type="Full-time"
              compensation="Salary + ESOP"
              description={`
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    About Us
                  </h4>
                  <p>
                    We are a fast-growing, seed-funded SaaS startup
                    revolutionising hospital rostering through a cutting-edge,
                    user-friendly optimisation platform. Our mission is to fully
                    automate and optimise the rostering process. In doing so, we
                    save valuable time for healthcare professionals, improve
                    work-life balance and improve operating efficiency. By
                    joining us, you'll be able to have a positive impact on the
                    lives of healthcare professionals worldwide.
                  </p>
                </div>

                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    What You'll Do
                  </h4>
                  <p class="font-medium mb-2">
                    Build roster optimisation models using our application
                  </p>
                  <ul class="list-disc pl-5 space-y-2 mb-4">
                    <li>
                      Set up data, configurate roster optimisation model within
                      app, testing, and user training
                    </li>
                    <li>
                      Gather and validate contractual and operational rostering
                      requirements from hospital stakeholders
                    </li>
                    <li>
                      Implement these requirements as clear, logical rules that
                      our software can execute
                    </li>
                  </ul>

                  <p class="font-medium mb-2">
                    Excel Modelling & Process Improvement
                  </p>
                  <ul class="list-disc pl-5 space-y-2 mb-4">
                    <li>
                      Conduct analyses to test, refine, and validate roster
                      scenarios. This requires strong logical thinking skills
                    </li>
                    <li>
                      Spot opportunities to enhance or automate our processes
                      and help clients adopt best practices in rostering
                    </li>
                  </ul>

                  <p class="font-medium mb-2">
                    Project Management and Stakeholder Engagement
                  </p>
                  <ul class="list-disc pl-5 space-y-2 mb-4">
                    <li>
                      Work with healthcare providers, hospital administrators,
                      and internal teams to understand scheduling challenges and
                      suggest solutions
                    </li>
                    <li>
                      Advise customers on best-practice use of RosterLab
                      software to maximise functionality and data insights
                    </li>
                    <li>
                      Ensure success in every onboarding from account creation
                      to fully automated rostering
                    </li>
                    <li>
                      Maintain relationships with our clients for their long
                      term success
                    </li>
                  </ul>

                  <p class="font-medium mb-2">Product Management</p>
                  <p>
                    Contribute ideas to our product roadmap, focusing on
                    features and improvements for our optimisation engine and
                    interface
                  </p>
                </div>

                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    About You
                  </h4>
                  <ul class="list-disc pl-5 space-y-2">
                    <li>
                      You <strong>must</strong> have a minimum of bachelors degree. Ideally from
                      engineering, stats, infosys, data, economics, maths, or
                      any optimisation related degrees.
                    </li>
                    <li>
                      Agile in a fast-paced environment, with a strong ability
                      to adapt and remain resilient through challenges and
                      changes.
                    </li>
                    <li>
                      Logical Thinker: You excel at breaking down complex
                      problems and translating them into clear, step-by-step
                      solutions.
                    </li>
                    <li>
                      Detail-Orientated: Accuracy is key in building robust
                      rostering models that serve critical healthcare needs.
                    </li>
                    <li>
                      Excellent Communicator: Comfortable engaging with
                      stakeholders at various levels, from front-line staff to
                      executives.
                    </li>
                    <li>
                      Likes Puzzles: The analytical challenge of creating roster
                      models can often be like a brain teaser.
                    </li>
                    <li>
                      Adaptable & Flexible: You thrive in a fast-paced startup
                      environment and enjoy tackling new challenges.
                    </li>
                    <li>
                      Analytical Skills: Familiarity with Excel or other data
                      tools for modelling and analysis.
                    </li>
                    <li>
                      Open to All Levels: Whether you're a fresh graduate eager
                      to learn or an experienced professional ready for a new
                      challenge, we want to hear from you.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    What We Offer
                  </h4>
                  <ul class="list-disc pl-5 space-y-2">
                    <li>
                      Equity/ESOP: Own a piece of the company you're helping to
                      build.
                    </li>
                    <li>
                      Rapid Growth: As an early-stage startup, you'll have the
                      opportunity to scale your career quickly.
                    </li>
                    <li>
                      Global Impact: Your work will directly improve the lives
                      of healthcare professionals and patients worldwide.
                    </li>
                    <li>
                      Product Influence: Play a pivotal role in shaping our core
                      offering and driving the evolution of our platform.
                    </li>
                    <li>
                      Collaborative Culture: Join a supportive, driven team that
                      values new ideas, experimentation, and continuous
                      learning.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    Why Join Us
                  </h4>
                  <ul class="list-disc pl-5 space-y-2">
                    <li>
                      Meaningful Work: We are making a big difference in
                      improving the lives of healthcare professionals, and we
                      have studies to prove it!
                    </li>
                    <li>
                      Venture Capital levels of growth: As our company scales
                      exponentially, so will your opportunities for growth,
                      influence, and long-term rewards.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">
                    How to Apply
                  </h4>
                  <p class="mb-2">
                    If you're excited about transforming healthcare rostering
                    and want to contribute to a groundbreaking SaaS solution,
                    we'd love to hear from you! Please send the following to
                    <a
                      href="mailto:careers@rosterlab.com"
                      class="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      careers@rosterlab.com
                    </a>:
                  </p>
                  <ul class="list-disc pl-5 space-y-2">
                    <li>Your CV and LinkedIn profile</li>
                    <li>
                      A brief note on why you're interested in the role and any
                      relevant experiences—formal or informal—that demonstrate
                      your logical approach and stakeholder management skills.
                    </li>
                  </ul>
                </div>
              `}
            />
          </div>
        </Container>
      </section>

      {/* General Application */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're always looking for talented people who share our mission. If
              you're passionate about improving healthcare through technology,
              we'd love to hear from you.
            </p>

            {/* Photo collage moved here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/images/collage bank/Collage 2.webp"
                  alt="Team culture"
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/images/collage bank/collage 3.webp"
                  alt="Team activities"
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/images/collage bank/collage 5.webp"
                  alt="Team collaboration"
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Send Us Your Resume
                </h3>
                <p className="text-gray-600 mb-6">
                  Even if we're not actively hiring for your role, we keep all
                  resumes on file and reach out when opportunities arise that
                  match your skills and interests.
                </p>
                <a
                  href="mailto:careers@rosterlab.com"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  <HiMail className="mr-2 h-5 w-5" />
                  Send Resume to careers@rosterlab.com
                </a>
              </div>

              <div className="text-left bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  We're particularly interested in:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Software engineers with experience in React/Node
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Product marketeers who understand enterprise SaaS and B2B
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Customer success professionals with healthcare industry
                    experience
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Sales professionals passionate about solving real problems
                    in healthcare
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Office Location */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Office
                </h2>
                <p className="text-gray-600 mb-6">
                  Our headquarters is located in beautiful Auckland, New
                  Zealand. Team members are welcome to work hybrid with a mix of
                  in-person team days & off-site.
                </p>
                <div className="flex items-start">
                  <HiLocationMarker className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      RosterLab Headquarters
                    </p>
                    <p className="text-gray-600">
                      314/380 Khyber Pass Road
                      <br />
                      Newmarket, Auckland 1023
                      <br />
                      New Zealand
                    </p>
                    <div className="mt-4 flex space-x-4">
                      <a
                        href="https://www.linkedin.com/company/rosterlab/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/RosterLab/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.facebook.com/p/RosterLab-100084645549356/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.youtube.com/@rosterlab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Benefits & Perks
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                    Competitive salary and equity
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                    Flexible working arrangements
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                    Professional development
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                    Health and wellness focus
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                    Regular team events and offsites
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
        }}
      >
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join us in our mission to give healthcare workers more time to
              focus on what matters most - patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.linkedin.com/company/rosterlab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Follow us on LinkedIn
              </a>
              <a
                href="mailto:careers@rosterlab.com"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Send Your Resume
              </a>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
