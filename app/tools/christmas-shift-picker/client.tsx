"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";

interface Shift {
  id: string;
  name: string;
  time: string;
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

export default function ChristmasShiftPickerClient() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [dates, setDates] = useState<ShiftDate[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [shareableLink, setShareableLink] = useState<string>("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  // Shift management
  const [newShiftName, setNewShiftName] = useState("");
  const [newShiftTime, setNewShiftTime] = useState("");

  const addShift = () => {
    if (newShiftName && newShiftTime) {
      setShifts([
        ...shifts,
        { id: crypto.randomUUID(), name: newShiftName, time: newShiftTime },
      ]);
      setNewShiftName("");
      setNewShiftTime("");
    }
  };

  const removeShift = (id: string) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

  // Date management
  const [newDate, setNewDate] = useState("");

  const addDate = () => {
    if (newDate) {
      setDates([...dates, { id: crypto.randomUUID(), date: newDate }]);
      setNewDate("");
    }
  };

  const removeDate = (id: string) => {
    setDates(dates.filter((date) => date.id !== id));
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
  };

  // Generate shareable link
  const generateShareableLink = async () => {
    if (shifts.length === 0 || dates.length === 0 || staff.length === 0) {
      alert("Please add at least one shift, date, and staff member");
      return;
    }

    setIsGeneratingLink(true);

    try {
      // Create the picker data
      const pickerData = {
        shifts,
        dates,
        staff,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      };

      // Save to API and get unique ID
      const response = await fetch("/api/shift-picker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pickerData),
      });

      if (!response.ok) {
        throw new Error("Failed to create shift picker");
      }

      const { id } = await response.json();
      const link = `${window.location.origin}/tools/christmas-shift-picker/${id}`;
      setShareableLink(link);
    } catch (error) {
      console.error("Error generating link:", error);
      alert("Failed to generate shareable link. Please try again.");
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Link copied to clipboard!");
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Christmas Shift Picker
          </h1>
          <p className="text-xl text-gray-600">
            Fairly distribute festive season shifts among your team
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 text-teal-600 rounded-full mr-3 flex-shrink-0 font-semibold text-sm">
                1
              </span>
              <span>Add your shifts, dates, and staff members below</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 text-teal-600 rounded-full mr-3 flex-shrink-0 font-semibold text-sm">
                2
              </span>
              <span>Generate a shareable link and send it to your team</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 text-teal-600 rounded-full mr-3 flex-shrink-0 font-semibold text-sm">
                3
              </span>
              <span>Staff submit their preferences within 24 hours</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 text-teal-600 rounded-full mr-3 flex-shrink-0 font-semibold text-sm">
                4
              </span>
              <span>
                Shifts are automatically allocated fairly across the team
              </span>
            </li>
          </ol>
        </div>

        {/* Shifts Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Add Shifts
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Shift name (e.g., Morning Shift)"
                value={newShiftName}
                onChange={(e) => setNewShiftName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Time (e.g., 8am-4pm)"
                value={newShiftTime}
                onChange={(e) => setNewShiftTime(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={addShift}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
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
                      <span className="text-gray-900">
                        <strong>{shift.name}</strong> - {shift.time}
                      </span>
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
            <div className="flex gap-4">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={addDate}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Add
              </button>
            </div>

            {dates.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Added Dates:
                </h3>
                <div className="space-y-2">
                  {dates.map((dateItem) => (
                    <div
                      key={dateItem.id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <span className="text-gray-900">
                        {new Date(dateItem.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <button
                        onClick={() => removeDate(dateItem.id)}
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

        {/* Staff Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Add Staff Members
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={addStaff}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
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

        {/* Generate Link Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Generate Shareable Link
          </h2>
          <p className="text-gray-600 mb-4">
            Once you've added all shifts, dates, and staff members, generate a
            link to share with your team. They'll have 24 hours to submit their
            preferences.
          </p>
          <button
            onClick={generateShareableLink}
            disabled={
              isGeneratingLink ||
              shifts.length === 0 ||
              dates.length === 0 ||
              staff.length === 0
            }
            className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-lg hover:from-red-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isGeneratingLink ? "Generating..." : "Generate Shareable Link"}
          </button>

          {shareableLink && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                Link Generated!
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="flex-1 px-4 py-2 bg-white border border-green-300 rounded-lg text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-green-700 mt-2">
                Share this link with your staff. It expires in 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
