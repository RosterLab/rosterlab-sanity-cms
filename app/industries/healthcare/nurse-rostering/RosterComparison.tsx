"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PiCheckCircleFill } from "react-icons/pi";
import { cn } from "@/lib/utils";

export interface ComparisonRow {
  task: string;
  manual: string;
  rosterlab: string;
}

const RL_HEADING = "RosterLab";
const EXCEL_NAME = "Excel";
/** Default labels (AU wording); the US page passes its own. */
const LABELS = {
  task: "Rostering task",
  manualNote: "(Manual rostering)",
};
export type ComparisonLabels = typeof LABELS;

/** Each side's colour: RosterLab in brand blue, Excel in grey. */
const RL_BLUE = "#2563C9";
const EXCEL_GREY = "#6B7280";

/**
 * The Microsoft Excel mark (2013 design), drawn in one flat colour: the
 * cover with its X, and the gridded sheet behind it.
 */
function ExcelLogo({ className }: { className?: string }) {
  // Two columns by six rows of cells on the sheet.
  const cells = [0, 1, 2, 3, 4, 5].flatMap((r) =>
    [0, 1].map((c) => ({ x: 62 + c * 16, y: 22 + r * 10 })),
  );
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect
        x="52"
        y="15"
        width="43"
        height="70"
        rx="2"
        fill="none"
        stroke={EXCEL_GREY}
        strokeWidth="4"
      />
      {cells.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          width="13"
          height="7"
          fill={EXCEL_GREY}
        />
      ))}
      <path d="M4 15 L58 4 V96 L4 85 Z" fill={EXCEL_GREY} />
      <path
        d="M15 31h9.5l6.5 12 6.5-12H47L36 50l11 19h-9.5L31 57l-6.5 12H15l11-19z"
        fill="#fff"
      />
    </svg>
  );
}

/**
 * The full Excel logo (mark and wordmark) with "(Manual rostering)" set
 * small beneath it. Screen readers get the same words as plain text.
 */
function ExcelLockup({
  size,
  manualNote,
}: {
  size: "sm" | "lg";
  manualNote: string;
}) {
  const lg = size === "lg";
  return (
    <span className="inline-flex flex-col items-start">
      <span className="sr-only">
        {EXCEL_NAME} {manualNote}
      </span>
      <span
        aria-hidden="true"
        className={cn("flex items-center gap-2", lg ? "h-9" : "h-6")}
      >
        <ExcelLogo className={cn("shrink-0", lg ? "h-9 w-9" : "h-6 w-6")} />
        <span
          className={cn(
            "font-['Segoe_UI',system-ui,sans-serif] font-normal leading-none tracking-tight text-gray-500",
            lg ? "text-[1.75rem]" : "text-xl",
          )}
        >
          {EXCEL_NAME}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "mt-1.5 font-medium text-gray-500",
          lg ? "text-sm" : "text-xs",
        )}
      >
        {manualNote}
      </span>
    </span>
  );
}

/**
 * The RosterLab logo in flat brand blue. The PNG is used as a mask over a
 * solid fill, the same way the logo wall recolours its marks.
 */
function RosterLabLogo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        backgroundColor: RL_BLUE,
        maskImage: "url(/images/rosterlab-logo.png)",
        WebkitMaskImage: "url(/images/rosterlab-logo.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "left center",
        WebkitMaskPosition: "left center",
      }}
      className={cn("block aspect-[501/125]", className)}
    />
  );
}

/* -------------------------------------------------------------- motion */

const EASE = [0.22, 1, 0.36, 1] as const;
/** When each row starts, in seconds after the table comes into view. */
const rowDelay = (i: number) => 0.45 + i * 0.18;

/** RosterLab's column runs as one continuous tinted band. */
const RL_BAND = "lg:bg-[#EAF1FD]";

/**
 * Manual planning in Excel against RosterLab, as a side-by-side table.
 *
 * One white panel with a divider between rows. RosterLab's column is tinted
 * from header to last row so the eye lands there first; the Excel column is
 * left plain and muted. On phones and tablets each row becomes its own card, with the
 * RosterLab answer in a tinted block and a small visible label on each
 * answer, hidden from screen readers since the table headers already give
 * that association.
 *
 * It plays once on entering the view: the blue bar draws across the top of
 * RosterLab's column, the headings fade in, the rows rise in turn and each
 * tick pops in once its row has landed. Under reduced motion it starts in
 * its finished state.
 */
export default function RosterComparison({
  rows,
  labels = LABELS,
}: {
  rows: ComparisonRow[];
  labels?: ComparisonLabels;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = !!useReducedMotion();
  const on = inView || reduce;
  const instant = reduce ? { duration: 0 } : undefined;

  /** Content that rises into place, `delay` seconds after entry. */
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: on ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: instant ?? { duration: 0.55, ease: EASE, delay },
  });

  return (
    <div
      ref={ref}
      className="lg:overflow-hidden lg:rounded-3xl lg:bg-white lg:shadow-[0_10px_40px_rgba(31,42,92,0.08)] lg:ring-1 lg:ring-[#1F2A5C]/10"
    >
      <table className="block w-full lg:table lg:table-fixed lg:border-collapse">
        <colgroup className="hidden lg:table-column-group">
          <col className="lg:w-[28%]" />
          <col className="lg:w-[38%]" />
          <col className="lg:w-[34%]" />
        </colgroup>
        <thead className="sr-only lg:not-sr-only lg:table-header-group">
          <tr className="border-b border-[#1F2A5C]/10">
            <th scope="col" className="px-8 py-7 text-left align-top">
              {/* No visible label over the task column; screen readers
                  still get one for the column. */}
              <span className="sr-only">{labels.task}</span>
            </th>
            <th
              scope="col"
              className={cn(RL_BAND, "relative px-8 py-7 text-left align-top")}
            >
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: on ? 1 : 0 }}
                transition={instant ?? { duration: 0.7, ease: EASE }}
                className="absolute inset-x-0 top-0 h-1 origin-left bg-[#2563C9]"
              />
              <span className="sr-only">{RL_HEADING}</span>
              <motion.span className="block" {...rise(0.15)}>
                <RosterLabLogo className="h-9" />
              </motion.span>
            </th>
            <th
              scope="col"
              className="px-8 py-7 text-left align-top font-normal"
            >
              <motion.span className="block" {...rise(0.25)}>
                <ExcelLockup size="lg" manualNote={labels.manualNote} />
              </motion.span>
            </th>
          </tr>
        </thead>
        <tbody className="block space-y-4 lg:table-row-group lg:space-y-0">
          {rows.map((row, i) => (
            <tr
              key={row.task}
              className="block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#1F2A5C]/10 lg:table-row lg:overflow-visible lg:rounded-none lg:bg-transparent lg:shadow-none lg:ring-0 lg:[&:not(:last-child)]:border-b lg:border-[#1F2A5C]/10"
            >
              <th
                scope="row"
                className="block px-6 pb-4 pt-6 text-left text-xl font-semibold leading-snug text-[#1F2A5C] lg:table-cell lg:px-8 lg:py-8 lg:align-top lg:text-[1.375rem]"
              >
                <motion.span className="block" {...rise(rowDelay(i))}>
                  {row.task}
                </motion.span>
              </th>
              <td
                className={cn(
                  RL_BAND,
                  "mx-4 block rounded-xl bg-[#EAF1FD] p-4 lg:mx-0 lg:table-cell lg:rounded-none lg:px-8 lg:py-8 lg:align-top",
                )}
              >
                <motion.span className="block" {...rise(rowDelay(i) + 0.06)}>
                  <span aria-hidden="true" className="mb-3 block lg:hidden">
                    <RosterLabLogo className="h-6" />
                  </span>
                  <span className="flex gap-3">
                    <motion.span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      initial={reduce ? false : { scale: 0, opacity: 0 }}
                      animate={
                        on ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                      }
                      transition={
                        instant ?? {
                          type: "spring",
                          stiffness: 420,
                          damping: 16,
                          delay: rowDelay(i) + 0.4,
                        }
                      }
                    >
                      <PiCheckCircleFill className="h-6 w-6 text-[#2563C9]" />
                    </motion.span>
                    <span className="text-base font-semibold leading-relaxed text-[#1E4FB0] lg:text-lg">
                      {row.rosterlab}
                    </span>
                  </span>
                </motion.span>
              </td>
              <td className="block px-6 pb-6 pt-5 lg:table-cell lg:px-8 lg:py-8 lg:align-top">
                <motion.span className="block" {...rise(rowDelay(i) + 0.12)}>
                  <span aria-hidden="true" className="mb-3 block lg:hidden">
                    <ExcelLockup size="sm" manualNote={labels.manualNote} />
                  </span>
                  <span className="text-base leading-relaxed text-gray-500 lg:text-lg">
                    {row.manual}
                  </span>
                </motion.span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
