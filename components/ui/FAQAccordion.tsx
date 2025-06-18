'use client'

import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-semibold text-gray-900 pr-4">
              {item.question}
            </span>
            <HiChevronDown
              className={cn(
                "w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200",
                openIndex === index && "transform rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "px-6 overflow-hidden transition-all duration-200",
              openIndex === index ? "py-4 pb-6" : "max-h-0"
            )}
          >
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.answer }} />
          </div>
        </div>
      ))}
    </div>
  )
}