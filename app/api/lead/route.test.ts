/** @jest-environment node */

import { NextRequest } from "next/server";
import { submitWebsiteLead } from "@/lib/leads/submitLead";
import { POST } from "./route";

jest.mock("@/lib/leads/submitLead", () => ({
  submitWebsiteLead: jest.fn(),
}));

const submitWebsiteLeadMock = jest.mocked(submitWebsiteLead);

function leadRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "person@example.com", ...body }),
  });
}

describe("lead API", () => {
  beforeEach(() => {
    submitWebsiteLeadMock.mockReset();
  });

  test.each(["newsletter", "ai-assistant-waitlist"] as const)(
    "fails closed when a %s lead cannot reach Attio",
    async (source) => {
      submitWebsiteLeadMock.mockResolvedValue({
        status: "error",
        delivery: "queue",
        detail: "Attio webhook returned 500",
      });

      const response = await POST(leadRequest({ source }));

      expect(response.status).toBe(502);
      expect(await response.json()).toMatchObject({ delivery: "error" });
      expect(response.headers.get("cache-control")).toBe("no-store");
    },
  );

  test("returns unavailable when a required lead webhook is not configured", async () => {
    submitWebsiteLeadMock.mockResolvedValue({
      status: "skipped",
      delivery: "queue",
      reason: "no_queue",
    });

    const response = await POST(leadRequest({ source: "newsletter" }));

    expect(response.status).toBe(503);
  });

  test("forwards every required contact answer", async () => {
    submitWebsiteLeadMock.mockResolvedValue({
      status: "submitted",
      delivery: "queue",
    });

    const response = await POST(
      leadRequest({
        source: "contact",
        name: "Ada Lovelace",
        company: "Analytical Health",
        industry: "Nursing & Midwifery",
        rosterSize: "16 - 50 staff",
        decisionRole: ["I influence the decision", "I make the decision"],
        message: "We need a fairer and faster scheduling process.",
      }),
    );

    expect(response.status).toBe(200);
    expect(submitWebsiteLeadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Ada Lovelace",
        company: "Analytical Health",
        industry: "Nursing & Midwifery",
        rosterSize: "16 - 50 staff",
        decisionRole: ["I influence the decision", "I make the decision"],
        message: "We need a fairer and faster scheduling process.",
      }),
    );
  });

  test.each([
    "name",
    "industry",
    "rosterSize",
    "decisionRole",
    "message",
  ] as const)("rejects a contact submission without %s", async (field) => {
    const body: Record<string, unknown> = {
      source: "contact",
      name: "Ada Lovelace",
      company: "Analytical Health",
      industry: "Nursing & Midwifery",
      rosterSize: "16 - 50 staff",
      decisionRole: ["I make the decision"],
      message: "We need a fairer and faster scheduling process.",
      [field]: "",
    };

    const response = await POST(leadRequest(body));

    expect(response.status).toBe(400);
    expect(submitWebsiteLeadMock).not.toHaveBeenCalled();
  });

  test("accepts a contact submission without the optional company", async () => {
    submitWebsiteLeadMock.mockResolvedValue({
      status: "submitted",
      delivery: "queue",
    });

    const response = await POST(
      leadRequest({
        source: "contact",
        name: "Ada Lovelace",
        industry: "Nursing & Midwifery",
        rosterSize: "16 - 50 staff",
        decisionRole: ["I make the decision"],
        message: "We need a fairer and faster scheduling process.",
      }),
    );

    expect(response.status).toBe(200);
    expect(submitWebsiteLeadMock).toHaveBeenCalledWith(
      expect.objectContaining({ company: undefined }),
    );
  });

  test("keeps promised download gates fail-open", async () => {
    submitWebsiteLeadMock.mockResolvedValue({
      status: "error",
      delivery: "queue",
      detail: "Attio webhook returned 500",
    });

    const response = await POST(leadRequest({ source: "template-excel" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ delivery: "error" });
  });

  test("returns fake success for a populated honeypot without calling Attio", async () => {
    const response = await POST(
      leadRequest({ source: "newsletter", website: "spam.example" }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ delivery: "filtered" });
    expect(submitWebsiteLeadMock).not.toHaveBeenCalled();
  });
});
