"use client";

import { ottoText } from "./otto-copy";
import Image from "next/image";
import { useId, useState } from "react";
import backgrounds from "./backgrounds.module.css";

const roles = [
  {
    id: "managers",
    photo: "/landing/otto/role-manager-tablet.webp",
    photoHeight: 799,
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
      "Would this shift swap break any union rules or safety guidelines?",
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
    photoHeight: 853,
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
  "max-w-[90%] justify-self-end",
  "mt-1.5 max-w-[94%] justify-self-start",
] as const;

const managerPromptOffsets = [
  "justify-self-start",
  "ml-3 justify-self-start",
  "ml-1 justify-self-start",
] as const;

const managerPromptLines = [
  ["Which departments are", "short-staffed next month?"],
  ["Show me how staff hours are", "distributed across departments."],
  ["Which shifts are missing", "the required skill mix?"],
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
  const hasPhoto = "photo" in activeRole;
  const promptOffsets = isStaff ? staffPromptOffsets : isCoordinator ? coordinatorPromptOffsets : managerPromptOffsets;

  return (
    <>
      <div
        role="group"
        aria-label={ottoText("Choose a rostering role", isUS)}
        className="mx-auto mt-6 grid w-full max-w-sm gap-1 rounded-2xl border border-[#D6E2F2] bg-[#E8EFF9] p-1 md:flex md:w-fit md:max-w-full md:rounded-full"
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
        className="mt-6 grid min-w-0 items-center gap-5 rounded-3xl border border-[#D6E2F2] bg-white p-4 sm:gap-6 sm:p-6 md:mt-8 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:gap-8 lg:p-8 xl:gap-12 xl:px-12"
      >
        <div aria-live="polite" className="grid">
          {roles.map((role) => (
            <div
              key={role.id}
              aria-hidden={role.id !== activeRole.id || undefined}
              className={`col-start-1 row-start-1 self-center ${role.id !== activeRole.id ? "invisible" : ""}`}
            >
              <h3 className="max-w-[28ch] text-pretty text-2xl font-semibold leading-tight tracking-tight text-[#1F2A5C] xl:text-3xl">
                {ottoText(role.title, isUS)}
              </h3>
              <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-gray-600 xl:mt-4 xl:text-lg">
                {ottoText(role.description, isUS)}
              </p>
            </div>
          ))}
        </div>
        <div
          className={`${backgrounds.rolePhoto} relative isolate grid min-w-0 overflow-hidden rounded-2xl border border-[#C9D9ED] ${
            isStaff ? backgrounds.staffPhoto : isCoordinator ? backgrounds.coordinatorPhoto : backgrounds.managerPhoto
          } ${hasPhoto ? "bg-[#E7EFF9]" : "bg-[#EDF3FB]"}`}
        >
          {isCoordinator && <div aria-hidden="true" className={backgrounds.coordinatorSizer} />}
          {hasPhoto && (
            <Image
              src={activeRole.photo}
              alt=""
              width={1280}
              height={activeRole.photoHeight}
              sizes="(min-width: 1400px) 650px, (min-width: 1280px) 580px, (min-width: 1024px) 480px, (min-width: 768px) 700px, (min-width: 640px) 550px, calc(100vw - 70px)"
              className={`${backgrounds.rolePhotoImage} block w-full`}
            />
          )}
          <ul
            aria-label={`Example questions ${ottoText(activeRole.label, isUS).toLowerCase()}`}
            className={`relative grid min-w-0 gap-2.5 px-3 py-4 ${
              hasPhoto
                ? backgrounds.rolePhotoPrompts
                : "w-full max-w-[29rem] self-center justify-self-end sm:w-[90%] sm:px-5"
            }`}
          >
            {activeRole.questions.map((question, index) => (
              <li
                key={ottoText(question, isUS)}
                className={`w-fit rounded-xl rounded-br-sm border border-white/80 bg-[#DDF6EF] px-2.5 py-2 text-xs font-medium leading-snug text-[#123832] shadow-sm shadow-[#123832]/20 sm:px-3.5 sm:text-sm ${promptOffsets[index]}`}
              >
                {activeRole.id === "managers" ? (
                  <>
                    {managerPromptLines[index][0]}{" "}<br />
                    {managerPromptLines[index][1]}
                  </>
                ) : question}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
