/** @jest-environment node */

import { NextRequest } from "next/server";
import { assertAttioPerson } from "@/lib/attio/person";
import { submitAttioLead } from "@/lib/attio/submitLead";
import { DEMO_REQUEST_WEBHOOK_URL } from "@/lib/attio/webhooks";
import { OPTIONS, POST } from "./route";

jest.mock("@/lib/attio/submitLead", () => ({
  submitAttioLead: jest.fn(),
}));
jest.mock("@/lib/attio/person", () => ({
  assertAttioPerson: jest.fn(),
}));

const submitAttioLeadMock = jest.mocked(submitAttioLead);
const assertAttioPersonMock = jest.mocked(assertAttioPerson);

function demoRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost/api/demo-request?test-country=CN", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: "https://app.rosterlab.com",
    },
    body: JSON.stringify({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Health",
      industry: "Nursing & Midwifery",
      rosterSize: "16 - 50 staff",
      decisionRole: ["I influence the decision", "I make the decision"],
      schedulingChallenges:
        "We need to reduce the time spent building complex schedules.",
      ...body,
    }),
  });
}

describe("demo request API", () => {
  beforeEach(() => {
    submitAttioLeadMock.mockReset().mockResolvedValue({ status: "submitted" });
    assertAttioPersonMock.mockReset().mockResolvedValue({ status: "updated" });
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  test("maps every answer onto its Attio person attribute", async () => {
    const response = await POST(
      demoRequest({
        referralSource: "Conference/Event",
        rosterSize: "16 - 50 staff",
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("access-control-allow-origin")).toBe(
      "https://app.rosterlab.com",
    );
    const [submission, options] = submitAttioLeadMock.mock.calls[0];
    expect(options).toEqual({ webhookUrl: DEMO_REQUEST_WEBHOOK_URL });
    expect(submission).toMatchObject({
      source: "demo-request",
      company: "Analytical Health",
      decisionRole: ["I influence the decision", "I make the decision"],
    });
    expect(submission.attioPerson).toEqual({
      email_addresses: ["ada@example.com"],
      name: [
        {
          first_name: "Ada",
          last_name: "Lovelace",
          full_name: "Ada Lovelace",
        },
      ],
      hubspot_company_text: "Analytical Health",
      industry_multi_select: ["Nursing & Midwifery"],
      how_did_you_hear_about_us_3: ["Conference/Event"],
      num_of_rostered_staff: "16 - 50 staff",
      hs_buying_role: ["I INFLUENCE THE DECISION", "DECISION_MAKER"],
      hs_membership_notes:
        "We need to reduce the time spent building complex schedules.",
      hubspot_country: "CN",
    });
  });

  test("omits an optional referral answer rather than sending a blank", async () => {
    await POST(demoRequest({ referralSource: "" }));

    const [submission] = submitAttioLeadMock.mock.calls[0];
    expect(submission.attioPerson).not.toHaveProperty(
      "how_did_you_hear_about_us_3",
    );
    expect(submission.attioPerson).toHaveProperty(
      "num_of_rostered_staff",
      "16 - 50 staff",
    );
  });

  test("requires a roster size before sending anything to Attio", async () => {
    const response = await POST(demoRequest({ rosterSize: "" }));

    expect(response.status).toBe(400);
    expect(submitAttioLeadMock).not.toHaveBeenCalled();
    expect(assertAttioPersonMock).not.toHaveBeenCalled();
  });

  test.each([
    ["company", ""],
    ["decisionRole", []],
  ])("requires %s before sending anything to Attio", async (field, value) => {
    const response = await POST(demoRequest({ [field]: value }));

    expect(response.status).toBe(400);
    expect(submitAttioLeadMock).not.toHaveBeenCalled();
    expect(assertAttioPersonMock).not.toHaveBeenCalled();
  });

  test("rejects an industry Attio would drop", async () => {
    const response = await POST(demoRequest({ industry: "Astrology" }));

    expect(response.status).toBe(400);
    expect(submitAttioLeadMock).not.toHaveBeenCalled();
  });

  test("requires scheduling challenges", async () => {
    const response = await POST(demoRequest({ schedulingChallenges: "" }));

    expect(response.status).toBe(400);
    expect(submitAttioLeadMock).not.toHaveBeenCalled();
  });

  test("writes the same answers onto the person record", async () => {
    await POST(
      demoRequest({
        referralSource: "Other",
        rosterSize: "100+ staff",
      }),
    );

    const [submission] = submitAttioLeadMock.mock.calls[0];
    expect(assertAttioPersonMock).toHaveBeenCalledWith(submission.attioPerson);
  });

  test("still confirms the request when only the attribute write fails", async () => {
    assertAttioPersonMock.mockResolvedValue({
      status: "error",
      detail: "Attio API returned 500",
    });

    const response = await POST(demoRequest({}));

    expect(response.status).toBe(200);
  });

  test("fails closed when the workflow does not accept the request", async () => {
    submitAttioLeadMock.mockResolvedValue({
      status: "error",
      detail: "Attio webhook returned 500",
    });

    const response = await POST(demoRequest({}));

    expect(response.status).toBe(502);
  });

  test("allows configured app origins and rejects unknown preflight origins", async () => {
    const allowed = await OPTIONS(
      new NextRequest("http://localhost/api/demo-request", {
        method: "OPTIONS",
        headers: { origin: "https://app.rosterlab.com" },
      }),
    );
    const rejected = await OPTIONS(
      new NextRequest("http://localhost/api/demo-request", {
        method: "OPTIONS",
        headers: { origin: "https://example.com" },
      }),
    );

    expect(allowed.status).toBe(204);
    expect(allowed.headers.get("access-control-allow-origin")).toBe(
      "https://app.rosterlab.com",
    );
    expect(rejected.status).toBe(403);
  });
});
