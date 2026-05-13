"use client";

import { useRef, type ReactNode } from "react";
import { StatsigClient } from "@statsig/js-client";
import { StatsigProvider as BaseStatsigProvider } from "@statsig/react-bindings";
import { StatsigSessionReplayPlugin } from "@statsig/session-replay";

interface StatsigProviderProps {
  children: ReactNode;
  clientKey: string;
  user: { userID?: string; country?: string };
  initialValues: string | null;
}

export default function StatsigProvider({
  children,
  clientKey,
  user,
  initialValues,
}: StatsigProviderProps) {
  const clientRef = useRef<StatsigClient | null>(null);

  if (!clientRef.current) {
    const client = new StatsigClient(clientKey, user);

    if (initialValues) {
      client.dataAdapter.setData(initialValues);
    }

    if (process.env.NODE_ENV === "production") {
      const replay = new StatsigSessionReplayPlugin();
      replay.bind(client);
    }

    client.initializeSync();
    clientRef.current = client;
  }

  return (
    <BaseStatsigProvider client={clientRef.current}>
      {children}
    </BaseStatsigProvider>
  );
}
