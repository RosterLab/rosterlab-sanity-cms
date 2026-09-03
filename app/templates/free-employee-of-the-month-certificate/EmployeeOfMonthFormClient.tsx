"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { HiCheck, HiExternalLink } from "react-icons/hi";
import { trackButtonClick } from "@/components/analytics/tracking";
import LeadCaptureForm from "@/components/forms/LeadCaptureForm";

export default function EmployeeOfMonthFormClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {!isSubmitted ? (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Get Your Free Template
          </h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below to access your editable Canva certificate
            template
          </p>

          <LeadCaptureForm
            source="template-employee-of-month"
            submitLabel="Access Canva template"
            onSuccess={() => {
              trackButtonClick(
                "Employee of the Month Form Submitted",
                "Employee of the Month Template Page",
                { form_type: "employee_of_month_certificate" },
              );
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
            Your Employee of the Month certificate template is ready to edit in
            Canva. Click the button below to get started.
          </p>
          <a
            href="https://www.canva.com/design/DAG-bib9uLc/m8vuIMjLGlat_om5x8hXeQ/view?utm_content=DAG-bib9uLc&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              trackButtonClick(
                "Open Canva Template",
                "Employee of the Month Template Page",
                {
                  template_type: "employee_of_month",
                  click_type: "primary",
                },
              );
            }}
          >
            <HiExternalLink className="w-5 h-5" />
            Edit Template in Canva
          </a>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Want to automate employee recognition?
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
