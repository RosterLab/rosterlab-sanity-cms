"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    hbspt: any;
  }
}

export default function WaitlistForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js-ap1.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "20646833",
          formId: "a930a5e8-dc9b-4dba-b5cd-abbd5ec53c72",
          region: "ap1",
          target: "#waitlist-form",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div id="waitlist-form" />;
}
