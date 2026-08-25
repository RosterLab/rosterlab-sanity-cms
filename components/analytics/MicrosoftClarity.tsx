"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function MicrosoftClarity() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    // Clarity isn't needed to render anything, so keep it off the critical
    // path. requestIdleCallback on its own is not enough: the main thread goes
    // idle while images and fonts are still downloading, so it fires mid-load
    // and competes with LCP for bandwidth anyway. Wait for `load` first, then
    // take the next idle slot, with a hard cap so it always initialises.
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const start = () => Clarity.init("x55diy6etm");

    const afterLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        timeoutId = window.setTimeout(start, 1000);
      }
    };

    if (document.readyState === "complete") {
      afterLoad();
    } else {
      window.addEventListener("load", afterLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", afterLoad);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
