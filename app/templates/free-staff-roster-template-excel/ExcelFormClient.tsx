"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { HiCheck, HiDownload } from "react-icons/hi";
import { trackButtonClick } from "@/components/analytics/tracking";
import LeadCaptureForm from "@/components/forms/LeadCaptureForm";

// Download function
const downloadExcelFile = () => {
  // Track download
  trackButtonClick("Download Excel Template", "Excel Template Page", {
    form_type: "excel_download",
    download_type: "automatic",
  });

  // Create a temporary link to download the file
  const link = document.createElement("a");
  link.href = "/images/excel/RosterLab-Free-Excel-Template.xlsx";
  link.download = "RosterLab-Free-Excel-Template.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function ExcelFormClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {!isSubmitted ? (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Get Your Free Template
          </h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below to download your Excel roster template
          </p>

          <LeadCaptureForm
            source="template-excel"
            submitLabel="Download template"
            onSuccess={() => {
              downloadExcelFile();
              setIsSubmitted(true);
            }}
          />
        </>
      ) : (
        <div className="text-center py-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiCheck className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your download should start automatically. If not, click the button
            below.
          </p>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              downloadExcelFile();
              trackButtonClick("Manual Download", "Excel Template Page", {
                download_type: "manual",
              });
            }}
          >
            <HiDownload className="w-5 h-5 mr-2" />
            Download Template
          </button>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Ready to automate your rostering completely?
            </p>
            <Button
              href="/book-a-demo"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              See RosterLab in Action
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
