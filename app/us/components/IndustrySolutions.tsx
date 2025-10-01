import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { HiArrowRight, HiUserGroup } from "react-icons/hi";

export default function USIndustrySolutions() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Tailored Solutions for Your Industry
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            RosterLab adapts to your specific industry requirements with
            specialized features and configurations.
          </p>

          {/* Image placeholder */}
          <div className="max-w-6xl mx-auto">
            <Image
              src="/images/us-images/example-us-scheduling-industries.jpg"
              alt="Industry scheduling solutions"
              width={1200}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto -mt-17">
          {/* Healthcare Providers */}
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                Healthcare Providers
              </h3>
              <p className="text-blue-700 mb-6">
                Specialized solutions for complex medical scheduling with
                compliance built-in
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <Link
                href="/us/industries/healthcare/ed-icu-scheduling"
                className="block bg-white rounded-lg p-4 hover:bg-blue-100 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">
                        ICU/ED
                      </h4>
                      <p className="text-sm text-blue-700">
                        Critical care scheduling with complex skill-mix
                      </p>
                    </div>
                  </div>
                  <HiArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                href="/us/industries/healthcare/radiology-scheduling"
                className="block bg-white rounded-lg p-4 hover:bg-blue-100 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">
                        Radiology
                      </h4>
                      <p className="text-sm text-blue-700">
                        24/7 imaging services with compliance tracking
                      </p>
                    </div>
                  </div>
                  <HiArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                href="/us/industries/healthcare/senior-care-scheduling"
                className="block bg-white rounded-lg p-4 hover:bg-blue-100 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">
                        Senior Care
                      </h4>
                      <p className="text-sm text-blue-700">
                        Continuity of care with resident-focused scheduling
                      </p>
                    </div>
                  </div>
                  <HiArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            <div className="text-center">
              <Button
                href="/us/industries/healthcare-scheduling"
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
                analyticsLabel="View Healthcare Solutions"
                analyticsLocation="Homepage Industry Solutions"
                analyticsProperties={{ industry: "healthcare" }}
              >
                View Healthcare Solutions
              </Button>
            </div>
          </div>

          {/* Other Industries */}
          <div className="bg-green-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <HiUserGroup className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                Complex Teams
              </h3>
              <p className="text-green-700 mb-6">
                Adaptable scheduling for teams with unique operational
                requirements
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Multi-site Operations
                    </h4>
                    <p className="text-sm text-green-700">
                      Coordinate scheduling across multiple locations
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Skill-based Scheduling
                    </h4>
                    <p className="text-sm text-green-700">
                      Assigning shifts based on complex skill mix
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Compliance Management
                    </h4>
                    <p className="text-sm text-green-700">
                      Built-in regulatory and union compliance checks
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                href="/us/industries"
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                analyticsLabel="View All Industries"
                analyticsLocation="Homepage Industry Solutions"
                analyticsProperties={{ industry: "all" }}
              >
                View All Industries
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
