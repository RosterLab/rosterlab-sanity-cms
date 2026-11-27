"use client";

import { ottoText } from "./otto-copy";
import Image from "next/image";
import { useId, useState } from "react";
import backgrounds from "./backgrounds.module.css";

const examples = [
  {
    label: "Fairness",
    question: "Who worked last Christmas?",
    answer: [
      "Last Christmas Day was covered by Zac, Daniel and Becca.",
      "Daniel and Becca are rostered again this Christmas Day.",
    ],
  },
  {
    label: "Fatigue",
    question: "Are there any fatigue risks next week?",
    answer: [
      "I found one short turnaround. Priya has eight hours between her Tuesday evening and Wednesday morning shifts.",
      "Your roster requires ten hours between shifts.",
    ],
  },
  {
    label: "Coverage",
    question: "Are there any gaps in overnight cover?",
    answer: [
      "Yes. Thursday’s overnight shift has two staff assigned and requires three.",
      "The other overnight shifts meet their staffing requirements.",
    ],
  },
] as const;

export default function OttoAnswerDemo({ isUS = false }: { isUS?: boolean }) {
  const [selected, setSelected] = useState<(typeof examples)[number]>(examples[0]);
  const responseId = useId();

  return (
    <div className={`${backgrounds.role} grid content-center gap-4 rounded-2xl p-3 sm:p-5 lg:min-h-[30rem] xl:p-7`}>
      <div
        role="group"
        aria-label="Example question topics"
        className="flex flex-wrap justify-center gap-2"
      >
        {examples.map((example) => (
          <button
            key={example.label}
            type="button"
            aria-pressed={selected.label === example.label}
            aria-controls={responseId}
            onClick={() => setSelected(example)}
            className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              selected.label === example.label
                ? "bg-[#1F2A5C] text-white"
                : "bg-white text-[#1F2A5C] hover:bg-blue-50"
            }`}
          >
            {example.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-[#1F2A5C]/10">
        <div className="border-b border-[#ECEEF0] px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-xl font-semibold leading-tight text-[#242B30]">Otto</p>
          <p className="mt-1 text-sm text-[#48515B]">{ottoText("Your AI rostering assistant", isUS)}</p>
        </div>
        <div id={responseId} aria-live="polite" aria-atomic="true" className="grid min-h-[17rem] content-start gap-3 p-4 sm:gap-4 sm:p-5">
          <p className={`${backgrounds.userMessage} ${backgrounds.userBubble}`}>
            {ottoText(selected.question, isUS)}
          </p>
          <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-end gap-2 sm:grid-cols-[2.25rem_minmax(0,1fr)] sm:gap-3">
            <Image
              src="/landing/otto/answer-mascot.webp"
              alt=""
              width={36}
              height={37}
              className="h-auto w-full object-contain"
            />
            <div className="grid gap-2.5">
              {selected.answer.map((message) => (
                <p key={ottoText(message, isUS)} className="w-fit rounded-2xl rounded-bl-sm bg-[#EEF0F2] px-4 py-3 text-sm leading-snug text-[#242B30] lg:text-base">
                  {message}
                </p>
              ))}
              <div
                aria-hidden="true"
                className="flex w-fit items-center gap-1 rounded-full rounded-bl-sm bg-[#EEF0F2] px-3 py-2.5"
              >
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className={`${backgrounds.typingDot} size-1.5 rounded-full bg-slate-500`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
