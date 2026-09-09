"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { usNavItems } from "./USHeader";

export default function ClientHeader() {
  const pathname = usePathname();
  const isUSVersion = pathname === "/us" || pathname.startsWith("/us/");

  /*
    Every page under /industries/, the index included, opens with
    `IndustryHero`, whose mobile layout is a flat blue field starting at the
    very top — so the bar blends into it there. The /type/ pages listed below
    use the same hero and sit in the same Industries menu. Matched on the
    path rather than signalled by the hero, which renders after the header
    and could only tell it after first paint.

    The /us/ paths mirror the same set: the US pages run the same hero, so
    they need the same treatment.

    /about and /us/about run the same hero too, but sit outside the Industries
    menu, so they are matched exactly rather than by prefix.
  */
  const TYPE_PAGES_WITH_BLUE_HERO = [
    "/type/on-call-roster",
    "/type/long-roster",
    "/us/type/on-call-scheduling",
    "/us/type/long-term-schedule-planning",
  ];

  const hasBlueHero =
    pathname === "/industries" ||
    pathname === "/us/industries" ||
    pathname === "/about" ||
    pathname === "/us/about" ||
    pathname.startsWith("/industries/") ||
    pathname.startsWith("/us/industries/") ||
    TYPE_PAGES_WITH_BLUE_HERO.includes(pathname);

  // Use US navigation items for US pages, default for others
  return (
    <Header
      navItems={isUSVersion ? usNavItems : []}
      onHeroBackground={hasBlueHero}
    />
  );
}
