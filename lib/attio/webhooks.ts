/**
 * Attio workflow webhooks the website posts to.
 *
 * These are unauthenticated inbound endpoints rather than credentials, so the
 * demo request one ships as a default: the form has to reach sales in every
 * deploy context, including previews that carry no extra configuration. Set
 * `ATTIO_DEMO_REQUEST_WEBHOOK_URL` to divert a context somewhere else.
 */
export const DEMO_REQUEST_WEBHOOK_URL =
  "https://hooks.attio.com/w/775c4edc-74a5-4ce6-b0e3-7b0079fd1278/70a7ddd9-4938-49c5-98a2-ec8a7a28e76e";

export function demoRequestWebhookUrl(): string {
  return (
    process.env.ATTIO_DEMO_REQUEST_WEBHOOK_URL?.trim() ||
    DEMO_REQUEST_WEBHOOK_URL
  );
}
