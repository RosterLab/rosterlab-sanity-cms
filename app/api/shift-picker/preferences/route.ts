import { NextResponse } from "next/server";
import { shiftPickerStorage } from "@/lib/shiftPickerStorage";

export async function POST(request: Request) {
  try {
    const { pickerId, staffId, preferences } = await request.json();

    if (!pickerId || !staffId || !preferences) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const picker = shiftPickerStorage.get(pickerId);

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
        { error: "This shift picker has expired" },
        { status: 410 },
      );
    }

    // Check if already complete
    if (picker.isComplete) {
      return NextResponse.json(
        { error: "This shift picker is already complete" },
        { status: 410 },
      );
    }

    // Store preferences
    picker.preferences[staffId] = {
      preferences,
      submittedAt: new Date().toISOString(),
    };

    // Check if all staff have submitted
    const allSubmitted = picker.staff.every(
      (staff: { id: string }) => picker.preferences[staff.id],
    );

    if (allSubmitted) {
      picker.isComplete = true;
      // Allocate shifts
      picker.allocation = allocateShifts(picker);
    }

    shiftPickerStorage.set(pickerId, picker);

    return NextResponse.json({ success: true, isComplete: picker.isComplete });
  } catch (error) {
    console.error("Error submitting preferences:", error);
    return NextResponse.json(
      { error: "Failed to submit preferences" },
      { status: 500 },
    );
  }
}

// Fair shift allocation algorithm
function allocateShifts(picker: any) {
  const { shifts, dates, staff, preferences } = picker;
  const allocation: any = {};

  // Initialize allocation
  staff.forEach((member: any) => {
    allocation[member.id] = [];
  });

  // Create all shift slots (date + shift combinations)
  const shiftSlots: any[] = [];
  dates.forEach((date: any) => {
    shifts.forEach((shift: any) => {
      shiftSlots.push({ date: date.date, shift: shift.id });
    });
  });

  // Track shift counts per person
  const shiftCounts: { [key: string]: number } = {};
  staff.forEach((member: any) => {
    shiftCounts[member.id] = 0;
  });

  // Sort slots by how many people prefer them (allocate least preferred first)
  shiftSlots.sort((a, b) => {
    const aPreferredBy = staff.filter((member: any) => {
      const prefs = preferences[member.id]?.preferences || {};
      const slotKey = `${a.date}-${a.shift}`;
      return prefs[slotKey] === "preferred";
    }).length;

    const bPreferredBy = staff.filter((member: any) => {
      const prefs = preferences[member.id]?.preferences || {};
      const slotKey = `${b.date}-${b.shift}`;
      return prefs[slotKey] === "preferred";
    }).length;

    return aPreferredBy - bPreferredBy;
  });

  // Allocate shifts
  shiftSlots.forEach((slot) => {
    const slotKey = `${slot.date}-${slot.shift}`;

    // Find available staff for this slot
    const availableStaff = staff.filter((member: any) => {
      const prefs = preferences[member.id]?.preferences || {};
      return prefs[slotKey] !== "unavailable";
    });

    if (availableStaff.length === 0) {
      // No one available, skip or handle as needed
      return;
    }

    // Prefer staff who marked it as preferred, then by who has fewest shifts
    availableStaff.sort((a: any, b: any) => {
      const aPrefs = preferences[a.id]?.preferences || {};
      const bPrefs = preferences[b.id]?.preferences || {};

      const aPreferred = aPrefs[slotKey] === "preferred" ? 1 : 0;
      const bPreferred = bPrefs[slotKey] === "preferred" ? 1 : 0;

      if (aPreferred !== bPreferred) {
        return bPreferred - aPreferred; // Prefer those who want it
      }

      // Then by fewest shifts
      return shiftCounts[a.id] - shiftCounts[b.id];
    });

    // Assign to first available staff
    const assignedStaff = availableStaff[0];
    allocation[assignedStaff.id].push(slot);
    shiftCounts[assignedStaff.id]++;
  });

  return allocation;
}
