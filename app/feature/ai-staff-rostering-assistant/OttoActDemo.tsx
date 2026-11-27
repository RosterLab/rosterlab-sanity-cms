import { ottoText } from "./otto-copy";
import Image from "next/image";
import {
  PiFileXls,
  PiPaperPlaneTiltBold,
} from "react-icons/pi";
import backgrounds from "./backgrounds.module.css";

export default function OttoActDemo({ isUS = false }: { isUS?: boolean }) {
  return (
    <div className={`${backgrounds.act} grid isolate items-center overflow-hidden rounded-2xl p-4 sm:p-5 lg:aspect-[4/3] xl:p-7`}>
      <div className="relative col-start-1 row-start-1 w-full self-start overflow-hidden rounded-xl border border-[#A9C4C9] bg-white shadow-sm sm:w-[83%] [container-type:inline-size]">
        <Image
          src="/landing/otto/act-employees.webp"
          alt="RosterLab’s Employees screen, showing staff names and their skills."
          width={900}
          height={623}
          unoptimized
          className="block h-auto w-full"
        />
        <div aria-hidden="true" className={backgrounds.employeeSelection} />
      </div>

      <div className="z-10 col-start-1 row-start-1 mt-[34%] w-[94%] self-end justify-self-end overflow-hidden rounded-2xl border border-[#D6DDE5] bg-[#F6F8FA] shadow-xl shadow-slate-900/15 sm:mt-[16%] sm:w-[64%]">
        <div className="px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-xl font-semibold leading-tight text-[#242B30]">Otto</p>
          <p className="mt-1 text-sm text-[#48515B]">{ottoText("Your AI rostering assistant", isUS)}</p>
        </div>

        <div className="mx-3 mb-3 rounded-xl border border-[#96B8F4] bg-white p-3 ring-2 ring-[#E1EBFE] sm:mx-4 sm:mb-4 lg:p-4">
          <div className="inline-flex max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-800">
            <PiFileXls aria-hidden="true" className="size-4 shrink-0 text-[#176447]" />
            <span className="min-w-0 break-words">{ottoText("New starters - Nov.xlsx", isUS)}</span>
          </div>
          <p className={`${backgrounds.userMessage} mt-3 text-[#242B30]`}>
            {ottoText("Can you add the new starters from this spreadsheet?", isUS)}
          </p>
          <div aria-hidden="true" className="mt-2 flex justify-end">
            <span className="grid size-7 place-items-center rounded-full bg-[#168B92] text-white">
              <PiPaperPlaneTiltBold className="size-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
