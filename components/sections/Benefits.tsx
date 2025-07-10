"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import StaffingEnvelopeChartSmall from "@/components/ui/StaffingEnvelopeChartSmall";

interface BenefitTab {
  id: string;
  label: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
}

const benefitTabs: BenefitTab[] = [
  {
    id: "optimisation",
    label: "Optimise Workforce",
    title: "Optimise your workforce with AI",
    description:
      "Harness advanced mathematical optimisation engine to allocate staff efficiently. Make smarter operational decisions by reducing penalty costs, improving coverage, and planning ahead with confidence.",
    highlights: [
      "Optimise Skill Mix",
      "Allocate Staff Efficiently",
      "Minimise Costs",
      "Dynamic Scenario Planning",
    ],
    image: "/images/illustration/optimise_workforce.svg",
  },
  {
    id: "time",
    label: "Save Time",
    title: "Generated rosters in minutes",
    description:
      "Let the AI handles complex contractual and operational constraints while you focus on what matters most. Manage last-minute changes by re-rostering, open shifts, and auto-swap based on predefined rules.",
    highlights: [
      "Generate Rosters Automatically",
      "Handle Complex Rules and Staffing Requirements",
      "Reduced Admin for Last-minute Changes",
      "Dynamic Re-roster",
    ],
    image: "/images/illustration/save_time.svg",
  },

  {
    id: "turnover",
    label: "Reduce Turnover",
    title: "Improve staff retention",
    description:
      "Empower your team to plan ahead and take control of their rosters, while staying aligned with business needs. Fewer shift swaps, lower absenteeism, and more matched preferences boost staff engagement and improve patient outcomes.",
    highlights: [
      "Improve Work-Life Balance and Staff Satisfaction",
      "Met High Percentage of Preference",
      "Reduce Unnecessary Sick Leave",
      "Reduce Staff Turnover",
    ],
    image: "/images/illustration/reduce_turnover.svg",
  },
  {
    id: "safety",
    label: "Ensure Safety & Fairness",
    title: "Ensure compliance and equity",
    description:
      "Ensure clinical safety and fairness with every roster. By embedding equity and fatigue-management rules into our AI, you eliminate favoritism, reduce staff fatigue, and create safer, more inclusive rosters that build trust and improve care delivery.",
    highlights: [
      "Elminate Favoritism",
      "Distribute Shifts Fairly",
      "Reduce Clinical Risks",
      "Reduce Fatigue",
    ],
    image: "/images/illustration/ensure_safety_fairness.svg",
  },
];

export default function Benefits() {
  const [activeTab, setActiveTab] = useState("optimisation");
  const currentTab =
    benefitTabs.find((tab) => tab.id === activeTab) || benefitTabs[0];

  // Preload all images on component mount
  useEffect(() => {
    benefitTabs.forEach((tab) => {
      if (tab.image) {
        const img = new window.Image();
        img.src = tab.image;
      }
    });
  }, []);

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-neutral-50">
      <Container>
        <div className="text-center mb-6 md:mb-8 lg:mb-10 px-4">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            BENEFITS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-3 md:mb-4">
            Achieve Better Staff Outcomes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Transform your workforce management with our AI-powered rostering
            solution designed specifically for complex scheduling needs.
          </p>
        </div>

        <div className="max-w-10xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8 px-4">
            {benefitTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg rounded-lg font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-16 mx-4 md:mx-0 min-h-[450px] lg:min-h-[380px] transition-all duration-150">
            <div className="grid lg:grid-cols-[5.6fr,7fr] gap-6 md:gap-8 lg:gap-12 items-start h-full">
              <div className="order-2 lg:order-1 lg:pt-0">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                  {currentTab.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6">
                  {currentTab.description}
                </p>
                <ul className="space-y-3 md:space-y-4">
                  {currentTab.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-sm sm:text-base font-semibold text-gray-800">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 lg:pl-0 mb-6 md:mb-0 flex items-center justify-center">
                <div className="relative w-full max-w-md mx-auto lg:max-w-none min-h-[280px] lg:min-h-[320px] flex items-center justify-center">
                  {currentTab.id === "optimisation" ? (
                    <StaffingEnvelopeChartSmall />
                  ) : (
                    <Image
                      src={currentTab.image}
                      alt={currentTab.title}
                      width={400}
                      height={320}
                      className="w-full h-auto rounded-lg scale-100 sm:scale-105 lg:scale-110 object-contain"
                      priority
                      quality={90}
                      loading="eager"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-6 md:mt-8 px-4">
            <Button
              href="/solutions/ai-staff-scheduling"
              className="inline-flex items-center bg-blue-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Learn more about AI rostering
              <svg
                className="ml-2 h-5 w-5"
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
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
