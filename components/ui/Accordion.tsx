"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

// Simple Markdown-like formatter for accordion content
function formatContent(text: string) {
  // Split by lines
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Empty line - add spacing
    if (line.trim() === "") {
      elements.push(<br key={`br-${key++}`} />);
      continue;
    }

    // Bullet point with bold
    if (line.trim().startsWith("• **") || line.trim().startsWith("- **")) {
      const content = line.replace(/^[•-]\s*/, "");
      elements.push(
        <li key={`li-${key++}`} className="ml-4">
          {formatInlineContent(content)}
        </li>,
      );
      continue;
    }

    // Regular bullet point
    if (line.trim().startsWith("• ") || line.trim().startsWith("- ")) {
      const content = line.replace(/^[•-]\s*/, "");
      elements.push(
        <li key={`li-${key++}`} className="ml-4">
          {formatInlineContent(content)}
        </li>,
      );
      continue;
    }

    // Heading (starts with **)
    if (line.trim().startsWith("**") && line.trim().endsWith("**")) {
      const content = line.trim().replace(/^\*\*/, "").replace(/\*\*$/, "");
      elements.push(
        <p
          key={`heading-${key++}`}
          className="font-bold text-neutral-900 mt-4 mb-2"
        >
          {content}
        </p>,
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${key++}`} className="mb-2">
        {formatInlineContent(line)}
      </p>,
    );
  }

  return <div className="space-y-1">{elements}</div>;
}

// Format inline content (bold, etc)
function formatInlineContent(text: string) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Find next bold marker
    const boldStart = remaining.indexOf("**");

    if (boldStart === -1) {
      // No more bold, add rest as plain text
      parts.push(remaining);
      break;
    }

    // Add text before bold
    if (boldStart > 0) {
      parts.push(remaining.substring(0, boldStart));
    }

    // Find end of bold
    const boldEnd = remaining.indexOf("**", boldStart + 2);

    if (boldEnd === -1) {
      // No closing **, treat as plain text
      parts.push(remaining.substring(boldStart));
      break;
    }

    // Add bold text
    const boldText = remaining.substring(boldStart + 2, boldEnd);
    parts.push(
      <strong key={`bold-${key++}`} className="font-semibold text-neutral-900">
        {boldText}
      </strong>,
    );

    // Continue with remaining text
    remaining = remaining.substring(boldEnd + 2);
  }

  return <>{parts}</>;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isOpen = (id: string) => openIds.has(id);

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200"
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
            aria-expanded={isOpen(item.id)}
            aria-controls={`accordion-content-${item.id}`}
          >
            <span className="font-semibold text-neutral-900 text-lg pr-4">
              {item.title}
            </span>
            <HiChevronDown
              className={`h-5 w-5 text-neutral-500 flex-shrink-0 transition-transform duration-200 ${
                isOpen(item.id) ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {/* Accordion Content */}
          <div
            id={`accordion-content-${item.id}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen(item.id)
                ? "max-h-[2000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-4 text-neutral-700 border-t border-neutral-200">
              {typeof item.content === "string"
                ? formatContent(item.content)
                : item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
