import {
  DEMO_LABEL_BOOK_CLASS,
  DEMO_LABEL_REQUEST_CLASS,
} from "@/lib/market-access/client-gate";
import { toRequestDemoLabel } from "@/lib/market-access/labels";

/**
 * Renders both wordings of a demo CTA and lets CSS show the right one.
 *
 * The country isn't known until after first paint (the HTML is CDN-shared), so
 * picking here in React is what made the label visibly change a beat after the
 * page appeared. Both are in the DOM instead; only one is ever displayed, and
 * `display: none` keeps the other out of the accessibility tree.
 */
export default function DemoLabel({ children }: { children: string }) {
  const requestLabel = toRequestDemoLabel(children);
  // No booking verb to swap, so there's nothing country-dependent to gate.
  if (requestLabel === children) return <>{children}</>;

  return (
    <>
      <span className={DEMO_LABEL_BOOK_CLASS}>{children}</span>
      <span className={DEMO_LABEL_REQUEST_CLASS}>{requestLabel}</span>
    </>
  );
}
