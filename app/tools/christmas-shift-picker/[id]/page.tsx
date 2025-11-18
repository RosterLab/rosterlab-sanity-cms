"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import SiteLayout from "@/components/layout/SiteLayout";

interface Shift {
  id: string;
  name: string;
  time: string;
}

interface ShiftDate {
  id: string;
  date: string;
}

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
}

interface PickerData {
  id: string;
  shifts: Shift[];
  dates: ShiftDate[];
  staff: StaffMember[];
  createdAt: string;
  expiresAt: string;
  isComplete: boolean;
  allocation?: any;
}

type PreferenceType = "preferred" | "available" | "unavailable";

export default function ShiftPickerSubmissionPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pickerData, setPickerData] = useState<PickerData | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [preferences, setPreferences] = useState<{
    [key: string]: PreferenceType;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchPickerData();
  }, [id]);

  const fetchPickerData = async () => {
    try {
      const response = await fetch(`/api/shift-picker?id=${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to load shift picker");
      }

      const data = await response.json();
      setPickerData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = (
    dateId: string,
    shiftId: string,
    preference: PreferenceType,
  ) => {
    const key = `${dateId}-${shiftId}`;
    setPreferences({ ...preferences, [key]: preference });
  };

  const handleSubmit = async () => {
    if (!selectedStaff) {
      alert("Please select your name");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/shift-picker/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickerId: id,
          staffId: selectedStaff,
          preferences,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit preferences");
      }

      const result = await response.json();
      setSubmitted(true);

      if (result.isComplete) {
        // Refresh to show results
        await fetchPickerData();
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SiteLayout>
        <section className="py-20 bg-gray-50 min-h-screen">
          <Container>
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading shift picker...</p>
            </div>
          </Container>
        </section>
      </SiteLayout>
    );
  }

  if (error) {
    return (
      <SiteLayout>
        <section className="py-20 bg-gray-50 min-h-screen">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                <h1 className="text-2xl font-bold text-red-900 mb-4">Error</h1>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </Container>
        </section>
      </SiteLayout>
    );
  }

  if (!pickerData) {
    return null;
  }

  // Show results if complete
  if (pickerData.isComplete && pickerData.allocation) {
    return (
      <SiteLayout>
        <section className="py-20 bg-gradient-to-br from-red-50 via-white to-green-50 min-h-screen">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Shift Allocation Complete!
                </h1>
                <p className="text-xl text-gray-600">
                  Here's the final shift allocation
                </p>
              </div>

              <div className="space-y-6">
                {pickerData.staff.map((member) => {
                  const assignedShifts = pickerData.allocation[member.id] || [];

                  return (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl shadow-lg p-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {member.firstName} {member.lastName}
                      </h2>

                      {assignedShifts.length === 0 ? (
                        <p className="text-gray-600">No shifts assigned</p>
                      ) : (
                        <div className="space-y-2">
                          {assignedShifts.map((slot: any, index: number) => {
                            const shift = pickerData.shifts.find(
                              (s) => s.id === slot.shift,
                            );
                            return (
                              <div
                                key={index}
                                className="bg-teal-50 p-3 rounded-lg"
                              >
                                <div className="font-semibold text-teal-900">
                                  {new Date(slot.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </div>
                                <div className="text-teal-700">
                                  {shift?.name} ({shift?.time})
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="mt-4 text-sm text-gray-600">
                        Total shifts: {assignedShifts.length}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      </SiteLayout>
    );
  }

  // Show submission form
  const timeRemaining = new Date(pickerData.expiresAt).getTime() - Date.now();
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
  );

  return (
    <SiteLayout>
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-green-50 min-h-screen">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Submit Your Shift Preferences
              </h1>
              <p className="text-xl text-gray-600">
                Select your availability for the festive season shifts
              </p>
              <div className="mt-4 inline-block bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2">
                <p className="text-yellow-800 font-semibold">
                  Time remaining: {hoursRemaining}h {minutesRemaining}m
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-green-900 mb-4">
                  Preferences Submitted!
                </h2>
                <p className="text-green-700">
                  Thank you for submitting your preferences. You'll be notified
                  once the shift allocation is complete.
                </p>
              </div>
            ) : (
              <>
                {/* Staff Selection */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Select Your Name
                  </h2>
                  <select
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                  >
                    <option value="">-- Select your name --</option>
                    {pickerData.staff.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.firstName} {member.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferences Grid */}
                {selectedStaff && (
                  <>
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Your Preferences
                      </h2>
                      <div className="mb-6 flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span>Preferred</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span>Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span>Unavailable</span>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left p-2 border-b-2 border-gray-200">
                                Date
                              </th>
                              {pickerData.shifts.map((shift) => (
                                <th
                                  key={shift.id}
                                  className="text-center p-2 border-b-2 border-gray-200"
                                >
                                  <div className="font-semibold">
                                    {shift.name}
                                  </div>
                                  <div className="text-xs text-gray-500 font-normal">
                                    {shift.time}
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {pickerData.dates.map((date) => (
                              <tr key={date.id} className="border-b">
                                <td className="p-2 font-medium">
                                  {new Date(date.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </td>
                                {pickerData.shifts.map((shift) => {
                                  const key = `${date.date}-${shift.id}`;
                                  const pref = preferences[key] || "available";

                                  return (
                                    <td key={shift.id} className="p-2">
                                      <div className="flex justify-center gap-1">
                                        <button
                                          onClick={() =>
                                            handlePreferenceChange(
                                              date.date,
                                              shift.id,
                                              "preferred",
                                            )
                                          }
                                          className={`w-8 h-8 rounded ${pref === "preferred" ? "bg-green-500" : "bg-gray-200 hover:bg-green-300"} transition-colors`}
                                          title="Preferred"
                                        />
                                        <button
                                          onClick={() =>
                                            handlePreferenceChange(
                                              date.date,
                                              shift.id,
                                              "available",
                                            )
                                          }
                                          className={`w-8 h-8 rounded ${pref === "available" ? "bg-blue-500" : "bg-gray-200 hover:bg-blue-300"} transition-colors`}
                                          title="Available"
                                        />
                                        <button
                                          onClick={() =>
                                            handlePreferenceChange(
                                              date.date,
                                              shift.id,
                                              "unavailable",
                                            )
                                          }
                                          className={`w-8 h-8 rounded ${pref === "unavailable" ? "bg-red-500" : "bg-gray-200 hover:bg-red-300"} transition-colors`}
                                          title="Unavailable"
                                        />
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-lg hover:from-red-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
                    >
                      {submitting ? "Submitting..." : "Submit Preferences"}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
