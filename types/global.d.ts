declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region?: string;
          target: string;
          onFormSubmitted?: (formData: any) => void | Promise<void>;
          onFormReady?: () => void;
          [key: string]: any;
        }) => void;
      };
    };
    dataLayer?: any[];
  }
}

export {};
