import { getResourcesNavigation } from "./resources-navigation";

// US-specific navigation configuration
export const usNavItems = [
  {
    title: "Product",
    subItems: [
      {
        title: "AI Staff Scheduling",
        link: "/us/solutions/ai-staff-schedule-maker",
        description: "Automated schedules optimized for your team",
      },
      {
        title: "Free Staff Scheduling Tool",
        link: "/us/solutions/free-staff-scheduling-tool",
        description: "Manual digital scheduling",
      },
      {
        title: "Staff Mobile App",
        link: "/us/solutions/staff-scheduling-mobile-app",
        description: "Keep your team connected with mobile schedules",
      },
      {
        title: "Auto Schedule Generation",
        link: "/us/feature/auto-scheduling",
      },
      {
        title: "Otto - AI Assistant",
        showAiIcon: true,
        link: "/us/feature/ai-staff-scheduling-assistant",
      },
      { title: "Open Shifts", link: "/us/feature/open-shifts" },
      {
        title: "Shift Swaps & Trades",
        link: "/us/feature/shift-swaps-and-trades",
      },
      { title: "Time Off Requests", link: "/us/feature/time-off-requests" },
      { title: "Staff Preferences", link: "/us/feature/self-scheduling" },
      { title: "Rescheduling", link: "/us/feature/staff-rescheduling" },
      {
        title: "Rules Engine",
        link: "/us/feature/rules-engine",
      },
    ],
  },
  {
    title: "Solutions",
    subItems: [
      { title: "Healthcare", link: "/us/industries/healthcare-scheduling" },
      {
        title: "Critical Care",
        link: "/us/industries/healthcare/critical-care-scheduling",
      },
      {
        title: "Emergency Care",
        link: "/us/industries/healthcare/emergency-department-scheduling",
      },
      {
        title: "Radiology",
        link: "/us/industries/healthcare/radiology-scheduling",
      },
      {
        title: "Senior Care Scheduling",
        link: "/us/industries/healthcare/senior-care-scheduling",
      },
      {
        title: "Veterinary Scheduling",
        link: "/us/industries/healthcare/veterinary-scheduling",
      },
      {
        title: "Long Term Planning",
        link: "/us/type/long-term-schedule-planning",
      },
      {
        title: "Nursing & Midwifery",
        link: "/us/industries/healthcare/nurse-scheduling",
      },
      {
        title: "Allied Health",
        link: "/us/industries/healthcare/allied-health-scheduling",
      },
      {
        title: "Physician Scheduling",
        link: "/us/industries/healthcare/physician-scheduling",
      },
      {
        title: "Attending Physician",
        link: "/us/industries/healthcare/attending-physician-scheduling",
      },
      { title: "On-Call Scheduling", link: "/us/type/on-call-scheduling" },
      {
        title: "Telehealth Scheduling",
        link: "/us/industries/healthcare/telehealth-scheduling",
      },
    ],
  },
  { title: "Pricing", link: "/us/pricing" },
  getResourcesNavigation(true),
  { title: "About", link: "/us/about" },
  { title: "Contact", link: "/us/contact" },
];
