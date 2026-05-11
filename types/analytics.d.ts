interface Window {
  // RosterLab Marketing Tracker (ops.rosterlab.com/tracker.js)
  rlTracker?: {
    track: (event: string, properties?: Record<string, unknown>) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
    page: (name?: string, properties?: Record<string, unknown>) => void;
  };
}
