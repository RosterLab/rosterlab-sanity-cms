"use client";

import { useState } from "react";
import Image from "next/image";

const messagesByCategory = {
  "No split weekends": [
    {
      question: "Can you ensure no one works split weekends?",
      answer:
        "I've enabled the no split weekends rule. Staff will now only be assigned complete weekends (both Saturday and Sunday) or none at all. This helps maintain work-life balance.",
    },
    {
      question: "Why is this weekend pattern flagged?",
      answer:
        "This creates a split weekend - working only one day of the weekend. I recommend assigning both days or neither to maintain the no split weekends policy.",
    },
  ],
  "Only split weekends": [
    {
      question: "Can we set up only split weekend shifts?",
      answer:
        "I've configured the roster to allow only split weekends. Staff will be assigned either Saturday or Sunday, but not both together. This maximizes weekend coverage.",
    },
    {
      question: "How do split weekends help with staffing?",
      answer:
        "Split weekends allow more staff to have at least one weekend day off while maintaining coverage. This can improve satisfaction and work-life balance across the team.",
    },
  ],
  "Leave shouldn't have hours": [
    {
      question: "Why are leave days showing hours?",
      answer:
        "Leave days shouldn't count towards worked hours. I've adjusted the settings so leave is now tracked separately and won't affect overtime calculations or hour limits.",
    },
    {
      question: "How should leave be handled in the roster?",
      answer:
        "Leave should be marked without hours attached. This ensures accurate tracking of actual worked hours and prevents leave from triggering overtime or fatigue warnings.",
    },
  ],
  "Fair night shifts": [
    {
      question: "How can I distribute night shifts fairly?",
      answer:
        "I'll monitor night shift distribution and alert you when there's an imbalance. Currently tracking shows Dr. Martinez has 8 night shifts this month, while Dr. Chen has only 3.",
    },
    {
      question: "Are night shifts being distributed evenly?",
      answer:
        "I've analyzed the roster and found uneven night shift distribution. I recommend rotating night shifts more evenly to prevent burnout and ensure fairness across the team.",
    },
  ],
  "Fair weekends": [
    {
      question: "How can I ensure fair weekend distribution?",
      answer:
        "I'm tracking weekend shifts and will alert you to imbalances. Enable weekend fairness rules in Settings to automatically flag when someone works more than their fair share.",
    },
    {
      question: "Who has worked the most weekends this month?",
      answer:
        "Dr. Johnson has worked 4 weekends this month, while Dr. Lee has worked only 1. I recommend balancing this out in the next roster cycle to maintain fairness.",
    },
  ],
  "Unbalanced staffing": [
    {
      question: "Are there any staffing imbalances I should know about?",
      answer:
        "I've detected imbalances: Night shifts have a 40% variance in distribution, and weekend coverage shows Dr. Martinez working 3x more than average. I recommend rebalancing.",
    },
    {
      question: "How do I fix unbalanced staffing?",
      answer:
        "I've identified staff with significantly more hours than others. Try redistributing shifts from over-scheduled staff to under-utilized team members to create better balance.",
    },
  ],
};

export default function OttoStaticChatFeature1() {
  const [selectedCategory, setSelectedCategory] = useState<
    keyof typeof messagesByCategory | ""
  >("");

  const messages = selectedCategory ? messagesByCategory[selectedCategory] : [];

  return (
    <div className="w-full max-w-[550px] mx-auto bg-white rounded-lg shadow-xl p-6 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden">
          <Image
            src="/images/ottopus.png"
            alt="Otto"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">Otto</h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value as keyof typeof messagesByCategory | "",
              )
            }
            className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">AI Shortcuts:</option>
            <option value="No split weekends">No split weekends</option>
            <option value="Only split weekends">Only split weekends</option>
            <option value="Leave shouldn't have hours">
              Leave shouldn't have hours
            </option>
            <option value="Fair night shifts">Fair night shifts</option>
            <option value="Fair weekends">Fair weekends</option>
            <option value="Unbalanced staffing">Unbalanced staffing</option>
          </select>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="py-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="space-y-3">
            {/* Question */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#1c82fd] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                <p className="text-sm leading-relaxed">{message.question}</p>
              </div>
            </div>

            {/* Answer */}
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {message.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
