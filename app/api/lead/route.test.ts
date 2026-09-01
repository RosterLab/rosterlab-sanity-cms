/** @jest-environment node */

import { NextRequest } from "next/server";
import { submitAttioLead } from "@/lib/attio/submitLead";
import { POST } from "./route";

jest.mock("@/lib/attio/submitLead", () => ({
  submitAttioLead: jest.fn(),
}));

const submitAttioLeadMock = jest.mocked(submitAttioLead);

function leadRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "person@example.com", ...body }),
  });
}

describe("lead API", () => {
  beforeEach(() => {
    submitAttioLeadMock.mockReset();
  });

  test.each(["newsletter", "ai-assistant-waitlist"] as const)(
    "fails closed when a %s lead cannot reach Attio",
    async (source) => {
      submitAttioLeadMock.mockResolvedValue({
        status: "error",
        detail: "Attio webhook returned 500",
      });

      const response = await POST(leadRequest({ source }));

      expect(response.status).toBe(502);
      expect(await response.json()).toMatchObject({ attio: "error" });
    },
  );

  test("returns unavailable when a required lead webhook is not configured", async () => {
    submitAttioLeadMock.mockResolvedValue({
      status: "skipped",
      reason: "no_webhook",
    });

    const response = await POST(leadRequest({ source: "newsletter" }));

    expect(response.status).toBe(503);
  });

  test("keeps promised download gates fail-open", async () => {
    submitAttioLeadMock.mockResolvedValue({
      status: "error",
      detail: "Attio webhook returned 500",
    });

    const response = await POST(leadRequest({ source: "template-excel" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ attio: "error" });
  });

  test("returns fake success for a populated honeypot without calling Attio", async () => {
    const response = await POST(
      leadRequest({ source: "newsletter", website: "spam.example" }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ attio: "filtered" });
    expect(submitAttioLeadMock).not.toHaveBeenCalled();
  });
});
