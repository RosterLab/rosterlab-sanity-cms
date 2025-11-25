"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  HiMenu,
  HiX,
  HiChevronDown,
  HiChevronRight,
  HiUser,
  HiHeart,
} from "react-icons/hi";
import { trackSmartButtonClick } from "@/components/analytics/Segment";

interface SubMenuItem {
  title: string;
  link: string;
  description?: string;
}

interface NavItem {
  title: string;
  link?: string;
  subItems?: SubMenuItem[];
}

interface HeaderProps {
  navItems?: NavItem[];
}

export default function Header({ navItems = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  // Determine if this is a US page by checking if navItems contain US-specific links
  const isUSVersion = navItems.some(
    (item) =>
      item.link?.includes("/us/") ||
      item.subItems?.some((sub) => sub.link.includes("/us/")),
  );
  const logoLink = isUSVersion ? "/us" : "/";
  const contactLink = isUSVersion ? "/us/contact" : "/contact";
  const demoLink = isUSVersion ? "/us/book-a-demo" : "/book-a-demo";

  const defaultNavItems: NavItem[] = [
    {
      title: "Solutions",
      subItems: [
        {
          title: "AI Staff Roster Generator",
          link: "/solutions/ai-roster-generator",
        },
        {
          title: "Free Staff Roster Software",
          link: "/solutions/free-staff-rostering-software",
        },
        {
          title: "Staff Roster Mobile App",
          link: "/solutions/staff-roster-mobile-app",
        },
        {
          title: "Automated Rostering",
          link: "/feature/automated-rostering",
        },
        {
          title: "AI Rostering Assistant",
          link: "/feature/ai-roster-assistant",
        },
        { title: "Open Shifts", link: "/feature/open-shifts" },
        { title: "Shift Swaps", link: "/feature/shift-swaps" },
        { title: "Leave Requests", link: "/feature/leave-requests" },
        { title: "Staff Preferences", link: "/feature/self-scheduling" },
        { title: "Re-Rostering", link: "/feature/re-rostering" },
        {
          title: "Rules Engine",
          link: "/feature/rules-engine",
        },
      ],
    },
    {
      title: "Industries",
      subItems: [
        { title: "Healthcare Roster", link: "/industries/healthcare" },
        { title: "ICU/ED Roster", link: "/industries/healthcare/ed-icu" },
        { title: "Aged Care Roster", link: "/industries/healthcare/aged-care" },
        { title: "Radiology Roster", link: "/industries/healthcare/radiology" },
        {
          title: "Nurse Roster",
          link: "/industries/healthcare/nurse-rostering",
          description: "Fair, safe and compliant nurse rostering software",
        },
        {
          title: "JMO Roster",
          link: "/industries/healthcare/junior-medical-officer-rostering",
          description: "Compliant rostering for junior medical officers",
        },
      ],
    },
    { title: "Pricing", link: "/pricing" },
    {
      title: "Resources",
      subItems: [
        { title: "Blog", link: "/blog" },
        { title: "Case Studies", link: "/case-studies" },
        { title: "Newsroom", link: "/newsroom" },
        { title: "Schedge", link: "/schedge" },
        { title: "ROI Calculator", link: "/tools/roi-calculator" },
        {
          title: "Personality Test",
          link: "/tools/staff-scheduling-personality-quiz",
        },
        {
          title: "Free Excel Template",
          link: "/templates/free-staff-roster-template-excel",
        },
      ],
    },
    { title: "About", link: "/about" },
  ];

  const navigation = navItems.length > 0 ? navItems : defaultNavItems;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm" role="banner">
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href={logoLink}
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/images/rosterlab-logo.png"
                alt="RosterLab"
                width={180}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:block">
            <div className="ml-10 flex items-center xl:space-x-4 2xl:space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() =>
                    item.subItems && setActiveDropdown(item.title)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() =>
                    item.subItems &&
                    setActiveDropdown(
                      activeDropdown === item.title ? null : item.title,
                    )
                  }
                >
                  {item.link ? (
                    <Link
                      href={item.link}
                      className="text-neutral-700 hover:text-blue-600 xl:px-2 2xl:px-3 py-2 text-sm font-medium transition-colors flex items-center"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <button
                      className="text-neutral-700 hover:text-blue-600 xl:px-2 2xl:px-3 py-2 text-sm font-medium transition-colors flex items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(
                          activeDropdown === item.title ? null : item.title,
                        );
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape" && activeDropdown) {
                          e.preventDefault();
                          setActiveDropdown(null);
                        }
                      }}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === item.title}
                      aria-controls={`${item.title.toLowerCase().replace(/\s+/g, "-")}-menu`}
                    >
                      {item.title}
                      {item.subItems && (
                        <HiChevronDown
                          className="ml-1 h-4 w-4"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Invisible bridge to maintain hover */}
                  {item.subItems && activeDropdown === item.title && (
                    <div className="absolute top-full left-0 right-0 h-4" />
                  )}

                  {/* Dropdown Menu */}
                  {item.subItems && activeDropdown === item.title && (
                    <div
                      id={`${item.title.toLowerCase().replace(/\s+/g, "-")}-menu`}
                      role="menu"
                      aria-orientation="vertical"
                      className={cn(
                        "absolute top-full mt-0 bg-white rounded-lg shadow-xl border border-gray-200 z-[100] pointer-events-auto",
                        item.title === "Solutions" ||
                          item.title === "Industries" ||
                          item.title === "Resources"
                          ? "left-0 w-[600px]"
                          : "left-0 w-64",
                      )}
                      onMouseEnter={() => setActiveDropdown(item.title)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.title === "Solutions" ? (
                        // Enhanced Solutions Dropdown Layout
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Core Solutions Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Core Solutions
                              </h3>
                              <div className="space-y-1">
                                {item.subItems?.slice(0, 3).map((subItem) => (
                                  <Link
                                    key={subItem.link}
                                    href={subItem.link}
                                    className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                  >
                                    <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                      {subItem.title}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      {(subItem as any).description ||
                                        (subItem.title ===
                                        "AI Staff Roster Generator"
                                          ? "Automated schedules optimized for your team"
                                          : subItem.title ===
                                              "Free Staff Roster Software"
                                            ? "Free digital scheduling tool"
                                            : subItem.title.includes(
                                                  "Mobile App",
                                                )
                                              ? "Keep your team connected with mobile schedules"
                                              : subItem.title ===
                                                  "AI Chat Assistant"
                                                ? "Get instant rostering help with AI chat support"
                                                : "")}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Features Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Features
                              </h3>
                              <div className="space-y-1 max-h-80 overflow-y-auto">
                                {item.subItems?.slice(3).map((subItem) => (
                                  <Link
                                    key={subItem.link}
                                    href={subItem.link}
                                    className="group block p-2 rounded-lg hover:bg-teal-50 transition-colors"
                                  >
                                    <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] text-sm">
                                      {subItem.title}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Call to Action */}
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <Link
                                href={contactLink}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
                              >
                                Speak to our team
                                <svg
                                  className="ml-1 h-4 w-4"
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
                              </Link>
                              <Link
                                href={demoLink}
                                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                              >
                                Book a demo
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : item.title === "Industries" ? (
                        // Enhanced Industries Dropdown Layout
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Healthcare Sectors Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Specialty Healthcare Rosters
                              </h3>
                              <div className="space-y-1">
                                {/* Healthcare Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/industries/healthcare-scheduling"
                                      : "/industries/healthcare"
                                  }
                                  className="group block p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                                >
                                  <div className="font-medium text-blue-600 group-hover:text-blue-700 mb-1 flex items-center gap-2">
                                    {isUSVersion
                                      ? "Healthcare Scheduling"
                                      : "Healthcare Roster"}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {isUSVersion
                                      ? "Complete scheduling solution for healthcare teams"
                                      : "Complete rostering solution for healthcare teams"}
                                  </div>
                                </Link>

                                {/* ICU/ED Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/industries/healthcare/ed-icu-scheduling"
                                      : "/industries/healthcare/ed-icu"
                                  }
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    {isUSVersion
                                      ? "ICU/ED Scheduling"
                                      : "ICU/ED Roster"}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {isUSVersion
                                      ? "Build ICU/ED schedules that support better continuity of care"
                                      : "Build ICU/ED rosters that support better continuity of care"}
                                  </div>
                                </Link>

                                {/* Radiology Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/industries/healthcare/radiology-scheduling"
                                      : "/industries/healthcare/radiology"
                                  }
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    {isUSVersion
                                      ? "Radiology Scheduling"
                                      : "Radiology Roster"}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {isUSVersion
                                      ? "Build radiology schedules with the right skill mix and compliance"
                                      : "Build fair and compliant rosters across radiology subspecialties that balance skill-mix and fatigue"}
                                  </div>
                                </Link>

                                {/* Radiography Roster */}
                                <Link
                                  href="/industries/healthcare/radiography"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    {isUSVersion
                                      ? "Radiography Scheduling"
                                      : "Radiography Roster"}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {isUSVersion
                                      ? "Optimize radiographer coverage across imaging modalities"
                                      : "Optimise radiographer coverage across imaging modalities"}
                                  </div>
                                </Link>

                                {/* Aged Care Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/industries/healthcare/senior-care-scheduling"
                                      : "/industries/healthcare/aged-care"
                                  }
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    {isUSVersion
                                      ? "Senior Care Scheduling"
                                      : "Aged Care Roster"}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {isUSVersion
                                      ? "Efficient scheduling for nursing homes & assisted living"
                                      : "Make better use of staffing hours with rosters for aged care facilities"}
                                  </div>
                                </Link>

                                {/* Veterinary Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/industries/healthcare/veterinary-scheduling"
                                      : "/industries/healthcare/veterinary-rostering"
                                  }
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    {isUSVersion
                                      ? "Veterinary Scheduling"
                                      : "Veterinary Roster"}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {isUSVersion
                                      ? "Veterinary clinic scheduling that handles complex shift patterns"
                                      : "Veterinary clinic rostering that handles complex shift patterns"}
                                  </div>
                                </Link>
                              </div>
                            </div>

                            {/* Roster By Type Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Roster By Type
                              </h3>
                              <div className="space-y-1">
                                {/* Nurse Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/industries/healthcare/nurse-scheduling"
                                      : "/industries/healthcare/nurse-rostering"
                                  }
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                    {isUSVersion
                                      ? "Nurse Scheduling"
                                      : "Nurse Roster"}
                                  </div>
                                </Link>

                                {/* JMO Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/industries/healthcare/physician-scheduling"
                                      : "/industries/healthcare/junior-medical-officer-rostering"
                                  }
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                    {isUSVersion
                                      ? "Physician Scheduling"
                                      : "JMO Roster"}
                                  </div>
                                </Link>

                                {/* SMO Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/industries/healthcare/attending-physician-scheduling"
                                      : "/industries/healthcare/senior-medical-officer-rostering"
                                  }
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                    {isUSVersion
                                      ? "Attending Physician"
                                      : "SMO Roster"}
                                  </div>
                                </Link>

                                {/* On Call Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/type/on-call-scheduling"
                                      : "/type/on-call-roster"
                                  }
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                    {isUSVersion
                                      ? "On-Call Scheduling"
                                      : "On-Call Roster"}
                                  </div>
                                </Link>

                                {/* Long Roster */}
                                <Link
                                  href={
                                    isUSVersion
                                      ? "/us/type/long-term-schedule-planning"
                                      : "/type/long-roster"
                                  }
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                    {isUSVersion
                                      ? "Long Term Planning"
                                      : "Long Roster"}
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Call to Action */}
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <Link
                                href={
                                  isUSVersion ? "/us/industries" : "/industries"
                                }
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center px-3 py-2 rounded-lg transition-colors"
                              >
                                View all industries
                                <svg
                                  className="ml-1 h-4 w-4"
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
                              </Link>
                              <Link
                                href={demoLink}
                                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                              >
                                Book a demo
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : item.title === "Resources" ? (
                        // Enhanced Resources Dropdown Layout
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Content & Learning Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Content & Learning
                              </h3>
                              <div className="space-y-1">
                                {item.subItems
                                  ?.filter(
                                    (sub) =>
                                      sub.title === "Blog" ||
                                      sub.title === "Case Studies" ||
                                      sub.title === "Newsroom",
                                  )
                                  .map((subItem) => (
                                    <Link
                                      key={subItem.link}
                                      href={subItem.link}
                                      className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                      <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                        {subItem.title}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {subItem.title === "Blog"
                                          ? "Insights and best practices"
                                          : subItem.title === "Case Studies"
                                            ? "Success stories from our customers"
                                            : subItem.title === "Newsroom"
                                              ? "Latest updates and announcements"
                                              : ""}
                                      </div>
                                    </Link>
                                  ))}
                              </div>
                            </div>

                            {/* Tools Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Tools
                              </h3>
                              <div className="space-y-1">
                                {item.subItems
                                  ?.filter(
                                    (sub) =>
                                      sub.title !== "Blog" &&
                                      sub.title !== "Case Studies" &&
                                      sub.title !== "Newsroom",
                                  )
                                  .map((subItem) => (
                                    <Link
                                      key={subItem.link}
                                      href={subItem.link}
                                      className="group block p-3 rounded-lg hover:bg-teal-50 transition-colors"
                                    >
                                      <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] mb-1">
                                        {subItem.title}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {subItem.title.includes("Calculator")
                                          ? "Calculate your savings"
                                          : subItem.title === "Schedge"
                                            ? "We love rostering so much that we made a mini game - Try it out!"
                                            : subItem.title.includes(
                                                  "Personality Test",
                                                )
                                              ? "Discover your scheduling style"
                                              : subItem.title.includes(
                                                    "Excel Template",
                                                  )
                                                ? "Download our roster template"
                                                : ""}
                                      </div>
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          </div>

                          {/* Call to Action */}
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <Link
                                href="/templates"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
                              >
                                Explore workforce templates
                                <svg
                                  className="ml-1 h-4 w-4"
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
                              </Link>
                              <Link
                                href={demoLink}
                                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                              >
                                Book a demo
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Standard dropdown for other menu items
                        <div className="py-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.link}
                              href={subItem.link}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Header Buttons */}
          <div className="hidden xl:flex items-center xl:space-x-2 2xl:space-x-4">
            {!isUSVersion && (
              <>
                <Link
                  href={contactLink}
                  className="text-neutral-700 hover:text-blue-600 xl:px-2 2xl:px-3 py-2 xl:text-xs 2xl:text-sm font-medium transition-colors"
                  onClick={() =>
                    trackSmartButtonClick(
                      "Contact",
                      contactLink,
                      "Header Desktop",
                    )
                  }
                >
                  Contact
                </Link>
                <div className="w-px h-6 bg-gray-300 xl:mx-1 2xl:mx-2" />
              </>
            )}
            <Link
              href="https://app.rosterlab.com"
              className="text-neutral-700 hover:text-blue-600 xl:px-2 2xl:px-3 py-2 xl:text-xs 2xl:text-sm font-medium transition-colors flex items-center"
              onClick={(e) => {
                e.preventDefault();
                trackSmartButtonClick(
                  "Login",
                  "https://app.rosterlab.com",
                  "Header Desktop",
                );
                setTimeout(() => {
                  window.location.href = "https://app.rosterlab.com";
                }, 100);
              }}
            >
              <HiUser className="w-4 h-4 mr-1" />
              Login
            </Link>
            <Link
              href={demoLink}
              className="bg-blue-600 text-white hover:bg-blue-700 xl:px-3 2xl:px-4 py-2 rounded-md xl:text-xs 2xl:text-sm font-medium transition-colors"
              onClick={() =>
                trackSmartButtonClick("Book a Demo", demoLink, "Header Desktop")
              }
            >
              Book a Demo
            </Link>
            <Link
              href="https://app.rosterlab.com/signup"
              className="bg-green-500 text-white hover:bg-green-600 xl:px-3 2xl:px-4 py-2 rounded-md xl:text-xs 2xl:text-sm font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                trackSmartButtonClick(
                  "Start for free",
                  "https://app.rosterlab.com/signup",
                  "Header Desktop",
                );
                setTimeout(() => {
                  window.location.href = "https://app.rosterlab.com/signup";
                }, 100);
              }}
            >
              Start for free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-blue-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              <span className="sr-only">
                {isMenuOpen ? "Close menu" : "Open menu"}
              </span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-20"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={cn(
          "xl:hidden transition-all duration-300 ease-in-out fixed inset-x-0 top-20 bottom-0 bg-white z-40",
          isMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg h-full overflow-y-auto">
          {navigation.map((item) => (
            <div key={item.title}>
              {item.link ? (
                <Link
                  href={item.link}
                  className="text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setMobileDropdown(
                        mobileDropdown === item.title ? null : item.title,
                      )
                    }
                    className="w-full text-left text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
                  >
                    {item.title}
                    <HiChevronDown
                      className={cn(
                        "h-4 w-4 ml-1 transition-transform duration-200",
                        mobileDropdown === item.title ? "rotate-180" : "",
                      )}
                    />
                  </button>
                  {item.subItems && mobileDropdown === item.title && (
                    <div className="pl-6 space-y-1 mt-1">
                      {item.title === "Solutions" ? (
                        <>
                          {/* Core Solutions */}
                          <div className="mb-4">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1 mb-1">
                              Core Solutions
                            </div>
                            <div className="space-y-1">
                              {item.subItems.slice(0, 3).map((subItem) => (
                                <Link
                                  key={subItem.link}
                                  href={subItem.link}
                                  className="text-neutral-600 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-sm"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                          {/* Features */}
                          <div className="border-t border-gray-200 pt-3">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1 mb-1">
                              Features
                            </div>
                            <div className="space-y-1">
                              {item.subItems.slice(3).map((subItem) => (
                                <Link
                                  key={subItem.link}
                                  href={subItem.link}
                                  className="text-neutral-600 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-sm"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        item.subItems.map((subItem) => (
                          <Link
                            key={subItem.link}
                            href={subItem.link}
                            className="text-neutral-600 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            {!isUSVersion && (
              <Link
                href={contactLink}
                className="text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => {
                  trackSmartButtonClick(
                    "Contact",
                    contactLink,
                    "Header Mobile",
                  );
                  setIsMenuOpen(false);
                }}
              >
                Contact
              </Link>
            )}
            <Link
              href="https://app.rosterlab.com"
              className="text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-base font-medium"
              onClick={(e) => {
                e.preventDefault();
                trackSmartButtonClick(
                  "Login",
                  "https://app.rosterlab.com",
                  "Header Mobile",
                );
                setIsMenuOpen(false);
                setTimeout(() => {
                  window.location.href = "https://app.rosterlab.com";
                }, 100);
              }}
            >
              Login
            </Link>
            <Link
              href={demoLink}
              className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => {
                trackSmartButtonClick("Book a Demo", demoLink, "Header Mobile");
                setIsMenuOpen(false);
              }}
            >
              Book a Demo
            </Link>
            <Link
              href="https://app.rosterlab.com/signup"
              className="bg-green-500 text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={(e) => {
                e.preventDefault();
                trackSmartButtonClick(
                  "Start for free",
                  "https://app.rosterlab.com/signup",
                  "Header Mobile",
                );
                setIsMenuOpen(false);
                setTimeout(() => {
                  window.location.href = "https://app.rosterlab.com/signup";
                }, 100);
              }}
            >
              Start for free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
