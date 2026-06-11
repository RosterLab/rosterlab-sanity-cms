"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function MicrosoftClarity() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    Clarity.init("x55diy6etm");
  }, []);

  return null;
}
