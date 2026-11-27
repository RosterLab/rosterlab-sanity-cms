"use client";

import { ottoText } from "./otto-copy";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PiBrain, PiPaperclip, PiPaperPlaneTiltBold } from "react-icons/pi";
import backgrounds from "./backgrounds.module.css";

const checks = ["Skills", "Availability", "Coverage", "Rest rules", "Hours"];

export default function OttoEvaluateDemo({ isUS = false }: { isUS?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`${backgrounds.evaluate} grid isolate overflow-hidden rounded-2xl p-3 lg:aspect-[4/3] xl:p-5`}>
      <picture className="col-start-1 row-start-1 block w-full self-start overflow-hidden rounded-xl border border-[#315B53]/60 shadow-md shadow-[#163F37]/25 sm:w-[92%]">
        <source
          srcSet="/landing/otto/evaluate-roster-768.webp 768w, /landing/otto/evaluate-roster-1440.webp 1440w"
          sizes="(min-width: 1400px) 650px, (min-width: 768px) 51vw, 90vw"
        />
        <Image
          src="/landing/otto/evaluate-roster-768.webp"
          alt={ottoText("Weekly roster showing AM, PM and Night allocations by day.", isUS)}
          width={768}
          height={543}
          unoptimized
          className="block h-auto w-full"
        />
      </picture>

      <div className="z-10 col-start-1 row-start-1 mt-[20%] w-[96%] self-end justify-self-end overflow-hidden rounded-xl border border-[#B8CEC7] bg-white shadow-lg shadow-[#163F37]/20 sm:mt-[16%] sm:w-[87%] xl:w-[84%]">
        <div className="grid gap-3.5 px-3 pb-4 pt-6 sm:px-4 lg:gap-5 lg:pb-5 lg:pt-9">
          <p className={`${backgrounds.userMessage} ${backgrounds.userBubble}`}>
            Who can cover Friday night?
          </p>
          <motion.ul
            aria-label="Checks completed by Otto"
            className="flex flex-wrap gap-x-3 gap-y-1 pl-8 text-xs font-medium leading-snug text-blue-700 lg:pl-9"
            initial={reduceMotion ? false : "pending"}
            whileInView="complete"
            viewport={{ amount: 0.4 }}
          >
            {checks.map((check, index) => (
              <li key={check} className="inline-flex items-center gap-1">
                {check}
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3 shrink-0 text-[#3B7FE8]">
                  <motion.path
                    d="m3 8 3 3 7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                      pending: {
                        pathLength: reduceMotion ? 1 : 0,
                        opacity: reduceMotion ? 1 : 0,
                        transition: { duration: 0 },
                      },
                      complete: reduceMotion
                        ? { pathLength: 1, opacity: 1 }
                        : {
                            pathLength: [0, 1, 1],
                            opacity: [0, 1, 1],
                            transition: {
                              duration: 3,
                              times: [0, 0.12, 1],
                              delay: index * 0.12,
                              repeat: Infinity,
                              ease: "easeOut",
                            },
                          },
                    }}
                  />
                </svg>
              </li>
            ))}
          </motion.ul>
          <div className="flex items-end gap-2">
            <Image
              src="/landing/otto/answer-mascot.webp"
              alt=""
              width={28}
              height={29}
              className="h-auto w-6 shrink-0 lg:w-7"
            />
            <div className="grid min-w-0 gap-2.5 text-sm leading-snug text-[#242B30] lg:text-base">
              <p className="w-fit rounded-2xl rounded-bl-sm bg-[#EEF0F2] px-3 py-2 lg:px-4">
                <strong>Sunny is the best fit</strong> for Friday night and can cover without overtime.
              </p>
              <p className="w-fit rounded-2xl rounded-bl-sm bg-[#EEF0F2] px-3 py-2 lg:px-4">
                Marcus is available but would need overtime.
              </p>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="mx-3 mb-4 mt-4 flex items-center gap-1.5 rounded-lg border border-[#D6DDE5] px-2 py-1.5 sm:mx-4 sm:gap-2">
          <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-[#DCE2EA] bg-[#F5F7FA] px-1.5 py-0.5 text-[11px] font-medium leading-tight text-slate-600">
            <PiBrain className="hidden size-3 sm:block" /> Deep Think
          </span>
          <p className="min-w-0 flex-1 truncate text-xs text-slate-500">
            Ask a follow-up…
          </p>
          <PiPaperclip className="size-3.5 shrink-0 text-slate-500" />
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-r from-[#179ABA] to-[#24BDA9] text-white">
            <PiPaperPlaneTiltBold className="size-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
