import { NextResponse } from "next/server";
import { shiftPickerStorage } from "@/lib/shiftPickerStorage";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Generate unique ID
    const id = crypto.randomUUID();

    // Store the shift picker data
    shiftPickerStorage.set(id, {
      ...data,
      id,
      preferences: {},
      isComplete: false,
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("Error creating shift picker:", error);
    return NextResponse.json(
      { error: "Failed to create shift picker" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const picker = shiftPickerStorage.get(id);

    if (!picker) {
      return NextResponse.json(
        { error: "Shift picker not found" },
        { status: 404 },
      );
    }

    // Check if expired
    const expiresAt = new Date(picker.expiresAt);
    if (new Date() > expiresAt) {
      return NextResponse.json(
        { error: "This shift picker has expired", expired: true },
        { status: 410 },
      );
    }

    return NextResponse.json(picker);
  } catch (error) {
    console.error("Error fetching shift picker:", error);
    return NextResponse.json(
      { error: "Failed to fetch shift picker" },
      { status: 500 },
    );
  }
}
