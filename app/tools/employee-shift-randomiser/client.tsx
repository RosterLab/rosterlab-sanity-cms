"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import ShiftRandomiserAnimation from "@/components/sections/animations/ShiftRandomiserAnimation";

interface Shift {
  id: string;
  name: string;
  time: string;
  isDesirable: boolean;
  minEmployees: number;
  maxEmployees: number;
}

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
}

interface ShiftDate {
  id: string;
  date: string;
}

interface DateShiftAssignment {
  dateId: string;
  shiftIds: string[];
}

interface Preference {
  id: string;
  staffId: string;
  type: "prefer" | "avoid";
  targetType: "shift" | "day";
  targetValue: string; // shift ID or day of week (0-6)
}

interface Rule {
  id: string;
  staffId: string;
  type: "cannot";
  targetType: "shift" | "day";
  targetValue: string; // shift ID or day of week (0-6)
}

interface Assignment {
  staffId: string;
  staffName: string;
  date: string;
  shift: Shift;
}

export default function EmployeeShiftRandomiserClient() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [dates, setDates] = useState<ShiftDate[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [dateShiftAssignments, setDateShiftAssignments] = useState<
    DateShiftAssignment[]
  >([]);
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Shift management
  const [newShiftName, setNewShiftName] = useState("");
  const [newShiftStartTime, setNewShiftStartTime] = useState("");
  const [newShiftEndTime, setNewShiftEndTime] = useState("");
  const [newShiftIsDesirable, setNewShiftIsDesirable] = useState(true);
  const [newShiftMinEmployees, setNewShiftMinEmployees] = useState(1);
  const [newShiftMaxEmployees, setNewShiftMaxEmployees] = useState(1);

  const addShift = () => {
    if (newShiftName && newShiftStartTime && newShiftEndTime) {
      // Validate min/max
      const min = Math.max(1, newShiftMinEmployees);
      const max = Math.max(min, newShiftMaxEmployees);

      // Format the time display
      const timeDisplay = `${newShiftStartTime} - ${newShiftEndTime}`;

      setShifts([
        ...shifts,
        {
          id: crypto.randomUUID(),
          name: newShiftName,
          time: timeDisplay,
          isDesirable: newShiftIsDesirable,
          minEmployees: min,
          maxEmployees: max,
        },
      ]);
      setNewShiftName("");
      setNewShiftStartTime("");
      setNewShiftEndTime("");
      setNewShiftIsDesirable(true);
      setNewShiftMinEmployees(1);
      setNewShiftMaxEmployees(1);
    }
  };

  const removeShift = (id: string) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
    // Clean up preferences and rules for this shift
    setPreferences(
      preferences.filter(
        (p) => p.targetType !== "shift" || p.targetValue !== id,
      ),
    );
    setRules(
      rules.filter((r) => r.targetType !== "shift" || r.targetValue !== id),
    );
    // Clean up date-shift assignments
    setDateShiftAssignments(
      dateShiftAssignments.map((dsa) => ({
        ...dsa,
        shiftIds: dsa.shiftIds.filter((sid) => sid !== id),
      })),
    );
  };

  // Date management
  const [newDate, setNewDate] = useState("");

  const addDate = () => {
    if (newDate) {
      const dateId = crypto.randomUUID();
      setDates([...dates, { id: dateId, date: newDate }]);
      // Initialize with all shifts by default
      setDateShiftAssignments([
        ...dateShiftAssignments,
        { dateId, shiftIds: shifts.map((s) => s.id) },
      ]);
      setNewDate("");
    }
  };

  const removeDate = (id: string) => {
    setDates(dates.filter((date) => date.id !== id));
    setDateShiftAssignments(
      dateShiftAssignments.filter((dsa) => dsa.dateId !== id),
    );
  };

  const toggleShiftForDate = (dateId: string, shiftId: string) => {
    setDateShiftAssignments((prev) => {
      const existing = prev.find((dsa) => dsa.dateId === dateId);
      if (!existing) {
        return [...prev, { dateId, shiftIds: [shiftId] }];
      }

      const hasShift = existing.shiftIds.includes(shiftId);
      if (hasShift) {
        return prev.map((dsa) =>
          dsa.dateId === dateId
            ? { ...dsa, shiftIds: dsa.shiftIds.filter((id) => id !== shiftId) }
            : dsa,
        );
      } else {
        return prev.map((dsa) =>
          dsa.dateId === dateId
            ? { ...dsa, shiftIds: [...dsa.shiftIds, shiftId] }
            : dsa,
        );
      }
    });
  };

  const isShiftAssignedToDate = (dateId: string, shiftId: string): boolean => {
    const assignment = dateShiftAssignments.find(
      (dsa) => dsa.dateId === dateId,
    );
    return assignment ? assignment.shiftIds.includes(shiftId) : false;
  };

  // Staff management
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  const addStaff = () => {
    if (newFirstName && newLastName) {
      setStaff([
        ...staff,
        {
          id: crypto.randomUUID(),
          firstName: newFirstName,
          lastName: newLastName,
        },
      ]);
      setNewFirstName("");
      setNewLastName("");
    }
  };

  const removeStaff = (id: string) => {
    setStaff(staff.filter((member) => member.id !== id));
    // Clean up preferences and rules for this staff member
    setPreferences(preferences.filter((p) => p.staffId !== id));
    setRules(rules.filter((r) => r.staffId !== id));
  };

  // Preference management
  const [newPrefStaffId, setNewPrefStaffId] = useState("");
  const [newPrefType, setNewPrefType] = useState<"prefer" | "avoid">("prefer");
  const [newPrefTargetType, setNewPrefTargetType] = useState<"shift" | "day">(
    "shift",
  );
  const [newPrefTargetValue, setNewPrefTargetValue] = useState("");

  const addPreference = () => {
    if (newPrefStaffId && newPrefTargetValue) {
      setPreferences([
        ...preferences,
        {
          id: crypto.randomUUID(),
          staffId: newPrefStaffId,
          type: newPrefType,
          targetType: newPrefTargetType,
          targetValue: newPrefTargetValue,
        },
      ]);
      setNewPrefStaffId("");
      setNewPrefTargetValue("");
    }
  };

  const removePreference = (id: string) => {
    setPreferences(preferences.filter((p) => p.id !== id));
  };

  // Rule management
  const [newRuleStaffId, setNewRuleStaffId] = useState("");
  const [newRuleTargetType, setNewRuleTargetType] = useState<"shift" | "day">(
    "day",
  );
  const [newRuleTargetValue, setNewRuleTargetValue] = useState("");

  const addRule = () => {
    if (newRuleStaffId && newRuleTargetValue) {
      setRules([
        ...rules,
        {
          id: crypto.randomUUID(),
          staffId: newRuleStaffId,
          type: "cannot",
          targetType: newRuleTargetType,
          targetValue: newRuleTargetValue,
        },
      ]);
      setNewRuleStaffId("");
      setNewRuleTargetValue("");
    }
  };

  const removeRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  // Check if a staff member can work a specific shift on a specific date
  const canStaffWorkShift = (
    staffId: string,
    shiftId: string,
    date: string,
  ): boolean => {
    // Check day-of-week rules
    const dayOfWeek = new Date(date).getDay();
    const hasDayRule = rules.some(
      (r) =>
        r.staffId === staffId &&
        r.targetType === "day" &&
        r.targetValue === dayOfWeek.toString(),
    );
    if (hasDayRule) return false;

    // Check shift rules
    const hasShiftRule = rules.some(
      (r) =>
        r.staffId === staffId &&
        r.targetType === "shift" &&
        r.targetValue === shiftId,
    );
    if (hasShiftRule) return false;

    return true;
  };

  // Get preference score for a staff member, shift, and date
  const getPreferenceScore = (
    staffId: string,
    shiftId: string,
    date: string,
  ): number => {
    let score = 0;

    // Check shift preferences
    const shiftPref = preferences.find(
      (p) =>
        p.staffId === staffId &&
        p.targetType === "shift" &&
        p.targetValue === shiftId,
    );
    if (shiftPref) {
      score += shiftPref.type === "prefer" ? 2 : -2;
    }

    // Check day preferences
    const dayOfWeek = new Date(date).getDay();
    const dayPref = preferences.find(
      (p) =>
        p.staffId === staffId &&
        p.targetType === "day" &&
        p.targetValue === dayOfWeek.toString(),
    );
    if (dayPref) {
      score += dayPref.type === "prefer" ? 1 : -1;
    }

    return score;
  };

  // Randomize shift distribution
  const randomizeShifts = () => {
    if (shifts.length === 0 || dates.length === 0 || staff.length === 0) {
      alert("Please add at least one shift, date, and staff member");
      return;
    }

    setIsRandomizing(true);

    // Create shift instances (date + shift + required slots per min/max)
    type ShiftInstance = {
      date: string;
      shift: Shift;
      requiredCount: number;
    };

    const shiftInstances: ShiftInstance[] = [];
    dates.forEach((date) => {
      const dateAssignment = dateShiftAssignments.find(
        (dsa) => dsa.dateId === date.id,
      );
      const assignedShiftIds = dateAssignment?.shiftIds || [];

      assignedShiftIds.forEach((shiftId) => {
        const shift = shifts.find((s) => s.id === shiftId);
        if (shift) {
          // Randomly choose a number between min and max employees for this shift
          const requiredCount =
            shift.minEmployees +
            Math.floor(
              Math.random() * (shift.maxEmployees - shift.minEmployees + 1),
            );
          shiftInstances.push({
            date: date.date,
            shift,
            requiredCount,
          });
        }
      });
    });

    if (shiftInstances.length === 0) {
      alert("No shifts assigned to dates. Please assign shifts to dates.");
      setIsRandomizing(false);
      return;
    }

    // Shuffle shift instances using Fisher-Yates algorithm
    const shuffledInstances = [...shiftInstances];
    for (let i = shuffledInstances.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledInstances[i], shuffledInstances[j]] = [
        shuffledInstances[j],
        shuffledInstances[i],
      ];
    }

    // Sort: undesirable shifts first (harder to fill)
    shuffledInstances.sort((a, b) => {
      if (a.shift.isDesirable !== b.shift.isDesirable) {
        return a.shift.isDesirable ? 1 : -1;
      }
      return 0;
    });

    // Track shift counts per person
    const shiftCounts: { [key: string]: number } = {};
    staff.forEach((member) => {
      shiftCounts[member.id] = 0;
    });

    const newAssignments: Assignment[] = [];

    // Assign staff to each shift instance
    shuffledInstances.forEach((instance) => {
      const assignedToThisShift: string[] = [];

      // Try to fill this shift with the required number of people
      for (let i = 0; i < instance.requiredCount; i++) {
        // Find eligible staff who:
        // 1. Can work this shift/date per rules
        // 2. Haven't already been assigned to this specific shift instance
        const eligibleStaff = staff.filter(
          (member) =>
            canStaffWorkShift(member.id, instance.shift.id, instance.date) &&
            !assignedToThisShift.includes(member.id),
        );

        if (eligibleStaff.length === 0) {
          // Can't fill this position, continue to next
          break;
        }

        // Sort eligible staff by:
        // 1. Preference score (higher is better)
        // 2. Shift count (fewer shifts first)
        // 3. Random (for tie-breaking)
        eligibleStaff.sort((a, b) => {
          const aPref = getPreferenceScore(
            a.id,
            instance.shift.id,
            instance.date,
          );
          const bPref = getPreferenceScore(
            b.id,
            instance.shift.id,
            instance.date,
          );
          if (aPref !== bPref) {
            return bPref - aPref; // Higher preference first
          }
          if (shiftCounts[a.id] !== shiftCounts[b.id]) {
            return shiftCounts[a.id] - shiftCounts[b.id]; // Fewer shifts first
          }
          return Math.random() - 0.5; // Random tie-breaker
        });

        // Assign the best eligible staff member
        const assignedStaff = eligibleStaff[0];
        assignedToThisShift.push(assignedStaff.id);

        newAssignments.push({
          staffId: assignedStaff.id,
          staffName: `${assignedStaff.firstName} ${assignedStaff.lastName}`,
          date: instance.date,
          shift: instance.shift,
        });

        shiftCounts[assignedStaff.id]++;
      }
    });

    // Sort assignments by staff name for display
    newAssignments.sort((a, b) => a.staffName.localeCompare(b.staffName));

    setAssignments(newAssignments);
    setIsRandomizing(false);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (assignments.length === 0) return;

    const headers = ["Staff Member", "Date", "Shift", "Time", "Type"];
    const rows = assignments.map((a) => [
      a.staffName,
      new Date(a.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      a.shift.name,
      a.shift.time,
      a.shift.isDesirable ? "Desirable" : "Undesirable",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shift-assignments-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Export to Excel (XLSX format)
  const exportToExcel = () => {
    if (assignments.length === 0) return;

    const headers = ["Staff Member", "Date", "Shift", "Time", "Type"];
    const rows = assignments.map((a) => [
      a.staffName,
      new Date(a.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      a.shift.name,
      a.shift.time,
      a.shift.isDesirable ? "Desirable" : "Undesirable",
    ]);

    const htmlTable = `
      <html xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="UTF-8">
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Shift Assignments</x:Name>
                <x:WorksheetOptions><x:Print><x:ValidPrinterInfo/></x:Print></x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
      </head>
      <body>
        <table border="1">
          <thead>
            <tr>
              ${headers.map((h) => `<th>${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([htmlTable], {
      type: "application/vnd.ms-excel",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shift-assignments-${new Date().toISOString().split("T")[0]}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Export to Google Sheets (opens in new tab)
  const exportToGoogleSheets = () => {
    if (assignments.length === 0) return;

    const headers = ["Staff Member", "Date", "Shift", "Time", "Type"];
    const rows = assignments.map((a) => [
      a.staffName,
      new Date(a.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      a.shift.name,
      a.shift.time,
      a.shift.isDesirable ? "Desirable" : "Undesirable",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    navigator.clipboard.writeText(csvContent);
    alert(
      "Data copied to clipboard! Opening Google Sheets...\n\nPaste the data (Ctrl/Cmd+V) into a new Google Sheet.",
    );
    window.open("https://sheets.new", "_blank");
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Share tool functionality
  const shareToolUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Employee Shift Randomiser
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
                Looking for a quick way to fairly distribute the good and bad
                shifts across the holiday season? Try our free shift randomiser
                to help assign employees in a random and fair way.
              </p>
              <div className="flex justify-center">
                <Image
                  src="/images/illustration/shift-randomiser.svg"
                  alt="Employee shift randomiser illustration"
                  width={600}
                  height={400}
                  className="w-full max-w-2xl h-auto"
                />
              </div>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How it works
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left side - Steps */}
                <div>
                  <ol className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full mr-3 flex-shrink-0 font-semibold text-sm">
                        1
                      </span>
                      <span>
                        Add shifts (mark as desirable/undesirable), dates, and
                        staff
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full mr-3 flex-shrink-0 font-semibold text-sm">
                        2
                      </span>
                      <span>Assign which shifts apply to which dates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full mr-3 flex-shrink-0 font-semibold text-sm">
                        3
                      </span>
                      <span>
                        (Optional) Add staff preferences for shifts and days
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full mr-3 flex-shrink-0 font-semibold text-sm">
                        4
                      </span>
                      <span>
                        (Optional) Add scheduling rules for shifts and days
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full mr-3 flex-shrink-0 font-semibold text-sm">
                        5
                      </span>
                      <span>
                        Randomize and export to CSV, Excel, or Google Sheets
                      </span>
                    </li>
                  </ol>
                </div>

                {/* Right side - Animation */}
                <div className="hidden lg:block">
                  <ShiftRandomiserAnimation />
                </div>
              </div>
            </div>

            {/* Shifts Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Add Shifts
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 flex-wrap items-end">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shift Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Night Shift"
                      value={newShiftName}
                      onChange={(e) => setNewShiftName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newShiftStartTime}
                      onChange={(e) => setNewShiftStartTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newShiftEndTime}
                      onChange={(e) => setNewShiftEndTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="min-w-[90px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Staff
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newShiftMinEmployees}
                      onChange={(e) =>
                        setNewShiftMinEmployees(parseInt(e.target.value) || 1)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="min-w-[90px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Staff
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newShiftMaxEmployees}
                      onChange={(e) =>
                        setNewShiftMaxEmployees(parseInt(e.target.value) || 1)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 h-[42px]">
                    <input
                      type="checkbox"
                      checked={newShiftIsDesirable}
                      onChange={(e) => setNewShiftIsDesirable(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Desirable</span>
                  </label>
                  <button
                    onClick={addShift}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors h-[42px]"
                  >
                    Add
                  </button>
                </div>

                {shifts.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Added Shifts:
                    </h3>
                    <div className="space-y-2">
                      {shifts.map((shift) => (
                        <div
                          key={shift.id}
                          className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3 flex-wrap">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded ${
                                shift.isDesirable
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {shift.isDesirable ? "Desirable" : "Undesirable"}
                            </span>
                            <span className="text-gray-900">
                              <strong>{shift.name}</strong> - {shift.time}
                            </span>
                            <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                              {shift.minEmployees === shift.maxEmployees
                                ? `${shift.minEmployees} staff`
                                : `${shift.minEmployees}-${shift.maxEmployees} staff`}
                            </span>
                          </div>
                          <button
                            onClick={() => removeShift(shift.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dates Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Add Dates
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 flex-wrap">
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={addDate}
                    disabled={shifts.length === 0}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    Add
                  </button>
                </div>

                {shifts.length === 0 && (
                  <p className="text-sm text-amber-600">
                    Please add shifts first before adding dates
                  </p>
                )}

                {dates.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Added Dates & Shift Assignments:
                    </h3>
                    <div className="space-y-4">
                      {dates.map((dateItem) => (
                        <div
                          key={dateItem.id}
                          className="border border-gray-200 p-4 rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-semibold text-gray-900">
                                {new Date(dateItem.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                Select which shifts apply to this date:
                              </div>
                            </div>
                            <button
                              onClick={() => removeDate(dateItem.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {shifts.map((shift) => (
                              <button
                                key={shift.id}
                                onClick={() =>
                                  toggleShiftForDate(dateItem.id, shift.id)
                                }
                                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                  isShiftAssignedToDate(dateItem.id, shift.id)
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                              >
                                {shift.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Staff Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Add Staff Members
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 flex-wrap">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="flex-1 min-w-[120px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="flex-1 min-w-[120px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={addStaff}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto"
                  >
                    Add
                  </button>
                </div>

                {staff.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Added Staff:
                    </h3>
                    <div className="space-y-2">
                      {staff.map((member) => (
                        <div
                          key={member.id}
                          className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                        >
                          <span className="text-gray-900">
                            {member.firstName} {member.lastName}
                          </span>
                          <button
                            onClick={() => removeStaff(member.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preferences Section (Optional) */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                4. Add Preferences{" "}
                <span className="text-base font-normal text-gray-500">
                  (Optional)
                </span>
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Specify which shifts or days of the week staff prefer or want to
                avoid
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 flex-wrap">
                  <select
                    value={newPrefStaffId}
                    onChange={(e) => setNewPrefStaffId(e.target.value)}
                    className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    disabled={staff.length === 0}
                  >
                    <option value="">Select Staff</option>
                    {staff.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.firstName} {member.lastName}
                      </option>
                    ))}
                  </select>

                  <select
                    value={newPrefType}
                    onChange={(e) =>
                      setNewPrefType(e.target.value as "prefer" | "avoid")
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="prefer">Prefers</option>
                    <option value="avoid">Wants to Avoid</option>
                  </select>

                  <select
                    value={newPrefTargetType}
                    onChange={(e) => {
                      setNewPrefTargetType(e.target.value as "shift" | "day");
                      setNewPrefTargetValue("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="shift">Shift</option>
                    <option value="day">Day of Week</option>
                  </select>

                  {newPrefTargetType === "shift" ? (
                    <select
                      value={newPrefTargetValue}
                      onChange={(e) => setNewPrefTargetValue(e.target.value)}
                      className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      disabled={shifts.length === 0}
                    >
                      <option value="">Select Shift</option>
                      {shifts.map((shift) => (
                        <option key={shift.id} value={shift.id}>
                          {shift.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={newPrefTargetValue}
                      onChange={(e) => setNewPrefTargetValue(e.target.value)}
                      className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Day</option>
                      {dayNames.map((day, index) => (
                        <option key={index} value={index.toString()}>
                          {day}
                        </option>
                      ))}
                    </select>
                  )}

                  <button
                    onClick={addPreference}
                    disabled={staff.length === 0}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    Add
                  </button>
                </div>

                {staff.length === 0 && (
                  <p className="text-sm text-amber-600">
                    Please add staff members first
                  </p>
                )}

                {preferences.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Preferences:
                    </h3>
                    <div className="space-y-2">
                      {preferences.map((pref) => {
                        const staffMember = staff.find(
                          (s) => s.id === pref.staffId,
                        );
                        let targetText = "";
                        if (pref.targetType === "shift") {
                          const shift = shifts.find(
                            (s) => s.id === pref.targetValue,
                          );
                          targetText = shift?.name || "";
                        } else {
                          targetText = `${dayNames[parseInt(pref.targetValue)]}s`;
                        }
                        return (
                          <div
                            key={pref.id}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                          >
                            <span className="text-gray-900">
                              <strong>
                                {staffMember?.firstName} {staffMember?.lastName}
                              </strong>{" "}
                              <span
                                className={
                                  pref.type === "prefer"
                                    ? "text-green-600"
                                    : "text-orange-600"
                                }
                              >
                                {pref.type === "prefer"
                                  ? "prefers"
                                  : "wants to avoid"}
                              </span>{" "}
                              <strong>{targetText}</strong>
                            </span>
                            <button
                              onClick={() => removePreference(pref.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rules Section (Optional) */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                5. Add Rules{" "}
                <span className="text-base font-normal text-gray-500">
                  (Optional)
                </span>
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Set hard constraints like day-of-week restrictions or shift
                exclusions
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 flex-wrap">
                  <select
                    value={newRuleStaffId}
                    onChange={(e) => setNewRuleStaffId(e.target.value)}
                    className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    disabled={staff.length === 0}
                  >
                    <option value="">Select Staff</option>
                    {staff.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.firstName} {member.lastName}
                      </option>
                    ))}
                  </select>

                  <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                    Cannot Work
                  </div>

                  <select
                    value={newRuleTargetType}
                    onChange={(e) => {
                      setNewRuleTargetType(e.target.value as "shift" | "day");
                      setNewRuleTargetValue("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="day">Day of Week</option>
                    <option value="shift">Shift</option>
                  </select>

                  {newRuleTargetType === "day" ? (
                    <select
                      value={newRuleTargetValue}
                      onChange={(e) => setNewRuleTargetValue(e.target.value)}
                      className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Day</option>
                      {dayNames.map((day, index) => (
                        <option key={index} value={index.toString()}>
                          {day}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={newRuleTargetValue}
                      onChange={(e) => setNewRuleTargetValue(e.target.value)}
                      className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      disabled={shifts.length === 0}
                    >
                      <option value="">Select Shift</option>
                      {shifts.map((shift) => (
                        <option key={shift.id} value={shift.id}>
                          {shift.name}
                        </option>
                      ))}
                    </select>
                  )}

                  <button
                    onClick={addRule}
                    disabled={staff.length === 0}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    Add
                  </button>
                </div>

                {staff.length === 0 && (
                  <p className="text-sm text-amber-600">
                    Please add staff members first
                  </p>
                )}

                {rules.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Rules:</h3>
                    <div className="space-y-2">
                      {rules.map((rule) => {
                        const staffMember = staff.find(
                          (s) => s.id === rule.staffId,
                        );
                        let ruleText = "";
                        if (rule.targetType === "day") {
                          ruleText = `cannot work ${dayNames[parseInt(rule.targetValue)]}s`;
                        } else {
                          const shift = shifts.find(
                            (s) => s.id === rule.targetValue,
                          );
                          ruleText = `cannot work ${shift?.name}`;
                        }
                        return (
                          <div
                            key={rule.id}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                          >
                            <span className="text-gray-900">
                              <strong>
                                {staffMember?.firstName} {staffMember?.lastName}
                              </strong>{" "}
                              <span className="text-red-600">{ruleText}</span>
                            </span>
                            <button
                              onClick={() => removeRule(rule.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Randomize Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Randomise Shift Distribution
              </h2>
              <p className="text-gray-600 mb-4">
                Click to randomly distribute shifts while respecting preferences
                and rules
              </p>
              <button
                onClick={randomizeShifts}
                disabled={
                  isRandomizing ||
                  shifts.length === 0 ||
                  dates.length === 0 ||
                  staff.length === 0
                }
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isRandomizing ? "Randomising..." : "🎲 Randomise Shifts"}
              </button>
            </div>

            {/* Results Section */}
            {assignments.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Shift Assignments
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={exportToCSV}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      📄 CSV
                    </button>
                    <button
                      onClick={exportToExcel}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      📊 Excel
                    </button>
                    <button
                      onClick={exportToGoogleSheets}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                    >
                      📑 Google Sheets
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {staff.map((member) => {
                    const memberAssignments = assignments.filter(
                      (a) => a.staffId === member.id,
                    );
                    const desirableCount = memberAssignments.filter(
                      (a) => a.shift.isDesirable,
                    ).length;
                    const undesirableCount = memberAssignments.filter(
                      (a) => !a.shift.isDesirable,
                    ).length;

                    return (
                      <div
                        key={member.id}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {member.firstName} {member.lastName}
                          <span className="ml-2 text-sm font-normal text-gray-600">
                            ({memberAssignments.length}{" "}
                            {memberAssignments.length === 1
                              ? "shift"
                              : "shifts"}
                            {memberAssignments.length > 0 &&
                              ` - ${desirableCount} desirable, ${undesirableCount} undesirable`}
                            )
                          </span>
                        </h3>

                        {memberAssignments.length === 0 ? (
                          <p className="text-gray-600">No shifts assigned</p>
                        ) : (
                          <div className="space-y-2">
                            {memberAssignments.map((assignment, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg ${
                                  assignment.shift.isDesirable
                                    ? "bg-green-50 border border-green-200"
                                    : "bg-orange-50 border border-orange-200"
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div
                                      className={`font-semibold ${
                                        assignment.shift.isDesirable
                                          ? "text-green-900"
                                          : "text-orange-900"
                                      }`}
                                    >
                                      {new Date(
                                        assignment.date,
                                      ).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </div>
                                    <div
                                      className={
                                        assignment.shift.isDesirable
                                          ? "text-green-700"
                                          : "text-orange-700"
                                      }
                                    >
                                      {assignment.shift.name} (
                                      {assignment.shift.time})
                                    </div>
                                  </div>
                                  <span
                                    className={`text-xs font-semibold px-2 py-1 rounded ${
                                      assignment.shift.isDesirable
                                        ? "bg-green-200 text-green-800"
                                        : "bg-orange-200 text-orange-800"
                                    }`}
                                  >
                                    {assignment.shift.isDesirable
                                      ? "Desirable"
                                      : "Undesirable"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={randomizeShifts}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    🔄 Re-randomise
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA Section - Combined Share and AI Rostering */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need More Advanced Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              While this randomiser is great for one-off shift allocation, if
              you need ongoing schedule management with AI-powered optimization,
              check out our AI Roster Generator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/solutions/ai-roster-generator"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-colors inline-block"
              >
                Discover AI Rostering →
              </a>
              <button
                onClick={shareToolUrl}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-md font-semibold transition-colors"
              >
                {isCopied ? "✓ Link Copied!" : "📋 Share This Tool"}
              </button>
            </div>
            <div className="mt-6 text-sm opacity-90">
              Automatically generate complete rosters with compliance,
              preferences, and workload balancing built-in
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
