# Attio website lead setup

The website sends every lead type to one server-side Attio workflow webhook. The webhook URL never reaches the browser.

## 1. Create the Attio workflow

In Attio, create a workflow with a **Webhook received** trigger and copy its URL. A test submission has this shape:

```json
{
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
  "submittedAt": "2026-09-01T00:00:00.000Z"
}
```

## 2. Configure the workflow actions

Recommended first version:

1. Find or create a Person using `email` as the unique value.
2. Update the person's name, email, phone and company.
3. Add the person to an **Inbound website leads** list.
4. Store `source`, `detectedCountry`, `pageUrl`, `submittedAt` and `metadata` on the list entry.
5. Branch on `source`:
   - `contact` and `commercial-review`: notify sales and create a follow-up task.
   - `calculator-*`, `template-*`, `personality-quiz`, `case-study`, `demo-video`, `whitepaper` and `newsletter`: capture the lead without creating an immediate sales task.
   - `ai-assistant-waitlist`: add the person to the waitlist view/list.
6. For `commercial-review`, prioritise when `metadata.fundingAvailable` is `yes` and `metadata.estimatedAnnualValueUsd` clears your chosen sales threshold.

The website validates and normalises the payload. Attio owns deduplication, record updates, list membership and sales routing, so those rules can be changed without another website deployment.

## 3. Configure deployment

Set the following server-side environment variable in every deployed environment that should capture leads:

```bash
ATTIO_LEAD_WEBHOOK_URL=https://app.attio.com/webhook/your-workflow-webhook
```

Production requires an HTTPS webhook. Contact, newsletter, waitlist and commercial-review forms show an error if the webhook is unavailable. Downloadable content gates fail open so visitors are not denied the promised asset because the CRM is down.

## 4. Verify

Submit one contact form and one content gate in the deployed preview. Confirm that Attio updates one Person, creates the expected list entries, and only creates a sales task for the contact/commercial route.
