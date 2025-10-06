"use client";

import { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { HiDownload, HiSearch } from "react-icons/hi";

interface Template {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  format: string;
  category: string;
}

interface TemplatesPageContentProps {
  templates: Template[];
}

export default function TemplatesPageContent({
  templates,
}: TemplatesPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter templates based on search query
  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) return templates;

    const query = searchQuery.toLowerCase();
    return templates.filter((template) => {
      // Search in title
      if (template.title?.toLowerCase().includes(query)) return true;

      // Search in description
      if (template.description?.toLowerCase().includes(query)) return true;

      // Search in category
      if (template.category?.toLowerCase().includes(query)) return true;

      // Search in format
      if (template.format?.toLowerCase().includes(query)) return true;

      return false;
    });
  }, [templates, searchQuery]);

  return (
    <div className="py-16 bg-neutral-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Free Workforce Management Templates
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Download professionally designed templates to streamline your staff
            rostering, scheduling, and workforce management.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full px-5 py-3 pl-12 text-neutral-900 bg-white border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent shadow-sm"
            />
            <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-3 text-sm text-neutral-600 text-center">
              Found {filteredTemplates.length}{" "}
              {filteredTemplates.length === 1 ? "template" : "templates"}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          )}
        </div>

        {/* Templates Grid */}
        {filteredTemplates && filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <Link
                key={template.id}
                href={template.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Template Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-primary-600">
                    {template.format}
                  </div>
                </div>

                {/* Template Content */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                      {template.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                    <HiDownload className="w-5 h-5 mr-2" />
                    <span>Download Template</span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">
              No templates found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need More Than Templates?</h2>
          <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Discover how RosterLab&apos;s AI-powered rostering software can
            automate your workforce management and save hours every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Book a Demo
            </Link>
            <Link
              href="/solutions/ai-roster-generator"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-colors"
            >
              Explore AI Rostering
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
