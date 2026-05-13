"use client";

import { useEffect } from "react";
import { useStatsigClient } from "@statsig/react-bindings";
import { analytics } from "@/components/analytics/tracking";

export default function StatsigExposureLogger() {
  const { client } = useStatsigClient();

  useEffect(() => {
    if (!client) return;

    const handleGate = (event: { name: string; gate: { name: string; ruleID: string; value: boolean } }) => {
      analytics.track("experiment_exposure", {
        type: "gate",
        name: event.gate.name,
        value: event.gate.value,
        rule_id: event.gate.ruleID,
        source: "statsig",
      });
    };

    const handleExperiment = (event: { name: string; experiment: { name: string; ruleID: string; groupName: string | null; value: Record<string, unknown> } }) => {
      analytics.track("experiment_exposure", {
        type: "experiment",
        name: event.experiment.name,
        group: event.experiment.groupName,
        rule_id: event.experiment.ruleID,
        source: "statsig",
      });
    };

    client.on("gate_evaluation", handleGate as any);
    client.on("experiment_evaluation", handleExperiment as any);

    return () => {
      client.off("gate_evaluation", handleGate as any);
      client.off("experiment_evaluation", handleExperiment as any);
    };
  }, [client]);

  return null;
}
