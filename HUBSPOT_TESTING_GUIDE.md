# HubSpot Contact Tracking - Testing Guide

## Issue Summary

**Problem:** Gated content form submissions (Whitepaper, Case Study, Demo Video) are unlocking content successfully, but contacts are not being created in HubSpot.

**Most Likely Cause:** `HUBSPOT_ACCESS_TOKEN` environment variable is not configured in Netlify production environment.

**Affected Forms:**
1. 📄 **Whitepaper Gate** → Conversion Point: "Gated Whitepaper"
2. 📊 **Case Study Gate** → Conversion Point: "Pop-up Case Study"
3. 🎥 **Demo Video Gate** → Conversion Point: "Pop-up Demo Video"

All three forms use the **same** `HUBSPOT_ACCESS_TOKEN` environment variable.

---

## Quick Test Steps

### 1. Check if HubSpot Token is Configured on Netlify

**Option A: Via Netlify Dashboard**
1. Go to https://app.netlify.com/sites/[your-site]/configuration/env
2. Search for `HUBSPOT_ACCESS_TOKEN`
3. If not found → **This is the problem!**

**Option B: Via Netlify CLI**
```bash
netlify env:list
# Should show: HUBSPOT_ACCESS_TOKEN
```

**Option C: Via Test Endpoints**

Deploy the code and visit these test URLs:
```
https://rosterlab.com/api/whitepaper-gate/test
https://rosterlab.com/api/case-study-gate/test
https://rosterlab.com/api/demo-video-gate/test
```

Expected response if working:
```json
{
  "endpoint": "/api/whitepaper-gate",
  "conversion_point": "Gated Whitepaper",
  "hubspot_token_configured": true
}
```

If token is missing:
```json
{
  "hubspot_token_configured": false
}
```

**Or use the unified test page:**
```
https://rosterlab.com/test-all-hubspot-gates.html
```
This page tests all three gates and shows a diagnostic table.

---

## Fix: Add HubSpot Token to Netlify

### Step 1: Get Your HubSpot Access Token

1. Go to HubSpot → Settings (gear icon)
2. Integrations → Private Apps
3. Find your app (or create a new one)
4. Copy the access token (starts with `pat-ap1-` or `pat-na1-`)

### Step 2: Add to Netlify Environment Variables

**Via Dashboard:**
1. Go to https://app.netlify.com/sites/[your-site]/configuration/env
2. Click "Add a variable"
3. Key: `HUBSPOT_ACCESS_TOKEN`
4. Value: (paste your token)
5. Scopes: Select "All" or specific deploy contexts
6. Click "Create variable"

**Via CLI:**
```bash
netlify env:set HUBSPOT_ACCESS_TOKEN "pat-ap1-your-token-here"
```

### Step 3: Trigger a Redeploy

**Option A: Via Dashboard**
1. Go to Deploys tab
2. Click "Trigger deploy" → "Clear cache and deploy site"

**Option B: Via CLI**
```bash
netlify deploy --prod
```

**Option C: Push to Git**
```bash
git commit --allow-empty -m "Trigger redeploy for env vars"
git push
```

---

## Testing After Fix

### Test 1: Check Token Configuration

**Option A: Unified Test Page**
Visit: https://rosterlab.com/test-all-hubspot-gates.html

Should show all three endpoints with "✓ Configured" status.

**Option B: Individual Test Endpoints**
Visit each endpoint:
- https://rosterlab.com/api/whitepaper-gate/test
- https://rosterlab.com/api/case-study-gate/test
- https://rosterlab.com/api/demo-video-gate/test

Should show:
```json
{
  "hubspot_token_configured": true
}
```

### Test 2: Submit Test Forms

**Option A: Use Test Page (Recommended)**
1. Visit: http://localhost:3000/test-all-hubspot-gates.html (local) or production URL
2. Fill and submit each form with unique test emails
3. Check results directly on the page

**Option B: Test Production Pages**
1. **Whitepaper:** https://rosterlab.com/whitepapers/rostering-as-a-strategic-workforce-lever
2. **Case Study:** Find a case study page with gated content modal
3. **Demo Video:** Find a page with demo video modal

Fill forms with test data:
   - **Email:** test-[type]-[DATE]@yourdomain.com (use unique email)
   - **Name:** Test User
   - **Industry:** Healthcare
   - **Role:** Test Manager
   - **Company:** Test Hospital (where applicable)
   - Wait 30 seconds for HubSpot API processing

### Test 3: Verify in HubSpot

1. Go to https://app.hubspot.com/contacts/
2. Search for the test email
3. Verify these fields are populated:
   - ✅ First name: Test
   - ✅ Last name: User
   - ✅ Email: test-whitepaper-[DATE]@yourdomain.com
   - ✅ Company: Test Hospital
   - ✅ Industry: Healthcare
   - ✅ Job Title: Test Manager
   - ✅ **Conversion Point:** (depends on form)
     - "Gated Whitepaper" for whitepaper form
     - "Pop-up Case Study" for case study form
     - "Pop-up Demo Video" for demo video form
   - ✅ **Lifecycle Stage: Lead**
   - ✅ **Lead Status: NEW**

### Test 4: Check Netlify Function Logs

**Via Dashboard:**
1. Go to https://app.netlify.com/sites/[your-site]/logs/functions
2. Look for recent `/api/whitepaper-gate`, `/api/case-study-gate`, or `/api/demo-video-gate` requests
3. Check for these log messages:
   ```
   ✅ Form data validated: { email: '...', ... }
   🔑 HubSpot token check: { configured: true, ... }
   📤 Sending to HubSpot: { email: '...', ... }
   ✅ Successfully created contact in HubSpot: { ... }
   ```

**Via CLI:**
```bash
netlify functions:log
```

---

## Common Issues & Solutions

### Issue 1: Token Not Configured
**Symptoms:**
- Logs show: `❌ CRITICAL: HubSpot access token not configured!`
- Test endpoint shows: `hubspot_token_configured: false`

**Solution:**
- Follow "Fix: Add HubSpot Token to Netlify" above

### Issue 2: Token Invalid/Expired
**Symptoms:**
- Logs show: `❌ HubSpot API error: { status: 401 }`
- Test endpoint shows: `status: 401, ok: false`

**Solution:**
1. Generate a new token in HubSpot (Settings → Integrations → Private Apps)
2. Update Netlify environment variable with new token
3. Redeploy

### Issue 3: Missing Permissions
**Symptoms:**
- Logs show: `❌ HubSpot API error: { status: 403 }`
- Test endpoint shows: `status: 403, ok: false`

**Solution:**
1. Go to HubSpot → Settings → Integrations → Private Apps
2. Edit your app
3. Ensure these scopes are enabled:
   - `crm.objects.contacts.write` ✅
   - `crm.objects.contacts.read` ✅
4. Save and update token in Netlify

### Issue 4: Contact Already Exists
**Symptoms:**
- Logs show: `⚠️ Contact already exists, updating...`
- Followed by: `✅ Contact updated successfully` and `✅ Activity logged successfully`

**This is normal behavior!** The API:
1. Tries to create contact
2. If already exists (409 conflict), updates the existing contact
3. Adds "Gated Whitepaper" to their conversion points
4. Creates a note with submission details

### Issue 5: CORS Error (CDP Tracking)
**Symptoms:**
- Browser console shows: `Access to fetch at 'https://rosterlab-inngest.netlify.app/api/batch' ... blocked by CORS`

**Impact:** This only affects CDP/analytics tracking, NOT HubSpot contact creation. The whitepaper form will still work and HubSpot contacts will still be created.

**Solution:** This is a separate issue from HubSpot tracking. The CDP endpoint needs CORS headers configured.

---

## Current Implementation Details

### What Happens When Someone Submits the Form

1. **Frontend** (`app/whitepapers/rostering-as-a-strategic-workforce-lever/page.tsx`):
   - Form validates with Zod schema
   - Tracks `whitepaper_form_submitted` event
   - Sends POST to `/api/whitepaper-gate`

2. **Backend** (`app/api/whitepaper-gate/route.ts`):
   - Validates form data
   - Splits name into firstname/lastname
   - **Sends to HubSpot API** (if token configured):
     - Creates new contact OR
     - Updates existing contact and adds note
   - Returns success response

3. **Frontend** (after success):
   - Tracks `whitepaper_unlocked` event
   - Stores unlock status in localStorage
   - Triggers PDF download
   - Redirects to `/unlocked` page

### HubSpot Fields Mapped

| Form Field | HubSpot Property | Notes |
|------------|------------------|-------|
| email | `email` | Used to identify contact |
| name | `firstname` + `lastname` | Split on space |
| company | `company` | Optional |
| industry | `industry` | Dropdown selection |
| role | `jobtitle` | Free text |
| (auto) | `conversion_point` | "Gated Whitepaper" |
| (auto) | `lifecyclestage` | "lead" |
| (auto) | `hs_lead_status` | "NEW" |

### For Existing Contacts

When a contact already exists (email match):
1. Updates their info with new data
2. Adds "Gated Whitepaper" to `conversion_point` (multi-select, preserves existing values)
3. Creates a note with submission details:
   ```
   Contact submitted Whitepaper Modal form.
   
   Details:
   - Industry: Healthcare
   - Role: Operations Manager
   - Company: Test Hospital
   ```

---

## Local Testing

### Test Locally Before Deploying

1. **Check token in .env.local:**
   ```bash
   cat .env.local | grep HUBSPOT
   # Should show: HUBSPOT_ACCESS_TOKEN=pat-ap1-...
   ```

2. **Start dev server:**
   ```bash
   pnpm dev
   ```

3. **Test with the test form:**
   ```bash
   open http://localhost:3000/test-hubspot-whitepaper.html
   ```

4. **Or test the actual page:**
   ```bash
   open http://localhost:3000/whitepapers/rostering-as-a-strategic-workforce-lever
   ```

5. **Watch terminal logs:**
   - Look for emoji indicators: ✅ 📤 🔑
   - Check for errors: ❌

---

## Monitoring & Debugging

### Real-time Logs

**Netlify CLI (live tail):**
```bash
netlify logs:stream
```

**Filter for whitepaper submissions:**
```bash
netlify logs:stream | grep "whitepaper"
```

### Check Recent Submissions

**View last 100 function logs:**
```bash
netlify functions:log --lines=100
```

### Debug Checklist

When a submission fails, check in this order:

1. ✅ **Environment variable set?**
   - Visit `/api/whitepaper-gate/test`
   - Should show `hubspot_token_configured: true`

2. ✅ **Token valid?**
   - Test endpoint should show `ok: true`
   - If 401: Token expired → regenerate in HubSpot

3. ✅ **Token has permissions?**
   - Test endpoint should show `can_read_contacts: true`
   - If 403: Add `crm.objects.contacts.write` scope

4. ✅ **Form validation passing?**
   - Check Netlify logs for `✅ Form data validated`
   - If missing: Form data not reaching API

5. ✅ **HubSpot API responding?**
   - Check logs for `📤 Sending to HubSpot`
   - Then `✅ Successfully created contact` or `⚠️ Contact already exists`

6. ✅ **Contact visible in HubSpot?**
   - Search by email in HubSpot Contacts
   - May take 30-60 seconds to appear

---

## Next Steps After Fixing

1. **Deploy the updated code** (with enhanced logging)
2. **Add HubSpot token** to Netlify environment variables
3. **Test with a real submission** on production
4. **Verify in HubSpot** that contact was created
5. **Monitor logs** for the next few submissions
6. **Remove test contact** from HubSpot after verification

---

## Need Help?

### Error in Logs: "❌ CRITICAL: HubSpot access token not configured!"
→ Token is missing from Netlify environment. Follow "Fix: Add HubSpot Token to Netlify" section above.

### Error in Logs: "❌ HubSpot API error: { status: 401 }"
→ Token is invalid or expired. Regenerate in HubSpot and update Netlify.

### Error in Logs: "❌ HubSpot API error: { status: 403 }"
→ Token lacks permissions. Add `crm.objects.contacts.write` scope in HubSpot Private App settings.

### Form submits but no HubSpot logs
→ Check if form is hitting `/api/whitepaper-gate` endpoint. Open browser Network tab and look for POST request.

### Contact created but fields are empty
→ Check form field mapping. Verify `name`, `email`, `industry`, `role` are being sent in POST body.
