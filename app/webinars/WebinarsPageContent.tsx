"use client";

import { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { HiSearch, HiX, HiCalendar, HiClock } from "react-icons/hi";
import { Webinar } from "./page";

interface WebinarsPageContentProps {
  webinars: Webinar[];
}

export default function WebinarsPageContent({
  webinars,
}: WebinarsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWebinars = useMemo(() => {
    if (!searchQuery.trim()) return webinars;

    const query = searchQuery.toLowerCase();
    return webinars.filter(
      (webinar) =>
        webinar.title.toLowerCase().includes(query) ||
        webinar.description.toLowerCase().includes(query) ||
        webinar.category.toLowerCase().includes(query) ||
        webinar.speakers?.toLowerCase().includes(query),
    );
  }, [webinars, searchQuery]);

  return (
    <div className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            AI in Healthcare Webinars
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Join our expert-led webinars to discover how AI-powered workforce
            management can transform your healthcare operations. Learn from
            industry leaders and get your questions answered.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search webinars by title, topic, or speaker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900 placeholder-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600"
                aria-label="Clear search"
              >
                <HiX className="h-5 w-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-neutral-600">
              Found {filteredWebinars.length}{" "}
              {filteredWebinars.length === 1 ? "webinar" : "webinars"}
            </p>
          )}
        </div>

        {/* Webinars Grid */}
        {filteredWebinars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredWebinars.map((webinar) => (
              <Link
                key={webinar.id}
                href={webinar.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700 overflow-hidden">
                  <Image
                    src={webinar.image}
                    alt={webinar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Format Badge */}
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-xs font-semibold text-primary-600">
                      {webinar.format}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category */}
                  <div className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">
                    {webinar.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {webinar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 mb-4 line-clamp-2 flex-grow">
                    {webinar.description}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-neutral-500">
                      <HiCalendar className="h-4 w-4 mr-2" />
                      <span>{webinar.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-500">
                      <HiClock className="h-4 w-4 mr-2" />
                      <span>{webinar.duration}</span>
                    </div>
                  </div>

                  {/* Speakers */}
                  {webinar.speakers && (
                    <p className="text-sm text-neutral-500 mb-4">
                      Speakers: {webinar.speakers}
                    </p>
                  )}

                  {/* Action Link */}
                  <div className="flex items-center text-primary-600 font-semibold">
                    <span>Watch Now</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
            <p className="text-lg text-neutral-600 mb-4">
              No webinars found matching your search.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Clear search
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Book a discovery call to learn how RosterLab's AI-powered workforce
            management can save you hundreds of hours and improve staff
            satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-a-demo"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors shadow-lg"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
