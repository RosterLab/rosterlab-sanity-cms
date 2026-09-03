# Durable Attio website lead setup

The website stores each accepted submission in the automation service's Neon
queue before showing success. A Netlify background worker then calls the Attio
workflow. Attio owns CRM updates, tasks, and notifications.

## Attio workflow payload

The workflow receives the existing lead fields plus stable delivery fields:

```json
{
  "submissionId": "98c03be9-f878-4ca5-99f5-7c8ade16ad92",
  "environment": "production",
  "source": "contact",
  "email": "person@example.com",
  "firstName": "Person",
  "lastName": "Example",
  "name": "Person Example",
  "company": "Example Hospital",
  "phone": "+64 21 555 0100",
  "message": "We need help with rostering.",
  "detectedCountry": "NZ",
  "pageUrl": "https://rosterlab.com/contact",
  "metadata": {
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "brand"
  },
  "submittedAt": "2026-09-03T00:00:00.000Z"
}
```

## Attio workflow

No workflow changes are required for production. The existing workflow can
continue to create or update the Person, add the Website Leads entry, and send
its existing notification. The additional `submissionId` and `environment`
fields can be ignored.

If preview submissions must not notify sales, use a separate preview workflow
or add an `environment=preview` branch later.

The queue marks a submission delivered when Attio accepts the webhook with a
successful HTTP response. No callback action is required in Attio.

## Netlify configuration

Marketing website:

```text
LEAD_DELIVERY_MODE=queue
WEBSITE_LEAD_INGEST_URL=https://your-automations-site.netlify.app/api/website-leads
WEBSITE_LEAD_INGEST_TOKEN=<production or preview token for this context>
```

Automation service:

```text
WEBSITE_LEAD_INGEST_TOKEN=<production token>
WEBSITE_LEAD_PREVIEW_TOKEN=<preview token>
WEBSITE_LEAD_WORKER_TOKEN=<worker-only token>
ATTIO_LEAD_WEBHOOK_URL=<production Attio workflow webhook>
ATTIO_LEAD_WEBHOOK_URL_PREVIEW=<preview-safe Attio workflow webhook>
POSTHOG_PROJECT_TOKEN=<PostHog project token>
POSTHOG_HOST=https://us.i.posthog.com
```

Apply `011-website-lead-queue.sql` before enabling queue mode. Keep direct mode
available for one week as rollback, then remove the direct webhook secret from
the marketing site.

## Rollout checklist

1. Apply the migration and deploy the automation service.
2. Configure its production and preview tokens, Attio webhooks, and PostHog
   project settings.
3. Set the marketing site to `LEAD_DELIVERY_MODE=queue` with its context-specific
   intake token.
4. Submit one contact form and confirm its queue row reaches `delivered` and the
   expected Attio entry and notification are created.
5. Add a PostHog workflow alert for exceptions tagged
   `subsystem=website-leads`.
   Switching `LEAD_DELIVERY_MODE` back to `direct` is the rollback.
