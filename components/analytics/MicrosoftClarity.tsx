"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function MicrosoftClarity() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    // Clarity isn't needed to render anything, so let it wait for an idle slot
    // rather than competing with hydration for the main thread. The timeout is
    // a hard cap so it always initialises.
    const start = () => Clarity.init("x55diy6etm");

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(start, 1000);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}
