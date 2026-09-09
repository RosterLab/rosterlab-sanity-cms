/** @jest-environment node */

import { NextRequest } from "next/server";
import { assertAttioPerson } from "@/lib/attio/person";
import { submitAttioLead } from "@/lib/attio/submitLead";
import { DEMO_REQUEST_WEBHOOK_URL } from "@/lib/attio/webhooks";
import { POST } from "./route";

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Ada Lovelace",
      email: "ada@example.com",
      industry: "Nursing & Midwifery",
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
    const [submission, options] = submitAttioLeadMock.mock.calls[0];
    expect(options).toEqual({ webhookUrl: DEMO_REQUEST_WEBHOOK_URL });
    expect(submission.source).toBe("demo-request");
    expect(submission.attioPerson).toEqual({
      email_addresses: ["ada@example.com"],
      name: [
        {
          first_name: "Ada",
          last_name: "Lovelace",
          full_name: "Ada Lovelace",
        },
      ],
      industry_multi_select: ["Nursing & Midwifery"],
      how_did_you_hear_about_us_3: ["Conference/Event"],
      num_of_rostered_staff: "16 - 50 staff",
      hubspot_country: "CN",
    });
  });

  test("omits the optional answers rather than sending blanks", async () => {
    await POST(demoRequest({ referralSource: "", rosterSize: "" }));

    const [submission] = submitAttioLeadMock.mock.calls[0];
    expect(submission.attioPerson).not.toHaveProperty(
      "how_did_you_hear_about_us_3",
    );
    expect(submission.attioPerson).not.toHaveProperty("num_of_rostered_staff");
  });

  test("rejects an industry Attio would drop", async () => {
    const response = await POST(demoRequest({ industry: "Astrology" }));

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
});
