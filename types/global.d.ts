declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    intercomSettings?: Record<string, any>;
    Intercom?: (...args: any[]) => void;
  }
}

export {};
