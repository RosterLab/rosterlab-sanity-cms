"use client";

import { ottoText } from "./otto-copy";
import Image from "next/image";
import { useId, useState } from "react";

const roles = [
  {
    id: "managers",
    questions: [
      "Which departments are short-staffed next month?",
      "Show me how staff hours are distributed across departments.",
      "Which shifts are missing the required skill mix?",
    ],
    label: "For Managers",
    title: "Make smarter decisions, backed by roster data",
    description:
      "Get a clear picture of staffing, skill mix, workload distribution and compliance across departments, with the insights to make better use of your workforce.",
  },
  {
    id: "team-leads",
    questions: [
      "Who can cover Saturday night without overtime?",
      "Would this shift swap breach any fatigue or EBA rules?",
      "Show me what’s changed since the roster was published.",
    ],
    label: "For Team Leads / Roster Coordinators",
    title: "Expert rostering guidance, whenever you need it",
    description:
      "Otto helps roster coordinators build safe and fair rosters faster, without needing to remember every rule. Even when rostering responsibilities change hands, the knowledge isn't lost.",
  },
  {
    id: "staff",
    photo: "/landing/otto/role-staff-wide.webp",
    photoWidth: 1440,
    photoHeight: 960,
    questions: [
      "When is my next night shift?",
      "How much annual leave have I taken this year?",
      "Update my preference to work mornings on Fridays.",
    ],
    label: "For Staff",
    title: "An easier way to manage your work schedule",
    description:
      "Staff can use Otto to find out when they’re working, check leave and update shift preferences anytime, from anywhere.",
  },
] as const;

const staffPromptOffsets = [
  "ml-2 max-w-full sm:ml-4",
  "max-w-[90%] translate-x-2 justify-self-end sm:translate-x-4 lg:translate-x-6",
  "mt-1.5 max-w-[94%] justify-self-start",
] as const;

const managerPromptOffsets = [
  "max-w-[88%] justify-self-start",
  "max-w-[91%] justify-self-end",
  "ml-2 mt-1 max-w-[87%] justify-self-start sm:ml-5",
] as const;

const coordinatorPromptOffsets = [
  "max-w-[84%] justify-self-end",
  "max-w-[88%] justify-self-start",
  "mr-2 mt-1 max-w-[90%] justify-self-end sm:mr-6",
] as const;

export default function RoleTabsModule({ isUS = false }: { isUS?: boolean }) {
  const [activeRole, setActiveRole] = useState<(typeof roles)[number]>(roles[0]);
  const panelId = useId();
  const isStaff = activeRole.id === "staff";
  const isCoordinator = activeRole.id === "team-leads";
  const promptOffsets = isStaff ? staffPromptOffsets : isCoordinator ? coordinatorPromptOffsets : managerPromptOffsets;

  return (
    <>
      <div
        role="group"
        aria-label={ottoText("Choose a rostering role", isUS)}
        className="mx-auto mt-6 grid w-fit max-w-full gap-1 rounded-2xl border border-[#D6E2F2] bg-[#E8EFF9] p-1 md:flex md:rounded-full"
      >
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            aria-pressed={activeRole.id === role.id}
            aria-controls={panelId}
            onClick={() => setActiveRole(role)}
            className={`min-h-11 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 md:rounded-full md:px-6 ${
              activeRole.id === role.id
                ? "bg-[#1F2A5C] text-white"
                : "text-[#1F2A5C] hover:bg-white/75"
            }`}
          >
            {ottoText(role.label, isUS)}
          </button>
        ))}
      </div>

      <div
        id={panelId}
        className="mt-6 grid items-center gap-6 rounded-3xl border border-[#D6E2F2] bg-white p-6 sm:p-8 md:mt-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 lg:px-12 lg:py-8"
      >
        <div aria-live="polite">
          <h3 className="max-w-md text-balance text-2xl font-semibold leading-tight tracking-tight text-[#1F2A5C] md:text-3xl">
            {ottoText(activeRole.title, isUS)}
          </h3>
          <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-gray-600 md:text-lg">
            {ottoText(activeRole.description, isUS)}
          </p>
        </div>
        <div
          className={`relative isolate grid min-h-56 overflow-hidden rounded-2xl border border-[#C9D9ED] ${
            isStaff ? "items-center bg-[#E7EFF9]" : "bg-[#EDF3FB] sm:aspect-[3/2]"
          }`}
        >
          {isStaff && (
            <Image
              src={activeRole.photo}
              alt=""
              width={activeRole.photoWidth}
              height={activeRole.photoHeight}
              sizes="(min-width: 1400px) 715px, (min-width: 768px) 55vw, 90vw"
              className="col-start-1 row-start-1 block h-auto w-full self-stretch object-cover object-[60%_center]"
            />
          )}
          <ul
            aria-label={`Example questions ${ottoText(activeRole.label, isUS).toLowerCase()}`}
            className={`relative col-start-1 row-start-1 grid py-4 ${
              isStaff
                ? "w-[58%] translate-y-2 self-center gap-2.5 px-2.5 sm:w-[54%] sm:gap-3 sm:px-4 lg:translate-y-4 xl:px-6"
                : isCoordinator
                  ? "w-full max-w-[26rem] translate-y-2 self-center justify-self-end gap-3 px-4 sm:w-[83%] sm:px-6"
                  : "w-full max-w-[26rem] self-end gap-2.5 px-4 sm:w-[82%] sm:px-6 sm:pb-7"
            }`}
          >
            {activeRole.questions.map((question, index) => (
              <li
                key={ottoText(question, isUS)}
                className={`w-fit rounded-xl rounded-br-sm border py-2 font-medium leading-snug shadow-sm ${
                  isStaff
                    ? "border-white/80 bg-[#DDF6EF] px-2.5 text-xs text-[#123832] shadow-[#123832]/20 sm:px-3.5 sm:text-sm lg:px-4 lg:py-2.5 lg:text-base"
                    : "border-[#C9DCEF] bg-[#F8FBFF] px-3.5 text-sm text-[#192F4A] shadow-[#192F4A]/15 lg:px-4 lg:py-2.5 lg:text-base"
                } ${promptOffsets[index]}`}
              >
                {question}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
