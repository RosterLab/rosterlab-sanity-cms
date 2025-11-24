"use client";

import { useState } from "react";
import Image from "next/image";

export default function RoleTabsModule() {
  const [activeTab, setActiveTab] = useState<string>("managers");

  return (
    <div className="max-w-3xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        <button
          onClick={() => setActiveTab("managers")}
          className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
            activeTab === "managers"
              ? "bg-[#1c82fd] text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          For Managers
        </button>
        <button
          onClick={() => setActiveTab("team-leads")}
          className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
            activeTab === "team-leads"
              ? "bg-[#1c82fd] text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          For Team Leads / Roster Co-Ordinators
        </button>
        <button
          onClick={() => setActiveTab("staff")}
          className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
            activeTab === "staff"
              ? "bg-[#1c82fd] text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          For Staff
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-8 min-h-[200px]">
        {activeTab === "managers" && (
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-full md:w-[280px]">
              <Image
                src="/images/tab-module/module3.jpg"
                alt="For Managers"
                width={280}
                height={350}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Make Smarter Decisions, Informed By Rostering Data
              </h3>
              <p className="text-gray-600 mb-6">
                Ask Otto for the data you need to make smart, informed decisions
                quickly.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Look up stats, coverage gaps, shift allocations and leave
                    information across departments
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Check skill-mix requirements and identify potential
                    shortages before they become critical
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Review workload distribution and ask about staff utilisation
                    across different shift types
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Get clear explanations about roster changes, fairness and
                    compliance across your team
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "team-leads" && (
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-full md:w-[280px]">
              <Image
                src="/images/tab-module/module1.jpg"
                alt="For Team Leads / Roster Admins"
                width={280}
                height={350}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Build Better Rosters With AI Guidance
              </h3>
              <p className="text-gray-600 mb-6">
                Otto helps roster co-ordinators build safe and fair rosters
                faster, without needing to remember every rule.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Ask questions about team availability e.g. "Who can fill
                    Saturday night without overtime?"
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Automatically add fairness, fatigue and EBA rules as you
                    build
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Get instant answers to complex scenarios, such as, on-call,
                    sick leave, shift swaps
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Make changes with natural language instead of manually
                    searching
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "staff" && (
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-full md:w-[280px]">
              <Image
                src="/images/tab-module/module2.jpg"
                alt="For Staff"
                width={280}
                height={350}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quick Shift Management - Anywhere, Anytime
              </h3>
              <p className="text-gray-600 mb-6">
                Staff can use Otto to make instant changes to their shifts
                without navigating the app.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Make changes to staff preferences
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Quickly get information related to their shift e.g. "How
                    much annual leave have I had?"
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Ask questions about their shifts e.g. "When am I working
                    night shifts next?"
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        *Otto's information is restricted based on user permissions by default.
      </p>
    </div>
  );
}
