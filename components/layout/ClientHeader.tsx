"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { usNavItems } from "./USHeader";

export default function ClientHeader() {
  const pathname = usePathname();
  const isUSVersion = pathname === "/us" || pathname.startsWith("/us/");

  /*
    Every page under /industries/ except the index itself opens with
    `IndustryHero`, whose mobile layout is a flat blue field starting at the
    very top — so the bar blends into it there. Matched on the path rather
    than signalled by the hero, which renders after the header and could only
    tell it after first paint.
  */
  const hasBlueHero = pathname.startsWith("/industries/");

  // Use US navigation items for US pages, default for others
  return (
    <Header
      navItems={isUSVersion ? usNavItems : []}
      onHeroBackground={hasBlueHero}
    />
  );
}
