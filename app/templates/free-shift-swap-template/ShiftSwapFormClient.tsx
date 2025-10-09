"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { HiCheck, HiDownload } from "react-icons/hi";
import { trackButtonClick } from "@/components/analytics/Segment";
import HubSpotFormListener from "@/components/analytics/HubSpotFormListener";

// Download function
const downloadShiftSwapFile = () => {
  // Track download
  trackButtonClick("Download Shift Swap Template", "Shift Swap Template Page", {
    form_type: "shift_swap_download",
    download_type: "automatic",
  });

  // Create a temporary link to download the file
  const link = document.createElement("a");
  link.href =
    "/images/shift-swap/Shift-Swap-Request-Form-Template-RosterLab.docx";
  link.download = "Shift-Swap-Request-Form-Template-RosterLab.docx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Add HubSpot type declaration
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          onFormSubmitted?: (formData: any) => void;
        }) => void;
      };
    };
  }
}

export default function ShiftSwapFormClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load HubSpot form on component mount
  useEffect(() => {
    // Check if HubSpot is already loaded
    try {
      if (window.hbspt && window.hbspt.forms) {
        window.hbspt.forms.create({
          portalId: "20646833",
          formId: "af8acfa7-f7fc-4da6-8d08-1c3f2458fb5e",
          region: "na1",
          target: "#hubspot-form-container",
          onFormSubmitted: () => {
            // Download the shift swap file
            downloadShiftSwapFile();

            // Update UI to show success
            setIsSubmitted(true);
          },
        });
        return;
      }
    } catch (error) {
      return;
    }

    // Load HubSpot script if not already loaded
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.defer = true;

    script.onload = () => {
      if (window.hbspt && window.hbspt.forms) {
        window.hbspt.forms.create({
          portalId: "20646833",
          formId: "af8acfa7-f7fc-4da6-8d08-1c3f2458fb5e",
          region: "na1",
          target: "#hubspot-form-container",
          onFormSubmitted: () => {
            // Download the shift swap file
            downloadShiftSwapFile();

            // Update UI to show success
            setIsSubmitted(true);
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {!isSubmitted ? (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Get Your Free Template
          </h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below to download your shift swap request template
          </p>

          {/* HubSpot Form Container */}
          <div id="hubspot-form-container" className="mb-4">
            <div className="text-center py-8">
              <p className="text-gray-600">Loading form...</p>
            </div>
          </div>
          <HubSpotFormListener />
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
              downloadShiftSwapFile();
              trackButtonClick("Manual Download", "Shift Swap Template Page", {
                download_type: "manual",
              });
            }}
          >
            <HiDownload className="w-5 h-5 mr-2" />
            Download Template
          </button>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Ready to digitise your shift swap process?
            </p>
            <Button
              href="/book-a-demo"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              See Digital Shift Swaps in Action
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
