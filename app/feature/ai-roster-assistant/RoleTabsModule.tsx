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
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/images/tab-module/module3.jpg"
                alt="For Managers"
                width={280}
                height={350}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Built for busy managers
              </h3>
              <p className="text-gray-600 mb-6">
                Get instant insights into your team's roster without digging
                through spreadsheets. Otto provides the data you need to make
                informed decisions quickly.
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
                    View roster stats at a glance - coverage gaps, overtime
                    trends, and shift distribution
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
                    Identify staffing shortages and coverage issues before they
                    become problems
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
                    Track team workload balance and flag potential burnout risks
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
                    Get clear explanations about shift allocations and fairness
                    across your team
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "team-leads" && (
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/images/tab-module/module1.jpg"
                alt="For Team Leads / Roster Admins"
                width={280}
                height={350}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              {/* Content for Team Leads - to be filled */}
            </div>
          </div>
        )}
        {activeTab === "staff" && (
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/images/tab-module/module2.jpg"
                alt="For Staff"
                width={280}
                height={350}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              {/* Content for Staff - to be filled */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
