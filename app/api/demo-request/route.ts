import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { assertAttioPerson } from "@/lib/attio/person";
import {
  submitAttioLead,
  type AttioAttributeValue,
} from "@/lib/attio/submitLead";
import { demoRequestWebhookUrl } from "@/lib/attio/webhooks";
import { captureServerException } from "@/lib/monitoring/posthog-server";
import { detectRequestCountry } from "@/lib/market-access/geo";
import { evaluateMarketAccess } from "@/lib/market-access/policy";
import {
  DEMO_REQUEST_INDUSTRIES,
  DEMO_REQUEST_REFERRAL_SOURCES,
  DEMO_REQUEST_ROSTER_SIZES,
} from "@/lib/market-access/demo-request";

const optionalChoice = <T extends readonly [string, ...string[]]>(options: T) =>
  z
    .enum(options)
    .or(z.literal(""))
    .optional()
    .transform((value) => (value ? value : undefined));

const demoRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  industry: z.enum(DEMO_REQUEST_INDUSTRIES),
  referralSource: optionalChoice(DEMO_REQUEST_REFERRAL_SOURCES),
  rosterSize: optionalChoice(DEMO_REQUEST_ROSTER_SIZES),
  pageUrl: z.string().trim().max(500).optional(),
});

/**
 * Personalised demo requests from countries without live demo coverage.
 *
 * These go straight to their own Attio workflow rather than through the shared
 * website lead queue: the queue's worker only knows the general lead webhook,
 * and this form has a workflow of its own that notifies sales. The answers are
 * then written onto the Person record here — see `assertAttioPerson` for why
 * that isn't left to the workflow.
 */
export async function POST(request: NextRequest) {
  try {
    const input = demoRequestSchema.parse(await request.json());
    const detectedCountry = detectRequestCountry(request);
    const decision = evaluateMarketAccess(detectedCountry);
    const [firstName, ...lastNameParts] = input.name.split(/\s+/);
    const lastName = lastNameParts.join(" ");

    // Keyed by Attio People `api_slug`, in Attio's own value shapes. Optional
    // answers are left out rather than sent blank, so an unanswered question
    // never overwrites what the CRM already knows. See ATTIO_SETUP.md.
    const personValues: Record<string, AttioAttributeValue> = {
      email_addresses: [input.email],
      name: [
        {
          first_name: firstName,
          last_name: lastName,
          full_name: input.name,
        },
      ],
      industry_multi_select: [input.industry],
      ...(input.referralSource
        ? { how_did_you_hear_about_us_3: [input.referralSource] }
        : {}),
      ...(input.rosterSize ? { num_of_rostered_staff: input.rosterSize } : {}),
      ...(detectedCountry ? { hubspot_country: detectedCountry } : {}),
    };

    const result = await submitAttioLead(
      {
        source: "demo-request",
        email: input.email,
        firstName,
        lastName,
        name: input.name,
        detectedCountry,
        pageUrl: input.pageUrl,
        // Also flat at the top level: Attio workflow steps map from top-level
        // payload keys, so the answers have to be reachable without digging
        // into `metadata`.
        industry: input.industry,
        referralSource: input.referralSource ?? "",
        rosterSize: input.rosterSize ?? "",
        metadata: {
          industry: input.industry,
          referralSource: input.referralSource ?? null,
          rosterSize: input.rosterSize ?? null,
          policyVersion: decision.policyVersion,
          demoDecision: decision.demo,
          marketAccessReason: decision.reasonCode,
        },
        attioPerson: personValues,
      },
      { webhookUrl: demoRequestWebhookUrl() },
    );

    if (result.status !== "submitted") {
      await captureServerException(
        new Error("Demo request was not accepted by Attio"),
        {
          route: "/api/demo-request",
          result: result.status,
          detail: result.status === "error" ? result.detail : undefined,
        },
      );
      console.error("Demo request was not accepted by Attio", result);
      return NextResponse.json(
        { error: "Unable to submit the request" },
        { status: 502 },
      );
    }

    // The workflow owns the notification; the record's own attributes are
    // written here. A failure is logged rather than surfaced: the request has
    // already reached sales, so asking the person to submit again would only
    // duplicate it.
    const personUpdate = await assertAttioPerson(personValues);
    if (personUpdate.status === "error") {
      await captureServerException(
        new Error("Demo request attributes were not written to Attio"),
        { route: "/api/demo-request", detail: personUpdate.detail },
      );
      console.error("Demo request attributes were not written to Attio", {
        email: input.email,
        detail: personUpdate.detail,
      });
    }

    return NextResponse.json({ message: "Request submitted" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: error.issues },
        { status: 400 },
      );
    }
    await captureServerException(error, { route: "/api/demo-request" });
    console.error("Demo request failed", error);
    return NextResponse.json({ error: "Unable to submit" }, { status: 500 });
  }
}
