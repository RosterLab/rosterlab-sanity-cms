"use client";

import { useEffect, useState } from "react";
import { Intercom } from "react-live-chat-loader";

interface IntercomLazyProps {
  appId: string;
}

function getAnonId(): string | null {
  const match = document.cookie.match(/(?:^|; )_rl_anon_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function IntercomLazy({ appId }: IntercomLazyProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay Intercom load by 5 seconds to prioritize critical resources
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const anonId = getAnonId();
    if (!anonId) return;

    window.intercomSettings = {
      ...(window.intercomSettings || {}),
      app_id: appId,
      rl_anon_id: anonId,
    };

    if (typeof window.Intercom === "function") {
      window.Intercom("update", { rl_anon_id: anonId });
    }
  }, [appId, shouldLoad]);

  if (!appId || !shouldLoad) return null;

  return (
    <Intercom color="#219BC6" containerClass="fixed bottom-6 right-6 z-40" />
  );
}
