"use client";

import { useState } from "react";
import {
  HiMail,
  HiLocationMarker,
  HiChevronDown,
  HiChevronUp,
  HiBriefcase,
  HiCurrencyDollar,
} from "react-icons/hi";

interface JobListingProps {
  title: string;
  location: string;
  type: string;
  compensation: string;
  description: string;
}

export default function JobListing({
  title,
  location,
  type,
  compensation,
  description,
}: JobListingProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300 border-2 ${isExpanded ? "border-blue-500" : "border-transparent hover:border-blue-200"}`}
    >
      {/* Job Summary - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-8 text-left hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-green-50/50 transition-all duration-300 relative group"
      >
        {/* Decorative gradient bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            {/* Badge for "New" or "Featured" - optional */}
            <div className="mb-3">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Now Hiring
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>

            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-gray-700 font-medium">
                <HiLocationMarker className="w-4 h-4 text-blue-600" />
                {location}
              </span>
              <span className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-gray-700 font-medium">
                <HiBriefcase className="w-4 h-4 text-green-600" />
                {type}
              </span>
              <span className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-gray-700 font-medium">
                <HiCurrencyDollar className="w-4 h-4 text-purple-600" />
                {compensation}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end md:justify-start gap-2 md:self-center">
            <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-blue-700 transition-colors shadow-md">
              {isExpanded ? "Hide Details" : "View Details"}
              {isExpanded ? (
                <HiChevronUp className="w-5 h-5" />
              ) : (
                <HiChevronDown className="w-5 h-5" />
              )}
            </span>
          </div>
        </div>
      </button>

      {/* Job Details - Expandable */}
      {isExpanded && (
        <div className="px-8 pb-8 border-t-2 border-blue-100 bg-gradient-to-b from-blue-50/30 to-white">
          <div
            className="prose max-w-none text-gray-600 space-y-6 pt-8"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="mt-8 pt-6 border-t border-gray-200">
            <a
              href="mailto:careers@rosterlab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <HiMail className="mr-2 h-5 w-5" />
              Apply Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
