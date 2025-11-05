"use client";

import { useState } from "react";

const agenticFeatures = [
  {
    id: 1,
    title: '"Build me a draft roster"',
    description:
      "Upload your Excel or CSV files and let Otto create a draft roster for you automatically, saving hours of manual work.",
    gradient: "from-purple-500 to-blue-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
  },
  {
    id: 2,
    title: '"Create a night shift"',
    description:
      "Otto will perform tasks such as adding employees, creating shifts, and managing your roster with simple commands.",
    gradient: "from-cyan-500 to-blue-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    ),
  },
  {
    id: 3,
    title: '"Help improve my roster"',
    description:
      "Receive intelligent suggestions for schedule optimization and staff allocation based on historical data and preferences.",
    gradient: "from-blue-500 to-indigo-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
];

export default function AgenticAICarousel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      {agenticFeatures.map((feature) => (
        <div
          key={feature.id}
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center"
        >
          <div
            className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {feature.icon}
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
