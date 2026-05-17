interface Window {
  // RosterLab Marketing Tracker (ops.rosterlab.com/tracker.js)
  rlTracker?: {
    track: (event: string, properties?: Record<string, unknown>) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
    page: (name?: string, properties?: Record<string, unknown>) => void;
    formStart: (formName: string) => void;
    formField: (formName: string, fieldName: string) => void;
    formSubmit: (formName: string) => void;
  };

  // Meta Pixel (Facebook Pixel)
  fbq?: MetaPixelFunction;
  _fbq?: MetaPixelFunction;
}

interface MetaPixelFunction {
  (...args: MetaPixelArgs): void;
  callMethod?: (...args: MetaPixelArgs) => void;
  queue?: MetaPixelArgs[];
  loaded?: boolean;
  version?: string;
  push?: (...args: MetaPixelArgs[]) => void;
}

type MetaPixelArgs =
  | ["init", string, MetaAdvancedMatchingData?]
  | ["track", MetaStandardEvent, MetaEventParameters?, MetaEventOptions?]
  | ["trackCustom", string, MetaEventParameters?, MetaEventOptions?]
  | ["consent", "grant" | "revoke"];

type MetaStandardEvent =
  | "AddPaymentInfo"
  | "AddToCart"
  | "AddToWishlist"
  | "CompleteRegistration"
  | "Contact"
  | "CustomizeProduct"
  | "Donate"
  | "FindLocation"
  | "InitiateCheckout"
  | "Lead"
  | "PageView"
  | "Purchase"
  | "Schedule"
  | "Search"
  | "StartTrial"
  | "SubmitApplication"
  | "Subscribe"
  | "ViewContent";

interface MetaAdvancedMatchingData {
  em?: string;
  fn?: string;
  ln?: string;
  ph?: string;
  ct?: string;
  st?: string;
  zp?: string;
  country?: string;
  external_id?: string;
}

interface MetaEventParameters {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
  predicted_ltv?: number;
  search_string?: string;
  status?: string;
  [key: string]: any;
}

interface MetaEventOptions {
  eventID?: string;
}
