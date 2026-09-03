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

## Required workflow changes

1. Parse and require `submissionId` and `environment`.
2. If `environment` is `preview`, route to a QA-only branch that creates no
   production task or notification.
3. Create or update the Person using email.
4. Add a text attribute named `Submission ID` to the Website Leads list.
5. Find a Website Leads entry whose `Submission ID` equals the payload value.
6. Only when no entry exists, add the Person to Website Leads, populate the
   lead attributes, and create the appropriate follow-up task/notification.
7. At the end of both the new-entry and already-exists branches, use **Send HTTP
   request** to call the automation service:

```text
POST https://your-automations-site.netlify.app/api/website-lead-acknowledge
Authorization: Bearer <ATTIO_LEAD_CALLBACK_TOKEN>
Content-Type: application/json

{"submissionId":"<submissionId from the webhook payload>"}
```

The callback is intentionally last. A submission remains `accepted` until the
complete workflow acknowledges it, and is retried if no callback arrives.

## Netlify configuration

Marketing website:

```text
LEAD_DELIVERY_MODE=queue
WEBSITE_LEAD_INGEST_URL=https://your-automations-site.netlify.app/api/website-leads
WEBSITE_LEAD_INGEST_TOKEN=<production or preview token for this context>
SENTRY_DSN=<optional shared Sentry project DSN>
```

Automation service:

```text
WEBSITE_LEAD_INGEST_TOKEN=<production token>
WEBSITE_LEAD_PREVIEW_TOKEN=<preview token>
ATTIO_LEAD_WEBHOOK_URL=<production Attio workflow webhook>
ATTIO_LEAD_WEBHOOK_URL_PREVIEW=<preview-safe Attio workflow webhook>
ATTIO_LEAD_CALLBACK_TOKEN=<callback bearer token>
SENTRY_DSN=<optional shared Sentry project DSN>
```

Apply `011-website-lead-queue.sql` before enabling queue mode. Keep direct mode
available for one week as rollback, then remove the direct webhook secret from
the marketing site.

## Rollout checklist

1. Apply the migration and deploy the automation service.
2. Configure its production and preview tokens, Attio webhooks, callback token,
   and optional Sentry DSN.
3. Add Attio's idempotency check and final acknowledgement callback.
4. Set the marketing deploy-preview context to `LEAD_DELIVERY_MODE=queue` with
   the preview intake token.
5. Submit one contact form and one content gate. Confirm each queue row reaches
   `delivered`, each Attio entry is created once, and preview traffic creates no
   production sales task or notification.
6. Add a Sentry alert for errors tagged `subsystem=website-leads`, then enable
   queue mode in production. Switching `LEAD_DELIVERY_MODE` back to `direct` is
   the rollback.
