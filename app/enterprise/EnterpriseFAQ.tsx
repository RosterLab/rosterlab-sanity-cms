"use client";

import { useId, useState } from "react";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import { generateFAQSchema, FAQItem } from "@/lib/structured-data/faq-schema";
import { cn } from "@/lib/utils";

/**
 * FAQ list: large questions with a blue plus/minus badge, the open one lifted
 * onto a white card, and a soft hover card on the rest. Emits the same FAQ
 * schema as the shared FAQAccordion so search results keep the rich snippet.
 */
export default function EnterpriseFAQ({ items }: { items: FAQItem[] }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <ul className="space-y-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${id}-panel-${i}`;
          return (
            <li
              key={item.question}
              className={cn(
                "rounded-2xl transition-colors",
                isOpen ? "bg-white shadow-sm" : "hover:bg-white/70",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span className="text-lg md:text-xl font-medium text-[#1F2A5C] leading-snug">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                    isOpen
                      ? "bg-[#3B7FE8] text-white"
                      : "bg-[#C7D2FF]/60 text-[#2A3F8F]",
                  )}
                >
                  {isOpen ? (
                    <PiMinusBold aria-hidden="true" className="h-5 w-5" />
                  ) : (
                    <PiPlusBold aria-hidden="true" className="h-5 w-5" />
                  )}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                hidden={!isOpen}
                className="px-6 pb-6 -mt-1 text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </li>
          );
        })}
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(items)),
        }}
      />
    </>
  );
}
