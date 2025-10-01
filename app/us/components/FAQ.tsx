'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import { generateFAQSchema } from '@/lib/structured-data/faq-schema'

const faqs = [
  {
    question: "What is a staff scheduling software?",
    answer: "Staff scheduling software is a digital tool that helps managers create, manage, and optimize work schedules for their teams. It automates the complex process of assigning shifts, managing time-off requests, ensuring adequate coverage, and maintaining compliance with labor laws and organizational policies. RosterLab's AI-powered scheduling software goes beyond basic scheduling by using advanced algorithms to create fair, balanced schedules that meet both business needs and employee preferences."
  },
  {
    question: "Can I really use AI to schedule my staff?",
    answer: "Yes, absolutely! AI has revolutionized staff scheduling by analyzing patterns, predicting needs, and optimizing schedules in ways that would take humans hours or days to accomplish. RosterLab's AI considers multiple factors simultaneously - staff availability, skills, preferences, compliance requirements, and coverage needs - to generate optimal schedules in minutes. Our AI learns from your scheduling patterns and continuously improves, making smarter recommendations over time while ensuring fairness and compliance."
  },
  {
    question: "How does staff scheduling software work?",
    answer: "Staff scheduling software works by digitizing and automating the scheduling process. With RosterLab, you start by setting up your scheduling rules, staff profiles, and coverage requirements. Employees can submit their availability and preferences through our mobile app. Our AI then processes all this information to generate an optimized schedule that balances business needs with staff preferences. The software handles shift swaps, manages time-off requests, and ensures compliance automatically. Schedules are instantly shared with staff through the mobile app, and any changes are communicated in real-time."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  // Generate FAQ schema
  const faqSchema = generateFAQSchema(faqs)

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-600">
              Get answers to common questions about AI-powered staff scheduling
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-neutral-500 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`px-6 pb-4 text-neutral-600 transition-all ${
                    openIndex === index ? 'block' : 'hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}