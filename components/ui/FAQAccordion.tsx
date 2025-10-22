"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { generateFAQSchema, FAQItem } from "@/lib/structured-data/faq-schema";

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generate FAQ schema
  const faqSchema = generateFAQSchema(items);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const totalItems = items.length;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIndex = (index + 1) % totalItems;
        document.getElementById(`faq-button-${nextIndex}`)?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex = (index - 1 + totalItems) % totalItems;
        document.getElementById(`faq-button-${prevIndex}`)?.focus();
        break;
      case "Home":
        e.preventDefault();
        document.getElementById(`faq-button-0`)?.focus();
        break;
      case "End":
        e.preventDefault();
        document.getElementById(`faq-button-${totalItems - 1}`)?.focus();
        break;
    }
  };

  return (
    <>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            style={{ contain: "layout" }}
          >
            <button
              id={`faq-button-${index}`}
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-t-lg"
              aria-expanded={openIndex === index}
              aria-controls={`faq-panel-${index}`}
            >
              <span className="text-lg font-semibold text-gray-900 pr-4">
                {item.question}
              </span>
              <HiChevronDown
                className={cn(
                  "w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200",
                  openIndex === index && "transform rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-button-${index}`}
              className="overflow-hidden"
              style={{
                maxHeight: openIndex === index ? "300px" : "0",
                transition: "max-height 0.2s ease-in-out",
                willChange: openIndex === index ? "max-height" : "auto",
              }}
            >
              <div className="px-6 py-4 pb-6">
                <p
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
