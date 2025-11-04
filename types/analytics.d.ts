interface Window {
  // Segment Analytics (via @segment/analytics-next)
  analytics?: {
    track: (event: string, properties?: Record<string, any>) => void;
    identify: (
      userId: string,
      traits?: Record<string, any>,
      options?: any,
    ) => void;
    page: (name?: string, properties?: Record<string, any>) => void;
    group: (groupId: string, traits?: Record<string, any>) => void;
    reset: () => void;
    user: () => {
      id: () => string | null;
      anonymousId: () => string | null;
      traits: () => Record<string, any>;
    };
  };
}
