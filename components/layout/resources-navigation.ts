import { localizeUSResourceLink } from "@/lib/localization/us-resources";
interface ResourceMenuItem {
  title: string;
  link: string;
  description?: string;
  group?: "Mini Tools" | "Templates" | "Games";
}

// Both menus follow the same resource hierarchy and locale-aware route registry.
export function getResourcesNavigation(isUS = false): {
  title: string;
  subItems: ResourceMenuItem[];
} {
  return {
    title: "Resources",
    subItems: ([
      // Content & Learning
      {
        title: "Whitepapers",
        link: "/whitepapers/rostering-as-a-strategic-workforce-lever",
      },
      { title: "Case Studies", link: "/case-studies" },
      { title: "Webinars", link: "/webinars" },
      { title: "Blogs", link: isUS ? "/us/blog" : "/blog" },
      { title: "Newsroom", link: "/newsroom" },

      // Mini Tools
      {
        title: isUS ? "Savings Calculator" : "ROI Calculator",
        link: isUS ? "/us/tools/savings-calculator" : "/tools/roi-calculator",
        description: "Estimate your savings with RosterLab",
        group: "Mini Tools",
      },
      {
        title: "FTE Calculator",
        link: "/tools/fte-calculator",
        description: "Convert weekly demand into required FTE",
        group: "Mini Tools",
      },
      // No US equivalent of the analyser page exists yet, so it stays off that menu.
      ...(isUS
        ? []
        : [
            {
              title: "Roster Analyser",
              link: "/tools/roster-analysis",
              description: "Get instant AI insights on your roster",
              group: "Mini Tools",
            },
          ]),
      {
        title: isUS ? "Preferences Optimizer" : "Preferences Optimiser",
        link: "/tools/survey-preferences",
        description: "Fairly distribute shifts by staff preference",
        group: "Mini Tools",
      },

      // Games
      {
        title: "Schedge",
        link: "/schedge",
        description: isUS
          ? "Our scheduling mini game"
          : "Our rostering mini game",
        group: "Games",
      },
      {
        title: "Personality Test",
        link: "/tools/staff-scheduling-personality-quiz",
        description: isUS
          ? "Discover your scheduling style"
          : "Discover your rostering style",
        group: "Games",
      },

      // Templates
      {
        title: "Free Excel Template",
        link: "/templates/free-staff-roster-template-excel",
        description: isUS
          ? "Ready-to-use schedule spreadsheet"
          : "Ready-to-use roster spreadsheet",
        group: "Templates",
      },
    ] satisfies ResourceMenuItem[]).map((item) => ({
      ...item,
      link: isUS ? localizeUSResourceLink(item.link) : item.link,
    })),
  };
}
