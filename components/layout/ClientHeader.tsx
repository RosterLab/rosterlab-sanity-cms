"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { usNavItems } from "./USHeader";

export default function ClientHeader() {
  const pathname = usePathname();
  const isUSVersion = pathname === "/us" || pathname.startsWith("/us/");

  // Use US navigation items for US pages, default for others
  return <Header navItems={isUSVersion ? usNavItems : []} />;
}
