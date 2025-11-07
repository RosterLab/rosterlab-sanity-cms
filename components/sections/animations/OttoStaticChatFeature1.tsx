"use client";

import { useState } from "react";
import Image from "next/image";

const messagesByCategory = {
  "How do I setup a fair roster?": [
    {
      question: "How do I set up a safe roster?",
      answer:
        "Night shifts are a common safety concern. Based on your shift data, I recommend: no more than 3 consecutive night shifts, and minimum 2 rest days after a block of night shifts.",
    },
    {
      question: "How do I set up a safe roster?",
      answer:
        "This will help reduce staff fatigue and improve circadian rhythm.",
    },
    {
      question: "How do I set up a safe roster?",
      answer: "Would you like to know how to create that rule?",
    },
  ],
  "How do I improve staff work-life balance?": [
    {
      question: "How do I improve staff work-life balance?",
      answer:
        "Split weekends can impact staff work-life balance. Giving staff full weekends off helps them recover properly and spend quality time with family.",
    },
    {
      question: "How do I improve staff work-life balance?",
      answer:
        "I can set up a rule ensuring staff get 2 consecutive days off per weekend. This prevents split weekends where they work Saturday, off Sunday, then back Monday - which doesn't provide proper rest.",
    },
    {
      question: "How do I improve staff work-life balance?",
      answer: "Would you like me to show you how to create that rule?",
    },
  ],
  "How can I distribute weekend shifts fairly?": [
    {
      question: "How can I distribute weekend shifts fairly?",
      answer:
        "Weekend shift distribution can be a pain point for staff. I suggest we use a min and max rule. For example a maximum of 3 weekends off and a minimum of 1.",
    },
    {
      question: "How can I distribute weekend shifts fairly?",
      answer: "Would you like me to show you how to add that rule?",
    },
  ],
  "How can I manage staff fatigue risks?": [
    {
      question: "How can I manage staff fatigue risks?",
      answer:
        "Fatigue is a critical safety concern. Based on your roster data, I've identified some potential fatigue risks: Sarah is scheduled for 6 consecutive shifts, and Tom has only 9 hours between shifts.",
    },
    {
      question: "How can I manage staff fatigue risks?",
      answer:
        "To reduce fatigue, I recommend: maximum 5 consecutive shifts before a break, and minimum 12 hours rest after night shifts.",
    },
    {
      question: "How can I manage staff fatigue risks?",
      answer:
        "Would you like me to show you how to set up these fatigue management rules?",
    },
  ],
  "How compliant is my roster with union rules?": [
    {
      question: "How compliant is my roster with union rules?",
      answer:
        "I've found 2 potential issues: Jessica is rostered for 44 hours this week (exceeds 38-hour standard), and Alex has only 1 day off this week.",
    },
    {
      question: "How compliant is my roster with union rules?",
      answer:
        "EBA compliance requires maximum 38 hours per week for standard employment, and minimum 2 consecutive days off per week.",
    },
    {
      question: "How compliant is my roster with union rules?",
      answer:
        "I can show you how to adjust the roster to meet these requirements if you'd like?",
    },
  ],
  "Am I giving staff enough rest between shifts?": [
    {
      question: "Am I giving staff enough rest between shifts?",
      answer:
        "Rest between shifts is crucial for safety. I found 3 shifts with insufficient breaks: Tom has 8 hours between Friday night and Saturday day shifts (minimum is 12 hours after nights).",
    },
    {
      question: "Am I giving staff enough rest between shifts?",
      answer:
        "Best practice break requirements: minimum 10 hours between standard shifts, and 12 hours after night shifts.",
    },
    {
      question: "Am I giving staff enough rest between shifts?",
      answer:
        "Would you like help flagging any future shifts that don't meet minimum break requirements?",
    },
  ],
};

export default function OttoStaticChatFeature1() {
  const [selectedCategory, setSelectedCategory] = useState<
    keyof typeof messagesByCategory | ""
  >("How do I setup a fair roster?");

  const messages = selectedCategory ? messagesByCategory[selectedCategory] : [];

  return (
    <div className="w-full max-w-[550px] mx-auto bg-white rounded-lg shadow-xl p-6 flex flex-col">
      {/* Chat Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/ottopus.png"
              alt="Otto"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">Otto</h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value as keyof typeof messagesByCategory | "",
            )
          }
          className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:flex-1 sm:max-w-none truncate"
        >
          <option value="">AI Prompts:</option>
          <option value="How do I setup a fair roster?">
            How do I set up a safe roster?
          </option>
          <option value="How do I improve staff work-life balance?">
            How do I improve staff work-life balance?
          </option>
          <option value="How can I distribute weekend shifts fairly?">
            How can I distribute weekend shifts fairly?
          </option>
          <option value="How can I manage staff fatigue risks?">
            How can I manage staff fatigue risks?
          </option>
          <option value="How compliant is my roster with union rules?">
            How compliant is my roster with union rules?
          </option>
          <option value="Am I giving staff enough rest between shifts?">
            Am I giving staff enough rest between shifts?
          </option>
        </select>
      </div>

      {/* Chat Messages */}
      <div className="py-6 space-y-4">
        {messages.length > 0 && (
          <>
            {/* Question - shown once */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#1c82fd] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                <p className="text-sm leading-relaxed">
                  {messages[0].question}
                </p>
              </div>
            </div>

            {/* Answers - all answers shown in sequence */}
            {messages.map((message, index) => (
              <div key={index} className="flex justify-start">
                <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-200">
                  <p
                    className="text-sm text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: message.answer }}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
