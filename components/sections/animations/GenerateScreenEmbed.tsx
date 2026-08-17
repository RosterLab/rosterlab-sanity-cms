"use client";

import GenerateScreenMockup from "@/components/sections/animations/roster-mockup/GenerateScreenMockup";

/**
 * "Save Time" animation.
 *
 * Previously an iframe onto public/landing/generate-screen.html, which
 * shipped @babel/standalone and transpiled the scene at runtime, tore the
 * whole document down every 20s to loop, and had its playback chrome hidden
 * from the outside after it had already painted. The mockup is now a plain
 * component: it loops on its own timeline, pauses when off screen, and needs
 * no post-hoc DOM surgery.
 */
export default function GenerateScreenEmbed() {
  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]">
        <GenerateScreenMockup />
      </div>
    </div>
  );
}
