"use client";

import { useState } from "react";
import Image from "next/image";

const messagesByCategory = {
  "How do I setup a fair roster?": [
    {
      question: "How do I set up a safe roster?",
      answer:
        "Night shifts are a common safety concern. Based on your shift data we could set up a rule to prevent staff from working 6 nights per roster.",
    },
    {
      question: "How do I set up a safe roster?",
      answer:
        "This will help reduce staff fatigue and improve circadium rythm.",
    },
    {
      question: "How do I set up a safe roster?",
      answer: "Would you like to know how to create that rule?",
    },
  ],
  "How do I do deal with split weekends?": [
    {
      question: "How do I deal with split weekends?",
      answer: "Great question, you could add only split weekends.",
    },
    {
      question: "How do I deal with split weekends?",
      answer:
        "You can use the day off rule - Minimum days off per weekend is 1. This means employees must have at least 1 day off per weekend.",
    },
    {
      question: "How do I deal with split weekends?",
      answer: "Do you need me to list the steps on how to do that?",
    },
  ],
  "How do I handle no split weekends?": [
    {
      question: "How do I handle no split weekends?",
      answer:
        'Great question! You can use the days off rule - "Days off per weekend off is 2". This means employees must have at least 2 days off per weekend off.',
    },
    {
      question: "How do I handle no split weekends?",
      answer: "Would you like me to explain how to set this up?",
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
  "How do I use the RosterLab app?": [
    {
      question: "How do I use the RosterLab app?",
      answer:
        'First, you\'ll need to download it to your mobile device. Here are the links for the <a href="https://apps.apple.com/nz/app/rosterlab/id6448819917" target="_blank" rel="noopener noreferrer" class="text-[#1c82fd] underline hover:text-blue-700">App Store</a> and <a href="https://play.google.com/store/apps/details?id=com.rosterlab.app" target="_blank" rel="noopener noreferrer" class="text-[#1c82fd] underline hover:text-blue-700">Play Store</a>.',
    },
    {
      question: "How do I use the RosterLab app?",
      answer:
        "Next, you'll need to login with your administrator access. Do you remember those login details or do you need me to help with a password reset?",
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
            <option value="">AI Prompts:</option>
            <option value="How do I setup a fair roster?">
              How do I set up a safe roster?
            </option>
            <option value="How do I do deal with split weekends?">
              How do I do deal with split weekends?
            </option>
            <option value="How do I handle no split weekends?">
              How do I handle no split weekends?
            </option>
            <option value="How can I distribute weekend shifts fairly?">
              How can I distribute weekend shifts fairly?
            </option>
            <option value="How do I use the RosterLab app?">
              How do I use the RosterLab app?
            </option>
          </select>
        </div>
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
