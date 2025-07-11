"use client";

import { Intercom } from "react-live-chat-loader";

interface IntercomLazyProps {
  appId: string;
}

export default function IntercomLazy({ appId }: IntercomLazyProps) {
  if (!appId) return null;

  return (
    <Intercom color="#219BC6" containerClass="fixed bottom-6 right-6 z-40" />
  );
}
